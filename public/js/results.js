/**
 * CNE Quizzes - عارض نتائج الاختبارات والمراجعة الأكاديمية (Arabic Native)
 */

const ResultsViewer = {
  currentResult: null,
  activeFilter: 'all', // 'all' | 'incorrect' | 'correct'

  render(result, quizId, isRandom = false) {
    this.currentResult = result;
    this.activeFilter = 'all';

    const root = document.getElementById('app-root');
    const { totalQuestions, correctCount, incorrectCount, unansweredCount, percentage, quizName, breakdown } = result;
    const score100 = result.score100 !== undefined ? result.score100 : percentage;

    let performanceLabel = 'بحاجة لمزيد من المراجعة والتدريب الأكاديمي';
    let performanceColor = 'var(--danger)';
    if (percentage >= 85) {
      performanceLabel = 'أداء ممتاز ومتميز جداً! 🌟';
      performanceColor = 'var(--success)';
    } else if (percentage >= 70) {
      performanceLabel = 'أداء جيد جداً 👍';
      performanceColor = 'var(--primary)';
    } else if (percentage >= 50) {
      performanceLabel = 'اجتزت الاختبار بنجاح';
      performanceColor = 'var(--warning)';
    }

    root.innerHTML = `
      <div class="results-container" style="max-width: 920px; margin: 0 auto;">
        <!-- بطاقة النتيجة الإجمالية -->
        <div class="results-card">
          <div class="results-header-banner">
            <span class="quiz-badge badge-practice" style="margin-bottom: 0.75rem;">تقرير نتيجة الاختبار</span>
            <h1 style="font-size: 2rem; font-weight: 900; margin-bottom: 0.5rem;">${this.escapeHTML(quizName)}</h1>
            <p style="font-size: 1.25rem; font-weight: 800; color: ${performanceColor}; margin-bottom: 1.75rem;">
              ${performanceLabel}
            </p>

            <div class="score-circle">
              <span class="score-percent">${score100} / 100</span>
              <span class="score-label">النسبة المئوية: ${percentage}% (${correctCount} من ${totalQuestions})</span>
            </div>

            <!-- شبكة الإحصائيات التفصيلية -->
            <div class="results-summary-grid">
              <div class="summary-tile">
                <div class="summary-tile-num" style="color: var(--text-primary);">${totalQuestions}</div>
                <div class="summary-tile-label">إجمالي الأسئلة</div>
              </div>
              <div class="summary-tile">
                <div class="summary-tile-num" style="color: var(--success);">${correctCount}</div>
                <div class="summary-tile-label">إجابات صحيحة</div>
              </div>
              <div class="summary-tile">
                <div class="summary-tile-num" style="color: var(--danger);">${incorrectCount}</div>
                <div class="summary-tile-label">إجابات خاطئة</div>
              </div>
              <div class="summary-tile">
                <div class="summary-tile-num" style="color: var(--warning);">${unansweredCount}</div>
                <div class="summary-tile-label">بدون إجابة</div>
              </div>
            </div>

            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
              ${isRandom ? `
                <button class="btn btn-primary btn-lg" onclick="StudentQuizPlayer.start(null, true)">
                  ⚡ تجربة تدريب عشوائي آخر
                </button>
              ` : `
                <button class="btn btn-primary btn-lg" onclick="StudentQuizPlayer.start('${quizId}', false)">
                  🔄 إعادة حل هذا الامتحان
                </button>
                <a href="/quiz-print.html?id=${encodeURIComponent(quizId)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-lg">
                  📄 طباعة نسخة ورقية (PDF)
                </a>
              `}
              <a href="#subjects" class="btn btn-secondary btn-lg">استعراض المواد الأخرى</a>
            </div>
          </div>

          <!-- قسم المراجعة سؤالاً بسؤال -->
          <div style="margin-top: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
              <div>
                <h2 style="font-size: 1.45rem; font-weight: 800;">مراجعة الأسئلة والحلول النموذجية</h2>
                <p style="font-size: 0.95rem; color: var(--text-secondary);">
                  قارن بين حلك والحل الأكاديمي المعتمد مع الشروحات وخطوات الحل التفصيلية.
                </p>
              </div>

              <!-- فلاتر المراجعة -->
              <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                <button class="btn btn-sm ${this.activeFilter === 'all' ? 'btn-primary' : 'btn-secondary'}" id="filter-all-btn">
                  جميع الأسئلة (${totalQuestions})
                </button>
                <button class="btn btn-sm ${this.activeFilter === 'incorrect' ? 'btn-danger' : 'btn-secondary'}" id="filter-incorrect-btn">
                  الخاطئة فقط (${incorrectCount + unansweredCount})
                </button>
                <button class="btn btn-sm ${this.activeFilter === 'correct' ? 'btn-success' : 'btn-secondary'}" id="filter-correct-btn">
                  الصحيحة فقط (${correctCount})
                </button>
              </div>
            </div>

            <!-- قائمة مراجعة الأسئلة -->
            <div id="review-items-list">
              ${this.renderReviewItems(breakdown)}
            </div>
          </div>
        </div>
      </div>
    `;

    this.attachFilterListeners(breakdown);
  },

  renderReviewItems(breakdown) {
    let filtered = breakdown;
    if (this.activeFilter === 'incorrect') {
      filtered = breakdown.filter(q => !q.isCorrect);
    } else if (this.activeFilter === 'correct') {
      filtered = breakdown.filter(q => q.isCorrect);
    }

    if (filtered.length === 0) {
      return `
        <div style="text-align: center; padding: 2.5rem; color: var(--text-muted); font-size: 1.1rem;">
          لا توجد أسئلة تطابق الفلتر المحدد.
        </div>
      `;
    }

    return filtered.map(item => {
      let statusClass = 'unanswered';
      let statusBadge = '<span class="quiz-badge badge-review">لم تتم الإجابة</span>';

      if (item.isAnswered) {
        if (item.isCorrect) {
          statusClass = 'correct';
          statusBadge = '<span class="quiz-badge badge-verified">✓ إجابة صحيحة</span>';
        } else {
          statusClass = 'incorrect';
          statusBadge = '<span class="quiz-badge badge-final">✗ إجابة خاطئة</span>';
        }
      }

      const studentOpt = (item.options || []).find(o => o.id === item.studentAnswer);
      const correctOpt = (item.options || []).find(o => o.id === item.correctAnswer);

      return `
        <article class="review-item ${statusClass}" style="margin-bottom: 1.5rem;">
          <div class="review-item-header">
            <div style="display: flex; align-items: flex-start; gap: 0.75rem; flex: 1;">
              <span style="font-weight: 800; color: var(--text-secondary); min-width: 32px;">س${item.index}:</span>
              <div class="review-question-text" style="font-size: 1.05rem; font-weight: 700; line-height: 1.6;">${this.escapeHTML(item.question)}</div>
            </div>
            ${statusBadge}
          </div>

          <!-- صورة السؤال التوضيحية (إن وجدت) -->
          ${item.imageUrl ? `
            <div class="review-image-container" onclick="window.openImageZoom('${this.escapeHTML(item.imageUrl)}', 'سؤال ${item.index}')" title="انقر للتكبير">
              <img src="${this.escapeHTML(item.imageUrl)}" alt="مخطط السؤال ${item.index}" class="question-image" loading="lazy" />
              <span class="image-zoom-hint">🔍 انقر لتكبير صورة المخطط</span>
            </div>
          ` : ''}

          <div class="review-item-body">
            <!-- مقارنة الإجابات -->
            <div class="answer-comparison" style="margin-top: 1rem;">
              <div class="ans-box ${item.isCorrect ? 'ans-box student-box' : (item.isAnswered ? 'student-wrong' : 'ans-box student-box')}">
                <span style="font-size: 0.85rem; font-weight: 800; display: block; margin-bottom: 0.25rem;">
                  إجابتك المسجلة:
                </span>
                ${item.isAnswered ? `
                  <strong>[${item.studentAnswer ? item.studentAnswer.toUpperCase() : ''}]</strong> ${studentOpt ? this.escapeHTML(studentOpt.text) : 'الخيار ' + item.studentAnswer}
                ` : `
                  <em style="color: var(--warning); font-weight: 600;">لم يتم اختيار أي إجابة لهذا السؤال</em>
                `}
              </div>

              <div class="ans-box correct-box">
                <span style="font-size: 0.85rem; font-weight: 800; display: block; margin-bottom: 0.25rem;">
                  الإجابة الأكاديمية النموذجية:
                </span>
                <strong>[${item.correctAnswer ? item.correctAnswer.toUpperCase() : ''}]</strong> ${correctOpt ? this.escapeHTML(correctOpt.text) : 'الخيار ' + item.correctAnswer}
              </div>
            </div>

            <!-- الشرح التفصيلي -->
            ${item.explanation ? `
              <div class="explanation-box" style="margin-top: 1rem;">
                <strong style="color: var(--accent); display: block; margin-bottom: 0.35rem; font-size: 1.05rem;">
                  💡 خطوات الحل والاشتقاق النموذجي:
                </strong>
                <div style="white-space: pre-wrap; line-height: 1.7;">${this.escapeHTML(item.explanation)}</div>
              </div>
            ` : ''}
          </div>
        </article>
      `;
    }).join('');
  },

  attachFilterListeners(breakdown) {
    const allBtn = document.getElementById('filter-all-btn');
    const incBtn = document.getElementById('filter-incorrect-btn');
    const corBtn = document.getElementById('filter-correct-btn');

    if (allBtn) {
      allBtn.onclick = () => {
        this.activeFilter = 'all';
        this.updateFilterView(breakdown);
      };
    }
    if (incBtn) {
      incBtn.onclick = () => {
        this.activeFilter = 'incorrect';
        this.updateFilterView(breakdown);
      };
    }
    if (corBtn) {
      corBtn.onclick = () => {
        this.activeFilter = 'correct';
        this.updateFilterView(breakdown);
      };
    }
  },

  updateFilterView(breakdown) {
    const container = document.getElementById('review-items-list');
    if (container) {
      container.innerHTML = this.renderReviewItems(breakdown);
    }

    const allBtn = document.getElementById('filter-all-btn');
    const incBtn = document.getElementById('filter-incorrect-btn');
    const corBtn = document.getElementById('filter-correct-btn');

    [allBtn, incBtn, corBtn].forEach(b => {
      if (b) b.className = 'btn btn-sm btn-secondary';
    });

    if (this.activeFilter === 'all' && allBtn) allBtn.className = 'btn btn-sm btn-primary';
    if (this.activeFilter === 'incorrect' && incBtn) incBtn.className = 'btn btn-sm btn-danger';
    if (this.activeFilter === 'correct' && corBtn) corBtn.className = 'btn btn-sm btn-success';
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

window.ResultsViewer = ResultsViewer;
