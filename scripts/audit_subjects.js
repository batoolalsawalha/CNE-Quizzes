const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

console.log('Total Subjects:', db.subjects.length);
console.log('Total Questions:', db.questions.length);

const checks = [
  {
    subj: 'subj-cpp',
    name: 'C++ Programming',
    forbidden: /class\s+\w+|derived class|virtual\s+destructor|abstract class|polymorphism|operator\s*overload|base class/i,
    reason: 'OOP concept found in C++ fundamentals'
  },
  {
    subj: 'subj-calc1',
    name: 'Calculus 1',
    forbidden: /arc length|trigonometric substitution|integration by parts|partial fractions|p-series|maclaurin|taylor series|power series|improper integral/i,
    reason: 'Calc 2 integration/series topic found in Calc 1'
  },
  {
    subj: 'subj-circuits1',
    name: 'Circuits 1',
    forbidden: /phasor|three-phase|mutual inductance|reactive power|complex power|power factor correction/i,
    reason: 'AC / Circuits 2 topic found in Circuits 1'
  },
  {
    subj: 'subj-physics1',
    name: 'Physics 1',
    forbidden: /coulomb|electric field|magnetic field|faraday|ampere|capacitance|dielectric|gauss's law/i,
    reason: 'Physics 2 (E&M) topic found in Physics 1 (Mechanics)'
  },
  {
    subj: 'subj-physics2',
    name: 'Physics 2',
    forbidden: /projectile|kinematics|torque|angular momentum|moment of inertia|friction on inclined/i,
    reason: 'Physics 1 (Mechanics) topic found in Physics 2 (E&M)'
  },
  {
    subj: 'subj-logic',
    name: 'Digital Logic',
    forbidden: /pipelining|cache memory|virtual memory|mips assembly|branch hazard/i,
    reason: 'Computer Architecture topic found in Logic'
  }
];

let issuesFound = 0;

checks.forEach(c => {
  const qs = db.questions.filter(q => q.subjectId === c.subj);
  const bad = qs.filter(q => c.forbidden.test((q.question || q.text) + ' ' + (q.explanation || '')));
  console.log(`\nChecking [${c.name}] (${c.subj}) - Total: ${qs.length} questions`);
  if (bad.length > 0) {
    console.log(`  WARNING: ${bad.length} questions have issues: ${c.reason}`);
    bad.forEach((b, i) => {
      issuesFound++;
      console.log(`  [${i+1}] ID: ${b.id} | Quiz: ${b.quizId} | Source: ${b.sourceFile}`);
      console.log(`      Text: ${(b.question || b.text).slice(0, 90)}...`);
    });
  } else {
    console.log(`  CLEAN: 0 mismatched questions detected.`);
  }
});

console.log(`\n=== Total Potential Issues Found: ${issuesFound} ===`);
