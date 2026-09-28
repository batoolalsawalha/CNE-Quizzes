const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const crypto = require('crypto');
const db = require('./db');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

// Active authenticated admin session tokens (Token -> expiration timestamp)
const ACTIVE_ADMIN_TOKENS = new Map();

// Helper to verify admin token
function isAuthorizedAdmin(req) {
  let token = (req.headers['authorization'] || '').replace(/^Bearer\s+/i, '').trim();
  if (!token && req.url) {
    try {
      const qIndex = req.url.indexOf('?');
      if (qIndex !== -1) {
        const queryParams = new URLSearchParams(req.url.slice(qIndex));
        token = queryParams.get('token') || '';
      }
    } catch (_) {}
  }
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
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(data));
}

function parseRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      if (body.length > 35 * 1024 * 1024) { // 35MB limit for bulk files
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => resolve(body));
    req.on('error', err => reject(err));
  });
}

function serveStatic(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        const indexPath = path.join(PUBLIC_DIR, 'index.html');
        fs.readFile(indexPath, (indexErr, indexContent) => {
          if (indexErr) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('Not Found');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(indexContent);
          }
        });
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
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method.toUpperCase();

  // Handle CORS preflight
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    res.end();
    return;
  }

  // ================= API ROUTES =================
  if (pathname.startsWith('/api/')) {
    try {
      // 0. ADMIN AUTHENTICATION
      if (pathname === '/api/admin/login' && method === 'POST') {
        const bodyStr = await parseRequestBody(req);
        let username = 'cne_admin';
        let password = '';
        try {
          const parsed = JSON.parse(bodyStr);
          username = parsed.username || 'cne_admin';
          password = parsed.password || '';
        } catch (_) {}

        if (db.verifyAdmin(username, password)) {
          const token = crypto.randomBytes(32).toString('hex');
          ACTIVE_ADMIN_TOKENS.set(token, Date.now() + 24 * 60 * 60 * 1000); // 24hr validity
          return sendJSON(res, 200, {
            success: true,
            token,
            username,
            message: 'تم تسجيل الدخول بنجاح كمسؤول'
          });
        }
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
        if (!newPassword || newPassword.length < 6) {
          return sendJSON(res, 400, { error: 'كلمة المرور الجديدة يجب ألا تقل عن 6 خانات' });
        }
        db.updateAdminCredentials(newUsername, newPassword);
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
        const count = parseInt(parsedUrl.query.count || '10', 10);
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
        const result = db.gradeRandomQuiz(payload.questionIds || [], payload.answers || {});
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
        db.restoreBackup(payload);
        return sendJSON(res, 200, { success: true, message: 'تم استعادة قاعدة البيانات بنجاح' });
      }

      return sendJSON(res, 404, { error: 'نقطة النهاية غير موجودة' });
    } catch (apiErr) {
      console.error('API Error:', apiErr);
      return sendJSON(res, 500, { error: apiErr.message || 'خطأ داخلي في الخادم' });
    }
  }

  // ================= STATIC FILES =================
  let safePath = pathname;
  if (safePath === '/' || safePath === '') {
    safePath = '/index.html';
  }

  const requestedFile = path.normalize(path.join(PUBLIC_DIR, safePath));
  if (!requestedFile.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    return res.end('Access Denied');
  }

  serveStatic(res, requestedFile);
});

server.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`CNE Quizzes Platform is running!`);
  console.log(`URL: http://localhost:${PORT}`);
  console.log(`PWA Manifest: http://localhost:${PORT}/manifest.json`);
  console.log(`=======================================================`);
});
