/**
 * CNE Quizzes - Question Text & PDF Parser
 * Extracts structured multiple-choice questions from plain text and PDF files.
 */

const { PDFParse } = require('pdf-parse');

// Normalize Arabic letters and characters for option mapping
const ARABIC_OPTION_MAP = {
  'أ': 'a', 'ا': 'a', 'إ': 'a', 'آ': 'a',
  'ب': 'b',
  'ج': 'c',
  'د': 'd'
};

/**
 * Parses raw text into question objects compatible with CNE Quizzes
 */
function parseQuestionsFromText(rawText, defaultSubjectId = null, defaultQuizId = null, sourceFile = 'Text/PDF Import') {
  if (!rawText || typeof rawText !== 'string') {
    throw new Error('النص المراد تحليله فارغ');
  }

  // Normalize line endings and strip carriage returns
  const text = rawText.replace(/\\n/g, '\n').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const lines = text.split('\n');

  const questions = [];
  let currentQuestion = null;
  let currentOption = null;

  // Patterns for detecting question headers:
  // e.g., "1.", "1-", "Q1:", "Question 1:", "سؤال 1:", "[1]"
  const questionHeaderRegex = /^(?:(?:Q|Question|سؤال)?\s*\[?(\d+)[\]\.:\-\)]\s*|\bQ(\d+)[:\.\-]\s*)(.*)$/i;

  // Patterns for detecting options:
  // e.g., "A)", "A.", "(A)", "[A]", "a)", "أ)", "ب.", "(ج)"
  const optionHeaderRegex = /^(?:(?:\(|\[)?([A-Da-d]|[أ-د])(?:\)|\]|\.|\-)\s*)(.*)$/;

  // Patterns for detecting correct answer:
  // e.g., "Answer: B", "Ans: B", "Correct: B", "الإجابة: ب", "الحل: أ", "Answer = c"
  const answerRegex = /(?:(?:Answer|Ans|Correct|الإجابة|الحل|الجواب)\s*[:=]\s*(?:(?:\(|\[)?([A-Da-d]|[أ-د])(?:\)|\])?))/i;

  // Pattern for explanation:
  const explanationRegex = /(?:(?:Explanation|Explain|الشرح|توضيح)\s*[:=]\s*)(.*)$/i;

  function finalizeCurrentQuestion() {
    if (!currentQuestion) return;

    // Check if we have at least 2 options
    const optionKeys = Object.keys(currentQuestion.optionsMap);
    if (optionKeys.length >= 2) {
      // Build options array
      const options = ['a', 'b', 'c', 'd'].map(letter => {
        return {
          id: letter,
          text: currentQuestion.optionsMap[letter] || ''
        };
      }).filter(opt => opt.text.trim().length > 0);

      // Verify or default correct answer
      let correct = currentQuestion.correctAnswer;
      if (!correct || !currentQuestion.optionsMap[correct]) {
        correct = options[0].id;
      }

      questions.push({
        subjectId: defaultSubjectId,
        quizId: defaultQuizId,
        question: currentQuestion.questionText.trim(),
        options,
        correctAnswer: correct,
        explanation: currentQuestion.explanation.trim(),
        difficulty: 'Medium',
        sourceFile,
        status: currentQuestion.foundExplicitAnswer ? 'Verified' : 'Needs Review'
      });
    } else if (currentQuestion.questionText.trim()) {
      // If no standard options found, but there is question text, mark as needs review
      questions.push({
        subjectId: defaultSubjectId,
        quizId: defaultQuizId,
        question: currentQuestion.questionText.trim(),
        options: [
          { id: 'a', text: 'خيار 1' },
          { id: 'b', text: 'خيار 2' }
        ],
        correctAnswer: 'a',
        explanation: currentQuestion.explanation.trim(),
        difficulty: 'Medium',
        sourceFile,
        status: 'Needs Review'
      });
    }

    currentQuestion = null;
    currentOption = null;
  }

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trim();
    if (!line) continue;

    // Check for inline answer pattern on its own line
    const ansMatch = line.match(answerRegex);
    if (ansMatch && currentQuestion) {
      const ansChar = ansMatch[1].trim();
      currentQuestion.correctAnswer = ARABIC_OPTION_MAP[ansChar] || ansChar.toLowerCase();
      currentQuestion.foundExplicitAnswer = true;
      currentOption = null;
      continue;
    }

    // Check for explanation on its own line
    const expMatch = line.match(explanationRegex);
    if (expMatch && currentQuestion) {
      currentQuestion.explanation = (currentQuestion.explanation ? currentQuestion.explanation + ' ' : '') + expMatch[1].trim();
      currentOption = null;
      continue;
    }

    // Check if line starts a new question
    const qMatch = line.match(questionHeaderRegex);
    if (qMatch) {
      finalizeCurrentQuestion();
      currentQuestion = {
        number: qMatch[1] || qMatch[2] || '',
        questionText: (qMatch[3] || '').trim(),
        optionsMap: {},
        correctAnswer: null,
        foundExplicitAnswer: false,
        explanation: ''
      };
      currentOption = null;
      continue;
    }

    // Check if line starts an option
    const optMatch = line.match(optionHeaderRegex);
    if (optMatch && currentQuestion) {
      let optChar = optMatch[1].trim();
      optChar = ARABIC_OPTION_MAP[optChar] || optChar.toLowerCase();
      const optText = (optMatch[2] || '').trim();

      currentQuestion.optionsMap[optChar] = optText;
      currentOption = optChar;
      continue;
    }

    // Otherwise, it's a continuation line
    if (currentQuestion) {
      if (currentOption && currentQuestion.optionsMap[currentOption] !== undefined) {
        currentQuestion.optionsMap[currentOption] += ' ' + line;
      } else {
        currentQuestion.questionText += ' ' + line;
      }
    }
  }

  // Finalize last question
  finalizeCurrentQuestion();

  return questions;
}

/**
 * Extracts text from a PDF Buffer and parses questions
 */
async function parseQuestionsFromPDF(pdfBuffer, defaultSubjectId = null, defaultQuizId = null, sourceFile = 'PDF Import') {
  if (!pdfBuffer) {
    throw new Error('ملف PDF غير صالح أو فارغ');
  }

  let uint8;
  if (Buffer.isBuffer(pdfBuffer)) {
    uint8 = new Uint8Array(pdfBuffer.buffer, pdfBuffer.byteOffset, pdfBuffer.byteLength);
  } else if (pdfBuffer instanceof Uint8Array) {
    uint8 = pdfBuffer;
  } else {
    uint8 = new Uint8Array(pdfBuffer);
  }

  const parser = new PDFParse(uint8);
  const result = await parser.getText();
  const text = typeof result === 'string' ? result : (result && result.text ? result.text : '');

  if (!text || !text.trim()) {
    throw new Error('تعذر استخراج نصوص من ملف الـ PDF. قد يكون الملف عبارة عن صور ممسوحة ضوئياً (سكانر) دون نصوص قابلة للقراءة.');
  }

  return parseQuestionsFromText(text, defaultSubjectId, defaultQuizId, sourceFile);
}

module.exports = {
  parseQuestionsFromText,
  parseQuestionsFromPDF
};
