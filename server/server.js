const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const crypto = require('crypto');
const db = require('./db');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '127.0.0.1';
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const MAX_LOGIN_FAILURES = 10;

if (!['127.0.0.1', 'localhost', '::1'].includes(HOST) && db.usesDefaultAdminPassword()) {
  throw new Error('Set a unique ADMIN_PASSWORD before exposing the server on the network');
}

// Active authenticated admin session tokens (Token -> expiration timestamp)
const ACTIVE_ADMIN_TOKENS = new Map();
const LOGIN_FAILURES = new Map();

function getLoginThrottle(req) {
  const address = req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const current = LOGIN_FAILURES.get(address);
  if (!current || now - current.startedAt >= LOGIN_WINDOW_MS) {
    LOGIN_FAILURES.delete(address);
    return { address, blocked: false, retryAfterSeconds: 0 };
  }
  return {
    address,
    blocked: current.count >= MAX_LOGIN_FAILURES,
    retryAfterSeconds: Math.ceil((LOGIN_WINDOW_MS - (now - current.startedAt)) / 1000)
  };
}

function recordLoginFailure(address) {
  const now = Date.now();
  const current = LOGIN_FAILURES.get(address);
  if (!current || now - current.startedAt >= LOGIN_WINDOW_MS) {
    LOGIN_FAILURES.set(address, { count: 1, startedAt: now });
    return;
  }
  current.count += 1;
}

// Helper to verify admin token
function isAuthorizedAdmin(req) {
  const token = (req.headers['authorization'] || '').replace(/^Bearer\s+/i, '').trim();
  if (!token || !ACTIVE_ADMIN_TOKENS.has(token)) return false;

  const expireTime = ACTIVE_ADMIN_TOKENS.get(token);
  if (Date.now() > expireTime) {
    ACTIVE_ADMIN_TOKENS.delete(token);
    return false;
  }
  // Refresh token expiry on active use (valid for 24 hours)
  ACTIVE_ADMIN_TOKENS.set(token, Date.now() + 24 * 60 * 60 * 1000);
  return true;
}

// MIME types dictionary
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.csv': 'text/csv; charset=utf-8'
};

function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store'
  });
  res.end(JSON.stringify(data));
}

function parseRequestBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let bytesReceived = 0;
    let tooLarge = false;
    req.on('data', chunk => {
      if (tooLarge) return;
      bytesReceived += chunk.length;
      if (bytesReceived > 35 * 1024 * 1024) { // 35MB limit for bulk files
        tooLarge = true;
        reject(new Error('Payload too large'));
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', err => reject(err));
  });
}

function serveStatic(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT' || err.code === 'EISDIR') {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Not Found');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
}

