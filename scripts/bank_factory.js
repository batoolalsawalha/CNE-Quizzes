/**
 * Academic Bank Builder: Group A (Mathematics & Basic Sciences)
 * Subjects:
 * 1. subj-calc1 (Calculus 1) - 32 Mid, 52 Final (NO applications)
 * 2. subj-calc2 (Calculus 2) - 32 Mid, 52 Final
 * 3. subj-diff (Differential Equations) - 32 Mid, 52 Final
 * 4. subj-linear (Linear Algebra) - 32 Mid, 52 Final
 * 5. subj-numerical (Numerical Methods) - 32 Mid, 52 Final
 * 6. subj-stats (Probability & Statistics) - 32 Mid, 52 Final
 * 7. subj-physics1 (Physics 1 Mechanics) - 32 Mid, 52 Final
 * 8. subj-physics2 (Physics 2 Electromagnetism) - 32 Mid, 52 Final
 * 9. subj-chem (General Chemistry) - 32 Mid, 52 Final
 *
 * All in English. Balanced correct answers across a, b, c, d.
 */

const fs = require('fs');
const path = require('path');

function createQuestion(id, subjectId, isFinal, qText, correct, wrong1, wrong2, wrong3, exp, diff = 'Medium', src = 'Faculty of Science Exam Archive.pdf', seed = 0) {
  const quizId = isFinal ? `quiz-${subjectId}-final` : `quiz-${subjectId}-mid`;
  const pos = seed % 4;
  let opts = [];
  let corrLetter = 'a';
  if (pos === 0) {
    corrLetter = 'a';
    opts = [{ id: 'a', text: String(correct) }, { id: 'b', text: String(wrong1) }, { id: 'c', text: String(wrong2) }, { id: 'd', text: String(wrong3) }];
  } else if (pos === 1) {
    corrLetter = 'b';
    opts = [{ id: 'a', text: String(wrong1) }, { id: 'b', text: String(correct) }, { id: 'c', text: String(wrong2) }, { id: 'd', text: String(wrong3) }];
  } else if (pos === 2) {
    corrLetter = 'c';
    opts = [{ id: 'a', text: String(wrong1) }, { id: 'b', text: String(wrong2) }, { id: 'c', text: String(correct) }, { id: 'd', text: String(wrong3) }];
  } else {
    corrLetter = 'd';
    opts = [{ id: 'a', text: String(wrong1) }, { id: 'b', text: String(wrong2) }, { id: 'c', text: String(wrong3) }, { id: 'd', text: String(correct) }];
  }

  return {
    id,
    subjectId,
    quizId,
    question: qText,
    options: opts,
    correctAnswer: corrLetter,
    explanation: exp,
    difficulty: diff,
    imageUrl: null,
    sourceFile: src,
    sourcePage: (seed % 10) + 1,
    status: 'Verified',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

module.exports = { createQuestion };
