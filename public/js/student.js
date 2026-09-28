/**
 * CNE Quizzes - مشغل الاختبارات التفاعلي للطلاب (Arabic Native)
 */

const StudentQuizPlayer = {
  currentQuiz: null,
  currentIndex: 0,
  userAnswers: {}, // questionId -> chosenOptionId (e.g. 'a')
  isSubmitting: false,
  isRandom: false,

  async start(quizId, isRandom = false) {
    this.isRandom = isRandom;
    this.isSubmitting = false;
    this.currentIndex = 0;
    this.userAnswers = {};

    const container = document.getElementById('app-root');
    container.innerHTML = `
      <div class="loader-container">
        <div class="spinner"></div>
        <p>جاري إعداد وتجهيز الاختبار...</p>
      </div>
    `;

    try {
      if (isRandom) {
        this.currentQuiz = await API.getRandomQuiz({ count: 10 });
      } else {
        this.currentQuiz = await API.getQuizForStudent(quizId);
      }

      if (!this.currentQuiz || !this.currentQuiz.questions || this.currentQuiz.questions.length === 0) {
        container.innerHTML = `
          <div class="results-card" style="text-align: center; max-width: 600px; margin: 3rem auto; padding: 2.5rem;">
            <h2>لا توجد أسئلة متاحة في هذا الاختبار</h2>
            <p style="margin: 1rem 0; color: var(--text-secondary);">هذا الاختبار لا يحتوي على أسئلة معتمدة حالياً.</p>
            <a href="#subjects" class="btn btn-primary">العودة لقائمة المواد</a>
          </div>
        `;
        return;
      }

      // استعادة الإجابات المؤقتة إذا أعاد الطالب تحميل الصفحة
      const storageKey = `cne_answers_${this.currentQuiz.id || 'random'}`;
      const saved = sessionStorage.getItem(storageKey);
      if (saved) {
        try {
          this.userAnswers = JSON.parse(saved);
        } catch (_) {}
      }

      this.renderPlayer();
    } catch (err) {
      console.error(err);
      container.innerHTML = `
        <div class="results-card" style="text-align: center; max-width: 600px; margin: 3rem auto; padding: 2.5rem;">
          <h2>تعذر تحميل الاختبار</h2>
          <p style="margin: 1rem 0; color: var(--danger);">${err.message}</p>
          <a href="#home" class="btn btn-secondary">العودة للرئيسية</a>
        </div>
      `;
    }
  },

  renderPlayer() {
    const qz = this.currentQuiz;
    const questions = qz.questions;
    const q = questions[this.currentIndex];
    const total = questions.length;
    const currentNum = this.currentIndex + 1;
    const progressPercent = Math.round((currentNum / total) * 100);
    const answeredCount = Object.keys(this.userAnswers).length;

    let examTypeArabic = 'اختبار تدريبي';
    if (qz.examType === 'Mid') examTypeArabic = 'امتحان ميد تيرم';
    else if (qz.examType === 'Final') examTypeArabic = 'امتحان فاينل نهائي';

    const root = document.getElementById('app-root');
    root.innerHTML = `
      <div class="quiz-player-layout">
        <!-- منطقة عرض السؤال الحالية -->
        <section class="quiz-main-stage">
          <div class="quiz-player-header">
            <div>
              <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                <span class="quiz-badge badge-${(qz.examType || 'Practice').toLowerCase()}">${examTypeArabic}</span>
                <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: 700;">${qz.subjectCode || ''}</span>
              </div>
              <h2 style="font-size: 1.35rem; font-weight: 800; margin-top: 0.35rem;">${this.escapeHTML(qz.name)}</h2>
              <span style="font-size: 0.9rem; color: var(--text-muted);">${qz.subjectName || ''}</span>
            </div>
            <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 0.5rem;">
              <div class="progress-counter">
                السؤال ${currentNum} من ${total}
              </div>
              ${!this.isRandom ? `
                <a href="/quiz-print.html?id=${encodeURIComponent(qz.id)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="font-size: 0.8rem; padding: 0.35rem 0.65rem;" title="فتح نسخة ورقية قابلة للطباعة والحفظ كـ PDF">
                  📄 طباعة الاختبار (PDF)
                </a>
              ` : ''}
            </div>
          </div>

          <!-- شريط نسبة التقدم -->
          <div class="progress-track" title="${progressPercent}% مكتمل">
            <div class="progress-fill" style="width: ${progressPercent}%;"></div>
          </div>

          <!-- بطاقة السؤال -->
          <div class="question-container" style="margin-top: 1.5rem;">
            <!-- نص السؤال -->
            <div class="question-text-box" style="font-size: 1.15rem; line-height: 1.7; font-weight: 700; margin-bottom: 1.25rem;">
              ${this.escapeHTML(q.question)}
            </div>

            <!-- صورة السؤال التوضيحية (إن وجدت) مع ميزة التكبير المباشر -->
            ${q.imageUrl ? `
              <div class="question-image-container" onclick="window.openImageZoom('${this.escapeHTML(q.imageUrl)}', 'سؤال ${currentNum}')" title="انقر لتكبير الصورة">
                <img src="${this.escapeHTML(q.imageUrl)}" alt="مخطط السؤال ${currentNum}" class="question-image" loading="lazy" />
                <span class="image-zoom-hint">🔍 انقر لتكبير الصورة وفحص التفاصيل</span>
              </div>
            ` : ''}

            <!-- قائمة الخيارات -->
            <div class="options-list" style="margin-top: 1.5rem;">
              ${(q.options || []).map(opt => {
                const isSelected = this.userAnswers[q.id] === opt.id;
                return `
                  <div class="option-item ${isSelected ? 'selected' : ''}" data-qid="${q.id}" data-optid="${opt.id}">
                    <span class="option-letter">${opt.id.toUpperCase()}</span>
                    <span class="option-text">${this.escapeHTML(opt.text)}</span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- أزرار التنقل السفلية -->
          <div class="quiz-nav-bar" style="margin-top: 2rem;">
            <button class="btn btn-secondary" id="btn-prev-q" ${this.currentIndex === 0 ? 'disabled style="opacity: 0.4; cursor: not-allowed;"' : ''}>
              &rarr; السؤال السابق
            </button>

            <div style="display: flex; gap: 0.75rem;">
              ${this.currentIndex < total - 1 ? `
                <button class="btn btn-primary" id="btn-next-q">
                  السؤال التالي &larr;
                </button>
              ` : `
                <button class="btn btn-success btn-lg" id="btn-submit-quiz">
                  ✅ تسليم الاختبار وعرض النتيجة
                </button>
              `}
            </div>
          </div>
        </section>

        <!-- خريطة الأسئلة الجانبية -->
        <aside class="quiz-sidebar">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
            <h3 class="sidebar-title" style="margin-bottom: 0; font-size: 1.1rem; font-weight: 800;">خريطة الأسئلة</h3>
            <span style="font-size: 0.85rem; font-weight: 700; color: var(--primary);">
              ${answeredCount} من ${total} محلول
            </span>
          </div>

          <div class="question-map-grid">
            ${questions.map((item, idx) => {
              const isCurrent = idx === this.currentIndex;
              const isAnswered = Boolean(this.userAnswers[item.id]);
              let cls = 'map-btn';
              if (isCurrent) cls += ' current';
              else if (isAnswered) cls += ' answered';

              return `
                <button class="${cls}" data-goto-index="${idx}" title="الانتقال إلى السؤال ${idx + 1}">
                  ${idx + 1}
                </button>
              `;
            }).join('')}
          </div>

          <div class="sidebar-legend">
            <div class="legend-item">
              <span class="legend-dot" style="background-color: var(--primary);"></span>
              <span>تمت الإجابة (${answeredCount})</span>
            </div>
            <div class="legend-item">
              <span class="legend-dot" style="background-color: var(--bg-main); border: 1px solid var(--border-color);"></span>
              <span>بانتظار الحل (${total - answeredCount})</span>
            </div>
            <div class="legend-item">
              <span class="legend-dot" style="background-color: var(--primary-light); border: 2px solid var(--primary);"></span>
              <span>السؤال الحالي المعروض</span>
            </div>
          </div>

          <button class="btn btn-outline-danger btn-sm" id="btn-submit-early" style="width: 100%; margin-top: 1.5rem;">
            تسليم الاختبار الآن
          </button>
        </aside>
      </div>
    `;

    this.attachEventListeners();
  },

  attachEventListeners() {
    // اختيار الخيارات وتغيير الإجابة بحرية
    document.querySelectorAll('.option-item').forEach(el => {
      el.addEventListener('click', () => {
        const qid = el.dataset.qid;
        const optid = el.dataset.optid;
        this.selectOption(qid, optid);
      });
    });

    // التنقل السابق
    const prevBtn = document.getElementById('btn-prev-q');
    if (prevBtn && this.currentIndex > 0) {
      prevBtn.addEventListener('click', () => {
        this.currentIndex--;
        this.renderPlayer();
      });
    }

    // التنقل التالي
    const nextBtn = document.getElementById('btn-next-q');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (this.currentIndex < this.currentQuiz.questions.length - 1) {
          this.currentIndex++;
          this.renderPlayer();
        }
      });
    }

    // تسليم الاختبار
    const submitBtn = document.getElementById('btn-submit-quiz');
    if (submitBtn) {
      submitBtn.addEventListener('click', () => this.confirmSubmit());
    }

    const earlySubmitBtn = document.getElementById('btn-submit-early');
    if (earlySubmitBtn) {
      earlySubmitBtn.addEventListener('click', () => this.confirmSubmit());
    }

    // أزرار خريطة الأسئلة
    document.querySelectorAll('.map-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = parseInt(btn.dataset.gotoIndex, 10);
        if (!isNaN(target) && target >= 0 && target < this.currentQuiz.questions.length) {
          this.currentIndex = target;
          this.renderPlayer();
        }
      });
    });

    this.setupKeyboardShortcuts();
  },

  selectOption(questionId, optionId) {
    this.userAnswers[questionId] = optionId;
    const storageKey = `cne_answers_${this.currentQuiz.id || 'random'}`;
    sessionStorage.setItem(storageKey, JSON.stringify(this.userAnswers));
    this.renderPlayer();
  },

  setupKeyboardShortcuts() {
    const handler = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

      const q = this.currentQuiz.questions[this.currentIndex];
      if (!q) return;

      if (['1', 'a', 'A'].includes(e.key) && q.options[0]) this.selectOption(q.id, q.options[0].id);
      else if (['2', 'b', 'B'].includes(e.key) && q.options[1]) this.selectOption(q.id, q.options[1].id);
      else if (['3', 'c', 'C'].includes(e.key) && q.options[2]) this.selectOption(q.id, q.options[2].id);
      else if (['4', 'd', 'D'].includes(e.key) && q.options[3]) this.selectOption(q.id, q.options[3].id);
      else if (e.key === 'ArrowLeft' && this.currentIndex < this.currentQuiz.questions.length - 1) {
        this.currentIndex++;
        this.renderPlayer();
      } else if (e.key === 'ArrowRight' && this.currentIndex > 0) {
        this.currentIndex--;
        this.renderPlayer();
      }
    };

    window.onkeydown = handler;
  },

  confirmSubmit() {
    const total = this.currentQuiz.questions.length;
    const answeredCount = Object.keys(this.userAnswers).length;
    const unansweredCount = total - answeredCount;

    window.openModal({
      title: 'تأكيد تسليم الاختبار',
      content: `
        <div style="text-align: center; padding: 1rem 0;">
          <div style="font-size: 3.5rem; margin-bottom: 0.5rem;">📝</div>
          <h3 style="font-size: 1.4rem; font-weight: 800; margin-bottom: 0.75rem;">هل ترغب في تسليم إجاباتك الآن؟</h3>
          <p style="color: var(--text-secondary); font-size: 1.05rem; margin-bottom: 1.5rem;">
            لقد قمت بحل <strong>${answeredCount}</strong> من أصل <strong>${total}</strong> سؤالاً.
            ${unansweredCount > 0 ? `<br><span style="color: var(--danger); font-weight: 700; display: inline-block; margin-top: 0.5rem;">⚠️ تنبيه: لديك ${unansweredCount} سؤالاً لم تجب عليها بعد.</span>` : ''}
          </p>

          <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
            <button class="btn btn-secondary" onclick="window.closeModal()">العودة لمراجعة الأسئلة</button>
            <button class="btn btn-success btn-lg" id="modal-confirm-submit-btn">نعم، تسليم الاختبار وعرض النتيجة</button>
          </div>
        </div>
      `
    });

    document.getElementById('modal-confirm-submit-btn').onclick = () => {
      window.closeModal();
      this.executeSubmit();
    };
  },

  async executeSubmit() {
    if (this.isSubmitting) return;
    this.isSubmitting = true;

    const root = document.getElementById('app-root');
    root.innerHTML = `
      <div class="loader-container">
        <div class="spinner"></div>
        <p>جاري تصحيح إجاباتك وإعداد تقرير الحلول والشروحات الأكاديمية...</p>
      </div>
    `;

    try {
      let result;
      if (this.isRandom) {
        const questionIds = this.currentQuiz.questions.map(q => q.id);
        result = await API.submitRandomQuiz(questionIds, this.userAnswers);
      } else {
        result = await API.submitQuiz(this.currentQuiz.id, this.userAnswers);
      }

      sessionStorage.removeItem(`cne_answers_${this.currentQuiz.id || 'random'}`);
      window.onkeydown = null;

      ResultsViewer.render(result, this.currentQuiz.id, this.isRandom);
    } catch (err) {
      this.isSubmitting = false;
      window.showToast(err.message, 'error');
      this.renderPlayer();
    }
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

// Global Image Zoom Functions for Lightbox
window.openImageZoom = function(src, caption = '') {
  const modal = document.getElementById('image-lightbox-modal');
  const img = document.getElementById('lightbox-img');
  const cap = document.getElementById('lightbox-caption');
  if (modal && img) {
    img.src = src;
    if (cap) cap.textContent = caption || '';
    modal.classList.remove('hidden');
  }
};

window.closeImageZoom = function() {
  const modal = document.getElementById('image-lightbox-modal');
  if (modal) modal.classList.add('hidden');
};

// Close lightbox on Escape key
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    window.closeImageZoom();
  }
});

window.StudentQuizPlayer = StudentQuizPlayer;
