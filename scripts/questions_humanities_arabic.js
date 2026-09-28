/**
 * Master Academic Question Bank - Humanities, Languages & University Requirements
 * Strict Language Preservation:
 * - Islamic Culture, National Education, Military Science, History (Khulafa), Entrepreneurship, Workshops: ARABIC (as in original exams)
 * - English 1, English 2, Technical Writing, Engineering Economics: ENGLISH (as in original exams)
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

const humanitiesQuestions = [
  // ==========================================
  // ثقافة إسلامية (HUM101) - ARABIC
  // ==========================================
  makeQ('CULT-MID-001', 'subj-culture', midOf('subj-culture'), 'ما هو المصدر الأول والأساسي للتشريع الإسلامي والثقافة الإسلامية؟', 'القرآن الكريم', 'السنة النبوية', 'الإجماع', 'القياس', 'a', 'القرآن الكريم هو كلام الله تعالى المعجز المنزّل على نبينا محمد صلى الله عليه وسلم، وهو المصدر التشريعي الأول باتفاق علماء المسلمين.', 'Easy', null, 'أسئلة_الثقافة_الإسلامية ميد.pdf', 1),
  makeQ('CULT-MID-002', 'subj-culture', midOf('subj-culture'), 'الخاصية التي تعني أن التشريع الإسلامي منزل من عند الله تعالى ومنزه عن النقص والجهل والهوى تسمى:', 'الربانية', 'الشمول', 'الوسطية', 'الواقعية', 'a', 'خاصية الربانية تعني أن أحكام الإسلام ومبادئه مصدرها وحي إلهي من الله العليم الخبير بما يصلح شأن البشر.', 'Easy', null, 'أسئلة_الثقافة_الإسلامية ميد.pdf', 2),
  makeQ('CULT-FIN-001', 'subj-culture', finalOf('subj-culture'), 'ما هو حكم صلة الأرحام في الشريعة الإسلامية؟', 'واجبة قطعا وقطيعتها من كبائر الذنوب', 'سنة مستحبة فقط', 'مباحة تترك لرغبة الشخص', 'واجبة للأقارب المباشرين فقط', 'a', 'صلة الرحم من الواجبات الشرعية الثابتة بنصوص القرآن والسنة، وقد توعد الله قاطع الرحم باللعنة والشقاء.', 'Easy', null, 'فاينل ثقافه حموده جديد 2025.pdf', 1),
  makeQ('CULT-FIN-002', 'subj-culture', finalOf('subj-culture'), 'المقاصد الضرورية الخمسة (الكليات الخمس) التي جاءت الشريعة الإسلامية لحفظها ورعايتها هي:', 'الدين، النفس، العقل، النسل (العرض)، والمال', 'الصلاة، الزكاة، الصوم، الحج، والشهادتين', 'الدولة، الدستور، الجيش، الاقتصاد، والتعليم', 'الحرية، العدالة، المساواة، الشورى، وحقوق الإنسان', 'a', 'اتفقت الشرائع السماوية وعلماء الأمة على حفظ الكليات الخمس الضرورية: الدين، النفس، العقل، النسل، والمال.', 'Medium', null, 'فاينل ثقافه حموده جديد 2025.pdf', 2),

  // ==========================================
  // التربية الوطنية (HUM102) - ARABIC
  // ==========================================
  makeQ('NAT-MID-001', 'subj-national', midOf('subj-national'), 'صدر أول دستور للمملكة الأردنية الهاشمية المعمول به حالياً مع تعديلاته في عهد جلالة المغفور له الملك:', 'الملك طلال بن عبد الله (عام 1952)', 'الملك عبد الله الأول بن الحسين', 'الملك الحسين بن طلال', 'الملك عبد الله الثاني بن الحسين', 'a', 'صدر دستور عام 1952 في عهد الملك طلال رحمه الله، ويعد من أرقى الدساتير العالمية بنصه على أن الأمة مصدر السلطات وتكريس الفصل بين السلطات.', 'Easy', null, 'Mid 2025.pdf', 1),
  makeQ('NAT-MID-002', 'subj-national', midOf('subj-national'), 'وفقاً لأحكام الدستور الأردني، ما هي السلطات الدستورية الثلاث في الدولة؟', 'السلطة التشريعية، السلطة التنفيذية، والسلطة القضائية', 'السلطة العسكرية، السلطة المدنية، والسلطة المالية', 'سلطة الحكومة، سلطة الأحزاب، وسلطة الإعلام', 'سلطة المحافظات، سلطة البلديات، وسلطة النقابات', 'a', 'النظام الدستوري الأردني يقوم على مبدأ الفصل المرن بين السلطات الثلاث: التشريعية، التنفيذية، والقضائية المستقلة.', 'Easy', null, 'Mid 2025.pdf', 2),
  makeQ('NAT-FIN-001', 'subj-national', finalOf('subj-national'), 'تتولى السلطة التشريعية في الأردن هيئة تسمى:', 'مجلس الأمة (ويتألف من مجلسي الأعيان والنواب)', 'مجلس الوزراء', 'المجلس القضائي الأعلى', 'المحكمة الدستورية', 'a', 'تنص المادة (25) من الدستور على أن السلطة التشريعية تناط بمجلس الأمة والملك، ويتألف مجلس الأمة من مجلس الأعيان والنواب.', 'Easy', null, 'فاينل 2025 حموده.pdf', 1),
  makeQ('NAT-FIN-002', 'subj-national', finalOf('subj-national'), 'ما هو المفهوم الذي يُعبر عن الرابطة القانونية والسياسية والمعنوية بين الفرد والدولة وما يترتب عليها من حقوق وواجبات؟', 'المواطنة (Citizenship)', 'الإقامة', 'اللجوء السياسي', 'القومية', 'a', 'المواطنة هي الصفة القانونية والاجتماعية التي تمنح الفرد حقوقاً كاملة وتلزمه بواجبات الولاء والانتماء والدفاع عن الوطن.', 'Easy', null, 'فاينل 2025 حموده.pdf', 2),

  // ==========================================
  // العلوم العسكرية (MS101) - ARABIC
  // ==========================================
  makeQ('MIL-MID-001', 'subj-military', midOf('subj-military'), 'وقعت معركة الكرامة الخالدة التي حقق فيها الجيش العربي الأردني نصراً تاريخياً على الجيش الإسرائيلي بتاريخ:', '21 آذار 1968', '5 حزيران 1967', '6 تشرين الأول 1973', '15 أيار 1948', 'a', 'معركة الكرامة وقعت فجر يوم 21 آذار 1968 وسطر فيها الجيش العربي ملحمة بطولية حطمت أسطورة الجيش الذي لا يُقهر.', 'Easy', null, 'ميد 1.pdf', 1),
  makeQ('MIL-MID-002', 'subj-military', midOf('subj-military'), 'ما هو المفهوم العسكري الذي يعبر عن التزام الفرد العسكري بالأوامر والتعليمات والقوانين العسكرية بدقة وطواعية؟', 'الانضباط العسكري والضبط والربط', 'التكتيك الحربي', 'المناورة العسكرية', 'التعبئة العامة', 'a', 'الانضباط والضبط والربط العسكري هو الركيزة الأساسية لتماسك الجيوش ونجاح العمليات الحربية وتنفيذ الأوامر بدقة متناهية.', 'Easy', null, 'ميد 1.pdf', 2),
  makeQ('MIL-FIN-001', 'subj-military', finalOf('subj-military'), 'مفهوم الأمن الوطني الشامل للدولة الأردنية يرتكز على أبعاد متعددة تشمل:', 'الأمن السياسي، الاقتصادي، الاجتماعي، العسكري، والسيبراني', 'الأمن العسكري المسلح فقط', 'الأمن الغذائي والزراعي دون غيره', 'أمن الحدود الخارجية فقط', 'a', 'الأمن الوطني المعاصر مفهوم شمولي متكامل يشمل الأبعاد العسكرية والسياسية والاقتصادية والمجتمعية وحماية الفضاء السيبراني.', 'Easy', null, 'فاينل عسكرية اول 2026 (حموده).pdf', 1),
  makeQ('MIL-FIN-002', 'subj-military', finalOf('subj-military'), 'تم تعريب قيادة الجيش العربي الأردني وإنهاء خدمات الجنرال كلوب بتاريخ:', '1 آذار 1956 على يد المغفور له الملك الحسين بن طلال', '25 أيار 1946', '21 آذار 1968', '11 آب 1952', 'a', 'اتخذ الملك الحسين بن طلال طيب الله ثراه قراره التاريخي الشجاع بتعريب قيادة الجيش العربي في 1 آذار 1956 لبناء جيش وطني خالص.', 'Easy', null, 'فاينل عسكرية اول 2026 (حموده).pdf', 2),

  // ==========================================
  // تاريخ الخلفاء والحضارة الإسلامية (HIST101) - ARABIC
  // ==========================================
  makeQ('HIST-MID-001', 'subj-history', midOf('subj-history'), 'من هو أول الخلفاء الراشدين بعد وفاة النبي محمد صلى الله عليه وسلم، وتولى الخلافة بعد بيعة السقيفة؟', 'أبو بكر الصديق رضي الله عنه', 'عمر بن الخطاب رضي الله عنه', 'عثمان بن عفان رضي الله عنه', 'علي بن أبي طالب رضي الله عنه', 'a', 'تولى الصحابي الجليل أبو بكر الصديق رضي الله عنه الخلافة سنة 11 هـ كأول خليفة لرسول الله بإجماع الصحابة في سقيفة بني ساعدة.', 'Easy', null, 'اسئلة سنوات ميد اونلاين.pdf', 1),
  makeQ('HIST-MID-002', 'subj-history', midOf('subj-history'), 'في عهد أي من الخلفاء الراشدين تم استحداث التقويم الهجري وتأسيس نظام الدواوين (مثل ديوان الجند وديوان الخراج)؟', 'عمر بن الخطاب رضي الله عنه', 'أبو بكر الصديق رضي الله عنه', 'عثمان بن عفان رضي الله عنه', 'معاوية بن أبي سفيان رضي الله عنه', 'a', 'الخليفة العادل عمر بن الخطاب رضي الله عنه هو مؤسس الدواوين ومقرر التقويم الهجري ومؤسس نظام العسس والقضاء المستقل.', 'Easy', null, 'اسئلة سنوات ميد اونلاين.pdf', 2),
  makeQ('HIST-FIN-001', 'subj-history', finalOf('subj-history'), 'في عهد أي من الخلفاء الراشدين تم جمع القرآن الكريم في مصحف إمام واحد ونُسخ ووزع على الأمصار الإسلامية؟', 'عثمان بن عفان رضي الله عنه', 'أبو بكر الصديق رضي الله عنه', 'علي بن أبي طالب رضي الله عنه', 'عمر بن عبد العزيز رحمه الله', 'a', 'قام ذو النورين عثمان بن عفان رضي الله عنه بجمع القرآن على لغة قريش في مصحف واحد منعاً للاختلاف في القراءات وتوزيعه على عواصم الدولة.', 'Easy', null, 'فاينل خلفاء.pdf', 1),
  makeQ('HIST-FIN-002', 'subj-history', finalOf('subj-history'), 'ما هي المعركة البحرية التاريخية الكبرى التي خاضها الأسطول الإسلامي لأول مرة في عهد الخليفة عثمان بن عفان سنة 35 هـ ضد البيزنطيين؟', 'معركة ذات الصواري', 'معركة اليرموك', 'معركة القادسية', 'معركة نهاوند', 'a', 'معركة ذات الصواري (35 هـ) كانت أول وأشهر معركة بحرية إسلامية انتصر فيها الأسطول الإسلامي بقيادة عبد الله بن أبي السرح على الأسطول البيزنطي.', 'Medium', null, 'فاينل خلفاء.pdf', 2),

  // ==========================================
  // الريادة والابتكار (BUS101) - ARABIC
  // ==========================================
  makeQ('ENTR-MID-001', 'subj-entrepreneur', midOf('subj-entrepreneur'), 'ما هو الفرق الجوهري بين رائد الأعمال (Entrepreneur) والمدير التقليدي (Manager)؟', 'رائد الأعمال يبتكر أفكاراً جديدة ويتحمل المخاطر المحسوبة لتأسيس مشروع، بينما المدير يركز على إدارة العمليات القائمة بكفاءة', 'المدير هو من يمتلك رأس المال فقط', 'رائد الأعمال لا يحتاج إلى تخطيط أو دراسات جدوى', 'المدير يتحمل جميع الخسائر المالية الشخصية دون المشروع', 'a', 'الريادة ترتكز على الابتكار، واقتناص الفرص، وتحمل المخاطر غير المؤكدة لبناء قيمة جديدة، بينما الإدارة تنظم الموارد القائمة بكفاءة.', 'Easy', null, 'بنك اسئلة مادة ريادة ميد.pdf', 1),
  makeQ('ENTR-MID-002', 'subj-entrepreneur', midOf('subj-entrepreneur'), 'مخطط نموذج العمل التجاري (Business Model Canvas - BMC) يتكون من كم كتلة بناء أساسية؟', '9 كتل أساسية', '5 كتل أساسية', '12 كتلة أساسية', '4 كتل أساسية', 'a', 'نموذج ألكسندر أوستروالدر (BMC) يتكون من 9 عناصر: شرائح العملاء، القيمة المقترحة، القنوات، علاقات العملاء، مصادر الإيرادات، الموارد، الأنشطة، الشراكات، وهيكل التكاليف.', 'Medium', null, 'بنك اسئلة مادة ريادة ميد.pdf', 2),
  makeQ('ENTR-FIN-001', 'subj-entrepreneur', finalOf('subj-entrepreneur'), 'الحق الحصري القانوني الممنوح لمخترع لمنع الآخرين من صنع أو استخدام أو بيع اختراعه لمدة زمنية محددة يسمى:', 'براءة الاختراع (Patent)', 'العلامة التجارية (Trademark)', 'حق المؤلف (Copyright)', 'السر التجاري (Trade Secret)', 'a', 'براءة الاختراع هي وثيقة حماية ملكية صناعية رسمية تمنح للمخترع حقاً استئثارياً لمدة غالباً 20 عاماً مقابل الكشف عن الاختراع.', 'Easy', null, 'سنوات_ريادة_محلولة.pdf', 1),
  makeQ('ENTR-FIN-002', 'subj-entrepreneur', finalOf('subj-entrepreneur'), 'المصطلح الذي يشير إلى أدنى نموذج لمنتج يحتوي على الخصائص الأساسية التي تسمح بجمعه لاختبار ردود فعل العملاء الحقيقيين وتطويره يسمى:', 'المنتج الأولي القابل للتطبيق (MVP)', 'المنتج التجاري الكامل', 'دراسة السوق المكتملة', 'العينة التسويقية الترويجية', 'a', 'MVP (Minimum Viable Product) هو نموذج أولي يضم الخصائص الأساسية لاختبار فرضيات السوق بأقل جهد وتكلفة.', 'Medium', null, 'سنوات_ريادة_محلولة.pdf', 2),

  // ==========================================
  // المشاغل الهندسية (ENG101) - ARABIC
  // ==========================================
  makeQ('WORK-MID-001', 'subj-workshops', midOf('subj-workshops'), 'في مشغل التمديدات الكهربائية، ما هو الغرض الأساسي من استخدام سلك التأريض (Ground Wire) في الدوائر والأجهزة الكهربائية؟', 'حماية الأشخاص من خطر الصعق الكهربائي بتفريغ تيارات التسريب إلى الأرض', 'زيادة سرعة دوران المحركات', 'تقليل استهلاك الفاتورة الكهربائية', 'تغذية الأجهزة بالجهد المستمر DC', 'a', 'سلك التأريض يربط الهياكل المعدنية بالأرض، مما يوفر مساراً آمناً لتيار العطل يفعّل القواطع ويمنع تعرض الإنسان لصدمة كهربائية مميتة.', 'Easy', null, 'سنوات مشاغل1  (1).pdf', 1),
  makeQ('WORK-MID-002', 'subj-workshops', midOf('subj-workshops'), 'أهم وسيلة وقاية شخصية يجب ارتداؤها بشكل إلزامي في جميع المشاغل والورش الهندسية لحماية القدمين من سقوط الأجسام الحادة والثقيلة هي:', 'حذاء السلامة الصناعي ذو المقدمة الفولاذية (Safety Shoes)', 'حذاء رياضي قماشي مريح', 'غطاء بلاستيكي خفيف', 'أحذية مطاطية عادية', 'a', 'أحذية السلامة الصناعية مزودة بنعل مقاوم للثقب ومقدمة فولاذية لحماية أصابع القدم من الصدمات وسقوط القطع الميكانيكية الثقيلة.', 'Easy', null, 'سنوات مشاغل1  (1).pdf', 2),
  makeQ('WORK-FIN-001', 'subj-workshops', finalOf('subj-workshops'), 'في مشغل اللحام، ما هو نوع الغازين المستخدمين في عملية اللحام بالغاز (لحام الأكسي-أسيتيلين) لإنتاج لهب حراري مرتفع؟', 'غاز الأكسجين وغاز الأسيتيلين', 'غاز النيتروجين وغاز الهيدروجين', 'غاز ثاني أكسيد الكربون وغاز الميثان', 'غاز الهيليوم والأرجون فقط', 'a', 'ينتج لهب الأكسي-أسيتيلين من احتراق الأسيتيلين (C₂H₂) مع الأكسجين النقي (O₂)، مما يولد حرارة تفوق 3100 درجة مئوية تكفي لصهر المعادن.', 'Medium', null, 'سنوات مشاغل3.pdf', 1),
  makeQ('WORK-FIN-002', 'subj-workshops', finalOf('subj-workshops'), 'الماكينة الميكانيكية المستخدمة في المشاغل الهندسية لتشغيل القطع المعدنية الأسطوانية وتدويرها ضد قلم القطع الثابت تسمى:', 'ماكينة المخرطة (Lathe Machine)', 'ماكينة الفرازة (Milling Machine)', 'المثقاب الكهربائي الثابت', 'ماكينة الجلخ القرصية', 'a', 'المخرطة هي الآلة الأساسية لإنتاج وتشكيل السطوح الأسطوانية والمخروطية واللولبة عن طريق تدوير المشغولة وتغذية أداة القطع خطياً.', 'Easy', null, 'سنوات مشاغل3.pdf', 2),

  // ==========================================
  // ENGLISH COMMUNICATION 1 (ENG101) - ENGLISH
  // ==========================================
  makeQ('ENG1-MID-001', 'subj-eng1', midOf('subj-eng1'), 'Choose the grammatically correct sentence that observes subject-verb agreement:', 'Neither the professor nor the students were in the laboratory.', 'Neither the professor nor the students was in the laboratory.', 'Neither the professor nor the students is in the laboratory.', 'Neither the professor or the students has been in the lab.', 'a', 'When subjects are joined by "neither... nor", the verb agrees with the closer subject ("students", which is plural, taking "were").', 'Easy', null, 'اسئلة .pdf', 1),
  makeQ('ENG1-MID-002', 'subj-eng1', midOf('subj-eng1'), 'Identify the passive voice transformation of: "The engineer inspected the transmission towers yesterday."', 'The transmission towers were inspected by the engineer yesterday.', 'The transmission towers was inspected yesterday by the engineer.', 'The engineer was inspecting the transmission towers yesterday.', 'The transmission towers have been inspected by the engineer.', 'a', 'Past simple passive voice follows: Object + was/were + past participle (inspected) + by agent.', 'Easy', null, 'اسئلة .pdf', 2),
  makeQ('ENG1-FIN-001', 'subj-eng1', finalOf('subj-eng1'), 'Which sentence contains a dangling modifier that needs correction?', 'Walking into the server room, the temperature felt freezing.', 'Walking into the server room, the technician felt freezing.', 'The technician felt the freezing temperature upon entering the server room.', 'As the technician entered the room, it felt freezing.', 'a', 'In option A, the participial phrase "Walking into the server room" illogically modifies "the temperature" instead of the human subject.', 'Medium', null, 'اسئلة .pdf', 1),
  makeQ('ENG1-FIN-002', 'subj-eng1', finalOf('subj-eng1'), 'What is the primary function of a "Topic Sentence" in an academic paragraph?', 'It states the central controlling idea of the paragraph that all supporting sentences elaborate on.', 'It provides a concluding citation.', 'It lists transitional coordinating conjunctions.', 'It defines all technical jargon.', 'a', 'The topic sentence explicitly states the main point or governing idea developed by the subsequent supporting evidence.', 'Easy', null, 'اسئلة .pdf', 2),

  // ==========================================
  // ENGLISH COMMUNICATION 2 (ENG102) - ENGLISH
  // ==========================================
  makeQ('ENG2-MID-001', 'subj-eng2', midOf('subj-eng2'), 'Which transitional phrase is best suited to introduce a contrasting academic perspective?', 'On the contrary / However', 'Furthermore / In addition', 'Consequently / Therefore', 'Similarly / Likewise', 'a', '"However" and "On the other hand" signal contrast or counter-argument between viewpoints.', 'Easy', null, '__تجميع كويزات 2024_.pdf', 1),
  makeQ('ENG2-MID-002', 'subj-eng2', midOf('subj-eng2'), 'What constitutes "Plagiarism" in scholarly and academic writing?', 'Using another author\'s ideas, words, or data without proper citation or acknowledgment.', 'Writing a comprehensive bibliography in APA format.', 'Paraphrasing text using proper citations.', 'Synthesizing ideas from multiple peer-reviewed papers.', 'a', 'Plagiarism is presenting someone else\'s intellectual work or words as your own without adequate attribution.', 'Easy', null, '__تجميع كويزات 2024_.pdf', 2),
  makeQ('ENG2-FIN-001', 'subj-eng2', finalOf('subj-eng2'), 'In a formal argumentative essay, the "Counter-argument" section serves to:', 'Acknowledge an opposing viewpoint and provide evidence to refute or concede it, strengthening overall credibility.', 'Contradict the author\'s main thesis statement completely.', 'List unrelated background history.', 'Repeat the abstract in simpler words.', 'a', 'Addressing counter-arguments demonstrates thoroughness, objectivity, and directly reinforces the paper\'s thesis through effective rebuttal.', 'Medium', null, '__فاينال انجليزي 102.pdf_.pdf', 1),
  makeQ('ENG2-FIN-002', 'subj-eng2', finalOf('subj-eng2'), 'Which style of language is inappropriate in formal engineering research papers?', 'Colloquial slang and informal contractions (e.g., "don\'t", "gonna", "cool stuff")', 'Objective third-person point of view', 'Precise quantitative measurements with SI units', 'Standard technical terminology and clear diagrams', 'a', 'Academic writing strictly avoids casual idioms, personal emotional appeals, and contractions.', 'Easy', null, '__فاينال انجليزي 102.pdf_.pdf', 2),

  // ==========================================
  // TECHNICAL WRITING (ENG201) - ENGLISH
  // ==========================================
  makeQ('TECH-MID-001', 'subj-techwrite', midOf('subj-techwrite'), 'In an engineering project report, what is the primary purpose of the "Executive Summary"?', 'To provide a concise overview of the problem, methodology, key findings, and recommendations for decision-makers.', 'To list the names and phone numbers of the team members.', 'To display raw oscilloscope waveforms.', 'To acknowledge financial sponsors.', 'a', 'An executive summary provides busy managers with a standalone synopsis of objectives, results, and critical decisions.', 'Easy', null, 'سنوات.pdf', 1),
  makeQ('TECH-MID-002', 'subj-techwrite', midOf('subj-techwrite'), 'What is the correct convention for labeling figures and tables in formal IEEE engineering documents?', 'Figure captions placed below figures; Table captions placed above tables.', 'Figure captions placed above; Table captions below.', 'Captions placed only in the appendix.', 'No captions needed if discussed in body text.', 'a', 'Standard IEEE and technical formatting rules place Table titles above the table, and Figure captions beneath the figure.', 'Medium', null, 'سنوات.pdf', 2),
  makeQ('TECH-FIN-001', 'subj-techwrite', finalOf('subj-techwrite'), 'Which section of a technical report describes the step-by-step procedures, equipment models, and experimental setups used?', 'Methodology / Experimental Setup', 'Literature Review', 'Conclusions and Recommendations', 'Abstract', 'a', 'The Methodology details instruments, protocols, and designs to ensure results are replicable by other engineers.', 'Easy', null, 'فاينل محلول.pdf', 1),
  makeQ('TECH-FIN-002', 'subj-techwrite', finalOf('subj-techwrite'), 'In professional technical correspondence (such as engineering emails), the subject line should be:', 'Clear, specific, and informative regarding the email purpose and action required', 'Left blank to create suspense', 'A single generic word like "Hello" or "Help"', 'All uppercase with exclamation marks', 'a', 'Professional communication requires concise, informative subject lines (e.g. "Project Alpha: PCB Revision 2 Review Request").', 'Easy', null, 'فاينل محلول.pdf', 2),

  // ==========================================
  // ENGINEERING ECONOMICS (ECON101) - ENGLISH
  // ==========================================
  makeQ('ECON-MID-001', 'subj-econ', midOf('subj-econ'), 'If $1,000 is invested today at an annual compound interest rate of 10%, what is its future worth (F) at the end of 2 years?', '$1,210', '$1,200', '$1,100', '$1,331', 'a', 'Using F = P(1 + i)^n: F = 1000 * (1 + 0.10)² = 1000 * 1.21 = $1,210.', 'Easy', null, 'اقتصاد/سنوات.pdf', 1),
  makeQ('ECON-MID-002', 'subj-econ', midOf('subj-econ'), 'The concept that a specific sum of money received today has a greater purchasing power and value than the same sum in the future is known as:', 'The Time Value of Money (TVM)', 'The Sunk Cost Fallacy', 'The Depreciation Allowance', 'The Break-even Threshold', 'a', 'The Time Value of Money is the cornerstone of engineering economics, reflecting earning capacity and inflation over time.', 'Easy', null, 'اقتصاد/سنوات.pdf', 2),
  makeQ('ECON-FIN-001', 'subj-econ', finalOf('subj-econ'), 'In capital budgeting, the Internal Rate of Return (IRR) is defined as the discount rate at which:', 'The Net Present Value (NPV) of the project cash flows equals exactly zero', 'The Benefit-Cost ratio equals zero', 'The total future value is doubled', 'The payback period equals one fiscal year', 'a', 'The IRR is the exact discount interest rate that equates the present value of cash inflows to initial investment outflows (NPV = 0).', 'Medium', null, 'اقتصاد/فاينل.pdf', 1),
  makeQ('ECON-FIN-002', 'subj-econ', finalOf('subj-econ'), 'A machine with initial cost $50,000 has an estimated salvage value of $10,000 after 5 years. Using Straight-Line depreciation, what is the annual depreciation charge?', '$8,000 per year', '$10,000 per year', '$12,000 per year', '$5,000 per year', 'a', 'Annual Straight-Line depreciation = (Initial Cost - Salvage Value) / Useful Life = ($50,000 - $10,000) / 5 = $40,000 / 5 = $8,000/year.', 'Easy', null, 'اقتصاد/فاينل.pdf', 2),

  // --- أسئلة إضافية: ثقافة إسلامية (ARABIC) ---
  makeQ('CULT-MID-003', 'subj-culture', midOf('subj-culture'), 'ما هما الشرطان الأساسيان المتفق عليهما شرعاً لقبول أي عمل صالح عند الله تعالى؟', 'إخلاص النية لله تعالى ومتابعة هدي وسنة النبي صلى الله عليه وسلم', 'كثرة العمل والجهد المبذول فقط', 'معرفة الناس وثناؤهم على العمل', 'أداؤه في المسجد حصراً', 'a', 'يشترط لقبول العمل عند الله شرطان لا ينفصلان: الإخلاص لله وحده، وموافقة العمل لما جاء في سنة رسول الله صلى الله عليه وسلم.', 'Easy', null, 'أسئلة_الثقافة_الإسلامية ميد.pdf', 2),
  makeQ('CULT-FIN-003', 'subj-culture', finalOf('subj-culture'), 'كم عدد أركان الإيمان الستة المقررة في حديث جبريل المشهور؟', 'ستة أركان (الإيمان بالله وملائكته وكتبه ورسله واليوم الآخر والقدر خيره وشره)', 'خمسة أركان', 'أربعة أركان', 'سبعة أركان', 'a', 'أركان الإيمان الستة هي: الإيمان بالله، وملائكته، وكتبه، ورسله، واليوم الآخر، والقدر خيره وشره.', 'Easy', null, 'فاينل ثقافه حموده جديد 2025.pdf', 2),

  // --- أسئلة إضافية: التربية الوطنية (ARABIC) ---
  makeQ('NAT-MID-003', 'subj-national', midOf('subj-national'), 'يضمن الدستور الأردني حرية التعبير عن الرأي والبحث العلمي وفق أي ضابط أساسي؟', 'ضمن حدود القانون وبما لا يخالف النظام والآداب العامة أو يمس حقوق الآخرين', 'دون أي ضوابط قانونية أو قضائية إطلاقاً', 'لأصحاب المناصب الرسمية فقط', 'في الأوقات غير الانتخابية فقط', 'a', 'تنص المادة (15) من الدستور على أن تكفل الدولة حرية الرأي والتعبير لكل أردني بالقول أو الكتابة ضمن حدود القانون.', 'Easy', null, 'Mid 2025.pdf', 2),
  makeQ('NAT-FIN-003', 'subj-national', finalOf('subj-national'), 'ما هي الهيئة المستقلة التي أنشئت في الأردن بموجب التعديلات الدستورية لإدارة العمليات الانتخابية والنيابية والإشراف عليها؟', 'الهيئة المستقلة للانتخاب', 'وزارة الداخلية', 'ديوان الرقابة والتفتيش', 'محكمة أمن الدولة', 'a', 'أُنشئت الهيئة المستقلة للانتخاب عام 2012 كجهة دستورية مستقلة لضمان نزاهة وشفافية الانتخابات النيابية والبلدية.', 'Easy', null, 'فاينل 2025 حموده.pdf', 2),

  // --- أسئلة إضافية: العلوم العسكرية (ARABIC) ---
  makeQ('MIL-MID-003', 'subj-military', midOf('subj-military'), 'شارك اللواء المدرع الأربعين الأردني (لواء الله) ببطولة وشجاعة في الدفاع عن الأراضي العربية على الجبهة السورية في حرب:', 'حرب تشرين التحريرية عام 1973', 'حرب 1948', 'حرب الاستنزاف 1969', 'أزمة السويس 1956', 'a', 'خاض اللواء المدرع الأربعين الأردني معارك ضارية على هضبة الجولان عام 1973 ومنع القوات الإسرائيلية من التقدم نحو دمشق.', 'Medium', null, 'ميد 1.pdf', 2),
  makeQ('MIL-FIN-003', 'subj-military', finalOf('subj-military'), 'ما هو الفرع أو السلاح العسكري في الجيش العربي المسؤول عن الاتصالات ونقل المعلومات وتأمين القيادة والسيطرة وإدارة الحرب الإلكترونية؟', 'سلاح اللاسلكي الملكي (الاتصالات العسكرية)', 'سلاح المدفعية الملكي', 'سلاح الهندسة الملكي', 'سلاح التموين والنقل', 'a', 'سلاح اللاسلكي والاتصالات مسؤول عن تأمين كافة شبكات الاتصال السلكية واللاسلكية والأمن السيبراني العسكري.', 'Easy', null, 'فاينل عسكرية اول 2026 (حموده).pdf', 2),

  // --- أسئلة إضافية: تاريخ الخلفاء والحضارة الإسلامية (ARABIC) ---
  makeQ('HIST-MID-003', 'subj-history', midOf('subj-history'), 'الوثيقة التاريخية الخالدة التي منحها الخليفة عمر بن الخطاب لأهل إيلياء (القدس) عام 15 هـ لضمان أمن كنائسهم وأموالهم وأنفسهم تسمى:', 'العهدة العُمرية', 'وثيقة المدينة', 'صلح الحديبية', 'بيعة الرضوان', 'a', 'العهدة العمرية هي وثيقة الأمان والتسامح الديني التي كتبها الخليفة عمر بن الخطاب لأهل القدس عندما فتحها المسلمون سلماً سنة 15 هـ.', 'Easy', null, 'اسئلة سنوات ميد اونلاين.pdf', 2),
  makeQ('HIST-FIN-003', 'subj-history', finalOf('subj-history'), 'من هو العالم المسلم الموسوعي الذي أسس علم الجبر وألف كتاب "المختصر في حساب الجبر والمقابلة" وتُنسب إليه الخوارزميات (Algorithms)؟', 'محمد بن موسى الخوارزمي', 'الحسن بن الهيثم', 'ابن النفيس', 'أبو بكر الرازي', 'a', 'الخوارزمي هو مؤسس علم الجبر واستخدم النظام العشري والصفر، ومن اسمه اشتُق مصطلح الخوارزميات (Algorithm) في علوم الحاسوب.', 'Easy', null, 'فاينل خلفاء.pdf', 2),

  // --- أسئلة إضافية: الريادة والابتكار (ARABIC) ---
  makeQ('ENTR-MID-003', 'subj-entrepreneur', midOf('subj-entrepreneur'), 'في التحليل الاستراتيجي للمشاريع الريادية المعروف بـ (SWOT Analysis)، يرمز حرفا (S) و (W) إلى العوامل:', 'الداخلية (نقاط القوة Strengths ونقاط الضعف Weaknesses)', 'الخارجية (الفرص والتهديدات)', 'المالية فقط', 'التسويقية التنافسية', 'a', 'يقسم تحليل SWOT البيئة إلى عوامل داخلية (القوة والضعف) خاضعة لسيطرة الشركة، وعوامل خارجية (الفرص والتهديدات) في السوق المحيط.', 'Easy', null, 'بنك اسئلة مادة ريادة ميد.pdf', 2),
  makeQ('ENTR-FIN-003', 'subj-entrepreneur', finalOf('subj-entrepreneur'), 'التمويل الذي يقدمه مستثمرون متخصصون لشركات تكنولوجية ناشئة ذات إمكانات نمو هائلة مقابل حصة ملكية في الشركة يسمى:', 'رأس المال الجريء أو المخاطر (Venture Capital - VC)', 'القروض البنكية التقليدية', 'السندات الحكومية', 'التمويل العقاري', 'a', 'صناديق رأس المال الجريء VC تستثمر في الشركات الناشئة المبتكرة عالية المخاطر ذات القابلية العالية للتوسع السريع.', 'Medium', null, 'سنوات_ريادة_محلولة.pdf', 2),

  // --- أسئلة إضافية: المشاغل الهندسية (ARABIC) ---
  makeQ('WORK-MID-003', 'subj-workshops', midOf('subj-workshops'), 'أي نوع من طفايات الحريق هو الأنسب والأكثر أماناً لإخماد الحرائق الناتجة عن الأجهزة الكهربائية والتمديدات في المشاغل دون التسبب بصعق كهربائي؟', 'طفاية غاز ثاني أكسيد الكربون (CO₂) أو البودرة الجافة', 'طفاية الماء المضغوط', 'طفاية الرغوة المائية', 'استخدام خراطيم المياه المباشرة', 'a', 'يحظر استخدام الماء في الحرائق الكهربائية لأنه موصل للكهرباء؛ وتستخدم طفايات ثاني أكسيد الكربون CO₂ لأنها غاز عازل يخنق اللهب دون ترك رواسب تضر الأجهزة.', 'Easy', null, 'سنوات مشاغل1  (1).pdf', 2),
  makeQ('WORK-FIN-003', 'subj-workshops', finalOf('subj-workshops'), 'أداة القياس اليدوية الدقيقة التي تعتمد على مبدأ اللولب والتدرج وتستخدم لقياس الأقطار الخارجية للأسلاك والصفائح المعدنية بدقة تصل إلى 0.01 ملم تسمى:', 'الميكروميتر (Micrometer)', 'شريط القياس المتري', 'المنقلة الهندسية', 'المسطرة الفولاذية العادية', 'a', 'الميكروميتر أداة قياس دقيقة جداً تصل دقتها إلى 0.01 ملم وأحياناً 0.001 ملم لقياس السماكات والأقطار الصغيرة بدقة فائقة.', 'Easy', null, 'سنوات مشاغل3.pdf', 2)
];

module.exports = { humanitiesQuestions };
