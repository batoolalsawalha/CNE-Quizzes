/**
 * CNE Quizzes - نافذة استيراد الأسئلة (Arabic Native)
 */

const ImporterUI = {
  activeFormat: 'json',

  openModal() {
    const subjects = AdminPanel.subjects || [];
    const quizzes = AdminPanel.quizzes || [];

    window.openModal({
      title: 'استيراد أسئلة جماعياً (JSON / CSV)',
      content: `
        <div>
          <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 1.25rem;">
            يمكنك استيراد عشرات أو مئات الأسئلة دفعة واحدة إلى بنك الأسئلة عبر ملفات Excel أو CSV أو JSON دون لمس أي سطر كود برمجي.
          </p>

          <!-- زر التبديل بين الصيغ -->
          <div style="display: flex; gap: 0.5rem; margin-bottom: 1.25rem;">
            <button type="button" class="btn btn-sm btn-primary" id="import-type-json" onclick="ImporterUI.switchFormat('json')">
              صيغة JSON
            </button>
            <button type="button" class="btn btn-sm btn-secondary" id="import-type-csv" onclick="ImporterUI.switchFormat('csv')">
              صيغة جدول CSV (Excel)
            </button>
          </div>

          <!-- تعيين المادة والكويز الافتراضي -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
            <div class="form-group">
              <label class="form-label" style="font-size: 0.9rem;">المادة المستهدفة *</label>
              <select class="form-control" id="import-subj-select">
                <option value="">-- اختر المادة --</option>
                ${subjects.map(s => `<option value="${s.id}">${s.nameAr || s.name} (${s.code})</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label" style="font-size: 0.9rem;">تعيين لاختبار محدد (اختياري)</label>
              <select class="form-control" id="import-quiz-select">
                <option value="">-- بدون تعيين (في بنك الأسئلة العام) --</option>
                ${quizzes.map(q => `<option value="${q.id}">${q.name}</option>`).join('')}
              </select>
            </div>
          </div>

          <!-- رفع ملف من الجهاز -->
          <div class="form-group">
            <label class="form-label" style="font-size: 0.9rem;">أو قم برفع ملف من جهازك (.json أو .csv):</label>
            <input type="file" id="import-file-input" class="form-control" accept=".json,.csv">
          </div>

          <!-- منطقة لصق البيانات -->
          <div class="form-group">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
              <label class="form-label" style="font-size: 0.9rem; margin-bottom: 0;">أو الصق البيانات النصية هنا مباشرة:</label>
              <button type="button" class="btn btn-sm btn-secondary" style="font-size: 0.8rem; padding: 0.25rem 0.6rem;" onclick="ImporterUI.loadSample()">
                📋 تحميل مثال للتوضيح
              </button>
            </div>
            <textarea class="form-control" id="import-textarea" style="font-family: var(--font-mono); font-size: 0.9rem; min-height: 160px; direction: ltr; text-align: left;" placeholder="الصق بيانات JSON أو CSV هنا..."></textarea>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1.5rem;">
            <button type="button" class="btn btn-secondary" onclick="window.closeModal()">إلغاء</button>
            <button type="button" class="btn btn-primary" id="btn-run-import" onclick="ImporterUI.executeImport()">
              🚀 تنفيذ الاستيراد الآن
            </button>
          </div>
        </div>
      `
    });

    const fileInput = document.getElementById('import-file-input');
    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
          document.getElementById('import-textarea').value = event.target.result;
          if (file.name.endsWith('.csv')) {
            ImporterUI.switchFormat('csv');
          } else if (file.name.endsWith('.json')) {
            ImporterUI.switchFormat('json');
          }
        };
        reader.readAsText(file);
      });
    }
  },

  switchFormat(format) {
    this.activeFormat = format;
    const jsonBtn = document.getElementById('import-type-json');
    const csvBtn = document.getElementById('import-type-csv');
    if (jsonBtn && csvBtn) {
      jsonBtn.className = format === 'json' ? 'btn btn-sm btn-primary' : 'btn btn-sm btn-secondary';
      csvBtn.className = format === 'csv' ? 'btn btn-sm btn-primary' : 'btn btn-sm btn-secondary';
    }
  },

  loadSample() {
    const textarea = document.getElementById('import-textarea');
    if (!textarea) return;

    if (this.activeFormat === 'json') {
      textarea.value = JSON.stringify([
        {
          "question": "In networking, which protocol provides connection-oriented reliable byte stream service?",
          "options": [
            { "id": "a", "text": "UDP" },
            { "id": "b", "text": "TCP" },
            { "id": "c", "text": "IP" },
            { "id": "d", "text": "ICMP" }
          ],
          "correctAnswer": "b",
          "explanation": "TCP (Transmission Control Protocol) is connection-oriented and guarantees ordered and error-checked delivery.",
          "difficulty": "Easy",
          "status": "Verified"
        }
      ], null, 2);
    } else {
      textarea.value = `Question,OptionA,OptionB,OptionC,OptionD,Answer,Explanation,Difficulty,Status\n"What is the default subnet mask for Class C IPv4?","255.0.0.0","255.255.0.0","255.255.255.0","255.255.255.255","c","Class C networks use a 24-bit mask (/24): 255.255.255.0.","Easy","Verified"`;
    }
  },

  async executeImport() {
    const raw = (document.getElementById('import-textarea').value || '').trim();
    const defaultSubjectId = document.getElementById('import-subj-select').value;
    const defaultQuizId = document.getElementById('import-quiz-select').value;

    if (!raw) {
      window.showToast('يرجى لصق بيانات JSON أو CSV أو رفع ملف', 'error');
      return;
    }

    const btn = document.getElementById('btn-run-import');
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'جاري استيراد الأسئلة...';
    }

    try {
      let result;
      if (this.activeFormat === 'json') {
        const parsed = JSON.parse(raw);
        result = await API.importJSON({
          questions: Array.isArray(parsed) ? parsed : [parsed],
          defaultSubjectId,
          defaultQuizId
        });
      } else {
        result = await API.importCSV({
          csv: raw,
          defaultSubjectId,
          defaultQuizId
        });
      }

      window.showToast(`تم استيراد ${result.importedCount} سؤالاً بنجاح!`, 'success');
      window.closeModal();

      if (typeof AdminPanel !== 'undefined') {
        await AdminPanel.fetchInitialData();
        AdminPanel.renderLayout();
      }
    } catch (err) {
      window.showToast(`خطأ أثناء الاستيراد: ${err.message}`, 'error');
      if (btn) {
        btn.disabled = false;
        btn.textContent = '🚀 تنفيذ الاستيراد الآن';
      }
    }
  }
};

window.ImporterUI = ImporterUI;
