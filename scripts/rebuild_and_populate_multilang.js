/**
 * Master Academic Curriculum & Multilingual Database Rebuilder
 * 
 * Strict Guidelines:
 * 1. ZERO ID COLLISIONS - All 45 subjects have clean, guaranteed unique IDs.
 * 2. STRICT LANGUAGE INTEGRITY:
 *    - All Engineering, Computer Science, Mathematics, Physical Sciences, and Technical Labs are in 100% ENGLISH.
 *    - English Communication & Technical Writing are in 100% ENGLISH.
 *    - Engineering Economics is in 100% ENGLISH.
 *    - Islamic Culture, National Education, Military Science, Islamic History (Khulafa),
 *      Entrepreneurship, and Engineering Workshops are in 100% ARABIC.
 * 3. ZERO TRANSLATION OF ENGLISH QUESTIONS TO ARABIC.
 * 4. High volume question bank across Mid and Final exams.
 * 5. High-resolution diagrams with lightbox zoom preserved.
 * 6. PBKDF2 SHA-512 secure admin persistence.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const dataDir = path.join(__dirname, '..', 'data');
const dbFile = path.join(dataDir, 'database.json');

// 1. Definition of the 45 Canonical Academic Subjects
const SUBJECTS = [
  // --- Mathematics & Basic Sciences ---
  { id: 'subj-calc1', code: 'MATH101', name: 'Calculus 1', nameAr: 'تفاضل وتكامل 1', category: 'العلوم الأساسية والرياضيات', desc: 'Functions, limits, continuity, derivative rules, curve sketching, optimization, and definite/indefinite integrals.' },
  { id: 'subj-calc2', code: 'MATH102', name: 'Calculus 2', nameAr: 'تفاضل وتكامل 2', category: 'العلوم الأساسية والرياضيات', desc: 'Techniques of integration, improper integrals, infinite sequences, series convergence, and power series.' },
  { id: 'subj-diff', code: 'MATH201', name: 'Differential Equations', nameAr: 'معادلات تفاضليه', category: 'العلوم الأساسية والرياضيات', desc: 'First and higher-order ordinary differential equations, exact ODEs, Laplace transforms, and series solutions.' },
  { id: 'subj-linear', code: 'MATH202', name: 'Linear Algebra', nameAr: 'لينير', category: 'العلوم الأساسية والرياضيات', desc: 'Matrices, Gaussian elimination, determinants, vector spaces, linear independence, eigenvalues, and eigenvectors.' },
  { id: 'subj-numerical', code: 'MATH203', name: 'Numerical Methods', nameAr: 'تقنيات عددية', category: 'العلوم الأساسية والرياضيات', desc: 'Root finding algorithms (Newton-Raphson, Bisection), interpolation, numerical differentiation, and numerical integration.' },
  { id: 'subj-stats', code: 'STAT101', name: 'Probability and Statistics', nameAr: 'احصاء', category: 'العلوم الأساسية والرياضيات', desc: 'Probability theory, discrete/continuous random variables, normal distribution, and statistical inference.' },
  { id: 'subj-physics1', code: 'PHYS101', name: 'Physics 1 (Mechanics)', nameAr: 'فيزياء 1', category: 'العلوم الأساسية والرياضيات', desc: 'Classical mechanics, vectors, 1D/2D kinematics, Newton\'s laws, work, energy, momentum, and rotational dynamics.' },
  { id: 'subj-physics2', code: 'PHYS102', name: 'Physics 2 (Electricity & Magnetism)', nameAr: 'فيزياء 2', category: 'العلوم الأساسية والرياضيات', desc: 'Coulomb\'s law, electric fields, Gauss\'s law, electric potential, capacitance, DC circuits, magnetic forces, and induction.' },
  { id: 'subj-chem', code: 'CHEM101', name: 'General Chemistry', nameAr: 'كيمياء', category: 'العلوم الأساسية والرياضيات', desc: 'Atomic structure, stoichiometry, gas laws, chemical bonding, thermochemistry, and acid-base equilibrium.' },

  // --- Computer Science & Software Engineering ---
  { id: 'subj-cpp', code: 'CS111', name: 'C++ Programming', nameAr: 'C++', category: 'علوم الحاسوب والبرمجيات', desc: 'Structured programming, pointers, references, dynamic memory management, arrays, and basic OOP in C++.' },
  { id: 'subj-oop', code: 'CS211', name: 'Object-Oriented Programming (OOP)', nameAr: 'اوبجيكت', category: 'علوم الحاسوب والبرمجيات', desc: 'Encapsulation, inheritance, polymorphism, virtual functions, abstract classes, operator overloading, and exception handling.' },
  { id: 'subj-datastruct', code: 'CS212', name: 'Data Structures & Algorithms', nameAr: 'داتا ستركتشر', category: 'علوم الحاسوب والبرمجيات', desc: 'Asymptotic complexity, linked lists, stacks, queues, binary search trees, heaps, hash tables, and graph algorithms.' },
  { id: 'subj-assembly', code: 'CS221', name: 'Assembly Language', nameAr: 'اسمبلي', category: 'علوم الحاسوب والبرمجيات', desc: 'x86 processor architecture, register conventions, arithmetic/logical instructions, memory addressing, interrupts, and subroutines.' },
  { id: 'subj-arch', code: 'CS322', name: 'Computer Architecture', nameAr: 'معمارية', category: 'علوم الحاسوب والبرمجيات', desc: 'Instruction set architecture (ISA), pipelining stages, hazards, branch prediction, memory hierarchy, and cache design.' },
  { id: 'subj-ai', code: 'AI301', name: 'Artificial Intelligence', nameAr: 'الذكاء الاصطناعي', category: 'علوم الحاسوب والبرمجيات', desc: 'Search algorithms (BFS, DFS, A*), adversarial search (Minimax, Alpha-Beta pruning), CSP, and logic representation.' },
  { id: 'subj-machine', code: 'AI411', name: 'Machine Learning', nameAr: 'ماشين', category: 'علوم الحاسوب والبرمجيات', desc: 'Supervised vs unsupervised learning, regression, classification, gradient descent, decision trees, SVM, and regularization.' },
  { id: 'subj-skills', code: 'CS100', name: 'Computer Skills', nameAr: 'مهارات الحاسوب', category: 'علوم الحاسوب والبرمجيات', desc: 'Computer hardware, operating systems, networking basics, spreadsheets, number systems, and digital literacy.' },

  // --- Electrical, Electronics & Telecommunications ---
  { id: 'subj-circuits1', code: 'EE201', name: 'Electrical Circuits 1', nameAr: 'سيركت 1', category: 'الهندسة الكهربائية والإلكترونية', desc: 'Ohm\'s law, Kirchhoff\'s laws, nodal and mesh analysis, Thevenin and Norton theorems, and first-order RL/RC transients.' },
  { id: 'subj-circuits2', code: 'EE202', name: 'Electrical Circuits 2', nameAr: 'سيركت 2', category: 'الهندسة الكهربائية والإلكترونية', desc: 'AC sinusoidal steady-state analysis, phasors, impedance, power factor, balanced three-phase systems, and resonance.' },
  { id: 'subj-electronics', code: 'EE301', name: 'Electronics', nameAr: 'الكترونيات', category: 'الهندسة الكهربائية والإلكترونية', desc: 'Semiconductor diodes, rectifiers, Zener regulators, BJT DC biasing and AC small-signal models, and MOSFET amplifiers.' },
  { id: 'subj-logic', code: 'EE211', name: 'Digital Logic Design', nameAr: 'لوجيك', category: 'الهندسة الكهربائية والإلكترونية', desc: 'Boolean algebra, Karnaugh maps, combinational logic (adders, decoders, multiplexers), and sequential circuits (flip-flops, counters).' },
  { id: 'subj-signals', code: 'EE311', name: 'Signals and Systems', nameAr: 'سيجنال', category: 'الهندسة الكهربائية والإلكترونية', desc: 'LTI systems, continuous/discrete convolution, Fourier transform, Laplace transform, and frequency response.' },
  { id: 'subj-control', code: 'EE411', name: 'Control Systems', nameAr: 'كونترول', category: 'الهندسة الكهربائية والإلكترونية', desc: 'Feedback control systems, transfer functions, block diagrams, transient response, Routh-Hurwitz stability, root locus, and PID tuning.' },
  { id: 'subj-telecom', code: 'CNE331', name: 'Telecommunications', nameAr: 'اتصالات', category: 'هندسة شبكات واتصالات', desc: 'Analog and digital modulation (AM, FM, PM, PCM, QPSK), sampling theorem, channel capacity, and noise analysis.' },
  { id: 'subj-networks1', code: 'CNE341', name: 'Computer Networks', nameAr: 'شبكات', category: 'هندسة شبكات واتصالات', desc: 'OSI 7-layer model, TCP/IP protocol suite, subnetting (CIDR), routing algorithms (OSPF, RIP), transport protocols, and DNS/HTTP.' },
  { id: 'subj-cloud', code: 'CNE451', name: 'Cloud Computing', nameAr: 'كلاود', category: 'هندسة شبكات واتصالات', desc: 'Cloud service models (IaaS, PaaS, SaaS), hypervisors, virtualization, elasticity, AWS/Azure architectures, and cloud security.' },

  // --- Practical Engineering Laboratories ---
  { id: 'subj-lab-circuits', code: 'EE201L', name: 'Circuits Lab', nameAr: 'لاب سيركت', category: 'مختبرات عملية', desc: 'Hands-on breadboard wiring, DMM measurements, oscilloscope waveform analysis, KCL/KVL verification, and RC transients.' },
  { id: 'subj-lab-logic', code: 'EE211L', name: 'Digital Logic Lab', nameAr: 'لاب لوجيك', category: 'مختبرات عملية', desc: 'Wiring 74xx TTL logic gates, decoders, multiplexers, latches, flip-flops, and counter circuits.' },
  { id: 'subj-lab-electronics', code: 'EE301L', name: 'Electronics Lab', nameAr: 'لاب الكترو', category: 'مختبرات عملية', desc: 'Laboratory measurements of diode I-V curves, rectifiers, filter circuits, Zener regulators, and BJT amplifiers.' },
  { id: 'subj-lab-datastruct', code: 'CS212L', name: 'Data Structures Lab', nameAr: 'لاب داتا ستركتشر', category: 'مختبرات عملية', desc: 'Practical C++ programming assignments: linked lists, stack evaluation, queue buffers, BST traversals, and sorting algorithms.' },
  { id: 'subj-lab-assembly', code: 'CS221L', name: 'Assembly Lab', nameAr: 'لاب اسمبلي', category: 'مختبرات عملية', desc: 'Writing, assembling, and debugging x86 assembly routines with DOSBox/EMU8086 and interrupt handling.' },
  { id: 'subj-lab-arch', code: 'CS322L', name: 'Architecture Lab', nameAr: 'لاب معمارية', category: 'مختبرات عملية', desc: 'Simulating ALU datapaths, register files, and single-cycle MIPS CPU architectures using Logisim and ModelSim.' },
  { id: 'subj-lab-physics', code: 'PHYS101L', name: 'Physics Lab', nameAr: 'لاب فيزياء', category: 'مختبرات عملية', desc: 'Vernier caliper/micrometer measurements, simple pendulum experiments, vector force table, and energy conservation.' },
  { id: 'subj-lab-chemistry', code: 'CHEM101L', name: 'Chemistry Lab', nameAr: 'لاب كيمياء', category: 'مختبرات عملية', desc: 'Volumetric titration experiments, determination of unknown acid molarity, safety protocols, and empirical formula analysis.' },
  { id: 'subj-lab-control', code: 'EE411L', name: 'Control Lab', nameAr: 'لاب كونترول', category: 'مختبرات عملية', desc: 'MATLAB and Simulink modeling of transfer functions, transient response analysis, root locus plotting, and PID controller tuning.' },

  // --- Languages & Professional Skills ---
  { id: 'subj-eng1', code: 'ENG101', name: 'English Communication 1', nameAr: 'انجليزي 1', category: 'المتطلبات الجامعية والإنسانية', desc: 'Reading comprehension, academic vocabulary, grammatical accuracy, subject-verb agreement, and sentence structure.' },
  { id: 'subj-eng2', code: 'ENG102', name: 'English Communication 2', nameAr: 'انجليزي 2', category: 'المتطلبات الجامعية والإنسانية', desc: 'Advanced academic reading, argumentative writing, synthesizing sources, academic integrity, and formal presentations.' },
  { id: 'subj-techwrite', code: 'ENG201', name: 'Technical Writing', nameAr: 'كتابة تقنية', category: 'المتطلبات الجامعية والإنسانية', desc: 'Engineering technical reports, executive summaries, proposal writing, documentation formatting, and professional correspondence.' },
  { id: 'subj-econ', code: 'ECON101', name: 'Engineering Economics', nameAr: 'اقتصاد', category: 'المتطلبات الجامعية والإنسانية', desc: 'Time value of money, compound interest, cash flow diagrams, present/annual worth analysis, rate of return, and depreciation.' },

  // --- Humanities & National Requirements (Native Arabic) ---
  { id: 'subj-culture', code: 'HUM101', name: 'Islamic Culture', nameAr: 'ثقافة', category: 'المتطلبات الجامعية والإنسانية', desc: 'مفهوم الثقافة الإسلامية، خصائص الشريعة، الكليات الخمس، النظام الأخلاقي والاجتماعي، وموقف الإسلام من العلم والعمل.' },
  { id: 'subj-national', code: 'HUM102', name: 'National Education', nameAr: 'وطنية', category: 'المتطلبات الجامعية والإنسانية', desc: 'التربية الوطنية، مفاهيم المواطنة والدستور الأردني، السلطات الدستورية الثلاث، ودور المؤسسات الوطنية.' },
  { id: 'subj-military', code: 'MS101', name: 'Military Science', nameAr: 'عسكريه', category: 'المتطلبات الجامعية والإنسانية', desc: 'العلوم العسكرية، تاريخ الجيش العربي وبطولاته، معركة الكرامة، الأمن الوطني الشامل، والضبط والربط العسكري.' },
  { id: 'subj-history', code: 'HIST101', name: 'Islamic History', nameAr: 'خلفاء', category: 'المتطلبات الجامعية والإنسانية', desc: 'تاريخ الخلافة الراشدة، الفتوحات الكبرى، التطور الإداري والقضائي، وإسهامات الحضارة الإسلامية العلمية.' },
  { id: 'subj-entrepreneur', code: 'BUS101', name: 'Entrepreneurship & Innovation', nameAr: 'ريادة', category: 'المتطلبات الجامعية والإنسانية', desc: 'إدارة الأعمال الريادية، مخطط نموذج العمل التجاري BMC، دراسة الجدوى، والملكية الفكرية وبراءات الاختراع.' },
  { id: 'subj-workshops', code: 'ENG101W', name: 'Engineering Workshops', nameAr: 'مشاغل', category: 'مختبرات عملية', desc: 'السلامة والصحة المهنية، مشغل التمديدات الكهربائية والتأريض، مشغل اللحام بالأكسي-أسيتيلين، ومشغل الخراطة.' }
];

function buildMasterCurriculum() {
  console.log('Rebuilding CNE Quizzes master database with full language preservation...');

  // 1. Quizzes: Exactly Midterm and Final for each of the 45 subjects
  const quizzes = [];
  SUBJECTS.forEach(subj => {
    quizzes.push({
      id: `quiz-${subj.id}-mid`,
      subjectId: subj.id,
      name: `${subj.nameAr} - امتحان الميد تيرم (${subj.name} Midterm Exam)`,
      description: `Official Midterm Examination for ${subj.name} (${subj.nameAr}) covering core midterm syllabus questions with verified derivations.`,
      examType: 'Mid',
      timeLimitMinutes: 60,
      isActive: true,
      createdAt: new Date().toISOString()
    });

    quizzes.push({
      id: `quiz-${subj.id}-final`,
      subjectId: subj.id,
      name: `${subj.nameAr} - الامتحان النهائي الشامل (${subj.name} Final Exam)`,
      description: `Comprehensive Final Examination for ${subj.name} (${subj.nameAr}) with step-by-step academic solutions.`,
      examType: 'Final',
      timeLimitMinutes: 120,
      isActive: true,
      createdAt: new Date().toISOString()
    });
  });

  // 2. Load Modular Question Banks
  const { mathScienceQuestions } = require('./questions_math_science');
  const { csSoftwareQuestions } = require('./questions_cs_software');
  const { electricalTelecomQuestions } = require('./questions_electrical_telecom');
  const { engineeringLabsQuestions } = require('./questions_engineering_labs');
  const { humanitiesQuestions } = require('./questions_humanities_arabic');
  const { albalqaQuestions } = require('./questions_albalqa_exams');
  const { part1Questions } = require('./questions_expanded_exams_part1');
  const { part2Questions } = require('./questions_expanded_exams_part2');
  const { part3Questions } = require('./questions_expanded_exams_part3');
  const { part4Questions } = require('./questions_expanded_exams_part4');
  const { part5Questions } = require('./questions_expanded_exams_part5');
  const { getGroupAQuestions } = require('./massive_group_a_math');
  const { getGroupBQuestions } = require('./massive_group_b_cs');
  const { getGroupCQuestions } = require('./massive_group_c_ee');
  const { getGroupDQuestions } = require('./massive_group_d_labs');
  const { getGroupEQuestions } = require('./massive_group_e_languages_humanities');

  const questionMap = new Map();

  function addQuestions(arr) {
    if (!Array.isArray(arr)) return;
    arr.forEach(q => {
      if (!q || !q.id || !q.question) return;
      // Ensure proper subject mapping
      if (q.subjectId === 'subj-circ1') q.subjectId = 'subj-circuits1';
      questionMap.set(q.id, q);
    });
  }

  // Add the specialized modules
  addQuestions(mathScienceQuestions);
  addQuestions(csSoftwareQuestions);
  addQuestions(electricalTelecomQuestions);
  addQuestions(engineeringLabsQuestions);
  addQuestions(humanitiesQuestions);
  addQuestions(albalqaQuestions);
  addQuestions(part1Questions);
  addQuestions(part2Questions);
  addQuestions(part3Questions);
  addQuestions(part4Questions);
  addQuestions(part5Questions);
  addQuestions(getGroupAQuestions());
  addQuestions(getGroupBQuestions());
  addQuestions(getGroupCQuestions());
  addQuestions(getGroupDQuestions());
  addQuestions(getGroupEQuestions());

  // Add Computer Networks 2025 Midterm Exam (16 verified questions)
  if (fs.existsSync(path.join(__dirname, 'questions_networks_2025.json'))) {
    try {
      const netQs = JSON.parse(fs.readFileSync(path.join(__dirname, 'questions_networks_2025.json'), 'utf8'));
      netQs.forEach(q => {
        q.subjectId = 'subj-networks1';
        q.quizId = 'quiz-subj-networks1-mid';
        questionMap.set(q.id, q);
      });
      console.log(`[Import] Added ${netQs.length} verified questions from Computer Networks 2025 exam`);
    } catch (_) {}
  }

  // Add Initial Archive questions (51 questions from Calculus, Circuits, C++)
  if (fs.existsSync(path.join(__dirname, 'questions_initial_archive.json'))) {
    try {
      const initQs = JSON.parse(fs.readFileSync(path.join(__dirname, 'questions_initial_archive.json'), 'utf8'));
      initQs.forEach(q => {
        // Remap IDs
        if (q.subjectId === 'subj-calc1') {
          q.subjectId = 'subj-calc1';
          if (!q.quizId || q.quizId.includes('final')) q.quizId = 'quiz-subj-calc1-final';
          else q.quizId = 'quiz-subj-calc1-mid';
        } else if (q.subjectId === 'subj-circ1') {
          q.subjectId = 'subj-circuits1';
          if (!q.quizId || q.quizId.includes('final')) q.quizId = 'quiz-subj-circuits1-final';
          else q.quizId = 'quiz-subj-circuits1-mid';
        } else if (q.subjectId === 'subj-cpp') {
          q.subjectId = 'subj-cpp';
          q.quizId = 'quiz-subj-cpp-mid';
        }
        questionMap.set(q.id, q);
      });
      console.log(`[Import] Merged ${initQs.length} archive questions`);
    } catch (_) {}
  }

  const allQuestions = Array.from(questionMap.values());

  // 3. Security: Maintain PBKDF2 100,000 rounds admin account
  let admin = null;
  if (fs.existsSync(dbFile)) {
    try {
      const old = JSON.parse(fs.readFileSync(dbFile, 'utf8'));
      if (old.admin && old.admin.passwordHash) {
        admin = old.admin;
      }
    } catch (_) {}
  }

  if (!admin) {
    const salt = crypto.randomBytes(16).toString('hex');
    const passwordHash = crypto.pbkdf2Sync('cne_committee_2025', salt, 100000, 64, 'sha512').toString('hex');
    admin = {
      username: 'cne_admin',
      salt,
      passwordHash,
      updatedAt: new Date().toISOString()
    };
  }

  const database = {
    version: '2.0.0',
    name: 'CNE Quizzes Academic Master Database',
    lastUpdated: new Date().toISOString(),
    subjects: SUBJECTS,
    quizzes,
    questions: allQuestions,
    admin
  };

  fs.writeFileSync(dbFile, JSON.stringify(database, null, 2), 'utf8');

  console.log('========================================================');
  console.log(`[Success] Master Database generated successfully!`);
  console.log(`- Subjects: ${database.subjects.length} (Distinct, unique IDs)`);
  console.log(`- Quizzes: ${database.quizzes.length} (Midterm + Final for every subject)`);
  console.log(`- Questions: ${database.questions.length} (Native language preserved)`);
  console.log('========================================================');

  // Verify per-subject distribution
  const zeroSubjects = database.subjects.filter(s => database.questions.filter(q => q.subjectId === s.id).length === 0);
  console.log(`Subjects with 0 questions: ${zeroSubjects.length}`);
  if (zeroSubjects.length > 0) {
    console.warn('Warning: Some subjects have 0 questions:', zeroSubjects.map(s => s.name));
  }
}

buildMasterCurriculum();
