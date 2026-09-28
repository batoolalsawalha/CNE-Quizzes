/**
 * CNE Quizzes - API Client (Arabic Native)
 */

const API = {
  // Token & Auth State
  getToken() {
    return localStorage.getItem('cne_admin_token') || '';
  },

  setToken(token) {
    if (token) {
      localStorage.setItem('cne_admin_token', token);
    } else {
      localStorage.removeItem('cne_admin_token');
    }
  },

  isAdminLoggedIn() {
    return Boolean(this.getToken());
  },

  getAuthHeaders(extra = {}) {
    const headers = { ...extra };
    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  },

  // Admin Authentication
  async adminLogin(username, password) {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'فشل تسجيل الدخول كمسؤول');
    }
    this.setToken(data.token);
    return data;
  },

  async adminVerify() {
    const token = this.getToken();
    if (!token) return { authorized: false };
    try {
      const res = await fetch('/api/admin/verify', {
        headers: this.getAuthHeaders()
      });
      if (res.ok) {
        return res.json();
      }
      this.setToken(null);
      return { authorized: false };
    } catch (_) {
      return { authorized: false };
    }
  },

  async adminLogout() {
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
        headers: this.getAuthHeaders()
      });
    } catch (_) {}
    this.setToken(null);
  },

  async adminChangeCredentials(newUsername, newPassword) {
    const res = await fetch('/api/admin/change-credentials', {
      method: 'POST',
      headers: this.getAuthHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ newUsername, newPassword })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'فشل تحديث بيانات الحساب');
    return data;
  },

  // Stats
  async getStats() {
    const res = await fetch('/api/stats');
    if (!res.ok) throw new Error('Failed to fetch stats');
    return res.json();
  },

  // Subjects
  async getSubjects(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`/api/subjects?${query}`);
    if (!res.ok) throw new Error('Failed to fetch subjects');
    return res.json();
  },

  async getSubject(id) {
    const res = await fetch(`/api/subjects/${encodeURIComponent(id)}`);
    if (!res.ok) throw new Error('Subject not found');
    return res.json();
  },

  async createSubject(data) {
    const res = await fetch('/api/subjects', {
      method: 'POST',
      headers: this.getAuthHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to create subject');
    }
    return res.json();
  },

  async updateSubject(id, data) {
    const res = await fetch(`/api/subjects/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: this.getAuthHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to update subject');
    }
    return res.json();
  },

  async deleteSubject(id) {
    const res = await fetch(`/api/subjects/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to delete subject');
    }
    return res.json();
  },

  // Quizzes
  async getQuizzes(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`/api/quizzes?${query}`);
    if (!res.ok) throw new Error('Failed to fetch quizzes');
    return res.json();
  },

  async getQuiz(id) {
    const res = await fetch(`/api/quizzes/${encodeURIComponent(id)}`);
    if (!res.ok) throw new Error('Quiz not found');
    return res.json();
  },

  async getQuizForStudent(id) {
    const res = await fetch(`/api/quizzes/${encodeURIComponent(id)}/take`);
    if (!res.ok) throw new Error('Failed to load quiz');
    return res.json();
  },

  async submitQuiz(id, answers) {
    const res = await fetch(`/api/quizzes/${encodeURIComponent(id)}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers })
    });
    if (!res.ok) throw new Error('Failed to submit quiz');
    return res.json();
  },

  async createQuiz(data) {
    const res = await fetch('/api/quizzes', {
      method: 'POST',
      headers: this.getAuthHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to create quiz');
    }
    return res.json();
  },

  async updateQuiz(id, data) {
    const res = await fetch(`/api/quizzes/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: this.getAuthHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to update quiz');
    }
    return res.json();
  },

  async deleteQuiz(id) {
    const res = await fetch(`/api/quizzes/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to delete quiz');
    }
    return res.json();
  },

  // Questions
  async getQuestions(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`/api/questions?${query}`);
    if (!res.ok) throw new Error('Failed to fetch questions');
    return res.json();
  },

  async getQuestion(id) {
    const res = await fetch(`/api/questions/${encodeURIComponent(id)}`);
    if (!res.ok) throw new Error('Question not found');
    return res.json();
  },

  async createQuestion(data) {
    const res = await fetch('/api/questions', {
      method: 'POST',
      headers: this.getAuthHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to create question');
    }
    return res.json();
  },

  async updateQuestion(id, data) {
    const res = await fetch(`/api/questions/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: this.getAuthHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to update question');
    }
    return res.json();
  },

  async deleteQuestion(id) {
    const res = await fetch(`/api/questions/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to delete question');
    }
    return res.json();
  },

  async getReviewQueue() {
    const res = await fetch('/api/review-queue', {
      headers: this.getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch review queue');
    return res.json();
  },

  // Random Quiz
  async getRandomQuiz(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`/api/random-quiz?${query}`);
    if (!res.ok) throw new Error('Failed to generate random quiz');
    return res.json();
  },

  async submitRandomQuiz(questionIds, answers) {
    const res = await fetch('/api/random-quiz/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ questionIds, answers })
    });
    if (!res.ok) throw new Error('Failed to submit random quiz');
    return res.json();
  },

  // Import
  async importJSON(payload) {
    const res = await fetch('/api/import/json', {
      method: 'POST',
      headers: this.getAuthHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'JSON Import failed');
    }
    return res.json();
  },

  async importCSV(payload) {
    const res = await fetch('/api/import/csv', {
      method: 'POST',
      headers: this.getAuthHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'CSV Import failed');
    }
    return res.json();
  },

  // Backup & Restore
  async triggerBackup() {
    const res = await fetch('/api/backup', {
      method: 'POST',
      headers: this.getAuthHeaders()
    });
    if (!res.ok) throw new Error('Backup failed');
    return res.json();
  },

  async restoreBackup(backupData) {
    const res = await fetch('/api/restore', {
      method: 'POST',
      headers: this.getAuthHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(backupData)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'فشلت استعادة النسخة الاحتياطية');
    }
    return res.json();
  }
};
