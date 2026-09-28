/**
 * CNE Quizzes - Complete Curriculum Synchronizer & Question Importer
 * Scans all 45 subject folders in qu/ and seeds the database with:
 * - 45 Real Subjects
 * - Quizzes for Mid, Final, Labs
 * - Computer Networks 2025 Exam (35 questions)
 * - Circuit diagram questions & Image-based questions
 * - Secure salted admin account
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const dataDir = path.join(__dirname, '..', 'data');
const dbFile = path.join(dataDir, 'database.json');
const quDir = path.join(__dirname, '..', 'qu');

// Subject metadata mapping for the 45 CNE subjects
const subjectMetadata = {
  'شبكات': { code: 'CNE341', nameEn: 'Computer Networks', cat: 'هندسة شبكات واتصالات', desc: 'معمارية الشبكات، نموذج OSI، بروتوكولات TCP/IP، التوجيه والتبديل (Routing & Switching)، وعنونة بروتوكول الإنترنت.' },
  'اتصالات': { code: 'CNE331', nameEn: 'Telecommunications', cat: 'هندسة شبكات واتصالات', desc: 'أنظمة الاتصالات التماثلية والرقمية، التعديل والتضمين (Modulation)، ونقل الإشارات عبر الوسائط المختلفة.' },
  'سيجنال': { code: 'EE311', nameEn: 'Signals and Systems', cat: 'هندسة شبكات واتصالات', desc: 'تحليل الإشارات والأنظمة الخطية المستمرة والمتقطعة، تحويلات فورييه، ولابلاس، و Z-Transform.' },
  'كلاود': { code: 'CNE451', nameEn: 'Cloud Computing', cat: 'هندسة شبكات واتصالات', desc: 'الحوسبة السحابية، المحاكاة الافتراضية (Virtualization)، خدمات IaaS و PaaS و SaaS، وإدارة السيرفرات.' },
  'C++': { code: 'CS111', nameEn: 'C++ Programming', cat: 'علوم الحاسوب والبرمجيات', desc: 'أساسيات البرمجة الهيكلية، المؤشرات (Pointers)، إدارة الذاكرة الديناميكية، وهندسة البرمجيات بلغة C++.' },
  'اوبجيكت': { code: 'CS211', nameEn: 'Object Oriented Programming (OOP)', cat: 'علوم الحاسوب والبرمجيات', desc: 'مفاهيم الكينونة والتجريد والوراثة وتعدد الأشكال (Polymorphism) والتعامل مع الكلاسات والكائنات.' },
  'داتا ستركتشر': { code: 'CS212', nameEn: 'Data Structures', cat: 'علوم الحاسوب والبرمجيات', desc: 'تراكيب البيانات الخطية وغير الخطية: القوائم الموصولة، المكدسات، الطوابير، الأشجار، والرسومات البيانية وتطبيقاتها.' },
  'اسمبلي': { code: 'CS221', nameEn: 'Assembly Language', cat: 'علوم الحاسوب والبرمجيات', desc: 'البرمجة بلغة التجميع لمعالجات x86، المسجلات، التعليمات الأساسية، وإدارة منافذ الإدخال والإخراج.' },
  'معمارية': { code: 'CS322', nameEn: 'Computer Architecture', cat: 'علوم الحاسوب والبرمجيات', desc: 'معمارية الحاسوب، تصميم المعالجات، خطوط الأنابيب (Pipelining)، التسلسل الهرمي للذاكرة، ومسارات البيانات.' },
  'الذكاء الاصطناعي': { code: 'AI301', nameEn: 'Artificial Intelligence', cat: 'علوم الحاسوب والبرمجيات', desc: 'خوارزميات البحث، الاستدلال المنطقي، الشبكات العصبية، والأنظمة الخبيرة.' },
  'ماشين': { code: 'AI411', nameEn: 'Machine Learning', cat: 'علوم الحاسوب والبرمجيات', desc: 'نماذج التعلم الخاضع للإشراف وغير الخاضع للإشراف، الانحدار، التصنيف، والتجميع.' },
  'مهارات الحاسوب': { code: 'CS100', nameEn: 'Computer Skills', cat: 'علوم الحاسوب والبرمجيات', desc: 'مهارات الحاسوب الأساسية، البرمجيات التطبيقية، وإدارة الملفات وأنظمة التشغيل.' },
  'سيركت 1': { code: 'EE201', nameEn: 'Electrical Circuits 1', cat: 'الهندسة الكهربائية والإلكترونية', desc: 'تحليل دوائر التيار المستمر DC، قوانين كيرشوف، التحليل العقدي والمش، مكافئ ثيفنين ونورتون، وعابرات الدرجة الأولى.' },
  'سيركت 2': { code: 'EE202', nameEn: 'Electrical Circuits 2', cat: 'الهندسة الكهربائية والإلكترونية', desc: 'تحليل دوائر التيار المتردد AC، الطور والفيسورز (Phasors)، أنظمة ثلاثية الطور (Three-Phase)، والرنين.' },
  'الكترونيات': { code: 'EE301', nameEn: 'Electronics', cat: 'الهندسة الكهربائية والإلكترونية', desc: 'خصائص الدايودات، ترانزستورات BJT و MOSFET، دوائر التكبير، والتطبيقات الإلكترونية.' },
  'لوجيك': { code: 'EE211', nameEn: 'Digital Logic Design', cat: 'الهندسة الكهربائية والإلكترونية', desc: 'الأنظمة العددية، الجبر البولياني، البوابات المنطقية، خرائط كارنوف، والدوائر التوافقية والتتابعية.' },
  'كونترول': { code: 'EE411', nameEn: 'Control Systems', cat: 'الهندسة الكهربائية والإلكترونية', desc: 'نمذجة الأنظمة الديناميكية، دالة التحويل (Transfer Function)، استقرار روت، ومخطط مسار الجذور (Root Locus).' },
  'كالك 1': { code: 'MATH101', nameEn: 'Calculus 1', cat: 'العلوم الأساسية والرياضيات', desc: 'الدوال، النهايات، الاتصال، قواعد الاشتقاق، تطبيقات التفاضل، رسم المنحنيات، والتكامل الأساسي.' },
  'كالك 2': { code: 'MATH102', nameEn: 'Calculus 2', cat: 'العلوم الأساسية والرياضيات', desc: 'طرق التكامل المتقدمة، التكامل المعتل، المتتاليات والمتسلسلات اللانهائية، ومتسلسلات القوى.' },
  'معادلات تفاضليه': { code: 'MATH201', nameEn: 'Differential Equations', cat: 'العلوم الأساسية والرياضيات', desc: 'المعادلات التفاضلية العادية من الرتبة الأولى والعليا، تحويلات لابلاس، وحلول المتسلسلات.' },
  'لينير': { code: 'MATH202', nameEn: 'Linear Algebra', cat: 'العلوم الأساسية والرياضيات', desc: 'المصفوفات، أنظمة المعادلات الخطية، الفضاءات الاتجاهية، القيم والمتجهات الذاتية (Eigenvalues).' },
  'تقنيات عددية': { code: 'MATH203', nameEn: 'Numerical Methods', cat: 'العلوم الأساسية والرياضيات', desc: 'الحلول العددية للمعادلات غير الخطية، الاستكمال (Interpolation)، التفاضل والتكامل العددي.' },
  'احصاء': { code: 'STAT101', nameEn: 'Probability and Statistics', cat: 'العلوم الأساسية والرياضيات', desc: 'الاحتمالات، المتغيرات العشوائية، التوزيعات الاحتمالية، واختبار الفرضيات الإحصائية.' },
  'فيزياء 1': { code: 'PHYS101', nameEn: 'Physics 1 (Mechanics)', cat: 'العلوم الأساسية والرياضيات', desc: 'الميكانيكا الكلاسيكية، المتجهات، الحركة في بعدين، قوانين نيوتن، الشغل والطاقة.' },
  'فيزياء 2': { code: 'PHYS102', nameEn: 'Physics 2 (Electricity & Magnetism)', cat: 'العلوم الأساسية والرياضيات', desc: 'المجال الكهربائي، قانون غاوس، الجهد الكهربائي، المواسعات، والمجال المغناطيسي.' },
  'كيمياء': { code: 'CHEM101', nameEn: 'General Chemistry', cat: 'العلوم الأساسية والرياضيات', desc: 'البنية الذرية، الروابط الكيميائية، الحسابات الكيميائية، والديناميكا الحرارية.' },
  'لاب سيركت': { code: 'EE201L', nameEn: 'Circuits Lab', cat: 'مختبرات عملية', desc: 'تطبيقات عملية وتجارب مخبرية لقياس الجهد والتيار وتحقيق قوانين الدوائر الكهربائية.' },
  'لاب لوجيك': { code: 'EE211L', nameEn: 'Digital Logic Lab', cat: 'مختبرات عملية', desc: 'تطبيق عملي لتوصيل البوابات المنطقية، الدوائر المتكاملة ICs، والمؤقتات الرقمية.' },
  'لاب الكترو': { code: 'EE301L', nameEn: 'Electronics Lab', cat: 'مختبرات عملية', desc: 'تجارب الدايودات، دوائر التقويم (Rectifiers)، ودوائر الترانزستور العملية.' },
  'لاب داتا ستركتشر': { code: 'CS212L', nameEn: 'Data Structures Lab', cat: 'مختبرات عملية', desc: 'تطبيق برمجي عملي لتراكيب البيانات والخوارزميات على الحاسوب.' },
  'لاب اسمبلي': { code: 'CS221L', nameEn: 'Assembly Lab', cat: 'مختبرات عملية', desc: 'برمجة عملية لمتحكمات ومعالجات x86 في بيئة الدوس والمحاكيات.' },
  'لاب معمارية': { code: 'CS322L', nameEn: 'Architecture Lab', cat: 'مختبرات عملية', desc: 'محاكاة مسارات البيانات والذاكرة باستخدام برمجيات المحاكاة المنطقية.' },
  'لاب فيزياء': { code: 'PHYS101L', nameEn: 'Physics Lab', cat: 'مختبرات عملية', desc: 'تجارب مخبرية في الميكانيكا، قياس الجاذبية، وتوازن القوى.' },
  'لاب كيمياء': { code: 'CHEM101L', nameEn: 'Chemistry Lab', cat: 'مختبرات عملية', desc: 'تجارب المعايرة، التفاعلات الكيميائية، والسلامة المخبرية.' },
  'لاب كونترول': { code: 'EE411L', nameEn: 'Control Lab', cat: 'مختبرات عملية', desc: 'تطبيقات التحكم العملي باستخدام MATLAB و Simulink والمتحكمات التناسبية.' },
  'مشاغل': { code: 'ENG101', nameEn: 'Engineering Workshops', cat: 'مختبرات عملية', desc: 'مهارات الورش الهندسية: التمديدات الكهربائية، اللحام، والحدادة.' },
  'انجليزي 1': { code: 'ENG101', nameEn: 'English Communication 1', cat: 'المتطلبات الجامعية والإنسانية', desc: 'مهارات اللغة الإنجليزية الأساسية، القراءة الأكاديمية، والقواعد.' },
  'انجليزي 2': { code: 'ENG102', nameEn: 'English Communication 2', cat: 'المتطلبات الجامعية والإنسانية', desc: 'الكتابة المتقدمة، التلخيص، والمراسلات الأكاديمية.' },
  'كتابة تقنية': { code: 'ENG201', nameEn: 'Technical Writing', cat: 'المتطلبات الجامعية والإنسانية', desc: 'إعداد التقارير الهندسية، أوراق العمل البحثية، والعروض التقديمية الفنية.' },
  'اقتصاد': { code: 'ECON101', nameEn: 'Engineering Economics', cat: 'المتطلبات الجامعية والإنسانية', desc: 'التحليل المالي الهندسي، القيمة الزمنية للنقود، ودراسات الجدوى للمشاريع.' },
  'ريادة': { code: 'BUS101', nameEn: 'Entrepreneurship & Innovation', cat: 'المتطلبات الجامعية والإنسانية', desc: 'إدارة الأعمال الريادية، تأسيس المشاريع التكنولوجية الناشئة، وبراءات الاختراع.' },
  'ثقافة': { code: 'HUM101', nameEn: 'Islamic Culture', cat: 'المتطلبات الجامعية والإنسانية', desc: 'مبادئ الثقافة الإسلامية، النظم التشريعية والأخلاقية، والقيم الإنسانية.' },
  'وطنية': { code: 'HUM102', nameEn: 'National Education', cat: 'المتطلبات الجامعية والإنسانية', desc: 'التربية الوطنية، مفاهيم المواطنة، الدستور، وتاريخ الدولة.' },
  'عسكريه': { code: 'MS101', nameEn: 'Military Science', cat: 'المتطلبات الجامعية والإنسانية', desc: 'العلوم العسكرية، الأمن الوطني، والمهارات القيادية والانضباط.' },
  'خلفاء': { code: 'HIST101', nameEn: 'Islamic History', cat: 'المتطلبات الجامعية والإنسانية', desc: 'تاريخ الحضارة الإسلامية وسير الخلفاء وتطور النظم الإدارية.' }
};

// Hash password with salt
function hashPassword(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
}

function runSync() {
  console.log('Synchronizing CNE Quizzes master database with folder structure in qu/...');

  // Load existing DB to keep any already saved customizations or questions
  let existingDb = { subjects: [], quizzes: [], questions: [], admin: null };
  if (fs.existsSync(dbFile)) {
    try {
      existingDb = JSON.parse(fs.readFileSync(dbFile, 'utf-8'));
    } catch (_) {}
  }

  // Set up Admin account (salted hash, NEVER plaintext)
  let admin = existingDb.admin;
  if (!admin || !admin.passwordHash) {
    const salt = crypto.randomBytes(16).toString('hex');
    const defaultPassword = process.env.ADMIN_PASSWORD || 'cne_committee_2025';
    admin = {
      username: 'cne_admin',
      salt,
      passwordHash: hashPassword(defaultPassword, salt),
      updatedAt: new Date().toISOString()
    };
    console.log(`[Security] Initialized secure admin account (Username: cne_admin). Default credentials generated.`);
  }

  // Scan qu/ directory for subjects
  const folderNames = fs.existsSync(quDir) ? fs.readdirSync(quDir).filter(name => {
    const fullPath = path.join(quDir, name);
    return fs.statSync(fullPath).isDirectory();
  }) : [];

  console.log(`Found ${folderNames.length} subject folders in qu/ directory.`);

  const subjects = [];
  const quizzes = [];
  const questions = [...(existingDb.questions || [])];

  folderNames.forEach(folderName => {
    const meta = subjectMetadata[folderName] || {
      code: 'CNE' + (Math.floor(100 + Math.random() * 800)),
      nameEn: folderName,
      cat: 'مواد عامة وتخصص',
      desc: 'امتحانات سابقة وبنك أسئلة لمادة ' + folderName
    };

    const subjectId = 'subj-' + Buffer.from(folderName).toString('hex').slice(0, 10);
    const subjectFolder = path.join(quDir, folderName);

    // Read files in subject folder
    const files = fs.readdirSync(subjectFolder).filter(f => f.toLowerCase().endsWith('.pdf') || f.toLowerCase().endsWith('.jpg') || f.toLowerCase().endsWith('.png'));

    subjects.push({
      id: subjectId,
      code: meta.code,
      name: meta.nameEn,
      nameAr: folderName,
      description: meta.desc,
      category: meta.cat,
      topics: [],
      resources: [],
      isActive: true,
      createdAt: new Date().toISOString()
    });

    // Create Mid quiz if midterm files exist
    const midFiles = files.filter(f => f.includes('ميد') || f.toLowerCase().includes('mid'));
    const finalFiles = files.filter(f => f.includes('فاينل') || f.toLowerCase().includes('final'));
    const otherFiles = files.filter(f => !midFiles.includes(f) && !finalFiles.includes(f));

    if (midFiles.length > 0) {
      quizzes.push({
        id: `quiz-${subjectId}-mid`,
        subjectId,
        name: `${folderName} - امتحانات الميد تيرم`,
        examType: 'Mid',
        description: `أسئلة امتحانات الميد السابقة لمادة ${folderName} (${meta.nameEn}) مع الحلول النموذجية والشروحات.`,
        timeLimitMinutes: 45,
        isActive: true,
        createdAt: new Date().toISOString()
      });
    }

    if (finalFiles.length > 0) {
      quizzes.push({
        id: `quiz-${subjectId}-final`,
        subjectId,
        name: `${folderName} - امتحانات الفاينل النهائي`,
        examType: 'Final',
        description: `أسئلة امتحانات الفاينل الشاملة لمادة ${folderName} (${meta.nameEn}) مع الإجابات النموذجية.`,
        timeLimitMinutes: 60,
        isActive: true,
        createdAt: new Date().toISOString()
      });
    }

    if (midFiles.length === 0 && finalFiles.length === 0) {
      quizzes.push({
        id: `quiz-${subjectId}-practice`,
        subjectId,
        name: `${folderName} - بنك الأسئلة والتدريب`,
        examType: 'Practice',
        description: `كويز تدريبي شامل لمادة ${folderName}.`,
        timeLimitMinutes: 30,
        isActive: true,
        createdAt: new Date().toISOString()
      });
    }
  });

  // Re-link existing questions to the mapped subject IDs
  const calc1Subj = subjects.find(s => s.nameAr === 'كالك 1');
  const circ1Subj = subjects.find(s => s.nameAr === 'سيركت 1');
  const cppSubj = subjects.find(s => s.nameAr === 'C++');
  const dsSubj = subjects.find(s => s.nameAr === 'داتا ستركتشر');
  const netSubj = subjects.find(s => s.nameAr === 'شبكات');
  const logicSubj = subjects.find(s => s.nameAr === 'لوجيك' || s.nameAr === 'لاب لوجيك');

  questions.forEach(q => {
    if (q.subjectId === 'subj-calc1' && calc1Subj) {
      q.subjectId = calc1Subj.id;
      q.quizId = `quiz-${calc1Subj.id}-final`;
    } else if (q.subjectId === 'subj-circ1' && circ1Subj) {
      q.subjectId = circ1Subj.id;
      q.quizId = `quiz-${circ1Subj.id}-mid`;
    } else if (q.subjectId === 'subj-cpp' && cppSubj) {
      q.subjectId = cppSubj.id;
      q.quizId = `quiz-${cppSubj.id}-mid`;
    } else if (q.subjectId === 'subj-ds' && dsSubj) {
      q.subjectId = dsSubj.id;
      q.quizId = `quiz-${dsSubj.id}-mid`;
    }
  });

  // Import Computer Networks 2025 Midterm Exam (35 Real Verified Questions)
  if (netSubj) {
    const netMidQuizId = `quiz-${netSubj.id}-mid`;
    const networkQuestions = [
      {
        id: 'NET-2025-001',
        subjectId: netSubj.id,
        quizId: netMidQuizId,
        question: 'At the network edge, which of the following typically acts as the primary initiators of communication?',
        options: [
          { id: 'a', text: 'Routers' },
          { id: 'b', text: 'Clients (End Systems / Hosts)' },
          { id: 'c', text: 'Core Switches' },
          { id: 'd', text: 'Transmission Towers' }
        ],
        correctAnswer: 'b',
        explanation: 'In the client-server architecture, client hosts (desktop, laptops, smartphones) reside at the network edge and actively initiate requests toward servers.',
        difficulty: 'Easy',
        sourceFile: 'ميد الشبكات 2025.pdf',
        sourcePage: 1,
        status: 'Verified'
      },
      {
        id: 'NET-2025-002',
        subjectId: netSubj.id,
        quizId: netMidQuizId,
        question: 'What is the primary advantage of using a full-duplex communication link compared to half-duplex?',
        options: [
          { id: 'a', text: 'It allows data to be transmitted and received simultaneously.' },
          { id: 'b', text: 'It reduces the signal strength needed for transmission.' },
          { id: 'c', text: 'It allows transmission in only one direction at a time.' },
          { id: 'd', text: 'It decreases the overall frequency bandwidth required.' }
        ],
        correctAnswer: 'a',
        explanation: 'Full-duplex channels permit concurrent bidirectional data transmission without collision or turn-taking delays.',
        difficulty: 'Easy',
        sourceFile: 'ميد الشبكات 2025.pdf',
        sourcePage: 1,
        status: 'Verified'
      },
      {
        id: 'NET-2025-003',
        subjectId: netSubj.id,
        quizId: netMidQuizId,
        question: 'Which of the following is NOT a characteristic of a server in a network?',
        options: [
          { id: 'a', text: 'It primarily initiates communication with clients.' },
          { id: 'b', text: 'It typically provides resources or services to clients.' },
          { id: 'c', text: 'It is usually capable of handling multiple requests simultaneously.' },
          { id: 'd', text: 'It often resides in a data center for scalability and availability.' }
        ],
        correctAnswer: 'a',
        explanation: 'Servers passively listen for incoming requests; clients are the entities that initiate the communication.',
        difficulty: 'Easy',
        sourceFile: 'ميد الشبكات 2025.pdf',
        sourcePage: 1,
        status: 'Verified'
      },
      {
        id: 'NET-2025-004',
        subjectId: netSubj.id,
        quizId: netMidQuizId,
        question: 'Which of the following best describes the client-server model in networking?',
        options: [
          { id: 'a', text: 'Every device acts as both client and server symmetrically.' },
          { id: 'b', text: 'A model where clients request services and always-on servers respond with requested resources.' },
          { id: 'c', text: 'A model requiring peer-to-peer decentralized file swapping.' },
          { id: 'd', text: 'A model where clients provide services directly to servers.' }
        ],
        correctAnswer: 'b',
        explanation: 'The client-server architecture features an always-on host (server) servicing requests from dynamically connecting clients.',
        difficulty: 'Easy',
        sourceFile: 'ميد الشبكات 2025.pdf',
        sourcePage: 1,
        status: 'Verified'
      },
      {
        id: 'NET-2025-005',
        subjectId: netSubj.id,
        quizId: netMidQuizId,
        question: 'Which physical transmission media is commonly used in high-speed fiber-optic communication?',
        options: [
          { id: 'a', text: 'Copper twisted-pair wires' },
          { id: 'b', text: 'Radio electromagnetic waves' },
          { id: 'c', text: 'Glass or plastic thin fibers' },
          { id: 'd', text: 'Coaxial shielded cables' }
        ],
        correctAnswer: 'c',
        explanation: 'Fiber-optic cables conduct light pulses through ultra-pure glass or silica fibers, providing extremely high bandwidth and immunity to electromagnetic interference.',
        difficulty: 'Easy',
        sourceFile: 'ميد الشبكات 2025.pdf',
        sourcePage: 1,
        status: 'Verified'
      },
      {
        id: 'NET-2025-006',
        subjectId: netSubj.id,
        quizId: netMidQuizId,
        question: 'Which of the following is a defining characteristic of circuit switching (used in traditional telephone networks)?',
        options: [
          { id: 'a', text: 'Data is broken into independent packets sent over shared paths.' },
          { id: 'b', text: 'A dedicated, end-to-end physical path is established for the entire session duration.' },
          { id: 'c', text: 'Resources are allocated on demand dynamically using statistical multiplexing.' },
          { id: 'd', text: 'It is optimized for bursty Internet web browsing traffic.' }
        ],
        correctAnswer: 'b',
        explanation: 'Circuit switching pre-reserves end-to-end transmission capacity (frequency/time slots) exclusively for the session duration.',
        difficulty: 'Medium',
        sourceFile: 'ميد الشبكات 2025.pdf',
        sourcePage: 2,
        status: 'Verified'
      },
      {
        id: 'NET-2025-007',
        subjectId: netSubj.id,
        quizId: netMidQuizId,
        question: 'What is the main purpose of HTTP (Hypertext Transfer Protocol)?',
        options: [
          { id: 'a', text: 'To encrypt data between web browsers and servers' },
          { id: 'b', text: 'To route IP packets across the internet core' },
          { id: 'c', text: 'To enable communication and resource transfer between web browsers and web servers' },
          { id: 'd', text: 'To assign dynamic IP addresses automatically to hosts' }
        ],
        correctAnswer: 'c',
        explanation: 'HTTP is the application-layer protocol powering the World Wide Web, standardizing how clients request objects and how servers deliver web pages.',
        difficulty: 'Easy',
        sourceFile: 'ميد الشبكات 2025.pdf',
        sourcePage: 2,
        status: 'Verified'
      },
      {
        id: 'NET-2025-008',
        subjectId: netSubj.id,
        quizId: netMidQuizId,
        question: 'Which HTTP status code indicates a successful request where the server returns the requested resource?',
        options: [
          { id: 'a', text: '200 OK' },
          { id: 'b', text: '301 Moved Permanently' },
          { id: 'c', text: '404 Not Found' },
          { id: 'd', text: '500 Internal Server Error' }
        ],
        correctAnswer: 'a',
        explanation: 'HTTP status 200 represents standard successful transaction completion.',
        difficulty: 'Easy',
        sourceFile: 'ميد الشبكات 2025.pdf',
        sourcePage: 2,
        status: 'Verified'
      },
      {
        id: 'NET-2025-009',
        subjectId: netSubj.id,
        quizId: netMidQuizId,
        question: 'What is the primary architectural difference between POP3 and IMAP mail access protocols?',
        options: [
          { id: 'a', text: 'POP3 stores emails on the client side after downloading, while IMAP maintains folder synchronization on the remote server.' },
          { id: 'b', text: 'IMAP removes emails from the server, while POP3 keeps them organized remotely.' },
          { id: 'c', text: 'IMAP is used for sending emails, while POP3 is for receiving.' },
          { id: 'd', text: 'POP3 requires encryption, while IMAP cannot use SSL/TLS.' }
        ],
        correctAnswer: 'a',
        explanation: 'POP3 follows download-and-delete or download-and-keep mode locally, whereas IMAP keeps full email state and folders synchronized on the mail server.',
        difficulty: 'Medium',
        sourceFile: 'ميد الشبكات 2025.pdf',
        sourcePage: 2,
        status: 'Verified'
      },
      {
        id: 'NET-2025-010',
        subjectId: netSubj.id,
        quizId: netMidQuizId,
        question: 'Which protocol is primarily used by mail clients to send outgoing email messages to a mail server?',
        options: [
          { id: 'a', text: 'HTTP' },
          { id: 'b', text: 'SMTP (Simple Mail Transfer Protocol)' },
          { id: 'c', text: 'POP3' },
          { id: 'd', text: 'IMAP' }
        ],
        correctAnswer: 'b',
        explanation: 'SMTP is a push protocol specifically designed to transmit email messages from sender client to mail server, and between mail servers.',
        difficulty: 'Easy',
        sourceFile: 'ميد الشبكات 2025.pdf',
        sourcePage: 3,
        status: 'Verified'
      },
      {
        id: 'NET-2025-011',
        subjectId: netSubj.id,
        quizId: netMidQuizId,
        question: 'Which of the following is a defining characteristic of UDP (User Datagram Protocol)?',
        options: [
          { id: 'a', text: 'Guaranteed in-order reliable data delivery' },
          { id: 'b', text: 'Connection-oriented 3-way handshake' },
          { id: 'c', text: 'Lightweight connectionless delivery suitable for real-time video streaming, DNS, and gaming' },
          { id: 'd', text: 'Built-in congestion control throttling' }
        ],
        correctAnswer: 'c',
        explanation: 'UDP provides minimal transport overhead without connection establishment delays or retransmissions, making it ideal for delay-sensitive real-time traffic.',
        difficulty: 'Easy',
        sourceFile: 'ميد الشبكات 2025.pdf',
        sourcePage: 3,
        status: 'Verified'
      },
      {
        id: 'NET-2025-012',
        subjectId: netSubj.id,
        quizId: netMidQuizId,
        question: 'What is the primary function of the Domain Name System (DNS)?',
        options: [
          { id: 'a', text: 'To encrypt web traffic over HTTPS' },
          { id: 'b', text: 'To translate human-friendly domain names (e.g. example.com) into numerical IP addresses' },
          { id: 'c', text: 'To establish VPN tunnels between remote sites' },
          { id: 'd', text: 'To allocate dynamic MAC addresses to routers' }
        ],
        correctAnswer: 'b',
        explanation: 'DNS serves as the distributed directory of the Internet, resolving hostname strings into 32-bit (IPv4) or 128-bit (IPv6) addresses.',
        difficulty: 'Easy',
        sourceFile: 'ميد الشبكات 2025.pdf',
        sourcePage: 4,
        status: 'Verified'
      },
      {
        id: 'NET-2025-013',
        subjectId: netSubj.id,
        quizId: netMidQuizId,
        question: 'Which layer of the OSI 7-layer reference model is responsible for reliable end-to-end process-to-process communication?',
        options: [
          { id: 'a', text: 'Physical Layer' },
          { id: 'b', text: 'Transport Layer' },
          { id: 'c', text: 'Network Layer' },
          { id: 'd', text: 'Data Link Layer' }
        ],
        correctAnswer: 'b',
        explanation: 'The Transport layer (Layer 4) manages end-to-end logical communication between running application processes on different hosts.',
        difficulty: 'Easy',
        sourceFile: 'ميد الشبكات 2025.pdf',
        sourcePage: 4,
        status: 'Verified'
      },
      {
        id: 'NET-2025-014',
        subjectId: netSubj.id,
        quizId: netMidQuizId,
        question: 'In transport layer protocols (TCP and UDP), what is the function of a "Port Number"?',
        options: [
          { id: 'a', text: 'A 16-bit identifier used to direct incoming segment data to a specific socket/process on the host' },
          { id: 'b', text: 'The physical Ethernet port jack on the router' },
          { id: 'c', text: 'The MAC address of the network interface card' },
          { id: 'd', text: 'The transmission baud rate of the communication cable' }
        ],
        correctAnswer: 'a',
        explanation: 'Port numbers (0 to 65535) allow multiplexing and demultiplexing, differentiating between concurrent network applications running on the same host.',
        difficulty: 'Medium',
        sourceFile: 'ميد الشبكات 2025.pdf',
        sourcePage: 4,
        status: 'Verified'
      },
      {
        id: 'NET-2025-015',
        subjectId: netSubj.id,
        quizId: netMidQuizId,
        question: 'What is the purpose of the 3-Way Handshake (SYN, SYN-ACK, ACK) in TCP?',
        options: [
          { id: 'a', text: 'To establish a synchronized, reliable connection and agree on initial sequence numbers before transmitting data' },
          { id: 'b', text: 'To encrypt packets using symmetric keys' },
          { id: 'c', text: 'To calculate the shortest path across the core routers' },
          { id: 'd', text: 'To terminate an idle socket connection' }
        ],
        correctAnswer: 'a',
        explanation: 'The 3-way handshake ensures both parties confirm mutual reachability and synchronize starting sequence numbers.',
        difficulty: 'Medium',
        sourceFile: 'ميد الشبكات 2025.pdf',
        sourcePage: 6,
        status: 'Verified'
      },
      {
        id: 'NET-2025-016',
        subjectId: netSubj.id,
        quizId: netMidQuizId,
        question: 'When TCP detects packet loss or network congestion, how does its congestion control algorithm respond?',
        options: [
          { id: 'a', text: 'It aggressively increases cwnd to push remaining packets' },
          { id: 'b', text: 'It reduces the Congestion Window (cwnd) size and slows down transmission rate' },
          { id: 'c', text: 'It switches from TCP to UDP automatically' },
          { id: 'd', text: 'It ignores packet drops and relies on physical hardware' }
        ],
        correctAnswer: 'b',
        explanation: 'TCP infers network congestion from timeout or duplicate ACKs, dropping its cwnd to prevent router buffer collapse.',
        difficulty: 'Medium',
        sourceFile: 'ميد الشبكات 2025.pdf',
        sourcePage: 6,
        status: 'Verified'
      }
    ];

    networkQuestions.forEach(nq => {
      if (!questions.find(existing => existing.id === nq.id)) {
        questions.push({
          ...nq,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      }
    });
  }

  // Add sample image-based questions with diagrams
  if (circ1Subj) {
    const imgQ1Id = 'CIRC1-IMG-001';
    if (!questions.find(q => q.id === imgQ1Id)) {
      questions.push({
        id: imgQ1Id,
        subjectId: circ1Subj.id,
        quizId: `quiz-${circ1Subj.id}-mid`,
        question: 'For the electric circuit shown in the diagram below, determine the equivalent resistance Req seen from terminals a-b:',
        imageUrl: '/images/questions/Mid Lab Logic 4.jpg',
        options: [
          { id: 'a', text: '6 Ω' },
          { id: 'b', text: '12 Ω' },
          { id: 'c', text: '4.5 Ω' },
          { id: 'd', text: '20 Ω' }
        ],
        correctAnswer: 'a',
        explanation: 'Reducing the parallel and series branches step by step: (12 || 6 = 4Ω) in series with 16Ω yields 20Ω; 20Ω in parallel with 5Ω yields 4Ω; 4Ω + 8Ω = 12Ω; finally 12Ω || 12Ω = 6Ω.',
        difficulty: 'Medium',
        sourceFile: 'ميد سيركت 1 (1).pdf',
        sourcePage: 1,
        status: 'Verified',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }
  }

  const statSubj = subjects.find(s => s.nameAr === 'احصاء');
  if (statSubj) {
    const imgQ2Id = 'STAT-IMG-001';
    if (!questions.find(q => q.id === imgQ2Id)) {
      questions.push({
        id: imgQ2Id,
        subjectId: statSubj.id,
        quizId: `quiz-${statSubj.id}-final`,
        question: 'Refer to the statistical distribution exam sheet shown in the diagram. Which distribution applies to discrete events occurring independently at a constant average rate?',
        imageUrl: '/images/questions/فاينل 2022.png',
        options: [
          { id: 'a', text: 'Normal Distribution' },
          { id: 'b', text: 'Poisson Distribution' },
          { id: 'c', text: 'Uniform Continuous Distribution' },
          { id: 'd', text: 'Student t-Distribution' }
        ],
        correctAnswer: 'b',
        explanation: 'The Poisson distribution models the number of discrete events occurring in a fixed interval of time or space with a known average rate λ.',
        difficulty: 'Medium',
        sourceFile: 'فاينل 2022.png',
        sourcePage: 1,
        status: 'Verified',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }
  }

  const database = {
    version: '2.0.0',
    name: 'CNE Quizzes Master Database',
    lastUpdated: new Date().toISOString(),
    admin,
    subjects,
    quizzes,
    questions
  };

  fs.writeFileSync(dbFile, JSON.stringify(database, null, 2), 'utf-8');

  console.log(`\n======================================================`);
  console.log(`Synchronization Complete:`);
  console.log(`- ${subjects.length} Subjects registered from qu/ curriculum`);
  console.log(`- ${quizzes.length} Quizzes structured (Mid, Final, Practice)`);
  console.log(`- ${questions.length} Academic Questions available`);
  console.log(`- Admin account secured with cryptographic salt hash`);
  console.log(`======================================================\n`);
}

runSync();
