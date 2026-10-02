const { createQuestion } = require('./bank_factory');

function getGroupAQuestions() {
  const qs = [];

  // 1. CALCULUS 1 (subj-calc1)
  const c1Mid = [
    { q: 'Evaluate the algebraic limit: lim_{x → 2} (x² - 4) / (x - 2) =', c: '4', w1: '2', w2: '0', w3: 'Does not exist', exp: 'Factoring (x-2)(x+2)/(x-2) = x+2. As x → 2, limit = 4.', d: 'Easy' },
    { q: 'Evaluate the trigonometric limit: lim_{x → 0} [sin(7x) / (3x)] =', c: '7/3', w1: '3/7', w2: '1', w3: '0', exp: 'Standard rule: lim_{x→0} sin(ax)/(bx) = a/b = 7/3.', d: 'Easy' },
    { q: 'Evaluate: lim_{x → 3⁻} |x - 3| / (x - 3) =', c: '-1', w1: '1', w2: '0', w3: 'Does not exist', exp: 'For x < 3, |x - 3| = -(x - 3), so the quotient is -1.', d: 'Easy' },
    { q: 'Evaluate: lim_{x → 4} (√x - 2) / (x - 4) =', c: '1/4', w1: '1/2', w2: '4', w3: '0', exp: 'Multiply numerator and denominator by conjugate (√x + 2): 1/(√4 + 2) = 1/4.', d: 'Medium' },
    { q: 'Evaluate: lim_{x → 0} (1 - cos x) / x² =', c: '1/2', w1: '1', w2: '0', w3: '2', exp: 'Fundamental trigonometric limit: (1 - cos x)/x² → 1/2.', d: 'Medium' },
    { q: 'If f(x) = { cx + 1 for x ≤ 2, cx² - 1 for x > 2 }, find c for f to be continuous at x = 2:', c: 'c = 1', w1: 'c = 2', w2: 'c = -1', w3: 'c = 0', exp: '2c + 1 = 4c - 1 => 2c = 2 => c = 1.', d: 'Medium' },
    { q: 'The domain of f(x) = √(16 - x²) is:', c: '[-4, 4]', w1: '(-4, 4)', w2: '(-∞, -4] ∪ [4, ∞)', w3: '[0, 4]', exp: '16 - x² ≥ 0 => x² ≤ 16 => [-4, 4].', d: 'Easy' },
    { q: 'The range of f(x) = 1 / (x² + 4) is:', c: '(0, 1/4]', w1: '[0, 1/4]', w2: '(0, ∞)', w3: '[1/4, ∞)', exp: 'Denominator minimum is 4 at x=0; maximum of f is 1/4. Range is (0, 1/4].', d: 'Medium' },
    { q: 'If f(x) = 3x - 5, what is the inverse f⁻¹(x)?', c: '(x + 5) / 3', w1: '(x - 5) / 3', w2: '3x + 5', w3: '1 / (3x - 5)', exp: 'y = 3x - 5 => x = (y+5)/3.', d: 'Easy' },
    { q: 'Find derivative of f(x) = 5x⁴ - 3x² + 7x - 11:', c: '20x³ - 6x + 7', w1: '20x³ - 6x', w2: '5x³ - 6x + 7', w3: '20x⁴ - 6x²', exp: 'Power rule term by term.', d: 'Easy' },
    { q: 'Find derivative of f(x) = x³ * sin(x):', c: '3x² sin(x) + x³ cos(x)', w1: '3x² cos(x)', w2: '3x² sin(x) - x³ cos(x)', w3: 'x³ cos(x)', exp: 'Product rule: u\'v + uv\'.', d: 'Easy' },
    { q: 'Find derivative of f(x) = (2x + 1) / (x - 3):', c: '-7 / (x - 3)²', w1: '7 / (x - 3)²', w2: '1 / (x - 3)²', w3: '-5 / (x - 3)²', exp: '[2(x-3) - (2x+1)(1)] / (x-3)² = -7 / (x-3)²', d: 'Medium' },
    { q: 'Find derivative of f(x) = sin(x³ + 2x):', c: '(3x² + 2) cos(x³ + 2x)', w1: 'cos(3x² + 2)', w2: '(3x² + 2) sin(x³ + 2x)', w3: '-cos(x³ + 2x)', exp: 'Chain rule: cos(u) * u\'.', d: 'Medium' },
    { q: 'Slope of tangent to y = x³ - 3x + 2 at x = 2 is:', c: '9', w1: '6', w2: '4', w3: '12', exp: 'y\' = 3x² - 3. At x = 2: 3(4) - 3 = 9.', d: 'Easy' },
    { q: 'Equation of tangent to y = x² at (1, 1) is:', c: 'y = 2x - 1', w1: 'y = 2x + 1', w2: 'y = x', w3: 'y = -2x + 3', exp: 'm = 2(1) = 2. Tangent: y - 1 = 2(x - 1) => y = 2x - 1.', d: 'Easy' },
    { q: 'Find dy/dx for x² + y² = 25 by implicit differentiation:', c: '-x / y', w1: 'x / y', w2: '-y / x', w3: '-2x / y', exp: '2x + 2y y\' = 0 => y\' = -x/y.', d: 'Medium' },
    { q: 'If x³ + y³ = 6xy, find dy/dx at (3, 3):', c: '-1', w1: '1', w2: '0', w3: '2', exp: '3x² + 3y² y\' = 6y + 6x y\' => 27 + 27y\' = 18 + 18y\' => y\' = -1.', d: 'Medium' },
    { q: 'Derivative of f(x) = ln(5x⁴ + 1) is:', c: '20x³ / (5x⁴ + 1)', w1: '1 / (5x⁴ + 1)', w2: '20x³ ln(5x⁴ + 1)', w3: '5x³ / (5x⁴ + 1)', exp: 'd/dx[ln u] = u\'/u.', d: 'Easy' },
    { q: 'Derivative of f(x) = e^(tan x) is:', c: 'sec²(x) * e^(tan x)', w1: 'tan(x) * e^(tan x)', w2: 'sec(x) * e^(tan x)', w3: 'e^(sec² x)', exp: 'd/dx[e^u] = e^u * u\'.', d: 'Easy' },
    { q: 'Derivative of f(x) = arctan(3x) is:', c: '3 / (1 + 9x²)', w1: '1 / (1 + 9x²)', w2: '3 / (1 + 3x²)', w3: '3 / √(1 - 9x²)', exp: 'd/dx[arctan u] = u\'/(1 + u²).', d: 'Medium' },
    { q: 'Derivative of f(x) = arcsin(x / 2) is:', c: '1 / √(4 - x²)', w1: '1 / √(1 - x²)', w2: '2 / √(4 - x²)', w3: '1 / (4 + x²)', exp: 'd/dx[arcsin(x/a)] = 1/√(a² - x²).', d: 'Medium' },
    { q: 'Evaluate: lim_{x → ∞} (3x³ - 5x + 2) / (7x³ + 2x² - 1) =', c: '3/7', w1: '0', w2: '∞', w3: '-2', exp: 'Ratio of leading coefficients.', d: 'Easy' },
    { q: 'Evaluate: lim_{x → ∞} (√[x² + 5x] - x) =', c: '5/2', w1: '5', w2: '0', w3: '∞', exp: 'Multiply by conjugate: 5x/[√(x²+5x)+x] → 5/2.', d: 'Medium' },
    { q: 'Horizontal asymptote of f(x) = (2x² + 1) / (x² - 9) is:', c: 'y = 2', w1: 'y = 0', w2: 'x = 3', w3: 'y = -1/9', exp: 'lim_{x→±∞} f(x) = 2/1 = 2.', d: 'Easy' },
    { q: 'Vertical asymptotes of f(x) = (x + 1) / (x² - 4) are:', c: 'x = 2 and x = -2', w1: 'x = -1', w2: 'y = 0', w3: 'x = 4', exp: 'Roots of denominator x = ±2.', d: 'Easy' },
    { q: 'Critical numbers of f(x) = x³ - 12x are:', c: 'x = 2 and x = -2', w1: 'x = 0 and x = 4', w2: 'x = 12', w3: 'x = √12', exp: 'f\'(x) = 3x² - 12 = 0 => x = ±2.', d: 'Easy' },
    { q: 'Interval where f(x) = x³ - 3x² - 9x + 5 is increasing:', c: '(-∞, -1) ∪ (3, ∞)', w1: '(-1, 3)', w2: '(-3, 1)', w3: '(-∞, 3)', exp: 'f\'(x) = 3(x-3)(x+1) > 0.', d: 'Medium' },
    { q: 'Inflection point of f(x) = x³ - 6x² + 9x + 1 is:', c: '(2, 3)', w1: '(1, 5)', w2: '(3, 1)', w3: '(0, 1)', exp: 'f\'\'(x) = 6x - 12 = 0 => x = 2, f(2) = 3.', d: 'Medium' },
    { q: 'Evaluate: lim_{x → 0} (sin 4x) / (tan 5x) =', c: '4/5', w1: '5/4', w2: '1', w3: '0', exp: 'Ratio of trigonometric limits: 4/5.', d: 'Easy' },
    { q: 'For f(x) = |2x - 6|, which statement is true about f\'(3)?', c: 'f\'(3) does not exist (corner point)', w1: 'f\'(3) = 0', w2: 'f\'(3) = 2', w3: 'f\'(3) = -2', exp: 'Left derivative (-2) ≠ Right derivative (+2).', d: 'Easy' },
    { q: 'Find d²y/dx² for y = sin(2x):', c: '-4 sin(2x)', w1: '4 sin(2x)', w2: '-2 cos(2x)', w3: '-4 cos(2x)', exp: 'y\' = 2 cos 2x, y\'\' = -4 sin 2x.', d: 'Easy' },
    { q: 'Derivative of f(x) = x^x for x > 0 is:', c: 'x^x (1 + ln x)', w1: 'x * x^(x - 1)', w2: 'x^x ln x', w3: '(1 + ln x)', exp: 'ln y = x ln x => y\' = x^x (1 + ln x).', d: 'Hard' }
  ];

  const c1Final = [
    { q: 'Evaluate: ∫ (6x² - 4x + 3) dx =', c: '2x³ - 2x² + 3x + C', w1: '6x³ - 4x² + 3x + C', w2: '12x - 4 + C', w3: '2x³ - 4x² + C', exp: 'Power rule term by term.', d: 'Easy' },
    { q: 'Evaluate: ∫₁³ (3x² - 2x) dx =', c: '18', w1: '26', w2: '20', w3: '16', exp: '[x³ - x²]₁³ = (27 - 9) - 0 = 18.', d: 'Easy' },
    { q: 'Evaluate: ∫ (sec² x + e^(3x)) dx =', c: 'tan x + (1/3)e^(3x) + C', w1: 'sec x tan x + 3e^(3x) + C', w2: 'tan x + 3e^(3x) + C', w3: 'sec² x + (1/3)e^(3x) + C', exp: 'Standard antiderivatives.', d: 'Easy' },
    { q: 'Evaluate: ∫₀^(π/2) cos(x) dx =', c: '1', w1: '0', w2: '-1', w3: 'π/2', exp: '[sin x]₀^(π/2) = 1 - 0 = 1.', d: 'Easy' },
    { q: 'If F(x) = ∫₁^x √(t³ + 1) dt, find F\'(x) using FTC Part 1:', c: '√(x³ + 1)', w1: '3x² / (2√(x³ + 1))', w2: '√(x³ + 1) - √2', w3: 'x³ + 1', exp: 'FTC 1: d/dx ∫ₐ^x f(t) dt = f(x).', d: 'Medium' },
    { q: 'If G(x) = ∫₀^(x²) sin(t) dt, find G\'(x) using Leibniz Rule:', c: '2x sin(x²)', w1: 'sin(x²)', w2: 'cos(x²)', w3: '2x cos(x²)', exp: 'sin(x²) * d/dx(x²) = 2x sin(x²).', d: 'Medium' },
    { q: 'Given ∫₁⁵ f(x) dx = 10 and ∫₁³ f(x) dx = 4, evaluate ∫₃⁵ f(x) dx:', c: '6', w1: '14', w2: '-6', w3: '40', exp: '10 - 4 = 6.', d: 'Easy' },
    { q: 'Given ∫ₐᵇ f(x) sin²x dx = 5 and ∫ₐᵇ f(x) cos²x dx = 7, then ∫ₐᵇ f(x) dx =', c: '12', w1: '2', w2: '35', w3: '-2', exp: '5 + 7 = 12.', d: 'Easy' },
    { q: 'Find (d²/dx²)(x³ + x² + 2):', c: '6x + 2', w1: '3x² + 2x', w2: '6x', w3: '6', exp: 'd/dx(3x² + 2x) = 6x + 2.', d: 'Easy' },
    { q: 'Area bounded by y = x², y = 0, x = 0, and x = 3 is:', c: '9', w1: '27', w2: '3', w3: '18', exp: '∫₀³ x² dx = [x³/3]₀³ = 9.', d: 'Easy' },
    { q: 'If f(x) = 2x - 1, then f⁻¹(x) =', c: '(x + 1) / 2', w1: '(x - 1) / 2', w2: '2x + 1', w3: '1 / (2x - 1)', exp: 'x = (y+1)/2.', d: 'Easy' },
    { q: 'Evaluate: lim_{x → 1} sin(x² - 1) / (x - 1) =', c: '2', w1: '1', w2: '0', w3: 'Does not exist', exp: 'Multiply by (x+1): limit is 2.', d: 'Medium' },
    { q: 'Slope of tangent to f(x) = sin(x) + 2x at x = π is:', c: '1', w1: '2', w2: '3', w3: '-1', exp: 'cos(π) + 2 = -1 + 2 = 1.', d: 'Easy' },
    { q: 'If f(3) = -2, f\'(3) = 4, and g(x) = (2x + 1) / f(x), then g\'(3) =', c: '-8', w1: '8', w2: '4', w3: '-4', exp: '[2(-2) - 7(4)]/4 = -32/4 = -8.', d: 'Medium' },
    { q: 'Given x^(2/3) + y^(2/3) = 2, find dy/dx at (1, 1):', c: '-1', w1: '1', w2: '0', w3: '2', exp: 'Implicit differentiation gives -1.', d: 'Medium' },
    { q: 'At x = 5, the function f(x) = (x - 5)^(1/3) has:', c: 'A vertical tangent line', w1: 'A horizontal tangent line', w2: 'A local maximum', w3: 'A removable discontinuity', exp: 'f\'(x) → ∞ as x → 5.', d: 'Medium' },
    { q: 'The function f(x) = x(x - 4)³ is increasing on:', c: '(1, ∞)', w1: '(-∞, 1)', w2: '(0, 4)', w3: '(4, ∞)', exp: 'f\'(x) = 4(x-4)²(x-1) > 0 for x > 1.', d: 'Medium' },
    { q: 'Evaluate: ∫ (1 + sin²θ csc θ) dθ =', c: 'θ - cos θ + C', w1: 'θ + cos θ + C', w2: 'sin θ + C', w3: 'θ + sin θ + C', exp: 'Integrates to θ - cos θ + C.', d: 'Medium' },
    { q: 'Evaluate: lim_{x → 0} (e^x - 1) / sin(2x) =', c: '1/2', w1: '1', w2: '2', w3: '0', exp: 'L\'Hopital: 1/(2 cos 0) = 1/2.', d: 'Easy' },
    { q: 'Evaluate: lim_{x → 0} (ln(1 + 4x)) / x =', c: '4', w1: '1', w2: '0', w3: '1/4', exp: 'L\'Hopital gives 4.', d: 'Easy' },
    { q: 'Evaluate: lim_{x → ∞} x * sin(1 / x) =', c: '1', w1: '0', w2: '∞', w3: 'Does not exist', exp: 'Substitute t = 1/x => limit is 1.', d: 'Medium' },
    { q: 'If f(x) = csc⁻¹(x), then f(3) is:', c: 'sin⁻¹(1/3)', w1: 'cos⁻¹(1/3)', w2: 'tan⁻¹(3)', w3: '3', exp: 'Definition of inverse csc.', d: 'Easy' },
    { q: 'If f(x) = x² + 4x + 7 on (-∞, k] is one-to-one, max k is:', c: '-2', w1: '2', w2: '0', w3: '-4', exp: 'Vertex is at -b/2a = -2.', d: 'Medium' },
    { q: 'Evaluate: lim_{x → 3} [ 1 / (x - 3) - 27 / (x³ - 27) ] =', c: '1', w1: '0', w2: '1/3', w3: 'Does not exist', exp: 'Common denominator yields 1.', d: 'Hard' },
    { q: 'If y = 0 and x = 2 are asymptotes of [ax³ - x(3x+1)] / [x³ - b], then a + b =', c: '8', w1: '6', w2: '2', w3: '0', exp: 'a = 0 and b = 8 => a + b = 8.', d: 'Medium' },
    { q: 'Parity of f(x) = x³ ln|x| is:', c: 'Odd function', w1: 'Even function', w2: 'Neither', w3: 'Constant', exp: 'f(-x) = -f(x).', d: 'Medium' },
    { q: 'Evaluate: ∫ (1 / x) dx for x > 0 =', c: 'ln(x) + C', w1: '-1/x² + C', w2: 'e^x + C', w3: 'x + C', exp: 'Standard logarithmic antiderivative.', d: 'Easy' },
    { q: 'Evaluate: ∫₀¹ (x³ + 2x) dx =', c: '5/4', w1: '3/4', w2: '2', w3: '1', exp: '1/4 + 1 = 5/4.', d: 'Easy' },
    { q: 'Evaluate: ∫₁² (4 / x³) dx =', c: '3/2', w1: '1', w2: '2', w3: '7/8', exp: '[-2/x²]₁² = 3/2.', d: 'Easy' },
    { q: 'Evaluate: ∫ (3 cos x - 2 sin x) dx =', c: '3 sin x + 2 cos x + C', w1: '3 sin x - 2 cos x + C', w2: '-3 sin x + 2 cos x + C', w3: '3 cos x + 2 sin x + C', exp: 'Trig antiderivative.', d: 'Easy' },
    { q: 'Evaluate: ∫ (5 e^x + 4 / x) dx =', c: '5 e^x + 4 ln|x| + C', w1: '5 e^x - 4/x² + C', w2: '(5/2)e^(2x) + 4 ln|x| + C', w3: '5 e^x + 4x + C', exp: 'Sum of standard integrals.', d: 'Easy' },
    { q: 'If f\'\'(x) = 6x, f\'(0) = 2, f(0) = 5, find f(x):', c: 'x³ + 2x + 5', w1: '3x² + 2x + 5', w2: 'x³ + 5', w3: '6x³ + 2x + 5', exp: 'Integrating twice gives x³ + 2x + 5.', d: 'Medium' },
    { q: 'Derivative of y = ∫₂^(x³) cos(t) dt is:', c: '3x² cos(x³)', w1: 'cos(x³)', w2: '-sin(x³)', w3: '3x² sin(x³)', exp: 'Leibniz rule yields 3x² cos(x³).', d: 'Medium' },
    { q: 'Evaluate: lim_{x → 0} (tan 3x) / x =', c: '3', w1: '1/3', w2: '1', w3: '0', exp: 'Trig limit is 3.', d: 'Easy' },
    { q: 'How many horizontal tangents does f(x) = x³ - 6x² + 12x - 8 have?', c: 'One (at x = 2)', w1: 'Two', w2: 'Three', w3: 'None', exp: 'f\'(x) = 3(x-2)² = 0 has only root 2.', d: 'Easy' },
    { q: 'Derivative of f(x) = log₁₀(x) is:', c: '1 / (x ln 10)', w1: '1 / x', w2: 'ln 10 / x', w3: '10 / x', exp: 'Base-10 log formula.', d: 'Easy' },
    { q: 'Derivative of f(x) = 2^x is:', c: '2^x * ln 2', w1: 'x * 2^(x - 1)', w2: '2^x / ln 2', w3: '2^x', exp: 'General exponential derivative.', d: 'Easy' },
    { q: 'Evaluate: lim_{x → 2} (x³ - 8) / (x - 2) =', c: '12', w1: '8', w2: '4', w3: '6', exp: 'Difference of cubes at x = 2 is 12.', d: 'Easy' },
    { q: 'Derivative of y = cot(x) is:', c: '-csc²(x)', w1: 'csc²(x)', w2: '-sec²(x)', w3: '-cot x csc x', exp: 'Standard trig formula.', d: 'Easy' },
    { q: 'Derivative of y = sec(x) is:', c: 'sec(x) tan(x)', w1: 'sec²(x)', w2: 'tan²(x)', w3: '-sec x tan x', exp: 'Standard trig formula.', d: 'Easy' },
    { q: 'Evaluate: ∫₀^(π) sin(x) dx =', c: '2', w1: '0', w2: '1', w3: '-2', exp: '[-cos x]₀^π = 1 - (-1) = 2.', d: 'Easy' },
    { q: 'If f is an odd function, what is ∫₋₃³ f(x) dx?', c: '0', w1: '2 ∫₀³ f(x) dx', w2: '6', w3: 'Undefined', exp: 'Odd integral on symmetric interval is 0.', d: 'Easy' },
    { q: 'If f is an even function and ∫₀⁴ f(x) dx = 7, what is ∫₋₄⁴ f(x) dx?', c: '14', w1: '0', w2: '7', w3: '-14', exp: 'Even integral doubles: 2 * 7 = 14.', d: 'Easy' },
    { q: 'Derivative of y = ln(sec x + tan x) is:', c: 'sec x', w1: 'tan x', w2: 'sec² x', w3: 'sec x tan x', exp: 'Simplifies to sec x.', d: 'Medium' },
    { q: 'Evaluate: lim_{x → 0} (sin 2x) / (sin 3x) =', c: '2/3', w1: '3/2', w2: '1', w3: '0', exp: 'Ratio of angles is 2/3.', d: 'Easy' },
    { q: 'Evaluate: ∫₁⁴ (1 / √x) dx =', c: '2', w1: '1', w2: '4', w3: '3', exp: '[2√x]₁⁴ = 4 - 2 = 2.', d: 'Easy' },
    { q: 'Derivative of f(x) = (x² + 1)¹⁰ is:', c: '20x (x² + 1)⁹', w1: '10 (x² + 1)⁹', w2: '20x (x² + 1)¹⁰', w3: '10x (x² + 1)⁹', exp: 'Chain rule yields 20x(x²+1)⁹.', d: 'Easy' },
    { q: 'Evaluate: lim_{x → 1} (x⁴ - 1) / (x - 1) =', c: '4', w1: '1', w2: '0', w3: '3', exp: 'Derivative of x⁴ at 1 is 4.', d: 'Easy' },
    { q: 'Derivative of y = cos²(x) - sin²(x) is:', c: '-2 sin(2x)', w1: '2 sin(2x)', w2: '-2 cos(2x)', w3: '0', exp: 'cos² x - sin² x = cos(2x) => -2 sin(2x).', d: 'Medium' },
    { q: 'Evaluate: ∫₀² (2x - 3) dx =', c: '-2', w1: '2', w2: '0', w3: '-4', exp: '[x² - 3x]₀² = 4 - 6 = -2.', d: 'Easy' },
    { q: 'Evaluate: lim_{x → 0⁺} x * ln(x) =', c: '0', w1: '-∞', w2: '1', w3: '-1', exp: 'Standard indeterminate form limit = 0.', d: 'Medium' },
    { q: 'Critical point of f(x) = x⁴ - 4x³ where sign changes is:', c: 'x = 3', w1: 'x = 0', w2: 'x = 4', w3: 'x = 1', exp: '4x²(x-3) = 0 => x = 3.', d: 'Easy' }
  ];

  c1Mid.forEach((it, idx) => qs.push(createQuestion(`C1-MID-${String(idx + 1).padStart(3, '0')}`, 'subj-calc1', false, it.q, it.c, it.w1, it.w2, it.w3, it.exp, it.d, 'Mid calc1.pdf', idx)));
  c1Final.forEach((it, idx) => qs.push(createQuestion(`C1-FIN-${String(idx + 1).padStart(3, '0')}`, 'subj-calc1', true, it.q, it.c, it.w1, it.w2, it.w3, it.exp, it.d, 'Final calcu 2023-2024.pdf', idx)));

  return qs;
}

module.exports = { getGroupAQuestions };