const server = http.createServer(async (req, res) => {
  res.setHeader('Content-Security-Policy', "default-src 'self'; img-src 'self' data: blob:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'");
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.setHeader('Referrer-Policy', 'same-origin');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method.toUpperCase();

  // Handle CORS preflight
  if (method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // ================= API ROUTES =================
  if (pathname.startsWith('/api/')) {
    try {
      // 0. ADMIN AUTHENTICATION
      if (pathname === '/api/admin/login' && method === 'POST') {
        const throttle = getLoginThrottle(req);
        if (throttle.blocked) {
          res.setHeader('Retry-After', String(throttle.retryAfterSeconds));
          return sendJSON(res, 429, { error: 'محاولات تسجيل دخول كثيرة. حاول مرة أخرى لاحقاً.' });
        }
        const bodyStr = await parseRequestBody(req);
        let username = 'cne_admin';
        let password = '';
        try {
          const parsed = JSON.parse(bodyStr);
          username = parsed.username || 'cne_admin';
          password = parsed.password || '';
        } catch (_) {}

        if (db.verifyAdmin(username, password)) {
          LOGIN_FAILURES.delete(throttle.address);
          const token = crypto.randomBytes(32).toString('hex');
          ACTIVE_ADMIN_TOKENS.set(token, Date.now() + 24 * 60 * 60 * 1000); // 24hr validity
          return sendJSON(res, 200, {
            success: true,
            token,
            username,
            message: 'تم تسجيل الدخول بنجاح كمسؤول'
          });
        }
        recordLoginFailure(throttle.address);
        return sendJSON(res, 401, { success: false, error: 'اسم المستخدم أو كلمة المرور غير صحيحة' });
      }

      if (pathname === '/api/admin/verify' && method === 'GET') {
        if (isAuthorizedAdmin(req)) {
          return sendJSON(res, 200, { authorized: true, admin: db.getAdminInfo() });
        }
        return sendJSON(res, 401, { authorized: false, error: 'الجلسة غير مصرح بها أو منتهية الصلاحية' });
      }

      if (pathname === '/api/admin/logout' && method === 'POST') {
        const authHeader = req.headers['authorization'] || '';
        const token = authHeader.replace(/^Bearer\s+/i, '').trim();
        if (token) ACTIVE_ADMIN_TOKENS.delete(token);
        return sendJSON(res, 200, { success: true, message: 'تم تسجيل الخروج بنجاح' });
      }

      if (pathname === '/api/admin/change-credentials' && method === 'POST') {
        if (!isAuthorizedAdmin(req)) return sendJSON(res, 401, { error: 'غير مصرح' });
        const bodyStr = await parseRequestBody(req);
        const { newUsername, newPassword } = JSON.parse(bodyStr || '{}');
        if (typeof newUsername !== 'string' || !newUsername.trim()) {
          return sendJSON(res, 400, { error: 'اسم المستخدم الجديد مطلوب' });
        }
        if (typeof newPassword !== 'string' || newPassword.length < 12) {
          return sendJSON(res, 400, { error: 'كلمة المرور الجديدة يجب ألا تقل عن 12 خانة' });
        }
        db.updateAdminCredentials(newUsername, newPassword);
        ACTIVE_ADMIN_TOKENS.clear();
        return sendJSON(res, 200, { success: true, message: 'تم تحديث بيانات حساب المشرف بنجاح' });
      }

      // 1. STATS
      if (pathname === '/api/stats' && method === 'GET') {
        const stats = db.getStats();
        return sendJSON(res, 200, stats);
      }

      // 2. SUBJECTS
      if (pathname === '/api/subjects') {
        if (method === 'GET') {
          const subjects = db.getSubjects(parsedUrl.query);
          return sendJSON(res, 200, subjects);
        }
        if (method === 'POST') {
          if (!isAuthorizedAdmin(req)) return sendJSON(res, 401, { error: 'غير مصرح' });
          const bodyStr = await parseRequestBody(req);
          const payload = JSON.parse(bodyStr);
          const created = db.createSubject(payload);
          return sendJSON(res, 201, created);
        }
      }

      const subjectMatch = pathname.match(/^\/api\/subjects\/([^\/]+)$/);
      if (subjectMatch) {
        const subjectId = decodeURIComponent(subjectMatch[1]);
        if (method === 'GET') {
          const s = db.getSubjectById(subjectId);
          if (!s) return sendJSON(res, 404, { error: 'المادة غير موجودة' });
          return sendJSON(res, 200, s);
        }
        if (method === 'PUT') {
          if (!isAuthorizedAdmin(req)) return sendJSON(res, 401, { error: 'غير مصرح' });
          const bodyStr = await parseRequestBody(req);
          const payload = JSON.parse(bodyStr);
          const updated = db.updateSubject(subjectId, payload);
          if (!updated) return sendJSON(res, 404, { error: 'المادة غير موجودة' });
          return sendJSON(res, 200, updated);
        }
        if (method === 'DELETE') {
          if (!isAuthorizedAdmin(req)) return sendJSON(res, 401, { error: 'غير مصرح' });
          const success = db.deleteSubject(subjectId);
          if (!success) return sendJSON(res, 404, { error: 'المادة غير موجودة' });
          return sendJSON(res, 200, { success: true });
        }
      }

      // 3. QUIZZES
      if (pathname === '/api/quizzes') {
        if (method === 'GET') {
          const quizzes = db.getQuizzes(parsedUrl.query);
          return sendJSON(res, 200, quizzes);
        }
        if (method === 'POST') {
          if (!isAuthorizedAdmin(req)) return sendJSON(res, 401, { error: 'غير مصرح' });
          const bodyStr = await parseRequestBody(req);
          const payload = JSON.parse(bodyStr);
          const created = db.createQuiz(payload);
          return sendJSON(res, 201, created);
        }
      }

      // Student Take Quiz (sanitized questions without answers or source tracking)
      const takeQuizMatch = pathname.match(/^\/api\/quizzes\/([^\/]+)\/take$/);
      if (takeQuizMatch && method === 'GET') {
        const quizId = decodeURIComponent(takeQuizMatch[1]);
        const studentQuiz = db.getQuizForStudent(quizId);
        if (!studentQuiz) return sendJSON(res, 404, { error: 'الاختبار غير موجود' });
        return sendJSON(res, 200, studentQuiz);
      }

      // Student Submit Quiz (grading & review with score out of 100)
      const submitQuizMatch = pathname.match(/^\/api\/quizzes\/([^\/]+)\/submit$/);
      if (submitQuizMatch && method === 'POST') {
        const quizId = decodeURIComponent(submitQuizMatch[1]);
        if (!db.getQuizForStudent(quizId)) return sendJSON(res, 404, { error: 'الاختبار غير موجود' });
        const bodyStr = await parseRequestBody(req);
        const payload = JSON.parse(bodyStr);
        const result = db.gradeSubmission(quizId, payload.answers || {});
        return sendJSON(res, 200, result);
      }

      // Printable Quiz for Students
      const printQuizMatch = pathname.match(/^\/api\/quizzes\/([^\/]+)\/print$/);
      if (printQuizMatch && method === 'GET') {
        const quizId = decodeURIComponent(printQuizMatch[1]);
        const printData = db.getQuizForPrint(quizId, false);
        if (!printData) return sendJSON(res, 404, { error: 'الاختبار غير موجود' });
        return sendJSON(res, 200, printData);
      }

      // Printable Answer Key for Admins Only
      const printKeyMatch = pathname.match(/^\/api\/quizzes\/([^\/]+)\/print-key$/);
      if (printKeyMatch && method === 'GET') {
        if (!isAuthorizedAdmin(req)) return sendJSON(res, 401, { error: 'نموذج الإجابة مخصص للمشرفين فقط' });
        const quizId = decodeURIComponent(printKeyMatch[1]);
        const keyData = db.getQuizForPrint(quizId, true);
        if (!keyData) return sendJSON(res, 404, { error: 'الاختبار غير موجود' });
        return sendJSON(res, 200, keyData);
      }

      const quizMatch = pathname.match(/^\/api\/quizzes\/([^\/]+)$/);
      if (quizMatch) {
        const quizId = decodeURIComponent(quizMatch[1]);
        if (method === 'GET') {
          if (!isAuthorizedAdmin(req)) return sendJSON(res, 401, { error: 'غير مصرح' });
          const qz = db.getQuizById(quizId);
          if (!qz) return sendJSON(res, 404, { error: 'الاختبار غير موجود' });
          return sendJSON(res, 200, qz);
        }
        if (method === 'PUT') {
          if (!isAuthorizedAdmin(req)) return sendJSON(res, 401, { error: 'غير مصرح' });
          const bodyStr = await parseRequestBody(req);
          const payload = JSON.parse(bodyStr);
          const updated = db.updateQuiz(quizId, payload);
          if (!updated) return sendJSON(res, 404, { error: 'الاختبار غير موجود' });
          return sendJSON(res, 200, updated);
        }
        if (method === 'DELETE') {
          if (!isAuthorizedAdmin(req)) return sendJSON(res, 401, { error: 'غير مصرح' });
          const success = db.deleteQuiz(quizId);
          if (!success) return sendJSON(res, 404, { error: 'الاختبار غير موجود' });
          return sendJSON(res, 200, { success: true });
        }
      }

      // 4. QUESTIONS & QUESTION BANK
      if (pathname === '/api/questions') {
        if (method === 'GET') {
          if (!isAuthorizedAdmin(req)) return sendJSON(res, 401, { error: 'غير مصرح' });
          const data = db.getQuestions(parsedUrl.query);
          return sendJSON(res, 200, data);
        }
        if (method === 'POST') {
          if (!isAuthorizedAdmin(req)) return sendJSON(res, 401, { error: 'غير مصرح' });
          const bodyStr = await parseRequestBody(req);
          const payload = JSON.parse(bodyStr);
          const created = db.createQuestion(payload);
          return sendJSON(res, 201, created);
        }
      }

      // 5. REVIEW QUEUE (Admin Only)
      if (pathname === '/api/review-queue' && method === 'GET') {
        if (!isAuthorizedAdmin(req)) return sendJSON(res, 401, { error: 'قائمة المراجعة مخصصة للمشرفين فقط' });
        const queue = db.getReviewQueue();
        return sendJSON(res, 200, { count: queue.length, questions: queue });
      }

      const questionMatch = pathname.match(/^\/api\/questions\/([^\/]+)$/);
      if (questionMatch) {
        const questionId = decodeURIComponent(questionMatch[1]);
        if (method === 'GET') {
          if (!isAuthorizedAdmin(req)) return sendJSON(res, 401, { error: 'غير مصرح' });
          const q = db.getQuestionById(questionId);
          if (!q) return sendJSON(res, 404, { error: 'السؤال غير موجود' });
          return sendJSON(res, 200, q);
        }
        if (method === 'PUT') {
          if (!isAuthorizedAdmin(req)) return sendJSON(res, 401, { error: 'غير مصرح' });
          const bodyStr = await parseRequestBody(req);
          const payload = JSON.parse(bodyStr);
          const updated = db.updateQuestion(questionId, payload);
          if (!updated) return sendJSON(res, 404, { error: 'السؤال غير موجود' });
          return sendJSON(res, 200, updated);
        }
        if (method === 'DELETE') {
          if (!isAuthorizedAdmin(req)) return sendJSON(res, 401, { error: 'غير مصرح' });
          const success = db.deleteQuestion(questionId);
          if (!success) return sendJSON(res, 404, { error: 'السؤال غير موجود' });
          return sendJSON(res, 200, { success: true });
        }
      }

      // 6. RANDOM QUIZ
      if (pathname === '/api/random-quiz' && method === 'GET') {
        const count = Number(parsedUrl.query.count || 10);
        if (!Number.isInteger(count) || count < 1 || count > 100) {
          return sendJSON(res, 400, { error: 'عدد الأسئلة يجب أن يكون بين 1 و100' });
        }
        const randomQuiz = db.generateRandomQuiz({
          subjectId: parsedUrl.query.subjectId || null,
          count,
          topicId: parsedUrl.query.topicId || null,
          difficulty: parsedUrl.query.difficulty || null
        });
        return sendJSON(res, 200, randomQuiz);
      }

      if (pathname === '/api/random-quiz/submit' && method === 'POST') {
        const bodyStr = await parseRequestBody(req);
        const payload = JSON.parse(bodyStr);
        const questionIds = payload.questionIds;
        if (!Array.isArray(questionIds) || questionIds.length < 1 || questionIds.length > 100 ||
            new Set(questionIds).size !== questionIds.length ||
            !questionIds.every(id => typeof id === 'string' &&
              db.data.questions.some(q => q.id === id && q.status === 'Verified'))) {
          return sendJSON(res, 400, { error: 'قائمة أسئلة التدريب غير صالحة' });
        }
        const result = db.gradeRandomQuiz(questionIds, payload.answers || {});
        return sendJSON(res, 200, result);
      }

      // 7. IMPORT (Admin Only)
      if (pathname === '/api/import/json' && method === 'POST') {
        if (!isAuthorizedAdmin(req)) return sendJSON(res, 401, { error: 'غير مصرح' });
        const bodyStr = await parseRequestBody(req);
        const payload = JSON.parse(bodyStr);
        const result = db.importQuestions(
          payload.questions || payload,
          payload.defaultSubjectId || null,
          payload.defaultQuizId || null
        );
        return sendJSON(res, 200, result);
      }

      if (pathname === '/api/import/csv' && method === 'POST') {
        if (!isAuthorizedAdmin(req)) return sendJSON(res, 401, { error: 'غير مصرح' });
        const bodyStr = await parseRequestBody(req);
        let csvText = bodyStr;
        let defaultSubjectId = null;
        let defaultQuizId = null;

        try {
          const parsed = JSON.parse(bodyStr);
          if (parsed.csv) {
            csvText = parsed.csv;
            defaultSubjectId = parsed.defaultSubjectId || null;
            defaultQuizId = parsed.defaultQuizId || null;
          }
        } catch (_) {}

        const result = db.parseCSV(csvText, defaultSubjectId, defaultQuizId);
        return sendJSON(res, 200, result);
      }

      // 8. BACKUP & RESTORE (Admin Only)
      if (pathname === '/api/backup' && method === 'POST') {
        if (!isAuthorizedAdmin(req)) return sendJSON(res, 401, { error: 'غير مصرح' });
        const backupPath = db.createBackup();
        return sendJSON(res, 200, {
          success: true,
          backupFile: path.basename(backupPath),
          fullPath: backupPath,
          timestamp: new Date().toISOString()
        });
      }

      if (pathname === '/api/backup/download' && method === 'GET') {
        if (!isAuthorizedAdmin(req)) return sendJSON(res, 401, { error: 'غير مصرح' });
        res.writeHead(200, {
          'Content-Type': 'application/json',
          'Content-Disposition': 'attachment; filename="cne-quizzes-backup.json"'
        });
        return res.end(JSON.stringify(db.data, null, 2));
      }

      if (pathname === '/api/restore' && method === 'POST') {
        if (!isAuthorizedAdmin(req)) return sendJSON(res, 401, { error: 'غير مصرح' });
        const bodyStr = await parseRequestBody(req);
        const payload = JSON.parse(bodyStr);
        if (!payload || !Array.isArray(payload.subjects) || !Array.isArray(payload.questions)) {
          return sendJSON(res, 400, { error: 'ملف النسخة الاحتياطية غير صالح أو تالف' });
        }
        if (payload.admin &&
            (typeof payload.admin.username !== 'string' ||
             typeof payload.admin.salt !== 'string' ||
             typeof payload.admin.passwordHash !== 'string')) {
          return sendJSON(res, 400, { error: 'بيانات حساب المشرف في النسخة الاحتياطية غير صالحة' });
        }
        if (!['127.0.0.1', 'localhost', '::1'].includes(HOST) && !process.env.ADMIN_PASSWORD &&
            payload.admin && db.matchesPassword('cne_committee_2025', payload.admin)) {
          return sendJSON(res, 400, { error: 'لا يمكن استعادة كلمة المرور الافتراضية على خادم عام' });
        }
        db.restoreBackup(payload);
        ACTIVE_ADMIN_TOKENS.clear();
        return sendJSON(res, 200, { success: true, message: 'تم استعادة قاعدة البيانات بنجاح' });
      }

      return sendJSON(res, 404, { error: 'نقطة النهاية غير موجودة' });
    } catch (apiErr) {
      const status = apiErr instanceof SyntaxError ? 400 :
        apiErr.message === 'Payload too large' ? 413 : 500;
      if (status === 500) console.error('API Error:', apiErr);
      return sendJSON(res, status, { error: apiErr.message || 'خطأ داخلي في الخادم' });
    }
  }

  // ================= STATIC FILES =================
  let safePath = pathname;
  if (safePath === '/' || safePath === '') {
    safePath = '/index.html';
  }

  const requestedFile = path.resolve(PUBLIC_DIR, `.${safePath}`);
  const relativePath = path.relative(PUBLIC_DIR, requestedFile);
  if (relativePath === '..' || relativePath.startsWith(`..${path.sep}`) || path.isAbsolute(relativePath)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    return res.end('Access Denied');
  }

  serveStatic(res, requestedFile);
});

if (require.main === module) {
  server.listen(PORT, HOST, () => {
    console.log(`=======================================================`);
    console.log(`CNE Quizzes Platform is running!`);
    console.log(`URL: http://${HOST}:${PORT}`);
    console.log(`PWA Manifest: http://localhost:${PORT}/manifest.json`);
    console.log(`=======================================================`);
  });
}

module.exports = server;
