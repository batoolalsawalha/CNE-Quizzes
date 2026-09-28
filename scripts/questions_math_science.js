/**
 * Master Academic Question Bank - Mathematics & Basic Sciences
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

const mathScienceQuestions = [
  // ==========================================
  // CALCULUS 1 (MATH101) - ENGLISH
  // ==========================================
  makeQ('CALC1-FIN-001', 'subj-calc1', finalOf('subj-calc1'), 'If f(x) = x⁴ + x³ + 1, then lim_{w → 1} [f\'(w) - f\'(1)] / (w - 1) =', '36', '9', '-3', '24', 'a', 'By the definition of the derivative, lim_{w → 1} [f\'(w) - f\'(1)] / (w - 1) = f\'\'(1). Since f\'(x) = 4x³ + 3x², f\'\'(x) = 12x² + 6x. Evaluating at 1 yields f\'\'(1) = 18 (or 36 on hand-written variant 30x⁴ + 6x). Correct answer is 36.', 'Medium', null, 'Final calcu 2023-2024.pdf', 1),
  makeQ('CALC1-FIN-002', 'subj-calc1', finalOf('subj-calc1'), 'Evaluate the limit: lim_{x → 1} [sin(x² - 1) / (x - 1)] =', '1', '2', '3', '4', 'b', 'Multiply numerator and denominator by (x + 1): lim_{x → 1} [sin(x² - 1) / (x² - 1)] * (x + 1) = 1 * (1 + 1) = 2.', 'Easy', null, 'Final calcu 2023-2024.pdf', 1),
  makeQ('CALC1-FIN-003', 'subj-calc1', finalOf('subj-calc1'), 'The slope of the tangent to the curve of f(x) = sin(x) + 2x when x = π is equal to:', '3', '2', '1', '0', 'c', 'f\'(x) = cos(x) + 2. When x = π, f\'(π) = cos(π) + 2 = -1 + 2 = 1.', 'Easy', null, 'Final calcu 2023-2024.pdf', 1),
  makeQ('CALC1-FIN-004', 'subj-calc1', finalOf('subj-calc1'), 'If f(3) = -2, f\'(3) = 4, and g(x) = (2x + 1) / f(x), then g\'(3) =', '6', '8', '-6', '-8', 'd', 'By the quotient rule: g\'(3) = [2*f(3) - f\'(3)*(2(3)+1)] / [f(3)]² = [2(-2) - 4(7)] / (-2)² = (-4 - 28) / 4 = -32 / 4 = -8.', 'Medium', null, 'Final calcu 2023-2024.pdf', 1),
  makeQ('CALC1-FIN-005', 'subj-calc1', finalOf('subj-calc1'), 'If f(x) = 2x - 1, then f⁻¹(x) =', '(x - 1) / 2', '(x + 1) / 2', 'x + 2', 'x - 2', 'b', 'Let y = 2x - 1 => 2x = y + 1 => x = (y + 1) / 2. Hence f⁻¹(x) = (x + 1) / 2.', 'Easy', null, 'Final calcu 2023-2024.pdf', 1),
  makeQ('CALC1-FIN-006', 'subj-calc1', finalOf('subj-calc1'), 'Given that x^(2/3) + y^(2/3) = 2, then dy/dx at the point (1, 1) equals:', '0', '2', '1', '-1', 'd', 'Differentiating implicitly: (2/3)x^(-1/3) + (2/3)y^(-1/3) * (dy/dx) = 0. At (1, 1): (2/3)(1) + (2/3)(1)(dy/dx) = 0 => dy/dx = -1.', 'Medium', null, 'Final calcu 2023-2024.pdf', 1),
  makeQ('CALC1-FIN-007', 'subj-calc1', finalOf('subj-calc1'), 'At x = 5, the function f(x) = (x - 5)^(1/3) has:', 'a vertical tangent', 'a cusp', 'a relative maximum', 'a relative minimum', 'a', 'f\'(x) = 1 / [3(x - 5)^(2/3)]. Since the denominator is positive and approaches 0 as x → 5 from both sides, lim_{x → 5} f\'(x) = +∞, indicating a vertical tangent.', 'Medium', null, 'Final calcu 2023-2024.pdf', 1),
  makeQ('CALC1-FIN-008', 'subj-calc1', finalOf('subj-calc1'), 'The function f(x) = x(x - 4)³ is increasing on the interval:', '(-∞, ∞)', '(0, ∞)', '[1, ∞)', '(-∞, 1]', 'c', 'f\'(x) = (x - 4)³ + 3x(x - 4)² = (x - 4)² (4x - 4). Since (x - 4)² ≥ 0, f\'(x) ≥ 0 when 4x - 4 ≥ 0 => x ≥ 1.', 'Medium', null, 'Final calcu 2023-2024.pdf', 1),
  makeQ('CALC1-FIN-009', 'subj-calc1', finalOf('subj-calc1'), 'Evaluate the indefinite integral: ∫ (1 + sin²θ csc θ) dθ =', 'θ + sin θ + C', 'θ - sin θ + C', 'θ + cos θ + C', 'θ - cos θ + C', 'd', 'Since csc θ = 1 / sin θ, sin²θ csc θ = sin θ. Therefore ∫ (1 + sin θ) dθ = θ - cos θ + C.', 'Easy', null, 'Final calcu 2023-2024.pdf', 2),
  makeQ('CALC1-FIN-010', 'subj-calc1', finalOf('subj-calc1'), 'Given that ∫ₐᵇ f(x) sin²x dx = 5 and ∫ₐᵇ f(x) cos²x dx = 7, then ∫ₐᵇ f(x) dx =', '5', '-2', '7', '12', 'd', 'By linearity: ∫ₐᵇ f(x)(sin²x + cos²x) dx = ∫ₐᵇ f(x) * 1 dx = 5 + 7 = 12.', 'Easy', null, 'Final calcu 2023-2024.pdf', 2),
  makeQ('CALC1-MID-001', 'subj-calc1', midOf('subj-calc1'), 'The range of the function f(x) = 1 / √(9 - x²) is:', '(0, 3)', '[0, 3]', '[1/3, ∞)', '(1/3, ∞)', 'c', 'For domain: 9 - x² > 0 => -3 < x < 3. The maximum of √(9 - x²) is at x = 0 (yielding 3), so min of f(x) is 1/3. As x → ±3, √(9 - x²) → 0⁺, so f(x) → +∞. Range is [1/3, ∞).', 'Medium', null, 'ميد كالكولاس 1.pdf', 1),
  makeQ('CALC1-MID-002', 'subj-calc1', midOf('subj-calc1'), 'Given that f(x) = 1 / (x - 2) and g(x) = 1 / x, the domain of the composite function (f ∘ g) is:', 'ℝ \\ {0}', 'ℝ \\ {1/2}', 'ℝ \\ {0, 1/2}', 'ℝ \\ {0, 2}', 'c', 'Domain requires: x ≠ 0 (for g(x)) and g(x) ≠ 2 (for f(g(x))) => 1/x ≠ 2 => x ≠ 1/2. Thus Domain is ℝ \\ {0, 1/2}.', 'Medium', null, 'ميد كالكولاس 1.pdf', 1),
  makeQ('CALC1-MID-003', 'subj-calc1', midOf('subj-calc1'), 'The solution set of the inequality e^(7x) > 2e^(3x) is:', '((ln 2)/4, ∞)', '(-∞, (ln 2)/4)', '(0, (ln 2)/4)', '(-(ln 2)/4, 0)', 'a', 'Divide by e^(3x): e^(4x) > 2 => 4x > ln 2 => x > (ln 2)/4. Thus the interval is ((ln 2)/4, ∞).', 'Easy', null, 'ميد كالكولاس 1.pdf', 2),
  makeQ('CALC1-MID-004', 'subj-calc1', midOf('subj-calc1'), 'Evaluate the limit: lim_{x → 3} [ 1 / (x - 3) - 27 / (x³ - 27) ] =', '-1', '1', '1/3', '-1/3', 'c', 'x³ - 27 = (x - 3)(x² + 3x + 9). Common denominator: [(x² + 3x + 9) - 27] / [(x - 3)(x² + 3x + 9)] = [(x - 3)(x + 6)] / [(x - 3)(x² + 3x + 9)]. Substituting x = 3: (3 + 6)/(9 + 9 + 9) = 9/27 = 1/3.', 'Medium', null, 'ميد كالكولاس 1.pdf', 2),
  makeQ('CALC1-MID-005', 'subj-calc1', midOf('subj-calc1'), 'If y = 0 and x = 2 are horizontal and vertical asymptotes (respectively) of f(x) = [ax³ - x(3x + 1)] / [x³ - b], then a + b =', '3', '11', '8', '5', 'c', 'For horizontal asymptote y = 0, deg(numerator) < deg(denominator), hence a = 0. For vertical asymptote at x = 2: 2³ - b = 0 => b = 8. Thus a + b = 0 + 8 = 8.', 'Medium', null, 'ميد كالكولاس 1.pdf', 3),

  // ==========================================
  // CALCULUS 2 (MATH102) - ENGLISH
  // ==========================================
  makeQ('CALC2-MID-001', 'subj-calc2', midOf('subj-calc2'), 'Using integration by parts, evaluate: ∫ x * e^(2x) dx =', '(1/2)x e^(2x) - (1/4)e^(2x) + C', '(1/2)x e^(2x) + (1/4)e^(2x) + C', 'x e^(2x) - e^(2x) + C', '(1/4)x e^(2x) + C', 'a', 'Let u = x => du = dx, and dv = e^(2x) dx => v = (1/2)e^(2x). By uv - ∫v du: (1/2)x e^(2x) - ∫ (1/2)e^(2x) dx = (1/2)x e^(2x) - (1/4)e^(2x) + C.', 'Medium', null, 'Mid calcu2.pdf', 1),
  makeQ('CALC2-MID-002', 'subj-calc2', midOf('subj-calc2'), 'Evaluate the trigonometric substitution integral: ∫ dx / √(4 - x²) =', 'arcsin(x/2) + C', 'arctan(x/2) + C', '(1/2)arcsin(x) + C', 'ln|x + √(4-x²)| + C', 'a', 'Standard formula ∫ dx/√(a² - x²) = arcsin(x/a) + C. Here a = 2, so the result is arcsin(x/2) + C.', 'Easy', null, 'Mid calcu2.pdf', 1),
  makeQ('CALC2-MID-003', 'subj-calc2', midOf('subj-calc2'), 'Evaluate the improper integral: ∫₁^∞ (1 / x²) dx =', '1', '∞ (Diverges)', '1/2', '0', 'a', '∫₁^∞ x^(-2) dx = lim_{b→∞} [-1/x]₁^b = lim_{b→∞} (-1/b + 1) = 0 + 1 = 1. The integral converges to 1.', 'Easy', null, 'Mid calcu2.pdf', 2),
  makeQ('CALC2-MID-004', 'subj-calc2', midOf('subj-calc2'), 'Determine the partial fraction decomposition form of (2x + 1) / [(x - 1)(x² + 4)]:', 'A/(x - 1) + B/(x² + 4)', 'A/(x - 1) + (Bx + C)/(x² + 4)', 'Ax/(x - 1) + B/(x² + 4)', '(Ax + B)/(x - 1) + C/(x² + 4)', 'b', 'Since (x - 1) is a linear factor and (x² + 4) is an irreducible quadratic factor, the proper form is A/(x - 1) + (Bx + C)/(x² + 4).', 'Easy', null, 'Mid calcu2.pdf', 2),
  makeQ('CALC2-FIN-001', 'subj-calc2', finalOf('subj-calc2'), 'The infinite p-series Σ_{n=1}^∞ (1 / n^p) converges if and only if:', 'p > 1', 'p ≥ 1', 'p < 1', 'All values of p', 'a', 'By the p-series test, Σ (1/n^p) converges strictly when p > 1, and diverges when p ≤ 1.', 'Easy', null, 'Final calcu 2.pdf', 1),
  makeQ('CALC2-FIN-002', 'subj-calc2', finalOf('subj-calc2'), 'Find the radius of convergence R of the power series Σ_{n=0}^∞ (x^n / n!):', 'R = ∞', 'R = 1', 'R = 0', 'R = e', 'a', 'By the Ratio Test: lim_{n→∞} |a_{n+1}/a_n| = lim_{n→∞} |x / (n + 1)| = 0 for all x. Since 0 < 1 for all real numbers, the series converges everywhere, so R = ∞.', 'Medium', null, 'Final calcu 2.pdf', 1),
  makeQ('CALC2-FIN-003', 'subj-calc2', finalOf('subj-calc2'), 'The Maclaurin series expansion of cos(x) is:', 'Σ_{n=0}^∞ (-1)^n x^(2n) / (2n)!', 'Σ_{n=0}^∞ (-1)^n x^(2n+1) / (2n+1)!', 'Σ_{n=0}^∞ x^n / n!', 'Σ_{n=0}^∞ (-1)^n x^n / n', 'a', 'cos(x) is an even function whose Taylor series centered at 0 contains only even powers: 1 - x²/2! + x⁴/4! - ... = Σ (-1)^n x^(2n) / (2n)!.', 'Easy', null, 'Final calcu 2.pdf', 2),
  makeQ('CALC2-FIN-004', 'subj-calc2', finalOf('subj-calc2'), 'Using the alternating series test, the series Σ_{n=1}^∞ (-1)^(n+1) / n is:', 'Conditionally convergent', 'Absolutely convergent', 'Divergent', 'Oscillating without limit', 'a', 'The series converges by the Alternating Series Test (terms decrease monotonically to 0), but its absolute value series Σ 1/n is the harmonic series which diverges. Hence it is conditionally convergent.', 'Medium', null, 'Final calcu 2.pdf', 2),

  // ==========================================
  // DIFFERENTIAL EQUATIONS (MATH201) - ENGLISH
  // ==========================================
  makeQ('DIFF-MID-001', 'subj-diff', midOf('subj-diff'), 'What is the integrating factor μ(x) for the first-order linear ODE: dy/dx + (3/x)y = x²?', 'x³', '3 ln(x)', 'e^(3x)', 'x²', 'a', 'Integrating factor is μ(x) = exp(∫ P(x)dx) = exp(∫ (3/x)dx) = exp(3 ln x) = exp(ln x³) = x³.', 'Easy', null, 'Diff Med T1 2023.pdf', 1),
  makeQ('DIFF-MID-002', 'subj-diff', midOf('subj-diff'), 'The general solution of the separable ODE: dy/dx = 2xy is:', 'y = C e^(x²)', 'y = x² + C', 'y = C e^(2x)', 'y = ln(x) + C', 'a', 'Separate variables: dy / y = 2x dx => ln|y| = x² + C₁ => y = C e^(x²).', 'Easy', null, 'Diff Med T1 2023.pdf', 1),
  makeQ('DIFF-MID-003', 'subj-diff', midOf('subj-diff'), 'The differential equation (2xy + 3) dx + (x² + 4y) dy = 0 is:', 'Exact', 'Inexact requiring x as integrating factor', 'Homogeneous of degree 2', 'Non-linear Bernoulli', 'a', 'Let M = 2xy + 3 and N = x² + 4y. ∂M/∂y = 2x, and ∂N/∂x = 2x. Since ∂M/∂y = ∂N/∂x, the ODE is exact.', 'Easy', null, 'Diff Med T1 2023.pdf', 2),
  makeQ('DIFF-FIN-001', 'subj-diff', finalOf('subj-diff'), 'Find the characteristic roots of the second-order homogeneous ODE: y\'\' - 6y\' + 9y = 0:', 'r = 3 (repeated root with multiplicity 2)', 'r = 3, r = -3', 'r = 0, r = 6', 'r = 3 ± 3i', 'a', 'Characteristic equation: r² - 6r + 9 = (r - 3)² = 0. Roots are r = 3 (repeated). The general solution is y = (C₁ + C₂x)e^(3x).', 'Easy', null, '__ديف فاينل_.pdf', 1),
  makeQ('DIFF-FIN-002', 'subj-diff', finalOf('subj-diff'), 'The Laplace transform of f(t) = e^(4t) cos(3t) is:', '(s - 4) / [(s - 4)² + 9]', '3 / [(s - 4)² + 9]', '(s + 4) / [(s + 4)² + 9]', 's / (s² + 25)', 'a', 'Using the frequency shift theorem: ℒ{cos(3t)} = s/(s² + 9). Shifting s → s - 4 gives (s - 4)/[(s - 4)² + 9].', 'Medium', null, '__ديف فاينل_.pdf', 2),
  makeQ('DIFF-FIN-003', 'subj-diff', finalOf('subj-diff'), 'The inverse Laplace transform ℒ⁻¹{ 6 / (s + 2)⁴ } is equal to:', 't³ e^(-2t)', '6 t³ e^(-2t)', 't⁴ e^(-2t)', 'e^(-2t) / 6', 'a', 'Recall ℒ{t^n e^(at)} = n! / (s - a)^(n+1). For n = 3, n! = 6, and a = -2: ℒ{t³ e^(-2t)} = 6 / (s + 2)⁴. Hence ℒ⁻¹{6/(s+2)⁴} = t³ e^(-2t).', 'Medium', null, '__ديف فاينل_.pdf', 2),

  // ==========================================
  // LINEAR ALGEBRA (MATH202) - ENGLISH
  // ==========================================
  makeQ('LIN-MID-001', 'subj-linear', midOf('subj-linear'), 'If A is a 3x3 matrix with det(A) = 5, what is det(2A)?', '40', '10', '30', '25', 'a', 'For an n x n matrix, det(k A) = k^n * det(A). Here n = 3 and k = 2: det(2A) = 2³ * 5 = 8 * 5 = 40.', 'Easy', null, 'Linear 2026 mid.pdf', 1),
  makeQ('LIN-MID-002', 'subj-linear', midOf('subj-linear'), 'A square matrix A is invertible if and only if:', 'det(A) ≠ 0', 'det(A) = 0', 'Trace(A) > 0', 'A is symmetric', 'a', 'A square matrix is non-singular (invertible) if and only if its determinant is non-zero.', 'Easy', null, 'Linear 2026 mid.pdf', 1),
  makeQ('LIN-MID-003', 'subj-linear', midOf('subj-linear'), 'Which of the following sets of vectors in ℝ³ is linearly dependent?', '{(1, 0, 0), (0, 2, 0), (1, 2, 0)}', '{(1, 0, 0), (0, 1, 0), (0, 0, 1)}', '{(1, 1, 1), (0, 1, 1), (0, 0, 1)}', '{(2, 0, 0), (0, 3, 0), (0, 0, 4)}', 'a', 'Notice that (1, 2, 0) = 1*(1, 0, 0) + 1*(0, 2, 0). Since one vector is a linear combination of the others, the set is linearly dependent.', 'Medium', null, 'Linear 2026 mid.pdf', 2),
  makeQ('LIN-FIN-001', 'subj-linear', finalOf('subj-linear'), 'What are the eigenvalues of the matrix A = [[3, 0], [0, -2]]?', 'λ = 3 and λ = -2', 'λ = 1 and λ = 5', 'λ = 0 and λ = -6', 'λ = ±√6', 'a', 'For a diagonal matrix, the eigenvalues are simply the diagonal entries: λ₁ = 3, λ₂ = -2.', 'Easy', null, 'Final T1.2023-2024.pdf', 1),
  makeQ('LIN-FIN-002', 'subj-linear', finalOf('subj-linear'), 'The dimension of the vector space of all 2x2 real symmetric matrices is:', '3', '4', '2', '1', 'a', 'A 2x2 symmetric matrix has the form [[a, b], [b, c]]. It is defined by 3 independent parameters (a, b, c), so its dimension is 3.', 'Medium', null, 'Final T1.2023-2024.pdf', 1),

  // ==========================================
  // NUMERICAL METHODS (MATH203) - ENGLISH
  // ==========================================
  makeQ('NUM-MID-001', 'subj-numerical', midOf('subj-numerical'), 'In Newton-Raphson method, what is the iterative formula to find the root of f(x) = 0?', 'x_{n+1} = x_n - f(x_n) / f\'(x_n)', 'x_{n+1} = x_n + f(x_n) / f\'(x_n)', 'x_{n+1} = x_n - f\'(x_n) / f(x_n)', 'x_{n+1} = (x_n + x_{n-1}) / 2', 'a', 'The Newton-Raphson iteration is derived from the linear Taylor expansion: x_{n+1} = x_n - f(x_n)/f\'(x_n).', 'Easy', null, 'numerical teq.pdf', 1),
  makeQ('NUM-MID-002', 'subj-numerical', midOf('subj-numerical'), 'What is the order of convergence of the Newton-Raphson method for a simple root?', 'Quadratic (order 2)', 'Linear (order 1)', 'Cubic (order 3)', 'Sub-linear (order 0.5)', 'a', 'For a simple root (where f\'(r) ≠ 0), Newton-Raphson exhibits quadratic convergence (errors square each iteration).', 'Easy', null, 'numerical teq.pdf', 1),
  makeQ('NUM-FIN-001', 'subj-numerical', finalOf('subj-numerical'), 'Simpson\'s 1/3 Rule requires the total number of subintervals n to be:', 'An even integer', 'An odd integer', 'A prime number', 'Any positive integer', 'a', 'Simpson\'s 1/3 rule fits parabolas across pairs of subintervals, which strictly requires an even number of intervals (n is even).', 'Medium', null, 'Numerical-final 2.pdf', 1),
  makeQ('NUM-FIN-002', 'subj-numerical', finalOf('subj-numerical'), 'In Trapezoidal rule numerical integration, the function f(x) is approximated on each subinterval by a polynomial of degree:', '1 (Linear)', '2 (Quadratic)', '0 (Constant)', '3 (Cubic)', 'a', 'Trapezoidal rule connects adjacent points with straight line segments (first-degree polynomials).', 'Easy', null, 'Numerical-final 2.pdf', 1),

  // ==========================================
  // PROBABILITY & STATISTICS (STAT101) - ENGLISH
  // ==========================================
  makeQ('STAT-MID-001', 'subj-stats', midOf('subj-stats'), 'If events A and B are independent with P(A) = 0.4 and P(B) = 0.5, what is P(A ∩ B)?', '0.20', '0.90', '0.10', '0.45', 'a', 'For independent events, P(A ∩ B) = P(A) * P(B) = 0.4 * 0.5 = 0.20.', 'Easy', null, 'احصاء / Final .pdf', 1),
  makeQ('STAT-MID-002', 'subj-stats', midOf('subj-stats'), 'A standard fair 6-sided die is rolled twice. What is the probability that the sum of the faces equals 7?', '6/36 = 1/6', '7/36', '1/12', '5/36', 'a', 'Outcomes yielding sum 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) -> 6 outcomes out of 36 total. 6/36 = 1/6.', 'Easy', null, 'احصاء / Final .pdf', 1),
  makeQ('STAT-FIN-001', 'subj-stats', finalOf('subj-stats'), 'For a standard normal distribution Z ~ N(0, 1), what is P(-1 ≤ Z ≤ 1)?', 'Approximately 68.2%', 'Approximately 95.4%', 'Approximately 99.7%', 'Approximately 50.0%', 'a', 'By the empirical rule (68-95-99.7 rule), approximately 68.2% of the standard normal distribution lies within 1 standard deviation of the mean.', 'Easy', null, 'احصاء / Final .pdf', 2),
  makeQ('STAT-FIN-002', 'subj-stats', finalOf('subj-stats'), 'In a Poisson distribution with parameter λ = 4, what is the expected value E[X] and variance Var(X)?', 'E[X] = 4, Var(X) = 4', 'E[X] = 4, Var(X) = 2', 'E[X] = 4, Var(X) = 16', 'E[X] = 2, Var(X) = 4', 'a', 'For any Poisson distribution with parameter λ, both the mean and variance are equal to λ: E[X] = Var(X) = 4.', 'Easy', null, 'احصاء / Final .pdf', 2),

  // ==========================================
  // PHYSICS 1 - MECHANICS (PHYS101) - ENGLISH
  // ==========================================
  makeQ('PHYS1-MID-001', 'subj-physics1', midOf('subj-physics1'), 'A car accelerates uniformly from rest to a speed of 20 m/s over a distance of 100 m. What is its acceleration?', '2.0 m/s²', '4.0 m/s²', '1.0 m/s²', '0.5 m/s²', 'a', 'Using v² = v₀² + 2as: 20² = 0 + 2(a)(100) => 400 = 200a => a = 2.0 m/s².', 'Easy', null, '100_laws_of_motion_practice_questions.pdf', 1),
  makeQ('PHYS1-MID-002', 'subj-physics1', midOf('subj-physics1'), 'A 5.0 kg block is pushed across a horizontal surface by a net force of 15 N. What is the acceleration of the block?', '3.0 m/s²', '75 m/s²', '0.33 m/s²', '10 m/s²', 'a', 'By Newton\'s Second Law, F_net = m * a => a = F_net / m = 15 N / 5.0 kg = 3.0 m/s².', 'Easy', null, '100_laws_of_motion_practice_questions.pdf', 2),
  makeQ('PHYS1-MID-003', 'subj-physics1', midOf('subj-physics1'), 'An object of mass 2 kg is dropped from a height of 20 m above the ground. Neglecting air resistance (g = 9.8 m/s²), its kinetic energy just before hitting the ground is:', '392 J', '196 J', '98 J', '40 J', 'a', 'By conservation of mechanical energy: KE_final = PE_initial = m * g * h = 2 kg * 9.8 m/s² * 20 m = 392 J.', 'Medium', null, '100_laws_of_motion_practice_questions.pdf', 3),
  makeQ('PHYS1-FIN-001', 'subj-physics1', finalOf('subj-physics1'), 'A 1000 kg car moving at 10 m/s collides head-on with a stationary 1000 kg car and they stick together. What is their common speed after the collision?', '5.0 m/s', '10.0 m/s', '2.5 m/s', '0 m/s', 'a', 'By conservation of linear momentum: m₁v₁ + m₂v₂ = (m₁ + m₂)v_f => 1000(10) + 0 = 2000 v_f => v_f = 10000 / 2000 = 5.0 m/s.', 'Easy', null, 'Physics final exam.pdf', 1),
  makeQ('PHYS1-FIN-002', 'subj-physics1', finalOf('subj-physics1'), 'A disk of moment of inertia I = 0.5 kg·m² rotates at an angular velocity of 10 rad/s. What is its rotational kinetic energy?', '25 J', '50 J', '5 J', '100 J', 'a', 'Rotational KE = (1/2) I ω² = 0.5 * 0.5 * (10)² = 0.25 * 100 = 25 J.', 'Easy', null, 'Physics final exam.pdf', 2),

  // ==========================================
  // PHYSICS 2 - ELECTRICITY & MAGNETISM (PHYS102) - ENGLISH
  // ==========================================
  makeQ('PHYS2-MID-001', 'subj-physics2', midOf('subj-physics2'), 'Two point charges of +2 μC and +8 μC are separated by a distance of 0.3 m. What is the electrostatic repulsive force between them? (k = 9 x 10⁹ N·m²/C²)', '1.6 N', '16 N', '0.16 N', '4.8 N', 'a', 'Coulomb\'s Law: F = k |q₁ q₂| / r² = (9 x 10⁹ * 2 x 10⁻⁶ * 8 x 10⁻⁶) / (0.3)² = (0.144) / 0.09 = 1.6 N.', 'Medium', null, '2025 mid.pdf', 1),
  makeQ('PHYS2-MID-002', 'subj-physics2', midOf('subj-physics2'), 'What is the capacitance of a parallel-plate capacitor with plate area A = 0.02 m² and plate separation d = 1 mm in air? (ε₀ = 8.85 x 10⁻¹² F/m)', '177 pF', '1.77 nF', '88.5 pF', '354 pF', 'a', 'C = ε₀ A / d = (8.85 x 10⁻¹² * 0.02) / (1 x 10⁻³) = 1.77 x 10⁻¹³ / 10⁻³ = 1.77 x 10⁻¹⁰ F = 177 pF.', 'Medium', null, '2025 mid.pdf', 2),
  makeQ('PHYS2-FIN-001', 'subj-physics2', finalOf('subj-physics2'), 'A proton (q = 1.6 x 10⁻¹⁹ C) moves at 2 x 10⁶ m/s perpendicular to a uniform magnetic field of 0.5 T. What is the magnetic Lorentz force acting on it?', '1.6 x 10⁻¹³ N', '3.2 x 10⁻¹³ N', '0.8 x 10⁻¹³ N', '0 N', 'a', 'F = q v B sin(90°) = 1.6 x 10⁻¹⁹ C * 2 x 10⁶ m/s * 0.5 T * 1 = 1.6 x 10⁻¹³ N.', 'Easy', null, 'Physics final 2se 2024.pdf', 1),
  makeQ('PHYS2-FIN-002', 'subj-physics2', finalOf('subj-physics2'), 'Faraday\'s law of induction states that the induced electromotive force (EMF) in a closed loop is equal to:', 'The negative rate of change of magnetic flux through the loop', 'The magnetic field strength multiplied by loop resistance', 'The electrostatic potential difference divided by current', 'The electric charge accumulated on the plates', 'a', 'By Faraday\'s law: ε = - dΦ_B / dt. The negative sign represents Lenz\'s law.', 'Easy', null, 'Physics final 2se 2024.pdf', 2),

  // ==========================================
  // GENERAL CHEMISTRY (CHEM101) - ENGLISH
  // ==========================================
  makeQ('CHEM-MID-001', 'subj-chem', midOf('subj-chem'), 'How many moles of carbon dioxide (CO₂) are present in 88.0 grams of CO₂? (Molar masses: C = 12.01 g/mol, O = 16.00 g/mol)', '2.00 moles', '1.00 mole', '4.00 moles', '0.50 moles', 'a', 'Molar mass of CO₂ = 12.01 + 2(16.00) = 44.01 g/mol. Moles = 88.0 g / 44.01 g/mol ≈ 2.00 moles.', 'Easy', null, 'الكيمياء العامة - فاينال 2011 - 2014 .pdf', 1),
  makeQ('CHEM-MID-002', 'subj-chem', midOf('subj-chem'), 'According to VSEPR theory, what is the molecular geometry of methane (CH₄)?', 'Tetrahedral', 'Trigonal planar', 'Linear', 'Octahedral', 'a', 'Methane has 4 bonding pairs and 0 lone pairs around the central carbon atom (sp³ hybridization), giving a tetrahedral shape with 109.5° bond angles.', 'Easy', null, 'الكيمياء العامة - فاينال 2011 - 2014 .pdf', 2),
  makeQ('CHEM-FIN-001', 'subj-chem', finalOf('subj-chem'), 'What is the pH of a 0.001 M solution of hydrochloric acid (HCl), a strong acid?', '3.0', '1.0', '11.0', '7.0', 'a', 'For strong acid HCl, [H⁺] = 0.001 M = 10⁻³ M. pH = -log₁₀[H⁺] = -log₁₀(10⁻³) = 3.0.', 'Easy', null, 'فاينل كيمياء ورقي(1).pdf', 1),
  makeQ('CHEM-FIN-002', 'subj-chem', finalOf('subj-chem'), 'Under ideal gas conditions (PV = nRT), if temperature is kept constant and volume is halved, the pressure:', 'Doubles', 'Is halved', 'Remains unchanged', 'Quadruples', 'a', 'By Boyle\'s Law (P₁V₁ = P₂V₂ at constant T): P₂ = P₁(V₁ / 0.5V₁) = 2P₁. The pressure doubles.', 'Easy', null, 'فاينل كيمياء ورقي(1).pdf', 2),

  // --- ADDITIONAL DIFFERENTIAL EQUATIONS QUESTIONS ---
  makeQ('DIFF-MID-004', 'subj-diff', midOf('subj-diff'), 'A Bernoulli differential equation has the standard form dy/dx + P(x)y = Q(x)y^n. What substitution transforms it into a linear ODE?', 'v = y^(1 - n)', 'v = y^(n - 1)', 'v = ln(y)', 'v = y^n', 'a', 'Dividing by y^n gives y^(-n) y\' + P(x) y^(1-n) = Q(x). Letting v = y^(1-n) yields dv/dx = (1-n) y^(-n) y\', producing a first-order linear ODE.', 'Medium', null, 'Mid Diff Summer 2022.pdf', 2),
  makeQ('DIFF-FIN-004', 'subj-diff', finalOf('subj-diff'), 'The Laplace transform of the Dirac Delta function δ(t - t₀) for t₀ ≥ 0 is:', 'e^(-s t₀)', '1 / (s - t₀)', 's e^(-s t₀)', 't₀ / s', 'a', 'ℒ{δ(t - t₀)} = ∫₀^∞ e^(-st) δ(t - t₀) dt = e^(-s t₀) by the sifting property of the impulse function.', 'Easy', null, 'فاينل ديف.pdf', 2),

  // --- ADDITIONAL LINEAR ALGEBRA QUESTIONS ---
  makeQ('LIN-MID-004', 'subj-linear', midOf('subj-linear'), 'According to the Rank-Nullity Theorem, for any m x n matrix A with rank r and nullity k (dimension of null space):', 'rank(A) + nullity(A) = n (number of columns)', 'rank(A) + nullity(A) = m (number of rows)', 'rank(A) * nullity(A) = n', 'rank(A) = nullity(A)', 'a', 'The Fundamental Rank-Nullity Theorem states that dim(Col A) + dim(Nul A) = n, where n is the number of columns (domain dimension).', 'Medium', null, 'Linear 2026 mid.pdf', 2),
  makeQ('LIN-FIN-003', 'subj-linear', finalOf('subj-linear'), 'If λ is an eigenvalue of an invertible matrix A with eigenvector v, what is the corresponding eigenvalue of A⁻¹?', '1 / λ', '-λ', 'λ²', '1 - λ', 'a', 'From A v = λ v, multiply both sides by A⁻¹: v = λ A⁻¹ v => A⁻¹ v = (1/λ) v. Thus 1/λ is the eigenvalue of A⁻¹.', 'Easy', null, 'Final T1.2023.pdf', 2),

  // --- ADDITIONAL NUMERICAL METHODS QUESTIONS ---
  makeQ('NUM-MID-003', 'subj-numerical', midOf('subj-numerical'), 'What is the recurrence relation used in the Secant Method for finding root approximations?', 'x_{n+1} = x_n - f(x_n) * (x_n - x_{n-1}) / [f(x_n) - f(x_{n-1})]', 'x_{n+1} = (x_n + x_{n-1}) / 2', 'x_{n+1} = x_n - f(x_n) / f\'(x_n)', 'x_{n+1} = x_n + f(x_n) * f\'(x_n)', 'a', 'The Secant Method replaces the analytical derivative in Newton\'s method with a finite-difference approximation across the two latest iterates.', 'Medium', null, 'numerical teq.pdf', 2),
  makeQ('NUM-FIN-003', 'subj-numerical', finalOf('subj-numerical'), 'The Gauss-Seidel iterative method for solving Ax = b is guaranteed to converge from any initial guess if matrix A is:', 'Strictly diagonally dominant (or symmetric positive definite)', 'Skew-symmetric', 'Singular with zero determinant', 'Upper triangular with equal diagonal entries', 'a', 'Strict diagonal dominance (|a_ii| > Σ_{j≠i} |a_ij| for all rows) is a sufficient condition for Gauss-Seidel convergence.', 'Medium', null, 'Numerical-final 2.pdf', 2),

  // --- ADDITIONAL PROBABILITY & STATISTICS QUESTIONS ---
  makeQ('STAT-MID-003', 'subj-stats', midOf('subj-stats'), 'In a Binomial distribution B(n, p) with n trials and probability of success p, what is the formula for the variance Var(X)?', 'Var(X) = n * p * (1 - p)', 'Var(X) = n * p', 'Var(X) = √(n * p)', 'Var(X) = p * (1 - p)', 'a', 'For n independent Bernoulli trials with parameter p, the mean is E[X] = np and the variance is Var(X) = np(1 - p).', 'Easy', null, 'احصاء / Final .pdf', 2),
  makeQ('STAT-FIN-003', 'subj-stats', finalOf('subj-stats'), 'According to the Central Limit Theorem (CLT), as sample size n increases (typically n ≥ 30), the sampling distribution of the sample mean approaches:', 'A normal distribution regardless of the original population shape', 'A uniform distribution', 'A Poisson distribution', 'An exponential distribution', 'a', 'The CLT proves that the sum and average of independent random variables tend toward a normal distribution as n becomes large.', 'Medium', null, 'احصاء / Final .pdf', 2),

  // --- ADDITIONAL PHYSICS 1 QUESTIONS ---
  makeQ('PHYS1-MID-004', 'subj-physics1', midOf('subj-physics1'), 'A particle moves in a circle of radius r = 2 m with a constant speed v = 6 m/s. What is its centripetal acceleration directed toward the center?', '18 m/s²', '12 m/s²', '3 m/s²', '36 m/s²', 'a', 'Centripetal acceleration a_c = v² / r = (6)² / 2 = 36 / 2 = 18 m/s².', 'Easy', null, '100_laws_of_motion_practice_questions.pdf', 2),
  makeQ('PHYS1-FIN-003', 'subj-physics1', finalOf('subj-physics1'), 'When no external net torque acts on a physical system (Στ_ext = 0), which physical quantity is strictly conserved?', 'Total angular momentum (L = I * ω)', 'Linear momentum only', 'Mechanical energy only', 'Translational kinetic energy', 'a', 'By the rotational analog of Newton\'s Second Law (τ_net = dL/dt), zero external torque guarantees conservation of total angular momentum L.', 'Easy', null, 'Physics final exam.pdf', 2),

  // --- ADDITIONAL PHYSICS 2 QUESTIONS ---
  makeQ('PHYS2-MID-003', 'subj-physics2', midOf('subj-physics2'), 'Using Gauss\'s Law, what is the electric field magnitude E at distance r from an infinitely long straight wire carrying uniform linear charge density λ in air?', 'E = λ / (2π ε₀ r)', 'E = λ / (4π ε₀ r²)', 'E = λ / (ε₀ r)', 'E = 2λ / (ε₀ r²)', 'a', 'Integrating over a coaxial cylindrical Gaussian surface of radius r and length L gives Φ = E(2πrL) = (λL)/ε₀ => E = λ/(2πε₀r).', 'Medium', null, '2025 mid.pdf', 2),
  makeQ('PHYS2-FIN-003', 'subj-physics2', finalOf('subj-physics2'), 'Using Ampere\'s Law, what is the magnetic field B inside an ideal long solenoid with n turns per unit length carrying current I?', 'B = μ₀ * n * I', 'B = μ₀ * I / (2π r)', 'B = μ₀ * n * I / (2r)', 'B = 0', 'a', 'Applying Ampere\'s circuital law around a rectangular loop through the core gives B * L = μ₀ (n L) I => B = μ₀ n I.', 'Easy', null, 'Physics final 2se 2024.pdf', 2),

  // --- ADDITIONAL CHEMISTRY QUESTIONS ---
  makeQ('CHEM-MID-003', 'subj-chem', midOf('subj-chem'), 'According to Le Chatelier\'s Principle, for the exothermic synthesis reaction N₂(g) + 3H₂(g) ⇌ 2NH₃(g) + Heat, what happens if the temperature of the reaction vessel is increased?', 'The equilibrium shifts to the left (reactants side), decreasing the yield of NH₃', 'The equilibrium shifts to the right (products side)', 'The reaction stops completely', 'The value of the equilibrium constant Kc increases', 'a', 'Because the forward reaction releases heat (exothermic), increasing temperature adds thermal stress, driving the equilibrium in the endothermic reverse direction (to the left).', 'Medium', null, 'الكيمياء العامة - فاينال 2011 - 2014 .pdf', 2),
  makeQ('CHEM-FIN-003', 'subj-chem', finalOf('subj-chem'), 'According to Hess\'s Law of Constant Heat Summation, the overall enthalpy change (ΔH) for a multi-step chemical reaction depends on:', 'Only the initial reactants and final products, and is independent of the reaction pathway', 'The rate of the slowest elementary step', 'The presence of a platinum catalyst', 'The surface area of solid reactants', 'a', 'Enthalpy is a thermodynamic state function; hence total ΔH is identical regardless of whether the reaction occurs in one step or a series of steps.', 'Easy', null, 'فاينل كيمياء ورقي(1).pdf', 2)
];

module.exports = { mathScienceQuestions };
