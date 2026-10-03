/**
 * CNE Quizzes - Master Application Coordinator & Router (Arabic Native)
 */

const App = {
  stats: {},
  subjects: [],
  quizzes: [],

  async init() {
    this.setupTheme();
    this.setupNavigation();
    this.setupModals();
    await this.refreshGlobalStats();

    // Listen for hash changes
    window.addEventListener('hashchange', () => this.handleRoute());
    // Initial route
    this.handleRoute();
  },

  async refreshGlobalStats() {
    try {
      this.stats = await API.getStats();
      const auth = await API.adminVerify();
      const adminNav = document.getElementById('nav-admin-link');
      if (adminNav) {
        adminNav.style.display = auth.authorized ? 'inline-flex' : 'none';
      }
      const reviewBadge = document.getElementById('nav-review-badge');
      if (reviewBadge) {
        if (auth.authorized && this.stats.reviewQuestions > 0) {
          reviewBadge.style.display = 'inline-flex';
          reviewBadge.textContent = this.stats.reviewQuestions;
        } else {
          reviewBadge.style.display = 'none';
        }
      }
    } catch (_) {}
  },

  setupTheme() {
    const saved = localStorage.getItem('ac_theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);

    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('ac_theme', next);
      });
    }
  },

  setupNavigation() {
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    if (mobileBtn && navMenu) {
      mobileBtn.addEventListener('click', () => {
        navMenu.classList.toggle('mobile-open');
      });
    }
  },

  setupModals() {
    const backdrop = document.getElementById('modal-backdrop');
    const closeBtn = document.getElementById('modal-close-btn');
    const modalContainer = document.getElementById('modal-container');
    let previousModalFocus = null;

    const getFocusableElements = () => Array.from(modalContainer.querySelectorAll(
      'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href]'
    )).filter(element => element.offsetParent !== null);

    window.openModal = ({ title, content }) => {
      previousModalFocus = document.activeElement;
      document.getElementById('modal-title').textContent = title || '';
      document.getElementById('modal-body').innerHTML = content || '';
      document.querySelectorAll('#modal-body .form-label').forEach((label, index) => {
        const formGroup = label.closest('.form-group');
        const control = formGroup ? formGroup.querySelector('input, select, textarea') : null;
        if (!control) return;
        if (!control.id) control.id = `modal-control-${index}`;
        label.htmlFor = control.id;
      });
      backdrop.classList.remove('hidden');
      const focusable = getFocusableElements();
      if (focusable.length > 0) focusable[0].focus();
    };

    window.closeModal = () => {
      backdrop.classList.add('hidden');
      if (previousModalFocus && typeof previousModalFocus.focus === 'function') {
        previousModalFocus.focus();
      }
      previousModalFocus = null;
    };

    if (closeBtn) closeBtn.onclick = () => window.closeModal();
    if (backdrop) {
      backdrop.onclick = (e) => {
        if (e.target === backdrop) window.closeModal();
      };
    }

    document.addEventListener('keydown', (event) => {
      if (backdrop.classList.contains('hidden')) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        window.closeModal();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = getFocusableElements();
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    // Global Toast Notification in Arabic
    window.showToast = (message, type = 'info') => {
      const container = document.getElementById('toast-container');
      if (!container) return;
      const toast = document.createElement('div');
      toast.className = `toast toast-${type}`;
      toast.textContent = message;
      container.appendChild(toast);
      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s ease';
        setTimeout(() => toast.remove(), 300);
      }, 3500);
    };
  },

  updateActiveNav(tabName) {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.dataset.nav === tabName) link.classList.add('active');
    });
    // Close mobile menu if open
    const navMenu = document.getElementById('nav-menu');
    if (navMenu) navMenu.classList.remove('mobile-open');
  },

  async handleRoute() {
    const hash = location.hash.slice(1) || 'home';
    const [route, param] = hash.split('/');

    if (route.startsWith('admin')) {
      this.updateActiveNav('admin');
      const tab = route.split('-')[1] || 'overview';
      return AdminPanel.render(tab);
    }

    if (route === 'quiz') {
      this.updateActiveNav('subjects');
      return StudentQuizPlayer.start(param, false);
    }

    if (route === 'practice') {
      this.updateActiveNav('practice');
      return this.renderPracticeConfigView();
    }

    if (route === 'subject') {
      this.updateActiveNav('subjects');
      return this.renderSubjectDetailView(param);
    }

    if (route === 'subjects') {
      this.updateActiveNav('subjects');
      return this.renderSubjectsCatalogView();
    }

    // Default: Home
    this.updateActiveNav('home');
    return this.renderHomeView();
  },

  // ================= 1. الصفحة الرئيسية (HOME VIEW) =================
  async renderHomeView() {
    const root = document.getElementById('app-root');
    root.innerHTML = `<div class="loader-container"><div class="spinner"></div><p>جاري تحميل كويزات CNE...</p></div>`;

    try {
      const [stats, subjects, quizzes] = await Promise.all([
        API.getStats(),
        API.getSubjects({ activeOnly: true }),
        API.getQuizzes({ activeOnly: true })
      ]);
      this.stats = stats;
      this.subjects = subjects;
      this.quizzes = quizzes;

      // Filter featured quizzes (Calculus, Circuits, C++)
      const featuredQuizzes = quizzes.slice(0, 3);

      // Core / Most Popular Subjects for quick access (Top 8)
      const popularIds = [
        'subj-calc1',
        'subj-electronics',
        'subj-networks1',
        'subj-circuits1',
        'subj-cpp',
        'subj-oop',
        'subj-datastruct',
        'subj-logic'
      ];
      const popularSubjects = subjects.filter(s => popularIds.includes(s.id));

      root.innerHTML = `
        <div class="home-container">
          <!-- قسم البانر الرئيسي (Hero) -->
          <section class="hero-section">
            <div class="hero-content">
              <span class="hero-tag">🎓 المنصة الرسمية لطلاب هندسة شبكات وحاسوب</span>
              <h1 class="hero-title">منصة CNE Quizzes للاختبارات الأكاديمية</h1>
              <p class="hero-subtitle">
                تدرّب على أسئلة امتحانات الميد والفاينل للسنوات السابقة، واطّلع على خطوات الحل الرياضية والاشتقاقات التفصيلية، واختبر جاهزيتك قبل دخول قاعة الامتحان.
              </p>
              <div class="hero-actions">
                <a href="#subjects" class="btn btn-primary btn-lg">استعراض كافة المواد (${stats.activeSubjects} مادة)</a>
                <a href="#practice" class="btn btn-secondary btn-lg" style="color: var(--primary); background: #ffffff;">⚡ وضع التدريب السريع</a>
              </div>
            </div>

            <!-- شريط الإحصائيات -->
            <div class="hero-stats">
              <div class="hero-stat-card">
                <span class="hero-stat-num">${stats.activeSubjects}</span>
                <span class="hero-stat-label">مواد التخصص والخطة</span>
              </div>
              <div class="hero-stat-card">
                <span class="hero-stat-num">${stats.activeQuizzes}</span>
                <span class="hero-stat-label">امتحانات ميد وفاينل</span>
              </div>
              <div class="hero-stat-card">
                <span class="hero-stat-num">${stats.verifiedQuestions}</span>
                <span class="hero-stat-label">أسئلة امتحانية معتمدة</span>
              </div>
              <div class="hero-stat-card">
                <span class="hero-stat-num">${stats.reviewQuestions}</span>
                <span class="hero-stat-label">أسئلة قيد المراجعة</span>
              </div>
            </div>
          </section>

          <!-- قسم الاختبارات المميزة -->
          <section style="margin-bottom: 2.75rem;">
            <div class="section-header">
              <h2 class="section-title">🌟 اختبارات وامتحانات مقترحة</h2>
              <a href="#subjects" style="font-size: 1rem; font-weight: 700; color: var(--primary); text-decoration: none;">عرض كل المواد &larr;</a>
            </div>

            <div class="quiz-grid">
              ${featuredQuizzes.map(q => `
                <div class="quiz-card">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                    <span class="quiz-badge badge-${(q.examType || 'Practice').toLowerCase()}">${q.examType === 'Mid' ? 'امتحان ميد' : (q.examType === 'Final' ? 'امتحان فاينل' : 'تدريب')}</span>
                    <span style="font-size: 0.85rem; font-weight: 800; color: var(--text-muted);">${q.subjectCode}</span>
                  </div>
                  <h3 class="quiz-title">${this.escapeHTML(q.name)}</h3>
                  <p style="font-size: 0.95rem; color: var(--text-secondary); margin-bottom: 1.25rem; flex: 1;">
                    ${this.escapeHTML(q.description || 'مجموعة أسئلة امتحانية نموذجية مع الحلول والشرح.')}
                  </p>
                  <div class="quiz-meta">
                    <span>📝 ${q.questionCount || 0} سؤالاً</span>
                    <span>⏱️ ${q.timeLimitMinutes ? q.timeLimitMinutes + ' دقيقة' : 'بدون وقت محدد'}</span>
                  </div>
                  <a href="#quiz/${q.id}" class="btn btn-primary" style="width: 100%;">ابدأ الاختبار الآن &larr;</a>
                </div>
              `).join('')}
            </div>
          </section>

          <!-- أكثر المواد طلباً بين الطلاب -->
          <section>
            <div class="section-header">
              <div>
                <h2 class="section-title">🔥 أكثر المواد طلباً وتدريباً</h2>
                <p style="color: var(--text-secondary); font-size: 0.95rem;">
                  المساقات الأساسية الأكثر ممارسة وحلاً من قبل طلاب هندسة شبكات وحاسوب.
                </p>
              </div>
              <a href="#subjects" class="btn btn-secondary btn-sm" style="display: inline-flex; align-items: center; gap: 0.35rem;">
                <span>عرض الكل (${subjects.length})</span>
                <span>&larr;</span>
              </a>
            </div>

            <div class="subject-grid">
              ${this.renderSubjectCards(popularSubjects)}
            </div>

            <!-- بانر الانتقال لدليل المواد الكامل والبحث -->
            <div class="view-all-banner">
              <div class="view-all-content">
                <div class="view-all-icon">📚</div>
                <div>
                  <h3 class="view-all-title">استعرض دليل كافة المواد الدراسية (${subjects.length} مادة معتمدة)</h3>
                  <p class="view-all-desc">تصفح خطة التخصص كاملة، بما فيها الرياضيات، الإلكترونيات، البرمجيات، والمختبرات التسعة مع ميزة البحث والتصفية حسب القسم.</p>
                </div>
              </div>
              <a href="#subjects" class="btn btn-primary btn-lg" style="white-space: nowrap;">
                الانتقال لدليل المواد والبحث الشامل &larr;
              </a>
            </div>
          </section>
        </div>
      `;
    } catch (err) {
      root.innerHTML = `<p style="color: var(--danger);">فشل تحميل الصفحة الرئيسية: ${err.message}</p>`;
    }
  },

  renderSubjectCards(subjects) {
    if (subjects.length === 0) {
      return `<p style="color: var(--text-muted); grid-column: 1 / -1; text-align: center; padding: 2rem;">لم يتم العثور على مواد تطابق كلمة البحث.</p>`;
    }

    return subjects.map(s => `
      <a href="#subject/${s.id}" class="subject-card">
        <span class="subject-badge">${s.code || 'مادة'}</span>
        <div class="subject-card-header">
          <h3 class="subject-title">${s.nameAr ? this.escapeHTML(s.nameAr) : this.escapeHTML(s.name)}</h3>
        </div>
        <div class="subject-title-ar" style="font-size: 0.95rem; color: var(--text-muted); font-family: var(--font-mono); direction: ltr; text-align: right;">
          ${this.escapeHTML(s.name)}
        </div>
        <p class="subject-desc">${this.escapeHTML(s.description || 'امتحانات سابقة وبنك أسئلة متاح للحل والمراجعة.')}</p>
        <div class="subject-footer">
          <div class="subject-stats-pill">
            <span>📝 ${s.quizCount || 0} كويزات</span>
            <span>💡 ${s.questionCount || 0} سؤالاً</span>
          </div>
          <span style="font-weight: 700; color: var(--primary);">دخول المادة &larr;</span>
        </div>
      </a>
    `).join('');
  },

  // ================= 2. صفحة المادة التفصيلية (SUBJECT DETAIL VIEW) =================
  async renderSubjectDetailView(subjectId) {
    const root = document.getElementById('app-root');
    root.innerHTML = `<div class="loader-container"><div class="spinner"></div><p>جاري تحميل تفاصيل المادة...</p></div>`;

    try {
      const [subject, quizzes] = await Promise.all([
        API.getSubject(subjectId),
        API.getQuizzes({ subjectId, activeOnly: true })
      ]);

      root.innerHTML = `
        <div class="subject-detail-container" style="max-width: 1000px; margin: 0 auto;">
          <!-- بطاقة المادة الرئيسية -->
          <div class="results-card" style="padding: 2.25rem; margin-bottom: 2rem;">
            <a href="#subjects" style="font-size: 0.95rem; font-weight: 700; color: var(--primary); text-decoration: none; display: inline-block; margin-bottom: 1rem;">
              &rarr; العودة لكافة المواد الدراسية
            </a>
            <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem;">
              <div>
                <span class="subject-badge">${subject.code || 'كود المادة'}</span>
                <h1 style="font-size: 2.25rem; font-weight: 900; margin-top: 0.25rem;">
                  ${subject.nameAr ? this.escapeHTML(subject.nameAr) : this.escapeHTML(subject.name)}
                </h1>
                <div style="font-size: 1.1rem; color: var(--text-muted); font-family: var(--font-mono); direction: ltr; text-align: right;">
                  ${this.escapeHTML(subject.name)}
                </div>
              </div>
              <div style="text-align: left;">
                <span class="quiz-badge badge-practice">${subject.category || 'عام'}</span>
                <div style="margin-top: 0.5rem; font-size: 0.95rem; color: var(--text-muted); font-weight: 600;">
                  ${quizzes.length} كويزات متاحة | ${subject.questionCount || 0} سؤالاً
                </div>
              </div>
            </div>
            <p style="color: var(--text-secondary); margin-top: 1.25rem; font-size: 1.1rem; line-height: 1.7;">
              ${this.escapeHTML(subject.description || 'مرحباً بك في بوابة اختبارات هذه المادة.')}
            </p>

            <!-- مصادر المادة وملفات درايف -->
            ${subject.resources && subject.resources.length > 0 ? `
              <div style="margin-top: 1.5rem; padding-top: 1.25rem; border-top: 1px solid var(--border-color);">
                <strong style="font-size: 0.95rem; color: var(--text-primary); display: block; margin-bottom: 0.75rem;">
                  🔗 مراجع ومصادر دراسية معتمدة (Google Drive / ملخصات):
                </strong>
                <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
                  ${subject.resources.map(res => `
                    <a href="${res.url}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="display: inline-flex; align-items: center; gap: 0.4rem;">
                      <span>📄 ${this.escapeHTML(res.title)}</span>
                      <span style="font-size: 0.75rem; color: var(--text-muted);">[${res.type}]</span>
                    </a>
                  `).join('')}
                </div>
              </div>
            ` : ''}
          </div>

          <!-- قائمة الاختبارات المتاحة للمادة -->
          <div style="margin-bottom: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 1rem;">
              <h2 style="font-size: 1.5rem; font-weight: 800;">الاختبارات والامتحانات المتاحة</h2>
              <button class="btn btn-secondary btn-sm" onclick="location.hash='#practice'">
                ⚡ حل أسئلة عشوائية من هذه المادة
              </button>
            </div>

            ${quizzes.length === 0 ? `
              <div style="text-align: center; padding: 3rem; background: var(--bg-card); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
                <p style="color: var(--text-muted); font-size: 1.1rem; margin-bottom: 1rem;">لم يتم إضافة اختبارات لهذه المادة حتى الآن.</p>
                <a href="#admin-quizzes" class="btn btn-primary btn-sm">إضافة اختبار جديد من لوحة التحكم</a>
              </div>
            ` : `
              <div class="quiz-grid">
                ${quizzes.map(q => `
                  <div class="quiz-card">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                      <span class="quiz-badge badge-${(q.examType || 'Practice').toLowerCase()}">${q.examType === 'Mid' ? 'امتحان ميد' : (q.examType === 'Final' ? 'امتحان فاينل' : 'تدريب')}</span>
                      <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: 700;">
                        ${q.timeLimitMinutes ? q.timeLimitMinutes + ' دقيقة' : 'غير محدد بوقت'}
                      </span>
                    </div>
                    <h3 class="quiz-title">${this.escapeHTML(q.name)}</h3>
                    <p style="font-size: 0.95rem; color: var(--text-secondary); margin-bottom: 1.25rem; flex: 1;">
                      ${this.escapeHTML(q.description || 'أسئلة معتمدة من الامتحانات السابقة.')}
                    </p>
                    <div class="quiz-meta">
                      <span>📝 ${q.questionCount || 0} أسئلة</span>
                      <span>✓ ${q.verifiedCount || 0} تم التحقق</span>
                    </div>
                    <a href="#quiz/${q.id}" class="btn btn-primary" style="width: 100%;">
                      ابدأ هذا الاختبار الآن &larr;
                    </a>
                  </div>
                `).join('')}
              </div>
            `}
          </div>
        </div>
      `;
    } catch (err) {
      root.innerHTML = `<p style="color: var(--danger);">فشل تحميل المادة: ${err.message}</p>`;
    }
  },

  // ================= 3. استعراض دليل كل المواد (CATALOG) =================
  async renderSubjectsCatalogView() {
    const root = document.getElementById('app-root');
    root.innerHTML = `<div class="loader-container"><div class="spinner"></div><p>جاري تحميل دليل المواد...</p></div>`;

    try {
      const subjects = await API.getSubjects();
      let activeCategory = 'all';
      let currentQuery = '';

      const filterSubjects = () => {
        return subjects.filter(s => {
          const matchCat = activeCategory === 'all' || s.category === activeCategory;
          const matchQuery = !currentQuery || (
            s.name.toLowerCase().includes(currentQuery) ||
            (s.nameAr && s.nameAr.toLowerCase().includes(currentQuery)) ||
            (s.code && s.code.toLowerCase().includes(currentQuery)) ||
            (s.category && s.category.toLowerCase().includes(currentQuery))
          );
          return matchCat && matchQuery;
        });
      };

      const updateGrid = () => {
        const filtered = filterSubjects();
        const grid = document.getElementById('catalog-grid');
        const countEl = document.getElementById('catalog-count');
        if (grid) grid.innerHTML = this.renderSubjectCards(filtered);
        if (countEl) countEl.textContent = `عرض ${filtered.length} من أصل ${subjects.length} مادة معتمدة`;
      };

      root.innerHTML = `
        <div>
          <div class="section-header">
            <div>
              <h1 style="font-size: 2.1rem; font-weight: 900;">دليل المواد الدراسية وبنوك الأسئلة</h1>
              <p style="color: var(--text-secondary); font-size: 1rem;">
                تصفح كافة مواد خطة هندسة شبكات وحاسوب (45 مادة) مع إمكانية البحث الفوري والتصفية حسب التخصص.
              </p>
            </div>
            <a href="#practice" class="btn btn-primary">⚡ وضع التدريب السريع</a>
          </div>

          <!-- شريط البحث الرئيسي للمواد -->
          <div class="search-filter-bar">
            <div class="search-input-wrap">
              <input type="text" id="catalog-search" class="search-input" placeholder="ابحث باسم المادة (مثلاً: كالكولاس، إلكترونيات، شبكات) أو رمزها مثل EE301, MATH101...">
              <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>

          <!-- أزرار التصفية حسب الأقسام (Category Tabs) -->
          <div class="category-tabs" id="category-tabs-container">
            <button class="category-tab-btn active" data-cat="all">الكل (${subjects.length})</button>
            <button class="category-tab-btn" data-cat="العلوم الأساسية والرياضيات">العلوم والرياضيات</button>
            <button class="category-tab-btn" data-cat="علوم الحاسوب والبرمجيات">علوم الحاسوب والبرمجيات</button>
            <button class="category-tab-btn" data-cat="الهندسة الكهربائية والإلكترونية">الهندسة الكهربائية والإلكترونية</button>
            <button class="category-tab-btn" data-cat="هندسة شبكات واتصالات">شبكات واتصالات</button>
            <button class="category-tab-btn" data-cat="مختبرات عملية">المختبرات العملية</button>
            <button class="category-tab-btn" data-cat="المتطلبات الجامعية والإنسانية">المتطلبات الجامعية</button>
          </div>

          <!-- عداد النتائج -->
          <div id="catalog-count" style="font-size: 0.95rem; font-weight: 700; color: var(--text-muted); margin-bottom: 1.25rem;">
            عرض ${subjects.length} من أصل ${subjects.length} مادة معتمدة
          </div>

          <div class="subject-grid" id="catalog-grid">
            ${this.renderSubjectCards(subjects)}
          </div>
        </div>
      `;

      // تفاعل البحث
      const searchInput = document.getElementById('catalog-search');
      if (searchInput) {
        searchInput.addEventListener('input', (e) => {
          currentQuery = e.target.value.toLowerCase().trim();
          updateGrid();
        });
      }

      // تفاعل أزرار الأقسام
      const tabBtns = document.querySelectorAll('.category-tab-btn');
      tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          tabBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          activeCategory = btn.dataset.cat;
          updateGrid();
        });
      });
    } catch (err) {
      root.innerHTML = `<p style="color: var(--danger);">فشل تحميل دليل المواد: ${err.message}</p>`;
    }
  },

  // ================= 4. وضع التدريب السريع (PRACTICE MODE) =================
  async renderPracticeConfigView() {
    const root = document.getElementById('app-root');
    const subjects = await API.getSubjects({ activeOnly: true });

    root.innerHTML = `
      <div style="max-width: 650px; margin: 0 auto;">
        <div class="results-card">
          <div style="text-align: center; margin-bottom: 2rem;">
            <div style="font-size: 3rem; margin-bottom: 0.5rem;">⚡</div>
            <h1 style="font-size: 2rem; font-weight: 900;">وضع التدريب العشوائي السريع</h1>
            <p style="color: var(--text-secondary); font-size: 1rem;">
              يقوم النظام باختيار أسئلة عشوائية من بنك الأسئلة المعتمد للمادة لتحدي معلوماتك في أي وقت.
            </p>
          </div>

          <form id="practice-form">
            <div class="form-group">
              <label class="form-label">اختر المادة الدراسية</label>
              <select class="form-control" id="prac-subj">
                <option value="">جميع المواد (تشكيلة أسئلة شاملة من التخصص)</option>
                ${subjects.map(s => `<option value="${s.id}">${s.nameAr ? s.nameAr + ' (' + s.name + ')' : s.name}</option>`).join('')}
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">عدد الأسئلة المطلوبة</label>
              <select class="form-control" id="prac-count">
                <option value="5">5 أسئلة (مراجعة سريعة)</option>
                <option value="10" selected>10 أسئلة (اختبار قياسي)</option>
                <option value="15">15 سؤالاً (محاكاة امتحان)</option>
                <option value="20">20 سؤالاً (تحدي مكثف)</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">مستوى الصعوبة</label>
              <select class="form-control" id="prac-diff">
                <option value="">جميع المستويات (متنوع)</option>
                <option value="Easy">سهل (Easy)</option>
                <option value="Medium">متوسط (Medium)</option>
                <option value="Hard">صعب ومتقدم (Hard)</option>
              </select>
            </div>

            <button type="submit" class="btn btn-primary btn-lg" style="width: 100%; margin-top: 1rem;">
              توليد وبدء الاختبار التدريبي &larr;
            </button>
          </form>
        </div>
      </div>
    `;

    document.getElementById('practice-form').onsubmit = async (e) => {
      e.preventDefault();
      const subjectId = document.getElementById('prac-subj').value;
      const count = parseInt(document.getElementById('prac-count').value, 10);
      const difficulty = document.getElementById('prac-diff').value;

      root.innerHTML = `<div class="loader-container"><div class="spinner"></div><p>جاري سحب الأسئلة وتجهيز الاختبار...</p></div>`;

      try {
        const randomQuiz = await API.getRandomQuiz({ subjectId, count, difficulty });
        StudentQuizPlayer.currentQuiz = randomQuiz;
        StudentQuizPlayer.currentIndex = 0;
        StudentQuizPlayer.userAnswers = {};
        StudentQuizPlayer.isRandom = true;
        StudentQuizPlayer.isSubmitting = false;
        StudentQuizPlayer.renderPlayer();
      } catch (err) {
        window.showToast(err.message, 'error');
        App.renderPracticeConfigView();
      }
    };
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

window.addEventListener('DOMContentLoaded', () => App.init());
window.App = App;
