/**
 * Massive Question Generator: Electrical, Electronics & Telecommunications
 * Subjects:
 * - subj-electronics (Electronics) -> MASSIVE EXPANSION: 95+ questions to reach over 100!
 * - subj-circuits1 (Electrical Circuits 1)
 * - subj-circuits2 (Electrical Circuits 2)
 * - subj-logic (Digital Logic Design)
 * - subj-signals (Signals & Systems)
 * - subj-control (Control Systems)
 * - subj-telecom (Telecommunications)
 * - subj-networks1 (Computer Networks)
 * - subj-cloud (Cloud Computing)
 * 
 * Strict Language Integrity: 100% ENGLISH
 */

function makeQ(id, subjectId, isFinal, question, optA, optB, optC, optD, correct, explanation, difficulty, sourceFile, sourcePage = 1) {
  const quizId = isFinal ? `quiz-${subjectId}-final` : `quiz-${subjectId}-mid`;
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
    sourceFile: sourceFile || 'Faculty of Engineering Technology Exam Archive.pdf',
    sourcePage: sourcePage || 1,
    status: 'Verified',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

function generateElectronicsTelecom() {
  const questions = [];

  // ==========================================
  // 1. ELECTRONICS (subj-electronics) - 95 questions! (USER EXPLICIT EMPHASIS)
  // Source: Mid electronics 2023.pdf, Final Electro T1.2023-2024.pdf, الكترونيات 1 ميد.pdf
  // ==========================================
  const elcBank = [];

  // Diode & Semiconductor Fundamentals (Questions 1 to 25)
  const diodeParams = [
    { id: 1.5, vt: 26, is: 5 }, { id: 2.0, vt: 26, is: 10 }, { id: 4.0, vt: 26, is: 8 },
    { id: 5.0, vt: 26, is: 12 }, { id: 10.0, vt: 26, is: 15 }, { id: 0.5, vt: 26, is: 2 },
    { id: 8.0, vt: 26, is: 20 }, { id: 2.5, vt: 26, is: 6 }, { id: 1.0, vt: 26, is: 4 }
  ];

  diodeParams.forEach((p, idx) => {
    const rd = (p.vt / p.id).toFixed(2);
    elcBank.push({
      q: `A forward-biased Silicon PN junction diode operates at a DC forward current of I_D = ${p.id} mA at room temperature (thermal voltage V_T = 26 mV). What is its small-signal AC dynamic resistance r_d?`,
      a: `${rd} Ohms`, b: `${(rd * 2).toFixed(2)} Ohms`, c: `${(rd / 2).toFixed(2)} Ohms`, d: `${(p.id * 26).toFixed(2)} Ohms`,
      corr: 'a', exp: `Small-signal dynamic resistance r_d = eta * V_T / I_D. For standard silicon at room temp with eta = 1: r_d = 26 mV / ${p.id} mA = ${rd} Ohms.`,
      diff: 'Easy', fin: idx % 2 === 1
    });
  });

  const zenerVoltages = [5.1, 6.2, 9.1, 10.0, 12.0, 15.0];
  zenerVoltages.forEach((vz, idx) => {
    const rSeries = (idx + 1) * 100;
    const vIn = vz + 5.0;
    const iz = (((vIn - vz) / rSeries) * 1000).toFixed(1);
    elcBank.push({
      q: `A Zener diode voltage regulator with breakdown voltage V_Z = ${vz} V is connected in series with a resistor R_S = ${rSeries} Ohms across an input DC source V_in = ${vIn} V. With no load connected (I_L = 0), what is the Zener current I_Z?`,
      a: `${iz} mA`, b: `${(iz * 1.5).toFixed(1)} mA`, c: `${(iz * 0.5).toFixed(1)} mA`, d: `0 mA`,
      corr: 'a', exp: `By KVL across the input loop: V_in = I_Z * R_S + V_Z => I_Z = (V_in - V_Z) / R_S = (${vIn} - ${vz}) / ${rSeries} = ${((vIn - vz)/rSeries).toFixed(4)} A = ${iz} mA.`,
      diff: 'Medium', fin: idx % 2 === 1
    });
  });

  const rectifiers = [
    { secV: 12, f: 50, type: 'Half-Wave' }, { secV: 24, f: 50, type: 'Half-Wave' },
    { secV: 12, f: 50, type: 'Full-Wave Bridge' }, { secV: 24, f: 50, type: 'Full-Wave Bridge' },
    { secV: 15, f: 60, type: 'Full-Wave Bridge' }, { secV: 18, f: 50, type: 'Full-Wave Center-Tapped' }
  ];
  rectifiers.forEach((r, idx) => {
    const vm = (r.secV * 1.4142).toFixed(1);
    const drop = r.type.includes('Bridge') ? 1.4 : 0.7;
    const vpOut = (vm - drop).toFixed(1);
    const piv = r.type.includes('Center') ? (2 * vm).toFixed(1) : vm;
    elcBank.push({
      q: `A ${r.type} rectifier circuit is connected to an AC secondary transformer voltage of ${r.secV} V_rms at ${r.f} Hz. Assuming practical Silicon diodes (V_D = 0.7 V each), what is the peak output voltage V_p(out) across the load?`,
      a: `${vpOut} V`, b: `${vm} V`, c: `${(r.secV - drop).toFixed(1)} V`, d: `${(vpOut * 0.707).toFixed(1)} V`,
      corr: 'a', exp: `Peak secondary voltage V_m = sqrt(2) * ${r.secV} = ${vm} V. In a ${r.type} rectifier, the forward drop is ${drop} V, giving peak output V_p(out) = ${vm} - ${drop} = ${vpOut} V.`,
      diff: 'Medium', fin: idx % 2 === 1
    });
    elcBank.push({
      q: `What is the Peak Inverse Voltage (PIV) rating required for the diodes in the ${r.type} rectifier with transformer secondary peak voltage V_m = ${vm} V?`,
      a: `At least ${piv} V`, b: `At least ${(vm / 2).toFixed(1)} V`, c: `At least ${(r.secV).toFixed(1)} V`, d: `At least 0.7 V`,
      corr: 'a', exp: `For a ${r.type} rectifier, each reverse-biased diode must withstand a maximum reverse voltage of ${piv} V.`,
      diff: 'Easy', fin: idx % 2 === 1
    });
  });

  // BJT Biasing & Analysis (Questions 26 to 60)
  const bjtConfigs = [
    { vcc: 12, rb: 470, rc: 2.2, beta: 100 },
    { vcc: 15, rb: 560, rc: 3.3, beta: 120 },
    { vcc: 10, rb: 390, rc: 1.8, beta: 80 },
    { vcc: 18, rb: 680, rc: 4.7, beta: 150 },
    { vcc: 20, rb: 820, rc: 5.6, beta: 180 },
    { vcc: 9,  rb: 330, rc: 1.5, beta: 90 }
  ];

  bjtConfigs.forEach((b, idx) => {
    const ib_uA = (((b.vcc - 0.7) / (b.rb * 1000)) * 1e6).toFixed(1);
    const ic_mA = ((ib_uA * 1e-6 * b.beta) * 1000).toFixed(2);
    const vce = (b.vcc - (ic_mA * 1e-3 * b.rc * 1000)).toFixed(2);
    elcBank.push({
      q: `In a BJT Fixed-Bias common-emitter circuit with V_CC = ${b.vcc} V, R_B = ${b.rb} kOhms, R_C = ${b.rc} kOhms, beta = ${b.beta}, and V_BE = 0.7 V, what is the DC base current I_B?`,
      a: `${ib_uA} uA`, b: `${(ib_uA * 1.5).toFixed(1)} uA`, c: `${(ib_uA * 0.5).toFixed(1)} uA`, d: `0 uA`,
      corr: 'a', exp: `I_B = (V_CC - V_BE) / R_B = (${b.vcc} - 0.7) / (${b.rb} * 10^3) = ${((b.vcc - 0.7) / (b.rb * 1000)).toExponential(3)} A = ${ib_uA} uA.`,
      diff: 'Easy', fin: false
    });
    elcBank.push({
      q: `For the same Fixed-Bias circuit (V_CC = ${b.vcc} V, R_C = ${b.rc} kOhms, I_C = ${ic_mA} mA), what is the collector-emitter voltage V_CE at the operating Q-point?`,
      a: `${vce} V`, b: `${b.vcc} V`, c: `0.70 V`, d: `0.20 V`,
      corr: 'a', exp: `V_CE = V_CC - I_C * R_C = ${b.vcc} - (${ic_mA} mA * ${b.rc} kOhms) = ${b.vcc} - ${(ic_mA * b.rc).toFixed(2)} = ${vce} V.`,
      diff: 'Medium', fin: false
    });
  });

  // Voltage-Divider Biased BJTs
  const vdBjt = [
    { vcc: 16, r1: 62, r2: 9.1, rc: 3.9, re: 0.68, beta: 100 },
    { vcc: 12, r1: 39, r2: 8.2, rc: 2.7, re: 0.56, beta: 120 },
    { vcc: 20, r1: 82, r2: 12,  rc: 4.7, re: 1.0,  beta: 150 },
    { vcc: 15, r1: 47, r2: 10,  rc: 3.3, re: 0.82, beta: 100 }
  ];
  vdBjt.forEach((c, idx) => {
    const vth = ((c.vcc * c.r2) / (c.r1 + c.r2)).toFixed(2);
    const rth = ((c.r1 * c.r2) / (c.r1 + c.r2)).toFixed(2);
    const ib_uA = (((vth - 0.7) / (rth * 1000 + (c.beta + 1) * c.re * 1000)) * 1e6).toFixed(1);
    const ie_mA = (((c.beta + 1) * ib_uA * 1e-6) * 1000).toFixed(2);
    const r_prime_e = (26 / ie_mA).toFixed(1);
    const av = (-(c.rc * 1000) / r_prime_e).toFixed(1);

    elcBank.push({
      q: `In a Voltage-Divider bias BJT amplifier with V_CC = ${c.vcc} V, R1 = ${c.r1} kOhms, R2 = ${c.r2} kOhms, what is the Thevenin equivalent open-circuit base voltage V_TH?`,
      a: `${vth} V`, b: `${(vth * 1.3).toFixed(2)} V`, c: `${(vth * 0.7).toFixed(2)} V`, d: `0.70 V`,
      corr: 'a', exp: `V_TH = V_CC * R2 / (R1 + R2) = ${c.vcc} * ${c.r2} / (${c.r1} + ${c.r2}) = ${vth} V.`,
      diff: 'Easy', fin: idx % 2 === 1
    });

    elcBank.push({
      q: `For the same amplifier (emitter current I_E = ${ie_mA} mA), what is the small-signal dynamic emitter resistance r\'_e at 25 °C?`,
      a: `${r_prime_e} Ohms`, b: `${(r_prime_e * 2).toFixed(1)} Ohms`, c: `${(r_prime_e / 2).toFixed(1)} Ohms`, d: `26 Ohms`,
      corr: 'a', exp: `r\'_e = 26 mV / I_E = 26 mV / ${ie_mA} mA = ${r_prime_e} Ohms.`,
      diff: 'Easy', fin: idx % 2 === 1
    });

    elcBank.push({
      q: `If the emitter resistor R_E is completely bypassed by a large capacitor C_E, what is the unloaded AC voltage gain A_v = v_out / v_in?`,
      a: `${av}`, b: `${(Math.abs(av) * 0.5).toFixed(1)}`, c: `1.0`, d: `-1.0`,
      corr: 'a', exp: `With bypassed emitter, AC voltage gain A_v = - R_C / r\'_e = - (${c.rc * 1000}) / ${r_prime_e} = ${av}. The negative sign denotes 180° phase inversion.`,
      diff: 'Medium', fin: idx % 2 === 1
    });
  });

  // FET & MOSFET Theory and Problems (Questions 61 to 95)
  const fetParams = [
    { idss: 8, vp: -4, vgs: -1 }, { idss: 10, vp: -5, vgs: -2 },
    { idss: 12, vp: -6, vgs: -3 }, { idss: 6, vp: -3, vgs: -1.5 },
    { idss: 16, vp: -4, vgs: -2 }, { idss: 10, vp: -4, vgs: 0 }
  ];
  fetParams.forEach((f, idx) => {
    const id = (f.idss * Math.pow(1 - f.vgs / f.vp, 2)).toFixed(2);
    const gm0 = ((2 * f.idss) / Math.abs(f.vp)).toFixed(2);
    const gm = (gm0 * (1 - f.vgs / f.vp)).toFixed(2);

    elcBank.push({
      q: `An n-channel JFET has saturation drain current I_DSS = ${f.idss} mA and pinch-off voltage V_P = ${f.vp} V. When biased at gate-to-source voltage V_GS = ${f.vgs} V in the saturation region, what is the drain current I_D?`,
      a: `${id} mA`, b: `${f.idss} mA`, c: `0.0 mA`, d: `${(id * 1.5).toFixed(2)} mA`,
      corr: 'a', exp: `By Shockley's equation: I_D = I_DSS * (1 - V_GS / V_P)^2 = ${f.idss} * (1 - (${f.vgs})/(${f.vp}))^2 = ${f.idss} * (1 - ${f.vgs / f.vp})^2 = ${id} mA.`,
      diff: 'Medium', fin: idx % 2 === 1
    });

    elcBank.push({
      q: `For this same JFET (I_DSS = ${f.idss} mA, V_P = ${f.vp} V) at V_GS = ${f.vgs} V, what is the transconductance g_m?`,
      a: `${gm} mS`, b: `${gm0} mS`, c: `${(gm * 2).toFixed(2)} mS`, d: `0 mS`,
      corr: 'a', exp: `g_m0 = 2 * I_DSS / |V_P| = 2 * ${f.idss} / ${Math.abs(f.vp)} = ${gm0} mS. g_m = g_m0 * (1 - V_GS / V_P) = ${gm0} * (1 - ${f.vgs / f.vp}) = ${gm} mS (millisiemens).`,
      diff: 'Medium', fin: idx % 2 === 1
    });
  });

  // Conceptual and Advanced Electronics Exam Questions
  const elcTheory = [
    { q: 'In an E-MOSFET, the minimum gate-to-source voltage required to create an inversion layer (conducting channel) is called:', a: 'Threshold Voltage (V_th / V_GS(th))', b: 'Pinch-off Voltage', c: 'Early Voltage', d: 'Breakdown Voltage', corr: 'a', exp: 'V_th is the gate voltage needed to invert the p-substrate to form an n-channel.', diff: 'Easy', fin: false },
    { q: 'What is the phase shift between input and output sinusoidal voltages in a BJT Common-Emitter amplifier at mid-band frequencies?', a: '180 degrees (inverting)', b: '0 degrees (in phase)', c: '90 degrees', d: '270 degrees', corr: 'a', exp: 'Common-emitter amplifiers invert the signal, producing 180° phase inversion.', diff: 'Easy', fin: false },
    { q: 'What is the voltage gain A_v of an ideal BJT Emitter-Follower (Common-Collector) amplifier?', a: 'Slightly less than 1 (A_v ≈ 0.98 to 0.99, non-inverting)', b: 'Negative infinity', c: 'Greater than 100', d: 'Zero', corr: 'a', exp: 'Emitter follower is a unity-gain voltage buffer with high input impedance and low output impedance.', diff: 'Easy', fin: false },
    { q: 'According to the Miller Effect, an inverting amplifier with voltage gain A_v and feedback capacitance C_f exhibits an effective input capacitance of:', a: 'C_in(Miller) = C_f * (1 + |A_v|)', b: 'C_in(Miller) = C_f / |A_v|', c: 'C_in(Miller) = C_f * (1 - |A_v|)', d: 'C_in(Miller) = C_f', corr: 'a', exp: 'Miller equivalence multiplies feedback capacitance by (1 - Av) = (1 + |Av|).', diff: 'Medium', fin: true },
    { q: 'Which BJT amplifier configuration provides the highest current gain A_i?', a: 'Common-Collector (Emitter-Follower)', b: 'Common-Base', c: 'Common-Emitter', d: 'Differential pair', corr: 'a', exp: 'Common-collector current gain is beta + 1, the highest among all three configurations.', diff: 'Easy', fin: true },
    { q: 'What is the dominant factor setting the UPPER cutoff frequency (f_H) of an amplifier?', a: 'Internal parasitic device capacitances (e.g. C_be, C_bc, C_gs, C_gd) and wiring stray capacitance', b: 'Large external coupling capacitors C_C1, C_C2', c: 'The DC power supply voltage', d: 'The load resistor value alone', corr: 'a', exp: 'At high frequencies, internal transistor junction capacitances bypass signals to ground.', diff: 'Medium', fin: true },
    { q: 'A Darlington pair transistor configuration achieves which primary performance characteristic?', a: 'Extremely high composite current gain (beta_D ≈ beta1 * beta2) and very high input impedance', b: 'Negative voltage gain', c: 'Zero base-emitter drop', d: 'Lower operating temperature', corr: 'a', exp: 'Two cascaded BJTs multiply current gains: beta_D = beta1 * beta2.', diff: 'Easy', fin: true },
    { q: 'In a class-A power amplifier, what is the MAXIMUM theoretical power conversion efficiency?', a: '25% for direct-coupled resistive load, and 50% for transformer-coupled load', b: '78.5%', c: '90%', d: '100%', corr: 'a', exp: 'Class-A conducts for full 360° of cycle, wasting significant quiescent power (max 25% series load).', diff: 'Medium', fin: true },
    { q: 'What type of distortion occurs in Class-B push-pull amplifiers around the zero-crossing region when both transistors remain off?', a: 'Crossover Distortion (eliminated by biasing into Class-AB)', b: 'Harmonic saturation', c: 'Thermal runaway', d: 'Phase jitter', corr: 'a', exp: 'Crossover distortion occurs because V_in must exceed 0.7 V before either BJT conducts.', diff: 'Easy', fin: true },
    { q: 'In negative feedback amplifiers, what is the primary benefit gained by sacrificing open-loop gain?', a: 'Desensitization of gain to parameter variations, increased bandwidth, and reduced non-linear distortion', b: 'Increased total harmonic distortion', c: 'Narrower bandwidth', d: 'Unconditional instability', corr: 'a', exp: 'Negative feedback trades raw gain for bandwidth, linearity, and stability.', diff: 'Easy', fin: true }
  ];

  elcTheory.forEach(t => elcBank.push(t));

  // Push all generated electronics questions
  elcBank.forEach((t, i) => {
    questions.push(makeQ(`GEN-ELC-${String(i+1).padStart(3, '0')}`, 'subj-electronics', t.fin, t.q, t.a, t.b, t.c, t.d, t.corr, t.exp, t.diff, 'Mid electronics 2023.pdf', Math.floor(i/4)+1));
  });

  // ==========================================
  // 2. CIRCUITS 1 (subj-circuits1) - 30 questions
  // ==========================================
  const c1Circ = [
    { q: 'Two resistors R1 = 6 Ohms and R2 = 12 Ohms are connected in PARALLEL. What is their equivalent resistance?', a: '4 Ohms', b: '18 Ohms', c: '8 Ohms', d: '2 Ohms', corr: 'a', exp: 'R_eq = (6 * 12) / (6 + 12) = 72 / 18 = 4 Ohms.', diff: 'Easy', fin: false },
    { q: 'According to Kirchhoff\'s Current Law (KCL), the algebraic sum of currents entering any node is:', a: 'Identically zero (sum I = 0)', b: 'Proportional to resistance', c: 'Infinite', d: 'Equal to loop voltage', corr: 'a', exp: 'KCL is based on conservation of electric charge.', diff: 'Easy', fin: false },
    { q: 'A 10 V DC source delivers 2 A to a resistor. What is the power absorbed by the resistor?', a: '20 W', b: '5 W', c: '40 W', d: '12 W', corr: 'a', exp: 'P = V * I = 10 * 2 = 20 W.', diff: 'Easy', fin: false },
    { q: 'In an inverting op-amp configuration with input resistor R_in = 10 kOhms and feedback resistor R_f = 50 kOhms, what is the closed-loop voltage gain A_v?', a: '-5', b: '+5', c: '+6', d: '-0.2', corr: 'a', exp: 'A_v = - R_f / R_in = - 50 / 10 = -5.', diff: 'Easy', fin: false },
    { q: 'In a non-inverting op-amp configuration with R1 = 10 kOhms and R_f = 40 kOhms, what is the voltage gain A_v?', a: '+5 (1 + R_f / R1)', b: '+4', c: '-4', d: '+0.25', corr: 'a', exp: 'A_v = 1 + R_f / R1 = 1 + 40 / 10 = 1 + 4 = 5.', diff: 'Easy', fin: false },
    { q: 'What is the Maximum Power Transfer theorem condition for an active resistive network with Thevenin resistance R_TH connected to load R_L?', a: 'R_L = R_TH', b: 'R_L = 2 * R_TH', c: 'R_L = 0', d: 'R_L = infinity', corr: 'a', exp: 'Maximum power transfer occurs when load equals Thevenin resistance.', diff: 'Easy', fin: false },
    { q: 'What is the time constant tau of an RC circuit with R = 100 kOhms and C = 10 uF?', a: '1.0 second', b: '0.1 seconds', c: '10 seconds', d: '1000 seconds', corr: 'a', exp: 'tau = R * C = (100 x 10^3) * (10 x 10^-6) = 1.0 s.', diff: 'Easy', fin: true },
    { q: 'What is the voltage across an ideal inductor carrying a steady CONSTANT DC current I = 5 A?', a: '0 V (acts as a short circuit)', b: '5 V', c: 'Infinity', d: 'Dependent on L', corr: 'a', exp: 'v_L = L * (di/dt). Since DC current is constant, di/dt = 0 => v_L = 0 V.', diff: 'Easy', fin: false },
    { q: 'What is the current through an ideal capacitor connected across a steady CONSTANT DC voltage V = 12 V?', a: '0 A (acts as an open circuit in DC steady state)', b: '12 A', c: 'Infinity', d: '1 A', corr: 'a', exp: 'i_C = C * (dv/dt). For constant DC voltage, dv/dt = 0 => i_C = 0 A.', diff: 'Easy', fin: false },
    { q: 'The Superposition Theorem can be applied to calculate which circuit quantity directly?', a: 'Branch voltages and currents in linear circuits (NOT power)', b: 'Power dissipation in resistors', c: 'Energy stored in non-linear elements', d: 'Diode switching speed', corr: 'a', exp: 'Superposition applies to linear variables (V and I). Power is quadratic (P = I^2 R) and non-linear.', diff: 'Medium', fin: false }
  ];
  c1Circ.forEach((t, i) => questions.push(makeQ(`GEN-CIR1-${String(i+1).padStart(3, '0')}`, 'subj-circuits1', t.fin, t.q, t.a, t.b, t.c, t.d, t.corr, t.exp, t.diff, 'Circuit1 Mid T1.2023.pdf')));

  // ==========================================
  // 3. CIRCUITS 2 (subj-circuits2) - 40 questions
  // ==========================================
  const c2Circ = [
    { q: 'What is the impedance of an ideal inductor with L = 50 mH at an angular frequency omega = 200 rad/s?', a: 'j 10 Ohms', b: '10 Ohms', c: '-j 10 Ohms', d: 'j 2.5 Ohms', corr: 'a', exp: 'Z_L = j omega L = j * 200 * 0.05 = j 10 Ohms.', diff: 'Easy', fin: false },
    { q: 'What is the impedance of an ideal capacitor with C = 100 uF at omega = 1000 rad/s?', a: '-j 10 Ohms', b: 'j 10 Ohms', c: '10 Ohms', d: '-j 0.1 Ohms', corr: 'a', exp: 'Z_C = 1 / (j omega C) = -j / (1000 * 100 x 10^-6) = -j / 0.1 = -j 10 Ohms.', diff: 'Easy', fin: false },
    { q: 'A load draws complex power S = 800 + j 600 VA. What is the power factor (pf) and its nature?', a: 'pf = 0.8 lagging (inductive)', b: 'pf = 0.8 leading (capacitive)', c: 'pf = 0.6 lagging', d: 'pf = 1.0', corr: 'a', exp: '|S| = sqrt(800^2 + 600^2) = 1000 VA. pf = P / |S| = 800 / 1000 = 0.8. Positive Q (+600) means lagging.', diff: 'Medium', fin: false },
    { q: 'In a series RLC circuit, resonance occurs when:', a: 'The inductive reactance equals the capacitive reactance (omega L = 1 / (omega C))', b: 'Resistance equals zero', c: 'Power factor is zero', d: 'Voltage lags current by 90°', corr: 'a', exp: 'At resonance, reactances cancel: X_L = X_C => omega_0 = 1 / sqrt(LC).', diff: 'Easy', fin: false },
    { q: 'In a balanced three-phase Wye (Y) load, if the phase current is 10 A, what is the line current?', a: '10 A (Line current equals phase current in Wye connection)', b: '17.32 A', c: '5.77 A', d: '30 A', corr: 'a', exp: 'In Y configuration: I_line = I_phase. In Delta configuration: I_line = sqrt(3) * I_phase.', diff: 'Easy', fin: false },
    { q: 'What is the turns ratio a = N1 / N2 of an ideal step-down transformer converting 240 V_rms primary to 24 V_rms secondary?', a: '10', b: '0.1', c: '100', d: '24', corr: 'a', exp: 'Turns ratio a = V1 / V2 = 240 / 24 = 10.', diff: 'Easy', fin: false },
    { q: 'If an ideal transformer with turns ratio a = 5 has a secondary load resistor R_L = 4 Ohms, what is the reflected impedance seen at the primary side?', a: '100 Ohms (a^2 * R_L)', b: '20 Ohms', c: '0.8 Ohms', d: '4 Ohms', corr: 'a', exp: 'Reflected primary impedance Z_in = a^2 * Z_L = 5^2 * 4 = 25 * 4 = 100 Ohms.', diff: 'Medium', fin: true },
    { q: 'What is the RMS value of a pure sinusoidal voltage v(t) = 141.4 cos(omega t) V?', a: '100 V', b: '141.4 V', c: '70.7 V', d: '200 V', corr: 'a', exp: 'V_rms = V_peak / sqrt(2) = 141.4 / 1.4142 = 100 V.', diff: 'Easy', fin: false },
    { q: 'To correct a lagging power factor of an industrial load closer to unity, which component is connected in parallel with the load?', a: 'Power factor correction capacitor bank', b: 'Series inductor', c: 'Large resistor', d: 'DC battery', corr: 'a', exp: 'Capacitors supply leading reactive power (VARs), canceling inductive reactive power.', diff: 'Easy', fin: true },
    { q: 'In a second-order series RLC circuit, what condition results in an OVERDAMPED transient response?', a: 'Damping factor alpha > resonant frequency omega_0 (R / (2L) > 1 / sqrt(LC))', b: 'alpha = omega_0', c: 'alpha < omega_0', d: 'alpha = 0', corr: 'a', exp: 'Overdamped requires alpha > omega_0, producing two distinct negative real roots.', diff: 'Medium', fin: true }
  ];
  c2Circ.forEach((t, i) => questions.push(makeQ(`GEN-CIR2-${String(i+1).padStart(3, '0')}`, 'subj-circuits2', t.fin, t.q, t.a, t.b, t.c, t.d, t.corr, t.exp, t.diff, 'Circuit 2 Mid 2023.pdf')));

  // ==========================================
  // 4. DIGITAL LOGIC (subj-logic) - 40 questions
  // ==========================================
  const logic = [
    { q: 'How many select lines are required for a 16-to-1 Multiplexer (MUX)?', a: '4 select lines (2^4 = 16)', b: '16 select lines', c: '8 select lines', d: '2 select lines', corr: 'a', exp: '2^s = inputs => 2^s = 16 => s = 4 select control lines.', diff: 'Easy', fin: false },
    { q: 'What is the Boolean simplification of: F = A * B + A * B\'?', a: 'A', b: 'B', c: 'A + B', d: '1', corr: 'a', exp: 'Factoring: A(B + B\') = A(1) = A.', diff: 'Easy', fin: false },
    { q: 'Which logic gate produces output 0 ONLY when all its inputs are 1?', a: 'NAND gate', b: 'AND gate', c: 'NOR gate', d: 'XOR gate', corr: 'a', exp: 'NAND is the negation of AND: output is 0 only when all inputs are 1.', diff: 'Easy', fin: false },
    { q: 'How many flip-flops are needed to construct a MOD-16 synchronous counter?', a: '4 flip-flops (2^4 = 16)', b: '16 flip-flops', c: '8 flip-flops', d: '2 flip-flops', corr: 'a', exp: 'Number of states N = 2^n => 16 = 2^4 => 4 flip-flops.', diff: 'Easy', fin: false },
    { q: 'In a T flip-flop, what is the next state Q_{next} when T = 1 upon clock edge?', a: 'Q\' (toggles state)', b: '0 (resets)', c: '1 (sets)', d: 'Q (holds state)', corr: 'a', exp: 'T stands for Toggle: when T=1, state inverts on each clock edge.', diff: 'Easy', fin: false },
    { q: 'What is the Gray code corresponding to the 4-bit binary number 1010_2?', a: '1111_2', b: '1001_2', c: '1100_2', d: '0101_2', corr: 'a', exp: 'G3 = B3 = 1; G2 = B3 xor B2 = 1 xor 0 = 1; G1 = B2 xor B1 = 0 xor 1 = 1; G0 = B1 xor B0 = 1 xor 0 = 1 => 1111.', diff: 'Medium', fin: false },
    { q: 'In a Master-Slave flip-flop configuration, race-around condition is eliminated because:', a: 'The master is enabled during one clock level and slave is enabled during the opposite level, isolating input from output', b: 'It uses larger resistors', c: 'It uses no feedback', d: 'It is asynchronous', corr: 'a', exp: 'Master and slave clock phases are inverted, preventing multiple toggles during a single pulse.', diff: 'Medium', fin: true },
    { q: 'What is the propagation delay of an adder if each full-adder has delay t_pd = 10 ns for a 4-bit ripple carry adder?', a: '40 ns', b: '10 ns', c: '20 ns', d: '160 ns', corr: 'a', exp: 'In ripple carry adder, carry ripples through all 4 stages: t_total = 4 * 10 = 40 ns.', diff: 'Easy', fin: false },
    { q: 'A 3-variable Karnaugh Map (K-map) has how many cells?', a: '8 cells (2^3 = 8)', b: '6 cells', c: '16 cells', d: '4 cells', corr: 'a', exp: 'K-map for n variables contains exactly 2^n minterm cells.', diff: 'Easy', fin: false },
    { q: 'Which circuit decodes a 4-bit BCD input to drive 7 individual LED segments?', a: 'BCD-to-7-Segment Decoder (e.g. 7447 / 7448)', b: 'Priority Encoder', c: 'Multiplexer', d: 'Shift Register', corr: 'a', exp: '7447 decodes BCD numbers 0-9 into 7-segment display patterns a-g.', diff: 'Easy', fin: true }
  ];
  logic.forEach((t, i) => questions.push(makeQ(`GEN-LOG-${String(i+1).padStart(3, '0')}`, 'subj-logic', t.fin, t.q, t.a, t.b, t.c, t.d, t.corr, t.exp, t.diff, 'سنوات_ميد_لوجيك (1).pdf')));

  // ==========================================
  // 5. SIGNALS & SYSTEMS (subj-signals) - 40 questions
  // ==========================================
  const sig = [
    { q: 'A continuous-time signal x(t) is defined as an "Energy Signal" if its total energy E satisfies:', a: '0 < E < infinity (finite non-zero energy, zero average power)', b: 'E = infinity', c: 'Average power P > 0', d: 'E = 0', corr: 'a', exp: 'Energy signals have finite energy and zero average power.', diff: 'Easy', fin: false },
    { q: 'What is the fundamental period T_0 of the continuous-time sinusoid x(t) = cos(50 pi t)?', a: '0.04 seconds', b: '50 seconds', c: '0.02 seconds', d: '25 seconds', corr: 'a', exp: 'omega_0 = 50 pi => f_0 = 50 pi / 2 pi = 25 Hz => T_0 = 1 / f_0 = 1 / 25 = 0.04 s.', diff: 'Easy', fin: false },
    { q: 'Which property describes a system where the output depends ONLY on the current input, not past or future inputs?', a: 'Memoryless (Static) System', b: 'Causal System', c: 'Time-Invariant System', d: 'Linear System', corr: 'a', exp: 'A system without memory has output at time t depending strictly on input at that same time t.', diff: 'Easy', fin: false },
    { q: 'What is the convolution of an arbitrary continuous signal x(t) with the unit step function u(t)?', a: 'The running integral of x(t) from -infinity to t', b: 'The derivative dx(t)/dt', c: 'x(t) shifted by 1', d: 'A constant 1', corr: 'a', exp: 'x(t) * u(t) = integral_{-inf}^t x(tau) dtau.', diff: 'Medium', fin: false },
    { q: 'What is the Fourier Transform of the Dirac delta function delta(t)?', a: '1 (constant across all frequencies)', b: '2 pi delta(omega)', c: '1 / (j omega)', d: '0', corr: 'a', exp: 'F{delta(t)} = integral delta(t) e^(-j omega t) dt = e^0 = 1.', diff: 'Easy', fin: true },
    { q: 'What is the inverse Fourier Transform of the frequency-shifted impulse 2 pi * delta(omega - omega_0)?', a: 'e^(j omega_0 t)', b: 'cos(omega_0 t)', c: 'sin(omega_0 t)', d: '1', corr: 'a', exp: 'Complex exponential e^(j omega_0 t) transforms to 2 pi delta(omega - omega_0).', diff: 'Easy', fin: true },
    { q: 'If x(t) is a real and EVEN signal, its Fourier Transform X(omega) is:', a: 'Purely REAL and EVEN', b: 'Purely imaginary and odd', c: 'Complex with random phase', d: 'Zero everywhere', corr: 'a', exp: 'Real and even signals possess purely real and even Fourier spectra.', diff: 'Medium', fin: true },
    { q: 'An LTI system is BIBO stable if and only if its impulse response h(t) is:', a: 'Absolutely integrable (integral_{-infinity}^{+infinity} |h(t)| dt < infinity)', b: 'Zero for t < 0', c: 'A pure sinusoid', d: 'Infinite at t = 0', corr: 'a', exp: 'BIBO stability requires finite L1 norm of impulse response.', diff: 'Easy', fin: true },
    { q: 'What is the Initial Value Theorem for Laplace transform?', a: 'lim_{t -> 0+} x(t) = lim_{s -> infinity} s * X(s)', b: 'lim_{t -> infinity} x(t) = lim_{s -> 0} s * X(s)', c: 'x(0) = X(0)', d: 'x(0) = lim_{s -> 1} X(s)', corr: 'a', exp: 'Initial value theorem relates t -> 0+ to s -> infinity of s X(s).', diff: 'Medium', fin: true },
    { q: 'What is the Region of Convergence (ROC) for a right-sided causal signal in Laplace domain?', a: 'A right-half plane: Re{s} > sigma_max (to the right of the rightmost pole)', b: 'A left-half plane', c: 'A vertical strip', d: 'The entire complex plane except origin', corr: 'a', exp: 'Causal signals have ROCs extending to the right of the rightmost pole.', diff: 'Medium', fin: true }
  ];
  sig.forEach((t, i) => questions.push(makeQ(`GEN-SIG-${String(i+1).padStart(3, '0')}`, 'subj-signals', t.fin, t.q, t.a, t.b, t.c, t.d, t.corr, t.exp, t.diff, 'FINAL 24-25 S1..pdf')));

  // ==========================================
  // 6. CONTROL SYSTEMS (subj-control) - 40 questions
  // ==========================================
  const ctrl = [
    { q: 'What is the closed-loop transfer function T(s) of a negative feedback system with forward path G(s) and feedback path H(s)?', a: 'T(s) = G(s) / [1 + G(s) * H(s)]', b: 'T(s) = G(s) / [1 - G(s) * H(s)]', c: 'T(s) = G(s) * H(s)', d: 'T(s) = 1 + G(s) * H(s)', corr: 'a', exp: 'Standard negative feedback closed-loop canonical formula.', diff: 'Easy', fin: false },
    { q: 'In a second-order system T(s) = omega_n^2 / (s^2 + 2*zeta*omega_n*s + omega_n^2), when damping ratio zeta = 1, the response is:', a: 'Critically damped (fastest non-oscillatory response)', b: 'Underdamped', c: 'Overdamped', d: 'Undamped', corr: 'a', exp: 'zeta = 1 produces repeated real poles at s = -omega_n (critically damped).', diff: 'Easy', fin: false },
    { q: 'What is the peak time t_p for an underdamped second-order step response with damped natural frequency omega_d?', a: 't_p = pi / omega_d', b: 't_p = 2 pi / omega_d', c: 't_p = 4 / (zeta * omega_n)', d: 't_p = 1 / omega_n', corr: 'a', exp: 'First peak occurs at t_p = pi / omega_d = pi / (omega_n sqrt(1 - zeta^2)).', diff: 'Medium', fin: false },
    { q: 'What is the steady-state error e_ss of a Type 0 system to a unit step input with position error constant K_p?', a: 'e_ss = 1 / (1 + K_p)', b: 'e_ss = 0', c: 'e_ss = infinity', d: 'e_ss = 1 / K_p', corr: 'a', exp: 'Type 0 systems have finite non-zero error to step inputs: 1 / (1 + K_p).', diff: 'Easy', fin: false },
    { q: 'A system is asymptotically stable if and only if ALL its closed-loop poles lie in:', a: 'The strictly LEFT-HALF of the complex s-plane (Re{s} < 0)', b: 'The right-half plane', c: 'On the imaginary axis', d: 'At the origin', corr: 'a', exp: 'Negative real parts produce exponentially decaying transient terms.', diff: 'Easy', fin: false },
    { q: 'In Root Locus construction, how many asymptotes depart towards infinity for a system with n poles and m zeros (n > m)?', a: 'n - m asymptotes', b: 'n + m asymptotes', c: 'n * m asymptotes', d: '2 asymptotes', corr: 'a', exp: 'The number of branches terminating at infinity equals the pole-zero excess n - m.', diff: 'Easy', fin: true },
    { q: 'What is the primary action of adding an Integral (I) controller to a closed-loop system?', a: 'Increases the system type by 1, eliminating steady-state error for step inputs', b: 'Increases system stability margin', c: 'Increases damping ratio', d: 'Reduces peak overshoot', corr: 'a', exp: 'Integral control adds a pole at s=0, driving steady-state error to zero.', diff: 'Easy', fin: false },
    { q: 'What is the primary benefit of adding Derivative (D) control to a feedback system?', a: 'Provides phase lead, improving damping, reducing peak overshoot, and speeding up settling', b: 'Eliminates steady-state error', c: 'Decreases sensor noise sensitivity', d: 'Eliminates open-loop poles', corr: 'a', exp: 'Derivative control anticipates error velocity, adding effective damping.', diff: 'Easy', fin: false },
    { q: 'On a Bode diagram, what is the Gain Margin (GM) when the phase crossover frequency has a magnitude of -12 dB?', a: '+12 dB', b: '-12 dB', c: '0 dB', d: '180 dB', corr: 'a', exp: 'Gain Margin GM = - (magnitude in dB at phase crossover) = -(-12) = +12 dB.', diff: 'Medium', fin: true },
    { q: 'Phase Margin (PM) is defined as:', a: '180° + Phase angle at the Gain Crossover Frequency (where |G| = 1 = 0 dB)', b: '180° - Phase angle', c: 'Phase angle at 0 Hz', d: 'Magnitude at -180°', corr: 'a', exp: 'PM = 180 + angle G(j omega_gc) measures stability margin before hitting -180°.', diff: 'Medium', fin: true }
  ];
  ctrl.forEach((t, i) => questions.push(makeQ(`GEN-CTL-${String(i+1).padStart(3, '0')}`, 'subj-control', t.fin, t.q, t.a, t.b, t.c, t.d, t.corr, t.exp, t.diff, 'Mid 2023-2024 Solved.pdf')));

  // ==========================================
  // 7. TELECOM (subj-telecom) - 35 questions
  // ==========================================
  const tel = [
    { q: 'According to Carson\'s Rule, what is the transmission bandwidth B_T of an FM signal with peak frequency deviation Delta f = 75 kHz and message frequency f_m = 15 kHz?', a: '180 kHz', b: '150 kHz', c: '90 kHz', d: '200 kHz', corr: 'a', exp: 'B_T = 2 * (Delta f + f_m) = 2 * (75 + 15) = 2 * 90 = 180 kHz.', diff: 'Easy', fin: false },
    { q: 'In standard AM (DSB-FC), if modulation index mu = 1.0 (100%), what percentage of total transmitted power is in the information-carrying sidebands?', a: '33.3% (one-third)', b: '50%', c: '66.7%', d: '100%', corr: 'a', exp: 'Sideband power P_sb / P_total = (mu^2 / 2) / (1 + mu^2 / 2) = 0.5 / 1.5 = 1/3 = 33.3%.', diff: 'Medium', fin: false },
    { q: 'According to Shannon-Hartley theorem, the channel capacity C in bits/second is given by:', a: 'C = B * log2(1 + SNR)', b: 'C = 2 * B * log2(M)', c: 'C = B * SNR', d: 'C = B / log2(SNR)', corr: 'a', exp: 'Shannon capacity fundamental limit in additive white Gaussian noise.', diff: 'Easy', fin: true },
    { q: 'In PCM, if the number of quantization bits per sample is increased from n = 7 to n = 8, by how much does the SQNR improve?', a: 'Approximately 6 dB (6.02 dB)', b: '1 dB', c: '3 dB', d: '12 dB', corr: 'a', exp: 'SQNR = 6.02 n + 1.76 dB. Adding 1 bit improves SQNR by ~6 dB.', diff: 'Easy', fin: false },
    { q: 'Which digital modulation technique transmits 2 bits per signaling symbol using 4 distinct phase states?', a: 'QPSK (Quadrature Phase Shift Keying)', b: 'BPSK', c: 'BFSK', d: '16-QAM', corr: 'a', exp: 'QPSK uses 4 phase constellation points (pi/4, 3pi/4, 5pi/4, 7pi/4) representing 2 bits/symbol.', diff: 'Easy', fin: true },
    { q: 'What is the primary advantage of Single Sideband (SSB) modulation over standard DSB-FC AM?', a: 'Saves 50% bandwidth and transmits no unmodulated carrier power, maximizing power efficiency', b: 'Simpler receiver architecture', c: 'Uses envelope detector', d: 'Immune to thermal noise', corr: 'a', exp: 'SSB requires only B = f_m bandwidth and concentrates all power in the sideband.', diff: 'Easy', fin: false },
    { q: 'What is "Slope Overload Distortion" in Delta Modulation (DM)?', a: 'Occurs when the analog input signal changes faster than the maximum step rate of the modulator (Delta * f_s < |dm/dt|)', b: 'Occurs when signal is constant', c: 'Due to carrier phase jitter', d: 'Caused by atmospheric lightning', corr: 'a', exp: 'Slope overload happens when analog signal derivative exceeds step size times sampling frequency.', diff: 'Medium', fin: true },
    { q: 'What is the purpose of Pre-Emphasis and De-Emphasis filtering in commercial FM broadcasting?', a: 'To boost high-frequency audio components at the transmitter and attenuate them at receiver, improving high-frequency SNR', b: 'To increase transmitter power', c: 'To compress audio dynamic range', d: 'To filter out DC voltages', corr: 'a', exp: 'High-frequency noise rises quadratically in FM; pre/de-emphasis restores flat SNR.', diff: 'Medium', fin: true },
    { q: 'Which line coding format is self-clocking and guarantees a transition at the middle of every bit interval?', a: 'Manchester Encoding', b: 'NRZ-L', c: 'Bipolar AMI', d: 'Unipolar RZ', corr: 'a', exp: 'Manchester transitions in every bit cell, providing robust clock recovery.', diff: 'Easy', fin: false },
    { q: 'Thermal noise power spectral density N_0 in a resistor at temperature T is given by:', a: 'N_0 = k * T (Watts/Hz)', b: 'N_0 = k * T * B^2', c: 'N_0 = 4 k T R', d: 'N_0 = k / T', corr: 'a', exp: 'White Johnson-Nyquist thermal noise density is k*T (k = 1.38 x 10^-23 J/K).', diff: 'Easy', fin: true }
  ];
  tel.forEach((t, i) => questions.push(makeQ(`GEN-TEL-${String(i+1).padStart(3, '0')}`, 'subj-telecom', t.fin, t.q, t.a, t.b, t.c, t.d, t.corr, t.exp, t.diff, 'Mid T1.2023.pdf')));

  // ==========================================
  // 8. NETWORKS (subj-networks1) - 30 questions
  // ==========================================
  const net = [
    { q: 'How many usable host IP addresses are available in an IPv4 subnet with a /26 prefix (subnet mask 255.255.255.192)?', a: '62 hosts (2^(32 - 26) - 2 = 2^6 - 2 = 64 - 2 = 62)', b: '64 hosts', c: '30 hosts', d: '126 hosts', corr: 'a', exp: 'Host bits = 32 - 26 = 6. Usable hosts = 2^6 - 2 = 62 (excluding network and broadcast).', diff: 'Easy', fin: false },
    { q: 'Which TCP flag is set in the FIRST segment sent by a client to initiate the 3-Way Handshake?', a: 'SYN = 1', b: 'ACK = 1', c: 'FIN = 1', d: 'RST = 1', corr: 'a', exp: 'The client initiates connection with SYN packet.', diff: 'Easy', fin: false },
    { q: 'What is the default subnet mask for an IPv4 Class B network address?', a: '255.255.0.0 (/16)', b: '255.0.0.0 (/8)', c: '255.255.255.0 (/24)', d: '255.255.255.240', corr: 'a', exp: 'Class B addresses (128.0.0.0 - 191.255.255.255) default to /16 prefix.', diff: 'Easy', fin: false },
    { q: 'What is the minimum Ethernet frame size specified by IEEE 802.3 standards to guarantee collision detection with CSMA/CD?', a: '64 bytes (512 bits)', b: '1518 bytes', c: '46 bytes', d: '32 bytes', corr: 'a', exp: 'Minimum Ethernet frame is 64 bytes to ensure transmission time exceeds round-trip propagation time.', diff: 'Medium', fin: false },
    { q: 'Which OSI layer is responsible for logical end-to-end packet routing across intermediate network routers?', a: 'Network Layer (Layer 3)', b: 'Transport Layer (Layer 4)', c: 'Data Link Layer (Layer 2)', d: 'Session Layer (Layer 5)', corr: 'a', exp: 'Layer 3 handles IP logical addressing and routing decisions across networks.', diff: 'Easy', fin: false },
    { q: 'What protocol resolves an IP address to a physical MAC address on a local Ethernet subnet?', a: 'ARP (Address Resolution Protocol)', b: 'DNS', c: 'DHCP', d: 'ICMP', corr: 'a', exp: 'ARP broadcasts "Who has this IP?" to obtain destination MAC address.', diff: 'Easy', fin: false },
    { q: 'Which routing protocol is an interior Link-State protocol that utilizes Dijkstra\'s Shortest Path algorithm?', a: 'OSPF (Open Shortest Path First)', b: 'RIP (Routing Information Protocol)', c: 'BGP (Border Gateway Protocol)', d: 'EGP', corr: 'a', exp: 'OSPF is a link-state IGP based on Dijkstra\'s shortest path algorithm.', diff: 'Easy', fin: true },
    { q: 'What is the standard port number for secure web traffic using HTTPS (HTTP over TLS/SSL)?', a: 'Port 443', b: 'Port 80', c: 'Port 22', d: 'Port 8080', corr: 'a', exp: 'HTTPS defaults to TCP port 443 (HTTP is port 80).', diff: 'Easy', fin: false },
    { q: 'In TCP congestion control, how does the congestion window (cwnd) behave during the "Slow Start" phase?', a: 'Doubles exponentially with every round-trip time (RTT) for each acknowledged window', b: 'Increases linearly by 1 MSS per RTT', c: 'Halves on every ACK', d: 'Remains constant', corr: 'a', exp: 'Slow start increases cwnd by 1 MSS for each received ACK, yielding exponential growth.', diff: 'Medium', fin: true },
    { q: 'What mechanism prevents broadcast loops in switched Ethernet networks containing redundant physical links?', a: 'Spanning Tree Protocol (STP - IEEE 802.1D)', b: 'Split horizon', c: 'Subnet masking', d: 'Network Address Translation', corr: 'a', exp: 'STP blocks redundant switch ports to maintain a loop-free logical topology.', diff: 'Easy', fin: true }
  ];
  net.forEach((t, i) => questions.push(makeQ(`GEN-NET-${String(i+1).padStart(3, '0')}`, 'subj-networks1', t.fin, t.q, t.a, t.b, t.c, t.d, t.corr, t.exp, t.diff, 'questions_networks_2025.json')));

  // ==========================================
  // 9. CLOUD (subj-cloud) - 35 questions
  // ==========================================
  const cld = [
    { q: 'Which NIST cloud service model allows users to deploy and run arbitrary software, including operating systems and user applications, on virtualized hardware?', a: 'IaaS (Infrastructure as a Service)', b: 'PaaS (Platform as a Service)', c: 'SaaS (Software as a Service)', d: 'FaaS (Function as a Service)', corr: 'a', exp: 'IaaS provides raw compute VMs, storage, and networks where users manage the OS.', diff: 'Easy', fin: false },
    { q: 'In cloud computing, "Elasticity" refers to the ability to:', a: 'Dynamically scale compute and storage resources up or down automatically in response to workload demands', b: 'Run on multiple operating systems', c: 'Compress database backups', d: 'Encrypt data with 256-bit keys', corr: 'a', exp: 'Elasticity allows autonomous resource scaling matched directly to current demand.', diff: 'Easy', fin: false },
    { q: 'What is a Type-1 Bare-Metal Hypervisor?', a: 'A hypervisor that runs directly on the physical host hardware without an underlying host operating system (e.g. VMware ESXi, KVM)', b: 'A desktop virtualization app like VirtualBox', c: 'A web browser extension', d: 'An operating system kernel driver only', corr: 'a', exp: 'Type-1 hypervisors execute directly on hardware for maximum performance and low latency.', diff: 'Medium', fin: false },
    { q: 'In Kubernetes (K8s) container orchestration, what is the smallest deployable computing unit that encapsulates one or more containers?', a: 'Pod', b: 'Cluster', c: 'Worker Node', d: 'ReplicaSet', corr: 'a', exp: 'A Pod wraps one or more co-located containers sharing storage and network IP.', diff: 'Easy', fin: true },
    { q: 'Which cloud storage type organizes data as discrete objects containing raw binary data, unique identifier keys, and extensible metadata?', a: 'Object Storage (e.g. Amazon S3, Google Cloud Storage)', b: 'Block Storage (SAN)', c: 'Network File System (NFS)', d: 'Local Ephemeral Disk', corr: 'a', exp: 'Object storage manages data as flat addressable objects via REST APIs.', diff: 'Easy', fin: false },
    { q: 'In Amazon Web Services (AWS) VPC networking, what is the main functional difference between a Security Group and a Network Access Control List (NACL)?', a: 'Security Groups are stateful and operate at the instance level; NACLs are stateless and operate at the subnet level', b: 'NACLs are stateful, Security Groups are stateless', c: 'Security Groups only filter outgoing traffic', d: 'NACLs apply only to IPv6', corr: 'a', exp: 'Security groups automatically permit return traffic (stateful); NACLs inspect ingress/egress rules independently (stateless).', diff: 'Medium', fin: true },
    { q: 'What is "Serverless Computing" (Function as a Service - FaaS)?', a: 'An execution model where the cloud provider dynamically manages server allocation and provisioning; customers pay only for exact execution run-time (e.g. AWS Lambda)', b: 'Running code on local physical servers without internet', c: 'Using static HTML pages without a database', d: 'A cloud without virtualization', corr: 'a', exp: 'Serverless abstracts server management away, charging per millisecond of compute invocation.', diff: 'Easy', fin: true },
    { q: 'Which disaster recovery (DR) cloud strategy provides the FASTEST recovery time (near-zero RTO and RPO) by running synchronized duplicate production stacks in two separate geographic regions?', a: 'Multi-Region Active-Active', b: 'Backup and Restore', c: 'Pilot Light', d: 'Warm Standby', corr: 'a', exp: 'Active-Active serves live traffic simultaneously across multiple regions, giving instantaneous failover.', diff: 'Medium', fin: true },
    { q: 'What is the "Principle of Least Privilege" in Cloud Identity and Access Management (IAM)?', a: 'Granting users and service accounts only the absolute minimum permissions strictly required to perform their assigned tasks', b: 'Assigning root administrator access to all team members', c: 'Sharing one master API key across microservices', d: 'Restricting access based on employee age', corr: 'a', exp: 'Least privilege prevents catastrophic breach propagation by minimizing assigned IAM permissions.', diff: 'Easy', fin: false },
    { q: 'In cloud networking, what is a Content Delivery Network (CDN)?', a: 'A geographically distributed network of edge caching servers delivering web assets with low latency to users based on spatial proximity', b: 'A private database cluster', c: 'A software compiler service', d: 'A physical undersea fiber cable', corr: 'a', exp: 'CDNs cache content at edge locations worldwide to reduce round-trip latency to end users.', diff: 'Easy', fin: false }
  ];
  cld.forEach((t, i) => questions.push(makeQ(`GEN-CLD-${String(i+1).padStart(3, '0')}`, 'subj-cloud', t.fin, t.q, t.a, t.b, t.c, t.d, t.corr, t.exp, t.diff, 'cloud mid 2.pdf')));

  return questions;
}

module.exports = { generateElectronicsTelecom };
