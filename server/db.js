const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DB_PATH = path.join(__dirname, '..', 'data', 'database.json');
const BACKUP_DIR = path.join(__dirname, '..', 'data', 'backups');
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const QUESTION_STATUSES = new Set(['Verified', 'Needs Review', 'Imported']);
const SAFE_ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._:-]*$/;

class DatabaseManager {
  constructor() {
    this.ensureDirs();
    this.data = this.loadData();
    this.ensureAdminInitialized();
  }

  ensureDirs() {
    const dataDir = path.dirname(DB_PATH);
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    if (!fs.existsSync(BACKUP_DIR)) fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }

  createEmptyData() {
    return {
      version: '2.0.0',
      name: 'CNE Quizzes Master Database',
      lastUpdated: new Date().toISOString(),
      admin: null,
      subjects: [],
      quizzes: [],
      questions: []
    };
  }

  assertDataIntegrity(data = this.data) {
    const errors = [];
    if (!data || typeof data !== 'object') throw new Error('قاعدة البيانات غير صالحة');
    for (const collection of ['subjects', 'quizzes', 'questions']) {
      if (!Array.isArray(data[collection])) errors.push(`${collection} يجب أن تكون قائمة`);
    }
    if (errors.length > 0) throw new Error(errors.join('، '));

    const subjectIds = new Set();
    for (const subject of data.subjects) {
      if (!subject.id || typeof subject.id !== 'string' || !SAFE_ID_PATTERN.test(subject.id)) {
        errors.push('يوجد معرّف مادة مفقود أو غير صالح');
      } else if (subjectIds.has(subject.id)) {
        errors.push(`معرّف المادة مكرر: ${subject.id}`);
      } else {
        subjectIds.add(subject.id);
      }
    }

    const quizIds = new Set();
    for (const quiz of data.quizzes) {
      if (!quiz.id || typeof quiz.id !== 'string' || !SAFE_ID_PATTERN.test(quiz.id)) {
        errors.push('يوجد معرّف اختبار مفقود أو غير صالح');
      } else if (quizIds.has(quiz.id)) {
        errors.push(`معرّف الاختبار مكرر: ${quiz.id}`);
      } else {
        quizIds.add(quiz.id);
      }
      if (!subjectIds.has(quiz.subjectId)) {
        errors.push(`الاختبار ${quiz.id || '(بدون معرّف)'} مرتبط بمادة غير موجودة`);
      }
    }

    const questionIds = new Set();
    const contentKeys = new Map();
    const quizzesById = new Map(data.quizzes.map(quiz => [quiz.id, quiz]));
    for (const question of data.questions) {
      const questionId = question.id || '(بدون معرّف)';
      if (!question.id || typeof question.id !== 'string' || !SAFE_ID_PATTERN.test(question.id)) {
        errors.push('يوجد معرّف سؤال مفقود أو غير صالح');
      } else if (questionIds.has(question.id)) {
        errors.push(`معرّف السؤال مكرر: ${question.id}`);
      } else {
        questionIds.add(question.id);
      }

      if (!subjectIds.has(question.subjectId)) {
        errors.push(`السؤال ${questionId} مرتبط بمادة غير موجودة`);
      }
      if (question.quizId) {
        const quiz = quizzesById.get(question.quizId);
        if (!quiz) {
          errors.push(`السؤال ${questionId} مرتبط باختبار غير موجود`);
        } else if (quiz.subjectId !== question.subjectId) {
          errors.push(`السؤال ${questionId} واختباره مرتبطان بمادتين مختلفتين`);
        }
      }
      if (!String(question.question || '').trim() && !question.imageUrl) {
        errors.push(`السؤال ${questionId} لا يحتوي نصاً أو صورة`);
      }
      if (!Array.isArray(question.options) || question.options.length < 2) {
        errors.push(`السؤال ${questionId} يجب أن يحتوي خيارين على الأقل`);
      } else {
        const optionIds = question.options.map(option => String(option.id || '').trim().toLowerCase());
        if (optionIds.some(id => !SAFE_ID_PATTERN.test(id)) || new Set(optionIds).size !== optionIds.length) {
          errors.push(`السؤال ${questionId} يحتوي معرّفات خيارات فارغة أو مكررة`);
        }
        if (!optionIds.includes(String(question.correctAnswer || '').trim().toLowerCase())) {
          errors.push(`الإجابة الصحيحة للسؤال ${questionId} لا تطابق أي خيار`);
        }
      }
      if (!QUESTION_STATUSES.has(question.status)) {
        errors.push(`حالة السؤال ${questionId} غير مدعومة`);
      }

      if (question.imageUrl) {
        const imageUrl = String(question.imageUrl).split(/[?#]/, 1)[0];
        if (!imageUrl.startsWith('/images/') || /['"`<>\\]/.test(String(question.imageUrl))) {
          errors.push(`صورة السؤال ${questionId} يجب أن تكون داخل مجلد الصور المحلي`);
        } else {
          let imagePath = '';
          try {
            imagePath = path.resolve(PUBLIC_DIR, `.${decodeURIComponent(imageUrl)}`);
          } catch {
            errors.push(`رابط صورة السؤال ${questionId} غير صالح`);
          }
          if (imagePath && (!imagePath.startsWith(`${path.resolve(PUBLIC_DIR)}${path.sep}`) ||
              (question.status === 'Verified' && !fs.existsSync(imagePath)))) {
            errors.push(`صورة السؤال المعتمد ${questionId} غير موجودة: ${question.imageUrl}`);
          }
        }
      }

      const normalizedText = String(question.question || '').toLowerCase().replace(/\s+/g, ' ').trim();
      const normalizedOptions = Array.isArray(question.options)
        ? question.options.map(option => `${String(option.id || '').toLowerCase()}:${String(option.text || '').toLowerCase().replace(/\s+/g, ' ').trim()}`).join('|')
        : '';
      const placementKey = question.quizId || `subject:${question.subjectId}`;
      const contentKey = `${placementKey}|${normalizedText}|${question.imageUrl || ''}|${normalizedOptions}`;
      if (contentKeys.has(contentKey)) {
        errors.push(`السؤالان ${contentKeys.get(contentKey)} و${questionId} مكرران داخل الاختبار نفسه`);
      } else {
        contentKeys.set(contentKey, questionId);
      }
    }

    if (errors.length > 0) {
      const shown = errors.slice(0, 10).join('؛ ');
      const remaining = errors.length > 10 ? `؛ و${errors.length - 10} أخطاء إضافية` : '';
      throw new Error(`فشل فحص سلامة قاعدة البيانات: ${shown}${remaining}`);
    }
    return true;
  }

  loadData() {
    if (fs.existsSync(DB_PATH)) {
      try {
        const raw = fs.readFileSync(DB_PATH, 'utf-8');
        const data = JSON.parse(raw);
        this.assertDataIntegrity(data);
        return data;
      } catch (err) {
        throw new Error(`تعذر تحميل قاعدة البيانات دون المساس بالملف الأصلي: ${err.message}`);
      }
    }
    return this.createEmptyData();
  }

  saveData() {
    this.assertDataIntegrity(this.data);
    const lastUpdated = new Date().toISOString();
    this.data.lastUpdated = lastUpdated;
    this.data.stats = {
      totalSubjects: this.data.subjects.length,
      activeSubjects: this.data.subjects.filter(subject => subject.isActive !== false).length,
      totalQuizzes: this.data.quizzes.length,
      activeQuizzes: this.data.quizzes.filter(quiz => quiz.isActive !== false).length,
      totalQuestions: this.data.questions.length,
      verifiedQuestions: this.data.questions.filter(question => question.status === 'Verified').length,
      reviewQuestions: this.data.questions.filter(question => question.status === 'Needs Review').length,
      lastUpdated
    };
    const tempPath = `${DB_PATH}.tmp`;
    fs.writeFileSync(tempPath, JSON.stringify(this.data, null, 2), 'utf-8');
    fs.renameSync(tempPath, DB_PATH);
  }

  createBackup() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFile = path.join(BACKUP_DIR, `backup-${timestamp}.json`);
    fs.copyFileSync(DB_PATH, backupFile);
    return backupFile;
  }

  restoreBackup(backupData) {
    if (!backupData || !Array.isArray(backupData.subjects) || !Array.isArray(backupData.questions)) {
      throw new Error('ملف النسخة الاحتياطية غير صالح أو تالف');
    }
    const restoredData = {
      version: backupData.version || '2.0.0',
      name: backupData.name || 'CNE Quizzes Master Database',
      lastUpdated: new Date().toISOString(),
      admin: backupData.admin || this.data.admin,
      subjects: backupData.subjects,
      quizzes: backupData.quizzes || [],
      questions: backupData.questions
    };
    this.assertDataIntegrity(restoredData);
    this.createBackup(); // Create safety snapshot before restoring
    this.data = restoredData;
    this.saveData();
    return true;
  }

  generateId(prefix = 'id') {
    return `${prefix}-${crypto.randomBytes(4).toString('hex')}`;
  }

  // ================= ADMIN AUTHENTICATION =================
  hashPassword(password, salt, iterations = 100000) {
    return crypto.pbkdf2Sync(password, salt, iterations, 64, 'sha512').toString('hex');
  }

  matchesPassword(password, admin) {
    const storedHash = Buffer.from(admin.passwordHash, 'hex');
    const iterations = admin.iterations ? [admin.iterations] : [10000, 100000];
    return iterations.some(count => {
      const computedHash = Buffer.from(this.hashPassword(password, admin.salt, count), 'hex');
      return storedHash.length === computedHash.length && crypto.timingSafeEqual(storedHash, computedHash);
    });
  }

  ensureAdminInitialized() {
    if (process.env.ADMIN_PASSWORD &&
        (process.env.ADMIN_PASSWORD.length < 12 ||
         ['cne_committee_2025', 'replace-with-a-unique-password'].includes(process.env.ADMIN_PASSWORD))) {
      throw new Error('ADMIN_PASSWORD must be a unique password of at least 12 characters');
    }
    if (!this.data.admin || !this.data.admin.passwordHash) {
      const salt = crypto.randomBytes(16).toString('hex');
      const defaultPassword = process.env.ADMIN_PASSWORD || 'cne_committee_2025';
      this.data.admin = {
        username: 'cne_admin',
        salt,
        iterations: 100000,
        passwordHash: this.hashPassword(defaultPassword, salt),
        updatedAt: new Date().toISOString()
      };
      this.saveData();
    } else if (process.env.ADMIN_PASSWORD && this.usesDefaultAdminPassword()) {
      this.updateAdminCredentials(this.data.admin.username, process.env.ADMIN_PASSWORD);
    }
  }

  usesDefaultAdminPassword() {
    const admin = this.data.admin;
    return this.matchesPassword('cne_committee_2025', admin);
  }

  verifyAdmin(username, password) {
    this.ensureAdminInitialized();
    const admin = this.data.admin;
    if (admin.username !== username) return false;
    return this.matchesPassword(password, admin);
  }

  updateAdminCredentials(newUsername, newPassword) {
    const salt = crypto.randomBytes(16).toString('hex');
    const passwordHash = this.hashPassword(newPassword, salt);
    this.data.admin = {
      username: (newUsername || 'cne_admin').trim(),
      salt,
      iterations: 100000,
      passwordHash,
      updatedAt: new Date().toISOString()
    };
    this.saveData();
    return true;
  }

  getAdminInfo() {
    return {
      username: this.data.admin ? this.data.admin.username : 'cne_admin',
      updatedAt: this.data.admin ? this.data.admin.updatedAt : null
    };
  }

  // ================= SUBJECTS =================
  getSubjects(query = {}) {
    let result = [...this.data.subjects];
    if (query.activeOnly === 'true' || query.activeOnly === true) {
      result = result.filter(s => s.isActive !== false);
    }
    if (query.category) {
      result = result.filter(s => s.category === query.category);
    }
    if (query.search) {
      const q = query.search.toLowerCase().trim();
      result = result.filter(s =>
        (s.name && s.name.toLowerCase().includes(q)) ||
        (s.nameAr && s.nameAr.toLowerCase().includes(q)) ||
        (s.code && s.code.toLowerCase().includes(q)) ||
        (s.category && s.category.toLowerCase().includes(q))
      );
    }

    return result.map(subject => {
      const subjectQuizzes = this.data.quizzes.filter(q => q.subjectId === subject.id);
      const subjectQuestions = this.data.questions.filter(q => q.subjectId === subject.id);
      const verifiedQuestions = subjectQuestions.filter(q => q.status === 'Verified');
      return {
        ...subject,
        quizCount: subjectQuizzes.length,
        questionCount: query.activeOnly === 'true' || query.activeOnly === true
          ? verifiedQuestions.length : subjectQuestions.length,
        verifiedQuestionCount: verifiedQuestions.length,
        reviewQuestionCount: subjectQuestions.filter(q => q.status === 'Needs Review').length
      };
    });
  }

  getSubjectById(id) {
    const s = this.data.subjects.find(item => item.id === id);
    if (!s) return null;
    const subjectQuizzes = this.data.quizzes.filter(q => q.subjectId === s.id);
    const subjectQuestions = this.data.questions.filter(q => q.subjectId === s.id);
    return {
      ...s,
      quizCount: subjectQuizzes.length,
      questionCount: subjectQuestions.length,
      quizzes: subjectQuizzes
    };
  }

  createSubject(payload) {
    if (!payload.name && !payload.nameAr) throw new Error('اسم المادة مطلوب');
    const newSubject = {
      id: payload.id || this.generateId('subj'),
      code: (payload.code || '').trim().toUpperCase(),
      name: (payload.name || payload.nameAr).trim(),
      nameAr: (payload.nameAr || payload.name).trim(),
      description: payload.description || '',
      category: payload.category || 'مواد عامة وتخصص',
      topics: payload.topics || [],
      resources: payload.resources || [],
      isActive: payload.isActive !== undefined ? payload.isActive : true,
      createdAt: new Date().toISOString()
    };
    this.assertDataIntegrity({ ...this.data, subjects: [...this.data.subjects, newSubject] });
    this.data.subjects.push(newSubject);
    this.saveData();
    return newSubject;
  }

  updateSubject(id, updates) {
    const idx = this.data.subjects.findIndex(s => s.id === id);
    if (idx === -1) return null;
    const existing = this.data.subjects[idx];
    const updated = {
      ...existing,
      ...updates,
      id: existing.id,
      updatedAt: new Date().toISOString()
    };
    const subjects = [...this.data.subjects];
    subjects[idx] = updated;
    this.assertDataIntegrity({ ...this.data, subjects });
    this.data.subjects = subjects;
    this.saveData();
    return updated;
  }

  deleteSubject(id) {
    const idx = this.data.subjects.findIndex(s => s.id === id);
    if (idx === -1) return false;
    const subjects = this.data.subjects.filter(subject => subject.id !== id);
    this.assertDataIntegrity({ ...this.data, subjects });
    this.data.subjects = subjects;
    this.saveData();
    return true;
  }

  // ================= QUIZZES =================
  getQuizzes(query = {}) {
    let result = [...this.data.quizzes];
    if (query.subjectId) {
      result = result.filter(q => q.subjectId === query.subjectId);
    }
    if (query.examType) {
      result = result.filter(q => q.examType.toLowerCase() === query.examType.toLowerCase());
    }
    if (query.activeOnly === 'true' || query.activeOnly === true) {
      result = result.filter(q => q.isActive !== false);
    }

    return result.map(quiz => {
      const subject = this.data.subjects.find(s => s.id === quiz.subjectId);
      const quizQuestions = this.data.questions.filter(q => q.quizId === quiz.id);
      const verifiedQuestions = quizQuestions.filter(q => q.status === 'Verified');
      return {
        ...quiz,
        subjectName: subject ? (subject.nameAr || subject.name) : 'Unknown Subject',
        subjectNameEn: subject ? subject.name : '',
        subjectCode: subject ? subject.code : '',
        questionCount: query.activeOnly === 'true' || query.activeOnly === true
          ? verifiedQuestions.length : quizQuestions.length,
        verifiedCount: verifiedQuestions.length
      };
    });
  }

  getQuizById(id) {
    const quiz = this.data.quizzes.find(q => q.id === id);
    if (!quiz) return null;
    const subject = this.data.subjects.find(s => s.id === quiz.subjectId);
    const questions = this.data.questions.filter(q => q.quizId === quiz.id);
    return {
      ...quiz,
      subjectName: subject ? (subject.nameAr || subject.name) : 'Unknown Subject',
      subjectNameEn: subject ? subject.name : '',
      subjectCode: subject ? subject.code : '',
      questions
    };
  }

  getPlayableQuestions(quiz) {
    return quiz.questions.filter(q => q.status === 'Verified');
  }

  // Safe quiz payload for students: Strips correct answers, explanations AND internal source references
  getQuizForStudent(id) {
    const quiz = this.getQuizById(id);
    if (!quiz || quiz.isActive === false) return null;
    const sanitizedQuestions = this.getPlayableQuestions(quiz).map((q, idx) => ({
      index: idx + 1,
      id: q.id,
      question: q.question,
      imageUrl: q.imageUrl || null,
      options: q.options || [],
      difficulty: q.difficulty || 'Medium',
      topicId: q.topicId || null
      // NOTE: sourceFile and sourcePage are deliberately excluded for student privacy
    }));

    return {
      id: quiz.id,
      name: quiz.name,
      subjectId: quiz.subjectId,
      subjectName: quiz.subjectName,
      subjectCode: quiz.subjectCode,
      examType: quiz.examType,
      description: quiz.description,
      timeLimitMinutes: quiz.timeLimitMinutes || null,
      totalQuestions: sanitizedQuestions.length,
      questions: sanitizedQuestions
    };
  }

  createQuiz(payload) {
    if (!payload.name || !payload.subjectId) {
      throw new Error('اسم الاختبار والمادة مطلوبان');
    }
    const newQuiz = {
      id: payload.id || this.generateId('quiz'),
      subjectId: payload.subjectId,
      name: payload.name.trim(),
      examType: payload.examType || 'Practice',
      description: payload.description || '',
      timeLimitMinutes: payload.timeLimitMinutes ? parseInt(payload.timeLimitMinutes, 10) : null,
      isActive: payload.isActive !== undefined ? payload.isActive : true,
      createdAt: new Date().toISOString()
    };
    this.assertDataIntegrity({ ...this.data, quizzes: [...this.data.quizzes, newQuiz] });
    this.data.quizzes.push(newQuiz);
    this.saveData();
    return newQuiz;
  }

  updateQuiz(id, updates) {
    const idx = this.data.quizzes.findIndex(q => q.id === id);
    if (idx === -1) return null;
    const existing = this.data.quizzes[idx];
    const updated = {
      ...existing,
      ...updates,
      id: existing.id,
      updatedAt: new Date().toISOString()
    };
    const quizzes = [...this.data.quizzes];
    quizzes[idx] = updated;
    this.assertDataIntegrity({ ...this.data, quizzes });
    this.data.quizzes = quizzes;
    this.saveData();
    return updated;
  }

  deleteQuiz(id) {
    const idx = this.data.quizzes.findIndex(q => q.id === id);
    if (idx === -1) return false;
    const quizzes = this.data.quizzes.filter(quiz => quiz.id !== id);
    this.assertDataIntegrity({ ...this.data, quizzes });
    this.data.quizzes = quizzes;
    this.saveData();
    return true;
  }

  // Grade student quiz submission (Returns score out of 100, percentage, answers, solutions, NO source references)
  gradeSubmission(quizId, userAnswers = {}) {
    const quiz = this.getQuizById(quizId);
    if (!quiz || quiz.isActive === false) throw new Error('الاختبار غير موجود');

    const questions = this.getPlayableQuestions(quiz);
    let correctCount = 0;
    let incorrectCount = 0;
    let unansweredCount = 0;

    const breakdown = questions.map((q, idx) => {
      const studentAnswer = (userAnswers[q.id] || '').trim().toLowerCase();
      const correctAnswer = (q.correctAnswer || '').trim().toLowerCase();
      const isAnswered = Boolean(studentAnswer);
      const isCorrect = isAnswered && studentAnswer === correctAnswer;

      if (!isAnswered) {
        unansweredCount++;
      } else if (isCorrect) {
        correctCount++;
      } else {
        incorrectCount++;
      }

      return {
        index: idx + 1,
        questionId: q.id,
        question: q.question,
        imageUrl: q.imageUrl || null,
        options: q.options || [],
        studentAnswer: studentAnswer || null,
        correctAnswer: q.correctAnswer,
        isCorrect,
        isAnswered,
        explanation: q.explanation || 'لا يوجد شرح إضافي لهذا السؤال.',
        difficulty: q.difficulty
        // NOTE: sourceFile and sourcePage are NEVER returned to students
      };
    });

    const totalQuestions = questions.length;
    const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
    const score100 = percentage; // Score out of 100

    return {
      quizId: quiz.id,
      quizName: quiz.name,
      subjectName: quiz.subjectName,
      totalQuestions,
      correctCount,
      incorrectCount,
      unansweredCount,
      percentage,
      score100,
      scoreFraction: `${correctCount} / ${totalQuestions}`,
      submittedAt: new Date().toISOString(),
      breakdown
    };
  }

  // ================= QUESTIONS =================
  getQuestions(query = {}) {
    let result = [...this.data.questions];

    if (query.subjectId) {
      result = result.filter(q => q.subjectId === query.subjectId);
    }
    if (query.quizId) {
      result = result.filter(q => q.quizId === query.quizId);
    }
    if (query.status) {
      result = result.filter(q => q.status.toLowerCase() === query.status.toLowerCase());
    }
    if (query.difficulty) {
      result = result.filter(q => (q.difficulty || '').toLowerCase() === query.difficulty.toLowerCase());
    }
    if (query.search) {
      const s = query.search.toLowerCase().trim();
      result = result.filter(q =>
        (q.question && q.question.toLowerCase().includes(s)) ||
        (q.explanation && q.explanation.toLowerCase().includes(s)) ||
        (q.id && q.id.toLowerCase().includes(s)) ||
        (q.sourceFile && q.sourceFile.toLowerCase().includes(s))
      );
    }

    const enriched = result.map(q => {
      const subj = this.data.subjects.find(s => s.id === q.subjectId);
      const quiz = this.data.quizzes.find(qz => qz.id === q.quizId);
      return {
        ...q,
        subjectName: subj ? (subj.nameAr || subj.name) : 'Unknown Subject',
        quizName: quiz ? quiz.name : 'Unassigned'
      };
    });

    const total = enriched.length;
    const page = parseInt(query.page || '1', 10);
    const limit = parseInt(query.limit || '50', 10);
    const startIndex = (page - 1) * limit;
    const paginated = limit > 0 ? enriched.slice(startIndex, startIndex + limit) : enriched;

    return {
      total,
      page,
      limit,
      totalPages: limit > 0 ? Math.ceil(total / limit) : 1,
      questions: paginated
    };
  }

  getQuestionById(id) {
    const q = this.data.questions.find(item => item.id === id);
    if (!q) return null;
    const subj = this.data.subjects.find(s => s.id === q.subjectId);
    const quiz = this.data.quizzes.find(qz => qz.id === q.quizId);
    return {
      ...q,
      subjectName: subj ? (subj.nameAr || subj.name) : 'Unknown Subject',
      quizName: quiz ? quiz.name : 'Unassigned'
    };
  }

  getReviewQueue() {
    return this.getQuestions({ status: 'Needs Review', limit: 1000 }).questions;
  }

  createQuestion(payload) {
    if (!payload.question && !payload.imageUrl) {
      throw new Error('يجب إدخال نص السؤال أو صورة السؤال');
    }
    if (!payload.subjectId) {
      throw new Error('المادة مطلوبة');
    }
    if (payload.id && this.data.questions.some(q => q.id === payload.id)) {
      throw new Error('معرف السؤال موجود مسبقاً');
    }
    const newQuestion = {
      id: payload.id || this.generateId('q'),
      subjectId: payload.subjectId,
      quizId: payload.quizId || null,
      topicId: payload.topicId || null,
      question: (payload.question || '').trim(),
      imageUrl: payload.imageUrl || null,
      options: payload.options || [
        { id: 'a', text: '' },
        { id: 'b', text: '' },
        { id: 'c', text: '' },
        { id: 'd', text: '' }
      ],
      correctAnswer: (payload.correctAnswer || 'a').toLowerCase().trim(),
      explanation: payload.explanation || '',
      difficulty: payload.difficulty || 'Medium',
      sourceFile: payload.sourceFile || '',
      sourcePage: payload.sourcePage ? parseInt(payload.sourcePage, 10) : null,
      status: payload.status || 'Verified',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.assertDataIntegrity({ ...this.data, questions: [...this.data.questions, newQuestion] });
    this.data.questions.push(newQuestion);
    this.saveData();
    return newQuestion;
  }

  updateQuestion(id, updates) {
    const idx = this.data.questions.findIndex(q => q.id === id);
    if (idx === -1) return null;
    const existing = this.data.questions[idx];
    const updated = {
      ...existing,
      ...updates,
      id: existing.id,
      updatedAt: new Date().toISOString()
    };
    const questions = [...this.data.questions];
    questions[idx] = updated;
    this.assertDataIntegrity({ ...this.data, questions });
    this.data.questions = questions;
    this.saveData();
    return updated;
  }

  deleteQuestion(id) {
    const idx = this.data.questions.findIndex(q => q.id === id);
    if (idx === -1) return false;
    this.data.questions.splice(idx, 1);
    this.saveData();
    return true;
  }

  // ================= RANDOM PRACTICE QUIZ =================
  generateRandomQuiz({ subjectId, count = 10, topicId = null, difficulty = null }) {
    let pool = this.data.questions.filter(q => q.status === 'Verified');
    if (subjectId) {
      pool = pool.filter(q => q.subjectId === subjectId);
    }
    if (topicId) {
      pool = pool.filter(q => q.topicId === topicId);
    }
    if (difficulty) {
      pool = pool.filter(q => (q.difficulty || '').toLowerCase() === difficulty.toLowerCase());
    }

    const shuffled = [...pool];
    for (let index = shuffled.length - 1; index > 0; index--) {
      const swapIndex = crypto.randomInt(index + 1);
      [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
    }
    const selected = shuffled.slice(0, Math.min(count, shuffled.length));
    const subject = this.data.subjects.find(s => s.id === subjectId);

    const questionsForStudent = selected.map((q, idx) => ({
      index: idx + 1,
      id: q.id,
      question: q.question,
      imageUrl: q.imageUrl || null,
      options: q.options || [],
      difficulty: q.difficulty || 'Medium',
      topicId: q.topicId || null
      // NOTE: sourceFile and sourcePage are strictly omitted for students
    }));

    return {
      id: `random-${Date.now()}`,
      name: `اختبار تدريبي سريع (${subject ? (subject.nameAr || subject.name) : 'جميع المواد'})`,
      subjectId: subjectId || null,
      subjectName: subject ? (subject.nameAr || subject.name) : 'جميع المواد',
      examType: 'Practice',
      isRandom: true,
      totalQuestions: questionsForStudent.length,
      questions: questionsForStudent,
      questionIds: selected.map(q => q.id)
    };
  }

  gradeRandomQuiz(questionIds = [], userAnswers = {}) {
    const questions = questionIds
      .map(id => this.data.questions.find(q => q.id === id))
      .filter(Boolean);

    let correctCount = 0;
    let incorrectCount = 0;
    let unansweredCount = 0;

    const breakdown = questions.map((q, idx) => {
      const studentAnswer = (userAnswers[q.id] || '').trim().toLowerCase();
      const correctAnswer = (q.correctAnswer || '').trim().toLowerCase();
      const isAnswered = Boolean(studentAnswer);
      const isCorrect = isAnswered && studentAnswer === correctAnswer;

      if (!isAnswered) unansweredCount++;
      else if (isCorrect) correctCount++;
      else incorrectCount++;

      return {
        index: idx + 1,
        questionId: q.id,
        question: q.question,
        imageUrl: q.imageUrl || null,
        options: q.options || [],
        studentAnswer: studentAnswer || null,
        correctAnswer: q.correctAnswer,
        isCorrect,
        isAnswered,
        explanation: q.explanation || 'لا يوجد شرح إضافي.',
        difficulty: q.difficulty
      };
    });

    const totalQuestions = questions.length;
    const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
    const score100 = percentage;

    return {
      quizId: 'random',
      quizName: 'اختبار تدريبي عشوائي',
      subjectName: 'تدريب متنوع',
      totalQuestions,
      correctCount,
      incorrectCount,
      unansweredCount,
      percentage,
      score100,
      scoreFraction: `${correctCount} / ${totalQuestions}`,
      submittedAt: new Date().toISOString(),
      breakdown
    };
  }

  // ================= PRINT & PDF DATA =================
  getQuizForPrint(quizId, includeAnswers = false) {
    const quiz = this.getQuizById(quizId);
    if (!quiz) return null;
    const subject = this.data.subjects.find(s => s.id === quiz.subjectId);
    const questions = this.getPlayableQuestions(quiz).map((q, idx) => {
      const base = {
        index: idx + 1,
        id: q.id,
        question: q.question,
        imageUrl: q.imageUrl || null,
        options: q.options || [],
        difficulty: q.difficulty || 'Medium'
      };
      if (includeAnswers) {
        base.correctAnswer = q.correctAnswer;
        base.explanation = q.explanation || '';
      }
      return base;
    });

    return {
      id: quiz.id,
      name: quiz.name,
      subjectName: subject ? (subject.nameAr || subject.name) : 'Unknown Subject',
      subjectCode: subject ? subject.code : '',
      examType: quiz.examType,
      description: quiz.description,
      timeLimitMinutes: quiz.timeLimitMinutes || null,
      totalQuestions: questions.length,
      includeAnswers: Boolean(includeAnswers),
      questions
    };
  }

  // ================= BULK IMPORT =================
  importQuestions(items, defaultSubjectId = null, defaultQuizId = null) {
    if (!Array.isArray(items)) throw new Error('بيانات الاستيراد يجب أن تكون مصفوفة من الأسئلة');
    const imported = [];
    const errors = [];
    const usedIds = new Set(this.data.questions.map(q => q.id));

    items.forEach((item, index) => {
      try {
        const subjectId = item.subjectId || defaultSubjectId;
        if (!subjectId) throw new Error('معرف المادة (subjectId) مفقود');
        if (!item.question && !item.imageUrl) throw new Error('نص السؤال أو صورته مفقودة');
        if (item.id && usedIds.has(item.id)) {
          throw new Error('معرف السؤال موجود مسبقاً');
        }

        let options = [];
        if (Array.isArray(item.options)) {
          options = item.options.map((opt, index) => {
            const optionId = String.fromCharCode(97 + index);
            if (typeof opt === 'string') return { id: optionId, text: opt };
            return { id: String(opt.id || optionId).trim().toLowerCase(), text: opt.text || '' };
          });
        } else if (item.optionA || item.optionB || item.optionC || item.optionD) {
          options = [
            { id: 'a', text: item.optionA || '' },
            { id: 'b', text: item.optionB || '' },
            { id: 'c', text: item.optionC || '' },
            { id: 'd', text: item.optionD || '' }
          ];
        }
        const correctAnswer = (item.correctAnswer || 'a').toLowerCase().trim();
        if (!options.some(option => option.id === correctAnswer)) {
          throw new Error('الإجابة الصحيحة لا تطابق أي خيار');
        }

        const newQ = {
          id: item.id || this.generateId('q'),
          subjectId,
          quizId: item.quizId || defaultQuizId || null,
          topicId: item.topicId || null,
          question: (item.question || '').trim(),
          imageUrl: item.imageUrl || null,
          options,
          correctAnswer,
          explanation: item.explanation || '',
          difficulty: item.difficulty || 'Medium',
          sourceFile: item.sourceFile || 'Bulk Import',
          sourcePage: item.sourcePage ? parseInt(item.sourcePage, 10) : null,
          status: item.status || 'Verified',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        this.assertDataIntegrity({ ...this.data, questions: [...this.data.questions, newQ] });
        this.data.questions.push(newQ);
        usedIds.add(newQ.id);
        imported.push(newQ);
      } catch (err) {
        errors.push({ row: index + 1, error: err.message });
      }
    });

    if (imported.length > 0) {
      this.saveData();
    }

    return { importedCount: imported.length, errors, imported };
  }

  parseCSV(csvText, defaultSubjectId = null, defaultQuizId = null) {
    const lines = csvText.split(/\r?\n/).filter(line => line.trim().length > 0);
    if (lines.length < 2) throw new Error('ملف CSV يجب أن يحتوي على صف العناوين وبيانات الأسئلة');

    const parseCSVLine = (text) => {
      const result = [];
      let current = '';
      let inQuotes = false;
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (char === '"') {
          if (inQuotes && text[i + 1] === '"') {
            current += '"';
            i++;
          } else {
            inQuotes = !inQuotes;
          }
        } else if (char === ',' && !inQuotes) {
          result.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      result.push(current.trim());
      return result;
    };

    const headers = parseCSVLine(lines[0]).map(h => h.toLowerCase().replace(/[^a-z0-9]/g, ''));
    const items = [];

    for (let i = 1; i < lines.length; i++) {
      const values = parseCSVLine(lines[i]);
      if (values.length === 0 || (values.length === 1 && values[0] === '')) continue;
      const obj = {};
      headers.forEach((h, idx) => {
        obj[h] = values[idx] !== undefined ? values[idx] : '';
      });

      items.push({
        subjectId: obj.subjectid || defaultSubjectId,
        quizId: obj.quizid || defaultQuizId,
        question: obj.question || '',
        imageUrl: obj.imageurl || obj.image || null,
        optionA: obj.optiona || obj.a || '',
        optionB: obj.optionb || obj.b || '',
        optionC: obj.optionc || obj.c || '',
        optionD: obj.optiond || obj.d || '',
        correctAnswer: (obj.correctanswer || obj.answer || 'a').toLowerCase().trim(),
        explanation: obj.explanation || '',
        difficulty: obj.difficulty || 'Medium',
        sourceFile: obj.sourcefile || 'CSV Import',
        sourcePage: obj.sourcepage || null,
        status: obj.status || 'Verified'
      });
    }

    return this.importQuestions(items, defaultSubjectId, defaultQuizId);
  }

  // System Statistics
  getStats() {
    const totalSubjects = this.data.subjects.length;
    const activeSubjects = this.data.subjects.filter(s => s.isActive !== false).length;
    const totalQuizzes = this.data.quizzes.length;
    const activeQuizzes = this.data.quizzes.filter(q => q.isActive !== false).length;
    const totalQuestions = this.data.questions.length;
    const verifiedQuestions = this.data.questions.filter(q => q.status === 'Verified').length;
    const reviewQuestions = this.data.questions.filter(q => q.status === 'Needs Review').length;
    const importedQuestions = this.data.questions.filter(q => q.status === 'Imported').length;

    return {
      totalSubjects,
      activeSubjects,
      totalQuizzes,
      activeQuizzes,
      totalQuestions,
      verifiedQuestions,
      reviewQuestions,
      importedQuestions,
      lastUpdated: this.data.lastUpdated
    };
  }
}

module.exports = new DatabaseManager();
