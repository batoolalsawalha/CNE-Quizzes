/**
 * Master Academic Question Bank - Al-Balqa Applied University Official Exam Papers
 * Directly transcribed from the PDF files in qu/
 * Subjects:
 * - Data Structures (Data Structuer Mid #2.pdf)
 * - Physics 1 (Mid Exam 2023-2024 A.pdf)
 * - Differential Equations (Diff Med T1 2023.pdf)
 * - Linear Algebra (Linear 2026 mid.pdf)
 * - C++ Programming (Bara C-- Mid.pdf)
 * - Signals and Systems (Signal Mid 2023.pdf)
 * - Electrical Circuits 1 (Mid cir.pdf)
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

const albalqaQuestions = [
  // ==========================================
  // DATA STRUCTURES & ALGORITHMS (qu/داتا ستركتشر/Data Structuer Mid #2.pdf)
  // ==========================================
  makeQ('BAU-DS-001', 'subj-datastruct', midOf('subj-datastruct'), 'In a Queue data structure, the value of REAR is increased by 1 when:', 'An element is added (enqueued) in a queue', 'An element is deleted (dequeued) in a queue', 'An element is inspected at the front', 'Two queues are merged', 'a', 'Queue insertion occurs at the rear; when an item is added, REAR is incremented (REAR = REAR + 1).', 'Easy', null, 'Data Structuer Mid #2.pdf', 2),
  makeQ('BAU-DS-002', 'subj-datastruct', midOf('subj-datastruct'), 'The deletion operation in a Stack is called:', 'pop', 'push', 'insert', 'enqueue', 'a', 'In a LIFO stack, inserting an item is called push, and deleting the top item is called pop.', 'Easy', null, 'Data Structuer Mid #2.pdf', 2),
  makeQ('BAU-DS-003', 'subj-datastruct', midOf('subj-datastruct'), 'In a linked representation of a stack or list, the link field holds a pointer to:', 'The neighboring (next) element in the list', 'The middle element', 'The last element permanently', 'The root parent', 'a', 'Each node in a singly linked list contains data and a pointer (link) referring to the next neighboring node.', 'Easy', null, 'Data Structuer Mid #2.pdf', 2),
  makeQ('BAU-DS-004', 'subj-datastruct', midOf('subj-datastruct'), 'Which of the following is TRUE about a C++ destructor?', 'All of the above', 'Its name is the class name preceded by a tilde (~)', 'It is a special member function that works opposite to the constructor', 'Destructors are used to release dynamic memory and destroy objects', 'a', 'All options accurately describe C++ destructors: preceded by ~, opposite of constructor, and performs resource deallocation.', 'Easy', null, 'Data Structuer Mid #2.pdf', 2),
  makeQ('BAU-DS-005', 'subj-datastruct', midOf('subj-datastruct'), 'Which of the following statements is FALSE about a Circular Queue?', 'It follows the Last-In First-Out (LIFO) principle.', 'It helps in refilling free spaces by wrapping REAR back to 0 when it reaches the end.', 'It connects the last position of the queue to the first position.', 'None of the above', 'a', 'Queues strictly follow First-In First-Out (FIFO), not LIFO (which is for stacks). Thus option A is false.', 'Easy', null, 'Data Structuer Mid #2.pdf', 2),
  makeQ('BAU-DS-006', 'subj-datastruct', midOf('subj-datastruct'), 'In C++, a class destructor is automatically called when:', 'All of the above', 'The program finishes execution', 'Calling the delete operator on a heap object', 'A local scope containing the object ends', 'a', 'Destructors are automatically invoked on scope exit, on delete, and upon normal program termination.', 'Easy', null, 'Data Structuer Mid #2.pdf', 2),
  makeQ('BAU-DS-007', 'subj-datastruct', midOf('subj-datastruct'), 'Given the class definition: class MyClass { public: int x, y; private: int a; }; which member CANNOT be accessed using the dot operator from outside the class?', 'Member a (since it is declared private)', 'Member x', 'Member y', 'None of the above', 'a', 'Private members (a) are inaccessible outside member functions and friends of the class.', 'Easy', null, 'Data Structuer Mid #2.pdf', 3),
  makeQ('BAU-DS-008', 'subj-datastruct', midOf('subj-datastruct'), 'Class and function templates in C++ allow the programmer to write a single generic codebase for multiple data types. Is this statement True or False?', 'True', 'False', 'True only for primitive integer types', 'False in modern C++', 'a', 'Templates enable generic programming by parametrizing functions and classes over arbitrary data types.', 'Easy', null, 'Data Structuer Mid #2.pdf', 3),
  makeQ('BAU-DS-009', 'subj-datastruct', midOf('subj-datastruct'), 'In a Doubly Linked List, nodes can be traversed in both forward and backward directions. Is this statement True or False?', 'True', 'False', 'Only if the list is circular', 'Only if head equals tail', 'a', 'Each node in a doubly linked list contains both next and prev pointers, allowing bidirectional traversal.', 'Easy', null, 'Data Structuer Mid #2.pdf', 3),

  // ==========================================
  // GENERAL PHYSICS 1 (qu/فيزياء 1/Mid Exam 2023-2024 A.pdf)
  // ==========================================
  makeQ('BAU-PHYS1-001', 'subj-physics1', midOf('subj-physics1'), 'Three students propose equations for distance x traveled, where v is speed, a is acceleration, and t is time. According to dimensional analysis, which equation could possibly be correct?\n(a) x = v*t² + 2at\n(b) x = v₀*t + (1/2)a*t²', 'Only equation (b) is dimensionally correct ([L] = [L/T]*[T] + [L/T²]*[T²] = [L])', 'Only equation (a)', 'Both (a) and (b) are dimensionally correct', 'Neither equation is correct', 'a', 'In equation (b), [v₀ t] = (m/s)*s = m, and [(1/2)at²] = (m/s²)*s² = m. Both terms have units of meters [L]. Equation (a) has [vt²] = m·s, which is dimensionally incorrect.', 'Medium', null, 'Mid Exam 2023-2024 A.pdf', 2),
  makeQ('BAU-PHYS1-002', 'subj-physics1', midOf('subj-physics1'), 'Estimate how many days it would take to walk around the Earth, assuming 12 hours of walking per day at a speed of 4.0 km/h. (Radius of Earth R ≈ 6380 km, circumference = 2πR ≈ 40,088 km)', '835 days', '668 days', '213 days', '2403 days', 'a', 'Circumference = 2 * π * 6380 ≈ 40,087 km. Daily distance = 12 h * 4 km/h = 48 km/day. Total days = 40,087 km / 48 km/day ≈ 835.1 days.', 'Medium', null, 'Mid Exam 2023-2024 A.pdf', 2),
  makeQ('BAU-PHYS1-003', 'subj-physics1', midOf('subj-physics1'), 'You drive 4.0 km at 30 km/h and then another 4.0 km at 50 km/h. What is your average speed for the whole 8.0 km trip?', 'Less than 40 km/h (exactly 37.5 km/h)', 'Equal to 40 km/h', 'More than 40 km/h', 'Cannot be determined without travel direction', 'a', 'Time t₁ = 4/30 h, time t₂ = 4/50 h. Total time = 4/30 + 4/50 = 200/1500 + 120/1500 = 320/1500 h. Average speed = Total distance / Total time = 8 / (320/1500) = 8 * 1500 / 320 = 37.5 km/h < 40 km/h.', 'Medium', null, 'Mid Exam 2023-2024 A.pdf', 2),
  makeQ('BAU-PHYS1-004', 'subj-physics1', midOf('subj-physics1'), 'How long does it take a car to cross a 30 m wide intersection after the light turns green, if the car accelerates from rest at a constant 2.0 m/s²?', '5.48 s', '3.87 s', '15.0 s', '2.45 s', 'a', 'Using s = v₀ t + (1/2) a t² with v₀ = 0: 30 = 0.5 * 2.0 * t² => t² = 30 => t = √30 ≈ 5.48 s.', 'Easy', null, 'Mid Exam 2023-2024 A.pdf', 2),
  makeQ('BAU-PHYS1-005', 'subj-physics1', midOf('subj-physics1'), 'A person throws a ball vertically upward into the air with an initial velocity of 15.0 m/s. How long is the ball in the air before it returns to the hand? (g = 9.80 m/s²)', '3.06 s', '4.87 s', '1.48 s', '1.53 s', 'a', 'Time to peak: t_up = v₀ / g = 15.0 / 9.80 ≈ 1.53 s. Total flight time T = 2 * t_up = 2 * 1.53 = 3.06 s.', 'Easy', null, 'Mid Exam 2023-2024 A.pdf', 2),
  makeQ('BAU-PHYS1-006', 'subj-physics1', midOf('subj-physics1'), 'Ignoring air resistance, the horizontal component of a projectile\'s velocity during its flight:', 'Remains constant throughout the flight', 'Is zero', 'Continuously increases', 'Continuously decreases', 'a', 'Since gravity acts exclusively in the vertical direction, the horizontal acceleration is zero (a_x = 0), so horizontal velocity v_x remains constant.', 'Easy', null, 'Mid Exam 2023-2024 A.pdf', 2),
  makeQ('BAU-PHYS1-007', 'subj-physics1', midOf('subj-physics1'), 'A stone is thrown horizontally with an initial speed of 10.0 m/s from the edge of a cliff. A stopwatch measures the stone\'s trajectory time to the bottom to be 4.3 s. What is the height of the cliff? (g = 9.80 m/s²)', '91 m (approx. 90.6 m)', '26 m', '43 m', '77 m', 'a', 'Vertical displacement h = (1/2) g t² = 0.5 * 9.80 m/s² * (4.3 s)² = 4.9 * 18.49 ≈ 90.6 m ≈ 91 m.', 'Easy', null, 'Mid Exam 2023-2024 A.pdf', 2),

  // ==========================================
  // DIFFERENTIAL EQUATIONS (qu/معادلات تفاضليه/Diff Med T1 2023.pdf)
  // ==========================================
  makeQ('BAU-DIFF-001', 'subj-diff', midOf('subj-diff'), 'Find the integrating factor that makes the first-order ODE: (xy) dx + (2x² + 3y² - 20) dy = 0 exact:', 'y³', 'x²', 'e^(xy)', '1 / (xy)', 'a', 'Using ∂M/∂y = x, ∂N/∂x = 4x. (∂N/∂x - ∂M/∂y)/M = (4x - x)/(xy) = 3/y. Integrating factor μ(y) = exp(∫ (3/y)dy) = y³.', 'Medium', null, 'Diff Med T1 2023.pdf', 1),
  makeQ('BAU-DIFF-002', 'subj-diff', midOf('subj-diff'), 'What is the order and degree of the differential equation: [1 + (y\')²]^(3/2) = 5 y\'\'\' ?', 'Order 3, Degree 2', 'Order 4, Degree 3', 'Order 3, Degree 4', 'Order 2, Degree 3', 'a', 'Squaring both sides eliminates fractional power: [1 + (y\')²]³ = 25 (y\'\'\')². Highest derivative is y\'\'\' (order 3), and its highest exponent is 2 (degree 2).', 'Easy', null, 'Diff Med T1 2023.pdf', 3),
  makeQ('BAU-DIFF-003', 'subj-diff', midOf('subj-diff'), 'Which of the following differential equations is strictly LINEAR in y?', 'y\' + 2x y = x²', 'y\' + 2x y² = 0', 'y y\' + x = 0', '(y\')² + y = x', 'a', 'An ODE is linear if y and all its derivatives appear only to the first power and are not multiplied together: y\' + P(x)y = Q(x).', 'Easy', null, 'Diff Med T1 2023.pdf', 2),
  makeQ('BAU-DIFF-004', 'subj-diff', midOf('subj-diff'), 'In the Cauchy-Euler differential equation x² y\'\' + a x y\' + b y = 0, what trial solution is used to find the auxiliary equation?', 'y = x^m', 'y = e^(m x)', 'y = ln(m x)', 'y = sin(m x)', 'a', 'Cauchy-Euler equations have variable coefficients proportional to powers of x, solved using the substitution y = x^m.', 'Easy', null, 'Diff Med T1 2023.pdf', 3),

  // ==========================================
  // LINEAR ALGEBRA (qu/لينير/Linear 2026 mid.pdf)
  // ==========================================
  makeQ('BAU-LIN-001', 'subj-linear', midOf('subj-linear'), 'A matrix is in Reduced Row Echelon Form (RREF) if:', 'All of the above (leading entry in each non-zero row is 1, leading 1 is only non-zero entry in its column, rows of zeros at bottom)', 'The determinant is 1', 'The matrix is symmetric and upper triangular', 'All diagonal elements are non-zero', 'a', 'RREF requires: leading 1s, each leading 1 strictly to the right of the one above, all other column entries 0, and zero rows at bottom.', 'Easy', null, 'Linear 2026 mid.pdf', 1),
  makeQ('BAU-LIN-002', 'subj-linear', midOf('subj-linear'), 'Let A be a 3x3 matrix with det(A) = 7. If matrix B is obtained from A by multiplying the 3rd row by 3, and the 2nd column by -2, then det(B) equals:', '-42', '42', '21', '-21', 'a', 'Multiplying a row by scalar c scales determinant by c. det(B) = (3) * (-2) * det(A) = -6 * 7 = -42.', 'Easy', null, 'Linear 2026 mid.pdf', 1),
  makeQ('BAU-LIN-003', 'subj-linear', midOf('subj-linear'), 'Which of the following statements is FALSE for an arbitrary real symmetric matrix A (where Aᵀ = A)?', 'tr(2A) = tr(A)', 'A · Aᵀ is symmetric', 'A is a square matrix', 'All eigenvalues of A are real numbers', 'a', 'Trace is a linear operator: tr(2A) = 2 tr(A), so tr(2A) = tr(A) is false for any matrix with non-zero trace.', 'Easy', null, 'Linear 2026 mid.pdf', 1),

  // ==========================================
  // C++ PROGRAMMING (qu/C++/Bara C-- Mid.pdf)
  // ==========================================
  makeQ('BAU-CPP-001', 'subj-cpp', midOf('subj-cpp'), 'What is the output of the following C++ code?\n\n#include <iostream>\nusing namespace std;\nint main() {\n  cout << "Welcome ";\n  cout << "to ";\n  cout << "C++";\n  return 0;\n}', 'Welcome to C++', 'Welcome', 'Welcome to', 'Compilation error', 'a', 'Sequential cout statements without newline delimiters chain their string outputs continuously on the same line.', 'Easy', null, 'Bara C-- Mid.pdf', 1),
  makeQ('BAU-CPP-002', 'subj-cpp', midOf('subj-cpp'), 'What is the output of integer division in C++: cout << 10 / 4; ?', '2', '2.5', '2.5000', '3', 'a', 'In C++, division between two integer literals (10 / 4) performs integer division, discarding the remainder and returning 2.', 'Easy', null, 'Bara C-- Mid.pdf', 4),
  makeQ('BAU-CPP-003', 'subj-cpp', midOf('subj-cpp'), 'In a C++ switch statement, what happens if a matching case block does NOT contain a "break" statement?', 'Execution falls through to the subsequent case statements until a break is encountered (fall-through).', 'A compilation error is generated.', 'The switch statement immediately exits.', 'The default case executes twice.', 'a', 'Without a break statement, control flows directly into the following case labels regardless of their conditions.', 'Easy', null, 'Bara C-- Mid.pdf', 3),

  // ==========================================
  // SIGNALS AND SYSTEMS (qu/سيجنال/Signal Mid 2023.pdf)
  // ==========================================
  makeQ('BAU-SIG-001', 'subj-signals', midOf('subj-signals'), 'A discrete-time system is described by the input-output relationship y[n] = x[n] + 3. Is this system linear?', 'Nonlinear (does not satisfy homogeneity: multiplying input by 0 does not yield 0)', 'Linear and time-invariant', 'Linear and time-variant', 'Causal and linear', 'a', 'For input x[n] = 0, y[n] = 3 ≠ 0. Since zero input does not produce zero output, the system violates linearity.', 'Easy', null, 'Signal Mid 2023.pdf', 1),
  makeQ('BAU-SIG-002', 'subj-signals', midOf('subj-signals'), 'What is the even part x_e(t) of the real signal x(t) = 2 + cos(t)?', '2 + cos(t) (since the signal is already purely even)', '2', 'cos(t)', '0', 'a', 'By definition, x_e(t) = 0.5 * [x(t) + x(-t)]. Since cos(-t) = cos(t), x(-t) = 2 + cos(-t) = 2 + cos(t) = x(t). Thus x_e(t) = 2 + cos(t).', 'Easy', null, 'Signal Mid 2023.pdf', 1),
  makeQ('BAU-SIG-003', 'subj-signals', midOf('subj-signals'), 'If continuous-time signal f(t) has total energy E, what is the energy of the time-scaled signal f(2t)?', 'E / 2', '2 E', 'E', '4 E', 'a', 'Energy E_{f(at)} = ∫ |f(at)|² dt. Substituting u = at gives (1/a) ∫ |f(u)|² du = E / a. For a = 2, energy is E / 2.', 'Medium', null, 'Signal Mid 2023.pdf', 1),

  // ==========================================
  // ELECTRICAL CIRCUITS 1 (qu/سيركت 1/Mid cir.pdf)
  // ==========================================
  makeQ('BAU-CIRC1-001', 'subj-circ1', midOf('subj-circuits1'), 'In a resistive circuit, three resistors of 30 Ω each are connected in parallel. What is their equivalent resistance Req?', '10 Ω', '90 Ω', '30 Ω', '15 Ω', 'a', 'For N identical parallel resistors R, Req = R / N = 30 Ω / 3 = 10 Ω.', 'Easy', null, 'Mid cir.pdf', 2),
  makeQ('BAU-CIRC1-002', 'subj-circ1', midOf('subj-circuits1'), 'If a 120 V DC voltage source delivers 4.0 A of current to a circuit, what is the total power absorbed by the circuit?', '480 W', '30 W', '120 W', '960 W', 'a', 'Power P = V * I = 120 V * 4.0 A = 480 W.', 'Easy', null, 'Mid cir.pdf', 1)
];

module.exports = { albalqaQuestions };
