const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

console.log('=== Checking C++ (subj-cpp) Questions ===');
const cppQs = db.questions.filter(q => q.subjectId === 'subj-cpp');
console.log(`Total C++ questions: ${cppQs.length}`);
if (cppQs.length > 0) {
  console.log('Sample question keys:', Object.keys(cppQs[0]));
}
cppQs.forEach((q, i) => {
  const text = q.question || q.text || '';
  const isOop = /class|object|inheritance|polymorphism|virtual|constructor|destructor|encapsulation|private:|public:|protected:/i.test(text + ' ' + (q.options || []).join(' '));
  if (isOop) {
    console.log(`[C++ Q#${i+1}] [OOP Detected!] Type: ${q.quizType || q.type}, Source: ${q.sourceFile || 'none'}`);
    console.log(`   Text: ${text.slice(0, 100)}...`);
  }
});

console.log('\n=== Checking Calculus (subj-calc1, subj-calc2) for "تعويض" / Substitution ===');
const calcQs = db.questions.filter(q => q.subjectId === 'subj-calc1' || q.subjectId === 'subj-calc2');
console.log(`Total Calculus questions: ${calcQs.length}`);
calcQs.forEach((q, i) => {
  const text = q.question || q.text || '';
  const hasTaweed = /تعويض|u-substitution|substitution|makeup|make-up/i.test(text + ' ' + (q.explanation || '') + ' ' + (q.sourceFile || '') + ' ' + (q.options || []).join(' '));
  if (hasTaweed) {
    console.log(`[Calc Q#${i+1}] Subject: ${q.subjectId}, Quiz: ${q.quizId}, Source: ${q.sourceFile || 'none'}`);
    console.log(`   Text: ${text}`);
    if (q.explanation) console.log(`   Explanation: ${q.explanation}`);
  }
});

console.log('\n=== Checking files in qu/ for C++, OOP, and Calc ===');
const quDir = path.join(__dirname, '..', 'qu');
function findFiles(dir) {
  let results = [];
  try {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        results = results.concat(findFiles(fullPath));
      } else {
        results.push(fullPath);
      }
    });
  } catch (e) {}
  return results;
}
const allQuFiles = findFiles(quDir);
const relevantQuFiles = allQuFiles.filter(f => /c\+\+|oop|object|calc|كالك|تفاضل|تعويض/i.test(f));
console.log(`Found ${relevantQuFiles.length} relevant files in qu/:`);
relevantQuFiles.forEach(f => console.log(' - ' + path.relative(quDir, f)));
