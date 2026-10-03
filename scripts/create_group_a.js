const fs = require('fs');
const path = require('path');

console.log('Generating complete Group A (Math & Physical Sciences)...');

// Helper to construct questions
function q(question, a, b, c, d, exp, diff = 'Medium', corr = 'a') {
  return { q: question, a, b, c, d, exp, diff, corr };
}

// =========================================================================
// 1. CALCULUS 1 (subj-calc1) - 32 Mid, 52 Final
// =========================================================================
const c1Mid = [
  q('Evaluate the limit: lim_{x → 2} (x² - 4) / (x - 2) =', '4', '2', '0', 'Does not exist', 'Factor: (x-2)(x+2)/(x-2) = x+2 => 2+2=4.', 'Easy'),
  q('Evaluate the trigonometric limit: lim_{x → 0} [sin(7x) / (3x)] =', '7/3', '3/7', '1', '0', 'Standard rule lim_{x→0} sin(ax)/bx = a/b = 7/3.', 'Easy'),
  q('Evaluate the limit: lim_{x → 3⁻} |x - 3| / (x - 3) =', '-1', '1', '0', 'Does not exist', 'For x < 3, |x-3| = -(x-3). The quotient is -1.', 'Easy'),
  q('Evaluate: lim_{x → 4} (√x - 2) / (x - 4) =', '1/4', '1/2', '4', '0', 'Multiply by conjugate (√x+2): 1/(√4+2) = 1/4.', 'Medium'),
  q('Evaluate: lim_{x → 0} (1 - cos x) / x² =', '1/2', '1', '0', '2', 'Fundamental trig limit = 1/2.', 'Medium'),
  q('Find value of c for which f(x) = { cx + 1 for x ≤ 2, cx² - 1 for x > 2 } is continuous at x = 2:', 'c = 1', 'c = 2', 'c = -1', 'c = 0', '2c + 1 = 4c - 1 => 2c = 2 => c = 1.', 'Medium'),
  q('The domain of f(x) = √(16 - x²) is:', '[-4, 4]', '(-4, 4)', '(-∞, -4] ∪ [4, ∞)', '[0, 4]', '16 - x² ≥ 0 => x² ≤ 16 => [-4, 4].', 'Easy'),
  q('The range of f(x) = 1 / (x² + 4) is:', '(0, 1/4]', '[0, 1/4]', '(0, ∞)', '[1/4, ∞)', 'Denominator is at least 4 at x=0, max value 1/4.', 'Medium'),
  q('If f(x) = 3x - 5, what is f⁻¹(x)?', '(x + 5) / 3', '(x - 5) / 3', '3x + 5', '1 / (3x - 5)', 'y = 3x - 5 => x = (y+5)/3.', 'Easy'),
  q('Find derivative of f(x) = 5x⁴ - 3x² + 7x - 11:', '20x³ - 6x + 7', '20x³ - 6x', '5x³ - 6x + 7', '20x⁴ - 6x²', 'Term-by-term power rule.', 'Easy'),
  q('Find derivative of f(x) = x³ * sin(x):', '3x² sin(x) + x³ cos(x)', '3x² cos(x)', '3x² sin(x) - x³ cos(x)', 'x³ cos(x)', 'Product rule: u\'v + uv\'.', 'Easy'),
  q('Find derivative of f(x) = (2x + 1) / (x - 3):', '-7 / (x - 3)²', '7 / (x - 3)²', '1 / (x - 3)²', '-5 / (x - 3)²', '[2(x-3) - (2x+1)(1)]/(x-3)² = -7/(x-3)²', 'Medium'),
  q('Find derivative of f(x) = sin(x³ + 2x):', '(3x² + 2) cos(x³ + 2x)', 'cos(3x² + 2)', '(3x² + 2) sin(x³ + 2x)', '-cos(x³ + 2x)', 'Chain rule: cos(u) * u\'.', 'Medium'),
  q('Slope of tangent to y = x³ - 3x + 2 at x = 2 is:', '9', '6', '4', '12', 'y\' = 3x² - 3 => 3(4) - 3 = 9.', 'Easy'),
  q('Equation of tangent to y = x² at (1, 1) is:', 'y = 2x - 1', 'y = 2x + 1', 'y = x', 'y = -2x + 3', 'm = 2(1) = 2. Line: y - 1 = 2(x - 1) => y = 2x - 1.', 'Easy'),
  q('Find dy/dx for x² + y² = 25 by implicit differentiation:', '-x / y', 'x / y', '-y / x', '-2x / y', '2x + 2y y\' = 0 => y\' = -x/y.', 'Medium'),
  q('If x³ + y³ = 6xy, find dy/dx at (3, 3):', '-1', '1', '0', '2', '3x² + 3y² y\' = 6y + 6x y\' => y\' = -1.', 'Medium'),
  q('Derivative of f(x) = ln(5x⁴ + 1) is:', '20x³ / (5x⁴ + 1)', '1 / (5x⁴ + 1)', '20x³ ln(5x⁴ + 1)', '5x³ / (5x⁴ + 1)', 'u\'/u rule.', 'Easy'),
  q('Derivative of f(x) = e^(tan x) is:', 'sec²(x) * e^(tan x)', 'tan(x) * e^(tan x)', 'sec(x) * e^(tan x)', 'e^(sec² x)', 'e^u * u\' where u = tan x.', 'Easy'),
  q('Derivative of f(x) = arctan(3x) is:', '3 / (1 + 9x²)', '1 / (1 + 9x²)', '3 / (1 + 3x²)', '3 / √(1 - 9x²)', 'u\'/(1 + u²) = 3/(1 + 9x²).', 'Medium'),
  q('Derivative of f(x) = arcsin(x / 2) is:', '1 / √(4 - x²)', '1 / √(1 - x²)', '2 / √(4 - x²)', '1 / (4 + x²)', 'Formula: 1/√(a² - x²).', 'Medium'),
  q('Evaluate: lim_{x → ∞} (3x³ - 5x + 2) / (7x³ + 2x² - 1) =', '3/7', '0', '∞', '-2', 'Ratio of leading coefficients.', 'Easy'),
  q('Evaluate: lim_{x → ∞} (√[x² + 5x] - x) =', '5/2', '5', '0', '∞', 'Conjugate multiplication yields 5/2.', 'Medium'),
  q('Horizontal asymptote of f(x) = (2x² + 1) / (x² - 9) is:', 'y = 2', 'y = 0', 'x = 3', 'y = -1/9', 'lim_{x→±∞} f(x) = 2.', 'Easy'),
  q('Vertical asymptotes of f(x) = (x + 1) / (x² - 4) are:', 'x = 2 and x = -2', 'x = -1', 'y = 0', 'x = 4', 'Denominator = 0 at x = ±2.', 'Easy'),
  q('Critical numbers of f(x) = x³ - 12x are:', 'x = 2 and x = -2', 'x = 0 and x = 4', 'x = 12', 'x = √12', 'f\'(x) = 3x² - 12 = 0 => x = ±2.', 'Easy'),
  q('Interval where f(x) = x³ - 3x² - 9x + 5 is increasing:', '(-∞, -1) ∪ (3, ∞)', '(-1, 3)', '(-3, 1)', '(-∞, 3)', 'f\'(x) = 3(x-3)(x+1) > 0.', 'Medium'),
  q('Inflection point of f(x) = x³ - 6x² + 9x + 1 is:', '(2, 3)', '(1, 5)', '(3, 1)', '(0, 1)', 'f\'\'(x) = 6x - 12 = 0 => x = 2, f(2) = 3.', 'Medium'),
  q('Evaluate: lim_{x → 0} (sin 4x) / (tan 5x) =', '4/5', '5/4', '1', '0', 'Ratio (4/5).', 'Easy'),
  q('For f(x) = |2x - 6|, which statement is true regarding f\'(3)?', 'f\'(3) does not exist (corner point)', 'f\'(3) = 0', 'f\'(3) = 2', 'f\'(3) = -2', 'Different left and right derivatives.', 'Easy'),
  q('Find d²y/dx² for y = sin(2x):', '-4 sin(2x)', '4 sin(2x)', '-2 cos(2x)', '-4 cos(2x)', 'y\' = 2 cos 2x, y\'\' = -4 sin 2x.', 'Easy'),
  q('Using logarithmic differentiation, what is the derivative of f(x) = x^x?', 'x^x (1 + ln x)', 'x * x^(x - 1)', 'x^x ln x', '(1 + ln x)', 'ln y = x ln x => y\' = x^x(1 + ln x).', 'Hard')
];

