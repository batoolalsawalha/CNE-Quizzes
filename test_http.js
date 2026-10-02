const assert = require('assert');
const server = require('./server/server');
const db = require('./server/db');

async function run() {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const baseUrl = `http://127.0.0.1:${server.address().port}`;

  try {
    const quiz = db.getQuizzes().find(entry => entry.questionCount > 0);
    const question = db.data.questions.find(entry => entry.quizId === quiz.id);
    const protectedPaths = [
      `/api/quizzes/${quiz.id}`,
      '/api/questions',
      `/api/questions/${question.id}`
    ];

    for (const route of protectedPaths) {
      const response = await fetch(`${baseUrl}${route}`);
      assert.strictEqual(response.status, 401, `${route} exposed the answer bank`);
      assert.strictEqual(response.headers.get('access-control-allow-origin'), null,
        'The local API must not grant cross-origin browser access');
    }

    const takeResponse = await fetch(`${baseUrl}/api/quizzes/${quiz.id}/take`);
    assert.strictEqual(takeResponse.status, 200);
    const studentQuiz = await takeResponse.json();
    assert(studentQuiz.questions.length > 0);
    assert(studentQuiz.questions.every(entry => !('correctAnswer' in entry) && !('sourceFile' in entry)));
    const malformedSubmission = await fetch(`${baseUrl}/api/quizzes/${quiz.id}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{bad json'
    });
    assert.strictEqual(malformedSubmission.status, 400);

    const invalidCount = await fetch(`${baseUrl}/api/random-quiz?count=2.5`);
    assert.strictEqual(invalidCount.status, 400);
    const randomResponse = await fetch(`${baseUrl}/api/random-quiz?count=3`);
    assert.strictEqual(randomResponse.status, 200);
    const randomQuiz = await randomResponse.json();
    assert.strictEqual(randomQuiz.questions.length, 3);
    assert(randomQuiz.questions.every(entry => !('correctAnswer' in entry)));
    const randomSubmit = await fetch(`${baseUrl}/api/random-quiz/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ questionIds: randomQuiz.questionIds, answers: {} })
    });
    assert.strictEqual(randomSubmit.status, 200);
    assert.strictEqual((await randomSubmit.json()).totalQuestions, 3);

    const loginResponse = await fetch(`${baseUrl}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'cne_admin', password: 'cne_committee_2025' })
    });
    assert.strictEqual(loginResponse.status, 200);
    const { token } = await loginResponse.json();
    const urlTokenResponse = await fetch(`${baseUrl}/api/backup/download?token=${token}`);
    assert.strictEqual(urlTokenResponse.status, 401, 'Admin tokens in URLs must not grant access');
    const adminResponse = await fetch(`${baseUrl}/api/questions/${question.id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    assert.strictEqual(adminResponse.status, 200);
    assert('correctAnswer' in await adminResponse.json());
    const backupResponse = await fetch(`${baseUrl}/api/backup/download`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    assert.strictEqual(backupResponse.status, 200);

    const missingAsset = await fetch(`${baseUrl}/js/missing.js`);
    assert.strictEqual(missingAsset.status, 404, 'Missing assets must not return index.html');
    const homePage = await fetch(baseUrl);
    assert.strictEqual(homePage.status, 200);
    assert((homePage.headers.get('content-type') || '').includes('text/html'));
    assert.strictEqual(homePage.headers.get('x-content-type-options'), 'nosniff');
    assert.strictEqual(homePage.headers.get('x-frame-options'), 'DENY');

    for (let attempt = 0; attempt < 10; attempt++) {
      const failedLogin = await fetch(`${baseUrl}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'rate-limit-test', password: 'incorrect-password' })
      });
      assert.strictEqual(failedLogin.status, 401);
    }
    const throttledLogin = await fetch(`${baseUrl}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'rate-limit-test', password: 'incorrect-password' })
    });
    assert.strictEqual(throttledLogin.status, 429, 'Repeated login failures must be throttled');
    assert(Number(throttledLogin.headers.get('retry-after')) > 0);

    console.log('✓ HTTP access control, login throttling, security headers, student quiz, and static assets verified');
  } finally {
    await new Promise(resolve => server.close(resolve));
  }
}

run().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
