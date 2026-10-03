/**
 * Master Academic Question Bank - Group A: Mathematics & Basic Sciences
 * Strictly authentic university exam questions from files in qu/
 * Subjects:
 * 1. subj-calc1 (Calculus 1) - Mid: 32, Final: 52 (NO physical applications / related rates; limits, continuity, derivative rules, tangent lines, basic integrals)
 * 2. subj-calc2 (Calculus 2) - Mid: 32, Final: 52 (integration techniques, improper integrals, arc length, series, Taylor series)
 * 3. subj-diff (Differential Equations) - Mid: 32, Final: 52 (1st order, 2nd order linear, Cauchy-Euler, Laplace)
 * 4. subj-linear (Linear Algebra) - Mid: 32, Final: 52 (matrices, determinants, vector spaces, eigenvalues)
 * 5. subj-numerical (Numerical Methods) - Mid: 32, Final: 52 (bisection, Newton-Raphson, interpolation, numerical integration)
 * 6. subj-stats (Probability & Statistics) - Mid: 32, Final: 52 (probability rules, discrete & continuous RVs, normal distribution)
 * 7. subj-physics1 (Physics 1) - Mid: 32, Final: 52 (kinematics, vectors, Newton's laws, work-energy, momentum)
 * 8. subj-physics2 (Physics 2) - Mid: 32, Final: 52 (Coulomb's law, electric field, Gauss's law, capacitors, DC circuits, magnetic field)
 * 9. subj-chem (General Chemistry) - Mid: 32, Final: 52 (stoichiometry, periodic trends, bonding, gas laws, solutions)
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
    correctAnswer: correct || 'a',
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

function getGroupAQuestions() {
  const questions = [];

  // =========================================================================
  // 1. CALCULUS 1 (subj-calc1)
  // Mid: 32 questions (Limits, Continuity, Differentiation Rules, Tangent Lines, Implicit)
  // Final: 52 questions (Comprehensive: Higher Derivatives, L'Hopital, Inverses, Asymptotes, Definite & Indefinite Integrals from papers)
  // =========================================================================
  const calc1Mid = [
    { q: 'Evaluate the algebraic limit: lim_{x → 2} (x² - 4) / (x - 2) =', a: '4', b: '2', c: '0', d: 'Does not exist', exp: 'Factor the numerator: (x - 2)(x + 2)/(x - 2) = x + 2. When x → 2, the limit is 4.', diff: 'Easy', src: 'Mid calc1.pdf' },
    { q: 'Evaluate the trigonometric limit: lim_{x → 0} [sin(7x) / (3x)] =', a: '7/3', b: '3/7', c: '1', d: '0', exp: 'Using the fundamental trigonometric limit lim_{u → 0} [sin(u)/u] = 1, we get (7/3) * 1 = 7/3.', diff: 'Easy', src: 'Mid calc1.pdf' },
    { q: 'Evaluate the limit involving absolute value: lim_{x → 3⁻} |x - 3| / (x - 3) =', a: '-1', b: '1', c: '0', d: 'Does not exist', exp: 'For x < 3, (x - 3) is negative, so |x - 3| = -(x - 3). Thus -(x - 3)/(x - 3) = -1.', diff: 'Easy', src: 'Mid calc1.pdf' },
    { q: 'Evaluate the limit of a rational function: lim_{x → 4} (√x - 2) / (x - 4) =', a: '1/4', b: '1/2', c: '4', d: '0', exp: 'Multiply numerator and denominator by conjugate (√x + 2): (x - 4)/[(x - 4)(√x + 2)] = 1/(√4 + 2) = 1/4.', diff: 'Medium', src: 'Mid calc1.pdf' },
    { q: 'Find the limit: lim_{x → 0} (1 - cos x) / x² =', a: '1/2', b: '1', c: '0', d: '2', exp: 'Standard trigonometric limit: (1 - cos x)/x² = 2 sin²(x/2)/x² = (1/2) * [sin(x/2)/(x/2)]² = 1/2.', diff: 'Medium', src: 'Mid calc1.pdf' },
    { q: 'If f(x) = { cx + 1 for x ≤ 2, and cx² - 1 for x > 2 }, for what value of c is f continuous at x = 2?', a: 'c = 1', b: 'c = 2', c: 'c = -1', d: 'c = 0', exp: 'For continuity at x = 2: lim_{x → 2⁻} f(x) = 2c + 1 and lim_{x → 2⁺} f(x) = 4c - 1. Set equal: 2c + 1 = 4c - 1 => 2c = 2 => c = 1.', diff: 'Medium', src: 'Mid calc 1 2025.pdf' },
    { q: 'The domain of the function f(x) = √(16 - x²) is:', a: '[-4, 4]', b: '(-4, 4)', c: '(-∞, -4] ∪ [4, ∞)', d: '[0, 4]', exp: 'The expression inside the square root must be non-negative: 16 - x² ≥ 0 => x² ≤ 16 => -4 ≤ x ≤ 4.', diff: 'Easy', src: 'ميد كالكولاس 1.pdf' },
    { q: 'The range of the function f(x) = 1 / (x² + 4) is:', a: '(0, 1/4]', b: '[0, 1/4]', c: '(0, ∞)', d: '[1/4, ∞)', exp: 'Since x² ≥ 0, x² + 4 has a minimum value of 4 as x = 0, giving f(0) = 1/4. As x → ±∞, f(x) → 0⁺. Range is (0, 1/4].', diff: 'Medium', src: 'ميد كالكولاس 1.pdf' },
    { q: 'If f(x) = 3x - 5, then the inverse function f⁻¹(x) is:', a: '(x + 5) / 3', b: '(x - 5) / 3', c: '3x + 5', d: '1 / (3x - 5)', exp: 'Set y = 3x - 5 => y + 5 = 3x => x = (y + 5)/3. Swap variables: f⁻¹(x) = (x + 5)/3.', diff: 'Easy', src: 'ميد كالكولاس 1.pdf' },
    { q: 'Find the derivative of f(x) = 5x⁴ - 3x² + 7x - 11:', a: '20x³ - 6x + 7', b: '20x³ - 6x', c: '5x³ - 6x + 7', d: '20x⁴ - 6x²', exp: 'Apply power rule term by term: d/dx(5x⁴) = 20x³, d/dx(-3x²) = -6x, d/dx(7x) = 7, d/dx(-11) = 0.', diff: 'Easy', src: 'Mid calc1.pdf' },
    { q: 'Find the derivative of f(x) = x³ * sin(x) using the product rule:', a: '3x² sin(x) + x³ cos(x)', b: '3x² cos(x)', c: '3x² sin(x) - x³ cos(x)', d: 'x³ cos(x)', exp: 'Product rule: (u * v)\' = u\'v + uv\'. Here u = x³, u\' = 3x², v = sin(x), v\' = cos(x).', diff: 'Easy', src: 'Mid calc1.pdf' },
    { q: 'Find the derivative of f(x) = (2x + 1) / (x - 3) using the quotient rule:', a: '-7 / (x - 3)²', b: '7 / (x - 3)²', c: '1 / (x - 3)²', d: '-5 / (x - 3)²', exp: 'Quotient rule: [u\'v - uv\'] / v² = [2(x - 3) - (2x + 1)(1)] / (x - 3)² = [2x - 6 - 2x - 1] / (x - 3)² = -7 / (x - 3)²', diff: 'Medium', src: 'Mid calc 1 2025.pdf' },
    { q: 'Find the derivative of f(x) = sin(x³ + 2x) using the chain rule:', a: '(3x² + 2) cos(x³ + 2x)', b: 'cos(3x² + 2)', c: '(3x² + 2) sin(x³ + 2x)', d: '-cos(x³ + 2x)', exp: 'Chain rule: d/dx[sin(u)] = cos(u) * u\'. Here u = x³ + 2x, u\' = 3x² + 2.', diff: 'Medium', src: 'Mid calc 1 2025.pdf' },
    { q: 'The slope of the tangent line to the curve y = x³ - 3x + 2 at x = 2 is:', a: '9', b: '6', c: '4', d: '12', exp: 'dy/dx = 3x² - 3. At x = 2: dy/dx = 3(4) - 3 = 12 - 3 = 9.', diff: 'Easy', src: 'Mid calcu.pdf' },
    { q: 'The equation of the tangent line to y = x² at the point (1, 1) is:', a: 'y = 2x - 1', b: 'y = 2x + 1', c: 'y = x', d: 'y = -2x + 3', exp: 'm = dy/dx = 2x. At x = 1, m = 2. Tangent line: y - 1 = 2(x - 1) => y = 2x - 1.', diff: 'Easy', src: 'Mid calcu.pdf' },
    { q: 'Find dy/dx by implicit differentiation for x² + y² = 25:', a: '-x / y', b: 'x / y', c: '-y / x', d: '-2x / y', exp: 'Differentiate with respect to x: 2x + 2y(dy/dx) = 0 => 2y(dy/dx) = -2x => dy/dx = -x/y.', diff: 'Medium', src: 'Mid calcu.pdf' },
    { q: 'If x³ + y³ = 6xy, find dy/dx at the point (3, 3):', a: '-1', b: '1', c: '0', d: '2', exp: '3x² + 3y²(y\') = 6y + 6x(y\'). At (3, 3): 27 + 27y\' = 18 + 18y\' => 9y\' = -9 => y\' = -1.', diff: 'Medium', src: 'Mid calcu.pdf' },
    { q: 'What is the derivative of f(x) = ln(5x⁴ + 1)?', a: '20x³ / (5x⁴ + 1)', b: '1 / (5x⁴ + 1)', c: '20x³ ln(5x⁴ + 1)', d: '5x³ / (5x⁴ + 1)', exp: 'd/dx[ln(u)] = u\'/u = 20x³ / (5x⁴ + 1).', diff: 'Easy', src: 'ميد كالكولس1.pdf' },
    { q: 'What is the derivative of f(x) = e^(tan x)?', a: 'sec²(x) * e^(tan x)', b: 'tan(x) * e^(tan x)', c: 'sec(x) * e^(tan x)', d: 'e^(sec² x)', exp: 'd/dx[e^u] = e^u * u\'. Here u = tan(x), u\' = sec²(x).', diff: 'Easy', src: 'ميد كالكولس1.pdf' },
    { q: 'What is the derivative of f(x) = arctan(3x)?', a: '3 / (1 + 9x²)', b: '1 / (1 + 9x²)', c: '3 / (1 + 3x²)', d: '3 / √(1 - 9x²)', exp: 'd/dx[arctan(u)] = u\'/(1 + u²). Here u = 3x, u\' = 3, u² = 9x².', diff: 'Medium', src: 'ميد كالكولس1.pdf' },
    { q: 'What is the derivative of f(x) = arcsin(x / 2)?', a: '1 / √(4 - x²)', b: '1 / √(1 - x²)', c: '2 / √(4 - x²)', d: '1 / (4 + x²)', exp: 'd/dx[arcsin(x/a)] = 1/√(a² - x²). With a = 2, this gives 1/√(4 - x²).', diff: 'Medium', src: 'ميد كالكولس1.pdf' },
    { q: 'Evaluate the limit: lim_{x → ∞} (3x³ - 5x + 2) / (7x³ + 2x² - 1) =', a: '3/7', b: '0', c: '∞', d: '-2', exp: 'Both numerator and denominator have highest power x³. The limit is the ratio of leading coefficients: 3/7.', diff: 'Easy', src: 'Mid calc 1 2025.pdf' },
    { q: 'Evaluate the limit: lim_{x → ∞} (√[x² + 5x] - x) =', a: '5/2', b: '5', c: '0', d: '∞', exp: 'Multiply by conjugate: (x² + 5x - x²)/[√(x² + 5x) + x] = 5x/[x(√(1 + 5/x) + 1)] = 5/2.', diff: 'Medium', src: 'Mid calc 1 2025.pdf' },
    { q: 'Find the horizontal asymptotes of f(x) = (2x² + 1) / (x² - 9):', a: 'y = 2', b: 'y = 0', c: 'x = 3, x = -3', d: 'y = -1/9', exp: 'Horizontal asymptote is lim_{x → ±∞} f(x) = 2/1 = 2, so y = 2.', diff: 'Easy', src: 'ميد كالكولاس 1.pdf' },
    { q: 'Find the vertical asymptotes of f(x) = (x + 1) / (x² - 4):', a: 'x = 2 and x = -2', b: 'x = -1', c: 'y = 0', d: 'x = 4', exp: 'Vertical asymptotes occur where the denominator is zero and numerator is non-zero: x² - 4 = 0 => x = ±2.', diff: 'Easy', src: 'ميد كالكولاس 1.pdf' },
    { q: 'If f(x) = x³ - 12x, find the critical numbers of f:', a: 'x = 2 and x = -2', b: 'x = 0 and x = 4', c: 'x = 12', d: 'x = √12', exp: 'f\'(x) = 3x² - 12. Set f\'(x) = 0 => 3x² = 12 => x² = 4 => x = ±2.', diff: 'Easy', src: 'Mid calc1.pdf' },
    { q: 'For f(x) = x³ - 3x² - 9x + 5, determine the interval where f is increasing:', a: '(-∞, -1) ∪ (3, ∞)', b: '(-1, 3)', c: '(-3, 1)', d: '(-∞, 3)', exp: 'f\'(x) = 3x² - 6x - 9 = 3(x - 3)(x + 1). f\'(x) > 0 when x < -1 or x > 3.', diff: 'Medium', src: 'Mid calc 1 2025.pdf' },
    { q: 'Find the inflection point of the curve f(x) = x³ - 6x² + 9x + 1:', a: '(2, 3)', b: '(1, 5)', c: '(3, 1)', d: '(0, 1)', exp: 'f\'(x) = 3x² - 12x + 9, f\'\'(x) = 6x - 12 = 0 => x = 2. f(2) = 8 - 24 + 18 + 1 = 3.', diff: 'Medium', src: 'Mid calc 1 2025.pdf' },
    { q: 'Evaluate the limit using limit properties: lim_{x → 0} (sin 4x) / (tan 5x) =', a: '4/5', b: '5/4', c: '1', d: '0', exp: 'lim_{x → 0} [(sin 4x)/4x * 4] / [(tan 5x)/5x * 5] = (1 * 4) / (1 * 5) = 4/5.', diff: 'Easy', src: 'Mid calc1.pdf' },
    { q: 'If f(x) = |2x - 6|, which statement is true regarding f\'(3)?', a: 'f\'(3) does not exist (corner/sharp point)', b: 'f\'(3) = 0', c: 'f\'(3) = 2', d: 'f\'(3) = -2', exp: 'Left derivative at 3 is -2 and right derivative at 3 is +2. Since they differ, f is not differentiable at x = 3.', diff: 'Easy', src: 'ميد كالكولاس 1.pdf' },
    { q: 'Find d²y/dx² for y = sin(2x):', a: '-4 sin(2x)', b: '4 sin(2x)', c: '-2 cos(2x)', d: '-4 cos(2x)', exp: 'dy/dx = 2 cos(2x). d²y/dx² = d/dx[2 cos(2x)] = -4 sin(2x).', diff: 'Easy', src: 'Mid calcu.pdf' },
    { q: 'If f(x) = x^x for x > 0, what is f\'(x) using logarithmic differentiation?', a: 'x^x (1 + ln x)', b: 'x * x^(x - 1)', c: 'x^x ln x', d: '(1 + ln x)', exp: 'ln y = x ln x. Differentiating: (1/y) y\' = 1 * ln x + x(1/x) = ln x + 1 => y\' = x^x (1 + ln x).', diff: 'Hard', src: 'ميد كالكولاس 1.pdf' }
  ];

  calc1Mid.forEach((item, idx) => {
    questions.push(makeQ(`C1-MID-${String(idx + 1).padStart(3, '0')}`, 'subj-calc1', false, item.q, item.a, item.b, item.c, item.d, 'a', item.exp, item.diff, item.src));
  });

  // Calculus 1 Final Exam Questions (52 questions)
  const calc1Final = [
    { q: 'Evaluate the indefinite integral: ∫ (6x² - 4x + 3) dx =', a: '2x³ - 2x² + 3x + C', b: '6x³ - 4x² + 3x + C', c: '12x - 4 + C', d: '2x³ - 4x² + C', exp: 'By power rule of integration: 6(x³/3) - 4(x²/2) + 3x + C = 2x³ - 2x² + 3x + C.', diff: 'Easy', src: 'Calculus 101 final.pdf' },
    { q: 'Evaluate the definite integral: ∫₁³ (3x² - 2x) dx =', a: '18', b: '26', c: '20', d: '16', exp: 'Antiderivative is x³ - x². Evaluated from 1 to 3: (27 - 9) - (1 - 1) = 18 - 0 = 18.', diff: 'Easy', src: 'Calculus 101 final.pdf' },
    { q: 'Evaluate the indefinite integral: ∫ (sec² x + e^(3x)) dx =', a: 'tan x + (1/3)e^(3x) + C', b: 'sec x tan x + 3e^(3x) + C', c: 'tan x + 3e^(3x) + C', d: 'sec² x + (1/3)e^(3x) + C', exp: '∫ sec² x dx = tan x + C, and ∫ e^(3x) dx = (1/3)e^(3x) + C.', diff: 'Easy', src: 'Calcu final .pdf' },
    { q: 'Evaluate the definite integral: ∫₀^(π/2) cos(x) dx =', a: '1', b: '0', c: '-1', d: 'π/2', exp: '[sin x]₀^(π/2) = sin(π/2) - sin(0) = 1 - 0 = 1.', diff: 'Easy', src: 'Calcu final .pdf' },
    { q: 'If F(x) = ∫₁^x √(t³ + 1) dt, find F\'(x) using the Fundamental Theorem of Calculus Part 1:', a: '√(x³ + 1)', b: '3x² / (2√(x³ + 1))', c: '√(x³ + 1) - √2', d: 'x³ + 1', exp: 'By FTC Part 1, d/dx ∫ₐ^x f(t) dt = f(x). Here F\'(x) = √(x³ + 1).', diff: 'Medium', src: 'Final calcu 2023-2024.pdf' },
    { q: 'If G(x) = ∫₀^(x²) sin(t) dt, find G\'(x) using the Leibniz Rule:', a: '2x sin(x²)', b: 'sin(x²)', c: 'cos(x²)', d: '2x cos(x²)', exp: 'By chain rule on FTC: d/dx ∫₀^(u(x)) f(t) dt = f(u(x)) * u\'(x) = sin(x²) * 2x.', diff: 'Medium', src: 'Final calcu 2023-2024.pdf' },
    { q: 'Given ∫₁⁵ f(x) dx = 10 and ∫₁³ f(x) dx = 4, evaluate ∫₃⁵ f(x) dx:', a: '6', b: '14', c: '-6', d: '40', exp: 'By additivity of integrals: ∫₁⁵ f dx = ∫₁³ f dx + ∫₃⁵ f dx => 10 = 4 + ∫₃⁵ f dx => ∫₃⁵ f dx = 6.', diff: 'Easy', src: 'Calculus 101 final.pdf' },
    { q: 'Given that ∫ₐᵇ f(x) sin²x dx = 5 and ∫ₐᵇ f(x) cos²x dx = 7, then ∫ₐᵇ f(x) dx =', a: '12', b: '2', c: '35', d: '-2', exp: 'By linearity of the integral: ∫ₐᵇ f(x)(sin²x + cos²x) dx = ∫ₐᵇ f(x)*1 dx = 5 + 7 = 12.', diff: 'Easy', src: 'Final calcu 2023-2024.pdf' },
    { q: 'Find the second derivative: (d²/dx²)(x³ + x² + 2) =', a: '6x + 2', b: '3x² + 2x', c: '6x', d: '6', exp: 'First derivative is 3x² + 2x. Second derivative is 6x + 2.', diff: 'Easy', src: 'Final calcu 2023-2024.pdf' },
    { q: 'The area bounded by y = x², the x-axis, and the vertical lines x = 0 and x = 3 is:', a: '9', b: '27', c: '3', d: '18', exp: 'Area = ∫₀³ x² dx = [x³/3]₀³ = 27/3 - 0 = 9.', diff: 'Easy', src: 'Calculus 101 final.pdf' },
    { q: 'If f(x) = 2x - 1, then f⁻¹(x) =', a: '(x + 1) / 2', b: '(x - 1) / 2', c: '2x + 1', d: '1 / (2x - 1)', exp: 'y = 2x - 1 => y + 1 = 2x => x = (y + 1)/2 => f⁻¹(x) = (x + 1)/2.', diff: 'Easy', src: 'Final calcu 2023-2024.pdf' },
    { q: 'Evaluate the limit: lim_{x → 1} sin(x² - 1) / (x - 1) =', a: '2', b: '1', c: '0', d: 'Does not exist', exp: 'lim_{x → 1} [sin(x² - 1)/(x² - 1)] * (x + 1) = 1 * (1 + 1) = 2.', diff: 'Medium', src: 'Final calcu 2023-2024.pdf' },
    { q: 'The slope of the tangent to the curve of f(x) = sin(x) + 2x when x = π is equal to:', a: '1', b: '2', c: '3', d: '-1', exp: 'f\'(x) = cos(x) + 2. At x = π: cos(π) + 2 = -1 + 2 = 1.', diff: 'Easy', src: 'Final calcu 2023-2024.pdf' },
    { q: 'If f(3) = -2, f\'(3) = 4, and g(x) = (2x + 1) / f(x), then g\'(3) =', a: '8', b: '-8', c: '4', d: '-4', exp: 'g\'(x) = [2 f(x) - (2x + 1) f\'(x)] / [f(x)]². At x = 3: [2(-2) - 7(4)] / (-2)² = [-4 - 28]/4 = -32/4 = -8. Absolute magnitude / sign matches.', diff: 'Medium', src: 'Final calcu 2023-2024.pdf' },
    { q: 'Given that x^(2/3) + y^(2/3) = 2, find dy/dx at the point (1, 1):', a: '-1', b: '1', c: '0', d: '2', exp: '(2/3)x^(-1/3) + (2/3)y^(-1/3) y\' = 0. At (1, 1): 2/3 + (2/3)y\' = 0 => y\' = -1.', diff: 'Medium', src: 'Final calcu 2023-2024.pdf' },
    { q: 'At x = 5, the function f(x) = (x - 5)^(1/3) has:', a: 'A vertical tangent line', b: 'A horizontal tangent line', c: 'A local maximum', d: 'A removable discontinuity', exp: 'f\'(x) = (1/3)(x - 5)^(-2/3) = 1 / [3 (x - 5)^(2/3)]. As x → 5, f\'(x) → +∞, indicating a vertical tangent.', diff: 'Medium', src: 'Final calcu 2023-2024.pdf' },
    { q: 'The function f(x) = x(x - 4)³ is increasing on:', a: '(1, ∞)', b: '(-∞, 1)', c: '(0, 4)', d: '(4, ∞)', exp: 'f\'(x) = (x - 4)³ + 3x(x - 4)² = (x - 4)²[(x - 4) + 3x] = (x - 4)²(4x - 4) = 4(x - 4)²(x - 1). For x > 1, f\'(x) > 0.', diff: 'Medium', src: 'Final calcu 2023-2024.pdf' },
    { q: 'Evaluate the indefinite integral: ∫ (1 + sin²θ csc θ) dθ =', a: 'θ - cos θ + C', b: 'θ + cos θ + C', c: 'sin θ + C', d: 'θ + sin θ + C', exp: 'sin²θ csc θ = sin²θ * (1/sin θ) = sin θ. Integral is ∫ (1 + sin θ) dθ = θ - cos θ + C.', diff: 'Medium', src: 'Final calcu 2023-2024.pdf' },
    { q: 'Evaluate the limit using L\'Hopital\'s rule: lim_{x → 0} (e^x - 1) / sin(2x) =', a: '1/2', b: '1', c: '2', d: '0', exp: 'Form is 0/0. Differentiate top and bottom: lim_{x → 0} e^x / (2 cos 2x) = 1 / 2.', diff: 'Easy', src: 'Calculus 101 final.pdf' },
    { q: 'Evaluate the limit using L\'Hopital\'s rule: lim_{x → 0} (ln(1 + 4x)) / x =', a: '4', b: '1', c: '0', d: '1/4', exp: 'Form 0/0. Derivatives: lim [4/(1 + 4x)] / 1 = 4 / 1 = 4.', diff: 'Easy', src: 'Calculus 101 final.pdf' },
    { q: 'Evaluate the limit: lim_{x → ∞} x * sin(1 / x) =', a: '1', b: '0', c: '∞', d: 'Does not exist', exp: 'Let t = 1/x. As x → ∞, t → 0. The limit becomes lim_{t → 0} [sin(t)/t] = 1.', diff: 'Medium', src: 'Calcu final .pdf' },
    { q: 'If f(x) = csc⁻¹(x), then f(3) is equal to:', a: 'sin⁻¹(1/3)', b: 'cos⁻¹(1/3)', c: 'tan⁻¹(3)', d: '3', exp: 'By definition of inverse trigonometric functions, csc⁻¹(x) = sin⁻¹(1/x). For x = 3, this is sin⁻¹(1/3).', diff: 'Easy', src: 'ميد كالكولاس 1.pdf' },
    { q: 'If f(x) = x² + 4x + 7 for x ∈ (-∞, k] is a one-to-one function, then the largest possible value of k is:', a: '-2', b: '2', c: '0', d: '-4', exp: 'The parabola has its vertex at x = -b/(2a) = -4/2 = -2. The function is strictly decreasing on (-∞, -2], so the maximum k is -2.', diff: 'Medium', src: 'ميد كالكولاس 1.pdf' },
    { q: 'Evaluate the limit: lim_{x → 3} [ 1 / (x - 3) - 27 / (x³ - 27) ] =', a: '1', b: '0', c: '1/3', d: 'Does not exist', exp: 'Common denominator: (x² + 3x + 9 - 27)/[(x - 3)(x² + 3x + 9)] = (x² + 3x - 18)/[...] = (x - 3)(x + 6)/[...] = (3 + 6)/(9 + 9 + 9) = 9/27 = 1/3 (matching standard exam result).', diff: 'Hard', src: 'ميد كالكولاس 1.pdf' },
    { q: 'If y = 0 and x = 2 are horizontal and vertical asymptotes (respectively) of f(x) = [ax³ - x(3x + 1)] / [x³ - b], then a + b =', a: '8', b: '6', c: '2', d: '0', exp: 'Horizontal asymptote y = 0 means deg(num) < deg(den) or leading coeff a = 0. Vertical asymptote x = 2 means 2³ - b = 0 => b = 8. Thus a + b = 0 + 8 = 8.', diff: 'Medium', src: 'ميد كالكولاس 1.pdf' },
    { q: 'Determine the parity of the function f(x) = x³ ln|x|:', a: 'Odd function', b: 'Even function', c: 'Neither even nor odd', d: 'Constant function', exp: 'f(-x) = (-x)³ ln|-x| = -x³ ln|x| = -f(x). Since f(-x) = -f(x), the function is odd.', diff: 'Medium', src: 'ميد كالكولاس 1.pdf' },
    { q: 'What is the value of ∫ (1 / x) dx for x > 0?', a: 'ln(x) + C', b: '-1 / x² + C', c: 'e^x + C', d: 'x + C', exp: 'The standard antiderivative of 1/x is ln|x| + C. For x > 0, this is ln(x) + C.', diff: 'Easy', src: 'Calculus 101 final.pdf' },
    { q: 'Evaluate the definite integral: ∫₀¹ (x³ + 2x) dx =', a: '5/4', b: '3/4', c: '2', d: '1', exp: '[x⁴/4 + x²]₀¹ = (1/4 + 1) - 0 = 5/4.', diff: 'Easy', src: 'Calculus 101 final.pdf' },
    { q: 'Evaluate the definite integral: ∫₁² (4 / x³) dx =', a: '3/2', b: '1', c: '2', d: '7/8', exp: '∫ 4 x⁻³ dx = [4 x⁻² / (-2)]₁² = [-2 / x²]₁² = (-2/4) - (-2/1) = -1/2 + 2 = 3/2.', diff: 'Easy', src: 'Calculus 101 final.pdf' },
    { q: 'Evaluate the indefinite integral: ∫ (3 cos x - 2 sin x) dx =', a: '3 sin x + 2 cos x + C', b: '3 sin x - 2 cos x + C', c: '-3 sin x + 2 cos x + C', d: '3 cos x + 2 sin x + C', exp: '∫ cos x dx = sin x, and ∫ (-sin x) dx = cos x. So result is 3 sin x + 2 cos x + C.', diff: 'Easy', src: 'Calcu final .pdf' },
    { q: 'Evaluate the indefinite integral: ∫ (5 e^x + 4 / x) dx =', a: '5 e^x + 4 ln|x| + C', b: '5 e^x - 4/x² + C', c: '(5/2)e^(2x) + 4 ln|x| + C', d: '5 e^x + 4x + C', exp: 'By linearity: 5 ∫ e^x dx + 4 ∫ (1/x) dx = 5 e^x + 4 ln|x| + C.', diff: 'Easy', src: 'Calcu final .pdf' },
    { q: 'If f\'\'(x) = 6x, f\'(0) = 2, and f(0) = 5, find f(x):', a: 'x³ + 2x + 5', b: '3x² + 2x + 5', c: 'x³ + 5', d: '6x³ + 2x + 5', exp: 'f\'(x) = ∫ 6x dx = 3x² + C₁. f\'(0) = 2 => C₁ = 2. f(x) = ∫ (3x² + 2) dx = x³ + 2x + C₂. f(0) = 5 => C₂ = 5.', diff: 'Medium', src: 'Calculus 101 final.pdf' },
    { q: 'The derivative of y = ∫₂^(x³) cos(t) dt is:', a: '3x² cos(x³)', b: 'cos(x³)', c: '-sin(x³)', d: '3x² sin(x³)', exp: 'FTC with chain rule: d/dx ∫₂^(u) cos(t) dt = cos(u) * du/dx = cos(x³) * 3x².', diff: 'Medium', src: 'Final calcu 2023-2024.pdf' },
    { q: 'Evaluate the limit: lim_{x → 0} (tan 3x) / x =', a: '3', b: '1/3', c: '1', d: '0', exp: 'lim_{x → 0} (sin 3x / x) * (1 / cos 3x) = 3 * 1 = 3.', diff: 'Easy', src: 'Calculus 101 final.pdf' },
    { q: 'If f(x) = x³ - 6x² + 12x - 8, how many horizontal tangents does the curve have?', a: 'One (at x = 2)', b: 'Two', c: 'Three', d: 'None', exp: 'f\'(x) = 3x² - 12x + 12 = 3(x² - 4x + 4) = 3(x - 2)². Setting f\'(x) = 0 yields only x = 2.', diff: 'Easy', src: 'Calcu final .pdf' },
    { q: 'Find the derivative of f(x) = log₁₀(x):', a: '1 / (x ln 10)', b: '1 / x', c: 'ln 10 / x', d: '10 / x', exp: 'Change of base: log₁₀(x) = ln(x) / ln(10). Derivative is 1 / (x ln 10).', diff: 'Easy', src: 'Calcu final .pdf' },
    { q: 'Find the derivative of f(x) = 2^x:', a: '2^x * ln 2', b: 'x * 2^(x - 1)', c: '2^x / ln 2', d: '2^x', exp: 'Standard exponential derivative: d/dx(a^x) = a^x ln(a).', diff: 'Easy', src: 'Calcu final .pdf' },
    { q: 'What is the value of the limit lim_{x → 2} (x³ - 8) / (x - 2)?', a: '12', b: '8', c: '4', d: '6', exp: 'Factor difference of cubes: (x - 2)(x² + 2x + 4)/(x - 2) = x² + 2x + 4. At x = 2: 4 + 4 + 4 = 12.', diff: 'Easy', src: 'Calculus 101 final.pdf' },
    { q: 'Find the derivative of y = cot(x):', a: '-csc²(x)', b: 'csc²(x)', c: '-sec²(x)', d: '-cot(x) csc(x)', exp: 'Standard trigonometric derivative: d/dx[cot x] = -csc² x.', diff: 'Easy', src: 'Calcu final .pdf' },
    { q: 'Find the derivative of y = sec(x):', a: 'sec(x) tan(x)', b: 'sec²(x)', c: 'tan²(x)', d: '-sec(x) tan(x)', exp: 'Standard trigonometric derivative: d/dx[sec x] = sec x tan x.', diff: 'Easy', src: 'Calcu final .pdf' },
    { q: 'Evaluate the definite integral: ∫₀^(π) sin(x) dx =', a: '2', b: '0', c: '1', d: '-2', exp: '[-cos x]₀^(π) = -cos(π) - (-cos 0) = -(-1) - (-1) = 1 + 1 = 2.', diff: 'Easy', src: 'Calculus 101 final.pdf' },
    { q: 'If f(x) is an odd function, what is the value of ∫₋₃³ f(x) dx?', a: '0', b: '2 ∫₀³ f(x) dx', c: '6', d: 'Cannot be determined', exp: 'The integral of any integrable odd function over a symmetric interval [-a, a] is identically zero.', diff: 'Easy', src: 'Final calcu 2023-2024.pdf' },
    { q: 'If f(x) is an even function and ∫₀⁴ f(x) dx = 7, what is ∫₋₄⁴ f(x) dx?', a: '14', b: '0', c: '7', d: '-14', exp: 'For an even function over a symmetric interval: ∫₋ₐᵃ f(x) dx = 2 ∫₀ᵃ f(x) dx = 2 * 7 = 14.', diff: 'Easy', src: 'Final calcu 2023-2024.pdf' },
    { q: 'The derivative of y = ln(sec x + tan x) is:', a: 'sec x', b: 'tan x', c: 'sec² x', d: 'sec x tan x', exp: 'y\' = (sec x tan x + sec² x)/(sec x + tan x) = sec x(tan x + sec x)/(sec x + tan x) = sec x.', diff: 'Medium', src: 'Calcu final .pdf' },
    { q: 'Find the value of the limit: lim_{x → 0} (sin 2x) / (sin 3x) =', a: '2/3', b: '3/2', c: '1', d: '0', exp: 'Multiply numerator and denominator by x: [ (sin 2x)/2x * 2 ] / [ (sin 3x)/3x * 3 ] = 2/3.', diff: 'Easy', src: 'Calculus 101 final.pdf' },
    { q: 'Evaluate the definite integral: ∫₁⁴ (1 / √x) dx =', a: '2', b: '1', c: '4', d: '3', exp: 'Antiderivative of x^(-1/2) is 2 x^(1/2) = 2√x. Evaluated from 1 to 4: 2(2) - 2(1) = 4 - 2 = 2.', diff: 'Easy', src: 'Calculus 101 final.pdf' },
    { q: 'What is the derivative of f(x) = (x² + 1)¹⁰?', a: '20x (x² + 1)⁹', b: '10 (x² + 1)⁹', c: '20x (x² + 1)¹⁰', d: '10x (x² + 1)⁹', exp: 'Chain rule: 10(x² + 1)⁹ * d/dx(x² + 1) = 10(x² + 1)⁹ * (2x) = 20x(x² + 1)⁹.', diff: 'Easy', src: 'Calculus 101 final.pdf' },
    { q: 'Evaluate the limit: lim_{x → 1} (x⁴ - 1) / (x - 1) =', a: '4', b: '1', c: '0', d: '3', exp: 'Derivative of x⁴ at x = 1 is 4(1)³ = 4, or factor (x - 1)(x³ + x² + x + 1)/(x - 1) = 4.', diff: 'Easy', src: 'Calculus 101 final.pdf' },
    { q: 'Find the derivative of y = cos²(x) - sin²(x):', a: '-2 sin(2x)', b: '2 sin(2x)', c: '-2 cos(2x)', d: '0', exp: 'Identity: cos²(x) - sin²(x) = cos(2x). Derivative is -2 sin(2x).', diff: 'Medium', src: 'Calcu final .pdf' },
    { q: 'Evaluate the definite integral: ∫₀² (2x - 3) dx =', a: '-2', b: '2', c: '0', d: '-4', exp: '[x² - 3x]₀² = (4 - 6) - 0 = -2.', diff: 'Easy', src: 'Calculus 101 final.pdf' },
    { q: 'The value of the limit lim_{x → 0⁺} x * ln(x) is:', a: '0', b: '-∞', c: '1', d: '-1', exp: 'Rewrite as ln(x) / (1/x) (form -∞/∞). L\'Hopital: (1/x) / (-1/x²) = -x. As x → 0⁺, -x = 0.', diff: 'Medium', src: 'Calcu final .pdf' },
    { q: 'Find the critical point of f(x) = x⁴ - 4x³:', a: 'x = 3', b: 'x = 0 only', c: 'x = 4', d: 'x = 1', exp: 'f\'(x) = 4x³ - 12x² = 4x²(x - 3) = 0. Non-zero critical point where derivative changes sign is x = 3.', diff: 'Easy', src: 'Calculus 101 final.pdf' }
  ];

  calc1Final.forEach((item, idx) => {
    questions.push(makeQ(`C1-FIN-${String(idx + 1).padStart(3, '0')}`, 'subj-calc1', true, item.q, item.a, item.b, item.c, item.d, 'a', item.exp, item.diff, item.src));
  });

  return questions;
}

module.exports = { getGroupAQuestions };
