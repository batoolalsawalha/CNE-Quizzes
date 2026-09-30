const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

console.log('=== 1. SEARCH FOR "تعويض" IN ALL 2396 QUESTIONS ===');
let foundTaweed = [];
db.questions.forEach((q, idx) => {
  const str = JSON.stringify(q);
  if (str.includes('تعويض')) {
    foundTaweed.push({ idx, q });
  }
});
console.log(`Found ${foundTaweed.length} questions containing 'تعويض':`);
foundTaweed.forEach(({ idx, q }) => {
  console.log(`- Q#${idx} [Subj: ${q.subjectId}, Quiz: ${q.quizId}, Source: ${q.sourceFile}]`);
  console.log(`  Question: ${q.question}`);
  console.log(`  Options: ${JSON.stringify(q.options)}`);
  if (q.explanation) console.log(`  Explanation: ${q.explanation}`);
});

console.log('\n=== 2. SEARCH FOR "تعويض" IN FILENAMES IN qu/ ===');
const quDir = path.join(__dirname, '..', 'qu');
function findFiles(dir) {
  let results = [];
  try {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) results = results.concat(findFiles(fullPath));
      else results.push(fullPath);
    });
  } catch (e) {}
  return results;
}
const allQuFiles = findFiles(quDir);
const taweedFiles = allQuFiles.filter(f => f.includes('تعويض'));
console.log(`Found ${taweedFiles.length} files in qu/ with 'تعويض':`);
taweedFiles.forEach(f => console.log(' - ' + path.relative(quDir, f)));

console.log('\n=== 3. EXAMINE C++ QUESTIONS AND THEIR SOURCES ===');
const cppQs = db.questions.filter(q => q.subjectId === 'subj-cpp');
console.log(`Total C++ questions: ${cppQs.length}`);
const cppSources = {};
cppQs.forEach(q => {
  const s = q.sourceFile || 'No Source';
  cppSources[s] = (cppSources[s] || 0) + 1;
});
console.log('C++ sources breakdown:', cppSources);

const oopInCpp = cppQs.filter(q => {
  const t = (q.question || '') + ' ' + (q.options || []).join(' ');
  return /class|inheritance|polymorphism|virtual|destructor|encapsulation|access specifier/i.test(t);
});
console.log(`C++ questions with OOP concepts: ${oopInCpp.length}`);
oopInCpp.forEach((q, i) => {
  console.log(`  [${i+1}] Source: ${q.sourceFile} | Q: ${q.question.slice(0, 90)}`);
});

console.log('\n=== 4. EXAMINE OOP (subj-oop) QUESTIONS AND THEIR SOURCES ===');
const oopQs = db.questions.filter(q => q.subjectId === 'subj-oop');
console.log(`Total OOP questions: ${oopQs.length}`);
const oopSources = {};
oopQs.forEach(q => {
  const s = q.sourceFile || 'No Source';
  oopSources[s] = (oopSources[s] || 0) + 1;
});
console.log('OOP sources breakdown:', oopSources);

console.log('\n=== 5. CHECK ALL CALCULUS 1 & 2 QUESTIONS ===');
const calc1Qs = db.questions.filter(q => q.subjectId === 'subj-calc1');
const calc2Qs = db.questions.filter(q => q.subjectId === 'subj-calc2');
console.log(`Calc 1 questions: ${calc1Qs.length}, Calc 2 questions: ${calc2Qs.length}`);
const calc1Sources = {}, calc2Sources = {};
calc1Qs.forEach(q => { calc1Sources[q.sourceFile || 'No Source'] = (calc1Sources[q.sourceFile || 'No Source'] || 0) + 1; });
calc2Qs.forEach(q => { calc2Sources[q.sourceFile || 'No Source'] = (calc2Sources[q.sourceFile || 'No Source'] || 0) + 1; });
console.log('Calc 1 sources:', calc1Sources);
console.log('Calc 2 sources:', calc2Sources);
