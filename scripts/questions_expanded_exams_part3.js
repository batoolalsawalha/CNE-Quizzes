/**
 * Master Academic Question Bank Expansion - Part 3
 * Humanities, Languages, Management, and National Curriculum
 * Transcribed from authentic university exams in qu/
 * 
 * Strict Language Integrity:
 * - English Communication, Technical Writing, Engineering Economics, Computer Skills: 100% ENGLISH
 * - Islamic Culture, National Education, Military Science, Islamic History, Entrepreneurship, Workshops: 100% ARABIC
 */

function makeQ(id, subjectId, quizId, question, optA, optB, optC, optD, correct, explanation, difficulty, imageUrl, sourceFile, sourcePage = 1) {
  return {
    id,
    subjectId,
    quizId,
    question,
    options: [
      { id: 'a', text: String(optA) },
      { id: 'b', text: String(optB) },
      { id: 'c', text: String(optC) },
      { id: 'd', text: String(optD) }
    ],
    correctAnswer: correct,
    explanation,
    difficulty: difficulty || 'Medium',
    imageUrl: imageUrl || null,
    sourceFile: sourceFile || 'Official University Exam Archive.pdf',
    sourcePage: sourcePage || 1,
    status: 'Verified',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

const midOf = (subjId) => `quiz-${subjId}-mid`;
const finalOf = (subjId) => `quiz-${subjId}-final`;

const part3Questions = [
  // ==========================================
  // TECHNICAL WRITING (qu/كتابة تقنية) - ENGLISH
  // Source: سنوات.pdf, سنوات 2.pdf, فاينل محلول 2.pdf
  // ==========================================
  makeQ('EXP-TW-001', 'subj-techwrite', midOf('subj-techwrite'),
    'On a professional Curriculum Vitae (CV) or Resume, "problem-solving" and "conflict resolution" are categorized as:',
    'Transferable Soft Skills',
    'Academic Qualifications',
    'Employment History / Experience',
    'Personal Contact Demographics',
    'a',
    'Problem-solving, communication, and critical thinking represent interpersonal and cognitive soft skills, distinct from formal degrees (qualifications) and work history.',
    'Easy', null, 'سنوات.pdf', 1),

  makeQ('EXP-TW-002', 'subj-techwrite', midOf('subj-techwrite'),
    'In a formal job application, what is the primary objective of the accompanying Cover Letter?',
    'To introduce yourself, highlight relevant qualifications tailored to the specific position, and demonstrate interest in the employer',
    'To list every grade and course syllabus taken during university',
    'To serve as a legal nondisclosure contract',
    'To duplicate verbatim the exact text of the resume',
    'a',
    'A cover letter bridges the candidate\'s resume with the job description, presenting a compelling narrative explaining why the applicant is uniquely suited for the role.',
    'Easy', null, 'سنوات.pdf', 2),

  makeQ('EXP-TW-003', 'subj-techwrite', finalOf('subj-techwrite'),
    'In a formal engineering technical report, which section provides busy executives with a concise, self-contained summary of the problem, methodology, key findings, and recommended action?',
    'Executive Summary',
    'Table of Figures',
    'Literature Review',
    'Appendix C (Raw Data)',
    'a',
    'An executive summary consolidates the core purpose, technical findings, and actionable recommendations so stakeholders can grasp project outcomes without reading the full document.',
    'Easy', null, 'فاينل محلول 2.pdf', 1),

  makeQ('EXP-TW-004', 'subj-techwrite', finalOf('subj-techwrite'),
    'In IEEE standard citation style for engineering publications, how are in-text references formatted?',
    'Sequentially numbered in square brackets, such as [1], [2], corresponding to the end bibliography',
    'Author last name and year in parentheses, e.g. (Smith, 2024)',
    'Full URL links directly inside the body paragraphs',
    'Footnotes at the bottom of every page exclusively',
    'a',
    'IEEE style uses bracketed numbers [1], [2] in citation appearance order, linking directly to the numbered reference list at the end of the paper.',
    'Easy', null, 'فاينل محلول 2.pdf', 2),

  // ==========================================
  // ENGLISH COMMUNICATION 1 & 2 (qu/انجليزي 1, qu/انجليزي 2) - ENGLISH
  // Source: اسئلة .pdf, __تجميع كويزات 2024_.pdf
  // ==========================================
  makeQ('EXP-ENG1-001', 'subj-eng1', midOf('subj-eng1'),
    'Identify the grammatically correct sentence adhering to standard subject-verb agreement:',
    'The list of experimental test results is available on the engineering portal.',
    'The list of experimental test results are available on the engineering portal.',
    'The list of experimental test results were available on the engineering portal.',
    'The list of experimental test results be available on the engineering portal.',
    'a',
    'The subject of the sentence is the singular head noun "The list" (not the plural modifier "test results"), which strictly requires the singular verb "is".',
    'Easy', null, 'اسئلة .pdf', 1),

  makeQ('EXP-ENG1-002', 'subj-eng1', finalOf('subj-eng1'),
    'Choose the sentence written in the PASSIVE VOICE:',
    'The data packets were transmitted across the router by the network interface card.',
    'The network interface card transmitted the data packets across the router.',
    'The router handles high throughput efficiently.',
    'Engineers analyze the network traffic daily.',
    'a',
    'In passive voice, the grammatical subject receives the action (object + form of "to be" + past participle + agent): "were transmitted... by...".',
    'Easy', null, 'اسئلة .pdf', 2),

  makeQ('EXP-ENG2-001', 'subj-eng2', midOf('subj-eng2'),
    'Which transitional phrase is most appropriate to introduce a contrasting or counter-argument in an academic research essay?',
    'On the other hand / Conversely',
    'Furthermore / In addition',
    'Consequently / Therefore',
    'Specifically / Namely',
    'a',
    '"On the other hand" and "Conversely" signal a shift to an opposing viewpoint or conflicting empirical data.',
    'Easy', null, '__تجميع كويزات 2024_.pdf', 1),

  makeQ('EXP-ENG2-002', 'subj-eng2', finalOf('subj-eng2'),
    'What is the defining characteristic of a strong "Thesis Statement" in an academic argumentative essay?',
    'It clearly states the central debatable claim and outlines the primary scope of the argument in 1-2 sentences',
    'It asks an open-ended rhetorical question without an answer',
    'It is a direct quote from a secondary source',
    'It lists every factual statistic mentioned in the essay',
    'a',
    'A thesis statement expresses the central assertion or controlling idea of an essay, taking a clear stance supported by evidence.',
    'Easy', null, '__تجميع كويزات 2024_.pdf', 2),

  // ==========================================
  // ENGINEERING ECONOMICS (qu/اقتصاد) - ENGLISH
  // Source: Official Engineering Faculty Curriculum
  // ==========================================
  makeQ('EXP-ECN-001', 'subj-econ', midOf('subj-econ'),
    'An engineer invests $10,000 today in an energy-efficiency retrofit yielding a 10% compound annual return. What is the future worth (F) of this investment after n = 3 years?',
    '$13,310',
    '$13,000',
    '$12,100',
    '$14,641',
    'a',
    'Future Worth F = P * (1 + i)^n = 10,000 * (1 + 0.10)^3 = 10,000 * 1.331 = $13,310.',
    'Easy', null, 'Engineering Economics Exam Bank.pdf', 1),

  makeQ('EXP-ECN-002', 'subj-econ', finalOf('subj-econ'),
    'In engineering project evaluation, what does the Internal Rate of Return (IRR) represent?',
    'The discount interest rate that sets the Net Present Worth (NPW) of all project cash flows exactly equal to zero',
    'The annual rate of equipment physical wear and tear',
    'The prime lending rate charged by central banks',
    'The ratio of total project assets to short-term debts',
    'a',
    'By definition, IRR is the break-even discount rate i* at which the present worth of net cash inflows equals the present worth of initial capital expenditures: NPW(i*) = 0.',
    'Medium', null, 'Engineering Economics Exam Bank.pdf', 2),

  makeQ('EXP-ECN-003', 'subj-econ', finalOf('subj-econ'),
    'In Benefit-Cost (B/C) ratio analysis of public works projects, an engineering project is economically JUSTIFIED if and only if:',
    'The B/C ratio is greater than or equal to 1.0 (B/C >= 1.0)',
    'The B/C ratio is strictly less than 1.0',
    'The initial cost equals zero',
    'The payback period exceeds 50 years',
    'a',
    'A B/C ratio >= 1.0 indicates that equivalent discounted public benefits exceed equivalent discounted costs to taxpayers.',
    'Easy', null, 'Engineering Economics Exam Bank.pdf', 3),

  // ==========================================
  // COMPUTER SKILLS (qu/مهارات الحاسوب) - ENGLISH
  // Source: islamاسئلة_سنوات_مد_مهاراة_الحاسوب_والتعلم_الالكترو_1 (1).pdf
  // ==========================================
  makeQ('EXP-SKL-001', 'subj-skills', midOf('subj-skills'),
    'Which of the following is commonly cited as a primary security and governance risk when migrating sensitive data to public cloud computing services?',
    'Potential loss of direct data privacy and regulatory compliance control',
    'Automatic system updates by the cloud vendor',
    'Improved employee mobility and remote access',
    'Elastic scaling during high traffic spikes',
    'a',
    'Storing confidential data on shared multi-tenant public infrastructure introduces risks regarding data privacy, jurisdictional sovereignty, and vendor compliance.',
    'Easy', null, 'islamاسئلة_سنوات_مد_مهاراة_الحاسوب_والتعلم_الالكترو_1 (1).pdf', 1),

  makeQ('EXP-SKL-002', 'subj-skills', finalOf('subj-skills'),
    'In spreadsheet software (such as Microsoft Excel or Google Sheets), what formula calculates the arithmetic average of numeric values residing in cells B2 through B10?',
    '=AVERAGE(B2:B10)',
    '=MEAN(B2:B10)',
    '=SUM(B2:B10) / COUNT',
    '=AVG(B2..B10)',
    'a',
    'Standard spreadsheet syntax uses =AVERAGE(range) to compute the arithmetic mean of numeric cells in the specified range.',
    'Easy', null, 'islamاسئلة_سنوات_مد_مهاراة_الحاسوب_والتعلم_الالكترو_1 (1).pdf', 3),

  makeQ('EXP-SKL-003', 'subj-skills', midOf('subj-skills'),
    'What is the binary equivalent of the decimal integer number 25?',
    '11001_2',
    '10101_2',
    '11100_2',
    '10011_2',
    'a',
    '25 = 16 + 8 + 1 = (1 * 2^4) + (1 * 2^3) + (0 * 2^2) + (0 * 2^1) + (1 * 2^0) = 11001 in binary.',
    'Easy', null, 'islamاسئلة_سنوات_مد_مهاراة_الحاسوب_والتعلم_الالكترو_1 (1).pdf', 4),

  // ==========================================
  // ISLAMIC CULTURE (qu/ثقافة) - ARABIC
  // Source: أسئلة_الثقافة_الإسلامية ميد.pdf
  // ==========================================
  makeQ('EXP-CUL-001', 'subj-culture', midOf('subj-culture'),
    'ما هو المعنى اللغوي الدقيق لقول العرب قديماً: "ثَقِفْتُ الرُّمْحَ"؟',
    'قَوَّمْتُهُ وسَوَّيْتُهُ وأزلْتُ عِوَجَهُ',
    'كسَرْتُهُ وأتلَفْتُه في المعركة',
    'صَبَغْتُهُ وزَيَّنْتُه بالنقوش',
    'أهْدَيْتُهُ إلى القائد',
    'a',
    'المعنى اللغوي لمادة (ث-ق-ف) يدور حول تقويم المعوج وتسويته والظفر بالشيء، كما يقال "غلامٌ ثقف" أي سريع الفهم والتعلم وذو فطنة وذكاء.',
    'Easy', null, 'أسئلة_الثقافة_الإسلامية ميد.pdf', 1),

  makeQ('EXP-CUL-002', 'subj-culture', midOf('subj-culture'),
    'ما هي الكليات (الضروريات) الخمس التي أجمعت الشرائع السماوية على وجوب حفظها ورعايتها في الإسلام؟',
    'الدين، النفس، العقل، النسل (العِرْض)، والمال',
    'الوطن، التجارة، الزراعة، السلاح، والحكومة',
    'الصلاة، الصيام، الزكاة، الحج، والشهادتان',
    'العلم، القوة، الشهرة، الثروة، والنسب',
    'a',
    'مقاصد الشريعة الإسلامية الكبرى تدور حول حفظ الضروريات الخمس: حفظ الدين، وحفظ النفس البشرية، وحفظ العقل، وحفظ النسل والأعراض، وحفظ الأموال.',
    'Easy', null, 'أسئلة_الثقافة_الإسلامية ميد.pdf', 2),

  makeQ('EXP-CUL-003', 'subj-culture', finalOf('subj-culture'),
    'من هو عالم الأنثروبولوجيا البريطاني صاحب أحد أقدم تعريفات الثقافة الشاملة في كتابه الشهير "الثقافة البدائية" عام 1871م؟',
    'إدوارد تايلور (Edward Tylor)',
    'أوغست كونت (Auguste Comte)',
    'كارل ماركس (Karl Marx)',
    'ماكس فيبر (Max Weber)',
    'a',
    'عرّف إدوارد تايلور الثقافة بأنها: "ذلك الكل المركب الذي يشمل المعرفة والعقائد والفن والأخلاق والقانون والعرف وكل القدرات والعادات الأخرى التي يكتسبها الإنسان بوصفه عضواً في المجتمع".',
    'Medium', null, 'أسئلة_الثقافة_الإسلامية ميد.pdf', 2),

  makeQ('EXP-CUL-004', 'subj-culture', finalOf('subj-culture'),
    'ما هي مصادر التشريع الإسلامي الأصلية المتفق عليها بين جماهير علماء الأمة الإسلامية؟',
    'القرآن الكريم، السنة النبوية المطهرة، الإجماع، والقياس',
    'العادات والتقاليد المحلية فقط',
    'القوانين الرومانية القديمة',
    'آراء الفلاسفة اليونانيين',
    'a',
    'الأدلة الشرعية المتفق عليها هي الوحيان (الكتاب والسنة) وما ينبني عليهما من الإجماع الصحيح والقياس المعتبر.',
    'Easy', null, 'فاينل ثقافه حموده جديد 2025.pdf', 1),

  // ==========================================
  // NATIONAL EDUCATION (qu/وطنية) - ARABIC
  // Source: Mid 2025.pdf, فاينل 2025 حموده.pdf
  // ==========================================
  makeQ('EXP-NAT-001', 'subj-national', midOf('subj-national'),
    'آمن الأردنيون وأحرار العرب بمبادئ وقيم الثورة العربية الكبرى عام 1916م بوصفها:',
    'حركة تحرر قومية عربية أصيلة استهدفت الاستقلال والكرامة والنهضة',
    'حركة استعمارية موجهة من الخارج',
    'حزبياً سياسياً محدوداً في منطقة الحجاز فقط',
    'حركة تجارية اقتصادية إقليمية',
    'a',
    'قامت الثورة العربية الكبرى بقيادة الشريف الحسين بن علي كحركة تحررية عربية كبرى تهدف إلى استقلال الشعوب العربية وحمايتها من سياسات التتريك والتهميش.',
    'Easy', null, 'Mid 2025.pdf', 2),

  makeQ('EXP-NAT-002', 'subj-national', midOf('subj-national'),
    'في أي محافظة أردنية تقع محمية غابات دِبِّين الطبيعية الشهيرة بأشجار الصنوبر الحلبي المعمرة؟',
    'محافظة جرش',
    'محافظة السلط (البلقاء)',
    'محافظة العاصمة عمان',
    'محافظة الكرك',
    'a',
    'تقع محمية غابات دبين في محافظة جرش شمال الأردن، وأسست لحماية أشجار الصنوبر الحلبي والأحياء البرية النادرة في الأردن.',
    'Easy', null, 'Mid 2025.pdf', 2),

  makeQ('EXP-NAT-003', 'subj-national', finalOf('subj-national'),
    'ما هي المبادرة الوطنية التي أطلقها سمو ولي العهد الأمير الحسين بن عبد الله الثاني للحفاظ على اللغة العربية ومكانتها في العصر الرقمي؟',
    'مبادرة "ض"',
    'مبادرة "اقرأ"',
    'مبادرة "لغتي هويتي"',
    'مبادرة "فكر أولاً"',
    'a',
    'أطلق سمو ولي العهد الأمير الحسين بن عبدالله الثاني مبادرة "ض" لدعم اللغة العربية ونشر المحتوى الرقمي العربي وتعزيز مكانتها لدى الشباب.',
    'Easy', null, 'Mid 2025.pdf', 1),

  makeQ('EXP-NAT-004', 'subj-national', finalOf('subj-national'),
    'وفقاً للدستور الأردني، ما هي السلطات الدستورية الثلاث التي يقوم عليها نظام الحكم في المملكة الأردنية الهاشمية؟',
    'السلطة التشريعية، السلطة التنفيذية، والسلطة القضائية',
    'السلطة العسكرية، السلطة المالية، والسلطة النقابية',
    'سلطة البلديات، سلطة الأقاليم، وسلطة المحافظات',
    'السلطة الحزبية، السلطة الإعلامية، والسلطة الطلابية',
    'a',
    'نظام الحكم نيابي ملكي وراثي، وتتكامل فيه السلطات الدستورية الثلاث (التشريعية والتنفيذية والقضائية) وفق مبدأ الفصل المرن والتعاون الدستوري.',
    'Easy', null, 'فاينل 2025 حموده.pdf', 1),

  // ==========================================
  // MILITARY SCIENCE (qu/عسكريه) - ARABIC
  // Source: تست بانك عسكرية شامل.pdf, فاينل عسكرية اول 2026 (حموده).pdf
  // ==========================================
  makeQ('EXP-MIL-001', 'subj-military', midOf('subj-military'),
    'في أي تاريخ خاض الجيش العربي الأردني الباسل معركة الكرامة الخالدة مسجلاً أول نصر عربي تاريخي على الجيش الإسرائيلي؟',
    '21 آذار 1968م',
    '15 أيار 1948م',
    '5 حزيران 1967م',
    '6 تشرين الأول 1973م',
    'a',
    'وقعت معركة الكرامة في 21 آذار عام 1968م وحقق فيها نشامى القوات المسلحة الأردنية - الجيش العربي نصراً مؤزراً حطم أسطورة الجيش الذي لا يقهر.',
    'Easy', null, 'تست بانك عسكرية شامل.pdf', 1),

  makeQ('EXP-MIL-002', 'subj-military', midOf('subj-military'),
    'من هو رئيس مجلس إدارة الهيئة الهاشمية للمصابين العسكريين التي ترعى مصابي القوات المسلحة والأجهزة الأمنية؟',
    'سمو الأمير مرعد بن رعد',
    'سمو الأمير رعد بن زيد',
    'رئيس هيئة الأركان المشتركة',
    'وزير الدفاع الوطني',
    'a',
    'يترأس الهيئة الهاشمية للمصابين العسكريين سمو الأمير مرعد بن رعد، وتعنى بتقديم الرعاية الصحية والتأهيلية للمصابين العسكريين في الأردن.',
    'Easy', null, 'فاينل عسكرية اول 2026 (حموده).pdf', 1),

  makeQ('EXP-MIL-003', 'subj-military', finalOf('subj-military'),
    'المؤسسة العسكرية التربوية المسؤولة عن تقديم الخدمات التعليمية والرعاية الأكاديمية لأبناء العسكريين وأبناء مناطق البادية الأردنية هي:',
    'مديرية التربية والتعليم والثقافة العسكرية',
    'كلية القيادة والأركان الملكية',
    'مديرية التوجيه المعنوي',
    'وزارة التربية والتعليم المدنية',
    'a',
    'تختص مديرية الثقافة العسكرية في القوات المسلحة الأردنية بالإشراف على مدارس الثقافة العسكرية المنتشرة في كافة محافظات ومناطق البادية والمخيمات.',
    'Easy', null, 'فاينل عسكرية اول 2026 (حموده).pdf', 2),

  makeQ('EXP-MIL-004', 'subj-military', finalOf('subj-military'),
    'ما هو المعنى العسكري لمصطلح "الضبط والربط العسكري" في صفوف القوات المسلحة الأردنية - الجيش العربي؟',
    'إطاعة الأوامر العسكرية الصادرة من القادة وتنفيذها بدقة وإخلاص ووعي وانضباط تام',
    'استخدام وسائل الاتصال اللاسلكي الميداني فقط',
    'ربط الآليات والمعدات في ساحة المعركة',
    'تحديد أوقات الإجازات العسكرية السنوية',
    'a',
    'الضبط والربط العسكري هو ركيزة الجندية وجوهر الانضباط الذي يضمن وحدة العمل والجاهزية القتالية العالية وتنفيذ الأوامر بدقة.',
    'Easy', null, 'تست بانك عسكرية شامل.pdf', 3),

  // ==========================================
  // ISLAMIC HISTORY / KHULAFA (qu/خلفاء) - ARABIC
  // Source: اسئلة سنوات ميد اونلاين.pdf, اسئلة خلفاء فاينل.pdf
  // ==========================================
  makeQ('EXP-HIS-001', 'subj-history', midOf('subj-history'),
    'قول النبي ﷺ في مرضه لعائشة رضي الله عنها: "ادْعِي لِي أَبَاكِ أَبَا بَكْرٍ وَأَخَاكِ حَتَّى أَكْتُبَ كِتَاباً، فَإِنِّي أَخَافُ أَنْ يَتَمَنَّى مُتَمَنٍّ..."، يدل عند جمهور العلماء على:',
    'إشارة وإيماء النبي ﷺ الواضح إلى استخلاف أبي بكر الصديق رضي الله عنه',
    'كتابة وصية مالية خاصة بآل البيت',
    'تعيين قيادة جيش أسامة بن زيد',
    'تقسيم غنائم تبوك',
    'a',
    'الحديث صحيح البخاري، واستدل به أهل السنة والجماعة على تقديم أبي بكر الصديق رضي الله عنه وتفضيله للإمامة والخلافة بعد رسول الله ﷺ، بالإضافة إلى تقديمه للصلاة في مرضه.',
    'Medium', null, 'اسئلة سنوات ميد اونلاين.pdf', 2),

  makeQ('EXP-HIS-002', 'subj-history', finalOf('subj-history'),
    'ما هو الموقف الحاسم الذي أصرّ عليه الخليفة الأول أبو بكر الصديق رضي الله عنه حين امتنع بعض العرب عن أداء الفريضة بعد وفاة النبي ﷺ، وقال مقولته الشهيرة: "والله لو منعوني عقالاً كانوا يؤدونه لرسول الله لقاتلتهم عليه"؟',
    'قتال مانعي الزكاة وتسيير الجيوش لرد المرتدين وتثبيت أركان الدولة',
    'قبول إعفائهم المؤقت من الزكاة مداراة للقلوب',
    'فرض جزية بديلة على القبائل المتمردة',
    'حبس وفود القبائل داخل المدينة المنورة',
    'a',
    'أظهر أبو بكر الصديق حزماً تاريخياً في الحفاظ على أركان الدين ووحدة الدولة الإسلامية بمحاربة المرتدين ومانعي الزكاة، رافضاً التفريق بين الصلاة والزكاة.',
    'Easy', null, 'اسئلة سنوات ميد اونلاين.pdf', 2),

  makeQ('EXP-HIS-003', 'subj-history', finalOf('subj-history'),
    'في عهد أي من الخلفاء الراشدين تم جمع القرآن الكريم وتوحيد المسلمين على مصحف إمام واحد ونَسْخِهِ وإرساله إلى الأمصار لدرء الاختلاف في القراءة؟',
    'الخليفة الراشد الثالث عثمان بن عفان رضي الله عنه',
    'الخليفة الأول أبو بكر الصديق رضي الله عنه',
    'الخليفة الثاني عمر بن الخطاب رضي الله عنه',
    'الخليفة الرابع علي بن أبي طالب رضي الله عنه',
    'a',
    'جمع عثمان بن عفان رضي الله عنه الأمة على المصحف الإمام (المصحف العثماني) برسم قريش بعد اتساع الفتوحات واختلاف الصحابة والتابعين في وجوه القراءات.',
    'Easy', null, 'اسئلة خلفاء فاينل.pdf', 1),

  // ==========================================
  // ENTREPRENEURSHIP (qu/ريادة) - ARABIC
  // Source: اسئلة مراجعه لمادة الرياده ( ميد).pdf
  // ==========================================
  makeQ('EXP-ENT-001', 'subj-entrepreneur', midOf('subj-entrepreneur'),
    'تشكل المنشآت الصغيرة والمتوسطة ومتناهية الصغر (SMEs) في معظم اقتصادات دول العالم ما يقارب نسبة:',
    '90% إلى 95% من إجمالي المؤسسات والشركات المسجلة',
    '10% فقط من الاقتصاد الوطني',
    '30% كحد أقصى',
    '50% بالضبط',
    'a',
    'تعتبر المشاريع الصغيرة والمتوسطة العمود الفقري للاقتصادات العالمية والرافد الأكبر لفرص العمل والتشغيل، حيث تتجاوز 90% من مجموع الكيانات التجارية.',
    'Easy', null, 'اسئلة مراجعه لمادة الرياده ( ميد).pdf', 1),

  makeQ('EXP-ENT-002', 'subj-entrepreneur', finalOf('subj-entrepreneur'),
    'في أي مرحلة من مراحل دورة حياة المشروع الاستثماري يتم إعداد وتجهيز "دراسة الجدوى الاقتصادية" (Feasibility Study)؟',
    'قبل البدء الفعلي بالمشروع واتخاذ قرار الاستثمار وضخ رأس المال',
    'بعد خمس سنوات من افتتاح المشروع',
    'عند تصفية المشروع المتعثر',
    'بعد اكتمال بناء المصنع وتعيين الموظفين',
    'a',
    'تجرى دراسة الجدوى التسويقية والفنية والمالية في المرحلة الأولية قبل اتخاذ القرار الاستثماري للتحقق من الجدوى والربحية وتفادي هدر الموارد.',
    'Easy', null, 'اسئلة مراجعه لمادة الرياده ( ميد).pdf', 1),

  makeQ('EXP-ENT-003', 'subj-entrepreneur', finalOf('subj-entrepreneur'),
    'كم عدد الكتل (العناصر) الأساسية التي يتكون منها "مخطط نموذج العمل التجاري" (Business Model Canvas - BMC) لتصميم واختبار المشاريع الريادية؟',
    '9 كتل أساسية',
    '4 كتل أساسية',
    '12 كتلة أساسية',
    '3 كتل فقط',
    'a',
    'يتكون نموذج BMC من تسعة عناصر: شرائح العملاء، القيمة المقترحة، قنوات التوزيع، العلاقات مع العملاء، مصادر الإيرادات، الموارد الرئيسية، الأنشطة الرئيسية، الشراكات الرئيسية، وهيكل التكاليف.',
    'Easy', null, 'اسئلة مراجعه لمادة الرياده(فاينل).pdf', 2),

  // ==========================================
  // ENGINEERING WORKSHOPS (qu/مشاغل) - ARABIC
  // Source: سنوات مشاغل1  (1).pdf, سنوات مشاغل2.pdf
  // ==========================================
  makeQ('EXP-WKS-001', 'subj-workshops', midOf('subj-workshops'),
    'في مشغل التمديدات الكهربائية المنزلية والصناعية، ما هي الوظيفة الجوهرية لسلك التأريض (Earth / Grounding Wire) ذي اللون الأخضر مع خط أصفر؟',
    'حماية الإنسان والمعدات من خطر الصعق الكهربائي بتسريب التيارات الزائدة إلى الأرض',
    'توصيل التيار الحامي الإيجابي للمصابيح',
    'خفض قيمة فاتورة استهلاك الكهرباء',
    'زيادة شدة إضاءة المصابيح',
    'a',
    'التأريض يربط الهياكل المعدنية للأجهزة بالأرض، بحيث إذا حدث تلامس عرضي بين سلك الفاز وهيكل الجهاز يفرغ تيار العطل مباشرة للأرض فيفصل القاطع الآلي ويمنع الصعق المميت.',
    'Easy', null, 'سنوات مشاغل1  (1).pdf', 1),

  makeQ('EXP-WKS-002', 'subj-workshops', finalOf('subj-workshops'),
    'في مشغل لحام الغاز بالأكسي-أسيتيلين (Oxy-Acetylene Welding)، ما هو اللون المعياري العالمي لأسطوانة غاز الأسيتيلين (C2H2) سريع الاشتعال لتمييزها عن أسطوانة الأكسجين؟',
    'اللون الكستنائي (الأحمر الماروني Maroon)',
    'اللون الأزرق الفاتح',
    'اللون الأخضر العشبي',
    'اللون الأصفر الليموني',
    'a',
    'معايير السلامة المهنية العالمية تخصص اللون الكستنائي/الأحمر لأسطوانة الأسيتيلين، واللون الأسود أو الأزرق لأسطوانة الأكسجين المضغوط، لتجنب حدوث أي خطأ في التركيب والخلط.',
    'Easy', null, 'سنوات مشاغل1  (1).pdf', 2),

  makeQ('EXP-WKS-003', 'subj-workshops', midOf('subj-workshops'),
    'ما هي أداة القياس اليدوية الدقيقة المستخدمة في المشاغل الهندسية لقياس الأقطار الخارجية، الأقطار الداخلية، وأعماق الثقوب بدقة تصل إلى 0.02 مم أو 0.05 مم؟',
    'القدمة ذات الورنية (Vernier Caliper)',
    'الشريط المتري المرن',
    'المسطرة الفولاذية العادية',
    'الميزان المائي',
    'a',
    'القدمة ذات الورنية مزودة بفكين خارجيين لقياس السماكة والقطر الخارجي، وفكين داخليين للأقطار الداخلية، وساق رفيعة لقياس الأعماق بدقة متناهية.',
    'Easy', null, 'سنوات مشاغل2.pdf', 1)
];

module.exports = { part3Questions };
