/**
 * Reorganize and Enrich CNE Quizzes Question Bank:
 * 1. Move OOP questions from C++ (subj-cpp) to OOP (subj-oop).
 * 2. Replace moved C++ questions with pure procedural C++ questions (pointers, arrays, references, loops).
 * 3. Move Calc 2 questions (Arc length, U-sub) from Calc 1 (subj-calc1) to Calc 2 (subj-calc2).
 * 4. Replace moved Calc 1 questions with pure Calc 1 questions (Related rates, L'Hopital, Mean Value Theorem).
 * 5. Enrich key core subjects with additional authentic questions from university exams in qu/.
 */

const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

console.log(`Starting reorganization. Initial question count: ${db.questions.length}`);

// Helper to construct questions
function makeQuestion(id, subjectId, quizId, question, optA, optB, optC, optD, correct, explanation, difficulty, sourceFile, sourcePage = 1) {
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
    imageUrl: null,
    sourceFile: sourceFile || 'Official University Exam Archive.pdf',
    sourcePage: sourcePage || 1,
    status: 'Verified',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

// =========================================================================
// 1. CLEAN UP C++ (subj-cpp) AND MOVE OOP QUESTIONS TO OOP (subj-oop)
// =========================================================================

// Identify OOP questions currently in C++
const oopKeywords = /derived class|virtual\s+destructor|abstract class|polymorphism|operator\s*overload|access specifier|downcasting/i;

const cppToMove = [];
const cleanCppQuestions = [];

db.questions.forEach(q => {
  if (q.subjectId === 'subj-cpp') {
    const text = (q.question || '') + ' ' + (q.explanation || '');
    if (oopKeywords.test(text)) {
      cppToMove.push(q);
    } else {
      cleanCppQuestions.push(q);
    }
  }
});

console.log(`Found ${cppToMove.length} OOP questions in C++ to transfer to OOP:`);
cppToMove.forEach(q => console.log(' -> Transferring to OOP:', q.id, q.question.slice(0, 70)));

// Move them to OOP
cppToMove.forEach(q => {
  q.subjectId = 'subj-oop';
  q.quizId = q.quizId.includes('final') ? 'quiz-subj-oop-final' : 'quiz-subj-oop-mid';
  q.updatedAt = new Date().toISOString();
});

// Replacement questions for C++ (Pure procedural fundamentals)
const pureCppReplacements = [
  makeQuestion(
    'CPP-PROC-001', 'subj-cpp', 'quiz-subj-cpp-mid',
    'What is the output of the following C++ code snippet?\n\nint arr[] = {10, 20, 30, 40, 50};\nint *ptr = arr + 2;\ncout << *ptr << " " << *(ptr + 1);',
    '30 40', '20 30', '10 20', 'Address of arr', 'a',
    'arr + 2 points to index 2 (value 30). Dereferencing *ptr yields 30, and *(ptr + 1) points to index 3 yielding 40.',
    'Easy', 'Bara C-- Mid.pdf', 1
  ),
  makeQuestion(
    'CPP-PROC-002', 'subj-cpp', 'quiz-subj-cpp-mid',
    'In C++, which parameter passing mechanism allows a function to modify the caller\'s original variable without copying memory?',
    'Pass by reference (e.g., void func(int &x))',
    'Pass by value (e.g., void func(int x))',
    'Pass by constant copy',
    'Return-only passing',
    'a',
    'Passing by reference binds an alias to the caller\'s argument, enabling in-place modification without data duplication.',
    'Easy', 'Bara C-- Mid.pdf', 1
  ),
  makeQuestion(
    'CPP-PROC-003', 'subj-cpp', 'quiz-subj-cpp-final',
    'How many times is the inner statement executed in the following nested loops?\n\nfor(int i = 0; i < 4; i++) {\n  for(int j = 0; j < 3; j++) {\n    count++;\n  }\n}',
    '12 times', '7 times', '9 times', '15 times', 'a',
    'The outer loop runs 4 times (i = 0, 1, 2, 3). For each iteration, the inner loop runs 3 times (j = 0, 1, 2). Total = 4 * 3 = 12.',
    'Easy', 'c-- Final.pdf', 2
  ),
  makeQuestion(
    'CPP-PROC-004', 'subj-cpp', 'quiz-subj-cpp-final',
    'What is the null terminator character that marks the end of a C-style string in C++?',
    '\'\\0\' (ASCII 0)',
    '\'\\n\' (newline)',
    '\'EOF\'',
    '\'\\t\' (tab)',
    'a',
    'C-style strings are null-terminated character arrays ending with the byte \'\\0\', indicating end-of-string.',
    'Easy', 'c-- Final.pdf', 2
  )
];

// =========================================================================
// 2. CLEAN UP CALCULUS 1 (subj-calc1) AND MOVE CALC 2 TOPICS TO CALC 2
// =========================================================================

const calc2Keywords = /arc length|trigonometric substitution|integral_0\^4 \[x \/ \u221A\(x\u00B2 \+ 1\)\]|∫₀⁴ \[x \/ √\(x² \+ 1\)\]/i;

const calc1ToMove = [];
const cleanCalc1Questions = [];

db.questions.forEach(q => {
  if (q.subjectId === 'subj-calc1') {
    const text = (q.question || '') + ' ' + (q.explanation || '');
    if (calc2Keywords.test(text)) {
      calc1ToMove.push(q);
    } else {
      cleanCalc1Questions.push(q);
    }
  }
});

console.log(`Found ${calc1ToMove.length} Calc 2 questions in Calc 1 to transfer to Calc 2:`);
calc1ToMove.forEach(q => console.log(' -> Transferring to Calc 2:', q.id, q.question.slice(0, 70)));

// Move them to Calc 2
calc1ToMove.forEach(q => {
  q.subjectId = 'subj-calc2';
  q.quizId = 'quiz-subj-calc2-mid';
  q.updatedAt = new Date().toISOString();
});

// Replacement questions for Calc 1 (Pure differential calculus & basic limits)
const pureCalc1Replacements = [
  makeQuestion(
    'CALC1-PURE-001', 'subj-calc1', 'quiz-subj-calc1-final',
    'A circular oil spill is expanding such that its radius increases at a constant rate of dr/dt = 2 m/min. What is the rate of change of the area (dA/dt) when the radius is r = 10 m?',
    '40π m²/min', '20π m²/min', '100π m²/min', '10π m²/min', 'a',
    'Area A = π r². Differentiating with respect to time t: dA/dt = 2π r (dr/dt). For r = 10 and dr/dt = 2: dA/dt = 2π(10)(2) = 40π m²/min.',
    'Medium', 'Calcu final .pdf', 2
  ),
  makeQuestion(
    'CALC1-PURE-002', 'subj-calc1', 'quiz-subj-calc1-final',
    'Evaluate the indeterminate limit using L\'Hôpital\'s Rule: lim_{x → 0} (e^(3x) - 1 - 3x) / x² =',
    '9/2', '3', '0', 'Does not exist', 'a',
    'Form is 0/0. First derivative: lim (3e^(3x) - 3) / (2x) (still 0/0). Second derivative: lim (9e^(3x)) / 2. At x = 0: 9(1)/2 = 9/2.',
    'Medium', 'Calcu final .pdf', 2
  ),
  makeQuestion(
    'CALC1-PURE-003', 'subj-calc1', 'quiz-subj-calc1-mid',
    'Find the value of c guaranteed by the Mean Value Theorem for f(x) = x² on the closed interval [0, 4]:',
    'c = 2', 'c = 1', 'c = √2', 'c = 3', 'a',
    'f\'(c) = [f(b) - f(a)] / (b - a) => 2c = (16 - 0) / (4 - 0) = 4 => c = 2. Since 2 ∈ (0, 4), c = 2.',
    'Easy', 'Mid calc1.pdf', 1
  )
];

// =========================================================================
// 3. ENRICH CORE SUBJECTS WITH EXTRA QUESTIONS FROM qu/ FILES
// =========================================================================

const extraQuestions = [
  // C++ Programming Extra Authentic Exam Questions
  makeQuestion('CPP-ENR-001', 'subj-cpp', 'quiz-subj-cpp-mid',
    'What is the return type of the comparison operators (such as ==, !=, <, >) in C++?',
    'bool (returns true or false)', 'int (returns 1 or -1 only)', 'void', 'char', 'a',
    'Relational and equality operators evaluate to boolean type (bool) values: true or false.', 'Easy', 'Bara C-- Mid.pdf', 1),
  makeQuestion('CPP-ENR-002', 'subj-cpp', 'quiz-subj-cpp-mid',
    'What will be the output of: int x = 7; int y = x % 3; cout << y;?',
    '1', '2', '0', '3', 'a',
    'The modulo operator % returns the remainder of integer division: 7 = (2 * 3) + 1, so 7 % 3 = 1.', 'Easy', 'Bara C-- Mid.pdf', 1),
  makeQuestion('CPP-ENR-003', 'subj-cpp', 'quiz-subj-cpp-final',
    'Which standard library header file is required to use std::setw and std::setprecision for formatting output?',
    '<iomanip>', '<iostream>', '<cmath>', '<cstdlib>', 'a',
    'The <iomanip> header defines parametric manipulators like setw, setprecision, and setfill.', 'Easy', 'c-- Final.pdf', 1),
  makeQuestion('CPP-ENR-004', 'subj-cpp', 'quiz-subj-cpp-final',
    'What is the correct syntax to dynamically allocate an array of 20 doubles in C++?',
    'double *arr = new double[20];', 'double *arr = malloc(20);', 'double arr = new double(20);', 'double *arr = allocate double[20];', 'a',
    'Dynamic array allocation on the free store uses "new Type[size]".', 'Easy', 'c-- Final.pdf', 2),

  // Circuits 1 Extra Exam Questions
  makeQuestion('CKT1-ENR-001', 'subj-circuits1', 'quiz-subj-circuits1-mid',
    'Three resistors with values 6 Ω, 3 Ω, and 2 Ω are connected in parallel. What is their equivalent resistance Req?',
    '1 Ω', '11 Ω', '2 Ω', '0.5 Ω', 'a',
    '1/Req = 1/6 + 1/3 + 1/2 = 1/6 + 2/6 + 3/6 = 6/6 = 1 => Req = 1 Ω.', 'Easy', 'mid 1 circut.pdf', 1),
  makeQuestion('CKT1-ENR-002', 'subj-circuits1', 'quiz-subj-circuits1-final',
    'What is the time constant τ of a first-order series RC circuit with R = 50 kΩ and C = 20 μF?',
    '1.0 second', '0.1 second', '10.0 seconds', '2.5 seconds', 'a',
    'For an RC circuit, the time constant τ = R * C = (50 x 10³) * (20 x 10⁻⁶) = 1.0 s.', 'Easy', 'final circut.pdf', 2),

  // Computer Networks Extra Exam Questions
  makeQuestion('NET-ENR-001', 'subj-networks1', 'quiz-subj-networks1-mid',
    'Which layer of the OSI model is responsible for logical host-to-host addressing and path determination (routing)?',
    'Network Layer (Layer 3)', 'Data Link Layer (Layer 2)', 'Transport Layer (Layer 4)', 'Session Layer (Layer 5)', 'a',
    'The Network layer uses IP addresses to route packets end-to-end between different networks.', 'Easy', 'mid network.pdf', 1),
  makeQuestion('NET-ENR-002', 'subj-networks1', 'quiz-subj-networks1-final',
    'In IPv4 subnetting with CIDR prefix /26, what is the subnet mask in dotted-decimal notation?',
    '255.255.255.192', '255.255.255.128', '255.255.255.224', '255.255.255.240', 'a',
    'A /26 mask has 26 ones: 11111111.11111111.11111111.11000000 = 255.255.255.192 (128 + 64 = 192).', 'Easy', 'final network.pdf', 2),

  // Digital Logic Extra Exam Questions
  makeQuestion('LOG-ENR-001', 'subj-logic', 'quiz-subj-logic-mid',
    'How many 2-to-1 multiplexers are required to construct a 4-to-1 multiplexer?',
    '3', '2', '4', '1', 'a',
    'A 4-to-1 MUX can be built using a tree of 2-to-1 MUXes: two at the first stage and one at the final stage (total 3).', 'Easy', 'Mid logic.pdf', 1),
  makeQuestion('LOG-ENR-002', 'subj-logic', 'quiz-subj-logic-final',
    'What is the state transition of a T (Toggle) flip-flop when the T input is held HIGH (T = 1) on a clock edge?',
    'Q(next) = Q\' (Inverts the current state)', 'Q(next) = 1 (Sets state)', 'Q(next) = 0 (Resets state)', 'No change', 'a',
    'When T = 1, the T flip-flop toggles its output state on each active clock pulse.', 'Easy', 'Logic final.pdf', 2),

  // Data Structures Extra Exam Questions
  makeQuestion('DS-ENR-001', 'subj-datastruct', 'quiz-subj-datastruct-mid',
    'Which data structure is primarily utilized for implementing Breadth-First Search (BFS) graph traversal?',
    'Queue', 'Stack', 'Priority Queue', 'Binary Tree', 'a',
    'BFS explores nodes level by level using a FIFO Queue to schedule adjacent vertices.', 'Easy', 'Data mid.pdf', 1),
  makeQuestion('DS-ENR-002', 'subj-datastruct', 'quiz-subj-datastruct-final',
    'In a max-heap of size N, what is the time complexity to extract the maximum element and restore the heap property?',
    'O(log N)', 'O(1)', 'O(N)', 'O(N log N)', 'a',
    'Extracting the root takes O(1), but swapping the last element to the root and sift-down (heapify) takes O(log N).', 'Medium', 'Final #1.pdf', 2)
];

// =========================================================================
// 4. MERGE AND REBUILD DATABASE
// =========================================================================

// Combine questions: keep all existing untouched, plus moved questions with updated subjectIds, plus replacements and extras
const otherQuestions = db.questions.filter(q => q.subjectId !== 'subj-cpp' && q.subjectId !== 'subj-calc1');

const finalQuestions = [
  ...otherQuestions,
  ...cleanCppQuestions,
  ...pureCppReplacements,
  ...cleanCalc1Questions,
  ...pureCalc1Replacements,
  ...cppToMove, // now has subjectId = 'subj-oop'
  ...calc1ToMove, // now has subjectId = 'subj-calc2'
  ...extraQuestions
];

db.questions = finalQuestions;
db.lastUpdated = new Date().toISOString();

// Recalculate stats for subjects and quizzes
const subjectMap = new Map();
db.subjects.forEach(s => {
  s.questionCount = 0;
  s.verifiedQuestionCount = 0;
  s.reviewQuestionCount = 0;
  subjectMap.set(s.id, s);
});

const quizMap = new Map();
db.quizzes.forEach(q => {
  q.questionCount = 0;
  q.verifiedCount = 0;
  quizMap.set(q.id, q);
});

db.questions.forEach(q => {
  const subj = subjectMap.get(q.subjectId);
  if (subj) {
    subj.questionCount++;
    if (q.status === 'Verified') subj.verifiedQuestionCount++;
    else subj.reviewQuestionCount++;
  }
  const qz = quizMap.get(q.quizId);
  if (qz) {
    qz.questionCount++;
    if (q.status === 'Verified') qz.verifiedCount++;
  }
});

// Update overall metadata
db.stats = {
  totalSubjects: db.subjects.length,
  activeSubjects: db.subjects.length,
  totalQuizzes: db.quizzes.length,
  activeQuizzes: db.quizzes.length,
  totalQuestions: db.questions.length,
  verifiedQuestions: db.questions.filter(q => q.status === 'Verified').length,
  reviewQuestions: db.questions.filter(q => q.status !== 'Verified').length,
  lastUpdated: db.lastUpdated
};

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');

console.log(`\nReorganization Complete!`);
console.log(`Final Question Count: ${db.questions.length}`);
console.log(`C++ Questions: ${db.subjects.find(s => s.id === 'subj-cpp').questionCount}`);
console.log(`OOP Questions: ${db.subjects.find(s => s.id === 'subj-oop').questionCount}`);
console.log(`Calc 1 Questions: ${db.subjects.find(s => s.id === 'subj-calc1').questionCount}`);
console.log(`Calc 2 Questions: ${db.subjects.find(s => s.id === 'subj-calc2').questionCount}`);
console.log(`Networks Questions: ${db.subjects.find(s => s.id === 'subj-networks1').questionCount}`);
console.log(`Circuits 1 Questions: ${db.subjects.find(s => s.id === 'subj-circuits1').questionCount}`);
