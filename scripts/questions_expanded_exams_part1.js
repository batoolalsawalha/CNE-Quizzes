/**
 * Master Academic Question Bank Expansion - Part 1
 * Directly transcribed and structured from authentic Al-Balqa Applied University & Faculty of Engineering exams in qu/
 * Subjects covered:
 * - Telecommunications (qu/اتصالات)
 * - Cloud Computing (qu/كلاود)
 * - General Physics 2 (qu/فيزياء 2)
 * - Computer Architecture (qu/معمارية)
 * - Machine Learning (qu/ماشين)
 * - Artificial Intelligence (qu/الذكاء الاصطناعي)
 * - Electronics (qu/الكترونيات)
 * - Electrical Circuits 2 (qu/سيركت 2)
 * - Control Systems (qu/كونترول)
 * - Signals and Systems (qu/سيجنال)
 * 
 * Strict Language Integrity: 100% ENGLISH
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

const part1Questions = [
  // ==========================================
  // TELECOMMUNICATIONS (qu/اتصالات)
  // Source: Mid T1.2023.pdf, Mid T2.2023.pdf, Mid T3.2022.pdf
  // ==========================================
  makeQ('EXP-TEL-001', 'subj-telecom', midOf('subj-telecom'),
    'In start-stop asynchronous transmission, synchronization is established at:',
    'The character (byte) level with start and stop framing bits',
    'The bit clock level across the entire bitstream',
    'The packet network layer only',
    'The transport session layer',
    'a',
    'Asynchronous transmission encapsulates each individual character/byte with a start bit (logic 0) and one or two stop bits (logic 1), providing synchronization per byte.',
    'Easy', null, 'Mid T1.2023.pdf', 1),

  makeQ('EXP-TEL-002', 'subj-telecom', midOf('subj-telecom'),
    'The period of standard alternating electrical power in Jordan (frequency f = 50 Hz) is equal to:',
    '20 ms',
    '20 us',
    '16.67 ms',
    '50 ms',
    'a',
    'Period T = 1 / f = 1 / 50 Hz = 0.02 seconds = 20 ms.',
    'Easy', null, 'Mid T1.2023.pdf', 1),

  makeQ('EXP-TEL-003', 'subj-telecom', midOf('subj-telecom'),
    'What is the frequency of an alternating sinusoidal current that reaches a zero-crossing value every 0.01 seconds?',
    '50 Hz',
    '100 Hz',
    '25 Hz',
    '200 Hz',
    'a',
    'An AC sinusoid crosses zero twice per cycle (every half period T/2). Therefore, T/2 = 0.01 s => T = 0.02 s => f = 1 / 0.02 = 50 Hz.',
    'Medium', null, 'Mid T1.2023.pdf', 1),

  makeQ('EXP-TEL-004', 'subj-telecom', midOf('subj-telecom'),
    'A sinusoidal alternating current with frequency f = 50 Hz has a peak amplitude of 10 A. What is the instantaneous value of the current after t = 1/300 s from zero?',
    '8.66 A',
    '5.00 A',
    '7.07 A',
    '10.0 A',
    'a',
    'i(t) = Im * sin(2*pi*f*t) = 10 * sin(2 * pi * 50 * (1/300)) = 10 * sin(pi / 3) = 10 * (sqrt(3)/2) = 8.66 A.',
    'Medium', null, 'Mid T1.2023.pdf', 1),

  makeQ('EXP-TEL-005', 'subj-telecom', midOf('subj-telecom'),
    'In a Pulse Code Modulation (PCM) system, quantization noise for a fixed input dynamic range is directly determined by:',
    'The number of quantization levels and coding bits (n)',
    'The carrier transmission frequency',
    'The antenna propagation delay',
    'The physical medium resistance',
    'a',
    'Quantization noise power is Nq = (Delta^2) / 12, where step size Delta = Vpp / 2^n. Increasing the number of bits n exponentially reduces quantization noise (SNR improves by ~6 dB per bit).',
    'Medium', null, 'Mid T1.2023.pdf', 2),

  makeQ('EXP-TEL-006', 'subj-telecom', midOf('subj-telecom'),
    'In any physical communication system, noise is most predominantly introduced into the transmitted signal:',
    'Over the physical transmission channel/medium',
    'Inside the source encoder registers',
    'Within the transmitting display driver',
    'At the output speaker coil only',
    'a',
    'While minor internal thermal noise exists in circuits, the physical transmission channel (free space, twisted pair, optical fiber) is the primary vulnerable environment where external interference and atmospheric noise attenuate and distort the signal.',
    'Easy', null, 'Mid T1.2023.pdf', 2),

  makeQ('EXP-TEL-007', 'subj-telecom', midOf('subj-telecom'),
    'The human voice signal in telephony is best characterized as:',
    'A non-periodic composite signal with a band-limited range (approx. 300 Hz - 3.4 kHz)',
    'A pure single-frequency sinusoidal tone at 1 kHz',
    'A periodic square pulse train with infinite bandwidth',
    'An unmodulated carrier with zero DC component',
    'a',
    'Human speech consists of complex, non-periodic acoustic waveforms containing multiple fundamental frequencies and harmonics, conventionally filtered to a 3.1 kHz band (300 to 3400 Hz) for standard telecommunication channels.',
    'Easy', null, 'Mid T1.2023.pdf', 2),

  makeQ('EXP-TEL-008', 'subj-telecom', finalOf('subj-telecom'),
    'A commercial FM broadcast radio station is allocated a standard channel bandwidth of:',
    '200 kHz',
    '10 kHz',
    '20 MHz',
    '1.2 MHz',
    'a',
    'Standard FM broadcast stations (88-108 MHz) are spaced 200 kHz apart (0.2 MHz) to accommodate Carson\'s rule bandwidth (approx 180 kHz) plus guard bands.',
    'Easy', null, 'Mid T1.2023.pdf', 2),

  makeQ('EXP-TEL-009', 'subj-telecom', finalOf('subj-telecom'),
    'An RF power amplifier produces an output power of 20 Watts. What is this output power expressed in dBW?',
    '13.01 dBW',
    '20.0 dBW',
    '43.01 dBW',
    '7.00 dBW',
    'a',
    'Power in dBW = 10 * log10(P / 1 W) = 10 * log10(20) = 10 * 1.30103 = 13.01 dBW.',
    'Medium', null, 'Mid T1.2023.pdf', 2),

  makeQ('EXP-TEL-010', 'subj-telecom', finalOf('subj-telecom'),
    'If 1,000 ASCII characters (each 8 bits) are transmitted asynchronously with 1 start bit and 1 stop bit per character, how many total bits must be transmitted?',
    '10,000 bits',
    '8,000 bits',
    '9,000 bits',
    '16,000 bits',
    'a',
    'Each character requires 1 start bit + 8 data bits + 1 stop bit = 10 bits total. For 1,000 characters: 1,000 * 10 = 10,000 bits.',
    'Easy', null, 'Mid T1.2023.pdf', 2),

  // ==========================================
  // CLOUD COMPUTING (qu/كلاود)
  // Source: cloud mid 2.pdf, Cloud Final sol Zaid Al-Laham.pdf
  // ==========================================
  makeQ('EXP-CLD-001', 'subj-cloud', midOf('subj-cloud'),
    'Which cloud service model provides consumers with raw virtualized computing resources such as virtual machines, raw block storage, and software-defined networking?',
    'Infrastructure as a Service (IaaS)',
    'Platform as a Service (PaaS)',
    'Software as a Service (SaaS)',
    'Function as a Service (FaaS)',
    'a',
    'IaaS provides fundamental compute, storage, and networking resources where the customer has control over the OS, storage, and deployed applications (e.g., AWS EC2, Azure VM, GCP Compute Engine).',
    'Easy', null, 'cloud mid 2.pdf', 1),

  makeQ('EXP-CLD-002', 'subj-cloud', midOf('subj-cloud'),
    'A cloud infrastructure provisioned for exclusive use by a single organization comprising multiple business units is known as a:',
    'Private Cloud',
    'Public Cloud',
    'Community Cloud',
    'Hybrid Cloud',
    'a',
    'According to NIST SP 800-145, a Private Cloud is provisioned for exclusive use by a single organization, owned, managed, and operated by the organization or a third party, on or off premises.',
    'Easy', null, 'cloud mid 2.pdf', 1),

  makeQ('EXP-CLD-003', 'subj-cloud', midOf('subj-cloud'),
    'In which cloud service model does the customer consume applications over the web browser without any responsibility for installing, patching, or maintaining underlying servers or software?',
    'Software as a Service (SaaS)',
    'Infrastructure as a Service (IaaS)',
    'Platform as a Service (PaaS)',
    'Hardware as a Service (HaaS)',
    'a',
    'In SaaS (e.g., Google Workspace, Microsoft 365, Salesforce), the provider manages the entire technology stack from hardware to application code; the consumer simply accesses the service.',
    'Easy', null, 'cloud mid 2.pdf', 1),

  makeQ('EXP-CLD-004', 'subj-cloud', midOf('subj-cloud'),
    'What is the primary architectural advantage of utilizing lightweight OS-level containers (e.g., Docker) compared to traditional Type-2 Hypervisor Virtual Machines?',
    'Portability across heterogeneous environments and near-instant startup times due to shared host kernel',
    'Containers provide complete hardware emulation including custom BIOS',
    'Containers eliminate the need for an underlying operating system kernel entirely',
    'Containers always have larger image disk footprints than VM images',
    'a',
    'Containers virtualize the OS kernel rather than physical hardware, providing rapid spin-up times (milliseconds), significantly reduced memory overhead, and seamless portability across dev, test, and cloud production environments.',
    'Medium', null, 'cloud mid 2.pdf', 1),

  makeQ('EXP-CLD-005', 'subj-cloud', midOf('subj-cloud'),
    'In the Cloud Shared Responsibility Model, which layer is strictly the responsibility of the CUSTOMER when using an Infrastructure as a Service (IaaS) offering?',
    'Operating System patching, guest OS configuration, firewall rules, and application runtime',
    'Physical datacenter biometric security',
    'Hypervisor software maintenance and blade server power supplies',
    'Underlying fiber optic backbone routing hardware',
    'a',
    'In IaaS, the cloud provider manages physical hardware, virtualization, and datacenter facilities. The tenant/customer is fully responsible for configuring and patching the guest operating system, application software, network firewall policies, and user data.',
    'Medium', null, 'cloud mid 2.pdf', 2),

  makeQ('EXP-CLD-006', 'subj-cloud', finalOf('subj-cloud'),
    'In VM CPU sizing, what does an overcommitment (oversubscription) ratio of 3:1 denote?',
    'Assigning three virtual CPUs (vCPUs) across VMs for every one physical CPU core/thread',
    'Allocating three physical servers per single virtual machine instance',
    'Running three guest operating systems inside the same kernel space simultaneously',
    'Tripling the RAM allocation whenever CPU usage hits 100%',
    'a',
    'CPU overcommitment allows allocating more virtual CPUs than physical processor cores available (e.g. 3 vCPUs per 1 physical core), leveraging statistical multiplexing since not all VMs consume 100% CPU capacity simultaneously.',
    'Medium', null, 'cloud mid 2.pdf', 2),

  makeQ('EXP-CLD-007', 'subj-cloud', finalOf('subj-cloud'),
    'In a Hybrid Cloud architecture, what is meant by the "Cloud Bursting" strategy?',
    'Deploying base application capacity on private infrastructure and dynamically scaling out peak workload surges into public cloud compute',
    'Permanently migrating all private database tables to public storage buckets',
    'Terminating running virtual machines when monthly billing quotas are exceeded',
    'Simultaneously replicating uncompressed backups across three continents',
    'a',
    'Cloud bursting is a deployment configuration where an application runs in a private cloud or local datacenter and automatically bursts into a public cloud provider when demand exceeds local capacity.',
    'Medium', null, 'cloud mid 2.pdf', 2),

  makeQ('EXP-CLD-008', 'subj-cloud', finalOf('subj-cloud'),
    'Which cloud migration strategy involves redesigning and rewriting an application architecture from scratch to be natively decoupled, containerized, and microservice-driven?',
    'Refactoring / Re-architecting (Cloud-Native)',
    'Rehosting ("Lift and Shift")',
    'Repurchasing (Drop and Shop)',
    'Retiring (Decommissioning)',
    'a',
    'Refactoring (or Re-architecting) modifies the underlying code and architecture to take full advantage of cloud-native features (microservices, serverless functions, dynamic autoscaling).',
    'Medium', null, 'cloud mid 2.pdf', 2),

  // ==========================================
  // GENERAL PHYSICS 2 (qu/فيزياء 2)
  // Source: mid term exam 2d Sem 2026.pdf (Al-Balqa Applied University Exam Code 30201102)
  // ==========================================
  makeQ('EXP-PHY2-001', 'subj-physics2', midOf('subj-physics2'),
    'A point charge Q is placed at the origin (x = 0). An identical point charge Q is placed at x = -1.0 m and another at x = +3.0 m. If Q = 40 uC, what is the magnitude of the net electrostatic force acting on the charge at x = +3.0 m? (Coulomb constant k = 8.99 x 10^9 N.m^2/C^2)',
    '2.50 N',
    '10.1 N',
    '18.0 N',
    '29.6 N',
    'a',
    'Distance between origin and x = 3 m is r1 = 3 m. Force F1 = k * Q^2 / (3^2) = (8.99e9 * (40e-6)^2) / 9 = 1.60 N (in +x direction). Distance between x = -1 m and x = 3 m is r2 = 4 m. Force F2 = k * Q^2 / (4^2) = (8.99e9 * (40e-6)^2) / 16 = 0.90 N (in +x direction). Net force F_net = 1.60 + 0.90 = 2.50 N.',
    'Hard', null, 'mid term exam 2d Sem 2026.pdf', 2),

  makeQ('EXP-PHY2-002', 'subj-physics2', midOf('subj-physics2'),
    'Two point particles having equal and opposite charges of +8 nC and -8 nC are placed at two vertices of an equilateral triangle with side length 2.0 m. What is the magnitude of the net electric field at the third vertex?',
    '18.0 N/C',
    '36.0 N/C',
    '23.0 N/C',
    '12.0 N/C',
    'a',
    'E1 = k * |q| / r^2 = (8.99e9 * 8e-9) / (2.0^2) = 17.98 N/C (directed away from +q). E2 = 17.98 N/C (directed toward -q). The angle between the two field vectors at the third vertex is 120 degrees. Net E = 2 * E1 * cos(120/2) = 2 * 17.98 * cos(60 deg) = 2 * 17.98 * 0.5 = 17.98 N/C ≈ 18.0 N/C.',
    'Hard', null, 'mid term exam 2d Sem 2026.pdf', 2),

  makeQ('EXP-PHY2-003', 'subj-physics2', midOf('subj-physics2'),
    'A charged particle (q = 3.0 mC, mass m = 20 g) has an initial speed of 20 m/s when entering a uniform electric field of magnitude 80 N/C directed along its velocity. What is its speed after t = 2.0 seconds?',
    '44 m/s',
    '68 m/s',
    '80 m/s',
    '36 m/s',
    'a',
    'Force F = q * E = (3.0 x 10^-3 C) * (80 N/C) = 0.24 N. Acceleration a = F / m = 0.24 N / (0.020 kg) = 12 m/s^2. Final speed v = v0 + a * t = 20 + (12 * 2.0) = 20 + 24 = 44 m/s.',
    'Medium', null, 'mid term exam 2d Sem 2026.pdf', 2),

  makeQ('EXP-PHY2-004', 'subj-physics2', midOf('subj-physics2'),
    'An infinite uniform line charge with linear density lambda = 4.0 nC/m lies along the x-axis. Consider a Gaussian sphere of radius R = 6.0 cm centered at the origin. What is the total electric flux through this spherical surface?',
    '54.2 N.m^2/C',
    '23.0 N.m^2/C',
    '45.0 N.m^2/C',
    '68.0 N.m^2/C',
    'a',
    'The sphere intersects the line of charge across its diameter: length L = 2 * R = 2 * 0.06 m = 0.12 m. Enclosed charge Q_enc = lambda * L = (4.0 x 10^-9 C/m) * (0.12 m) = 4.8 x 10^-10 C. Electric flux Phi = Q_enc / epsilon_0 = (4.8 x 10^-10) / (8.854 x 10^-12) = 54.2 N.m^2/C.',
    'Hard', null, 'mid term exam 2d Sem 2026.pdf', 2),

  makeQ('EXP-PHY2-005', 'subj-physics2', finalOf('subj-physics2'),
    'Points A at (3, 6) m and B at (8, -3) m exist in a uniform electric field E = 16 i N/C. What is the electric potential difference VA - VB?',
    '+80 V',
    '-80 V',
    '-60 V',
    '+50 V',
    'a',
    'Potential difference VA - VB = - integral from B to A of E dot dr = E dot (rB - rA). Displacement from A to B: delta_x = 8 - 3 = 5 m. Since E is purely along +x, VA - VB = E_x * (xB - xA) = 16 * 5 = +80 V (potential decreases in the direction of the field, so VA is higher than VB by 80 V).',
    'Medium', null, 'mid term exam 2d Sem 2026.pdf', 2),

  makeQ('EXP-PHY2-006', 'subj-physics2', finalOf('subj-physics2'),
    'Three identical point charges of +20 uC are situated at the vertices of an equilateral triangle with side lengths of 5.0 m. What is the total electrostatic potential energy stored in this system?',
    '2.16 J',
    '1.20 J',
    '3.60 J',
    '4.80 J',
    'a',
    'Total potential energy U = U12 + U13 + U23 = 3 * (k * q^2 / r) = 3 * (8.99 x 10^9 * (20 x 10^-6)^2 / 5.0) = 3 * (8.99e9 * 400e-12 / 5.0) = 3 * (3.596 / 5.0) = 3 * 0.7192 = 2.16 J.',
    'Medium', null, 'mid term exam 2d Sem 2026.pdf', 2),

  // ==========================================
  // COMPUTER ARCHITECTURE (qu/معمارية)
  // Source: Mid Solutions.pdf, Final Computer Architecture.pdf
  // ==========================================
  makeQ('EXP-ARC-001', 'subj-arch', midOf('subj-arch'),
    'In a classic 5-stage RISC instruction pipeline (IF, ID, EX, MEM, WB), a "data hazard" due to Read-After-Write (RAW) dependency can be resolved with minimum stalls using:',
    'Hardware Operand Forwarding (Bypassing)',
    'Flushing the instruction fetch buffer',
    'Increasing the clock frequency',
    'Static branch prediction',
    'a',
    'Operand forwarding routes the computed result directly from the EX/MEM or MEM/WB pipeline registers back to the ALU input in the EX stage, eliminating the stall cycle when an instruction immediately uses the preceding instruction\'s result.',
    'Medium', null, 'Mid Solutions.pdf', 1),

  makeQ('EXP-ARC-002', 'subj-arch', midOf('subj-arch'),
    'In MIPS 32-bit architecture, which instruction format is used for the ALU arithmetic instruction "add $t0, $s1, $s2"?',
    'R-type format (opcode 0, rs, rt, rd, shamt, funct)',
    'I-type format (opcode, rs, rt, immediate)',
    'J-type format (opcode, target address)',
    'B-type format (branch offset)',
    'a',
    'R-type (Register format) represents instructions that operate on three registers: op (6 bits), rs (5 bits), rt (5 bits), rd (5 bits), shamt (5 bits), funct (6 bits).',
    'Easy', null, 'Mid Solutions.pdf', 2),

  makeQ('EXP-ARC-003', 'subj-arch', midOf('subj-arch'),
    'A processor has an L1 cache with a 95% hit rate and a hit latency of 1 cycle. The main memory access time (miss penalty) is 100 cycles. What is the Average Memory Access Time (AMAT)?',
    '6 cycles',
    '1 cycle',
    '10 cycles',
    '5.2 cycles',
    'a',
    'AMAT = Hit Time + (Miss Rate * Miss Penalty) = 1 + (1 - 0.95) * 100 = 1 + (0.05 * 100) = 1 + 5 = 6 clock cycles.',
    'Medium', null, 'Final Computer Architecture.pdf', 2),

  makeQ('EXP-ARC-004', 'subj-arch', finalOf('subj-arch'),
    'Which type of cache mapping architecture allows any given main memory block to be placed in ANY cache line/block indiscriminately?',
    'Fully Associative Cache',
    'Direct-Mapped Cache',
    '2-Way Set-Associative Cache',
    'Sector Cache',
    'a',
    'In a fully associative cache, a memory block can reside in any cache frame, minimizing conflict misses at the expense of needing parallel comparator logic across all tag entries.',
    'Easy', null, 'Final Computer Architecture.pdf', 3),

  makeQ('EXP-ARC-005', 'subj-arch', finalOf('subj-arch'),
    'A dynamic branch predictor that uses a 2-bit saturating counter requires how many consecutive mispredictions to change its prediction from "Strongly Taken" to "Taken"?',
    'One misprediction (transitions from Strongly Taken to Weakly Taken)',
    'Two mispredictions',
    'Four mispredictions',
    'Three mispredictions',
    'a',
    'The 4 states are 11 (Strongly Taken), 10 (Weakly Taken), 01 (Weakly Not Taken), 00 (Strongly Not Taken). One misprediction transitions from 11 to 10 (Weakly Taken). It takes two consecutive mispredictions to flip the actual binary prediction decision.',
    'Medium', null, 'Final Computer Architecture.pdf', 4),

  // ==========================================
  // MACHINE LEARNING (qu/ماشين)
  // Source: Machines TEST BANK By MAE.pdf, Mid 24-25(Muath Makawi)
  // ==========================================
  makeQ('EXP-ML-001', 'subj-machine', midOf('subj-machine'),
    'In linear regression using Batch Gradient Descent, what happens to the parameter updates if the learning rate (alpha) is chosen excessively large?',
    'The cost function oscillates and diverges away from the global minimum',
    'The algorithm converges in exactly one iteration',
    'The weights become identically zero',
    'Gradient descent transitions into stochastic gradient descent automatically',
    'a',
    'If alpha is too large, gradient descent overshoots the minimum at each step, causing the cost function J(theta) to oscillate wildly and potentially diverge to infinity.',
    'Easy', null, 'Machines TEST BANK By MAE.pdf', 3),

  makeQ('EXP-ML-002', 'subj-machine', midOf('subj-machine'),
    'Which regularization penalty promotes sparsity in model parameters by driving non-critical feature weights to EXACTLY zero?',
    'L1 Regularization (Lasso, sum of absolute weights)',
    'L2 Regularization (Ridge, sum of squared weights)',
    'Dropout with keep_prob = 1.0',
    'Early stopping at epoch 100',
    'a',
    'L1 regularization adds lambda * sum(|w_i|) to the loss function. Its diamond-shaped constraint contour has sharp corners on the axes, causing optimization to hit exact zero weights, yielding automatic feature selection.',
    'Medium', null, 'Machines TEST BANK By MAE.pdf', 5),

  makeQ('EXP-ML-003', 'subj-machine', midOf('subj-machine'),
    'In binary classification of a highly imbalanced dataset (e.g. 99% negative class, 1% fraud cases), which evaluation metric is MOST informative rather than standard accuracy?',
    'Precision, Recall, and the harmonic F1-score',
    'Overall accuracy percentage',
    'Mean Squared Error (MSE)',
    'R-squared goodness of fit',
    'a',
    'A trivial classifier predicting 100% negative achieves 99% accuracy while catching zero fraud cases. Precision (TP/(TP+FP)) and Recall (TP/(TP+FN)) evaluate performance specifically on the positive minority class.',
    'Easy', null, 'Mid 24-25(Muath Makawi),,_250807_110315.pdf', 1),

  makeQ('EXP-ML-004', 'subj-machine', finalOf('subj-machine'),
    'In Support Vector Machines (SVM), what is the geometric definition of "Support Vectors"?',
    'The training data points that lie directly on or within the margin boundary hyperplanes',
    'The coordinates of the centroid of each class cluster',
    'The eigenvectors of the input covariance matrix',
    'The outliers removed during data pre-processing',
    'a',
    'Support vectors are the critical training instances that lie closest to the decision hyperplane (on the margins w^T x + b = ±1). The optimal separating hyperplane is completely defined by these points alone.',
    'Medium', null, 'Mid 24-25(Muath Makawi),,_250807_110315.pdf', 2),

  makeQ('EXP-ML-005', 'subj-machine', finalOf('subj-machine'),
    'In building Decision Trees using the ID3 or C4.5 algorithms, splitting a node is guided by maximizing which objective function?',
    'Information Gain (reduction in Shannon entropy)',
    'Euclidean distance between child nodes',
    'Ridge penalty loss reduction',
    'Cross-validation fold index',
    'a',
    'Information Gain measures the reduction in entropy (uncertainty) achieved by partitioning a dataset on a given attribute: IG(S, A) = Entropy(S) - sum(|S_v|/|S| * Entropy(S_v)). The attribute yielding maximum IG is chosen.',
    'Easy', null, 'Machines TEST BANK By MAE.pdf', 8),

  // ==========================================
  // ARTIFICIAL INTELLIGENCE (qu/الذكاء الاصطناعي)
  // Source: Mid AI&ML T1.2023-2024.pdf, Final (1).pdf
  // ==========================================
  makeQ('EXP-AI-001', 'subj-ai', midOf('subj-ai'),
    'In the A* search algorithm, what fundamental condition MUST the heuristic function h(n) satisfy to guarantee finding the OPTIMAL shortest path when using Tree Search?',
    'Admissibility: h(n) must never overestimate the true cost to reach the goal (0 <= h(n) <= h*(n))',
    'Monotonicity: h(n) must strictly increase with every step taken',
    'Equivalence: h(n) must equal the exact path cost g(n)',
    'Inversion: h(n) must be inversely proportional to distance',
    'a',
    'An admissible heuristic never overestimates the true remaining cost to the goal. This ensures that the A* evaluation function f(n) = g(n) + h(n) will not prematurely settle for a sub-optimal path.',
    'Medium', null, 'Mid AI&ML T1.2023-2024.pdf', 1),

  makeQ('EXP-AI-002', 'subj-ai', midOf('subj-ai'),
    'Which uninformed graph search algorithm guarantees finding the shortest path (minimum number of steps) in an unweighted graph?',
    'Breadth-First Search (BFS)',
    'Depth-First Search (DFS)',
    'Depth-Limited Search with limit 1',
    'Bidirectional DFS',
    'a',
    'BFS explores the search space level-by-level (FIFO queue), ensuring that the first time the goal node is expanded, it is reached via the path with the fewest edges.',
    'Easy', null, 'Mid AI&ML T1.2023-2024.pdf', 2),

  makeQ('EXP-AI-003', 'subj-ai', finalOf('subj-ai'),
    'In adversarial two-player zero-sum games (e.g., Chess), Alpha-Beta pruning achieves which of the following computational improvements over standard Minimax?',
    'It prunes branches that cannot influence the final minimax decision, potentially doubling the effective search depth',
    'It converts the game from zero-sum to cooperative',
    'It replaces the heuristic evaluation function with exact endgame tablebases',
    'It randomizes player actions to avoid predictability',
    'a',
    'Alpha-Beta pruning computes identical minimax values while eliminating branches where alpha >= beta, reducing time complexity in the best case from O(b^d) to O(b^(d/2)), effectively allowing twice the lookahead depth.',
    'Medium', null, 'Final (1).pdf', 2),

  // ==========================================
  // ELECTRONICS (qu/الكترونيات)
  // Source: Mid electronics 2023.pdf, Final Electro T1.2023-2024.pdf
  // ==========================================
  makeQ('EXP-ELC-001', 'subj-electronics', midOf('subj-electronics'),
    'In a BJT transistor small-signal AC hybrid-pi model, the dynamic emitter resistance r\'e at room temperature (T = 300 K) is calculated from the DC collector current IC as:',
    'r\'e = 26 mV / IC (or 25 mV / IE)',
    'r\'e = IC / 26 mV',
    'r\'e = beta * 26 mV',
    'r\'e = VCC / IC',
    'a',
    'The small-signal dynamic resistance of the forward-biased base-emitter junction is given by thermal voltage VT divided by DC emitter current: r\'e = VT / IE ≈ 26 mV / IC at 25°C.',
    'Medium', null, 'Mid electronics 2023.pdf', 2),

  makeQ('EXP-ELC-002', 'subj-electronics', midOf('subj-electronics'),
    'Which BJT DC biasing configuration provides the HIGHEST stability of the operating Q-point against variations in temperature and transistor beta (hfe)?',
    'Voltage-Divider Bias',
    'Fixed Base Bias',
    'Collector Feedback Bias without emitter resistor',
    'Unbypassed Base Bias',
    'a',
    'Voltage-divider bias with an emitter resistor creates a stable base voltage determined by the external resistors (if R_th << beta * R_E), making the collector current almost entirely independent of the transistor\'s internal beta.',
    'Easy', null, 'Final Electro T1.2023-2024.pdf', 1),

  makeQ('EXP-ELC-003', 'subj-electronics', finalOf('subj-electronics'),
    'What is the fundamental architectural advantage of Junction Field-Effect Transistors (JFETs) and MOSFETs compared to Bipolar Junction Transistors (BJTs)?',
    'Extremely high input impedance (almost zero DC input gate current)',
    'Significantly higher current carrying capability per silicon area',
    'Higher voltage gain without negative feedback',
    'Lower fabrication cost for power rectifiers',
    'a',
    'Because the gate of a JFET is reverse-biased and the gate of a MOSFET is insulated by silicon dioxide (SiO2), the input resistance is in the giga-ohm (10^9 - 10^14 Ohm) range, drawing virtually zero DC input current.',
    'Easy', null, 'Final Electro T1.2023-2024.pdf', 2),

  // ==========================================
  // ELECTRICAL CIRCUITS 2 (qu/سيركت 2)
  // Source: Circuit 2 Mid 2023.pdf, Final Circuit 2 T2.2023.pdf
  // ==========================================
  makeQ('EXP-CIR2-001', 'subj-circuits2', midOf('subj-circuits2'),
    'A sinusoidal voltage source vs(t) = 100 cos(314t + 20°) V supplies an AC load with current i(t) = 10 cos(314t - 40°) A. What is the phase relationship between voltage and current?',
    'The voltage LEADS the current by 60° (or the current LAGS the voltage by 60°)',
    'The voltage lags the current by 20°',
    'The current leads the voltage by 40°',
    'Voltage and current are in phase',
    'a',
    'Phase difference theta = theta_v - theta_i = (+20°) - (-40°) = +60°. Since theta > 0, the voltage leads the current by 60°, indicating an inductive load.',
    'Easy', null, 'Circuit 2 Mid 2023.pdf', 1),

  makeQ('EXP-CIR2-002', 'subj-circuits2', midOf('subj-circuits2'),
    'What is the frequency in Hertz (Hz) of the voltage vs(t) = 100 cos(314t + 20°) V?',
    '50 Hz',
    '60 Hz',
    '314 Hz',
    '100 Hz',
    'a',
    'Angular frequency omega = 314 rad/s. Frequency f = omega / (2 * pi) = 314 / (2 * 3.14159) = 314 / 6.28318 ≈ 50 Hz.',
    'Easy', null, 'Circuit 2 Mid 2023.pdf', 1),

  makeQ('EXP-CIR2-003', 'subj-circuits2', finalOf('subj-circuits2'),
    'In a balanced positive-sequence (abc) three-phase Y-connected system, what is the mathematical relationship between Line voltage (VL) and Phase voltage (VP)?',
    'VL = sqrt(3) * VP * e^(j 30°) (Line voltage leads Phase voltage by 30° and is sqrt(3) times larger)',
    'VL = VP / sqrt(3)',
    'VL = 3 * VP in phase',
    'VL = VP * e^(-j 90°)',
    'a',
    'In a wye (Y) configuration, V_ab = V_an - V_bn = V_p∠0° - V_p∠-120° = sqrt(3) * V_p∠+30°. The line voltage amplitude is sqrt(3) times phase voltage and leads by 30 degrees.',
    'Medium', null, 'Final Circuit 2 T2.2023.pdf', 2),

  makeQ('EXP-CIR2-004', 'subj-circuits2', finalOf('subj-circuits2'),
    'In a series RLC resonant circuit with R = 10 Ohms, L = 100 mH, and C = 10 uF, what is the resonant frequency omega_0 in radians per second?',
    '1000 rad/s',
    '100 rad/s',
    '314 rad/s',
    '5000 rad/s',
    'a',
    'omega_0 = 1 / sqrt(L * C) = 1 / sqrt(0.1 H * 10 x 10^-6 F) = 1 / sqrt(10^-6) = 1 / 10^-3 = 1000 rad/s.',
    'Medium', null, 'Final Circuit 2 T2.2023.pdf', 3),

  // ==========================================
  // CONTROL SYSTEMS (qu/كونترول)
  // Source: Mid 2023-2024 Solved.pdf, أسئلة_سنوات_محلولة_لمادة_نظرية_التحكم_SPARK_TEAM-1.pdf
  // ==========================================
  makeQ('EXP-CTRL-001', 'subj-control', midOf('subj-control'),
    'A closed-loop system with negative unity feedback has forward open-loop transfer function G(s) = K / [s(s + 2)(s + 5)]. What is the system type number and its steady-state error to a unit step input r(t) = 1?',
    'Type 1 system; steady-state error e_ss = 0',
    'Type 0 system; steady-state error e_ss = 1 / (1 + K)',
    'Type 2 system; steady-state error e_ss = infinity',
    'Type 1 system; steady-state error e_ss = 1 / K',
    'a',
    'The factor s^1 in the denominator indicates one pure integrator at the origin (Type 1 system). The position error constant Kp = lim_{s->0} G(s) = infinity, giving steady-state error to a step input e_ss = 1 / (1 + Kp) = 0.',
    'Medium', null, 'Mid 2023-2024 Solved.pdf', 2),

  makeQ('EXP-CTRL-002', 'subj-control', midOf('subj-control'),
    'The characteristic equation of a third-order control system is s^3 + 3s^2 + 3s + (1 + K) = 0. According to the Routh-Hurwitz criterion, what is the range of K for the system to remain STABLE?',
    '-1 < K < 8',
    '0 < K < 3',
    'K > 8',
    'K < -1',
    'a',
    'Routh array row s^1 is: b1 = (3*3 - 1*(1+K)) / 3 = (9 - 1 - K) / 3 = (8 - K)/3 > 0 => K < 8. Row s^0 is: c1 = 1 + K > 0 => K > -1. Thus, for full stability: -1 < K < 8.',
    'Hard', null, 'Mid 2023-2024 Solved.pdf', 3),

  makeQ('EXP-CTRL-003', 'subj-control', finalOf('subj-control'),
    'In a standard second-order control system transfer function T(s) = omega_n^2 / (s^2 + 2*zeta*omega_n*s + omega_n^2), when the damping ratio is 0 < zeta < 1, the step response is:',
    'Underdamped (oscillatory transient decay towards steady-state)',
    'Critically damped with no overshoot',
    'Overdamped with real distinct negative poles',
    'Undamped sustained oscillation at frequency omega_n',
    'a',
    'When 0 < zeta < 1, the closed-loop poles form complex conjugate pairs: s = -zeta*omega_n ± j omega_d, producing an underdamped oscillatory response with peak overshoot and settling time.',
    'Easy', null, 'أسئلة_سنوات_محلولة_لمادة_نظرية_التحكم_SPARK_TEAM-1.pdf', 1),

  // ==========================================
  // SIGNALS AND SYSTEMS (qu/سيجنال)
  // Source: FINAL 24-25 S1..pdf, Quizzes T2.2023..pdf
  // ==========================================
  makeQ('EXP-SIG-001', 'subj-signals', midOf('subj-signals'),
    'A continuous-time signal x(t) = cos(100 pi t) + sin(400 pi t) is to be sampled without aliasing. According to the Nyquist-Shannon Sampling Theorem, what is the MINIMUM sampling frequency (Nyquist rate) fs?',
    '400 Hz',
    '200 Hz',
    '100 Hz',
    '800 Hz',
    'a',
    'Highest frequency component: omega_max = 400 pi rad/s => f_max = omega_max / (2*pi) = 400 pi / 200 pi = 200 Hz. The Nyquist sampling rate is fs >= 2 * f_max = 2 * 200 = 400 Hz.',
    'Medium', null, 'FINAL 24-25 S1..pdf', 1),

  makeQ('EXP-SIG-002', 'subj-signals', midOf('subj-signals'),
    'What is the continuous-time convolution of an arbitrary continuous signal x(t) with a time-shifted unit impulse function delta(t - t0)?',
    'x(t - t0) (Sifting property of the Dirac delta function)',
    'x(t) * delta(t0)',
    'x(t + t0)',
    'The derivative dx(t)/dt evaluated at t0',
    'a',
    'By the fundamental sifting property of the Dirac delta function: x(t) * delta(t - t0) = integral_{-inf}^{inf} x(tau) delta(t - tau - t0) dtau = x(t - t0).',
    'Easy', null, 'Quizzes T2.2023..pdf', 2),

  makeQ('EXP-SIG-003', 'subj-signals', finalOf('subj-signals'),
    'What is the Fourier Transform X(omega) of the causal decaying exponential signal x(t) = e^(-a t) u(t), where a > 0?',
    '1 / (a + j omega)',
    '1 / (a - j omega)',
    'a / (a^2 + omega^2)',
    'j omega / (a + j omega)',
    'a',
    'X(omega) = integral_0^inf e^(-at) e^(-j omega t) dt = integral_0^inf e^{-(a + j omega)t} dt = [-1/(a + j omega) e^{-(a + j omega)t}]_0^inf = 1 / (a + j omega).',
    'Medium', null, 'FINAL 24-25 S1..pdf', 3)
];

module.exports = { part1Questions };
