/**
 * Master Academic Question Bank - Electrical & Telecommunications Engineering
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

const electricalTelecomQuestions = [
  // ==========================================
  // ELECTRICAL CIRCUITS 1 (EE201) - ENGLISH
  // ==========================================
  makeQ('CIRC1-MID-001', 'subj-circuits1', midOf('subj-circuits1'), 'A circuit element draws 15 A when connected to a 240-V line. How long does it take to consume 180 kJ?', '50 s', '5 ms', '0.5 ms', '2.67 s', 'a', 'Power P = V * I = 240 V * 15 A = 3600 W. Time t = Energy / Power = 180,000 J / 3600 W = 50 s.', 'Easy', null, 'Mid Circuit ( CH 1-4 ).pdf', 1),
  makeQ('CIRC1-MID-002', 'subj-circuits1', midOf('subj-circuits1'), 'To move charge q = 6 C from point a to point b requires -30 J. What is the potential difference Vab?', '5 V', '180 V', '-5 V', '-180 V', 'a', 'Vab = Va - Vb = W / q = 30 J / 6 C = 5 V.', 'Easy', null, 'Mid Circuit ( CH 1-4 ).pdf', 1),
  makeQ('CIRC1-MID-003', 'subj-circuits1', midOf('subj-circuits1'), 'The total charge entering a terminal is q(t) = (10 - 10 e^(-2t)) mC. The current at t = 1 s is:', '2.707 mA', '1.353 A', '-0.73 A', '0.73 A', 'a', 'Current i(t) = dq/dt = 20 e^(-2t) mA. At t = 1 s: i(1) = 20 e^(-2) = 20 / 7.389 = 2.707 mA.', 'Medium', null, 'Mid Circuit ( CH 1-4 ).pdf', 2),
  makeQ('CIRC1-MID-004', 'subj-circuits1', midOf('subj-circuits1'), 'In a single-loop circuit with a 32 V source, 4 Ω resistor, -8 V source, and 2 Ω resistor, the voltage across the 4 Ω resistor is:', '16 V', '8 V', '32 V', '-8 V', 'a', 'Applying KVL: -32 + 4I - (-8) + 2I = 0 => 6I = 24 => I = 4 A. Voltage v = 4 A * 4 Ω = 16 V.', 'Medium', null, 'Mid Circuit ( CH 1-4 ).pdf', 2),
  makeQ('CIRC1-FIN-001', 'subj-circuits1', finalOf('subj-circuits1'), 'For a resistive bridge network, Thevenin equivalent resistance Rth across terminals a-b is 2 Ω, and Vth is 6 V. The maximum power deliverable to a load RL is:', '4.5 W', '9 W', '18 W', '36 W', 'a', 'Maximum power occurs when RL = Rth = 2 Ω: Pmax = (Vth)² / (4 * Rth) = (6)² / (4 * 2) = 36 / 8 = 4.5 W.', 'Medium', null, 'Circuits_I_Final_Exam_Solutions.pdf', 1),
  makeQ('CIRC1-FIN-002', 'subj-circuits1', finalOf('subj-circuits1'), 'Under DC steady-state conditions, an ideal inductor behaves as a(n):', 'Short circuit', 'Open circuit', 'Resistor of value L/t', 'Infinite voltage source', 'a', 'Since v_L = L (di/dt) and current is constant in DC steady state (di/dt = 0), v_L = 0 V, which is a short circuit.', 'Easy', null, 'Circuits_I_Final_Exam_Solutions.pdf', 2),

  // ==========================================
  // ELECTRICAL CIRCUITS 2 (EE202) - ENGLISH
  // ==========================================
  makeQ('CIRC2-MID-001', 'subj-circuits2', midOf('subj-circuits2'), 'The phasor representation of the sinusoidal voltage v(t) = 100 cos(50t - 45°) V in polar form is:', '100 ∠ -45° V', '100 ∠ +45° V', '50 ∠ -45° V', '70.7 ∠ 0° V', 'a', 'The phasor domain transform of V_m cos(ωt + θ) is V_m ∠ θ. Thus v(t) becomes 100 ∠ -45° V.', 'Easy', null, 'Circuit 2 Mid 2023.pdf', 1),
  makeQ('CIRC2-MID-002', 'subj-circuits2', midOf('subj-circuits2'), 'What is the impedance of an ideal capacitor C = 100 μF at an operating angular frequency ω = 1000 rad/s?', '-j 10 Ω', '+j 10 Ω', '-j 0.1 Ω', '10 Ω', 'a', 'Impedance Z_C = 1 / (j ω C) = -j / (1000 * 100 x 10⁻⁶) = -j / 0.1 = -j 10 Ω.', 'Easy', null, 'Circuit 2 Mid 2023.pdf', 2),
  makeQ('CIRC2-FIN-001', 'subj-circuits2', finalOf('subj-circuits2'), 'In a balanced three-phase Wye (Y) connected source, the relationship between line voltage V_L and phase voltage V_p is:', 'V_L = √3 * V_p (leading by 30°)', 'V_L = V_p', 'V_L = V_p / √3', 'V_L = 3 * V_p', 'a', 'In a balanced Wye configuration, the magnitude of the line-to-line voltage is √3 times the phase voltage, with a 30° phase lead.', 'Medium', null, 'Final Circuit 2 T2.2023.pdf', 1),
  makeQ('CIRC2-FIN-002', 'subj-circuits2', finalOf('subj-circuits2'), 'In a series RLC resonant circuit, the resonant frequency ω₀ is given by:', 'ω₀ = 1 / √(L C)', 'ω₀ = √(L C)', 'ω₀ = R / (2L)', 'ω₀ = 1 / (R C)', 'a', 'Resonance occurs when the inductive and capacitive reactances cancel: ωL = 1/(ωC) => ω₀² = 1/(LC) => ω₀ = 1/√(LC).', 'Easy', null, 'Final Circuit 2 T2.2023.pdf', 2),

  // ==========================================
  // ELECTRONICS (EE301) - ENGLISH
  // ==========================================
  makeQ('ELEC-MID-001', 'subj-electronics', midOf('subj-electronics'), 'Under forward bias, the barrier potential for a standard silicon p-n junction diode at room temperature is approximately:', '0.7 V', '0.3 V', '1.1 V', '0.0 V', 'a', 'Silicon p-n junctions have a nominal built-in forward knee voltage of approximately 0.7 V at 300 K.', 'Easy', null, 'Final Electro T1.2023-2024.pdf', 1),
  makeQ('ELEC-MID-002', 'subj-electronics', midOf('subj-electronics'), 'In a Bipolar Junction Transistor (BJT), for the transistor to operate in the ACTIVE (amplification) region, the junctions must be biased as:', 'Base-Emitter forward-biased, Base-Collector reverse-biased', 'Both junctions forward-biased', 'Both junctions reverse-biased', 'Base-Emitter reverse-biased, Base-Collector forward-biased', 'a', 'The active mode of a BJT strictly requires forward biasing the BE junction and reverse biasing the BC junction.', 'Easy', null, 'Final Electro T1.2023-2024.pdf', 1),
  makeQ('ELEC-FIN-001', 'subj-electronics', finalOf('subj-electronics'), 'In an n-channel enhancement-mode MOSFET, channel conduction between drain and source begins when the gate-to-source voltage V_GS satisfies:', 'V_GS > V_th (threshold voltage)', 'V_GS < 0 V', 'V_GS = 0 V', 'V_DS < V_th', 'a', 'An enhancement-mode MOSFET has no physical channel at V_GS = 0; channel inversion only occurs when V_GS exceeds the positive threshold voltage V_th.', 'Medium', null, 'Final Electro T1.2023-2024.pdf', 2),
  makeQ('ELEC-FIN-002', 'subj-electronics', finalOf('subj-electronics'), 'A Zener diode is primarily utilized in electronic circuits for:', 'DC voltage regulation in reverse breakdown mode', 'High-frequency signal amplification', 'Half-wave AC rectification in forward bias', 'Capacitive charge storage', 'a', 'Zener diodes maintain a constant breakdown voltage across their terminals when operated in reverse breakdown, making them ideal voltage references and regulators.', 'Easy', null, 'Final Electro T1.2023-2024.pdf', 2),

  // ==========================================
  // DIGITAL LOGIC DESIGN (EE211) - ENGLISH
  // ==========================================
  makeQ('LOGIC-MID-001', 'subj-logic', midOf('subj-logic'), 'According to De Morgan\'s Laws, the logical expression (A + B)\' is equivalent to:', 'A\' · B\'', 'A\' + B\'', '(A · B)\'', 'A + B\'', 'a', 'De Morgan\'s first theorem states: the complement of a sum is equal to the product of the individual complements: (A + B)\' = A\' · B\'.', 'Easy', null, 'سنوات_ميد_لوجيك.pdf', 1),
  makeQ('LOGIC-MID-002', 'subj-logic', midOf('subj-logic'), 'How many select input lines are required for an 8-to-1 Multiplexer (MUX)?', '3 select lines', '8 select lines', '4 select lines', '2 select lines', 'a', 'For 2^n input data lines, exactly n select lines are needed. 2³ = 8, so n = 3 select lines are required.', 'Easy', null, 'سنوات_ميد_لوجيك.pdf', 1),
  makeQ('LOGIC-FIN-001', 'subj-logic', finalOf('subj-logic'), 'Which flip-flop has the characteristic equation Q(next) = D, directly capturing the input on the active clock edge?', 'D Flip-Flop', 'JK Flip-Flop', 'T Flip-Flop', 'SR Latch', 'a', 'The D (Data) flip-flop stores whatever logic level is present on the D line at the clock transition: Q_{next} = D.', 'Easy', null, 'فاينل لوجيك.pdf', 1),
  makeQ('LOGIC-FIN-002', 'subj-logic', finalOf('subj-logic'), 'In a 4-variable Karnaugh Map (K-map), grouping 8 adjacent 1s eliminates how many boolean variables?', '3 variables (leaving 1 variable)', '2 variables', '4 variables', '1 variable', 'a', 'Grouping 2^k adjacent cells in a K-map eliminates k variables. For an octet (8 cells = 2³), 3 variables are eliminated, leaving a single literal term.', 'Medium', null, 'فاينل لوجيك.pdf', 2),

  // ==========================================
  // SIGNALS AND SYSTEMS (EE311) - ENGLISH
  // ==========================================
  makeQ('SIG-MID-001', 'subj-signals', midOf('subj-signals'), 'A continuous-time system defined by y(t) = x(2t) is:', 'Linear, Time-Variant, and Non-Causal', 'Linear, Time-Invariant, and Causal', 'Non-Linear, Time-Invariant, and Causal', 'Linear, Time-Invariant, and Stable', 'a', 'Time compression x(2t) is linear, but shifting the input by t₀ produces x(2(t - t₀)) ≠ x(2t - t₀), making it time-variant. For t > 0 (e.g. t = 1, y(1) = x(2)), it relies on future input, so it is non-causal.', 'Medium', null, 'Signal Mid 2023.pdf', 1),
  makeQ('SIG-MID-002', 'subj-signals', midOf('subj-signals'), 'The convolution of any arbitrary signal x(t) with an ideal Dirac unit impulse δ(t - t₀) results in:', 'x(t - t₀)', 'x(t₀)', 'δ(t) * x(t)', '0', 'a', 'By the sifting property of convolution, convolving any function with a shifted impulse simply shifts the function by that amount: x(t) * δ(t - t₀) = x(t - t₀).', 'Easy', null, 'Signal Mid 2023.pdf', 2),
  makeQ('SIG-FIN-001', 'subj-signals', finalOf('subj-signals'), 'An LTI system with impulse response h(t) is Bounded-Input Bounded-Output (BIBO) stable if and only if:', '∫_{-∞}^∞ |h(t)| dt < ∞ (absolutely integrable)', 'h(t) = 0 for t < 0', 'The Laplace ROC excludes the imaginary axis', 'The poles are strictly on the unit circle', 'a', 'BIBO stability of a continuous-time LTI system requires the impulse response to be absolutely integrable.', 'Medium', null, 'FINAL 24-25 S1..pdf', 1),
  makeQ('SIG-FIN-002', 'subj-signals', finalOf('subj-signals'), 'The Fourier Transform of an ideal unit rectangular pulse of width T centered at t = 0 is a:', 'Sinc function: T * sinc(ω T / 2π)', 'Dirac delta function', 'Gaussian bell curve', 'Constant flat line', 'a', 'The continuous-time Fourier transform of a rectangular pulse rect(t/T) is a standard sinc function in the frequency domain.', 'Easy', null, 'FINAL 24-25 S1..pdf', 2),

  // ==========================================
  // CONTROL SYSTEMS (EE411) - ENGLISH
  // ==========================================
  makeQ('CTRL-MID-001', 'subj-control', midOf('subj-control'), 'The closed-loop transfer function T(s) of a unity feedback system with forward path gain G(s) is:', 'G(s) / [1 + G(s)]', 'G(s) / [1 - G(s)]', '1 / [1 + G(s)]', 'G(s) * [1 + G(s)]', 'a', 'For negative unity feedback: T(s) = Y(s)/R(s) = G(s) / [1 + G(s)H(s)]. With H(s) = 1, T(s) = G(s) / [1 + G(s)].', 'Easy', null, 'Mid 2023-2024 Solved.pdf', 1),
  makeQ('CTRL-MID-002', 'subj-control', midOf('subj-control'), 'In a standard second-order system s² + 2ζω_n s + ω_n² = 0, the system is CRITICALLY DAMPED when damping ratio ζ equals:', 'ζ = 1', 'ζ = 0', '0 < ζ < 1', 'ζ > 1', 'a', 'Critical damping occurs at the boundary condition ζ = 1, where both closed-loop poles are real and identical.', 'Easy', null, 'Mid 2023-2024 Solved.pdf', 2),
  makeQ('CTRL-FIN-001', 'subj-control', finalOf('subj-control'), 'According to the Routh-Hurwitz stability criterion, a closed-loop system is strictly stable if and only if:', 'All entries in the first column of the Routh array are strictly positive (no sign changes)', 'The determinant of the gain matrix is zero', 'There is at least one sign change in the first row', 'All roots of the characteristic equation lie in the right-half s-plane', 'a', 'The number of sign changes in the first column of the Routh array equals the number of roots in the right-half s-plane. Stability requires 0 roots in the RHP, meaning no sign changes.', 'Medium', null, 'اجى فاينل.pdf', 1),
  makeQ('CTRL-FIN-002', 'subj-control', finalOf('subj-control'), 'In a PID controller with transfer function C(s) = Kp + Ki/s + Kd*s, what is the primary role of the DERIVATIVE (Kd) action?', 'Anticipates future errors and improves system transient response by increasing damping', 'Eliminates steady-state error completely', 'Increases system type number', 'Reduces steady-state error to zero for step inputs', 'a', 'Derivative action Kd responds to the rate of error change, introducing lead/damping to decrease oscillations and overshoot.', 'Medium', null, 'اجى فاينل.pdf', 2),

  // ==========================================
  // TELECOMMUNICATIONS (CNE331) - ENGLISH
  // ==========================================
  makeQ('TEL-MID-001', 'subj-telecom', midOf('subj-telecom'), 'According to the Nyquist Sampling Theorem, to avoid aliasing, a continuous bandlimited signal with maximum frequency f_max must be sampled at a rate fs satisfying:', 'f_s ≥ 2 * f_max', 'f_s ≤ f_max / 2', 'f_s = f_max', 'f_s ≥ 4 * f_max²', 'a', 'The Nyquist rate is the minimum sampling rate f_s = 2 * f_max required to enable perfect signal reconstruction without spectral overlap.', 'Easy', null, 'Mid T1.2023.pdf', 1),
  makeQ('TEL-MID-002', 'subj-telecom', midOf('subj-telecom'), 'In Amplitude Modulation (AM), if the carrier amplitude is 10 V and the modulating message signal amplitude is 6 V, the modulation index μ is:', '0.6 (60%)', '1.66', '0.3', '6.0', 'a', 'The AM modulation index is defined as μ = Am / Ac = 6 V / 10 V = 0.6 (or 60%).', 'Easy', null, 'Mid T1.2023.pdf', 2),
  makeQ('TEL-FIN-001', 'subj-telecom', finalOf('subj-telecom'), 'The Shannon-Hartley theorem states that the theoretical maximum information capacity C of an AWGN channel with bandwidth B and signal-to-noise ratio SNR is:', 'C = B * log₂(1 + SNR)', 'C = 2B * log₂(M)', 'C = B * SNR', 'C = log₂(1 + B * SNR)', 'a', 'The Shannon channel capacity formula is C = B * log₂(1 + S/N) in bits per second.', 'Medium', null, 'Mid T1.2023.pdf', 1),
  makeQ('TEL-FIN-002', 'subj-telecom', finalOf('subj-telecom'), 'Which digital modulation technique alters the phase of the carrier signal among 4 discrete constellation states (0°, 90°, 180°, 270°)?', 'QPSK (Quadrature Phase Shift Keying)', 'BPSK (Binary Phase Shift Keying)', 'FSK (Frequency Shift Keying)', 'ASK (Amplitude Shift Keying)', 'a', 'QPSK modulates 2 bits per symbol into 4 discrete phase states spaced 90° apart.', 'Easy', null, 'Mid T1.2023.pdf', 2),

  // ==========================================
  // COMPUTER NETWORKS (CNE341) - ENGLISH
  // ==========================================
  makeQ('NET-MID-001', 'subj-networks1', midOf('subj-networks1'), 'At the network edge, which of the following typically acts as the primary initiators of communication?', 'Clients (End Systems / Hosts)', 'Routers', 'Core Switches', 'Transmission Towers', 'a', 'In client-server architecture, client hosts reside at the network edge and actively initiate requests toward servers.', 'Easy', null, 'ميد الشبكات 2025.pdf', 1),
  makeQ('NET-MID-002', 'subj-networks1', midOf('subj-networks1'), 'What is the primary advantage of using a full-duplex communication link compared to half-duplex?', 'It allows data to be transmitted and received simultaneously.', 'It reduces the signal strength needed for transmission.', 'It allows transmission in only one direction at a time.', 'It decreases the overall frequency bandwidth required.', 'a', 'Full-duplex channels permit concurrent bidirectional data transmission without collision or turn-taking delays.', 'Easy', null, 'ميد الشبكات 2025.pdf', 1),
  makeQ('NET-MID-003', 'subj-networks1', midOf('subj-networks1'), 'Which physical transmission media is commonly used in high-speed optical long-haul communication?', 'Glass or plastic thin optical fibers', 'Copper twisted-pair wires', 'Radio electromagnetic waves', 'Coaxial shielded cables', 'a', 'Fiber-optic cables conduct light pulses through silica fibers, providing extremely high bandwidth and noise immunity.', 'Easy', null, 'ميد الشبكات 2025.pdf', 2),
  makeQ('NET-FIN-001', 'subj-networks1', finalOf('subj-networks1'), 'How many total usable host IP addresses are available in an IPv4 subnet with a CIDR prefix of /26?', '62 usable addresses', '64 usable addresses', '30 usable addresses', '126 usable addresses', 'a', 'A /26 prefix has 32 - 26 = 6 host bits. Total addresses = 2⁶ = 64. Subtracting 2 (network and broadcast addresses) leaves 62 usable host addresses.', 'Medium', null, 'حل فاينل شبكات (1).pdf', 1),
  makeQ('NET-FIN-002', 'subj-networks1', finalOf('subj-networks1'), 'During TCP connection termination, how many packets (FIN/ACK handshakes) are exchanged in the standard closing sequence?', '4 packets (FIN, ACK, FIN, ACK)', '3 packets', '2 packets', '1 packet', 'a', 'TCP uses a 4-way handshake to gracefully tear down both simplex directions of the full-duplex connection.', 'Easy', null, 'حل فاينل شبكات (1).pdf', 2),

  // ==========================================
  // CLOUD COMPUTING (CNE451) - ENGLISH
  // ==========================================
  makeQ('CLOUD-MID-001', 'subj-cloud', midOf('subj-cloud'), 'Which cloud computing service model provides customers with raw virtual machines, storage, and network virtualization?', 'IaaS (Infrastructure as a Service)', 'PaaS (Platform as a Service)', 'SaaS (Software as a Service)', 'FaaS (Function as a Service)', 'a', 'IaaS delivers fundamental computing infrastructure (virtual servers, storage, networking) upon which clients install and configure their own OS and applications.', 'Easy', null, 'cloud mid sem1.pdf', 1),
  makeQ('CLOUD-MID-002', 'subj-cloud', midOf('subj-cloud'), 'What is the primary difference between a Type-1 (bare-metal) Hypervisor and a Type-2 (hosted) Hypervisor?', 'Type-1 runs directly on the physical hardware, while Type-2 runs on top of a host operating system.', 'Type-1 is only for Windows, while Type-2 is for Linux.', 'Type-1 cannot manage memory dynamically.', 'Type-2 has lower overhead and higher I/O performance than Type-1.', 'a', 'Bare-metal hypervisors (Type-1, e.g. VMware ESXi, KVM) execute directly on server hardware without an intermediate host OS.', 'Medium', null, 'cloud mid sem1.pdf', 2),
  makeQ('CLOUD-FIN-001', 'subj-cloud', finalOf('subj-cloud'), 'In cloud computing architectures, horizontal scaling (scaling out) refers to:', 'Adding more server instances or virtual machines to share the workload', 'Upgrading the CPU and RAM of an existing single server instance', 'Migrating workloads from public cloud to private cloud', 'Increasing network cable bandwidth', 'a', 'Horizontal scaling (scale out) adds more parallel nodes/machines to distribute traffic, enabling elasticity and high fault tolerance.', 'Easy', null, 'Cloud Final sol Zaid Al-Laham.pdf', 1),
  makeQ('CLOUD-FIN-002', 'subj-cloud', finalOf('subj-cloud'), 'Under the Cloud Shared Responsibility Model, which responsibility is ALWAYS the exclusive duty of the cloud customer across IaaS, PaaS, and SaaS?', 'Data security and customer access management', 'Physical datacenter perimeter security', 'Hypervisor patch management', 'Cooling and power supply maintenance', 'a', 'Customers are always responsible for managing and protecting their own data, credentials, and access policies regardless of cloud service tier.', 'Medium', null, 'Cloud Final sol Zaid Al-Laham.pdf', 2),

  // --- ADDITIONAL CORE CIRCUITS 2 QUESTIONS ---
  makeQ('CIRC2-MID-003', 'subj-circuits2', midOf('subj-circuits2'), 'In AC power analysis, if real power P = 800 W and reactive power Q = 600 VAR (inductive), what is the apparent power |S| and power factor (PF)?', '|S| = 1000 VA, PF = 0.8 lagging', '|S| = 1400 VA, PF = 0.8 leading', '|S| = 1000 VA, PF = 0.6 lagging', '|S| = 800 VA, PF = 1.0', 'a', '|S| = √(P² + Q²) = √(800² + 600²) = 1000 VA. Power factor = P / |S| = 800 / 1000 = 0.8 lagging (since Q > 0 is inductive).', 'Medium', null, 'Circuit 2 Mid 2023.pdf', 2),
  makeQ('CIRC2-FIN-003', 'subj-circuits2', finalOf('subj-circuits2'), 'In a series resonant circuit with R = 10 Ω, L = 100 mH, and C = 10 μF, what is the Quality Factor Q of the circuit?', 'Q = 10', 'Q = 100', 'Q = 1', 'Q = 0.1', 'a', 'Resonant frequency ω₀ = 1/√(LC) = 1/√(0.1 * 10⁻⁵) = 1/√10⁻⁶ = 1000 rad/s. Q = ω₀ L / R = (1000 * 0.1) / 10 = 100 / 10 = 10.', 'Medium', null, 'Final Circuit 2 T2.2023.pdf', 2),

  // --- ADDITIONAL ELECTRONICS QUESTIONS ---
  makeQ('ELEC-MID-003', 'subj-electronics', midOf('subj-electronics'), 'In a Common-Emitter BJT amplifier, what is the primary effect of adding an unbypassed emitter resistor R_E?', 'It stabilizes the voltage gain against temperature and β variations (negative feedback) at the expense of lower gain.', 'It causes the amplifier to oscillate at high frequencies.', 'It shifts the operating point into cutoff.', 'It eliminates all harmonic distortion completely.', 'a', 'An unbypassed emitter resistor provides negative feedback, stabilizing gain and raising input resistance while reducing total gain magnitude.', 'Medium', null, 'Final Electro T1.2023-2024.pdf', 2),
  makeQ('ELEC-FIN-003', 'subj-electronics', finalOf('subj-electronics'), 'For an n-channel enhancement MOSFET operating in the SATURATION region, the drain current I_D is related to (V_GS - V_th) by:', 'I_D = (1/2) k_n (V_GS - V_th)²', 'I_D = k_n [(V_GS - V_th)V_DS - 0.5 V_DS²]', 'I_D is directly proportional to V_DS linearly', 'I_D = 0 A', 'a', 'In saturation (pinch-off), the drain current follows the square-law relationship I_D = 0.5 * k_n * (V_GS - V_th)² and is independent of V_DS to first order.', 'Medium', null, 'Final Electro T1.2023-2024.pdf', 3),

  // --- ADDITIONAL DIGITAL LOGIC QUESTIONS ---
  makeQ('LOGIC-MID-003', 'subj-logic', midOf('subj-logic'), 'In digital arithmetic, what are the Boolean expressions for the Sum (S) and Carry-Out (C_out) of a Full Adder with inputs A, B, and C_in?', 'S = A ⊕ B ⊕ C_in,  C_out = AB + C_in(A ⊕ B)', 'S = AB + C_in,  C_out = A ⊕ B ⊕ C_in', 'S = A + B + C_in,  C_out = ABC_in', 'S = (A ⊕ B)\',  C_out = A + B', 'a', 'The standard full adder produces Sum = A ⊕ B ⊕ C_in and Carry = AB + C_in(A ⊕ B).', 'Easy', null, 'سنوات_ميد_لوجيك.pdf', 2),
  makeQ('LOGIC-FIN-003', 'subj-logic', finalOf('subj-logic'), 'In a JK Flip-Flop, what is the next state Q(next) when inputs J = 1 and K = 1 at the active clock edge?', 'Q(next) = Q\' (Toggle state)', 'Q(next) = 0 (Reset)', 'Q(next) = 1 (Set)', 'Q(next) = Q (No change)', 'a', 'When both J and K are logic 1, the JK flip-flop toggles its output state on every clock pulse.', 'Easy', null, 'فاينل لوجيك.pdf', 2),

  // --- ADDITIONAL SIGNALS & SYSTEMS QUESTIONS ---
  makeQ('SIG-MID-003', 'subj-signals', midOf('subj-signals'), 'What is the Laplace transform of the causal exponential signal x(t) = e^(-3t) u(t), and what is its Region of Convergence (ROC)?', 'X(s) = 1 / (s + 3) with ROC: Re{s} > -3', 'X(s) = 1 / (s - 3) with ROC: Re{s} < 3', 'X(s) = 3 / (s² + 9) with ROC: all s', 'X(s) = s / (s + 3) with ROC: Re{s} > 0', 'a', 'ℒ{e^(-at)u(t)} = 1/(s + a) for Re{s} > -a. Here a = 3, so X(s) = 1/(s + 3) with ROC Re{s} > -3.', 'Easy', null, 'Signal Mid 2023.pdf', 2),
  makeQ('SIG-FIN-003', 'subj-signals', finalOf('subj-signals'), 'If the Fourier transform of x(t) is X(ω), what is the Fourier transform of the time-shifted signal x(t - t₀)?', 'e^(-j ω t₀) * X(ω)', 'e^(+j ω t₀) * X(ω)', 'X(ω - t₀)', 'X(ω) / t₀', 'a', 'By the time-shifting property of the continuous-time Fourier transform: ℱ{x(t - t₀)} = e^(-j ω t₀) X(ω).', 'Easy', null, 'FINAL 24-25 S1..pdf', 2),

  // --- ADDITIONAL CONTROL SYSTEMS QUESTIONS ---
  makeQ('CTRL-MID-003', 'subj-control', midOf('subj-control'), 'For a unity negative feedback system with open-loop transfer function G(s) = 10 / [s(s + 2)(s + 5)], what is the System Type and position error constant Kp?', 'Type 1 system with Kp = ∞ (zero steady-state error to step input)', 'Type 0 system with Kp = 1', 'Type 2 system with Kp = 0', 'Type 1 system with Kp = 10', 'a', 'Since there is one pole at s = 0 (1/s term), it is a Type 1 system. The position error constant Kp = lim_{s→0} G(s) = 10/0 = ∞.', 'Medium', null, 'Mid 2023-2024 Solved.pdf', 2),
  makeQ('CTRL-FIN-003', 'subj-control', finalOf('subj-control'), 'In root locus construction, the number of separate root locus branches that terminate at infinity equals:', 'n - m (number of poles minus number of finite zeros)', 'n + m', 'm - n', 'n * m', 'a', 'Root locus branches originate at open-loop poles (n) and terminate at open-loop zeros (m). The remaining n - m branches terminate at infinity along asymptotes.', 'Medium', null, 'اجى فاينل.pdf', 2),

  // --- ADDITIONAL TELECOMMUNICATIONS QUESTIONS ---
  makeQ('TEL-MID-003', 'subj-telecom', midOf('subj-telecom'), 'According to Carson\'s Rule, what is the approximate transmission bandwidth B_T required for a Frequency Modulated (FM) signal with peak frequency deviation Δf and message bandwidth f_m?', 'B_T = 2 (Δf + f_m)', 'B_T = 2 Δf', 'B_T = 2 f_m', 'B_T = Δf * f_m', 'a', 'Carson\'s empirical rule states FM bandwidth B_T ≈ 2(Δf + f_m) = 2 f_m(1 + β).', 'Medium', null, 'Mid T1.2023.pdf', 2),
  makeQ('TEL-FIN-003', 'subj-telecom', finalOf('subj-telecom'), 'In Pulse Code Modulation (PCM), if each sample is quantized into n bits, increasing n by 1 bit improves the signal-to-quantization-noise ratio (SQNR) by approximately:', '6 dB', '3 dB', '1 dB', '12 dB', 'a', 'Each additional quantization bit doubles the number of levels (2^n), decreasing noise power by a factor of 4, which translates to a 6.02 dB improvement in SQNR.', 'Medium', null, 'Mid T1.2023.pdf', 3),

  // --- ADDITIONAL CLOUD COMPUTING QUESTIONS ---
  makeQ('CLOUD-MID-003', 'subj-cloud', midOf('subj-cloud'), 'What is the primary architectural difference between Docker containers and traditional Virtual Machines (VMs)?', 'Containers share the host operating system kernel, whereas VMs each run a full guest operating system on top of a hypervisor.', 'Containers cannot run Linux applications.', 'VMs start in milliseconds while containers take minutes.', 'Containers do not provide filesystem isolation.', 'a', 'Containers virtualize at the OS level, sharing the underlying host kernel to achieve lightweight footprint and fast startup.', 'Medium', null, 'cloud mid sem1.pdf', 2),
  makeQ('CLOUD-FIN-003', 'subj-cloud', finalOf('subj-cloud'), 'In cloud storage terminology, Amazon S3 is an example of what type of storage service?', 'Object Storage (REST API accessible via unique URIs)', 'Block Storage for raw OS disks', 'Network File System (NFS)', 'Direct Attached Storage (DAS)', 'a', 'Amazon S3 is a massively scalable object store where data is stored as discrete objects containing metadata and unique identifiers accessed via HTTP.', 'Easy', null, 'Cloud Final sol Zaid Al-Laham.pdf', 2)
];

module.exports = { electricalTelecomQuestions };
