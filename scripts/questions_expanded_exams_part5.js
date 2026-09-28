/**
 * Master Academic Question Bank Expansion - Part 5
 * Comprehensive Enrichment: Engineering Labs, Economics, English, CS, and Humanities
 * Transcribed from authentic university exam archives in qu/
 * 
 * Strict Language Integrity:
 * - Technical, Science, Engineering, Economics, Languages: 100% ENGLISH
 * - Humanities & Workshops: 100% ARABIC
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

const part5Questions = [
  // ==========================================
  // ENGLISH COMMUNICATION 1 (qu/انجليزي 1)
  // ==========================================
  makeQ('EXP-ENG1-003', 'subj-eng1', midOf('subj-eng1'),
    'Complete the conditional sentence with the correct grammatical verb form: "If the electrical current exceeds the circuit breaker rating, the switch ________ automatically."',
    'trips',
    'will be tripped',
    'tripped',
    'would trip',
    'a',
    'Type 1 real conditional for general scientific facts and physical consequences: If + Present Simple (exceeds), Main clause + Present Simple (trips) or will + base form.',
    'Easy', null, 'اسئلة .pdf', 1),

  makeQ('EXP-ENG1-004', 'subj-eng1', finalOf('subj-eng1'),
    'Which punctuation mark is correctly used to link two independent clauses that are closely related in thought without a coordinating conjunction?',
    'Semicolon (;)',
    'Comma (,)',
    'Hyphen (-)',
    'Slash (/)',
    'a',
    'A semicolon joins two independent clauses of equal grammatical rank without a coordinating conjunction (for, and, nor, but, or, yet, so), avoiding comma splices.',
    'Easy', null, 'اسئلة .pdf', 2),

  // ==========================================
  // ENGLISH COMMUNICATION 2 (qu/انجليزي 2)
  // ==========================================
  makeQ('EXP-ENG2-003', 'subj-eng2', midOf('subj-eng2'),
    'In academic research writing, what constitutes "Patchwriting"?',
    'Restitching phrases from an original source into one\'s own text with only minor synonym substitutions and grammatical rearrangements without true synthesis',
    'Direct quoting with quotation marks and proper page attribution',
    'Completely original conceptual analysis',
    'Translating a text verbatim into another language',
    'a',
    'Patchwriting is an academic integrity issue where the writer copies source clauses and replaces isolated words rather than digesting and expressing the idea in fresh language.',
    'Medium', null, '__تجميع كويزات 2024_.pdf', 1),

  makeQ('EXP-ENG2-004', 'subj-eng2', finalOf('subj-eng2'),
    'Identify the logical fallacy: "The router failed immediately after the software update was deployed; therefore, the software update must be the direct cause of the hardware power supply failure."',
    'Post hoc ergo propter hoc (False Cause)',
    'Ad Hominem (Personal Attack)',
    'Straw Man',
    'False Dilemma',
    'a',
    'The "post hoc ergo propter hoc" fallacy mistakenly infers that because event B followed event A chronologically, event A must have caused event B without empirical causal linkage.',
    'Medium', null, '__تجميع كويزات 2024_.pdf', 2),

  // ==========================================
  // ENGINEERING ECONOMICS (qu/اقتصاد)
  // ==========================================
  makeQ('EXP-ECN-004', 'subj-econ', midOf('subj-econ'),
    'In engineering decision analysis, past money already expended that cannot be recovered regardless of future course of action is defined as:',
    'Sunk Cost (which must be ignored in future investment decisions)',
    'Opportunity Cost',
    'Marginal Operating Cost',
    'Depreciable Basis',
    'a',
    'A sunk cost is an unrecoverable past expenditure. Economic rationality dictates that future decisions should be evaluated strictly on prospective incremental costs and revenues.',
    'Easy', null, 'Engineering Economics Exam Bank.pdf', 1),

  makeQ('EXP-ECN-005', 'subj-econ', finalOf('subj-econ'),
    'If the nominal annual interest rate is r = 12% compounded monthly (m = 12), what is the Effective Annual Interest Rate (i_e)?',
    'i_e = (1 + 0.12/12)^12 - 1 = (1.01)^12 - 1 ≈ 12.68%',
    'i_e = 12.00%',
    'i_e = 13.50%',
    'i_e = 14.40%',
    'a',
    'Effective annual rate formula: i_e = (1 + r/m)^m - 1 = (1 + 0.12/12)^12 - 1 = (1.01)^12 - 1 = 1.126825 - 1 = 12.68%.',
    'Medium', null, 'Engineering Economics Exam Bank.pdf', 2),

  // ==========================================
  // CIRCUITS LAB (qu/لاب سيركت)
  // ==========================================
  makeQ('EXP-LAB-CIR-004', 'subj-lab-circuits', midOf('subj-lab-circuits'),
    'In an experimental laboratory test of Thevenin\'s Theorem, an open-circuit voltage is measured as Voc = 12.0 V, and the short-circuit current is measured as Isc = 2.4 A. What is the calculated Thevenin resistance (Rth)?',
    'Rth = Voc / Isc = 12.0 V / 2.4 A = 5.0 Ohms',
    'Rth = 12.0 * 2.4 = 28.8 Ohms',
    'Rth = 2.4 / 12.0 = 0.2 Ohms',
    'Rth = 14.4 Ohms',
    'a',
    'Thevenin resistance is experimentally obtained from the linear V-I terminal relation: Rth = Voc / Isc = 12.0 / 2.4 = 5.0 Ohms.',
    'Easy', null, 'اسئلة_سنوات_لاب_سيركت_فاينل_٢٠١٧pdf.pdf', 3),

  // ==========================================
  // DIGITAL LOGIC LAB (qu/لاب لوجيك)
  // ==========================================
  makeQ('EXP-LAB-LOG-004', 'subj-lab-logic', midOf('subj-lab-logic'),
    'When cascading three D-type flip-flops configured as a binary ripple counter, if the input clock frequency is 80 kHz, what is the output frequency at the third stage (Q2)?',
    '10 kHz (divided by 2^3 = 8)',
    '40 kHz',
    '20 kHz',
    '80 kHz',
    'a',
    'Each flip-flop divides the frequency by 2. For 3 cascaded stages: f_out = f_in / (2^3) = 80 kHz / 8 = 10 kHz.',
    'Easy', null, 'Final Lab Logic #3.pdf', 1),

  // ==========================================
  // ELECTRONICS LAB (qu/لاب الكترو)
  // ==========================================
  makeQ('EXP-LAB-ELC-003', 'subj-lab-electronics', midOf('subj-lab-electronics'),
    'In a full-wave bridge rectifier using four 1N4007 Silicon diodes connected to a secondary AC transformer voltage of Vrms = 12 V, what is the approximate peak DC output voltage across the load filter capacitor?',
    'Vpeak_out ≈ Vm - 2*Vd = (12 * 1.414) - 2*(0.7) = 16.97 - 1.40 ≈ 15.57 V',
    '12.00 V',
    '16.97 V',
    '10.60 V',
    'a',
    'Peak secondary voltage Vm = sqrt(2) * Vrms = 1.414 * 12 = 16.97 V. In a bridge rectifier, two diodes conduct simultaneously in each half cycle: Vpeak_out = Vm - 2*Vd = 16.97 - 1.4 = 15.57 V.',
    'Medium', null, 'Final lab Electro.pdf', 3),

  // ==========================================
  // DATA STRUCTURES LAB (qu/لاب داتا ستركتشر)
  // ==========================================
  makeQ('EXP-LAB-DS-003', 'subj-lab-datastruct', midOf('subj-lab-datastruct'),
    'In implementing Breadth-First Search (BFS) / Level-Order traversal of a Binary Search Tree in C++, which auxiliary data structure is fundamentally required?',
    'Queue (FIFO)',
    'Stack (LIFO)',
    'Priority Heap',
    'Bidirectional Deque',
    'a',
    'Level-order tree traversal visits nodes level by level from left to right, which requires a FIFO Queue to enqueue child nodes and dequeue them in arrival order.',
    'Easy', null, 'FINAL ALGORITHMS.pdf', 2),

  // ==========================================
  // ASSEMBLY LAB (qu/لاب اسمبلي)
  // ==========================================
  makeQ('EXP-LAB-ASM-003', 'subj-lab-assembly', midOf('subj-lab-assembly'),
    'When nesting two loops in x86 assembly where both use the CX register as a loop counter, how should the outer loop counter be preserved during inner loop execution?',
    'PUSH CX before starting the inner loop, and POP CX immediately after the inner loop terminates',
    'Set CX = 0 inside the inner loop',
    'Increment DX instead',
    'Copy CX into the code segment register CS',
    'a',
    'Since the LOOP instruction automatically decrements CX, nesting loops requires saving the outer loop CX onto the runtime stack using PUSH CX, and restoring it with POP CX after the inner loop finishes.',
    'Easy', null, 'Final Lab Assembly 2023.pdf', 2),

  // ==========================================
  // ARCHITECTURE LAB (qu/لاب معمارية)
  // ==========================================
  makeQ('EXP-LAB-ARC-003', 'subj-lab-arch', midOf('subj-lab-arch'),
    'In a pipelined MIPS processor datapath simulation, what is the function of the Hazard Detection Unit when a "Load-Use Data Hazard" occurs?',
    'It inserts a pipeline stall (bubble/NOP) by disabling PC and IF/ID write, and clearing control signals in the ID/EX register',
    'It doubles the ALU clock speed',
    'It permanently branches to address 0x0000',
    'It writes unverified data to the memory buffer',
    'a',
    'When an instruction tries to read a register immediately loaded by the preceding lw instruction, forwarding cannot solve it in time. The Hazard Detection Unit stalls the pipeline for 1 clock cycle by inserting a bubble.',
    'Medium', null, 'Final.pdf', 1),

  // ==========================================
  // PHYSICS LAB (qu/لاب فيزياء)
  // ==========================================
  makeQ('EXP-LAB-PHY-003', 'subj-lab-physics', midOf('subj-lab-physics'),
    'In an electrical resistivity laboratory experiment, a wire of length L = 2.0 m, cross-sectional area A = 1.0 x 10^-6 m^2, has measured resistance R = 3.4 Ohms. What is the wire material resistivity (rho)?',
    'rho = R * A / L = 3.4 * (1.0 x 10^-6) / 2.0 = 1.7 x 10^-6 Ohm.m',
    '3.4 x 10^-6 Ohm.m',
    '6.8 x 10^-6 Ohm.m',
    '0.85 x 10^-6 Ohm.m',
    'a',
    'From resistance formula R = rho * L / A => rho = R * A / L = 3.4 * (1.0e-6) / 2.0 = 1.7 x 10^-6 Ohm.m.',
    'Easy', null, 'Final Lab Physics.pdf', 2),

  // ==========================================
  // CHEMISTRY LAB (qu/لاب كيمياء)
  // ==========================================
  makeQ('EXP-LAB-CHM-003', 'subj-lab-chemistry', midOf('subj-lab-chemistry'),
    'What is the fundamental laboratory safety rule when preparing a diluted solution of concentrated sulfuric acid (H2SO4) in water?',
    'ALWAYS add ACID slowly to WATER with continuous stirring, NEVER add water to concentrated acid',
    'Add water rapidly into the acid container',
    'Boil the acid before mixing with water',
    'Mix both liquids in equal volumes simultaneously in a sealed flask',
    'a',
    'The dissolution of concentrated sulfuric acid in water is violently exothermic. Adding water to concentrated acid causes localized boiling and violent acid splattering; adding acid slowly to a large volume of water dissipates heat safely.',
    'Easy', null, 'Chemical Lab ( Mid ).pdf', 2),

  // ==========================================
  // CONTROL LAB (qu/لاب كونترول)
  // ==========================================
  makeQ('EXP-LAB-CTL-003', 'subj-lab-control', midOf('subj-lab-control'),
    'In the Ziegler-Nichols closed-loop PID tuning method, the integral and derivative gains are set to zero while proportional gain Kp is increased until the system exhibits:',
    'Sustained, continuous marginal oscillations with constant amplitude at critical gain Kcr',
    'Exponential divergence to infinity',
    'Zero steady-state error with critical damping',
    'Negative phase margin with overdamping',
    'a',
    'The Ziegler-Nichols closed-loop test increases Kp until the closed-loop system reaches the boundary of stability, exhibiting sustained harmonic oscillations at critical gain Kcr and ultimate oscillation period Pcr.',
    'Medium', null, 'Control Lab Final 2024-2025 (1).pdf', 2),

  // ==========================================
  // ISLAMIC CULTURE (qu/ثقافة) - ARABIC
  // ==========================================
  makeQ('EXP-CUL-005', 'subj-culture', midOf('subj-culture'),
    'من خصائص ومميزات الثقافة الإسلامية أنها تمتاز بـ "التوازن والوسطية"، والمقصود بذلك:',
    'الموازنة الدقيقة والتكامل بين مطالب الروح ومطالب الجسد، وبين مصالح الفرد وحقوق المجتمع، دون إفراط أو تفريط',
    'الاهتمام بالجانب الروحي التعبدي وإهمال عمارة الأرض والصناعة',
    'تقديم الماديات المحضة على الأخلاق والقيم',
    'الانعزال التام عن مجريات الحضارة الإنسانية',
    'a',
    'الإسلام دين الفطرة والوسطية: (وَابْتَغِ فِيمَا آتَاكَ اللَّهُ الدَّارَ الْآخِرَةَ وَلَا تَنسَ نَصِيبَكَ مِنَ الدُّنْيَا)، يوازن بين الدنيا والآخرة والروح والجسد.',
    'Easy', null, 'أسئلة_الثقافة_الإسلامية ميد.pdf', 3),

  // ==========================================
  // NATIONAL EDUCATION (qu/وطنية) - ARABIC
  // ==========================================
  makeQ('EXP-NAT-005', 'subj-national', midOf('subj-national'),
    'في أي عام نالت المملكة الأردنية الهاشمية استقلالها التام والاعتراف الدولي بإنهاء الانتداب البريطاني وإعلان الملك عبد الله الأول ملكاً دستورياً على الأردن؟',
    '25 أيار 1946م',
    '11 نيسان 1921م',
    '21 آذار 1968م',
    '15 أيار 1948م',
    'a',
    'أعلن المجلس التشريعي الأردني في 25 أيار 1946م استقلال المملكة الأردنية الهاشمية بصفتها دولة ذات سيادة تامة، ويحتفل به الأردنيون عيداً للاستقلال.',
    'Easy', null, 'Mid 2025.pdf', 3),

  // ==========================================
  // MILITARY SCIENCE (qu/عسكريه) - ARABIC
  // ==========================================
  makeQ('EXP-MIL-005', 'subj-military', midOf('subj-military'),
    'يشمل مفهوم "الأمن الوطني الشامل" في العلوم العسكرية والاستراتيجية الحديثة حماية الدولة من خلال:',
    'تأمين الحماية المتكاملة في المجالات العسكرية والسياسية والاقتصادية والاجتماعية والبيئية والسيبرانية',
    'بناء التحصينات والخنادق العسكرية على الحدود الجغرافية فقط',
    'زيادة عدد المشاة دون تسليح حديث',
    'حصر الأمن في حفظ الأمن الداخلي الشرطي فقط',
    'a',
    'الأمن الوطني الشامل هو قدرة الدولة على حماية كيانها ومصالحها الحيوية ومواطنيها من كافة التهديدات العسكرية والاقتصادية والسيبرانية والمجتمعية.',
    'Easy', null, 'تست بانك عسكرية شامل.pdf', 4),

  // ==========================================
  // ISLAMIC HISTORY / KHULAFA (qu/خلفاء) - ARABIC
  // ==========================================
  makeQ('EXP-HIS-004', 'subj-history', midOf('subj-history'),
    'في عهد أي من الخلفاء الراشدين تم استحداث "التقويم الهجري" وجعل هجرة النبي ﷺ بداية للتاريخ الإسلامي، وأُنشئت الدواوين (مثل ديوان الجند وديوان الخراج)؟',
    'الخليفة الثاني عمر بن الخطاب رضي الله عنه',
    'الخليفة الأول أبو بكر الصديق رضي الله عنه',
    'الخليفة الثالث عثمان بن عفان رضي الله عنه',
    'الخليفة الرابع علي بن أبي طالب رضي الله عنه',
    'a',
    'يعتبر عمر بن الخطاب رضي الله عنه المؤسس الإداري للدولة الراشدة؛ حيث وضع التقويم الهجري وأنشأ الدواوين ونظام العسس والبريد ونظم المدن والأمصار الإسلامية.',
    'Easy', null, 'اسئلة سنوات ميد اونلاين.pdf', 3),

  // ==========================================
  // ENTREPRENEURSHIP (qu/ريادة) - ARABIC
  // ==========================================
  makeQ('EXP-ENT-004', 'subj-entrepreneur', midOf('subj-entrepreneur'),
    'ما هي "القيمة المقترحة" (Value Proposition) في مخطط نموذج العمل التجاري (BMC)؟',
    'حزمة المنتجات أو الخدمات الفريدة والمزايا التنافسية التي تقدمها المنشأة لحل مشاكل شريحة معينة من العملاء وتلبية احتياجاتهم',
    'مجموع الأموال المودعة في الحساب البنكي للشركة',
    'تكلفة الحملات الإعلانية في وسائل التواصل الاجتماعي',
    'قيمة الضرائب المفروضة على أرباح المشروع',
    'a',
    'القيمة المقترحة هي الركيزة الجوهرية للنموذج، وتعبر عن السبب الذي يدفع العميل لاختيار هذا المنتج أو الخدمة دون غيرها من حلول المنافسين.',
    'Easy', null, 'اسئلة مراجعه لمادة الرياده(فاينل).pdf', 3),

  // ==========================================
  // ENGINEERING WORKSHOPS (qu/مشاغل) - ARABIC
  // ==========================================
  makeQ('EXP-WKS-004', 'subj-workshops', midOf('subj-workshops'),
    'في مشغل النجارة والتشغيل الميكانيكي، ما هي أقصى قاعدة سلامة جوهرية يجب الالتزام بها عند الوقوف أمام مخرطة المعادن (Lathe Machine) الدوارة؟',
    'ارتداء نظارات الأمان الواقية، وخلع ربطات العنق والساعات، وعدم ارتداء قفازات أو ملابس فضفاضة لتجنب الاشتباك بأجزاء المخرطة الدوارة',
    'ارتداء قفازات صوفية سميكة جداً لحماية اليدين',
    'تشغيل الآلة بأقصى سرعة دورانية ممكنة دائماً',
    'إيقاف الآلة باليد مباشرة عند اكتمال الخراطة',
    'a',
    'القفازات والملابس الفضفاضة والسلاسل تشكل خطراً بالغاً على السلامة لاحتمال اشتباكها بعمود المخرطة الدوار (Spindle) وسحب العامل نحو الآلة.',
    'Easy', null, 'سنوات مشاغل3.pdf', 1)
];

module.exports = { part5Questions };
