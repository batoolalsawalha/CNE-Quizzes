/**
 * CNE Quizzes - لوحة تحكم اللجنة الأكاديمية (Arabic Native)
 */

const AdminPanel = {
  currentTab: 'overview',
  subjects: [],
  quizzes: [],
  questionsData: { questions: [], total: 0, page: 1, totalPages: 1 },
  stats: {},
  filters: {
    search: '',
    subjectId: '',
    quizId: '',
    status: '',
    difficulty: ''
  },

  adminInfo: null,

  async render(tab = 'overview') {
    this.currentTab = tab;
    const root = document.getElementById('app-root');
    root.innerHTML = `
      <div class="loader-container">
        <div class="spinner"></div>
        <p>جاري التحقق من صلاحيات المشرف...</p>
      </div>
    `;

    try {
      // 1. التحقق من صلاحيات المشرف
      const auth = await API.adminVerify();
      if (!auth.authorized) {
        const adminNav = document.getElementById('nav-admin-link');
        if (adminNav) adminNav.style.display = 'none';
        return this.renderLoginForm();
      }

      this.adminInfo = auth.admin || { username: 'cne_admin' };
      const adminNav = document.getElementById('nav-admin-link');
      if (adminNav) adminNav.style.display = 'inline-flex';

      await this.fetchInitialData();
      this.renderLayout();
    } catch (err) {
      console.error(err);
      root.innerHTML = `
        <div class="results-card" style="text-align: center; max-width: 500px; margin: 3rem auto; padding: 2.5rem;">
          <h2>خطأ في لوحة التحكم</h2>
          <p style="color: var(--danger); margin: 1rem 0;">${err.message}</p>
          <button class="btn btn-primary" onclick="AdminPanel.render()">إعادة المحاولة</button>
        </div>
      `;
    }
  },

  renderLoginForm() {
    const root = document.getElementById('app-root');
    root.innerHTML = `
      <div class="admin-login-wrapper">
        <div class="admin-login-card">
          <div class="admin-login-header">
            <div class="admin-login-icon">🔒</div>
            <h2 style="font-size: 1.6rem; font-weight: 900; margin-bottom: 0.5rem;">بوابة المشرفين الأكاديميين</h2>
            <p style="font-size: 0.95rem; color: var(--text-secondary);">
              منطقة خاصة بأعضاء لجنة CNE الأكاديمية لإدارة المناهج وبنوك الأسئلة والامتحانات
            </p>
          </div>

          <form id="admin-login-form">
            <div class="form-group" style="margin-bottom: 1.25rem;">
              <label class="form-label" style="font-weight: 700;">اسم المستخدم</label>
              <input type="text" class="form-control" id="login-username" value="cne_admin" required autofocus />
            </div>

            <div class="form-group" style="margin-bottom: 1.5rem;">
              <label class="form-label" style="font-weight: 700;">كلمة المرور</label>
              <input type="password" class="form-control" id="login-password" placeholder="أدخل كلمة مرور المشرف" required />
            </div>

            <button type="submit" class="btn btn-primary btn-lg" style="width: 100%;">
              تسجيل الدخول كمسؤول &larr;
            </button>
          </form>

          <div style="margin-top: 1.5rem; text-align: center; padding-top: 1rem; border-top: 1px solid var(--border-color);">
            <a href="#home" style="font-size: 0.9rem; color: var(--text-muted); text-decoration: none;">&rarr; العودة لصفحة الطلاب الرئيسية</a>
          </div>
        </div>
      </div>
    `;

    document.getElementById('admin-login-form').onsubmit = async (e) => {
      e.preventDefault();
      const u = document.getElementById('login-username').value.trim();
      const p = document.getElementById('login-password').value;
      try {
        await API.adminLogin(u, p);
        window.showToast('تم تسجيل الدخول بنجاح كمسؤول', 'success');
        const adminNav = document.getElementById('nav-admin-link');
        if (adminNav) adminNav.style.display = 'inline-flex';
        AdminPanel.render('overview');
      } catch (err) {
        window.showToast(err.message, 'error');
      }
    };
  },

  async fetchInitialData() {
    const [stats, subjects, quizzes] = await Promise.all([
      API.getStats(),
      API.getSubjects(),
      API.getQuizzes()
    ]);
    this.stats = stats;
    this.subjects = subjects;
    this.quizzes = quizzes;

    const reviewBadge = document.getElementById('nav-review-badge');
    if (reviewBadge) {
      if (stats.reviewQuestions > 0) {
        reviewBadge.style.display = 'inline-flex';
        reviewBadge.textContent = stats.reviewQuestions;
      } else {
        reviewBadge.style.display = 'none';
      }
    }
  },

  renderLayout() {
    const root = document.getElementById('app-root');
    const uName = (this.adminInfo && this.adminInfo.username) ? this.adminInfo.username : 'cne_admin';

    root.innerHTML = `
      <div class="admin-layout">
        <!-- ترويسة لوحة التحكم والشريط الأمني -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.5rem;">
          <div>
            <div style="display: flex; align-items: center; gap: 0.6rem;">
              <h1 style="font-size: 1.85rem; font-weight: 900;">لوحة تحكم CNE Quizzes الأكاديمية</h1>
              <span class="quiz-badge badge-verified" style="font-size: 0.8rem;">المشرف: ${this.escapeHTML(uName)}</span>
            </div>
            <p style="color: var(--text-secondary); font-size: 0.95rem; margin-top: 0.25rem;">
              إدارة المواد، الامتحانات، وبنك الأسئلة المعتمدة وتعديلها مباشرة في قاعدة البيانات.
            </p>
          </div>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <button class="btn btn-secondary btn-sm" onclick="AdminPanel.openChangeCredentialsModal()">
              🔐 حساب المشرف
            </button>
            <button class="btn btn-secondary btn-sm" onclick="AdminPanel.downloadBackup()">
              💾 تنزيل نسخة احتياطية
            </button>
            <button class="btn btn-secondary btn-sm" onclick="AdminPanel.openRestoreModal()">
              📤 استعادة نسخة
            </button>
            <button class="btn btn-secondary btn-sm" onclick="ImporterUI.openModal()">
              📥 استيراد أسئلة
            </button>
            <button class="btn btn-outline-danger btn-sm" onclick="AdminPanel.logout()">
              🚪 تسجيل خروج
            </button>
          </div>
        </div>

        <!-- تبويبات لوحة التحكم -->
        <nav class="admin-tabs">
          <button class="admin-tab-btn ${this.currentTab === 'overview' ? 'active' : ''}" data-tab="overview">
            📊 نظرة عامة
          </button>
          <button class="admin-tab-btn ${this.currentTab === 'subjects' ? 'active' : ''}" data-tab="subjects">
            📚 المواد الدراسية (${this.subjects.length})
          </button>
          <button class="admin-tab-btn ${this.currentTab === 'quizzes' ? 'active' : ''}" data-tab="quizzes">
            📝 الامتحانات والكويزات (${this.quizzes.length})
          </button>
          <button class="admin-tab-btn ${this.currentTab === 'questions' ? 'active' : ''}" data-tab="questions">
            🏛️ بنك الأسئلة الشامل (${this.stats.totalQuestions || 0})
          </button>
          <button class="admin-tab-btn ${this.currentTab === 'review' ? 'active' : ''}" data-tab="review" style="color: var(--danger);">
            ⚠️ قائمة المراجعة والتدقيق (${this.stats.reviewQuestions || 0})
          </button>
        </nav>

        <!-- المحتوى الداخلي للتبويب -->
        <div id="admin-content-area">
          ${this.renderTabContent()}
        </div>
      </div>
    `;

    this.attachTabListeners();
  },

  attachTabListeners() {
    document.querySelectorAll('.admin-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        this.currentTab = tab;
        location.hash = `#admin-${tab}`;
        this.renderLayout();
      });
    });

    if (this.currentTab === 'questions') {
      this.attachQuestionBankListeners();
    }
  },

  renderTabContent() {
    switch (this.currentTab) {
      case 'overview':
        return this.renderOverviewTab();
      case 'subjects':
        return this.renderSubjectsTab();
      case 'quizzes':
        return this.renderQuizzesTab();
      case 'questions':
        return this.renderQuestionBankTab();
      case 'review':
        return this.renderReviewQueueTab();
      default:
        return this.renderOverviewTab();
    }
  },

  // ================= 1. تبويب نظرة عامة =================
  renderOverviewTab() {
    const s = this.stats;
    return `
      <div>
        ${s.reviewQuestions > 0 ? `
          <div style="background-color: var(--warning-light); border: 1px solid var(--warning-border); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1.75rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
            <div>
              <strong style="color: var(--warning); font-size: 1.15rem; display: block; margin-bottom: 0.35rem;">
                ⚠️ يوجد ${s.reviewQuestions} سؤالاً في قائمة المراجعة والتدقيق!
              </strong>
              <p style="color: var(--text-primary); font-size: 0.95rem;">
                هذه الأسئلة مستخرجة من أوراق امتحانات قديمة تحتوي على صور أو خط غير واضح وتتطلب تدقيق اللجنة قبل اعتمادها نهائياً.
              </p>
            </div>
            <button class="btn btn-sm btn-primary" onclick="AdminPanel.render('review')">
              فتح قائمة المراجعة الآن &larr;
            </button>
          </div>
        ` : ''}

        <div class="results-summary-grid" style="margin-bottom: 2rem;">
          <div class="summary-tile">
            <div class="summary-tile-num" style="color: var(--primary);">${s.totalSubjects}</div>
            <div class="summary-tile-label">المواد الدراسية (قابلة للتوسع لـ +64)</div>
          </div>
          <div class="summary-tile">
            <div class="summary-tile-num" style="color: var(--accent);">${s.totalQuizzes}</div>
            <div class="summary-tile-label">الامتحانات والكويزات المتاحة</div>
          </div>
          <div class="summary-tile">
            <div class="summary-tile-num" style="color: var(--success);">${s.verifiedQuestions}</div>
            <div class="summary-tile-label">الأسئلة المؤكدة والمعتمدة</div>
          </div>
          <div class="summary-tile">
            <div class="summary-tile-num" style="color: var(--danger);">${s.reviewQuestions}</div>
            <div class="summary-tile-label">أسئلة بانتظار تدقيق اللجنة</div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem;">
          <div class="quiz-card">
            <h3 style="font-size: 1.2rem; font-weight: 800; margin-bottom: 1rem;">⚡ إجراءات سريعة</h3>
            <div style="display: flex; flex-direction: column; gap: 0.6rem;">
              <button class="btn btn-secondary btn-sm" onclick="AdminPanel.openSubjectModal()">
                ➕ إضافة مادة دراسية جديدة
              </button>
              <button class="btn btn-secondary btn-sm" onclick="AdminPanel.openQuizModal()">
                ➕ إنشاء اختبار / امتحان جديد
              </button>
              <button class="btn btn-secondary btn-sm" onclick="AdminPanel.openQuestionModal()">
                ➕ إضافة سؤال جديد لبنك الأسئلة
              </button>
              <button class="btn btn-secondary btn-sm" onclick="ImporterUI.openModal()">
                📥 استيراد جماعي عبر Excel / CSV / JSON
              </button>
            </div>
          </div>

          <div class="quiz-card">
            <h3 style="font-size: 1.2rem; font-weight: 800; margin-bottom: 0.75rem;">🛡️ مبدأ فصل البيانات عن البرمجة</h3>
            <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 0.75rem;">
              جميع المواد والكويزات والأسئلة والخيارات والحلول النموذجية مخزنة في ملف بيانات مستقل بالكامل. أي تعديل تقوم به في هذه اللوحة يُحفظ فوراً في قاعدة البيانات دون أي حاجة لتعديل كود التطبيق.
            </p>
            <div style="font-size: 0.85rem; background: var(--bg-main); padding: 0.6rem 0.85rem; border-radius: 6px; font-family: var(--font-mono); direction: ltr; text-align: left;">
              ملف التخزين: data/database.json
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // ================= 2. تبويب المواد =================
  renderSubjectsTab() {
    return `
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem;">
          <h2 style="font-size: 1.4rem; font-weight: 800;">المواد الدراسية المسجلة (${this.subjects.length})</h2>
          <button class="btn btn-primary btn-sm" onclick="AdminPanel.openSubjectModal()">
            ➕ إضافة مادة جديدة
          </button>
        </div>

        <div class="admin-table-wrap">
          <table class="admin-table">
            <thead>
              <tr>
                <th>رمز المادة (Code)</th>
                <th>اسم المادة بالعربية</th>
                <th>الاسم بالإنجليزية</th>
                <th>التصنيف</th>
                <th>الكويزات</th>
                <th>الأسئلة</th>
                <th>الحالة</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              ${this.subjects.map(s => `
                <tr>
                  <td><strong>${s.code || '—'}</strong></td>
                  <td><strong>${s.nameAr || s.name}</strong></td>
                  <td style="font-family: var(--font-mono); direction: ltr; text-align: right;">${this.escapeHTML(s.name)}</td>
                  <td><span class="quiz-badge badge-practice">${s.category || 'عام'}</span></td>
                  <td>${s.quizCount || 0}</td>
                  <td>${s.questionCount || 0} (${s.verifiedQuestionCount || 0} معتمد)</td>
                  <td>
                    <span class="quiz-badge ${s.isActive !== false ? 'badge-verified' : 'badge-final'}">
                      ${s.isActive !== false ? 'مفعلة' : 'معطلة'}
                    </span>
                  </td>
                  <td>
                    <button class="btn btn-secondary btn-sm" onclick="AdminPanel.openSubjectModal('${s.id}')">تعديل</button>
                    <button class="btn btn-outline-danger btn-sm" onclick="AdminPanel.deleteSubject('${s.id}')">حذف</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // ================= 3. تبويب الاختبارات =================
  renderQuizzesTab() {
    return `
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem;">
          <h2 style="font-size: 1.4rem; font-weight: 800;">الامتحانات والكويزات (${this.quizzes.length})</h2>
          <button class="btn btn-primary btn-sm" onclick="AdminPanel.openQuizModal()">
            ➕ إنشاء امتحان / كويز جديد
          </button>
        </div>

        <div class="admin-table-wrap">
          <table class="admin-table">
            <thead>
              <tr>
                <th>اسم الاختبار</th>
                <th>المادة التابع لها</th>
                <th>نوع الامتحان</th>
                <th>عدد الأسئلة</th>
                <th>الوقت المحدد</th>
                <th>الحالة</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              ${this.quizzes.map(q => `
                <tr>
                  <td><strong>${this.escapeHTML(q.name)}</strong></td>
                  <td>${this.escapeHTML(q.subjectName)}</td>
                  <td>
                    <span class="quiz-badge badge-${(q.examType || 'Practice').toLowerCase()}">
                      ${q.examType === 'Mid' ? 'امتحان ميد' : (q.examType === 'Final' ? 'امتحان فاينل' : 'تدريب')}
                    </span>
                  </td>
                  <td>${q.questionCount || 0} سؤالاً</td>
                  <td>${q.timeLimitMinutes ? q.timeLimitMinutes + ' دقيقة' : 'غير محدد'}</td>
                  <td>
                    <span class="quiz-badge ${q.isActive !== false ? 'badge-verified' : 'badge-final'}">
                      ${q.isActive !== false ? 'مفعل' : 'معطل'}
                    </span>
                  </td>
                  <td>
                    <div style="display: flex; gap: 0.35rem; flex-wrap: wrap;">
                      <a href="/quiz-print.html?id=${encodeURIComponent(q.id)}" target="_blank" class="btn btn-secondary btn-sm" title="طباعة ورقة الامتحان للطلاب بدون حلول">📄 امتحان</a>
                      <a href="/quiz-print.html?id=${encodeURIComponent(q.id)}&key=1&token=${encodeURIComponent(API.getToken())}" target="_blank" class="btn btn-secondary btn-sm" style="color: var(--danger); font-weight: 800;" title="طباعة نموذج الإجابة الرسمي والحلول النموذجية والشروحات">🔑 حلول</a>
                      <button class="btn btn-secondary btn-sm" onclick="AdminPanel.openQuizModal('${q.id}')">تعديل</button>
                      <button class="btn btn-outline-danger btn-sm" onclick="AdminPanel.deleteQuiz('${q.id}')">حذف</button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // ================= 4. تبويب بنك الأسئلة الشامل =================
  renderQuestionBankTab() {
    return `
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 1rem;">
          <div>
            <h2 style="font-size: 1.4rem; font-weight: 800;">بنك الأسئلة المركزي (Master Question Bank)</h2>
            <p style="font-size: 0.95rem; color: var(--text-secondary);">
              البحث في نصوص الأسئلة والمعادلات وتعديل الإجابات والشروحات.
            </p>
          </div>
          <div style="display: flex; gap: 0.5rem;">
            <button class="btn btn-primary btn-sm" onclick="AdminPanel.openQuestionModal()">
              ➕ إضافة سؤال لبنك الأسئلة
            </button>
            <button class="btn btn-secondary btn-sm" onclick="ImporterUI.openModal()">
              📥 استيراد من ملف
            </button>
          </div>
        </div>

        <!-- شريط الفلاتر والبحث -->
        <div class="search-filter-bar">
          <div class="search-input-wrap">
            <input type="text" id="qb-search" class="search-input" placeholder="ابحث في نص السؤال، الشرح، أو المعادلة..." value="${this.filters.search}">
            <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>

          <select id="qb-subject-filter" class="filter-select">
            <option value="">جميع المواد الدراسية</option>
            ${this.subjects.map(s => `
              <option value="${s.id}" ${this.filters.subjectId === s.id ? 'selected' : ''}>${s.nameAr || s.name}</option>
            `).join('')}
          </select>

          <select id="qb-status-filter" class="filter-select">
            <option value="">جميع الحالات</option>
            <option value="Verified" ${this.filters.status === 'Verified' ? 'selected' : ''}>معتمد (Verified)</option>
            <option value="Needs Review" ${this.filters.status === 'Needs Review' ? 'selected' : ''}>بحاجة لمراجعة (Needs Review)</option>
            <option value="Imported" ${this.filters.status === 'Imported' ? 'selected' : ''}>مستورد حديثاً (Imported)</option>
          </select>

          <select id="qb-difficulty-filter" class="filter-select">
            <option value="">جميع درجات الصعوبة</option>
            <option value="Easy" ${this.filters.difficulty === 'Easy' ? 'selected' : ''}>سهل (Easy)</option>
            <option value="Medium" ${this.filters.difficulty === 'Medium' ? 'selected' : ''}>متوسط (Medium)</option>
            <option value="Hard" ${this.filters.difficulty === 'Hard' ? 'selected' : ''}>صعب (Hard)</option>
          </select>
        </div>

        <div id="qb-table-container">
          <div class="loader-container"><div class="spinner"></div></div>
        </div>
      </div>
    `;
  },

  async attachQuestionBankListeners() {
    const searchInput = document.getElementById('qb-search');
    const subjSelect = document.getElementById('qb-subject-filter');
    const statusSelect = document.getElementById('qb-status-filter');
    const diffSelect = document.getElementById('qb-difficulty-filter');

    const triggerFetch = () => {
      this.filters.search = searchInput ? searchInput.value : '';
      this.filters.subjectId = subjSelect ? subjSelect.value : '';
      this.filters.status = statusSelect ? statusSelect.value : '';
      this.filters.difficulty = diffSelect ? diffSelect.value : '';
      this.fetchQuestions();
    };

    if (searchInput) {
      let debounceTimeout;
      searchInput.addEventListener('input', () => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(triggerFetch, 300);
      });
    }

    if (subjSelect) subjSelect.addEventListener('change', triggerFetch);
    if (statusSelect) statusSelect.addEventListener('change', triggerFetch);
    if (diffSelect) diffSelect.addEventListener('change', triggerFetch);

    await this.fetchQuestions();
  },

  async fetchQuestions(page = 1) {
    const container = document.getElementById('qb-table-container');
    if (!container) return;

    try {
      const data = await API.getQuestions({
        search: this.filters.search,
        subjectId: this.filters.subjectId,
        status: this.filters.status,
        difficulty: this.filters.difficulty,
        page,
        limit: 25
      });
      this.questionsData = data;
      this.renderQuestionsTable();
    } catch (err) {
      container.innerHTML = `<p style="color: var(--danger); padding: 1rem;">فشل تحميل الأسئلة: ${err.message}</p>`;
    }
  },

  renderQuestionsTable() {
    const container = document.getElementById('qb-table-container');
    if (!container) return;

    const { questions, total, page, totalPages } = this.questionsData;

    if (questions.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 3rem; background: var(--bg-card); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
          <p style="font-size: 1.1rem; color: var(--text-muted); margin-bottom: 1rem;">لا توجد أسئلة تطابق الفلاتر المحددة.</p>
          <button class="btn btn-secondary btn-sm" onclick="AdminPanel.resetFilters()">إعادة ضبط الفلاتر</button>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="admin-table-wrap">
        <table class="admin-table">
          <thead>
            <tr>
              <th style="width: 120px;">كود السؤال</th>
              <th>نص السؤال</th>
              <th>المادة</th>
              <th>الإجابة</th>
              <th>الحالة</th>
              <th>توثيق المصدر</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            ${questions.map(q => `
              <tr>
                <td><code style="font-size: 0.85rem;">${q.id}</code></td>
                <td>
                  <div style="display: flex; align-items: center; gap: 0.5rem;">
                    ${q.imageUrl ? `<span title="يحتوي على رسم أو مخطط هندسي" onclick="window.openImageZoom('${this.escapeHTML(q.imageUrl)}')" style="cursor: pointer; font-size: 1.15rem;">🖼️</span>` : ''}
                    <div style="max-width: 380px; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; direction: ltr; text-align: left;">
                      ${this.escapeHTML(q.question)}
                    </div>
                  </div>
                </td>
                <td>${this.escapeHTML(q.subjectName)}</td>
                <td><strong style="text-transform: uppercase; color: var(--success); font-size: 1.1rem;">${q.correctAnswer}</strong></td>
                <td>
                  <span class="quiz-badge ${q.status === 'Verified' ? 'badge-verified' : (q.status === 'Needs Review' ? 'badge-review' : 'badge-imported')}">
                    ${q.status === 'Verified' ? 'معتمد' : (q.status === 'Needs Review' ? 'بحاجة لمراجعة' : 'مستورد')}
                  </span>
                </td>
                <td style="font-size: 0.85rem; color: var(--text-muted); direction: ltr; text-align: right;">
                  ${q.sourceFile ? `${this.escapeHTML(q.sourceFile)}${q.sourcePage ? ` (p.${q.sourcePage})` : ''}` : '—'}
                </td>
                <td>
                  <button class="btn btn-secondary btn-sm" onclick="AdminPanel.openQuestionModal('${q.id}')">تعديل</button>
                  <button class="btn btn-outline-danger btn-sm" onclick="AdminPanel.deleteQuestion('${q.id}')">حذف</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem; font-size: 0.95rem; color: var(--text-secondary);">
        <span>عرض ${(page - 1) * 25 + 1} - ${Math.min(page * 25, total)} من إجمالي ${total} سؤالاً</span>
        <div style="display: flex; gap: 0.5rem;">
          <button class="btn btn-secondary btn-sm" ${page <= 1 ? 'disabled' : ''} onclick="AdminPanel.fetchQuestions(${page - 1})">
            &rarr; السابق
          </button>
          <span style="padding: 0.4rem 0.75rem; font-weight: 700;">صفحة ${page} من ${totalPages}</span>
          <button class="btn btn-secondary btn-sm" ${page >= totalPages ? 'disabled' : ''} onclick="AdminPanel.fetchQuestions(${page + 1})">
            التالي &larr;
          </button>
        </div>
      </div>
    `;
  },

  resetFilters() {
    this.filters = { search: '', subjectId: '', quizId: '', status: '', difficulty: '' };
    this.renderLayout();
  },

  // ================= 5. تبويب قائمة المراجعة =================
  async renderReviewQueueTab() {
    try {
      const { questions } = await API.getReviewQueue();
      const container = document.getElementById('admin-content-area');
      if (!container) return '';

      return `
        <div>
          <div style="margin-bottom: 1.5rem;">
            <h2 style="font-size: 1.4rem; font-weight: 900; color: var(--danger);">
              ⚠️ قائمة المراجعة والتدقيق (${questions.length} أسئلة بحاجة لتدقيق)
            </h2>
            <p style="font-size: 1rem; color: var(--text-secondary);">
              القاعدة الأكاديمية: <strong>ممنوع التخمين إطلاقاً</strong>. هذه الأسئلة مستخرجة من أوراق أصلية ولكن تحتوي على رسمة غير مكتملة، أو معادلة مطموسة جزئياً، أو خيارات تحتاج لتأكيد دكتور المادة. يمكن لأي عضو في اللجنة مراجعتها واعتماد الإجابة وتغيير الحالة إلى <strong>معتمد (Verified)</strong>.
            </p>
          </div>

          ${questions.length === 0 ? `
            <div style="text-align: center; padding: 3.5rem; background: var(--bg-card); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
              <div style="font-size: 3rem; margin-bottom: 0.5rem;">🎉</div>
              <h3 style="color: var(--success); margin-bottom: 0.5rem; font-size: 1.4rem;">قائمة المراجعة فارغة تماماً!</h3>
              <p style="color: var(--text-secondary);">جميع الأسئلة الموجودة في النظام معتمدة ومؤكدة بنسبة 100%.</p>
            </div>
          ` : `
            <div style="display: flex; flex-direction: column; gap: 1.25rem;">
              ${questions.map(q => `
                <div class="review-item" style="border-right: 6px solid var(--danger); padding: 1.5rem;">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.75rem;">
                    <div>
                      <span class="quiz-badge badge-review" style="margin-bottom: 0.5rem;">بحاجة لتدقيق ومراجعة</span>
                      <h4 style="font-size: 1.2rem; font-weight: 800; direction: ltr; text-align: left;">${this.escapeHTML(q.question)}</h4>
                    </div>
                    <button class="btn btn-primary btn-sm" onclick="AdminPanel.openQuestionModal('${q.id}')">
                      ✏️ مراجعة واعتماد السؤال
                    </button>
                  </div>

                  ${q.imageUrl ? `
                    <div style="margin: 0.75rem 0; text-align: center; cursor: pointer;" onclick="window.openImageZoom('${this.escapeHTML(q.imageUrl)}')" title="انقر للتكبير">
                      <img src="${this.escapeHTML(q.imageUrl)}" style="max-height: 180px; border-radius: 6px; border: 1px solid var(--border-color);" alt="مخطط السؤال" />
                      <div style="font-size: 0.8rem; color: var(--primary); margin-top: 0.25rem;">🔍 انقر لتكبير المخطط</div>
                    </div>
                  ` : ''}

                  <div style="background: var(--bg-main); padding: 0.85rem 1.1rem; border-radius: var(--radius-sm); font-size: 0.95rem; margin-bottom: 1rem;">
                    <strong>سبب الإدراج في قائمة المراجعة:</strong> ${this.escapeHTML(q.explanation || 'يحتاج لتأكيد من ورقة الامتحان الأصلية')}
                  </div>

                  <div style="display: flex; gap: 1.5rem; font-size: 0.9rem; color: var(--text-muted); flex-wrap: wrap;">
                    <span>المادة: <strong>${this.escapeHTML(q.subjectName)}</strong></span>
                    <span>الملف الأصلي: <strong>${this.escapeHTML(q.sourceFile || 'امتحان ورقي')}</strong></span>
                    <span>الصفحة في الملف: <strong>${q.sourcePage ? 'صفحة ' + q.sourcePage : 'غير محددة'}</strong></span>
                    <span>كود السؤال: <code>${q.id}</code></span>
                  </div>
                </div>
              `).join('')}
            </div>
          `}
        </div>
      `;
    } catch (err) {
      return `<p style="color: var(--danger);">فشل تحميل قائمة المراجعة: ${err.message}</p>`;
    }
  },

  // ================= النوافذ المنبثقة =================
  openSubjectModal(subjectId = null) {
    const s = subjectId ? this.subjects.find(item => item.id === subjectId) : null;
    const isEdit = Boolean(s);

    window.openModal({
      title: isEdit ? 'تعديل بيانات المادة' : 'إضافة مادة دراسية جديدة',
      content: `
        <form id="subject-form">
          <div class="form-group">
            <label class="form-label">اسم المادة بالعربية *</label>
            <input type="text" class="form-control" id="subj-name-ar" required placeholder="مثلاً: تفاضل وتكامل 1" value="${s ? this.escapeHTML(s.nameAr || '') : ''}">
          </div>

          <div class="form-group">
            <label class="form-label">اسم المادة بالإنجليزية</label>
            <input type="text" class="form-control" id="subj-name" required placeholder="e.g. Calculus 1" value="${s ? this.escapeHTML(s.name) : ''}">
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div class="form-group">
              <label class="form-label">رمز المادة (Course Code)</label>
              <input type="text" class="form-control" id="subj-code" placeholder="مثلاً: MATH101, CNE201" value="${s ? this.escapeHTML(s.code || '') : ''}">
            </div>
            <div class="form-group">
              <label class="form-label">التصنيف الأكاديمي</label>
              <input type="text" class="form-control" id="subj-cat" placeholder="مثلاً: هندسة شبكات، رياضيات" value="${s ? this.escapeHTML(s.category || '') : ''}">
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">وصف المادة ومحتوياتها</label>
            <textarea class="form-control" id="subj-desc">${s ? this.escapeHTML(s.description || '') : ''}</textarea>
          </div>

          <div class="form-group" style="display: flex; align-items: center; gap: 0.5rem;">
            <input type="checkbox" id="subj-active" ${!s || s.isActive !== false ? 'checked' : ''}>
            <label for="subj-active" style="font-size: 1rem; font-weight: 600;">تفعيل المادة وظهورها للطلاب في الموقع</label>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1.5rem;">
            <button type="button" class="btn btn-secondary" onclick="window.closeModal()">إلغاء</button>
            <button type="submit" class="btn btn-primary">${isEdit ? 'حفظ التعديلات' : 'إنشاء المادة'}</button>
          </div>
        </form>
      `
    });

    document.getElementById('subject-form').onsubmit = async (e) => {
      e.preventDefault();
      const payload = {
        name: document.getElementById('subj-name').value.trim(),
        nameAr: document.getElementById('subj-name-ar').value.trim(),
        code: document.getElementById('subj-code').value.trim(),
        category: document.getElementById('subj-cat').value.trim(),
        description: document.getElementById('subj-desc').value.trim(),
        isActive: document.getElementById('subj-active').checked
      };

      try {
        if (isEdit) {
          await API.updateSubject(s.id, payload);
          window.showToast('تم تحديث بيانات المادة بنجاح', 'success');
        } else {
          await API.createSubject(payload);
          window.showToast('تمت إضافة المادة بنجاح', 'success');
        }
        window.closeModal();
        await this.fetchInitialData();
        this.renderLayout();
      } catch (err) {
        window.showToast(err.message, 'error');
      }
    };
  },

  async deleteSubject(id) {
    if (!confirm('هل أنت متأكد من رغبتك في حذف هذه المادة؟')) return;
    try {
      await API.deleteSubject(id);
      window.showToast('تم حذف المادة', 'success');
      await this.fetchInitialData();
      this.renderLayout();
    } catch (err) {
      window.showToast(err.message, 'error');
    }
  },

  openQuizModal(quizId = null) {
    const qz = quizId ? this.quizzes.find(item => item.id === quizId) : null;
    const isEdit = Boolean(qz);

    window.openModal({
      title: isEdit ? 'تعديل الاختبار' : 'إنشاء اختبار / امتحان جديد',
      content: `
        <form id="quiz-form">
          <div class="form-group">
            <label class="form-label">المادة التابع لها *</label>
            <select class="form-control" id="quiz-subj-id" required>
              <option value="">-- اختر المادة --</option>
              ${this.subjects.map(s => `
                <option value="${s.id}" ${qz && qz.subjectId === s.id ? 'selected' : ''}>${s.nameAr || s.name} (${s.code})</option>
              `).join('')}
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">اسم الاختبار أو الامتحان *</label>
            <input type="text" class="form-control" id="quiz-name" required placeholder="مثلاً: امتحان ميد تيرم 2024" value="${qz ? this.escapeHTML(qz.name) : ''}">
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div class="form-group">
              <label class="form-label">نوع الامتحان</label>
              <select class="form-control" id="quiz-type">
                <option value="Mid" ${qz && qz.examType === 'Mid' ? 'selected' : ''}>امتحان ميد تيرم (Mid)</option>
                <option value="Final" ${qz && qz.examType === 'Final' ? 'selected' : ''}>امتحان فاينل نهائي (Final)</option>
                <option value="Practice" ${!qz || qz.examType === 'Practice' ? 'selected' : ''}>اختبار تدريبي (Practice)</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">الوقت المحدد (بالدقائق)</label>
              <input type="number" class="form-control" id="quiz-time" placeholder="اختياري (مثلاً: 45)" value="${qz && qz.timeLimitMinutes ? qz.timeLimitMinutes : ''}">
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">الوصف والتعليمات</label>
            <textarea class="form-control" id="quiz-desc">${qz ? this.escapeHTML(qz.description || '') : ''}</textarea>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1.5rem;">
            <button type="button" class="btn btn-secondary" onclick="window.closeModal()">إلغاء</button>
            <button type="submit" class="btn btn-primary">${isEdit ? 'حفظ التعديلات' : 'إنشاء الكويز'}</button>
          </div>
        </form>
      `
    });

    document.getElementById('quiz-form').onsubmit = async (e) => {
      e.preventDefault();
      const payload = {
        subjectId: document.getElementById('quiz-subj-id').value,
        name: document.getElementById('quiz-name').value.trim(),
        examType: document.getElementById('quiz-type').value,
        timeLimitMinutes: document.getElementById('quiz-time').value || null,
        description: document.getElementById('quiz-desc').value.trim()
      };

      try {
        if (isEdit) {
          await API.updateQuiz(qz.id, payload);
          window.showToast('تم تعديل الاختبار بنجاح', 'success');
        } else {
          await API.createQuiz(payload);
          window.showToast('تم إنشاء الاختبار بنجاح', 'success');
        }
        window.closeModal();
        await this.fetchInitialData();
        this.renderLayout();
      } catch (err) {
        window.showToast(err.message, 'error');
      }
    };
  },

  async deleteQuiz(id) {
    if (!confirm('هل أنت متأكد من حذف هذا الاختبار؟')) return;
    try {
      await API.deleteQuiz(id);
      window.showToast('تم حذف الاختبار', 'success');
      await this.fetchInitialData();
      this.renderLayout();
    } catch (err) {
      window.showToast(err.message, 'error');
    }
  },

  // نافذة إضافة وتعديل سؤال
  async openQuestionModal(questionId = null) {
    let q = null;
    if (questionId) {
      q = await API.getQuestion(questionId);
    }
    const isEdit = Boolean(q);

    const optA = (q && q.options && q.options[0]) ? q.options[0].text : '';
    const optB = (q && q.options && q.options[1]) ? q.options[1].text : '';
    const optC = (q && q.options && q.options[2]) ? q.options[2].text : '';
    const optD = (q && q.options && q.options[3]) ? q.options[3].text : '';

    window.openModal({
      title: isEdit ? `تعديل السؤال (${q.id})` : 'إضافة سؤال جديد لبنك الأسئلة',
      content: `
        <form id="question-form">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div class="form-group">
              <label class="form-label">المادة الدراسية *</label>
              <select class="form-control" id="q-subj-id" required>
                <option value="">-- اختر المادة --</option>
                ${this.subjects.map(s => `
                  <option value="${s.id}" ${q && q.subjectId === s.id ? 'selected' : ''}>${s.nameAr || s.name}</option>
                `).join('')}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">تعيين لاختبار محدد</label>
              <select class="form-control" id="q-quiz-id">
                <option value="">-- بدون تعيين (في بنك الأسئلة فقط) --</option>
                ${this.quizzes.map(qz => `
                  <option value="${qz.id}" ${q && q.quizId === qz.id ? 'selected' : ''}>${qz.name}</option>
                `).join('')}
              </select>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">نص السؤال *</label>
            <textarea class="form-control" id="q-text" required style="min-height: 90px; direction: ltr; text-align: left;">${q ? this.escapeHTML(q.question) : ''}</textarea>
          </div>

          <div style="background: var(--bg-main); padding: 1rem; border-radius: var(--radius-sm); margin-bottom: 1rem;">
            <strong style="font-size: 0.95rem; margin-bottom: 0.5rem; display: block;">خيارات الإجابة:</strong>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
              <div class="form-group" style="margin-bottom: 0.5rem;">
                <label class="form-label" style="font-size: 0.85rem;">الخيار أ (Option A) *</label>
                <input type="text" class="form-control" id="q-opt-a" required style="direction: ltr; text-align: left;" value="${this.escapeHTML(optA)}">
              </div>
              <div class="form-group" style="margin-bottom: 0.5rem;">
                <label class="form-label" style="font-size: 0.85rem;">الخيار ب (Option B) *</label>
                <input type="text" class="form-control" id="q-opt-b" required style="direction: ltr; text-align: left;" value="${this.escapeHTML(optB)}">
              </div>
              <div class="form-group" style="margin-bottom: 0.5rem;">
                <label class="form-label" style="font-size: 0.85rem;">الخيار ج (Option C) *</label>
                <input type="text" class="form-control" id="q-opt-c" required style="direction: ltr; text-align: left;" value="${this.escapeHTML(optC)}">
              </div>
              <div class="form-group" style="margin-bottom: 0.5rem;">
                <label class="form-label" style="font-size: 0.85rem;">الخيار د (Option D) *</label>
                <input type="text" class="form-control" id="q-opt-d" required style="direction: ltr; text-align: left;" value="${this.escapeHTML(optD)}">
              </div>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem;">
            <div class="form-group">
              <label class="form-label">الإجابة الصحيحة *</label>
              <select class="form-control" id="q-correct" required>
                <option value="a" ${q && q.correctAnswer === 'a' ? 'selected' : ''}>A (الخيار أ)</option>
                <option value="b" ${q && q.correctAnswer === 'b' ? 'selected' : ''}>B (الخيار ب)</option>
                <option value="c" ${q && q.correctAnswer === 'c' ? 'selected' : ''}>C (الخيار ج)</option>
                <option value="d" ${q && q.correctAnswer === 'd' ? 'selected' : ''}>D (الخيار د)</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">حالة السؤال *</label>
              <select class="form-control" id="q-status">
                <option value="Verified" ${!q || q.status === 'Verified' ? 'selected' : ''}>معتمد ومؤكد (Verified)</option>
                <option value="Needs Review" ${q && q.status === 'Needs Review' ? 'selected' : ''}>بحاجة لمراجعة (Needs Review)</option>
                <option value="Imported" ${q && q.status === 'Imported' ? 'selected' : ''}>مستورد (Imported)</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">مستوى الصعوبة</label>
              <select class="form-control" id="q-diff">
                <option value="Easy" ${q && q.difficulty === 'Easy' ? 'selected' : ''}>سهل</option>
                <option value="Medium" ${!q || q.difficulty === 'Medium' ? 'selected' : ''}>متوسط</option>
                <option value="Hard" ${q && q.difficulty === 'Hard' ? 'selected' : ''}>صعب</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">مسار صورة السؤال / المخطط الهندسي (اختياري)</label>
            <input type="text" class="form-control" id="q-image-url" placeholder="مثال: /images/questions/فاينل 2022.png" value="${q ? this.escapeHTML(q.imageUrl || '') : ''}">
            ${q && q.imageUrl ? `
              <div style="margin-top: 0.5rem; text-align: center;">
                <img src="${this.escapeHTML(q.imageUrl)}" style="max-height: 120px; border-radius: 4px; border: 1px solid var(--border-color);" alt="معاينة المخطط" />
              </div>
            ` : ''}
          </div>

          <div class="form-group">
            <label class="form-label">الشرح والخطوات الرياضية بالتفصيل</label>
            <textarea class="form-control" id="q-exp" style="min-height: 80px;">${q ? this.escapeHTML(q.explanation || '') : ''}</textarea>
          </div>

          <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 1rem;">
            <div class="form-group">
              <label class="form-label">اسم ملف الامتحان الأصلي</label>
              <input type="text" class="form-control" id="q-source-file" placeholder="مثلاً: Final calcu 2023-2024.pdf" value="${q ? this.escapeHTML(q.sourceFile || '') : ''}">
            </div>
            <div class="form-group">
              <label class="form-label">رقم الصفحة</label>
              <input type="number" class="form-control" id="q-source-page" placeholder="مثلاً: 1" value="${q && q.sourcePage ? q.sourcePage : ''}">
            </div>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1.5rem;">
            <button type="button" class="btn btn-secondary" onclick="window.closeModal()">إلغاء</button>
            <button type="submit" class="btn btn-primary">${isEdit ? 'حفظ وتأكيد التعديلات' : 'إضافة السؤال لبنك الأسئلة'}</button>
          </div>
        </form>
      `
    });

    document.getElementById('question-form').onsubmit = async (e) => {
      e.preventDefault();
      const payload = {
        subjectId: document.getElementById('q-subj-id').value,
        quizId: document.getElementById('q-quiz-id').value || null,
        question: document.getElementById('q-text').value.trim(),
        imageUrl: document.getElementById('q-image-url').value.trim() || null,
        options: [
          { id: 'a', text: document.getElementById('q-opt-a').value.trim() },
          { id: 'b', text: document.getElementById('q-opt-b').value.trim() },
          { id: 'c', text: document.getElementById('q-opt-c').value.trim() },
          { id: 'd', text: document.getElementById('q-opt-d').value.trim() }
        ],
        correctAnswer: document.getElementById('q-correct').value,
        status: document.getElementById('q-status').value,
        difficulty: document.getElementById('q-diff').value,
        explanation: document.getElementById('q-exp').value.trim(),
        sourceFile: document.getElementById('q-source-file').value.trim(),
        sourcePage: document.getElementById('q-source-page').value || null
      };

      try {
        if (isEdit) {
          await API.updateQuestion(q.id, payload);
          window.showToast('تم تحديث السؤال بنجاح', 'success');
        } else {
          await API.createQuestion(payload);
          window.showToast('تمت إضافة السؤال لبنك الأسئلة', 'success');
        }
        window.closeModal();
        await this.fetchInitialData();
        this.renderLayout();
      } catch (err) {
        window.showToast(err.message, 'error');
      }
    };
  },

  async deleteQuestion(id) {
    if (!confirm(`هل أنت متأكد من رغبتك في حذف السؤال ${id}؟`)) return;
    try {
      await API.deleteQuestion(id);
      window.showToast('تم حذف السؤال من بنك الأسئلة', 'success');
      await this.fetchInitialData();
      this.fetchQuestions();
    } catch (err) {
      window.showToast(err.message, 'error');
    }
  },

  async triggerBackup() {
    try {
      const res = await API.triggerBackup();
      window.showToast(`تم حفظ نسخة احتياطية بنجاح على الخادم: ${res.backupFile}`, 'success');
    } catch (err) {
      window.showToast(err.message, 'error');
    }
  },

  downloadBackup() {
    const token = API.getToken();
    window.open(`/api/backup/download?token=${encodeURIComponent(token)}`, '_blank');
  },

  openRestoreModal() {
    window.openModal({
      title: 'استعادة نسخة احتياطية لقاعدة البيانات',
      content: `
        <div style="padding: 0.5rem 0;">
          <p style="color: var(--danger); font-weight: 700; margin-bottom: 1rem;">
            ⚠️ تنبيه هام: استعادة نسخة احتياطية ستستبدل البيانات الحالية بالبيانات الموجودة في الملف المختار.
          </p>
          <div class="form-group">
            <label class="form-label">اختر ملف النسخة الاحتياطية (JSON):</label>
            <input type="file" id="restore-file-input" class="form-control" accept=".json" />
          </div>
          <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1.5rem;">
            <button class="btn btn-secondary" onclick="window.closeModal()">إلغاء</button>
            <button class="btn btn-danger" id="confirm-restore-btn">تأكيد الاستعادة الآن</button>
          </div>
        </div>
      `
    });

    document.getElementById('confirm-restore-btn').onclick = async () => {
      const fileInput = document.getElementById('restore-file-input');
      if (!fileInput.files || fileInput.files.length === 0) {
        window.showToast('يرجى اختيار ملف نسخة احتياطية أولاً', 'error');
        return;
      }
      const file = fileInput.files[0];
      try {
        const text = await file.text();
        const json = JSON.parse(text);
        await API.restoreBackup(json);
        window.showToast('تم استعادة قاعدة البيانات بنجاح', 'success');
        window.closeModal();
        await this.fetchInitialData();
        this.renderLayout();
      } catch (err) {
        window.showToast('فشلت الاستعادة: ' + err.message, 'error');
      }
    };
  },

  openChangeCredentialsModal() {
    const uName = (this.adminInfo && this.adminInfo.username) ? this.adminInfo.username : 'cne_admin';
    window.openModal({
      title: 'إدارة حساب المشرف وتغيير كلمة المرور',
      content: `
        <form id="change-creds-form" style="padding: 0.5rem 0;">
          <div class="form-group" style="margin-bottom: 1rem;">
            <label class="form-label">اسم المستخدم الجديد</label>
            <input type="text" class="form-control" id="new-admin-user" value="${this.escapeHTML(uName)}" required />
          </div>
          <div class="form-group" style="margin-bottom: 1rem;">
            <label class="form-label">كلمة المرور الجديدة (6 خانات على الأقل)</label>
            <input type="password" class="form-control" id="new-admin-pass" placeholder="أدخل كلمة المرور الجديدة" required minlength="6" />
          </div>
          <div class="form-group" style="margin-bottom: 1.5rem;">
            <label class="form-label">تأكيد كلمة المرور الجديدة</label>
            <input type="password" class="form-control" id="confirm-admin-pass" placeholder="أعد إدخال كلمة المرور" required minlength="6" />
          </div>
          <div style="display: flex; justify-content: flex-end; gap: 0.75rem;">
            <button type="button" class="btn btn-secondary" onclick="window.closeModal()">إلغاء</button>
            <button type="submit" class="btn btn-primary">حفظ بيانات الدخول الجديدة</button>
          </div>
        </form>
      `
    });

    document.getElementById('change-creds-form').onsubmit = async (e) => {
      e.preventDefault();
      const newU = document.getElementById('new-admin-user').value.trim();
      const p1 = document.getElementById('new-admin-pass').value;
      const p2 = document.getElementById('confirm-admin-pass').value;

      if (p1 !== p2) {
        window.showToast('كلمتا المرور غير متطابقتين', 'error');
        return;
      }

      try {
        await API.adminChangeCredentials(newU, p1);
        window.showToast('تم تحديث بيانات الحساب بنجاح! يرجى إعادة تسجيل الدخول بالبيانات الجديدة.', 'success');
        window.closeModal();
        this.logout();
      } catch (err) {
        window.showToast(err.message, 'error');
      }
    };
  },

  async logout() {
    await API.adminLogout();
    this.adminInfo = null;
    const adminNav = document.getElementById('nav-admin-link');
    if (adminNav) adminNav.style.display = 'none';
    window.showToast('تم تسجيل الخروج بنجاح', 'info');
    location.hash = '#home';
  },

  escapeHTML(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
};

window.AdminPanel = AdminPanel;
