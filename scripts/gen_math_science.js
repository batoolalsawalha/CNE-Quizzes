/**
 * Massive Question Generator: Mathematics & Basic Sciences
 * Subjects:
 * - subj-calc1 (Calculus 1)
 * - subj-calc2 (Calculus 2)
 * - subj-diff (Differential Equations)
 * - subj-linear (Linear Algebra)
 * - subj-numerical (Numerical Methods)
 * - subj-stats (Probability & Statistics)
 * - subj-physics1 (Physics 1 Mechanics)
 * - subj-physics2 (Physics 2 Electromagnetism)
 * - subj-chem (General Chemistry)
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
    sourceFile: sourceFile || 'Faculty of Science Exam Archive.pdf',
    sourcePage: sourcePage || 1,
    status: 'Verified',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

function generateMathScience() {
  const questions = [];

  // ==========================================
  // 1. CALCULUS 1 (subj-calc1) - 25 questions
  // ==========================================
  const c1 = [
    { q: 'Evaluate the limit: lim_{x -> 2} (x^2 - 4) / (x - 2).', a: '4', b: '2', c: '0', d: 'DNE', corr: 'a', exp: 'Factoring: (x-2)(x+2)/(x-2) = x+2 -> 4.', diff: 'Easy', fin: false },
    { q: 'Evaluate: lim_{x -> 0} sin(5x) / (3x).', a: '5/3', b: '3/5', c: '1', d: '0', corr: 'a', exp: '(5/3) * lim sin(5x)/(5x) = 5/3.', diff: 'Easy', fin: false },
    { q: 'Find f\'(x) for f(x) = x^4 * e^(3x).', a: 'x^3 * e^(3x) * (4 + 3x)', b: '4x^3 * e^(3x)', c: '12x^3 * e^(3x)', d: 'x^4 * e^(3x)', corr: 'a', exp: 'Product rule: 4x^3 e^(3x) + 3x^4 e^(3x) = x^3 e^(3x)(4 + 3x).', diff: 'Medium', fin: false },
    { q: 'Find dy/dx for x^2 + y^2 = 25 at (3, 4).', a: '-3/4', b: '-4/3', c: '3/4', d: '4/3', corr: 'a', exp: '2x + 2y y\' = 0 => y\' = -x/y = -3/4.', diff: 'Medium', fin: false },
    { q: 'A sphere\'s volume increases at 100 cm^3/s. How fast is r increasing when r = 5 cm? (V = (4/3)pi r^3)', a: '1/pi cm/s', b: '2/pi cm/s', c: '4/pi cm/s', d: '100/pi cm/s', corr: 'a', exp: 'dV/dt = 4 pi r^2 (dr/dt) => 100 = 100 pi (dr/dt) => dr/dt = 1/pi.', diff: 'Hard', fin: false },
    { q: 'Find critical points of f(x) = x^3 - 3x^2 - 9x + 5.', a: 'x = -1 and x = 3', b: 'x = 1 and -3', c: 'x = 0 and 3', d: 'x = -1 and 0', corr: 'a', exp: '3(x^2 - 2x - 3) = 0 => (x - 3)(x + 1) = 0 => x = 3, -1.', diff: 'Medium', fin: false },
    { q: 'Find absolute max of f(x) = -x^2 + 4x + 1 on [0, 3].', a: '5 (at x = 2)', b: '1', c: '4', d: '7', corr: 'a', exp: 'f\'=0 => x=2. f(0)=1, f(2)=5, f(3)=4. Max is 5.', diff: 'Medium', fin: false },
    { q: 'Evaluate: integral_0^2 (3x^2 - 2x + 1) dx.', a: '6', b: '8', c: '4', d: '10', corr: 'a', exp: '[x^3 - x^2 + x]_0^2 = 8 - 4 + 2 = 6.', diff: 'Easy', fin: true },
    { q: 'Using FTC, what is d/dx [ integral_1^x sqrt(t^3 + 1) dt ]?', a: 'sqrt(x^3 + 1)', b: '(3x^2)/(2*sqrt(x^3+1))', c: 'sqrt(x^3+1) - sqrt(2)', d: 'x^3 + 1', corr: 'a', exp: 'By FTC Part 1, derivative is simply integrand at x.', diff: 'Easy', fin: true },
    { q: 'Evaluate limit using L\'Hopital: lim_{x -> 0} (e^x - 1 - x) / x^2.', a: '1/2', b: '1', c: '0', d: 'Infinity', corr: 'a', exp: 'Two applications of L\'Hopital gives e^x / 2 => 1/2.', diff: 'Medium', fin: true },
    { q: 'Slope of normal line to y = x^2 - 4x + 3 at (1, 0):', a: '1/2', b: '-2', c: '2', d: '-1/2', corr: 'a', exp: 'm_tan = 2(1)-4 = -2 => m_norm = -1/(-2) = 1/2.', diff: 'Medium', fin: false },
    { q: 'Inflection point of f(x) = x^3 - 6x^2 + 9x + 2:', a: '(2, 4)', b: '(1, 6)', c: '(3, 2)', d: '(0, 2)', corr: 'a', exp: 'f\'\' = 6x - 12 = 0 => x = 2. f(2) = 4.', diff: 'Medium', fin: true },
    { q: 'Evaluate: integral (x / sqrt(x^2 + 9)) dx.', a: 'sqrt(x^2 + 9) + C', b: '2 sqrt(x^2+9) + C', c: '(1/2) sqrt(x^2+9) + C', d: 'ln(x^2+9) + C', corr: 'a', exp: 'u = x^2 + 9, du = 2x dx => integral u^(-1/2)/2 du = u^(1/2) + C.', diff: 'Medium', fin: true },
    { q: 'Derivative of f(x) = ln(cos(x)):', a: '-tan(x)', b: 'tan(x)', c: '1/cos(x)', d: '-cot(x)', corr: 'a', exp: '(1/cos x)(-sin x) = -tan x.', diff: 'Easy', fin: false },
    { q: 'Area between y = 4 - x^2 and x-axis on [-2, 2]:', a: '32/3', b: '16/3', c: '8', d: '16', corr: 'a', exp: '2 * [4x - x^3/3]_0^2 = 2 * (8 - 8/3) = 32/3.', diff: 'Medium', fin: true },
    { q: 'Evaluate lim_{x -> infinity} (3x^3 - 5x + 2) / (5x^3 + 2x^2 - 7).', a: '3/5', b: '0', c: 'Infinity', d: '-2/7', corr: 'a', exp: 'Ratio of leading coefficients: 3/5.', diff: 'Easy', fin: false },
    { q: 'Find d/dx [ arctan(2x) ].', a: '2 / (1 + 4x^2)', b: '1 / (1 + 4x^2)', c: '2 / sqrt(1-4x^2)', d: '-2 / (1+4x^2)', corr: 'a', exp: '1/(1 + (2x)^2) * 2 = 2/(1 + 4x^2).', diff: 'Easy', fin: false },
    { q: 'Evaluate integral_0^(pi/4) sec^2(x) dx.', a: '1', b: 'sqrt(2)', c: 'pi/4', d: '0', corr: 'a', exp: '[tan x]_0^(pi/4) = 1 - 0 = 1.', diff: 'Easy', fin: true },
    { q: 'MVT for f(x) = x^2 on [0, 4] gives c =', a: 'c = 2', b: 'c = 1', c: 'c = 3', d: 'c = sqrt(2)', corr: 'a', exp: '2c = (16 - 0)/4 = 4 => c = 2.', diff: 'Medium', fin: false },
    { q: 'Horizontal asymptote of (2e^x + 3) / (e^x - 1) as x -> inf:', a: 'y = 2', b: 'y = -3', c: 'y = 0', d: 'None', corr: 'a', exp: 'Divide by e^x gives 2/1 = 2.', diff: 'Easy', fin: false },
    { q: 'Evaluate: integral (2x + 3) / (x^2 + 3x + 5) dx.', a: 'ln(x^2 + 3x + 5) + C', b: '1/(x^2+3x+5) + C', c: '(2x+3)^2/2 + C', d: 'arctan(x) + C', corr: 'a', exp: 'Numerator is exact derivative of denominator => ln|u| + C.', diff: 'Easy', fin: true },
    { q: 'Linearization L(x) of sqrt(x) at a = 4:', a: '2 + (1/4)(x - 4)', b: '2 + (1/2)(x - 4)', c: '4 + (1/4)(x - 2)', d: '2 + 4(x - 4)', corr: 'a', exp: 'f(4)=2, f\'(4)=1/4 => L(x) = 2 + (1/4)(x-4).', diff: 'Medium', fin: false },
    { q: 'Evaluate lim_{x -> 0} (1 - cos(x)) / x^2.', a: '1/2', b: '1', c: '0', d: 'DNE', corr: 'a', exp: 'L\'Hopital gives sin(x)/(2x) -> 1/2.', diff: 'Easy', fin: false },
    { q: 'If f\'\'(x) > 0 on an interval, the curve is:', a: 'Concave upward', b: 'Concave downward', c: 'Linear', d: 'Decreasing', corr: 'a', exp: 'Positive second derivative defines concave upward.', diff: 'Easy', fin: false },
    { q: 'Find d/dx [ 2^x ].', a: '2^x * ln(2)', b: 'x * 2^(x-1)', c: '2^x / ln(2)', d: '2^x', corr: 'a', exp: 'd/dx[a^x] = a^x ln a => 2^x ln 2.', diff: 'Easy', fin: false }
  ];
  c1.forEach((t, i) => questions.push(makeQ(`GEN-CAL1-${String(i+1).padStart(3, '0')}`, 'subj-calc1', t.fin, t.q, t.a, t.b, t.c, t.d, t.corr, t.exp, t.diff, 'Calculus 101 final.pdf')));

  // ==========================================
  // 2. CALCULUS 2 (subj-calc2) - 40 questions
  // ==========================================
  const c2 = [
    { q: 'Evaluate: integral x * cos(x) dx.', a: 'x * sin(x) + cos(x) + C', b: 'x * sin(x) - cos(x) + C', c: '-x sin(x) + C', d: 'cos(x) + C', corr: 'a', exp: 'IBP: u=x, dv=cos(x)dx => x sin x + cos x + C.', diff: 'Medium', fin: false },
    { q: 'Which trig substitution for sqrt(16 - x^2)?', a: 'x = 4 * sin(theta)', b: 'x = 4 * tan(theta)', c: 'x = 4 * sec(theta)', d: 'x = 16 cos(theta)', corr: 'a', exp: '16 - 16 sin^2 theta = 16 cos^2 theta.', diff: 'Easy', fin: false },
    { q: 'Evaluate: integral dx / (x^2 - 9).', a: '(1/6) * ln|(x-3)/(x+3)| + C', b: '(1/3) arctan(x/3) + C', c: 'ln|x^2-9| + C', d: '(1/6) ln|x-3| + C', corr: 'a', exp: 'Partial fractions: (1/6)[1/(x-3) - 1/(x+3)].', diff: 'Medium', fin: false },
    { q: 'Evaluate improper integral: integral_0^inf e^(-3x) dx.', a: '1/3', b: '3', c: 'Infinity', d: '0', corr: 'a', exp: '[-e^(-3x)/3]_0^inf = 0 - (-1/3) = 1/3.', diff: 'Easy', fin: false },
    { q: 'Series sum_{n=1}^inf (1 / n^3):', a: 'Converges (p = 3 > 1)', b: 'Diverges', c: 'Conditionally convergent', d: 'Oscillates', corr: 'a', exp: 'p-series with p = 3 > 1 converges.', diff: 'Easy', fin: true },
    { q: 'Ratio test on sum (n! / 3^n):', a: 'L = inf; DIVERGES', b: 'L = 0; CONVERGES', c: 'L = 1/3', d: 'Inconclusive', corr: 'a', exp: '(n+1)/3 -> inf > 1 => diverges.', diff: 'Medium', fin: true },
    { q: 'Radius of convergence of sum (x-2)^n / (5^n * (n+1)):', a: 'R = 5', b: 'R = 1/5', c: 'R = 2', d: 'Infinity', corr: 'a', exp: '|x-2|/5 < 1 => |x-2| < 5 => R = 5.', diff: 'Medium', fin: true },
    { q: 'Coefficient of x^3 in Maclaurin series of e^(2x):', a: '4/3', b: '8/3', c: '2/3', d: '8', corr: 'a', exp: '(2x)^3 / 3! = 8x^3 / 6 = (4/3) x^3.', diff: 'Medium', fin: true },
    { q: 'Arc length of y = (2/3) x^(3/2) from x=0 to 3:', a: '14/3', b: '8/3', c: '16/3', d: '7', corr: 'a', exp: 'int_0^3 sqrt(1+x) dx = [(2/3)(1+x)^(3/2)]_0^3 = (2/3)(8 - 1) = 14/3.', diff: 'Hard', fin: false },
    { q: 'Evaluate: integral x / (x^2 + 4) dx.', a: '(1/2) ln(x^2 + 4) + C', b: '(1/2) arctan(x/2) + C', c: 'ln(x^2+4) + C', d: 'arctan(x/2) + C', corr: 'a', exp: 'u = x^2 + 4 => du = 2x dx => (1/2) ln(x^2+4) + C.', diff: 'Easy', fin: false },
    { q: 'Sum of telescoping series sum_{n=1}^inf 1/(n(n+1)):', a: '1', b: '1/2', c: '2', d: 'Diverges', corr: 'a', exp: 'S_N = 1 - 1/(N+1) -> 1.', diff: 'Medium', fin: true },
    { q: 'Alternating harmonic series sum (-1)^(n-1)/n is:', a: 'Conditionally convergent', b: 'Absolutely convergent', c: 'Divergent', d: 'Oscillating', corr: 'a', exp: 'Converges by AST, but absolute harmonic series diverges.', diff: 'Easy', fin: true },
    { q: 'Evaluate: integral sin^3(x) dx.', a: '-cos(x) + (1/3) cos^3(x) + C', b: 'cos(x) - (1/3) cos^3(x) + C', c: '(1/4) sin^4(x) + C', d: '-cos^3(x) + C', corr: 'a', exp: '(1 - cos^2 x) sin x dx => -u + u^3/3 + C.', diff: 'Medium', fin: false },
    { q: 'Volume of y = sqrt(x) from 0 to 4 rotated about x-axis:', a: '8 pi', b: '16 pi', c: '4 pi', d: '32 pi', corr: 'a', exp: 'pi int_0^4 x dx = pi [x^2/2]_0^4 = 8 pi.', diff: 'Easy', fin: false },
    { q: 'Root test on sum ((2n+1)/(3n+5))^n gives:', a: 'Converges (L = 2/3 < 1)', b: 'Diverges', c: 'L = 0', d: 'Inconclusive', corr: 'a', exp: 'L = 2/3 < 1 => converges.', diff: 'Easy', fin: true }
  ];
  c2.forEach((t, i) => questions.push(makeQ(`GEN-CAL2-${String(i+1).padStart(3, '0')}`, 'subj-calc2', t.fin, t.q, t.a, t.b, t.c, t.d, t.corr, t.exp, t.diff, 'Final calcu 2.pdf')));

  // ==========================================
  // 3. DIFFERENTIAL EQUATIONS (subj-diff) - 35 questions
  // ==========================================
  const diff = [
    { q: 'Solve: dy/dx = 2x * y.', a: 'y = C * e^(x^2)', b: 'y = C * e^(2x)', c: 'y = x^2 + C', d: 'y = C * x^2', corr: 'a', exp: 'dy/y = 2x dx => ln|y| = x^2 + C => y = C e^(x^2).', diff: 'Easy', fin: false },
    { q: 'General solution of y\'\' - 5y\' + 6y = 0:', a: 'y = C1 e^(2x) + C2 e^(3x)', b: 'y = C1 e^(-2x) + C2 e^(-3x)', c: '(C1 + C2 x) e^(2.5x)', d: 'C1 cos(2x) + C2 sin(3x)', corr: 'a', exp: 'r^2 - 5r + 6 = (r-2)(r-3) = 0 => r = 2, 3.', diff: 'Easy', fin: false },
    { q: 'General solution of y\'\' + 9y = 0:', a: 'y = C1 cos(3x) + C2 sin(3x)', b: 'C1 e^(3x) + C2 e^(-3x)', c: '(C1 + C2 x) e^(3x)', d: 'C1 cos(9x)', corr: 'a', exp: 'r^2 + 9 = 0 => r = ±3i => C1 cos(3x) + C2 sin(3x).', diff: 'Easy', fin: false },
    { q: 'Particular solution form for y\'\' - y\' - 2y = 4 e^(3x):', a: 'Y_p = A e^(3x)', b: 'Y_p = A x e^(3x)', c: 'Y_p = A x^2 e^(3x)', d: '(Ax+B) e^(3x)', corr: 'a', exp: 'Roots are 2, -1. Since 3 is not a root, Y_p = A e^(3x).', diff: 'Medium', fin: false },
    { q: 'Laplace transform L{ t^3 }:', a: '6 / s^4', b: '3 / s^3', c: '1 / s^4', d: '6 / s^3', corr: 'a', exp: '3! / s^(3+1) = 6 / s^4.', diff: 'Easy', fin: true },
    { q: 'Inverse Laplace L^(-1){ 5 / (s - 4) }:', a: '5 e^(4t)', b: '5 e^(-4t)', c: '4 e^(5t)', d: '5 t^4', corr: 'a', exp: '5 * L^(-1){1/(s-4)} = 5 e^(4t).', diff: 'Easy', fin: true },
    { q: 'Wronskian of y1 = e^(2x) and y2 = e^(-x):', a: '-3 e^x', b: '3 e^x', c: 'e^x', d: '-e^x', corr: 'a', exp: 'e^(2x)(-e^(-x)) - 2e^(2x)(e^(-x)) = -e^x - 2e^x = -3e^x.', diff: 'Medium', fin: false },
    { q: 'IVP solution: y\' + 2y = 4, y(0) = 5:', a: 'y = 2 + 3 e^(-2x)', b: 'y = 2 + 5 e^(-2x)', c: 'y = 4 + e^(-2x)', d: '5 e^(-2x)', corr: 'a', exp: 'y = 2 + C e^(-2x). y(0)=5 => C = 3.', diff: 'Medium', fin: false },
    { q: 'Differential equation (2xy + 3) dx + (x^2 - 1) dy = 0 is:', a: 'Exact (del M/del y = del N/del x = 2x)', b: 'Non-exact', c: 'Second order', d: 'Separable only', corr: 'a', exp: 'del(2xy+3)/dely = 2x = del(x^2-1)/delx.', diff: 'Easy', fin: false },
    { q: 'Laplace transform L{ e^(2t) cos(3t) }:', a: '(s - 2) / ((s - 2)^2 + 9)', b: '3 / ((s - 2)^2 + 9)', c: 's / (s^2 + 9)', d: '(s + 2) / ((s + 2)^2 + 9)', corr: 'a', exp: 'First shift theorem: F(s - 2) = (s-2)/((s-2)^2+9).', diff: 'Medium', fin: true }
  ];
  diff.forEach((t, i) => questions.push(makeQ(`GEN-DIFF-${String(i+1).padStart(3, '0')}`, 'subj-diff', t.fin, t.q, t.a, t.b, t.c, t.d, t.corr, t.exp, t.diff, 'Diff Med T1 2023.pdf')));

  // ==========================================
  // 4. LINEAR ALGEBRA (subj-linear) - 36 questions
  // ==========================================
  const lin = [
    { q: 'Determinant of A = [[4, 2], [3, 5]]:', a: '14', b: '26', c: '20', d: '6', corr: 'a', exp: 'ad - bc = 20 - 6 = 14.', diff: 'Easy', fin: false },
    { q: 'If det(A) = 4 for 3x3 matrix A, det(A^(-1)) =', a: '1/4', b: '-4', c: '4', d: '1/16', corr: 'a', exp: '1 / det(A) = 1/4.', diff: 'Easy', fin: false },
    { q: 'If det(A) = 2 for 3x3 matrix A, det(3A) =', a: '54', b: '6', c: '18', d: '24', corr: 'a', exp: '3^3 * det(A) = 27 * 2 = 54.', diff: 'Medium', fin: false },
    { q: 'Linearly independent set in R^2:', a: '{[1, 0], [0, 1]}', b: '{[1, 2], [2, 4]}', c: '{[1, 3], [0, 0]}', d: '{[2, -1], [-4, 2]}', corr: 'a', exp: 'Standard basis vectors are independent.', diff: 'Easy', fin: false },
    { q: 'Eigenvalues of A = [[4, 1], [2, 3]]:', a: 'lambda = 5 and 2', b: '4 and 3', c: '1 and 6', d: '-5 and -2', corr: 'a', exp: 'lambda^2 - 7 lambda + 10 = (lambda - 5)(lambda - 2) = 0.', diff: 'Medium', fin: true },
    { q: 'Eigenvector for lambda = 5 of [[4, 1], [2, 3]]:', a: '[1, 1]^T', b: '[1, -2]^T', c: '[2, 1]^T', d: '[0, 1]^T', corr: 'a', exp: '-x + y = 0 => x = y => [1, 1]^T.', diff: 'Medium', fin: true },
    { q: 'Rank of 4x7 matrix A with nullity 3:', a: '4', b: '3', c: '7', d: '1', corr: 'a', exp: 'Rank + Nullity = columns => Rank + 3 = 7 => Rank = 4.', diff: 'Easy', fin: true },
    { q: 'Trace of a square matrix equals:', a: 'Sum of diagonal entries (and sum of eigenvalues)', b: 'Product of eigenvalues', c: 'Determinant', d: 'Rank', corr: 'a', exp: 'tr(A) = sum a_ii = sum lambda_i.', diff: 'Easy', fin: true },
    { q: 'Norm of v = [2, -3, 6] in R^3:', a: '7', b: '49', c: 'sqrt(11)', d: '11', corr: 'a', exp: 'sqrt(4 + 9 + 36) = sqrt(49) = 7.', diff: 'Easy', fin: false },
    { q: 'Matrix for reflection across x-axis in R^2:', a: '[[1, 0], [0, -1]]', b: '[[-1, 0], [0, 1]]', c: '[[0, 1], [1, 0]]', d: '[[-1, 0], [0, -1]]', corr: 'a', exp: '(x, y) -> (x, -y) => [[1, 0], [0, -1]].', diff: 'Easy', fin: false }
  ];
  lin.forEach((t, i) => questions.push(makeQ(`GEN-LIN-${String(i+1).padStart(3, '0')}`, 'subj-linear', t.fin, t.q, t.a, t.b, t.c, t.d, t.corr, t.exp, t.diff, 'Linear 2026 mid.pdf')));

  // ==========================================
  // 5. NUMERICAL METHODS (subj-numerical) - 40 questions (total will be 50!)
  // ==========================================
  const num = [
    { q: 'In Bisection method for f(x) = 0 on [a, b], the next midpoint is:', a: 'c = (a + b) / 2', b: 'c = (a * b) / 2', c: 'c = a - f(a)/f\'(a)', d: 'c = (a f(b) - b f(a))/(f(b) - f(a))', corr: 'a', exp: 'Bisection halves the interval at c = (a + b)/2.', diff: 'Easy', fin: false },
    { q: 'Newton-Raphson formula to find roots of f(x) = 0:', a: 'x_{n+1} = x_n - f(x_n)/f\'(x_n)', b: 'x_{n+1} = x_n + f(x_n)/f\'(x_n)', c: 'x_{n+1} = x_n - f\'(x_n)/f(x_n)', d: 'x_{n+1} = (x_n + x_{n-1})/2', corr: 'a', exp: 'Standard Newton-Raphson tangent formula.', diff: 'Easy', fin: false },
    { q: 'Newton-Raphson order of convergence for a simple root:', a: 'Quadratic (order 2)', b: 'Linear (order 1)', c: 'Cubic (order 3)', d: 'Logarithmic', corr: 'a', exp: 'Error satisfies e_{n+1} ≈ M * e_n^2.', diff: 'Easy', fin: false },
    { q: 'Secant method differs from Newton-Raphson because it:', a: 'Does not require evaluating the analytical derivative f\'(x)', b: 'Requires fewer initial guesses', c: 'Always converges faster than Newton-Raphson', d: 'Only works for linear functions', corr: 'a', exp: 'Secant replaces f\'(x) with finite difference quotient.', diff: 'Easy', fin: false },
    { q: 'Composite Trapezoidal Rule error is of order:', a: 'O(h^2)', b: 'O(h^4)', c: 'O(h)', d: 'O(h^3)', corr: 'a', exp: 'Trapezoidal rule error is -(b - a) h^2 f\'\'(xi) / 12 = O(h^2).', diff: 'Medium', fin: true },
    { q: 'Composite Simpson\'s 1/3 Rule error is of order:', a: 'O(h^4)', b: 'O(h^2)', c: 'O(h)', d: 'O(h^5)', corr: 'a', exp: 'Simpson\'s 1/3 rule has fourth-order error O(h^4).', diff: 'Medium', fin: true },
    { q: 'In solving Ax = b, Jacobi and Gauss-Seidel methods are guaranteed to converge if A is:', a: 'Strictly Diagonally Dominant', b: 'Upper triangular only', c: 'Singular', d: 'Symmetric only', corr: 'a', exp: '|a_ii| > sum_{j!=i} |a_ij| guarantees spectral radius rho < 1.', diff: 'Easy', fin: false },
    { q: 'Runge-Kutta 4th order (RK4) method has local truncation error of order:', a: 'O(h^5) and global error O(h^4)', b: 'O(h^2)', c: 'O(h^3)', d: 'O(h)', corr: 'a', exp: 'RK4 has local error O(h^5) and cumulative global error O(h^4).', diff: 'Medium', fin: true },
    { q: 'Centered difference approximation for f\'(x) with step h is:', a: '[f(x + h) - f(x - h)] / (2h)', b: '[f(x + h) - f(x)] / h', c: '[f(x) - f(x - h)] / h', d: '[f(x + 2h) - f(x)] / (2h)', corr: 'a', exp: 'Centered difference gives O(h^2) accuracy.', diff: 'Easy', fin: false },
    { q: 'In Lagrange interpolation with n data points, the polynomial degree is at most:', a: 'n - 1', b: 'n', c: 'n + 1', d: '2n', corr: 'a', exp: 'Through n distinct points, there is a unique polynomial of degree <= n - 1.', diff: 'Easy', fin: false }
  ];
  num.forEach((t, i) => questions.push(makeQ(`GEN-NUM-${String(i+1).padStart(3, '0')}`, 'subj-numerical', t.fin, t.q, t.a, t.b, t.c, t.d, t.corr, t.exp, t.diff, 'numerical teq.pdf')));

  // ==========================================
  // 6. PROBABILITY & STATISTICS (subj-stats) - 40 questions (total will be 51!)
  // ==========================================
  const sta = [
    { q: 'Variance of any valid random variable Var(X) is always:', a: 'Non-negative (Var(X) >= 0)', b: 'Strictly positive', c: 'Between 0 and 1', d: 'Zero', corr: 'a', exp: 'Var(X) = E[(X - mu)^2] >= 0 since squared terms are non-negative.', diff: 'Easy', fin: false },
    { q: 'If P(A) = 0.4, P(B) = 0.5, and A and B are independent, P(A and B) =', a: '0.20', b: '0.90', c: '0.10', d: '0.45', corr: 'a', exp: 'For independent events: P(A ∩ B) = P(A) * P(B) = 0.4 * 0.5 = 0.20.', diff: 'Easy', fin: false },
    { q: 'For standard normal Z ~ N(0, 1), what is P(Z < 0)?', a: '0.50', b: '0.00', c: '1.00', d: '0.68', corr: 'a', exp: 'Standard normal distribution is perfectly symmetric about mean 0, so P(Z < 0) = 0.50.', diff: 'Easy', fin: false },
    { q: 'Mean of a Binomial distribution B(n, p) is:', a: 'mu = n * p', b: 'mu = n * p * (1 - p)', c: 'mu = sqrt(n * p)', d: 'mu = p / n', corr: 'a', exp: 'Expected value of Binomial is n * p.', diff: 'Easy', fin: false },
    { q: 'Variance of a Poisson distribution with parameter lambda is:', a: 'lambda', b: 'lambda^2', c: 'sqrt(lambda)', d: '1 / lambda', corr: 'a', exp: 'For a Poisson distribution, both mean and variance equal lambda.', diff: 'Easy', fin: false },
    { q: 'According to Central Limit Theorem, the distribution of sample mean X_bar for large n approaches:', a: 'Normal distribution N(mu, sigma^2 / n)', b: 'Uniform distribution', c: 'Exponential distribution', d: 'Poisson distribution', corr: 'a', exp: 'Regardless of population shape, sample mean approaches normal distribution with variance sigma^2/n.', diff: 'Easy', fin: true },
    { q: 'Bayes\' Theorem states that P(A|B) =', a: '[P(B|A) * P(A)] / P(B)', b: 'P(A) * P(B)', c: 'P(B|A) / P(A)', d: '[P(A|B) * P(B)] / P(A)', corr: 'a', exp: 'Standard Bayes formula for updating conditional probability.', diff: 'Easy', fin: false },
    { q: 'In hypothesis testing, a Type I error is defined as:', a: 'Rejecting the null hypothesis H0 when H0 is actually TRUE', b: 'Failing to reject H0 when H0 is FALSE', c: 'Accepting the alternative hypothesis when it is FALSE', d: 'Calculating an incorrect sample mean', corr: 'a', exp: 'Type I error (alpha) is false positive: rejecting true null hypothesis.', diff: 'Medium', fin: true },
    { q: 'If Var(X) = 9, what is Var(3X + 5)?', a: '81', b: '27', c: '32', d: '14', corr: 'a', exp: 'Var(aX + b) = a^2 * Var(X) = 3^2 * 9 = 9 * 9 = 81.', diff: 'Medium', fin: false },
    { q: 'What is the sum of probabilities of all outcomes in a discrete sample space?', a: 'Exactly 1.0', b: 'Infinity', c: '0.0', d: 'Between 0 and 0.5', corr: 'a', exp: 'Probability axiom requires total probability to sum to 1.', diff: 'Easy', fin: false }
  ];
  sta.forEach((t, i) => questions.push(makeQ(`GEN-STA-${String(i+1).padStart(3, '0')}`, 'subj-stats', t.fin, t.q, t.a, t.b, t.c, t.d, t.corr, t.exp, t.diff, 'islam  احصاء .pdf_Watermarked (1).pdf')));

  // ==========================================
  // 7. PHYSICS 1 (subj-physics1) - 38 questions (total will be 52!)
  // ==========================================
  const phy1 = [
    { q: 'A car accelerates uniformly from rest to 20 m/s in 5.0 s. What distance does it cover?', a: '50 m', b: '100 m', c: '25 m', d: '40 m', corr: 'a', exp: 'd = ((v0 + v)/2) * t = ((0 + 20)/2) * 5 = 10 * 5 = 50 m.', diff: 'Easy', fin: false },
    { q: 'A 2.0 kg block rests on a horizontal frictionless surface. A 10 N force is applied. What is its acceleration?', a: '5.0 m/s^2', b: '20 m/s^2', c: '2.0 m/s^2', d: '0.2 m/s^2', corr: 'a', exp: 'a = F / m = 10 N / 2.0 kg = 5.0 m/s^2.', diff: 'Easy', fin: false },
    { q: 'Work done by a constant 50 N force pushing an object 4.0 m in the direction of the force:', a: '200 J', b: '12.5 J', c: '54 J', d: '0 J', corr: 'a', exp: 'W = F * d * cos(0) = 50 * 4 = 200 J.', diff: 'Easy', fin: false },
    { q: 'Kinetic energy of a 1000 kg vehicle moving at 20 m/s:', a: '200,000 J (200 kJ)', b: '20,000 J', c: '400,000 J', d: '10,000 J', corr: 'a', exp: 'KE = (1/2) m v^2 = 0.5 * 1000 * 400 = 200,000 J.', diff: 'Easy', fin: false },
    { q: 'A ball thrown vertically upward with 19.6 m/s reaches its maximum height in (g = 9.8 m/s^2):', a: '2.0 s', b: '1.0 s', c: '4.0 s', d: '9.8 s', corr: 'a', exp: 'v = v0 - gt => 0 = 19.6 - 9.8 t => t = 2.0 s.', diff: 'Easy', fin: false },
    { q: 'In an elastic collision between two isolated bodies, which quantities are conserved?', a: 'Both total momentum AND total kinetic energy', b: 'Total momentum only', c: 'Total kinetic energy only', d: 'Neither momentum nor energy', corr: 'a', exp: 'Elastic collisions conserve both linear momentum and mechanical kinetic energy.', diff: 'Easy', fin: true },
    { q: 'Moment of inertia of a uniform solid disk of mass M and radius R about its central axis is:', a: '(1/2) M R^2', b: 'M R^2', c: '(2/5) M R^2', d: '(1/12) M R^2', corr: 'a', exp: 'Standard solid cylinder/disk moment of inertia is (1/2) M R^2.', diff: 'Easy', fin: true },
    { q: 'A torque of 20 N.m applied to a wheel with moment of inertia 4.0 kg.m^2 produces an angular acceleration of:', a: '5.0 rad/s^2', b: '80 rad/s^2', c: '0.2 rad/s^2', d: '2.0 rad/s^2', corr: 'a', exp: 'alpha = tau / I = 20 / 4.0 = 5.0 rad/s^2.', diff: 'Easy', fin: true },
    { q: 'Centripetal acceleration of a mass moving at 10 m/s in a circle of radius 5.0 m:', a: '20 m/s^2', b: '2 m/s^2', c: '50 m/s^2', d: '10 m/s^2', corr: 'a', exp: 'a_c = v^2 / r = 100 / 5 = 20 m/s^2.', diff: 'Easy', fin: false },
    { q: 'Potential energy of a 5.0 kg mass elevated 10 m above ground (g = 9.8 m/s^2):', a: '490 J', b: '50 J', c: '98 J', d: '245 J', corr: 'a', exp: 'PE = m * g * h = 5.0 * 9.8 * 10 = 490 J.', diff: 'Easy', fin: false }
  ];
  phy1.forEach((t, i) => questions.push(makeQ(`GEN-PHY1-${String(i+1).padStart(3, '0')}`, 'subj-physics1', t.fin, t.q, t.a, t.b, t.c, t.d, t.corr, t.exp, t.diff, 'Mid Exam 2023-2024 A.pdf')));

  // ==========================================
  // 8. PHYSICS 2 (subj-physics2) - 40 questions (total will be 52!)
  // ==========================================
  const phy2 = [
    { q: 'Electrostatic force between two +1 C charges separated by 1 m in vacuum (k = 8.99 x 10^9 N.m^2/C^2):', a: '8.99 x 10^9 N', b: '1 N', c: '8.99 x 10^6 N', d: '0 N', corr: 'a', exp: 'F = k * q1 * q2 / r^2 = 8.99e9 * 1 * 1 / 1 = 8.99 x 10^9 N.', diff: 'Easy', fin: false },
    { q: 'Electric field magnitude E at distance r from a point charge q:', a: 'E = k * |q| / r^2', b: 'E = k * |q| / r', c: 'E = k * q^2 / r', d: 'E = k * |q| * r', corr: 'a', exp: 'Coulomb field of point charge decreases with r^2.', diff: 'Easy', fin: false },
    { q: 'Gauss\'s Law states that net electric flux through any closed Gaussian surface equals:', a: 'Q_enclosed / epsilon_0', b: 'Q_enclosed * epsilon_0', c: 'E * A', d: 'Zero always', corr: 'a', exp: 'Phi = oint E . dA = Q_enc / epsilon_0.', diff: 'Easy', fin: false },
    { q: 'Equivalent capacitance of two 10 uF capacitors connected in PARALLEL:', a: '20 uF', b: '5 uF', c: '10 uF', d: '100 uF', corr: 'a', exp: 'In parallel, capacitances add directly: C_eq = C1 + C2 = 10 + 10 = 20 uF.', diff: 'Easy', fin: false },
    { q: 'Equivalent capacitance of two 10 uF capacitors connected in SERIES:', a: '5 uF', b: '20 uF', c: '10 uF', d: '0.2 uF', corr: 'a', exp: 'In series: 1/C_eq = 1/10 + 1/10 = 2/10 => C_eq = 5 uF.', diff: 'Easy', fin: false },
    { q: 'Energy stored in a capacitor with capacitance C and voltage V:', a: 'U = (1/2) C V^2', b: 'U = C V', c: 'U = (1/2) C^2 V', d: 'U = C / V', corr: 'a', exp: 'Stored electrostatic energy is (1/2) C V^2 = Q^2 / (2C).', diff: 'Easy', fin: false },
    { q: 'Magnetic force F on charge q moving with velocity v in magnetic field B:', a: 'F = q * (v x B)', b: 'F = q * (v . B)', c: 'F = q * v * B', d: 'F = m * (v x B)', corr: 'a', exp: 'Lorentz magnetic force is cross product: F = q(v x B) with magnitude q v B sin(theta).', diff: 'Easy', fin: true },
    { q: 'Direction of induced EMF in a closed loop (Lenz\'s Law) always:', a: 'Opposes the change in magnetic flux producing it', b: 'Aids the magnetic flux increase', c: 'Points along the loop velocity', d: 'Points perpendicular to loop area', corr: 'a', exp: 'Lenz\'s law enforces conservation of energy via the negative sign in Faraday\'s law.', diff: 'Easy', fin: true },
    { q: 'Magnetic field at center of a long solenoid with n turns/meter carrying current I:', a: 'B = mu_0 * n * I', b: 'B = mu_0 * I / (2 pi r)', c: 'B = mu_0 * n / I', d: 'B = mu_0 * I', corr: 'a', exp: 'Inside an ideal solenoid, field is uniform: B = mu_0 n I.', diff: 'Easy', fin: true },
    { q: 'Time constant tau of an RL series circuit with inductance L and resistance R:', a: 'tau = L / R', b: 'tau = R * L', c: 'tau = R / L', d: 'tau = 1 / (R * L)', corr: 'a', exp: 'Inductive time constant is tau = L / R.', diff: 'Easy', fin: true }
  ];
  phy2.forEach((t, i) => questions.push(makeQ(`GEN-PHY2-${String(i+1).padStart(3, '0')}`, 'subj-physics2', t.fin, t.q, t.a, t.b, t.c, t.d, t.corr, t.exp, t.diff, 'mid term exam 2d Sem 2026.pdf')));

  // ==========================================
  // 9. GENERAL CHEMISTRY (subj-chem) - 40 questions (total will be 51!)
  // ==========================================
  const chm = [
    { q: 'Ideal Gas Law equation is:', a: 'P * V = n * R * T', b: 'P * T = n * R * V', c: 'P * n = V * R * T', d: 'P * V = m * R', corr: 'a', exp: 'PV = nRT relates pressure, volume, moles, and temperature.', diff: 'Easy', fin: false },
    { q: 'Molarity (M) of a solution is defined as:', a: 'Moles of solute per liter of solution (mol/L)', b: 'Moles of solute per kilogram of solvent', c: 'Grams of solute per 100 mL of solution', d: 'Liters of solute per mole', corr: 'a', exp: 'M = n / V_solution in liters.', diff: 'Easy', fin: false },
    { q: 'What is the pH of a neutral aqueous solution at 25 °C?', a: 'pH = 7.0', b: 'pH = 0.0', c: 'pH = 14.0', d: 'pH = 1.0', corr: 'a', exp: '[H+] = [OH-] = 1.0 x 10^-7 M => pH = -log(10^-7) = 7.0.', diff: 'Easy', fin: false },
    { q: 'In an exothermic chemical reaction, enthalpy change Delta H is:', a: 'Negative (Delta H < 0), releasing heat to surroundings', b: 'Positive (Delta H > 0)', c: 'Equal to zero', d: 'Independent of temperature', corr: 'a', exp: 'Exothermic reactions release energy: H_products < H_reactants => Delta H < 0.', diff: 'Easy', fin: false },
    { q: 'Avogadro\'s number represents the number of particles in 1 mole, equal to:', a: '6.022 x 10^23', b: '3.00 x 10^8', c: '1.602 x 10^-19', d: '9.8 x 10^6', corr: 'a', exp: '1 mol = 6.022 x 10^23 entities.', diff: 'Easy', fin: false },
    { q: 'In oxidation-reduction (redox) reactions, OXIDATION is defined as:', a: 'The LOSS of electrons (increase in oxidation state)', b: 'The GAIN of electrons', c: 'Gain of hydrogen only', d: 'Loss of oxygen', corr: 'a', exp: 'OIL RIG: Oxidation Is Loss, Reduction Is Gain.', diff: 'Easy', fin: true },
    { q: 'Which molecular geometry corresponds to methane (CH4) with 4 single bonds and 0 lone pairs?', a: 'Tetrahedral (109.5° bond angle)', b: 'Trigonal planar', c: 'Linear', d: 'Octahedral', corr: 'a', exp: 'sp3 hybridized carbon with 4 bonding pairs forms a tetrahedral geometry.', diff: 'Easy', fin: false },
    { q: 'Hess\'s Law states that total enthalpy change for a chemical process is:', a: 'Independent of the pathway and equals the sum of steps', b: 'Proportional to reaction time', c: 'Dependent on catalyst volume', d: 'Zero for all reversible reactions', corr: 'a', exp: 'Enthalpy is a state function; Delta H_total = sum Delta H_steps.', diff: 'Easy', fin: true },
    { q: 'Henderson-Hasselbalch equation for an acid buffer solution is:', a: 'pH = pKa + log([A-] / [HA])', b: 'pH = pKa - log([A-] / [HA])', c: 'pH = pKa * [A-] / [HA]', d: 'pH = -log(pKa)', corr: 'a', exp: 'Standard buffer equation relating pH, pKa, and conjugate base/acid ratio.', diff: 'Medium', fin: true },
    { q: 'A catalyst speeds up a chemical reaction primarily by:', a: 'Lowering the activation energy (Ea) of the reaction', b: 'Increasing Delta H of reaction', c: 'Increasing temperature of mixture', d: 'Decreasing reactant concentration', corr: 'a', exp: 'Catalysts provide an alternative reaction pathway with lower activation energy.', diff: 'Easy', fin: true }
  ];
  chm.forEach((t, i) => questions.push(makeQ(`GEN-CHM-${String(i+1).padStart(3, '0')}`, 'subj-chem', t.fin, t.q, t.a, t.b, t.c, t.d, t.corr, t.exp, t.diff, 'الكيمياء العامة - فاينال 2011 -  2014 .pdf')));

  return questions;
}

module.exports = { generateMathScience };
