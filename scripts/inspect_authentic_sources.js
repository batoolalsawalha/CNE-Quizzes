const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// Filter out boilerplate
const authentic = db.questions.filter(q => !/\[.*Problem \d+\]/i.test(q.question));
console.log('Authentic non-boilerplate questions currently in database:', authentic.length);

const summary = {};
db.subjects.forEach(s => {
  const midQs = authentic.filter(q => q.subjectId === s.id && q.quizId.includes('mid'));
  const finQs = authentic.filter(q => q.subjectId === s.id && q.quizId.includes('final'));
  summary[s.id] = { name: s.name, mid: midQs.length, final: finQs.length, total: midQs.length + finQs.length };
});

console.log('Summary of authentic questions per subject:');
console.table(summary);
