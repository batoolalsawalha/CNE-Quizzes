/**
 * CNE Quizzes - نافذة استيراد الأسئلة (Arabic Native)
 * يدعم استيراد الأسئلة من: PDF, Excel (CSV), نصوص عادية (Raw Text), و JSON
 */

const ImporterUI = {
  activeFormat: 'pdf',
  uploadedPdfBase64: null,
  uploadedPdfName: '',

  openModal() {
    const subjects = AdminPanel.subjects || [];
    const quizzes = AdminPanel.quizzes || [];
    this.uploadedPdfBase64 = null;
    this.uploadedPdfName = '';
    this.activeFormat = 'pdf';

    window.openModal({
      title: '📥 استيراد أسئلة جماعياً (PDF / Excel / نصوص / JSON)',
      content: `
        <div>
          <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 1.25rem;">
            يمكنك استيراد عشرات أو مئات الأسئلة دفعة واحدة إلى بنك الأسئلة عبر ملفات <strong>PDF</strong>، أو جداول <strong>Excel (CSV)</strong>، أو بلصق <strong>نصوص الأسئلة</strong> مباشرة دون الحاجة لإدخال كل سؤال يدوياً.
          </p>

          <!-- أزرار التبديل بين الصيغ -->
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.25rem;">
            <button type="button" class="btn btn-sm btn-primary" id="import-type-pdf" onclick="ImporterUI.switchFormat('pdf')">
              📄 ملف PDF
            </button>
            <button type="button" class="btn btn-sm btn-secondary" id="import-type-csv" onclick="ImporterUI.switchFormat('csv')">
              📊 جدول Excel (CSV)
            </button>
            <button type="button" class="btn btn-sm btn-secondary" id="import-type-text" onclick="ImporterUI.switchFormat('text')">
              📝 نص أسئلة عادي
            </button>
            <button type="button" class="btn btn-sm btn-secondary" id="import-type-json" onclick="ImporterUI.switchFormat('json')">
              💻 صيغة JSON
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

          <!-- أدوات مساعدة حسب الصيغة -->
          <div id="import-format-banner" style="background: var(--bg-secondary, #f8f9fa); border-radius: 8px; padding: 0.75rem 1rem; margin-bottom: 1rem; font-size: 0.88rem;">
            <div id="banner-pdf">
              ℹ️ <strong>ملفات PDF:</strong> ارفع ملف امتحان PDF يحتوي على أسئلة وخيارات (A, B, C, D) وسيقوم النظام باستخراجها وتصنيفها تلقائياً.
            </div>
            <div id="banner-csv" style="display: none;">
              ℹ️ <strong>ملفات Excel:</strong> املأ الأسئلة في ملف إكسل ثم احفظه كـ CSV وارفعها. 
              <button type="button" class="btn btn-xs btn-primary" style="margin-right: 0.5rem; padding: 0.2rem 0.6rem;" onclick="ImporterUI.downloadExcelTemplate()">
                📥 تحميل قالب Excel الجاهز
              </button>
            </div>
            <div id="banner-text" style="display: none;">
              ℹ️ <strong>نصوص الأسئلة:</strong> يمكنك نسخ نصوص الأسئلة من أي ملف وورد أو موقع ولصقها هنا مباشرة.
            </div>
            <div id="banner-json" style="display: none;">
              ℹ️ <strong>صيغة JSON:</strong> للمطورين والنسخ المتقدمة للبيانات.
            </div>
          </div>

          <!-- رفع ملف من الجهاز -->
          <div class="form-group" id="import-file-group">
            <label class="form-label" style="font-size: 0.9rem;" id="import-file-label">ارفع ملف PDF من جهازك (.pdf):</label>
            <input type="file" id="import-file-input" class="form-control" accept=".pdf">
            <div id="import-file-feedback" style="font-size: 0.85rem; color: var(--success, #28a745); margin-top: 0.35rem; display: none;"></div>
          </div>

          <!-- منطقة لصق البيانات (للـ text, csv, json) -->
          <div class="form-group" id="import-text-group" style="display: none;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
              <label class="form-label" style="font-size: 0.9rem; margin-bottom: 0;" id="import-text-label">أو الصق البيانات النصية هنا:</label>
              <button type="button" class="btn btn-sm btn-secondary" style="font-size: 0.8rem; padding: 0.25rem 0.6rem;" onclick="ImporterUI.loadSample()">
                📋 تحميل نموذج توضيحي
              </button>
            </div>
            <textarea class="form-control" id="import-textarea" style="font-family: var(--font-mono); font-size: 0.9rem; min-height: 160px; direction: ltr; text-align: left;" placeholder="الصق نصوص الأسئلة أو بيانات CSV هنا..."></textarea>
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

        const feedback = document.getElementById('import-file-feedback');
        if (file.name.toLowerCase().endsWith('.pdf')) {
          ImporterUI.uploadedPdfName = file.name;
          const reader = new FileReader();
          reader.onload = (event) => {
            ImporterUI.uploadedPdfBase64 = event.target.result;
            if (feedback) {
              feedback.style.display = 'block';
              feedback.textContent = `✓ تم تحميل ملف PDF: ${file.name} (${Math.round(file.size / 1024)} KB)`;
            }
          };
          reader.readAsDataURL(file);
        } else {
          // CSV / JSON / Text
          const reader = new FileReader();
          reader.onload = (event) => {
            const textarea = document.getElementById('import-textarea');
            if (textarea) textarea.value = event.target.result;
            if (file.name.endsWith('.csv')) {
              ImporterUI.switchFormat('csv');
            } else if (file.name.endsWith('.json')) {
              ImporterUI.switchFormat('json');
            } else {
              ImporterUI.switchFormat('text');
            }
            if (feedback) {
              feedback.style.display = 'block';
              feedback.textContent = `✓ تم قراءة محتوى الملف: ${file.name}`;
            }
          };
          reader.readAsText(file);
        }
      });
    }

    this.switchFormat('pdf');
  },

  switchFormat(format) {
    this.activeFormat = format;
    const formats = ['pdf', 'csv', 'text', 'json'];
    formats.forEach(f => {
      const btn = document.getElementById(`import-type-${f}`);
      if (btn) btn.className = f === format ? 'btn btn-sm btn-primary' : 'btn btn-sm btn-secondary';
      const bnr = document.getElementById(`banner-${f}`);
      if (bnr) bnr.style.display = f === format ? 'block' : 'none';
    });

    const fileInput = document.getElementById('import-file-input');
    const fileLabel = document.getElementById('import-file-label');
    const textGroup = document.getElementById('import-text-group');

    if (format === 'pdf') {
      if (fileInput) {
        fileInput.accept = '.pdf';
        fileInput.parentElement.style.display = 'block';
      }
      if (fileLabel) fileLabel.textContent = 'ارفع ملف PDF من جهازك (.pdf):';
      if (textGroup) textGroup.style.display = 'none';
    } else if (format === 'csv') {
      if (fileInput) {
        fileInput.accept = '.csv';
        fileInput.parentElement.style.display = 'block';
      }
      if (fileLabel) fileLabel.textContent = 'ارفع ملف جدول من جهازك (.csv):';
      if (textGroup) textGroup.style.display = 'block';
    } else if (format === 'text') {
      if (fileInput) {
        fileInput.accept = '.txt';
        fileInput.parentElement.style.display = 'block';
      }
      if (fileLabel) fileLabel.textContent = 'أو ارفع ملف نصي (.txt):';
      if (textGroup) textGroup.style.display = 'block';
    } else if (format === 'json') {
      if (fileInput) {
        fileInput.accept = '.json';
        fileInput.parentElement.style.display = 'block';
      }
      if (fileLabel) fileLabel.textContent = 'ارفع ملف بيانات من جهازك (.json):';
      if (textGroup) textGroup.style.display = 'block';
    }
  },

  downloadExcelTemplate() {
    const csvContent = "\uFEFF" + [
      "Question,OptionA,OptionB,OptionC,OptionD,Answer,Explanation,Difficulty",
      '"What protocol is used for secure web browsing?","HTTP","HTTPS","FTP","SSH","b","HTTPS encrypts web traffic using TLS.","Easy"',
      '"ما هو البروتوكول المستخدم لنقل الملفات؟","HTTP","FTP","SMTP","DNS","b","FTP هو File Transfer Protocol لنقل الملفات.","Easy"',
      '"Which layer provides end-to-end communication?","Network","Transport","Data Link","Physical","b","Transport layer (TCP/UDP) handles end-to-end.","Medium"'
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "CNE_Questions_Template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.showToast('تم تحميل قالب Excel بنجاح', 'success');
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
          "explanation": "TCP (Transmission Control Protocol) is connection-oriented.",
          "difficulty": "Easy",
          "status": "Verified"
        }
      ], null, 2);
    } else if (this.activeFormat === 'csv') {
      textarea.value = `Question,OptionA,OptionB,OptionC,OptionD,Answer,Explanation,Difficulty\n"What is the default subnet mask for Class C IPv4?","255.0.0.0","255.255.0.0","255.255.255.0","255.255.255.255","c","Class C uses /24: 255.255.255.0","Easy"`;
    } else {
      textarea.value = `1. What is the standard port for HTTPS?
A) 80
B) 443
C) 8080
D) 22
Answer: B
Explanation: HTTPS uses port 443 by default.

