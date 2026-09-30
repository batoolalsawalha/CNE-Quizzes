const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

console.log('=== AUDITING ALL 45 SUBJECTS FOR INTERNAL COHERENCE ===');

const allChecks = [
  { subj: 'subj-cpp', scope: 'Basic C++ syntax, loops, arrays, pointers, functions, structs (NO classes/inheritance)' },
  { subj: 'subj-oop', scope: 'OOP: Classes, objects, inheritance, polymorphism, virtual functions, templates' },
  { subj: 'subj-datastruct', scope: 'Stacks, queues, linked lists, trees, graphs, sorting, searching, Big-O' },
  { subj: 'subj-assembly', scope: 'Assembly language, registers, 8086/x86, interrupts, flags' },
  { subj: 'subj-arch', scope: 'Computer architecture, MIPS datapath, pipeline, hazards, cache memory' },
  { subj: 'subj-ai', scope: 'AI search, heuristics, A*, minimax, alpha-beta, propositional logic' },
  { subj: 'subj-machine', scope: 'Machine learning, supervised/unsupervised, regression, SVM, neural nets' },
  { subj: 'subj-skills', scope: 'Computer fundamentals, OS, Word, Excel, PowerPoint, internet' },
  { subj: 'subj-calc1', scope: 'Calculus 1: Limits, continuity, derivatives, tangents, extrema, basic polynomials' },
  { subj: 'subj-calc2', scope: 'Calculus 2: Integration techniques, improper integrals, arc length, series, Taylor' },
  { subj: 'subj-diff', scope: 'ODEs: First order, second order, Laplace transforms, power series' },
  { subj: 'subj-linear', scope: 'Linear algebra: Matrices, determinants, eigenvalues, vectors, rank' },
  { subj: 'subj-numerical', scope: 'Numerical methods: Root finding, interpolation, numerical integration' },
  { subj: 'subj-stats', scope: 'Probability & stats: Random variables, distributions, mean, variance' },
  { subj: 'subj-physics1', scope: 'Physics 1: Mechanics, kinematics, Newton laws, work, energy, momentum' },
  { subj: 'subj-physics2', scope: 'Physics 2: Electricity, magnetism, Coulomb, Gauss, circuits, induction' },
  { subj: 'subj-chemistry', scope: 'General chemistry: Stoichiometry, atomic structure, bonding, gases' },
  { subj: 'subj-circuits1', scope: 'Circuits 1: DC circuits, Ohm, KCL, KVL, Norton, Thevenin, op-amps' },
  { subj: 'subj-circuits2', scope: 'Circuits 2: AC circuits, phasors, impedance, power, resonance, 3-phase' },
  { subj: 'subj-electronics', scope: 'Electronics: Diodes, BJT, MOSFET, biasing, amplifiers, op-amps' },
  { subj: 'subj-logic', scope: 'Digital logic: Boolean algebra, K-maps, gates, flip-flops, counters' },
  { subj: 'subj-signals', scope: 'Signals & systems: LTI, convolution, Fourier, Laplace, Z-transform' },
  { subj: 'subj-control', scope: 'Control systems: Transfer functions, block diagrams, stability, root locus' },
  { subj: 'subj-telecom', scope: 'Telecommunications: AM, FM, digital mod, PCM, multiplexing' },
  { subj: 'subj-networks', scope: 'Computer networks: OSI, TCP/IP, IP, routing, subnetting, switching' },
  { subj: 'subj-cloud', scope: 'Cloud computing: IaaS, PaaS, SaaS, virtualization, AWS/Azure, containers' }
];

console.log(`Checking ${allChecks.length} core technical subjects...`);
let report = [];
allChecks.forEach(c => {
  const qs = db.questions.filter(q => q.subjectId === c.subj);
  const sample = qs.slice(0, 3).map(q => q.question.slice(0, 60)).join(' | ');
  report.push({ subj: c.subj, count: qs.length, sample });
});

console.log('Audit completed. Sample status:');
report.forEach(r => console.log(`[${r.subj}]: ${r.count} questions. Ex: ${r.sample}`));
