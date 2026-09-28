/**
 * Master Academic Question Bank - Engineering Laboratories
 * Language: English (as in university syllabus and original exam files)
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

const engineeringLabsQuestions = [
  // ==========================================
  // CIRCUITS LAB (EE201L) - ENGLISH
  // ==========================================
  makeQ('LAB-CIRC-MID-001', 'subj-lab-circuits', midOf('subj-lab-circuits'), 'When measuring an unknown electric current with a digital multimeter (DMM), how must the multimeter be inserted into the circuit?', 'In series with the component whose current is being measured', 'In parallel across the component', 'Connected directly between power supply terminals', 'Connected to the ground probe only', 'a', 'Current flows through the meter, so the ammeter must be inserted in series, presenting very low internal impedance.', 'Easy', null, 'ميد شاشات لاب سيركت 1.pdf.pdf', 1),
  makeQ('LAB-CIRC-MID-002', 'subj-lab-circuits', midOf('subj-lab-circuits'), 'On an oscilloscope display, if a sinusoidal waveform occupies 4 vertical divisions at 2 V/div, what is its peak-to-peak voltage (V_pp)?', '8 V_pp', '4 V_pp', '16 V_pp', '2 V_pp', 'a', 'Peak-to-peak voltage V_pp = (Number of vertical divisions) * (Volts/Div) = 4 div * 2 V/div = 8 V.', 'Easy', null, 'ميد شاشات لاب سيركت 1.pdf.pdf', 2),
  makeQ('LAB-CIRC-FIN-001', 'subj-lab-circuits', finalOf('subj-lab-circuits'), 'In an experimental RC transient circuit, the time constant τ is determined as the time required for capacitor voltage to charge to approximately what percentage of its final DC value?', '63.2%', '50.0%', '70.7%', '99.0%', 'a', 'V_c(t) = V_s(1 - e^(-t/τ)). At t = τ: 1 - e^(-1) = 1 - 0.368 = 0.632 (63.2%).', 'Easy', null, 'فاينل شاشات لاب سيركت 2.pdf', 1),
  makeQ('LAB-CIRC-FIN-002', 'subj-lab-circuits', finalOf('subj-lab-circuits'), 'When determining the Thevenin equivalent experimentally in the lab, the open-circuit voltage Voc = 12 V and short-circuit current Isc = 3 mA are measured. What is Rth?', '4 kΩ', '36 kΩ', '0.25 kΩ', '15 kΩ', 'a', 'By Ohm\'s law, Rth = Voc / Isc = 12 V / 0.003 A = 4000 Ω = 4 kΩ.', 'Medium', null, 'فاينل شاشات لاب سيركت 2.pdf', 2),

  // ==========================================
  // DIGITAL LOGIC LAB (EE211L) - ENGLISH
  // ==========================================
  makeQ('LAB-LOGIC-MID-001', 'subj-lab-logic', midOf('subj-lab-logic'), 'In the digital logic laboratory, which standard 74xx TTL integrated circuit provides four 2-input Quad NAND gates?', '7400 IC', '7408 IC', '7432 IC', '7404 IC', 'a', 'The 7400 is the industry-standard Quad 2-input NAND gate IC.', 'Easy', null, 'Lab Logic Exam.pdf', 1),
  makeQ('LAB-LOGIC-MID-002', 'subj-lab-logic', midOf('subj-lab-logic'), 'Refer to the test setup diagram shown below. Identify the circuit function implemented by the multiplexer configuration:', '2-to-1 Multiplexer Function F = S\'·A + S·B', 'Full Subtractor Logic', '3-bit Binary Counter', 'Odd Parity Generator', 'a', 'The circuit diagram demonstrates standard multiplexer data routing where select input S steers channel A or channel B to output F.', 'Medium', '/images/questions/Mid Lab Logic 4.jpg', 'Mid Lab Logic 4.jpg', 1),
  makeQ('LAB-LOGIC-FIN-001', 'subj-lab-logic', finalOf('subj-lab-logic'), 'Which standard TTL IC is a 3-to-8 line decoder with active-low outputs commonly used in memory address decoding experiments?', '74138 IC', '74151 IC', '74153 IC', '7483 IC', 'a', 'The 74138 is a 3-to-8 decoder with active-low outputs and multiple enable pins.', 'Easy', null, 'Final Lab Logic #1.pdf', 1),
  makeQ('LAB-LOGIC-FIN-002', 'subj-lab-logic', finalOf('subj-lab-logic'), 'Refer to the circuit schematic shown below. Analyze the decoder outputs connected to the active-low OR gate to determine the final minimized SOP function F:', 'F = Σm(1, 3, 5, 7)', 'F = Σm(0, 2, 4, 6)', 'F = ΠM(1, 2, 3)', 'F = A ⊕ B ⊕ C', 'a', 'Connecting active-low minterm outputs of a decoder to a NAND or negative-input OR gate directly forms the standard Sum-Of-Products logic function.', 'Medium', '/images/questions/Final Lab Logic 4.jpg', 'Final Lab Logic 4.jpg', 1),

  // ==========================================
  // ELECTRONICS LAB (EE301L) - ENGLISH
  // ==========================================
  makeQ('LAB-ELEC-MID-001', 'subj-lab-electronics', midOf('subj-lab-electronics'), 'When verifying silicon diode characteristics on an oscilloscope, what is the observed forward voltage drop (knee voltage) at moderate forward currents?', '~0.7 V', '~0.2 V', '~1.5 V', '~3.3 V', 'a', 'Standard silicon diodes exhibit an approximate 0.7 V turn-on barrier voltage in lab measurements.', 'Easy', null, 'Mid 2020-2021.pdf', 1),
  makeQ('LAB-ELEC-MID-002', 'subj-lab-electronics', midOf('subj-lab-electronics'), 'In a bridge rectifier lab experiment with an AC input of 12 V_rms, what is the approximate peak DC output voltage across the load (accounting for diode drops)?', '15.6 V', '12.0 V', '17.0 V', '10.6 V', 'a', 'V_peak = 12 * √2 ≈ 16.97 V. In a bridge rectifier, two diodes conduct simultaneously: V_out_peak = 16.97 - 2(0.7) = 15.57 V ≈ 15.6 V.', 'Medium', null, 'Mid 2020-2021.pdf', 2),
  makeQ('LAB-ELEC-FIN-001', 'subj-lab-electronics', finalOf('subj-lab-electronics'), 'In a Common-Emitter BJT amplifier circuit, what is the phase relationship between the input AC voltage signal and the output AC voltage signal at the collector?', '180° out of phase (inverted)', 'In phase (0° shift)', '90° leading phase shift', '90° lagging phase shift', 'a', 'Common-Emitter amplifiers produce an inherent 180° phase inversion between base AC input and collector AC output.', 'Easy', null, 'Final 2020-2021.pdf', 1),
  makeQ('LAB-ELEC-FIN-002', 'subj-lab-electronics', finalOf('subj-lab-electronics'), 'When measuring the ripple voltage of a power supply filter capacitor with an oscilloscope, the oscilloscope input coupling switch should be set to:', 'AC Coupling (blocks DC component to view small ripple amplitude)', 'DC Coupling at 20 V/div', 'GND coupling', '50 Ω termination', 'a', 'AC coupling blocks large DC average voltages, allowing the oscilloscope vertical gain to be increased to measure millivolt ripple accurately.', 'Medium', null, 'Final 2020-2021.pdf', 2),

  // ==========================================
  // DATA STRUCTURES LAB (CS212L) - ENGLISH
  // ==========================================
  makeQ('LAB-DS-MID-001', 'subj-lab-datastruct', midOf('subj-lab-datastruct'), 'In C++, what is the correct syntax to allocate a new node with data value 42 on the heap for a singly linked list?', 'Node *newNode = new Node(42);', 'Node newNode = malloc(sizeof(Node));', 'Node *newNode = &Node(42);', 'Node newNode = new Node(42);', 'a', 'Heap allocation in modern C++ uses the new operator returning a pointer to the newly constructed object.', 'Easy', null, 'Data Struct. Mid Exam.pdf', 1),
  makeQ('LAB-DS-MID-002', 'subj-lab-datastruct', midOf('subj-lab-datastruct'), 'When evaluating the postfix arithmetic expression "5 3 + 2 *" using a stack, what is the final calculated value?', '16', '11', '25', '10', 'a', 'Push 5, Push 3. Encounter \'+\': pop 3 and 5, push 5+3=8. Push 2. Encounter \'*\': pop 2 and 8, push 8*2=16.', 'Easy', null, 'Data Struct. Mid Exam.pdf', 2),
  makeQ('LAB-DS-FIN-001', 'subj-lab-datastruct', finalOf('subj-lab-datastruct'), 'What is the correct base condition in a recursive function to compute the height of a Binary Search Tree (BST) when root is NULL?', 'if (root == nullptr) return -1; (or 0)', 'if (root == nullptr) return 1;', 'if (root->left == nullptr) return root->data;', 'while (root != nullptr) height++;', 'a', 'Empty tree base case returns -1 (for edge-based height) or 0 (for node-based height).', 'Easy', null, 'FINAL ALGORITHMS.pdf', 1),
  makeQ('LAB-DS-FIN-002', 'subj-lab-datastruct', finalOf('subj-lab-datastruct'), 'In a circular array implementation of a queue with capacity 8, if front = 4 and rear = 2, how many elements are currently in the queue?', '6 elements', '2 elements', '8 elements', '4 elements', 'a', 'Count = (rear - front + capacity) % capacity = (2 - 4 + 8) % 8 = 6 elements.', 'Medium', null, 'FINAL ALGORITHMS.pdf', 2),

  // ==========================================
  // ASSEMBLY LAB (CS221L) - ENGLISH
  // ==========================================
  makeQ('LAB-ASM-MID-001', 'subj-lab-assembly', midOf('subj-lab-assembly'), 'In 8086 DOS programming, which DOS interrupt service is invoked to print a \'$\'-terminated string located at DX to the console?', 'MOV AH, 09h followed by INT 21h', 'MOV AH, 02h followed by INT 10h', 'MOV AH, 01h followed by INT 21h', 'MOV AH, 4Ch followed by INT 20h', 'a', 'DOS service AH = 09h of INT 21h prints a string whose offset is in DX, terminated by \'$\'.', 'Easy', null, 'Final Lab Assembly 2023.pdf', 1),
  makeQ('LAB-ASM-MID-002', 'subj-lab-assembly', midOf('subj-lab-assembly'), 'Which instruction sequence properly terminates an assembly program and returns control cleanly to the DOS command prompt?', 'MOV AX, 4C00h followed by INT 21h', 'INT 20h without registers', 'MOV AH, 00h followed by INT 16h', 'HLT', 'a', 'Function 4Ch of INT 21h exits with return code (AL), cleanly terminating execution.', 'Easy', null, 'Final Lab Assembly 2023.pdf', 2),
  makeQ('LAB-ASM-FIN-001', 'subj-lab-assembly', finalOf('subj-lab-assembly'), 'What is the content of AL after executing the following instructions?\n\nMOV AL, 5\nADD AL, 3\nSUB AL, 2', '6', '8', '10', '4', 'a', '5 + 3 = 8; 8 - 2 = 6.', 'Easy', null, 'Final Lab Assembly 2024.pdf', 1),
  makeQ('LAB-ASM-FIN-002', 'subj-lab-assembly', finalOf('subj-lab-assembly'), 'In an assembly array summation routine, which register is commonly used as a pointer/index into memory elements in x86?', 'ESI (Source Index) or EDI (Destination Index)', 'CS (Code Segment)', 'FLAGS register', 'SS (Stack Segment)', 'a', 'ESI and EDI are standard 32-bit index registers designed for string and memory array traversals.', 'Easy', null, 'Final Lab Assembly 2024.pdf', 2),

  // ==========================================
  // ARCHITECTURE LAB (CS322L) - ENGLISH
  // ==========================================
  makeQ('LAB-ARCH-MID-001', 'subj-lab-arch', midOf('subj-lab-arch'), 'In processor simulation tools (like Logisim or ModelSim), what is the function of a Program Counter (PC)?', 'A register that holds the memory address of the next instruction to be fetched and executed', 'An accumulator that stores ALU results', 'A clock generator circuit', 'A stack pointer for function returns', 'a', 'The Program Counter holds the memory address of the next instruction in sequence.', 'Easy', null, 'Mid Exam.pdf', 1),
  makeQ('LAB-ARCH-MID-002', 'subj-lab-arch', midOf('subj-lab-arch'), 'In a single-cycle MIPS datapath simulation, how many clock cycles does each instruction take to execute?', '1 clock cycle', '5 clock cycles', '3 clock cycles', 'Varies by opcode', 'a', 'In a single-cycle datapath, the clock cycle period is fixed to accommodate the slowest instruction, taking exactly 1 long cycle per instruction.', 'Easy', null, 'Mid Exam.pdf', 2),
  makeQ('LAB-ARCH-FIN-001', 'subj-lab-arch', finalOf('subj-lab-arch'), 'In a 4-bit ALU simulation, which control signal typically selects between addition and subtraction?', 'Invert B input and set Carry-In Cin = 1 (2\'s complement subtraction)', 'Swap inputs A and B', 'Clear all registers to zero', 'Enable clock gating', 'a', 'Subtraction A - B is computed as A + (~B) + 1, implemented by inverting B and setting Cin = 1.', 'Medium', null, 'Final Exam.pdf', 1),
  makeQ('LAB-ARCH-FIN-002', 'subj-lab-arch', finalOf('subj-lab-arch'), 'When designing an Instruction Memory module in logic simulators, the memory address input is typically connected directly to:', 'Program Counter (PC) output', 'ALU Zero flag', 'Data Memory write port', 'Register File write register index', 'a', 'Instruction fetch requires providing the PC value as the address input to Instruction Memory.', 'Easy', null, 'Final Exam.pdf', 2),

  // ==========================================
  // PHYSICS LAB (PHYS101L) - ENGLISH
  // ==========================================
  makeQ('LAB-PHYS-MID-001', 'subj-lab-physics', midOf('subj-lab-physics'), 'When using a Vernier caliper, if the main scale reads 12 mm and the 6th Vernier division aligns (with resolution 0.05 mm), what is the total measured reading?', '12.30 mm', '12.06 mm', '12.60 mm', '18.00 mm', 'a', 'Reading = Main Scale + (Aligned Division * Resolution) = 12 mm + (6 * 0.05 mm) = 12 mm + 0.30 mm = 12.30 mm.', 'Easy', null, 'MID-Lab1B.pdf', 1),
  makeQ('LAB-PHYS-MID-002', 'subj-lab-physics', midOf('subj-lab-physics'), 'In the simple pendulum lab experiment, what is the formula relating the period T to pendulum length L and gravitational acceleration g?', 'T = 2π √(L / g)', 'T = 2π √(g / L)', 'T = (1/2π) √(L / g)', 'T = 4π² L / g', 'a', 'The period of a simple pendulum for small oscillations is T = 2π √(L/g).', 'Easy', null, 'MID-Lab1B.pdf', 2),
  makeQ('LAB-PHYS-FIN-001', 'subj-lab-physics', finalOf('subj-lab-physics'), 'In a force table experiment, three concurrent coplanar forces are in static equilibrium. The vector sum of the three forces must equal:', 'Zero vector (ΣF = 0)', 'The equilibrant force doubled', 'The acceleration multiplied by mass', 'A 45° resultant', 'a', 'Static equilibrium requires the net vector sum of all forces acting at the center ring to be identically zero: ΣFx = 0, ΣFy = 0.', 'Easy', null, 'Final Lab Physics.pdf', 1),
  makeQ('LAB-PHYS-FIN-002', 'subj-lab-physics', finalOf('subj-lab-physics'), 'When plotting T² (period squared) versus L (pendulum length), the resulting graph is a straight line whose slope is equal to:', '4π² / g', 'g / (4π²)', '2π / g', 'g / (2π)', 'a', 'Squaring T = 2π√(L/g) gives T² = (4π²/g) * L. Thus the slope is 4π²/g.', 'Medium', null, 'Final Lab Physics.pdf', 2),

  // ==========================================
  // CHEMISTRY LAB (CHEM101L) - ENGLISH
  // ==========================================
  makeQ('LAB-CHEM-MID-001', 'subj-lab-chemistry', midOf('subj-lab-chemistry'), 'In an acid-base titration experiment, what indicator is commonly used to observe the endpoint transition between colorless in acid and pink in basic solution?', 'Phenolphthalein', 'Methyl orange', 'Litmus paper', 'Universal indicator', 'a', 'Phenolphthalein is clear in acidic and neutral solutions and turns distinct pink around pH 8.2–10.0.', 'Easy', null, 'Chemical Lab ( Mid ).pdf', 1),
  makeQ('LAB-CHEM-MID-002', 'subj-lab-chemistry', midOf('subj-lab-chemistry'), 'Which volumetric glassware provides the highest volumetric precision for dispensing variable volumes of titrant liquid?', 'Burette', 'Beaker', 'Erlenmeyer Flask', 'Graduated Cylinder', 'a', 'A burette is calibrated to dispense finely controlled volumes with readability up to ±0.01 mL.', 'Easy', null, 'Chemical Lab ( Mid ).pdf', 2),
  makeQ('LAB-CHEM-FIN-001', 'subj-lab-chemistry', finalOf('subj-lab-chemistry'), 'In a titration, 25.0 mL of unknown HCl is neutralized by 20.0 mL of 0.100 M NaOH standard solution. What is the molarity of the HCl solution?', '0.080 M', '0.125 M', '0.100 M', '0.050 M', 'a', 'M_acid * V_acid = M_base * V_base => M_acid * 25.0 mL = 0.100 M * 20.0 mL => M_acid = 2.00 / 25.0 = 0.080 M.', 'Medium', null, 'لاب-كيمياء-١-مع-حل.pdf', 1),
  makeQ('LAB-CHEM-FIN-002', 'subj-lab-chemistry', finalOf('subj-lab-chemistry'), 'When heating crucible contents using a Bunsen burner in an empirical formula experiment, the crucible lid is kept slightly ajar in order to:', 'Allow oxygen to enter while preventing ash and oxide smoke from escaping', 'Accelerate evaporation of the porcelain material', 'Cool the crucible bottom', 'Prevent condensation on the clay triangle', 'a', 'Ajar lid allows atmospheric oxygen into the crucible to oxidize magnesium while containing spattering and oxide particulates.', 'Easy', null, 'لاب-كيمياء-١-مع-حل.pdf', 2),

  // ==========================================
  // CONTROL LAB (EE411L) - ENGLISH
  // ==========================================
  makeQ('LAB-CTRL-MID-001', 'subj-lab-control', midOf('subj-lab-control'), 'In MATLAB/Simulink control system modeling, which built-in function creates a continuous-time transfer function object from numerator and denominator polynomial vectors?', 'tf(num, den)', 'step(sys)', 'pzmap(sys)', 'bode(sys)', 'a', 'tf(num, den) creates a transfer function model in MATLAB (e.g. sys = tf([1], [1, 2, 1])).', 'Easy', null, 'Control Lab Final 2024-2025.pdf', 1),
  makeQ('LAB-CTRL-MID-002', 'subj-lab-control', midOf('subj-lab-control'), 'When analyzing a second-order underdamped step response in the lab, the Peak Time (Tp) is observed at 0.5 s. The damped natural frequency ω_d is:', '2π rad/s (≈ 6.28 rad/s)', 'π rad/s', '4π rad/s', '1 rad/s', 'a', 'Peak time formula is Tp = π / ω_d => ω_d = π / Tp = π / 0.5 = 2π rad/s.', 'Medium', null, 'Control Lab Final 2024-2025.pdf', 2),
  makeQ('LAB-CTRL-FIN-001', 'subj-lab-control', finalOf('subj-lab-control'), 'In MATLAB control system toolbox, which command generates the root locus plot of a linear open-loop system?', 'rlocus(sys)', 'nyquist(sys)', 'margin(sys)', 'lsim(sys, u, t)', 'a', 'The rlocus(sys) command computes and plots the trajectories of the closed-loop poles as gain K varies from 0 to infinity.', 'Easy', null, 'Control Lab Final 2024-2025.pdf', 1),
  makeQ('LAB-CTRL-FIN-002', 'subj-lab-control', finalOf('subj-lab-control'), 'On a Bode plot generated in MATLAB, Phase Margin (PM) is measured at the frequency where the open-loop magnitude curve crosses:', '0 dB (gain crossover frequency)', '-3 dB', '-20 dB', '+10 dB', 'a', 'Phase margin is defined as PM = 180° + ∠G(jω_gc) evaluated at the gain crossover frequency where |G(jω)| = 0 dB (gain of 1).', 'Medium', null, 'Control Lab Final 2024-2025.pdf', 2)
];

module.exports = { engineeringLabsQuestions };