const c1Fin = [
  q('Evaluate the indefinite integral: ∫ (6x² - 4x + 3) dx =', '2x³ - 2x² + 3x + C', '6x³ - 4x² + 3x + C', '12x - 4 + C', '2x³ - 4x² + C', 'Power rule: 6(x³/3) - 4(x²/2) + 3x + C.', 'Easy'),
  q('Evaluate the definite integral: ∫₁³ (3x² - 2x) dx =', '18', '26', '20', '16', '[x³ - x²]₁³ = (27 - 9) - 0 = 18.', 'Easy'),
  q('Evaluate: ∫ (sec² x + e^(3x)) dx =', 'tan x + (1/3)e^(3x) + C', 'sec x tan x + 3e^(3x) + C', 'tan x + 3e^(3x) + C', 'sec² x + (1/3)e^(3x) + C', 'Standard antiderivatives.', 'Easy'),
  q('Evaluate: ∫₀^(π/2) cos(x) dx =', '1', '0', '-1', 'π/2', '[sin x]₀^(π/2) = 1 - 0 = 1.', 'Easy'),
  q('If F(x) = ∫₁^x √(t³ + 1) dt, find F\'(x) using FTC Part 1:', '√(x³ + 1)', '3x² / (2√(x³ + 1))', '√(x³ + 1) - √2', 'x³ + 1', 'By FTC 1, d/dx ∫ₐ^x f(t) dt = f(x).', 'Medium'),
  q('If G(x) = ∫₀^(x²) sin(t) dt, find G\'(x) using Leibniz Rule:', '2x sin(x²)', 'sin(x²)', 'cos(x²)', '2x cos(x²)', 'sin(x²) * d/dx(x²) = 2x sin(x²).', 'Medium'),
  q('Given ∫₁⁵ f(x) dx = 10 and ∫₁³ f(x) dx = 4, evaluate ∫₃⁵ f(x) dx:', '6', '14', '-6', '40', '10 - 4 = 6.', 'Easy'),
  q('Given ∫ₐᵇ f(x) sin²x dx = 5 and ∫ₐᵇ f(x) cos²x dx = 7, then ∫ₐᵇ f(x) dx =', '12', '2', '35', '-2', '5 + 7 = 12.', 'Easy'),
  q('Find (d²/dx²)(x³ + x² + 2):', '6x + 2', '3x² + 2x', '6x', '6', 'd/dx(3x² + 2x) = 6x + 2.', 'Easy'),
  q('The area bounded by y = x², y = 0, x = 0, and x = 3 is:', '9', '27', '3', '18', '∫₀³ x² dx = [x³/3]₀³ = 9.', 'Easy'),
  q('If f(x) = 2x - 1, then f⁻¹(x) =', '(x + 1) / 2', '(x - 1) / 2', '2x + 1', '1 / (2x - 1)', 'x = (y+1)/2.', 'Easy'),
  q('Evaluate: lim_{x → 1} sin(x² - 1) / (x - 1) =', '2', '1', '0', 'Does not exist', 'Multiply by (x+1): limit is 2.', 'Medium'),
  q('The slope of tangent to f(x) = sin(x) + 2x when x = π is:', '1', '2', '3', '-1', 'cos(π) + 2 = -1 + 2 = 1.', 'Easy'),
  q('If f(3) = -2, f\'(3) = 4, and g(x) = (2x + 1) / f(x), then g\'(3) =', '-8', '8', '4', '-4', '[2(-2) - 7(4)]/4 = -32/4 = -8.', 'Medium'),
  q('Given x^(2/3) + y^(2/3) = 2, find dy/dx at (1, 1):', '-1', '1', '0', '2', 'Implicit diff yields -1.', 'Medium'),
  q('At x = 5, the function f(x) = (x - 5)^(1/3) has:', 'A vertical tangent line', 'A horizontal tangent line', 'A local maximum', 'A removable discontinuity', 'f\'(x) → ∞ as x → 5.', 'Medium'),
  q('The function f(x) = x(x - 4)³ is increasing on:', '(1, ∞)', '(-∞, 1)', '(0, 4)', '(4, ∞)', 'f\'(x) = 4(x-4)²(x-1) > 0 for x > 1.', 'Medium'),
  q('Evaluate: ∫ (1 + sin²θ csc θ) dθ =', 'θ - cos θ + C', 'θ + cos θ + C', 'sin θ + C', 'θ + sin θ + C', '1 + sin θ => θ - cos θ + C.', 'Medium'),
  q('Evaluate: lim_{x → 0} (e^x - 1) / sin(2x) =', '1/2', '1', '2', '0', 'L\'Hopital: 1 / (2 cos 0) = 1/2.', 'Easy'),
  q('Evaluate: lim_{x → 0} (ln(1 + 4x)) / x =', '4', '1', '0', '1/4', 'L\'Hopital: 4/(1+0) = 4.', 'Easy'),
  q('Evaluate: lim_{x → ∞} x * sin(1 / x) =', '1', '0', '∞', 'Does not exist', 'Substitute t = 1/x => lim sin(t)/t = 1.', 'Medium'),
  q('If f(x) = csc⁻¹(x), then f(3) is:', 'sin⁻¹(1/3)', 'cos⁻¹(1/3)', 'tan⁻¹(3)', '3', 'By definition csc⁻¹(x) = sin⁻¹(1/x).', 'Easy'),
  q('If f(x) = x² + 4x + 7 on (-∞, k] is one-to-one, max k is:', '-2', '2', '0', '-4', 'Vertex is at -b/2a = -2.', 'Medium'),
  q('Evaluate: lim_{x → 3} [ 1 / (x - 3) - 27 / (x³ - 27) ] =', '1', '0', '1/3', 'Does not exist', 'Factoring gives 1.', 'Hard'),
  q('If y = 0 and x = 2 are asymptotes of [ax³ - x(3x+1)] / [x³ - b], then a + b =', '8', '6', '2', '0', 'a = 0 and b = 8 => 8.', 'Medium'),
  q('Parity of f(x) = x³ ln|x| is:', 'Odd function', 'Even function', 'Neither', 'Constant', '(-x)³ ln|-x| = -x³ ln|x| = -f(x).', 'Medium'),
  q('Evaluate: ∫ (1 / x) dx for x > 0 =', 'ln(x) + C', '-1/x² + C', 'e^x + C', 'x + C', 'Standard rule.', 'Easy'),
  q('Evaluate: ∫₀¹ (x³ + 2x) dx =', '5/4', '3/4', '2', '1', '1/4 + 1 = 5/4.', 'Easy'),
  q('Evaluate: ∫₁² (4 / x³) dx =', '3/2', '1', '2', '7/8', '[-2/x²]₁² = -1/2 - (-2) = 3/2.', 'Easy'),
  q('Evaluate: ∫ (3 cos x - 2 sin x) dx =', '3 sin x + 2 cos x + C', '3 sin x - 2 cos x + C', '-3 sin x + 2 cos x + C', '3 cos x + 2 sin x + C', 'Linear combination.', 'Easy'),
  q('Evaluate: ∫ (5 e^x + 4 / x) dx =', '5 e^x + 4 ln|x| + C', '5 e^x - 4/x² + C', '(5/2)e^(2x) + 4 ln|x| + C', '5 e^x + 4x + C', 'Antiderivative terms.', 'Easy'),
  q('If f\'\'(x) = 6x, f\'(0) = 2, f(0) = 5, find f(x):', 'x³ + 2x + 5', '3x² + 2x + 5', 'x³ + 5', '6x³ + 2x + 5', 'f\' = 3x² + 2 => f = x³ + 2x + 5.', 'Medium'),
  q('Derivative of y = ∫₂^(x³) cos(t) dt is:', '3x² cos(x³)', 'cos(x³)', '-sin(x³)', '3x² sin(x³)', 'Chain rule with FTC.', 'Medium'),
  q('Evaluate: lim_{x → 0} (tan 3x) / x =', '3', '1/3', '1', '0', 'Limit is 3.', 'Easy'),
  q('How many horizontal tangents does f(x) = x³ - 6x² + 12x - 8 have?', 'One (at x = 2)', 'Two', 'Three', 'None', 'f\' = 3(x-2)² = 0 has single root x = 2.', 'Easy'),
  q('Derivative of f(x) = log₁₀(x) is:', '1 / (x ln 10)', '1 / x', 'ln 10 / x', '10 / x', 'Base-10 rule.', 'Easy'),
  q('Derivative of f(x) = 2^x is:', '2^x * ln 2', 'x * 2^(x - 1)', '2^x / ln 2', '2^x', 'a^x ln a rule.', 'Easy'),
  q('Evaluate: lim_{x → 2} (x³ - 8) / (x - 2) =', '12', '8', '4', '6', 'x² + 2x + 4 at x = 2 is 12.', 'Easy'),
  q('Derivative of y = cot(x) is:', '-csc²(x)', 'csc²(x)', '-sec²(x)', '-cot x csc x', 'Standard trig rule.', 'Easy'),
  q('Derivative of y = sec(x) is:', 'sec(x) tan(x)', 'sec²(x)', 'tan²(x)', '-sec x tan x', 'Standard trig rule.', 'Easy'),
  q('Evaluate: ∫₀^(π) sin(x) dx =', '2', '0', '1', '-2', '[-cos x]₀^π = 1 - (-1) = 2.', 'Easy'),
  q('If f is an odd function, what is ∫₋₃³ f(x) dx?', '0', '2 ∫₀³ f(x) dx', '6', 'Undefined', 'Odd function on symmetric interval = 0.', 'Easy'),
  q('If f is an even function and ∫₀⁴ f(x) dx = 7, what is ∫₋₄⁴ f(x) dx?', '14', '0', '7', '-14', '2 * 7 = 14.', 'Easy'),
  q('Derivative of y = ln(sec x + tan x) is:', 'sec x', 'tan x', 'sec² x', 'sec x tan x', 'Simplifies to sec x.', 'Medium'),
  q('Evaluate: lim_{x → 0} (sin 2x) / (sin 3x) =', '2/3', '3/2', '1', '0', 'Ratio of angles: 2/3.', 'Easy'),
  q('Evaluate: ∫₁⁴ (1 / √x) dx =', '2', '1', '4', '3', '[2√x]₁⁴ = 4 - 2 = 2.', 'Easy'),
  q('Derivative of f(x) = (x² + 1)¹⁰ is:', '20x (x² + 1)⁹', '10 (x² + 1)⁹', '20x (x² + 1)¹⁰', '10x (x² + 1)⁹', '10(x²+1)⁹ * 2x = 20x(x²+1)⁹.', 'Easy'),
  q('Evaluate: lim_{x → 1} (x⁴ - 1) / (x - 1) =', '4', '1', '0', '3', 'Derivative of x⁴ at 1 is 4.', 'Easy'),
  q('Derivative of y = cos²(x) - sin²(x) is:', '-2 sin(2x)', '2 sin(2x)', '-2 cos(2x)', '0', 'd/dx[cos 2x] = -2 sin 2x.', 'Medium'),
  q('Evaluate: ∫₀² (2x - 3) dx =', '-2', '2', '0', '-4', '[x² - 3x]₀² = 4 - 6 = -2.', 'Easy'),
  q('Evaluate: lim_{x → 0⁺} x * ln(x) =', '0', '-∞', '1', '-1', 'Standard limit = 0.', 'Medium'),
  q('Non-zero critical point of f(x) = x⁴ - 4x³ is:', 'x = 3', 'x = 0', 'x = 4', 'x = 1', '4x²(x-3) = 0 => x = 3.', 'Easy')
];

console.log('Calc 1 ready: 32 Mid, 52 Final.');
