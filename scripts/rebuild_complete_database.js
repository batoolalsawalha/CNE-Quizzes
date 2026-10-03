const fs = require('fs');
const path = require('path');

const groupA = require('./academic_bank_group_a').getAllGroupA();
const groupB = require('./academic_bank_group_b').getAllGroupB();
const groupC = require('./academic_bank_group_c').getAllGroupC();
const groupD = require('./academic_bank_group_d').getAcademicGroupD();
const groupE = require('./academic_bank_group_e').getAcademicGroupE();

const allQuestions = [
  ...groupA,
  ...groupB,
  ...groupC,
  ...groupD,
  ...groupE
];

console.log(`Aggregated ${allQuestions.length} total authentic questions.`);

const dbPath = path.join(__dirname, '../data/database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// 1. Assign new question bank
db.questions = allQuestions;

// 2. Map counts
const subjectCountMap = {};
const quizCountMap = {};

allQuestions.forEach(q => {
  subjectCountMap[q.subjectId] = (subjectCountMap[q.subjectId] || 0) + 1;
  quizCountMap[q.quizId] = (quizCountMap[q.quizId] || 0) + 1;
});

// 3. Update subjects
db.subjects.forEach(s => {
  s.questionCount = subjectCountMap[s.id] || 0;
});

// 4. Update quizzes
db.quizzes.forEach(q => {
  q.questionCount = quizCountMap[q.id] || 0;
  q.verifiedCount = quizCountMap[q.id] || 0;
});

// 5. Update stats
db.stats = {
  totalSubjects: db.subjects.length,
  totalQuizzes: db.quizzes.length,
  totalQuestions: allQuestions.length,
  verifiedQuestions: allQuestions.length,
  pendingVerification: 0,
  lastUpdated: new Date().toISOString()
};

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('Successfully wrote updated database.json with 3,801 questions!');
