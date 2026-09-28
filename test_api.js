const db = require('./server/db');
const assert = require('assert');

console.log('Running CNE Quizzes Test Suite...\n');

// 1. Check stats and curriculum sync
const stats = db.getStats();
console.log('System Stats:', stats);
assert(stats.totalSubjects >= 45, `Should have all 45 subjects synced (found: ${stats.totalSubjects})`);
assert(stats.totalQuizzes >= 80, `Should have at least 80 quizzes generated (found: ${stats.totalQuizzes})`);
assert(stats.totalQuestions >= 60, `Should have questions seeded (found: ${stats.totalQuestions})`);
console.log('✓ Stats & 45-Subject Curriculum verified');

// 2. Admin Authentication & PBKDF2 Password Hashing
assert(db.verifyAdmin('cne_admin', 'cne_committee_2025'), 'Default admin credentials should verify');
assert(!db.verifyAdmin('cne_admin', 'wrong_pass'), 'Wrong password should fail');
assert(!db.verifyAdmin('unknown_user', 'cne_committee_2025'), 'Unknown user should fail');
const adminInfo = db.getAdminInfo();
assert(adminInfo.username === 'cne_admin', 'Admin info should report cne_admin');
assert(adminInfo.passwordHash === undefined, 'Admin info must NOT expose passwordHash');
assert(adminInfo.salt === undefined, 'Admin info must NOT expose salt');
console.log('✓ Secure PBKDF2 Admin Authentication verified');

// 3. Questions with Images
const imageQuestions = db.data.questions.filter(q => Boolean(q.imageUrl));
assert(imageQuestions.length >= 2, `Should have questions with images (found: ${imageQuestions.length})`);
const imgQ = imageQuestions[0];
assert(imgQ.imageUrl.startsWith('/images/questions/'), 'Image URL should point to /images/questions/');
console.log(`✓ Questions with Images verified (${imageQuestions.length} diagram questions found, e.g. ${imgQ.imageUrl})`);

// 4. Student Quiz Delivery & Strict Privacy Protection
const quizzes = db.getQuizzes();
const sampleQuiz = quizzes.find(q => q.questionCount > 0);
assert(sampleQuiz, 'Quiz with questions should exist');
const studentQuiz = db.getQuizForStudent(sampleQuiz.id);
assert(studentQuiz.questions.length > 0, 'Student quiz should deliver questions');
for (const q of studentQuiz.questions) {
  assert.strictEqual(q.correctAnswer, undefined, 'Student quiz MUST NOT expose correctAnswer');
  assert.strictEqual(q.explanation, undefined, 'Student quiz MUST NOT expose explanation');
  assert.strictEqual(q.sourceFile, undefined, 'Student quiz MUST NOT expose sourceFile (Privacy Rule)');
  assert.strictEqual(q.sourcePage, undefined, 'Student quiz MUST NOT expose sourcePage (Privacy Rule)');
}
console.log(`✓ Student Privacy & Sanitization verified (${studentQuiz.questions.length} questions checked; zero answers/sources leaked)`);

// 5. Grading Engine & Score out of 100
const firstQ = db.data.questions.find(q => q.quizId === sampleQuiz.id);
const sampleAnswers = {};
if (firstQ) sampleAnswers[firstQ.id] = firstQ.correctAnswer;
const gradeResult = db.gradeSubmission(sampleQuiz.id, sampleAnswers);
assert.strictEqual(gradeResult.totalQuestions, studentQuiz.questions.length);
assert(typeof gradeResult.score100 === 'number', 'Result must contain score100 (score out of 100)');
assert(gradeResult.score100 >= 0 && gradeResult.score100 <= 100, 'score100 must be in [0, 100]');
for (const item of gradeResult.breakdown) {
  assert.strictEqual(item.sourceFile, undefined, 'Student review breakdown MUST NOT leak sourceFile');
  assert.strictEqual(item.sourcePage, undefined, 'Student review breakdown MUST NOT leak sourcePage');
  assert(item.correctAnswer !== undefined, 'Review breakdown must provide correct answer');
}
console.log(`✓ Grading Engine verified: Score ${gradeResult.score100}/100, Percentage ${gradeResult.percentage}%`);

// 6. Printable Exam Engines (Student vs Admin Key)
const studentPrint = db.getQuizForPrint(sampleQuiz.id, false);
assert(studentPrint, 'Student printable exam should be generated');
assert.strictEqual(studentPrint.includeAnswers, false);
for (const q of studentPrint.questions) {
  assert.strictEqual(q.correctAnswer, undefined, 'Student printable paper MUST NOT contain answers');
  assert.strictEqual(q.explanation, undefined, 'Student printable paper MUST NOT contain explanations');
  assert.strictEqual(q.sourceFile, undefined, 'Student printable paper MUST NOT contain sourceFile');
}

const adminPrintKey = db.getQuizForPrint(sampleQuiz.id, true);
assert(adminPrintKey, 'Admin answer key printable should be generated');
assert.strictEqual(adminPrintKey.includeAnswers, true);
for (const q of adminPrintKey.questions) {
  assert(q.correctAnswer !== undefined, 'Admin answer key MUST contain correctAnswer');
}
console.log('✓ Printable Exams verified (Clean Student Paper & Official Admin Answer Key)');

// 7. Backup Engine
const backupFile = db.createBackup();
assert(backupFile, 'Backup file should be created');
console.log(`✓ Database write-through and backup verified (${backupFile})`);

console.log('\n=======================================================');
console.log('ALL CNE QUIZZES SYSTEM & PRIVACY TESTS PASSED 100%!');
console.log('=======================================================\n');
