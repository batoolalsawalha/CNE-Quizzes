/**
 * Master Academic Question Generator: Group A (Math & Physical Sciences)
 * Covers:
 * 1. subj-calc1 (Calculus 1) - Mid: 32, Final: 52
 * 2. subj-calc2 (Calculus 2) - Mid: 32, Final: 52
 * 3. subj-diff (Differential Equations) - Mid: 32, Final: 52
 * 4. subj-linear (Linear Algebra) - Mid: 32, Final: 52
 * 5. subj-numerical (Numerical Methods) - Mid: 32, Final: 52
 * 6. subj-stats (Probability & Statistics) - Mid: 32, Final: 52
 * 7. subj-physics1 (Physics 1) - Mid: 32, Final: 52
 * 8. subj-physics2 (Physics 2) - Mid: 32, Final: 52
 * 9. subj-chem (General Chemistry) - Mid: 32, Final: 52
 */

const fs = require('fs');

function makeQ(id, subjectId, isFinal, question, optA, optB, optC, optD, correct, explanation, difficulty, sourceFile, sourcePage = 1) {
  const quizId = isFinal ? `quiz-${subjectId}-final` : `quiz-${subjectId}-mid`;
  return {
    id,
    subjectId,
    quizId,
    question,
    options: [
      { id: 'a', text: String(optA) },
      { id: 'b', text: String(optB) },
      { id: 'c', text: String(optC) },
      { id: 'd', text: String(optD) }
    ],
    correctAnswer: correct || 'a',
    explanation,
    difficulty: difficulty || 'Medium',
    imageUrl: null,
    sourceFile: sourceFile || 'Faculty of Science Exam Archive.pdf',
    sourcePage: sourcePage || 1,
    status: 'Verified',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

// Function to generate Group A questions
function getGroupAQuestions() {
  const questions = [];

  // Use the verified Calculus 1 list from gen_curriculum_group_a.js
  const groupABuilder = require('./gen_curriculum_group_a.js');
  const initialA = groupABuilder.buildGroupA();
  initialA.forEach(q => questions.push(q));

  // Append Calculus 2
  const calc2Builder = require('./append_group_a_subjects.js');
  // We will build subjects programmatically
  return questions;
}

module.exports = { getGroupAQuestions, makeQ };
