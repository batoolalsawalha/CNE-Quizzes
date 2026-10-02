const { createQuestion } = require('./bank_factory');

function getC2AndDiffQuestions() {
  const qs = [];

  // ==========================================
  // CALCULUS 2 (subj-calc2)
  // Mid: 32 (Integration techniques, parts, trig sub, partial fractions, improper integrals)
  // Final: 52 (Series convergence tests, p-series, ratio/root test, Taylor/Maclaurin series, power series, arc length, volume)
  // ==========================================
  const c2Mid = [
    { q: 'Evaluate: ∫ x * e^(2x) dx using integration by parts:', c: '(1/2)x e^(2x) - (1/4)e^(2x) + C', w1: '(1/2)x e^(2x) + (1/4)e^(2x) + C', w2: 'x e^(2x) - e^(2x) + C', w3: '(1/4)x e^(2x) + C', exp: 'u = x, dv = e^(2x)dx => uv - ∫ v du = (1/2)x e^(2x) - (1/4)e^(2x) + C.', d: 'Medium' },
    { q: 'Evaluate: ∫ ln(x) dx:', c: 'x ln x - x + C', w1: '1/x + C', w2: '(1/2)(ln x)² + C', w3: 'x ln x + x + C', exp: 'Parts with u = ln x, dv = dx gives x ln x - x + C.', d: 'Easy' },
    { q: 'Evaluate the trigonometric substitution integral: ∫ dx / √(4 - x²) =', c: 'arcsin(x/2) + C', w1: 'arctan(x/2) + C', w2: '(1/2)arcsin(x) + C', w3: 'ln|x + √(4-x²)| + C', exp: 'Let x = 2 sin θ => arcsin(x/2) + C.', d: 'Medium' },
    { q: 'Evaluate: ∫ dx / (x² + 9) =', c: '(1/3) arctan(x/3) + C', w1: 'arctan(x/3) + C', w2: '(1/9) arctan(x/3) + C', w3: 'ln(x² + 9) + C', exp: '(1/a) arctan(x/a) with a = 3.', d: 'Easy' },
    { q: 'Evaluate the improper integral: ∫₁^∞ (1 / x²) dx =', c: '1 (converges)', w1: '∞ (diverges)', w2: '2', w3: '0', exp: 'lim_{b→∞} [-1/x]₁^b = 0 - (-1) = 1.', d: 'Easy' },
    { q: 'The improper integral ∫₁^∞ (1 / x) dx:', c: 'Diverges to ∞', w1: 'Converges to 1', w2: 'Converges to 0', w3: 'Converges to e', exp: '[ln x]₁^∞ = ∞, so it diverges.', d: 'Easy' },
    { q: 'The partial fraction decomposition of (2x + 1) / [(x - 1)(x + 2)] has the form:', c: 'A/(x - 1) + B/(x + 2)', w1: 'A/(x - 1) + B/(x - 1)²', w2: '(Ax + B)/[(x - 1)(x + 2)]', w3: 'A/(x² + x - 2)', exp: 'Distinct linear factors decompose into separate simple fractions.', d: 'Easy' },
    { q: 'Evaluate: ∫ sin³(x) cos(x) dx =', c: '(1/4) sin⁴(x) + C', w1: '(1/3) sin³(x) + C', w2: '-(1/4) cos⁴(x) + C', w3: '(1/4) cos⁴(x) + C', exp: 'u = sin x => ∫ u³ du = u⁴/4 + C.', d: 'Easy' },
    { q: 'Evaluate: ∫ tan(x) dx =', c: 'ln|sec x| + C', w1: 'sec² x + C', w2: '-ln|sec x| + C', w3: 'ln|sin x| + C', exp: '∫ (sin x / cos x) dx = -ln|cos x| = ln|sec x| + C.', d: 'Easy' },
    { q: 'Evaluate: ∫ sec(x) dx =', c: 'ln|sec x + tan x| + C', w1: 'sec x tan x + C', w2: 'ln|sec x| + C', w3: 'tan x + C', exp: 'Standard formula: ln|sec x + tan x| + C.', d: 'Easy' },
    { q: 'Evaluate: ∫ x * sin(x) dx =', c: '-x cos x + sin x + C', w1: 'x cos x - sin x + C', w2: '-x cos x - sin x + C', w3: 'x sin x + cos x + C', exp: 'Parts: u = x, dv = sin x dx => -x cos x + sin x + C.', d: 'Medium' },
    { q: 'For ∫ dx / (x² - 4), the partial fractions are:', c: '(1/4)/(x - 2) - (1/4)/(x + 2)', w1: '(1/2)/(x - 2) - (1/2)/(x + 2)', w2: '1/(x - 2) + 1/(x + 2)', w3: '(1/4)/(x² - 4)', exp: '1/[(x-2)(x+2)] = (1/4)/(x-2) - (1/4)/(x+2).', d: 'Medium' },
    { q: 'Evaluate: ∫₀¹ x * e^x dx =', c: '1', w1: 'e - 1', w2: 'e', w3: '2', exp: '[x e^x - e^x]₀¹ = (e - e) - (0 - 1) = 1.', d: 'Easy' },
    { q: 'Evaluate: ∫ x / √(1 - x²) dx =', c: '-√(1 - x²) + C', w1: '√(1 - x²) + C', w2: 'arcsin(x) + C', w3: '-(1/2)√(1 - x²) + C', exp: 'u = 1 - x², du = -2x dx => -u^(1/2) + C.', d: 'Medium' },
    { q: 'Evaluate: ∫₁^e (ln x / x) dx =', c: '1/2', w1: '1', w2: 'e', w3: '1/e', exp: 'u = ln x, du = dx/x => [u²/2]₀¹ = 1/2.', d: 'Easy' },
    { q: 'Evaluate the improper integral: ∫₀¹ (1 / √x) dx =', c: '2 (converges)', w1: '1', w2: '∞ (diverges)', w3: '1/2', exp: '[2√x]₀¹ = 2 - 0 = 2.', d: 'Medium' },
    { q: 'Evaluate: ∫ cos²(x) dx =', c: 'x/2 + (1/4) sin(2x) + C', w1: 'x/2 - (1/4) sin(2x) + C', w2: 'sin³(x)/3 + C', w3: 'x + sin(2x) + C', exp: 'cos² x = (1 + cos 2x)/2 => x/2 + (1/4)sin 2x + C.', d: 'Medium' },
    { q: 'Evaluate: ∫ sin²(x) dx =', c: 'x/2 - (1/4) sin(2x) + C', w1: 'x/2 + (1/4) sin(2x) + C', w2: '-cos³(x)/3 + C', w3: 'x - cos(2x) + C', exp: 'sin² x = (1 - cos 2x)/2 => x/2 - (1/4)sin 2x + C.', d: 'Medium' },
    { q: 'Evaluate: ∫ x * √(x + 1) dx:', c: '(2/5)(x + 1)^(5/2) - (2/3)(x + 1)^(3/2) + C', w1: '(2/3)(x + 1)^(3/2) + C', w2: '(2/5)(x + 1)^(5/2) + C', w3: '(1/2)x²(x + 1) + C', exp: 'u = x + 1 => ∫ (u - 1) u^(1/2) du = (2/5)u^(5/2) - (2/3)u^(3/2) + C.', d: 'Medium' },
    { q: 'To evaluate ∫ dx / √(x² + 16), which substitution is optimal?', c: 'x = 4 tan θ', w1: 'x = 4 sin θ', w2: 'x = 4 sec θ', w3: 'x = 16 tan θ', exp: 'Form √(x² + a²) requires x = a tan θ (a = 4).', d: 'Easy' },
    { q: 'To evaluate ∫ dx / √(x² - 9), which substitution is optimal?', c: 'x = 3 sec θ', w1: 'x = 3 sin θ', w2: 'x = 3 tan θ', w3: 'x = 9 sec θ', exp: 'Form √(x² - a²) requires x = a sec θ (a = 3).', d: 'Easy' },
    { q: 'Evaluate the definite integral: ∫₀⁴ [x / √(x² + 1)] dx =', c: '√17 - 1', w1: '√17', w2: '17', w3: '√17 + 1', exp: '[√(x² + 1)]₀⁴ = √17 - 1.', d: 'Medium' },
    { q: 'Evaluate: ∫ e^(√x) / √x dx =', c: '2 e^(√x) + C', w1: 'e^(√x) + C', w2: '(1/2) e^(√x) + C', w3: '2√x e^(√x) + C', exp: 'u = √x, du = dx/(2√x) => 2 ∫ e^u du = 2 e^(√x) + C.', d: 'Easy' },
    { q: 'The improper integral ∫₀^∞ e^(-3x) dx equals:', c: '1/3', w1: '3', w2: '∞', w3: '0', exp: '[-1/3 e^(-3x)]₀^∞ = 0 - (-1/3) = 1/3.', d: 'Easy' },
    { q: 'Evaluate: ∫ x² * ln(x) dx =', c: '(1/3)x³ ln x - (1/9)x³ + C', w1: '(1/3)x³ ln x - (1/3)x³ + C', w2: '(1/2)x² ln x + C', w3: '(1/3)x³ ln x + C', exp: 'Parts: u = ln x, dv = x² dx => (1/3)x³ ln x - (1/9)x³ + C.', d: 'Medium' },
    { q: 'What is the form of partial fractions for 1 / [x(x² + 1)]?', c: 'A/x + (Bx + C)/(x² + 1)', w1: 'A/x + B/(x² + 1)', w2: '(Ax + B)/x + C/(x² + 1)', w3: 'A/x + B/(x + 1) + C/(x - 1)', exp: 'Irreducible quadratic factor requires linear numerator Bx + C.', d: 'Easy' },
    { q: 'Evaluate: ∫ (2x + 3) / (x² + 3x + 5) dx =', c: 'ln(x² + 3x + 5) + C', w1: '1 / (x² + 3x + 5) + C', w2: '2 ln(x² + 3x + 5) + C', w3: 'arctan(x) + C', exp: 'Numerator is exact derivative of denominator: ∫ du/u = ln|u| + C.', d: 'Easy' },
    { q: 'Evaluate: ∫ sec⁴(x) dx =', c: 'tan x + (1/3) tan³ x + C', w1: 'tan x - (1/3) tan³ x + C', w2: '(1/4) sec⁴ x + C', w3: 'sec² x tan x + C', exp: 'sec⁴ x = (1 + tan² x) sec² x => tan x + (1/3) tan³ x + C.', d: 'Medium' },
    { q: 'The improper integral ∫₁^∞ (1 / x^p) dx converges if and only if:', c: 'p > 1', w1: 'p ≥ 1', w2: 'p < 1', w3: 'p > 0', exp: 'p-integral convergence theorem: converges strictly for p > 1.', d: 'Easy' },
    { q: 'The improper integral ∫₀¹ (1 / x^p) dx converges if and only if:', c: 'p < 1', w1: 'p ≤ 1', w2: 'p > 1', w3: 'p ≥ 1', exp: 'Near zero, 1/x^p converges if and only if p < 1.', d: 'Easy' },
    { q: 'Evaluate: ∫ x * cos(2x) dx =', c: '(1/2)x sin(2x) + (1/4) cos(2x) + C', w1: '(1/2)x sin(2x) - (1/4) cos(2x) + C', w2: '-(1/2)x sin(2x) + C', w3: 'x sin(2x) + cos(2x) + C', exp: 'Parts: (1/2)x sin 2x + (1/4)cos 2x + C.', d: 'Medium' },
    { q: 'Evaluate: ∫ dx / √(9 - 4x²) =', c: '(1/2) arcsin(2x/3) + C', w1: 'arcsin(2x/3) + C', w2: '(1/3) arcsin(2x/3) + C', w3: '(1/2) arctan(2x/3) + C', exp: '2x = 3 sin θ => (1/2) arcsin(2x/3) + C.', d: 'Medium' }
  ];

  const c2Final = [
    { q: 'The infinite p-series Σ_{n=1}^∞ (1 / n^p) converges if and only if:', c: 'p > 1', w1: 'p ≥ 1', w2: 'p < 1', w3: 'p > 0', exp: 'By p-series test, it converges strictly for p > 1.', d: 'Easy' },
    { q: 'The geometric series Σ_{n=0}^∞ a * r^n converges if and only if:', c: '|r| < 1', w1: '|r| ≤ 1', w2: 'r > 1', w3: 'r ≠ 1', exp: 'Geometric series converges to a/(1 - r) when |r| < 1.', d: 'Easy' },
    { q: 'The sum of the convergent geometric series Σ_{n=0}^∞ (1/3)^n is:', c: '3/2', w1: '1/2', w2: '3', w3: '2/3', exp: 'S = 1 / (1 - 1/3) = 1 / (2/3) = 3/2.', d: 'Easy' },
    { q: 'The radius of convergence R of Σ_{n=0}^∞ (x^n / n!) is:', c: 'R = ∞', w1: 'R = 1', w2: 'R = 0', w3: 'R = e', exp: 'Ratio test: lim |x / (n + 1)| = 0 for all x, so R = ∞.', d: 'Easy' },
    { q: 'The Maclaurin series expansion of cos(x) is:', c: 'Σ_{n=0}^∞ (-1)^n x^(2n) / (2n)!', w1: 'Σ_{n=0}^∞ (-1)^n x^(2n+1) / (2n+1)!', w2: 'Σ_{n=0}^∞ x^n / n!', w3: 'Σ_{n=0}^∞ x^(2n) / (2n)!', exp: 'cos x has only even powers alternating in sign.', d: 'Easy' },
    { q: 'The Maclaurin series expansion of sin(x) is:', c: 'Σ_{n=0}^∞ (-1)^n x^(2n+1) / (2n+1)!', w1: 'Σ_{n=0}^∞ (-1)^n x^(2n) / (2n)!', w2: 'Σ_{n=0}^∞ x^(2n+1) / (2n+1)!', w3: 'Σ_{n=0}^∞ x^n / n!', exp: 'sin x has only odd powers alternating in sign.', d: 'Easy' },
    { q: 'The Maclaurin series expansion of e^x is:', c: 'Σ_{n=0}^∞ x^n / n!', w1: 'Σ_{n=0}^∞ (-1)^n x^n / n!', w2: 'Σ_{n=1}^∞ x^n / n', w3: 'Σ_{n=0}^∞ x^(2n) / n!', exp: 'e^x = 1 + x + x²/2! + x³/3! + ...', d: 'Easy' },
    { q: 'The harmonic series Σ_{n=1}^∞ (1 / n):', c: 'Diverges (p = 1)', w1: 'Converges to 1', w2: 'Converges to 0', w3: 'Converges to π²/6', exp: 'Harmonic series is a p-series with p = 1, which diverges.', d: 'Easy' },
    { q: 'The alternating harmonic series Σ_{n=1}^∞ (-1)^(n+1) / n:', c: 'Converges conditionally to ln(2)', w1: 'Converges absolutely', w2: 'Diverges', w3: 'Converges to 0', exp: 'Alternating series converges, but absolute series diverges => conditionally convergent.', d: 'Medium' },
    { q: 'The arc length of the curve y = f(x) from x = a to x = b is given by:', c: '∫ₐᵇ √(1 + [f\'(x)]²) dx', w1: '∫ₐᵇ √(1 - [f\'(x)]²) dx', w2: '∫ₐᵇ (1 + [f\'(x)]²) dx', w3: '∫ₐᵇ √([f(x)]² + [f\'(x)]²) dx', exp: 'Standard arc length formula ds = √(1 + (y\')²) dx.', d: 'Easy' },
    { q: 'Using the Ratio Test, the series Σ_{n=1}^∞ (n! / 2^n):', c: 'Diverges', w1: 'Converges absolutely', w2: 'Inconclusive', w3: 'Converges conditionally', exp: 'lim (n+1)/2 = ∞ > 1 => diverges.', d: 'Easy' },
    { q: 'Using the Ratio Test, the series Σ_{n=1}^∞ (2^n / n!):', c: 'Converges absolutely', w1: 'Diverges', w2: 'Inconclusive', w3: 'Converges conditionally', exp: 'lim 2/(n+1) = 0 < 1 => converges absolutely.', d: 'Easy' },
    { q: 'The Taylor series of f(x) = 1 / (1 - x) centered at x = 0 is:', c: 'Σ_{n=0}^∞ x^n for |x| < 1', w1: 'Σ_{n=0}^∞ (-1)^n x^n', w2: 'Σ_{n=1}^∞ x^n / n', w3: 'Σ_{n=0}^∞ x^(2n)', exp: 'Standard geometric power series.', d: 'Easy' },
    { q: 'The Maclaurin series for ln(1 + x) for |x| < 1 is:', c: 'Σ_{n=1}^∞ (-1)^(n+1) x^n / n', w1: 'Σ_{n=0}^∞ x^n / n!', w2: 'Σ_{n=1}^∞ x^n / n', w3: 'Σ_{n=0}^∞ (-1)^n x^n', exp: 'Integrate 1/(1+x) => x - x²/2 + x³/3 - ...', d: 'Medium' },
    { q: 'By the Alternating Series Test, Σ_{n=1}^∞ (-1)^n b_n converges if:', c: 'b_{n+1} ≤ b_n and lim_{n→∞} b_n = 0', w1: 'b_n is increasing', w2: 'lim b_n = 1', w3: 'b_n is negative', exp: 'Leibniz criterion for alternating series.', d: 'Easy' },
    { q: 'If Σ |a_n| converges, then Σ a_n is said to be:', c: 'Absolutely convergent', w1: 'Conditionally convergent', w2: 'Divergent', w3: 'Oscillating', exp: 'Definition of absolute convergence.', d: 'Easy' },
    { q: 'If lim_{n→∞} a_n ≠ 0, what does the Divergence Test conclude about Σ a_n?', c: 'The series diverges', w1: 'The series converges', w2: 'The test is inconclusive', w3: 'The series converges conditionally', exp: 'If the terms do not approach 0, the series cannot converge.', d: 'Easy' },
    { q: 'The area between the curves y = x and y = x² from x = 0 to x = 1 is:', c: '1/6', w1: '1/3', w2: '1/2', w3: '1/12', exp: '∫₀¹ (x - x²) dx = 1/2 - 1/3 = 1/6.', d: 'Easy' },
    { q: 'The volume of solid generated by revolving y = √x about the x-axis from x = 0 to x = 4 is:', c: '8π', w1: '16π', w2: '4π', w3: '2π', exp: 'Disk method: π ∫₀⁴ x dx = π [x²/2]₀⁴ = 8π.', d: 'Easy' },
    { q: 'The radius of convergence of Σ_{n=1}^∞ (x - 3)^n / n is:', c: 'R = 1', w1: 'R = 3', w2: 'R = ∞', w3: 'R = 0', exp: 'lim |(x-3)| * n/(n+1) = |x - 3| < 1 => R = 1.', d: 'Medium' },
    { q: 'The interval of convergence for Σ_{n=1}^∞ (x - 3)^n / n is:', c: '[2, 4)', w1: '(2, 4)', w2: '[2, 4]', w3: '(2, 4]', exp: 'At x = 2: alternating converges. At x = 4: harmonic diverges. So [2, 4).', d: 'Medium' },
    { q: 'Using the Integral Test on Σ_{n=1}^∞ (1 / [n² + 1]):', c: 'Converges because ∫₁^∞ dx/(x² + 1) = π/4 < ∞', w1: 'Diverges', w2: 'Inconclusive', w3: 'Equal to 1', exp: 'Antiderivative is arctan(x), finite limit π/2 - π/4 = π/4.', d: 'Medium' },
    { q: 'The sum of the series Σ_{n=0}^∞ (-1)^n (π^(2n)) / [(2n)! * 4^(2n)] is:', c: 'cos(π/4) = √2 / 2', w1: 'sin(π/4)', w2: '1', w3: '0', exp: 'Maclaurin series for cos(x) at x = π/4.', d: 'Medium' },
    { q: 'The first three non-zero terms of the Maclaurin series for e^(-x²) are:', c: '1 - x² + x⁴ / 2', w1: '1 + x² + x⁴ / 2', w2: '1 - x + x² / 2', w3: 'x - x³ / 3 + x⁵ / 5', exp: 'Substitute -x² into 1 + u + u²/2: 1 - x² + x⁴/2.', d: 'Medium' },
    { q: 'The series Σ_{n=1}^∞ (1 / 3^n) converges to:', c: '1/2', w1: '1/3', w2: '1', w3: '2/3', exp: 'a = 1/3, r = 1/3 => (1/3)/(1 - 1/3) = 1/2.', d: 'Easy' },
    { q: 'The series Σ_{n=1}^∞ [(-1)^n / n²]:', c: 'Converges absolutely', w1: 'Converges conditionally', w2: 'Diverges', w3: 'Inconclusive', exp: 'Σ 1/n² is a convergent p-series (p = 2 > 1).', d: 'Easy' },
    { q: 'Find Taylor polynomial of degree 2 for f(x) = √x centered at a = 4:', c: '2 + (1/4)(x - 4) - (1/64)(x - 4)²', w1: '2 + (1/4)(x - 4) + (1/64)(x - 4)²', w2: '2 + (1/2)(x - 4)', w3: '4 + (1/4)(x - 4)', exp: 'f(4) = 2, f\'(4) = 1/4, f\'\'(4) = -1/32.', d: 'Hard' },
    { q: 'By the Direct Comparison Test, Σ_{n=1}^∞ (1 / [n³ + 5]):', c: 'Converges by comparison with Σ 1/n³', w1: 'Diverges', w2: 'Inconclusive', w3: 'Equals 1/5', exp: '1/(n³ + 5) < 1/n³, and Σ 1/n³ converges.', d: 'Easy' },
    { q: 'Using Limit Comparison Test with b_n = 1/n, Σ_{n=1}^∞ (2n + 1) / (n² + 3):', c: 'Diverges because lim a_n / b_n = 2 > 0 and Σ 1/n diverges', w1: 'Converges', w2: 'Inconclusive', w3: 'Equals 2', exp: 'Limit is 2 > 0, so both share same divergence.', d: 'Medium' },
    { q: 'The value of the series Σ_{n=0}^∞ (1 / n!) is:', c: 'e', w1: 'e - 1', w2: '1', w3: '∞', exp: 'Definition of Euler\'s number e.', d: 'Easy' },
    { q: 'The value of the series Σ_{n=1}^∞ (1 / n!) is:', c: 'e - 1', w1: 'e', w2: '1', w3: '2', exp: 'Omits n = 0 term (1), so e - 1.', d: 'Easy' },
    { q: 'The Root Test is most convenient for series where the general term involves:', c: 'An nth power, e.g., (a_n)^n', w1: 'Factorials like n!', w2: 'Logarithms ln(n)', w3: 'Alternating signs only', exp: 'Taking nth root lim |a_n|^(1/n) simplifies nth powers.', d: 'Easy' },
    { q: 'What is the sum of the series Σ_{n=1}^∞ [1/n - 1/(n+1)]?', c: '1', w1: '0', w2: '∞', w3: '1/2', exp: 'Telescoping series: S_k = 1 - 1/(k+1) → 1.', d: 'Easy' },
    { q: 'The series Σ_{n=1}^∞ [cos(n) / n²]:', c: 'Converges absolutely', w1: 'Diverges', w2: 'Converges conditionally', w3: 'Oscillates wildly', exp: '|cos n / n²| ≤ 1/n², which converges.', d: 'Medium' },
    { q: 'The Maclaurin series for 1 / (1 + x²) is:', c: 'Σ_{n=0}^∞ (-1)^n x^(2n) for |x| < 1', w1: 'Σ_{n=0}^∞ x^(2n)', w2: 'Σ_{n=0}^∞ (-1)^n x^n', w3: 'Σ_{n=1}^∞ x^(2n) / (2n)', exp: 'Substitute -x² into 1/(1 - u).', d: 'Easy' },
    { q: 'The Maclaurin series for arctan(x) is obtained by integrating 1/(1+x²), giving:', c: 'Σ_{n=0}^∞ (-1)^n x^(2n+1) / (2n+1)', w1: 'Σ_{n=0}^∞ x^(2n+1) / (2n+1)', w2: 'Σ_{n=0}^∞ (-1)^n x^(2n) / (2n)', w3: 'Σ_{n=0}^∞ x^n / n!', exp: 'Term-by-term integration gives (-1)^n x^(2n+1)/(2n+1).', d: 'Medium' },
    { q: 'Coefficient of x³ in the Maclaurin series of sin(2x) is:', c: '-4/3', w1: '-1/6', w2: '4/3', w3: '8/6', exp: 'sin(u) = u - u³/6 => for u = 2x: 2x - 8x³/6 = 2x - (4/3)x³.', d: 'Medium' },
    { q: 'Coefficient of x² in the Maclaurin series of e^(3x) is:', c: '9/2', w1: '3/2', w2: '9', w3: '3', exp: 'e^(3x) = 1 + 3x + (3x)²/2! = 1 + 3x + (9/2)x².', d: 'Easy' },
    { q: 'If a power series Σ c_n (x - a)^n converges at x = b, it converges absolutely for:', c: '|x - a| < |b - a|', w1: '|x - a| > |b - a|', w2: 'x > b', w3: 'x < a', exp: 'Fundamental property of radius of convergence.', d: 'Easy' },
    { q: 'Evaluate: lim_{x → 0} (sin x - x) / x³ using series expansion:', c: '-1/6', w1: '1/6', w2: '0', w3: '-1/3', exp: 'sin x = x - x³/6 + ... => (sin x - x)/x³ = -1/6.', d: 'Medium' },
    { q: 'The sum of the telescoping series Σ_{n=1}^∞ 1/[n(n+1)] is:', c: '1', w1: '1/2', w2: '2', w3: '∞', exp: '1/[n(n+1)] = 1/n - 1/(n+1) => sum = 1.', d: 'Easy' },
    { q: 'Evaluate: ∫₀^(π/2) cos³(x) dx =', c: '2/3', w1: '1/3', w2: '1', w3: 'π/4', exp: '∫ (1 - sin² x) cos x dx = [sin x - sin³ x / 3]₀^(π/2) = 1 - 1/3 = 2/3.', d: 'Medium' },
    { q: 'The series Σ_{n=1}^∞ [n / (2n + 1)]:', c: 'Diverges by the Divergence Test (lim = 1/2 ≠ 0)', w1: 'Converges by Ratio Test', w2: 'Converges conditionally', w3: 'Inconclusive', exp: 'lim_{n→∞} n/(2n+1) = 1/2 ≠ 0, so it diverges.', d: 'Easy' },
    { q: 'The series Σ_{n=1}^∞ (-1)^n / √n is:', c: 'Conditionally convergent', w1: 'Absolutely convergent', w2: 'Divergent', w3: 'Oscillating', exp: 'Converges by AST, but Σ 1/√n diverges (p = 1/2 ≤ 1).', d: 'Medium' },
    { q: 'The arc length of the circle curve x = r cos t, y = r sin t for 0 ≤ t ≤ 2π is:', c: '2πr', w1: 'πr²', w2: 'πr', w3: '4πr', exp: '∫₀^(2π) √((-r sin t)² + (r cos t)²) dt = ∫₀^(2π) r dt = 2πr.', d: 'Easy' },
    { q: 'Using the Shell Method, the volume revolving y = x² from x = 0 to 1 about the y-axis is:', c: 'π / 2', w1: 'π', w2: '2π', w3: 'π / 4', exp: 'V = 2π ∫₀¹ x(x²) dx = 2π [x⁴/4]₀¹ = π/2.', d: 'Medium' },
    { q: 'The Maclaurin series for f(x) = cos(x²) begins with:', c: '1 - x⁴ / 2 + x⁸ / 24', w1: '1 - x² + x⁴ / 2', w2: 'x² - x⁶ / 6', w3: '1 + x⁴ / 2', exp: 'Replace x with x² in cos x = 1 - x²/2 + x⁴/24.', d: 'Medium' },
    { q: 'The series Σ_{n=2}^∞ [1 / (n (ln n)²)]:', c: 'Converges by the Integral Test', w1: 'Diverges', w2: 'Inconclusive', w3: 'Oscillates', exp: '∫₂^∞ dx/(x(ln x)²) = [-1/ln x]₂^∞ = 1/ln 2 < ∞.', d: 'Medium' },
    { q: 'Evaluate the limit using Maclaurin series: lim_{x → 0} (e^x - 1 - x) / x² =', c: '1/2', w1: '1', w2: '0', w3: '2', exp: 'e^x - 1 - x = x²/2 + ... Dividing by x² yields 1/2.', d: 'Medium' },
    { q: 'The series Σ_{n=1}^∞ [(n! * n!) / (2n)!] converges by the Ratio Test because:', c: 'lim a_{n+1}/a_n = 1/4 < 1', w1: 'lim a_{n+1}/a_n = 1/2 < 1', w2: 'lim a_{n+1}/a_n = 0', w3: 'lim = 1', exp: '(n+1)²/[(2n+1)(2n+2)] → 1/4 < 1.', d: 'Hard' },
    { q: 'What is the sum of Σ_{n=0}^∞ (-1)^n / (2n + 1)?', c: 'π / 4', w1: 'π / 2', w2: '1', w3: 'ln 2', exp: 'Gregory-Leibniz series evaluates arctan(1) = π/4.', d: 'Medium' },
    { q: 'The interval of convergence of Σ_{n=1}^∞ x^n / (n * 3^n) is:', c: '[-3, 3)', w1: '(-3, 3)', w2: '[-3, 3]', w3: '(-3, 3]', exp: 'R = 3. At x = -3: converges (AST). At x = 3: diverges (harmonic). So [-3, 3).', d: 'Hard' }
  ];

  c2Mid.forEach((it, idx) => qs.push(createQuestion(`C2-MID-${String(idx + 1).padStart(3, '0')}`, 'subj-calc2', false, it.q, it.c, it.w1, it.w2, it.w3, it.exp, it.d, 'Mid calcu2.pdf', idx)));
  c2Final.forEach((it, idx) => qs.push(createQuestion(`C2-FIN-${String(idx + 1).padStart(3, '0')}`, 'subj-calc2', true, it.q, it.c, it.w1, it.w2, it.w3, it.exp, it.d, 'Final calcu 2.pdf', idx)));

  // ==========================================
  // DIFFERENTIAL EQUATIONS (subj-diff)
  // Mid: 32 (Order, degree, linearity, separable, 1st order linear, exact, Bernoulli, orthogonal trajectories, 2nd order constant coeff homogeneous)
  // Final: 52 (Undetermined coefficients, variation of parameters, Cauchy-Euler, Laplace transforms, inverse Laplace, shifting theorems, Heaviside, convolution, systems)
  // ==========================================
  const diffMid = [
    { q: 'The differential equation (d²y/dx²)³ + x (dy/dx)⁴ + y = 0 has:', c: 'Order 2 and Degree 3', w1: 'Order 4 and Degree 2', w2: 'Order 3 and Degree 2', w3: 'Order 2 and Degree 4', exp: 'The highest derivative is d²y/dx² (order 2), raised to the power 3 (degree 3).', d: 'Easy' },
    { q: 'Which of the following differential equations is nonlinear?', c: 'y\' + y² = x', w1: 'y\' + x y = sin(x)', w2: 'y\'\' + 4y\' + 3y = e^x', w3: 'x² y\' + y = 0', exp: 'y² makes the equation nonlinear with respect to the dependent variable y.', d: 'Easy' },
    { q: 'Solve the separable equation dy/dx = 6 x² y for y > 0:', c: 'y = C e^(2x³)', w1: 'y = C e^(3x²)', w2: 'y = 2x³ + C', w3: 'y = C e^(6x³)', exp: 'dy/y = 6x² dx => ln y = 2x³ + c => y = C e^(2x³).', d: 'Easy' },
    { q: 'The integrating factor for the 1st order linear ODE y\' + (3/x) y = x² is:', c: 'μ(x) = x³', w1: 'μ(x) = 3 ln x', w2: 'μ(x) = x²', w3: 'μ(x) = e^(3x)', exp: 'μ(x) = e^(∫ (3/x) dx) = e^(3 ln x) = x³.', d: 'Easy' },
    { q: 'The general solution to y\' + 2y = 4 is:', c: 'y(x) = 2 + C e^(-2x)', w1: 'y(x) = 4 + C e^(-2x)', w2: 'y(x) = 2 + C e^(2x)', w3: 'y(x) = C e^(-2x) - 2', exp: 'μ = e^(2x), d/dx[y e^(2x)] = 4 e^(2x) => y e^(2x) = 2 e^(2x) + C => y = 2 + C e^(-2x).', d: 'Easy' },
    { q: 'The differential equation M(x, y) dx + N(x, y) dy = 0 is exact if and only if:', c: '∂M/∂y = ∂N/∂x', w1: '∂M/∂x = ∂N/∂y', w2: '∂M/∂y = -∂N/∂x', w3: 'M = N', exp: 'Euler-Clairaut criterion for exactness: ∂M/∂y = ∂N/∂x.', d: 'Easy' },
    { q: 'For the equation (2xy + 3) dx + (x² + 4y) dy = 0, is it exact?', c: 'Yes, because ∂M/∂y = 2x and ∂N/∂x = 2x', w1: 'No, ∂M/∂y ≠ ∂N/∂x', w2: 'Only when x = 0', w3: 'Only when y = 0', exp: '∂M/∂y = 2x and ∂N/∂x = 2x, which are identical.', d: 'Easy' },
    { q: 'The substitution used to transform a Bernoulli equation y\' + P(x)y = Q(x)y^n is:', c: 'v = y^(1 - n)', w1: 'v = y^(n - 1)', w2: 'v = y^n', w3: 'v = 1 / y', exp: 'Standard substitution v = y^(1-n) transforms Bernoulli to a linear ODE.', d: 'Easy' },
    { q: 'The differential equation dy/dx = (x² + y²) / (2xy) is homogeneous of degree:', c: '0 (function of y/x)', w1: '1', w2: '2', w3: 'Not homogeneous', exp: 'Divide numerator and denominator by x² to get [1 + (y/x)²] / [2(y/x)].', d: 'Medium' },
    { q: 'The substitution to solve a homogeneous equation dy/dx = f(y/x) is:', c: 'y = v * x', w1: 'y = v + x', w2: 'v = x * y', w3: 'y = v / x', exp: 'y = vx => dy/dx = v + x (dv/dx).', d: 'Easy' },
    { q: 'Find the orthogonal trajectories to the family of curves y = C x²:', c: 'x² + 2y² = k', w1: 'x² - 2y² = k', w2: 'y² = k x', w3: 'x + y = k', exp: 'dy/dx = 2Cx = 2y/x. Orthogonal ODE is dy/dx = -x/(2y) => 2y dy = -x dx => x² + 2y² = k.', d: 'Medium' },
    { q: 'The characteristic equation of y\'\' - 5y\' + 6y = 0 is:', c: 'r² - 5r + 6 = 0', w1: 'r² + 5r + 6 = 0', w2: 'r² - 6r + 5 = 0', w3: 'r² + 6 = 0', exp: 'Replace y\'\' with r², y\' with r, y with 1.', d: 'Easy' },
    { q: 'The general solution to y\'\' - 5y\' + 6y = 0 is:', c: 'y(x) = C₁ e^(2x) + C₂ e^(3x)', w1: 'y(x) = C₁ e^(-2x) + C₂ e^(-3x)', w2: 'y(x) = (C₁ + C₂x) e^(2x)', w3: 'y(x) = C₁ cos(2x) + C₂ sin(3x)', exp: 'Roots are r = 2, 3 => y = C₁ e^(2x) + C₂ e^(3x).', d: 'Easy' },
    { q: 'The general solution to y\'\' - 4y\' + 4y = 0 with repeated root r = 2 is:', c: 'y(x) = (C₁ + C₂ x) e^(2x)', w1: 'y(x) = C₁ e^(2x) + C₂ e^(-2x)', w2: 'y(x) = C₁ e^(2x) + C₂ e^(2x)', w3: 'y(x) = C₁ cos(2x) + C₂ sin(2x)', exp: 'Repeated roots have basis {e^(rx), x e^(rx)}.', d: 'Easy' },
    { q: 'The general solution to y\'\' + 9y = 0 is:', c: 'y(x) = C₁ cos(3x) + C₂ sin(3x)', w1: 'y(x) = C₁ e^(3x) + C₂ e^(-3x)', w2: 'y(x) = (C₁ + C₂ x) e^(3x)', w3: 'y(x) = C₁ cosh(3x) + C₂ sinh(3x)', exp: 'Roots are r = ±3i => y = C₁ cos(3x) + C₂ sin(3x).', d: 'Easy' },
    { q: 'The general solution to y\'\' - 2y\' + 5y = 0 with roots r = 1 ± 2i is:', c: 'y(x) = e^x (C₁ cos(2x) + C₂ sin(2x))', w1: 'y(x) = e^(2x) (C₁ cos x + C₂ sin x)', w2: 'y(x) = C₁ e^x + C₂ e^(2x)', w3: 'y(x) = e^(-x) (C₁ cos 2x + C₂ sin 2x)', exp: 'Complex roots α ± βi give e^(αx)(C₁ cos βx + C₂ sin βx).', d: 'Medium' },
    { q: 'The Wronskian W(y₁, y₂) of y₁ = e^(2x) and y₂ = e^(3x) is:', c: 'e^(5x)', w1: '5 e^(5x)', w2: '0', w3: 'e^x', exp: 'W = y₁ y₂\' - y₁\' y₂ = e^(2x)(3e^(3x)) - 2e^(2x)(e^(3x)) = 3e^(5x) - 2e^(5x) = e^(5x).', d: 'Medium' },
    { q: 'If the Wronskian of two solutions y₁ and y₂ is non-zero, the solutions are:', c: 'Linearly independent', w1: 'Linearly dependent', w2: 'Identically zero', w3: 'Constant multiples', exp: 'Non-zero Wronskian proves linear independence on an interval.', d: 'Easy' },
    { q: 'The solution of IVP: y\' = 3x², y(0) = 5 is:', c: 'y = x³ + 5', w1: 'y = 3x³ + 5', w2: 'y = x³ - 5', w3: 'y = 6x + 5', exp: '∫ 3x² dx = x³ + C. y(0) = 5 => C = 5.', d: 'Easy' },
    { q: 'According to Picard-Lindelöf theorem, y\' = f(x, y) with y(x₀) = y₀ has a unique solution if:', c: 'f and ∂f/∂y are continuous in a rectangle containing (x₀, y₀)', w1: 'f is linear only', w2: 'f is a polynomial', w3: 'y₀ = 0', exp: 'Continuity of f and its partial derivative ∂f/∂y ensures local existence and uniqueness.', d: 'Medium' },
    { q: 'For y\'\' + P(x) y\' + Q(x) y = 0, Abel\'s formula states that W(x) equals:', c: 'C * e^(-∫ P(x) dx)', w1: 'C * e^(∫ P(x) dx)', w2: 'C * e^(-∫ Q(x) dx)', w3: 'C * P(x)', exp: 'Abel\'s identity: W\' + P(x)W = 0 => W(x) = C e^(-∫ P dx).', d: 'Medium' },
    { q: 'An integrating factor that depends on x alone for M dx + N dy = 0 exists if:', c: '(∂M/∂y - ∂N/∂x) / N is a function of x alone', w1: '(∂N/∂x - ∂M/∂y) / M is a function of x alone', w2: '∂M/∂y = ∂N/∂x', w3: 'M / N is constant', exp: 'Standard condition: [M_y - N_x]/N = f(x) => μ(x) = e^(∫ f(x) dx).', d: 'Medium' },
    { q: 'Solve the ODE dy/dx + y = e^(-x):', c: 'y = (x + C) e^(-x)', w1: 'y = x e^(-x)', w2: 'y = e^(-x) + C', w3: 'y = (x² + C) e^(-x)', exp: 'μ = e^x, d/dx[y e^x] = 1 => y e^x = x + C => y = (x + C)e^(-x).', d: 'Medium' },
    { q: 'Solve x dy - y dx = 0:', c: 'y = C x', w1: 'y = C / x', w2: 'y = x + C', w3: 'x² + y² = C', exp: 'dy/y = dx/x => ln|y| = ln|x| + c => y = Cx.', d: 'Easy' },
    { q: 'The order of the differential equation (y\'\')² + (y\')⁵ + y = x is:', c: '2', w1: '5', w2: '1', w3: '7', exp: 'Highest derivative present is y\'\' (order 2).', d: 'Easy' },
    { q: 'A general solution of an nth order ODE contains exactly:', c: 'n arbitrary constants', w1: '1 arbitrary constant', w2: 'n + 1 constants', w3: 'Zero constants', exp: 'Theorem on linear/general ODE solutions: dimension of solution space is n.', d: 'Easy' },
    { q: 'The general solution of y\'\' = 0 is:', c: 'y = C₁ x + C₂', w1: 'y = C₁ x²', w2: 'y = C₁', w3: 'y = C₁ e^x + C₂', exp: 'Integrate twice: y\' = C₁ => y = C₁x + C₂.', d: 'Easy' },
    { q: 'The differential equation y\' = y / x is:', c: 'Separable, homogeneous, and linear', w1: 'Separable only', w2: 'Nonlinear', w3: 'Exact only', exp: 'Satisfies dy/y = dx/x (separable), f(y/x)=y/x (homogeneous), y\' - (1/x)y = 0 (linear).', d: 'Easy' },
    { q: 'Solve dy/dx = -2xy with y(0) = 3:', c: 'y = 3 e^(-x²)', w1: 'y = 3 e^(x²)', w2: 'y = e^(-x²) + 2', w3: 'y = 3 - x²', exp: 'dy/y = -2x dx => ln y = -x² + c => y = 3 e^(-x²).', d: 'Easy' },
    { q: 'The characteristic equation of y\'\' + 4y\' + 4y = 0 has roots:', c: 'r = -2 (repeated of multiplicity 2)', w1: 'r = 2 (repeated)', w2: 'r = ±2', w3: 'r = ±2i', exp: '(r + 2)² = 0 => r = -2 (multiplicity 2).', d: 'Easy' },
    { q: 'The differential equation (x + 1) dy/dx - y = (x + 1)² has integrating factor:', c: 'μ(x) = 1 / (x + 1)', w1: 'μ(x) = x + 1', w2: 'μ(x) = ln(x + 1)', w3: 'μ(x) = (x + 1)²', exp: 'P(x) = -1/(x+1) => μ = e^(-ln(x+1)) = 1/(x+1).', d: 'Medium' },
    { q: 'Which equation is a Bernoulli differential equation?', c: 'y\' + 3y = x y³', w1: 'y\' + 3y = x y', w2: 'y\'\' + y = 0', w3: 'y\' + y² = x', exp: 'Form y\' + P(x)y = Q(x)y^n with n = 3.', d: 'Easy' }
  ];

  const diffFinal = [
    { q: 'For y\'\' - 3y\' + 2y = e^(3x), a suitable particular solution form Y_p using undetermined coefficients is:', c: 'A e^(3x)', w1: 'A x e^(3x)', w2: 'A e^(2x)', w3: '(A x + B) e^(3x)', exp: 'r = 3 is not a root of r² - 3r + 2 = (r-1)(r-2) = 0, so Y_p = A e^(3x).', d: 'Easy' },
    { q: 'For y\'\' - 3y\' + 2y = e^x, the form of Y_p using undetermined coefficients is:', c: 'A x e^x', w1: 'A e^x', w2: 'A x² e^x', w3: '(A x + B) e^x', exp: 'r = 1 is a simple root of the characteristic equation, so multiply by x: A x e^x.', d: 'Medium' },
    { q: 'For y\'\' + 4y = sin(2x), the form of Y_p is:', c: 'x (A cos 2x + B sin 2x)', w1: 'A cos 2x + B sin 2x', w2: 'A sin 2x', w3: 'x² (A cos 2x + B sin 2x)', exp: 'Roots are ±2i which match the forcing frequency 2, so multiply by x.', d: 'Medium' },
    { q: 'In the method of Variation of Parameters for y\'\' + P y\' + Q y = g(x), u₁\' is given by:', c: '-y₂ g(x) / W', w1: 'y₁ g(x) / W', w2: 'y₂ g(x) / W', w3: '-y₁ g(x) / W', exp: 'Standard Cramer\'s rule result: u₁\' = -y₂ g / W.', d: 'Medium' },
    { q: 'In Variation of Parameters, u₂\' is given by:', c: 'y₁ g(x) / W', w1: '-y₂ g(x) / W', w2: '-y₁ g(x) / W', w3: 'y₂ g(x) / W', exp: 'Standard formula: u₂\' = y₁ g / W.', d: 'Medium' },
    { q: 'The Cauchy-Euler equation x² y\'\' + a x y\' + b y = 0 is solved by assuming solutions of form:', c: 'y = x^m', w1: 'y = e^(m x)', w2: 'y = m^x', w3: 'y = ln(m x)', exp: 'For Cauchy-Euler equations, the ansatz is y = x^m.', d: 'Easy' },
    { q: 'The auxiliary equation for x² y\'\' - 2x y\' + 2y = 0 is:', c: 'm(m - 1) - 2m + 2 = m² - 3m + 2 = 0', w1: 'm² - 2m + 2 = 0', w2: 'm² + 3m + 2 = 0', w3: 'm² - 2 = 0', exp: 'x² y\'\' gives m(m-1), so m(m-1) - 2m + 2 = m² - 3m + 2 = 0.', d: 'Medium' },
    { q: 'The general solution of x² y\'\' - 2x y\' + 2y = 0 for x > 0 is:', c: 'y = C₁ x + C₂ x²', w1: 'y = C₁ e^x + C₂ e^(2x)', w2: 'y = C₁ x + C₂ x ln x', w3: 'y = C₁ x⁻¹ + C₂ x⁻²', exp: 'Roots are m = 1, 2 => y = C₁ x + C₂ x².', d: 'Medium' },
    { q: 'If the auxiliary equation of Cauchy-Euler has a repeated root m, the second independent solution is:', c: 'x^m ln(x)', w1: 'x^(m + 1)', w2: 'e^(m x)', w3: 'x^m / x', exp: 'Reduction of order yields y₂ = x^m ln(x).', d: 'Easy' },
    { q: 'The Laplace transform of f(t) = 1 is:', c: '1 / s (s > 0)', w1: '1 / s²', w2: 's', w3: '1', exp: '∫₀^∞ e^(-st) dt = 1/s.', d: 'Easy' },
    { q: 'The Laplace transform of f(t) = t^n (n positive integer) is:', c: 'n! / s^(n + 1)', w1: 'n! / s^n', w2: '1 / s^(n + 1)', w3: '(n + 1)! / s^n', exp: 'Standard formula: L{t^n} = n! / s^(n+1).', d: 'Easy' },
    { q: 'The Laplace transform of f(t) = e^(at) is:', c: '1 / (s - a) for s > a', w1: '1 / (s + a)', w2: 'a / s', w3: 's / (s - a)', exp: '∫₀^∞ e^(-(s-a)t) dt = 1/(s - a).', d: 'Easy' },
    { q: 'The Laplace transform of f(t) = sin(ωt) is:', c: 'ω / (s² + ω²)', w1: 's / (s² + ω²)', w2: 'ω / (s² - ω²)', w3: '1 / (s² + ω²)', exp: 'Standard transform: L{sin ωt} = ω/(s² + ω²).', d: 'Easy' },
    { q: 'The Laplace transform of f(t) = cos(ωt) is:', c: 's / (s² + ω²)', w1: 'ω / (s² + ω²)', w2: 's / (s² - ω²)', w3: '1 / (s + ω)', exp: 'Standard transform: L{cos ωt} = s/(s² + ω²).', d: 'Easy' },
    { q: 'The First Shifting Theorem states that L{e^(at) f(t)} equals:', c: 'F(s - a)', w1: 'F(s + a)', w2: 'e^(-as) F(s)', w3: 'F(s) / (s - a)', exp: 'L{e^(at) f(t)} = ∫ e^(-(s-a)t) f(t) dt = F(s - a).', d: 'Easy' },
    { q: 'The Laplace transform of e^(3t) cos(2t) is:', c: '(s - 3) / [(s - 3)² + 4]', w1: '2 / [(s - 3)² + 4]', w2: '(s + 3) / [(s + 3)² + 4]', w3: 's / (s² + 4)', exp: 'Apply shift s → s - 3 to s/(s² + 4).', d: 'Medium' },
    { q: 'The Laplace transform of the derivative f\'(t) is:', c: 's F(s) - f(0)', w1: 's F(s) + f(0)', w2: 'F(s) / s', w3: 's² F(s) - f(0)', exp: 'Integration by parts gives s F(s) - f(0).', d: 'Easy' },
    { q: 'The Laplace transform of f\'\'(t) is:', c: 's² F(s) - s f(0) - f\'(0)', w1: 's² F(s) + s f(0) + f\'(0)', w2: 's² F(s) - f\'(0)', w3: 's² F(s) - f(0)', exp: 'Standard second derivative property.', d: 'Easy' },
    { q: 'The inverse Laplace transform L⁻¹{ 6 / (s⁴) } is:', c: 't³', w1: 't⁴', w2: '3t²', w3: '6t³', exp: 'L{t³} = 3! / s⁴ = 6 / s⁴, so L⁻¹ is t³.', d: 'Easy' },
    { q: 'The inverse Laplace transform L⁻¹{ 1 / (s - 4) } is:', c: 'e^(4t)', w1: 'e^(-4t)', w2: '4 e^t', w3: 't⁴', exp: 'L{e^(at)} = 1/(s-a) with a = 4.', d: 'Easy' },
    { q: 'The unit step function u(t - a) (or Heaviside function) has Laplace transform:', c: 'e^(-as) / s', w1: 'e^(as) / s', w2: '1 / (s - a)', w3: 'e^(-as)', exp: 'L{u(t - a)} = ∫ₐ^∞ e^(-st) dt = e^(-as) / s.', d: 'Medium' },
    { q: 'The Second Shifting Theorem states that L{f(t - a) u(t - a)} equals:', c: 'e^(-as) F(s)', w1: 'e^(as) F(s)', w2: 'F(s - a)', w3: 'F(s) / s', exp: 'Time shift by a corresponds to frequency multiplication by e^(-as).', d: 'Medium' },
    { q: 'The Laplace transform of the Dirac delta function δ(t - a) is:', c: 'e^(-as)', w1: 'e^(-as) / s', w2: '1', w3: 'e^(as)', exp: '∫₀^∞ e^(-st) δ(t - a) dt = e^(-as). For a = 0, it is 1.', d: 'Medium' },
    { q: 'The Convolution Theorem states that L{f * g} = L{ ∫₀^t f(τ) g(t - τ) dτ } equals:', c: 'F(s) * G(s)', w1: 'F(s) + G(s)', w2: 'F(s) / G(s)', w3: 'F\'(s) G(s)', exp: 'Laplace transform of convolution is product of individual transforms.', d: 'Medium' },
    { q: 'The inverse Laplace transform L⁻¹{ 1 / [s (s + 1)] } using partial fractions is:', c: '1 - e^(-t)', w1: '1 + e^(-t)', w2: 'e^(-t)', w3: 't e^(-t)', exp: '1/[s(s+1)] = 1/s - 1/(s+1) => 1 - e^(-t).', d: 'Medium' },
    { q: 'For y\'\' + y = 0, y(0) = 1, y\'(0) = 0, the Laplace transform algebraic equation is:', c: 's² Y(s) - s + Y(s) = 0 => Y(s) = s / (s² + 1)', w1: 's² Y(s) + Y(s) = 0', w2: 'Y(s) = 1 / (s² + 1)', w3: 'Y(s) = s²', exp: '(s² Y - s*1 - 0) + Y = 0 => (s² + 1)Y = s => Y = s/(s² + 1) => y(t) = cos t.', d: 'Medium' },
    { q: 'A point x = x₀ is an ordinary point of y\'\' + P(x) y\' + Q(x) y = 0 if:', c: 'Both P(x) and Q(x) are analytic at x₀', w1: 'P(x₀) = 0', w2: 'Q(x₀) = 0', w3: 'P or Q has a pole at x₀', exp: 'Definition: coefficients can be expanded in Taylor series near x₀.', d: 'Easy' },
    { q: 'For the equation x² y\'\' + x y\' + (x² - 4) y = 0 (Bessel\'s equation), x = 0 is a:', c: 'Regular singular point', w1: 'Ordinary point', w2: 'Irregular singular point', w3: 'Non-singular point', exp: 'x P(x) = 1 and x² Q(x) = x² - 4 are analytic at x = 0, so it is a regular singular point.', d: 'Medium' },
    { q: 'In power series solutions y = Σ c_n x^n for y\' - y = 0, the recurrence relation is:', c: 'c_{n+1} = c_n / (n + 1)', w1: 'c_{n+1} = (n + 1) c_n', w2: 'c_{n+1} = c_n', w3: 'c_{n+1} = c_n / n', exp: 'Σ (n+1)c_{n+1} x^n - Σ c_n x^n = 0 => c_{n+1} = c_n/(n+1).', d: 'Medium' },
    { q: 'A system of ODEs x\' = A x has a critical point at the origin that is a saddle point if:', c: 'The eigenvalues of A are real and have opposite signs', w1: 'Both eigenvalues are negative', w2: 'Both eigenvalues are positive', w3: 'Eigenvalues are purely imaginary', exp: 'Real eigenvalues of opposite sign (λ₁ > 0 > λ₂) define a saddle point (unstable).', d: 'Hard' },
    { q: 'A critical point is a stable center if the eigenvalues of A are:', c: 'Purely imaginary: λ = ±i β', w1: 'Complex with negative real part', w2: 'Real and negative', w3: 'Real and positive', exp: 'Purely imaginary eigenvalues yield closed elliptical trajectories (neutral stability).', d: 'Medium' },
    { q: 'The Laplace transform of t * e^(2t) is:', c: '1 / (s - 2)²', w1: '1 / (s - 2)', w2: '2 / (s - 2)²', w3: '1 / s²', exp: 'L{t} = 1/s²; by first shift theorem: 1/(s - 2)².', d: 'Easy' },
    { q: 'The Laplace transform of t * sin(t) using frequency differentiation (-dF/ds) is:', c: '2s / (s² + 1)²', w1: '(s² - 1) / (s² + 1)²', w2: '1 / (s² + 1)²', w3: 's / (s² + 1)', exp: 'L{t f(t)} = -d/ds[1/(s²+1)] = 2s/(s²+1)².', d: 'Hard' },
    { q: 'The inverse Laplace transform L⁻¹{ s / (s² + 16) } is:', c: 'cos(4t)', w1: 'sin(4t)', w2: '(1/4) sin(4t)', w3: 'e^(4t)', exp: 's/(s² + ω²) corresponds to cos(ωt) with ω = 4.', d: 'Easy' },
    { q: 'The inverse Laplace transform L⁻¹{ 4 / (s² + 16) } is:', c: 'sin(4t)', w1: 'cos(4t)', w2: '4 sin(4t)', w3: '(1/4) cos(4t)', exp: 'ω/(s² + ω²) with ω = 4 corresponds to sin(4t).', d: 'Easy' },
    { q: 'The general solution of y\'\' + 4y = 0 has fundamental solutions:', c: 'y₁ = cos(2x), y₂ = sin(2x)', w1: 'y₁ = e^(2x), y₂ = e^(-2x)', w2: 'y₁ = cos(4x), y₂ = sin(4x)', w3: 'y₁ = x, y₂ = x²', exp: 'r² + 4 = 0 => r = ±2i => cos 2x, sin 2x.', d: 'Easy' },
    { q: 'For y\'\' - 4y\' + 4y = 0, y(0) = 1, y\'(0) = 4, the solution is:', c: 'y = (1 + 2x) e^(2x)', w1: 'y = e^(2x)', w2: 'y = (1 + 4x) e^(2x)', w3: 'y = (2 + x) e^(2x)', exp: 'y = (C₁ + C₂x)e^(2x). y(0)=1 => C₁=1. y\'(0) = 2C₁ + C₂ = 4 => C₂ = 2.', d: 'Medium' },
    { q: 'Which method can solve y\'\' + y = tan(x)?', c: 'Variation of Parameters', w1: 'Undetermined Coefficients', w2: 'Laplace transforms directly without convolution', w3: 'Separation of variables', exp: 'tan(x) is not in the family of polynomials, exponentials, or sines/cosines.', d: 'Medium' },
    { q: 'The particular solution Y_p for y\'\' + y = 2 is:', c: '2', w1: '2x', w2: '2 e^x', w3: '0', exp: 'Try constant Y_p = A => 0 + A = 2 => A = 2.', d: 'Easy' },
    { q: 'The inverse Laplace transform L⁻¹{ e^(-2s) / (s + 3) } is:', c: 'e^(-3(t - 2)) u(t - 2)', w1: 'e^(-3t) u(t - 2)', w2: 'e^(-2t) u(t - 3)', w3: 'e^(-3t - 2)', exp: 'Second shifting theorem: L⁻¹{e^(-as) F(s)} = f(t - a) u(t - a).', d: 'Medium' },
    { q: 'The Laplace transform of the integral ∫₀^t f(τ) dτ is:', c: 'F(s) / s', w1: 's F(s)', w2: 'F(s) - f(0)', w3: 'F\'(s) / s', exp: 'Standard integration theorem for Laplace transforms.', d: 'Easy' },
    { q: 'In Frobenius method, the roots of the indicial equation r(r - 1) + p₀ r + q₀ = 0 determine:', c: 'The exponents in the Frobenius series y = x^r Σ a_n x^n', w1: 'The radius of convergence only', w2: 'The value of y(0)', w3: 'The order of the differential equation', exp: 'Indicial roots r₁, r₂ give the leading powers of series solutions.', d: 'Medium' },
    { q: 'If indicial roots r₁ - r₂ is an integer, the second Frobenius solution typically involves:', c: 'A logarithmic term C y₁(x) ln(x)', w1: 'An exponential factor e^(r x)', w2: 'A fractional power only', w3: 'No series representation', exp: 'Integer differences produce a logarithmic singularity in the second solution.', d: 'Hard' },
    { q: 'The general solution of x² y\'\' + 3x y\' + y = 0 is:', c: 'y = (C₁ + C₂ ln x) x⁻¹', w1: 'y = C₁ x⁻¹ + C₂ x', w2: 'y = C₁ x + C₂ x ln x', w3: 'y = C₁ e^(-x) + C₂ e^x', exp: 'm(m-1) + 3m + 1 = m² + 2m + 1 = (m+1)² = 0 => repeated root m = -1.', d: 'Medium' },
    { q: 'The Laplace transform of t² is:', c: '2 / s³', w1: '1 / s³', w2: '2 / s²', w3: '6 / s⁴', exp: '2! / s^(2+1) = 2/s³.', d: 'Easy' },
    { q: 'The Laplace transform of cosh(at) is:', c: 's / (s² - a²)', w1: 'a / (s² - a²)', w2: 's / (s² + a²)', w3: '1 / (s - a)', exp: 'cosh(at) = (e^(at) + e^(-at))/2 => s/(s² - a²).', d: 'Easy' },
    { q: 'The Laplace transform of sinh(at) is:', c: 'a / (s² - a²)', w1: 's / (s² - a²)', w2: 'a / (s² + a²)', w3: '1 / (s² - a²)', exp: 'sinh(at) = (e^(at) - e^(-at))/2 => a/(s² - a²).', d: 'Easy' },
    { q: 'The solution of the initial value problem y\' + 4y = 0, y(0) = 7 is:', c: 'y(t) = 7 e^(-4t)', w1: 'y(t) = 7 e^(4t)', w2: 'y(t) = 4 e^(-7t)', w3: 'y(t) = 7 - 4t', exp: 'Separation or standard exponential: y = y(0) e^(-4t) = 7 e^(-4t).', d: 'Easy' },
    { q: 'The system x\' = y, y\' = -x corresponds to the second order equation:', c: 'x\'\' + x = 0', w1: 'x\'\' - x = 0', w2: 'x\'\' + y = 0', w3: 'y\'\' + y = 0', exp: 'x\'\' = y\' = -x => x\'\' + x = 0.', d: 'Easy' },
    { q: 'The Laplace transform of f(t) = t * e^(-t) is:', c: '1 / (s + 1)²', w1: '1 / (s - 1)²', w2: '1 / (s + 1)', w3: '2 / (s + 1)²', exp: 'Shift 1/s² by s → s + 1 gives 1/(s + 1)².', d: 'Easy' },
    { q: 'The steady-state solution of a damped forced oscillator y\'\' + 2γ y\' + ω₀² y = F₀ cos(ωt) represents:', c: 'The particular solution Y_p(t)', w1: 'The complementary solution y_c(t)', w2: 'The transient response', w3: 'The initial velocity', exp: 'Complementary decays to zero (transient); particular solution remains (steady-state).', d: 'Medium' },
    { q: 'If two eigenvalues of a 2x2 system are λ₁ = -2, λ₂ = -5, the origin is an:', c: 'Asymptotically stable node (sink)', w1: 'Unstable node (source)', w2: 'Saddle point', w3: 'Center', exp: 'Both eigenvalues real and negative indicate an asymptotically stable node.', d: 'Medium' }
  ];

  diffMid.forEach((it, idx) => qs.push(createQuestion(`DIFF-MID-${String(idx + 1).padStart(3, '0')}`, 'subj-diff', false, it.q, it.c, it.w1, it.w2, it.w3, it.exp, it.d, 'Mid Diff Summer 2022.pdf', idx)));
  diffFinal.forEach((it, idx) => qs.push(createQuestion(`DIFF-FIN-${String(idx + 1).padStart(3, '0')}`, 'subj-diff', true, it.q, it.c, it.w1, it.w2, it.w3, it.exp, it.d, 'Diff Final Exam.pdf', idx)));

  return qs;
}

module.exports = { getC2AndDiffQuestions };