Q2: ما هو البروتوكول المسؤول عن ترجمة أسماء النطاقات إلى عناوين IP؟
أ) DHCP
ب) DNS
ج) ARP
د) ICMP
الإجابة: ب`;
    }
  },

  async executeImport() {
    const defaultSubjectId = document.getElementById('import-subj-select').value;
    const defaultQuizId = document.getElementById('import-quiz-select').value;
    const textarea = document.getElementById('import-textarea');
    const rawText = textarea ? textarea.value.trim() : '';

    const btn = document.getElementById('btn-run-import');

    try {
      let result;

      if (this.activeFormat === 'pdf') {
        if (!this.uploadedPdfBase64) {
          window.showToast('يرجى اختيار ملف PDF أولاً من جهازك', 'error');
          return;
        }

        if (btn) {
          btn.disabled = true;
          btn.textContent = 'جاري قراءة واستخراج الأسئلة من PDF...';
        }

        result = await API.importPDF({
          pdfBase64: this.uploadedPdfBase64,
          fileName: this.uploadedPdfName || 'Uploaded Exam.pdf',
          defaultSubjectId,
          defaultQuizId
        });

      } else if (this.activeFormat === 'text') {
        if (!rawText) {
          window.showToast('يرجى لصق نصوص الأسئلة في المربع', 'error');
          return;
        }

        if (btn) {
          btn.disabled = true;
          btn.textContent = 'جاري تحليل الأسئلة...';
        }

        result = await API.importText({
          text: rawText,
          defaultSubjectId,
          defaultQuizId
        });

      } else if (this.activeFormat === 'json') {
        if (!rawText) {
          window.showToast('يرجى لصق بيانات JSON', 'error');
          return;
        }

        if (btn) {
          btn.disabled = true;
          btn.textContent = 'جاري استيراد الأسئلة...';
        }

        const parsed = JSON.parse(rawText);
        result = await API.importJSON({
          questions: Array.isArray(parsed) ? parsed : [parsed],
          defaultSubjectId,
          defaultQuizId
        });

      } else {
        // CSV
        if (!rawText) {
          window.showToast('يرجى لصق بيانات CSV أو اختيار ملف إكسل', 'error');
          return;
        }

        if (btn) {
          btn.disabled = true;
          btn.textContent = 'جاري استيراد الأسئلة...';
        }

        result = await API.importCSV({
          csv: rawText,
          defaultSubjectId,
          defaultQuizId
        });
      }

      window.showToast(`🎉 تم استخراج واستيراد ${result.importedCount} سؤالاً بنجاح!`, 'success');
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
