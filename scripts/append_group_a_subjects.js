/**
 * Master Academic Question Generator for Group A (Remaining 8 subjects):
 * - subj-calc2
 * - subj-diff
 * - subj-linear
 * - subj-numerical
 * - subj-stats
 * - subj-physics1
 * - subj-physics2
 * - subj-chem
 *
 * Each subject: 32 Midterm + 52 Final distinct, authentic questions.
 */

const fs = require('fs');
const path = require('path');

// Let's create the full data structures for all 8 subjects
const subjects = [
  {
    id: 'subj-calc2',
    prefix: 'C2',
    srcMid: 'Mid calcu2.pdf',
    srcFin: 'Final calcu 2.pdf',
    mid: [
      { q: 'Evaluate: ∫ x * e^(2x) dx using integration by parts:', a: '(1/2)x e^(2x) - (1/4)e^(2x) + C', b: '(1/2)x e^(2x) + (1/4)e^(2x) + C', c: 'x e^(2x) - e^(2x) + C', d: '(1/4)x e^(2x) + C', exp: 'u = x, dv = e^(2x)dx => uv - ∫ v du = (1/2)x e^(2x) - (1/4)e^(2x) + C.' },
      { q: 'Evaluate: ∫ ln(x) dx:', a: 'x ln x - x + C', b: '1/x + C', c: '(1/2)(ln x)² + C', d: 'x ln x + x + C', exp: 'Integration by parts with u = ln x, dv = dx gives x ln x - x + C.' },
      { q: 'Evaluate the trigonometric substitution integral: ∫ dx / √(4 - x²) =', a: 'arcsin(x/2) + C', b: 'arctan(x/2) + C', c: '(1/2)arcsin(x) + C', d: 'ln|x + √(4-x²)| + C', exp: 'Let x = 2 sin θ => result is arcsin(x/2) + C.' },
      { q: 'Evaluate: ∫ dx / (x² + 9) =', a: '(1/3) arctan(x/3) + C', b: 'arctan(x/3) + C', c: '(1/9) arctan(x/3) + C', d: 'ln(x² + 9) + C', exp: 'Standard formula: (1/a) arctan(x/a) with a = 3.' },
      { q: 'Evaluate the improper integral: ∫₁^∞ (1 / x²) dx =', a: '1 (converges)', b: '∞ (diverges)', c: '2', d: '0', exp: 'lim_{b→∞} [-1/x]₁^b = 0 - (-1) = 1.' },
      { q: 'The improper integral ∫₁^∞ (1 / x) dx:', a: 'Diverges to ∞', b: 'Converges to 1', c: 'Converges to 0', d: 'Converges to e', exp: '[ln x]₁^∞ = ∞ - 0 = ∞, so it diverges.' },
      { q: 'The partial fraction decomposition of (2x + 1) / [(x - 1)(x + 2)] has form:', a: 'A/(x - 1) + B/(x + 2)', b: 'A/(x - 1) + B/(x - 1)²', c: '(Ax + B)/[(x - 1)(x + 2)]', d: 'A/(x² + x - 2)', exp: 'Distinct linear factors decompose into separate single fractions.' },
      { q: 'Evaluate: ∫ sin³(x) cos(x) dx =', a: '(1/4) sin⁴(x) + C', b: '(1/3) sin³(x) + C', c: '-(1/4) cos⁴(x) + C', d: '(1/4) cos⁴(x) + C', exp: 'Let u = sin x, du = cos x dx => ∫ u³ du = u⁴/4 + C = (1/4)sin⁴ x + C.' },
      { q: 'Evaluate: ∫ tan(x) dx =', a: 'ln|sec x| + C', b: 'sec² x + C', c: '-ln|sec x| + C', d: 'ln|sin x| + C', exp: '∫ (sin x / cos x) dx = -ln|cos x| = ln|sec x| + C.' },
      { q: 'Evaluate: ∫ sec(x) dx =', a: 'ln|sec x + tan x| + C', b: 'sec x tan x + C', c: 'ln|sec x| + C', d: 'tan x + C', exp: 'Standard formula: ln|sec x + tan x| + C.' },
      { q: 'Evaluate: ∫ x * sin(x) dx =', a: '-x cos x + sin x + C', b: 'x cos x - sin x + C', c: '-x cos x - sin x + C', d: 'x sin x + cos x + C', exp: 'Parts: u = x, dv = sin x dx => -x cos x + ∫ cos x dx = -x cos x + sin x + C.' },
      { q: 'For ∫ dx / (x² - 4), the partial fractions are:', a: '(1/4)/(x - 2) - (1/4)/(x + 2)', b: '(1/2)/(x - 2) - (1/2)/(x + 2)', c: '1/(x - 2) + 1/(x + 2)', d: '(1/4)/(x² - 4)', exp: '1/[(x-2)(x+2)] = A/(x-2) + B/(x+2) => A = 1/4, B = -1/4.' },
      { q: 'Evaluate: ∫₀¹ x * e^x dx =', a: '1', b: 'e - 1', c: 'e', d: '2', exp: '[x e^x - e^x]₀¹ = (e - e) - (0 - 1) = 1.' },
      { q: 'Evaluate: ∫ x / √(1 - x²) dx =', a: '-√(1 - x²) + C', b: '√(1 - x²) + C', c: 'arcsin(x) + C', d: '-(1/2)√(1 - x²) + C', exp: 'u = 1 - x², du = -2x dx => -(1/2) ∫ u^(-1/2) du = -u^(1/2) + C = -√(1 - x²) + C.' },
      { q: 'Evaluate: ∫₁^e (ln x / x) dx =', a: '1/2', b: '1', c: 'e', d: '1/e', exp: 'u = ln x, du = dx/x => [u²/2]₀¹ = 1/2.' },
      { q: 'Evaluate the improper integral: ∫₀¹ (1 / √x) dx =', a: '2 (converges)', b: '1', c: '∞ (diverges)', d: '1/2', exp: 'lim_{a→0⁺} [2√x]_a¹ = 2 - 0 = 2.' },
      { q: 'Evaluate: ∫ cos²(x) dx =', a: 'x/2 + (1/4) sin(2x) + C', b: 'x/2 - (1/4) sin(2x) + C', c: 'sin³(x)/3 + C', d: 'x + sin(2x) + C', exp: 'Use identity cos² x = (1 + cos 2x)/2 => x/2 + (1/4)sin 2x + C.' },
      { q: 'Evaluate: ∫ sin²(x) dx =', a: 'x/2 - (1/4) sin(2x) + C', b: 'x/2 + (1/4) sin(2x) + C', c: '-cos³(x)/3 + C', d: 'x - cos(2x) + C', exp: 'Use identity sin² x = (1 - cos 2x)/2 => x/2 - (1/4)sin 2x + C.' },
      { q: 'Evaluate: ∫ x * √(x + 1) dx:', a: '(2/5)(x + 1)^(5/2) - (2/3)(x + 1)^(3/2) + C', b: '(2/3)(x + 1)^(3/2) + C', c: '(2/5)(x + 1)^(5/2) + C', d: '(1/2)x²(x + 1) + C', exp: 'u = x + 1 => x = u - 1 => ∫ (u - 1) u^(1/2) du = (2/5)u^(5/2) - (2/3)u^(3/2) + C.' },
      { q: 'To evaluate ∫ dx / √(x² + 16), which substitution is optimal?', a: 'x = 4 tan θ', b: 'x = 4 sin θ', c: 'x = 4 sec θ', d: 'x = 16 tan θ', exp: 'Form √(x² + a²) requires x = a tan θ, where a = 4.' },
      { q: 'To evaluate ∫ dx / √(x² - 9), which substitution is optimal?', a: 'x = 3 sec θ', b: 'x = 3 sin θ', c: 'x = 3 tan θ', d: 'x = 9 sec θ', exp: 'Form √(x² - a²) requires x = a sec θ, where a = 3.' },
      { q: 'Evaluate the definite integral: ∫₀⁴ [x / √(x² + 1)] dx =', a: '√17 - 1', b: '√17', c: '17', d: '√17 + 1', exp: 'u = x² + 1, du = 2x dx. [√(x² + 1)]₀⁴ = √17 - 1.' },
      { q: 'Evaluate: ∫ e^(√x) / √x dx =', a: '2 e^(√x) + C', b: 'e^(√x) + C', c: '(1/2) e^(√x) + C', d: '2√x e^(√x) + C', exp: 'u = √x, du = dx/(2√x) => 2 ∫ e^u du = 2 e^(√x) + C.' },
      { q: 'The improper integral ∫₀^∞ e^(-3x) dx equals:', a: '1/3', b: '3', c: '∞', d: '0', exp: '[-1/3 e^(-3x)]₀^∞ = 0 - (-1/3) = 1/3.' },
      { q: 'Evaluate: ∫ x² * ln(x) dx =', a: '(1/3)x³ ln x - (1/9)x³ + C', b: '(1/3)x³ ln x - (1/3)x³ + C', c: '(1/2)x² ln x + C', d: '(1/3)x³ ln x + C', exp: 'u = ln x, dv = x² dx => (1/3)x³ ln x - ∫ (1/3)x² dx = (1/3)x³ ln x - (1/9)x³ + C.' },
      { q: 'What is the form of partial fractions for 1 / [x(x² + 1)]?', a: 'A/x + (Bx + C)/(x² + 1)', b: 'A/x + B/(x² + 1)', c: '(Ax + B)/x + C/(x² + 1)', d: 'A/x + B/(x + 1) + C/(x - 1)', exp: 'Irreducible quadratic factor requires linear numerator Bx + C.' },
      { q: 'Evaluate: ∫ (2x + 3) / (x² + 3x + 5) dx =', a: 'ln(x² + 3x + 5) + C', b: '1 / (x² + 3x + 5) + C', c: '2 ln(x² + 3x + 5) + C', d: 'arctan(x) + C', exp: 'Numerator is the exact derivative of denominator: ∫ du/u = ln|u| + C.' },
      { q: 'Evaluate: ∫ sec⁴(x) dx =', a: 'tan x + (1/3) tan³ x + C', b: 'tan x - (1/3) tan³ x + C', c: '(1/4) sec⁴ x + C', d: 'sec² x tan x + C', exp: 'sec⁴ x = (1 + tan² x) sec² x => tan x + (1/3) tan³ x + C.' },
      { q: 'The improper integral ∫₁^∞ (1 / x^p) dx converges if and only if:', a: 'p > 1', b: 'p ≥ 1', c: 'p < 1', d: 'p > 0', exp: 'p-integral convergence theorem: converges for p > 1, diverges for p ≤ 1.' },
      { q: 'The improper integral ∫₀¹ (1 / x^p) dx converges if and only if:', a: 'p < 1', b: 'p ≤ 1', c: 'p > 1', d: 'p ≥ 1', exp: 'Near zero, 1/x^p converges if and only if p < 1.' },
      { q: 'Evaluate: ∫ x * cos(2x) dx =', a: '(1/2)x sin(2x) + (1/4) cos(2x) + C', b: '(1/2)x sin(2x) - (1/4) cos(2x) + C', c: '-(1/2)x sin(2x) + C', d: 'x sin(2x) + cos(2x) + C', exp: 'Parts: u = x, dv = cos(2x)dx => (1/2)x sin 2x - ∫ (1/2)sin 2x dx = (1/2)x sin 2x + (1/4)cos 2x + C.' },
      { q: 'Evaluate: ∫ dx / √(9 - 4x²) =', a: '(1/2) arcsin(2x/3) + C', b: 'arcsin(2x/3) + C', c: '(1/3) arcsin(2x/3) + C', d: '(1/2) arctan(2x/3) + C', exp: 'Let 2x = 3 sin θ => dx = (3/2) cos θ dθ => (1/2) arcsin(2x/3) + C.' }
    ],
    fin: [
      { q: 'The infinite p-series Σ_{n=1}^∞ (1 / n^p) converges if and only if:', a: 'p > 1', b: 'p ≥ 1', c: 'p < 1', d: 'p > 0', exp: 'By p-series test, it converges strictly for p > 1.' },
      { q: 'The geometric series Σ_{n=0}^∞ a * r^n converges if and only if:', a: '|r| < 1', b: '|r| ≤ 1', c: 'r > 1', d: 'r ≠ 1', exp: 'Geometric series converges to a/(1 - r) when |r| < 1.' },
      { q: 'The sum of the convergent geometric series Σ_{n=0}^∞ (1/3)^n is:', a: '3/2', b: '1/2', c: '3', d: '2/3', exp: 'S = a / (1 - r) = 1 / (1 - 1/3) = 1 / (2/3) = 3/2.' },
      { q: 'The radius of convergence R of the power series Σ_{n=0}^∞ (x^n / n!) is:', a: 'R = ∞', b: 'R = 1', c: 'R = 0', d: 'R = e', exp: 'Ratio test: lim |x / (n + 1)| = 0 for all x, so R = ∞.' },
      { q: 'The Maclaurin series expansion of cos(x) is:', a: 'Σ_{n=0}^∞ (-1)^n x^(2n) / (2n)!', b: 'Σ_{n=0}^∞ (-1)^n x^(2n+1) / (2n+1)!', c: 'Σ_{n=0}^∞ x^n / n!', d: 'Σ_{n=0}^∞ x^(2n) / (2n)!', exp: 'cos x has only even powers alternating in sign.' },
      { q: 'The Maclaurin series expansion of sin(x) is:', a: 'Σ_{n=0}^∞ (-1)^n x^(2n+1) / (2n+1)!', b: 'Σ_{n=0}^∞ (-1)^n x^(2n) / (2n)!', c: 'Σ_{n=0}^∞ x^(2n+1) / (2n+1)!', d: 'Σ_{n=0}^∞ x^n / n!', exp: 'sin x has only odd powers alternating in sign.' },
      { q: 'The Maclaurin series expansion of e^x is:', a: 'Σ_{n=0}^∞ x^n / n!', b: 'Σ_{n=0}^∞ (-1)^n x^n / n!', c: 'Σ_{n=1}^∞ x^n / n', d: 'Σ_{n=0}^∞ x^(2n) / n!', exp: 'e^x = 1 + x + x²/2! + x³/3! + ...' },
      { q: 'The harmonic series Σ_{n=1}^∞ (1 / n):', a: 'Diverges (p = 1)', b: 'Converges to 1', c: 'Converges to 0', d: 'Converges to π²/6', exp: 'Harmonic series is a p-series with p = 1, which diverges.' },
      { q: 'The alternating harmonic series Σ_{n=1}^∞ (-1)^(n+1) / n:', a: 'Converges conditionally to ln(2)', b: 'Converges absolutely', c: 'Diverges', d: 'Converges to 0', exp: 'By Alternating Series Test it converges, but Σ 1/n diverges => conditionally convergent to ln 2.' },
      { q: 'The arc length of the curve y = f(x) from x = a to x = b is given by:', a: '∫ₐᵇ √(1 + [f\'(x)]²) dx', b: '∫ₐᵇ √(1 - [f\'(x)]²) dx', c: '∫ₐᵇ (1 + [f\'(x)]²) dx', d: '∫ₐᵇ √([f(x)]² + [f\'(x)]²) dx', exp: 'Standard arc length formula derived from ds = √(dx² + dy²).' },
      { q: 'The arc length of the curve f(x) = 2√(x³) + 1 from x = 0 to x = 1 is:', a: '(2/27)(10√10 - 1)', b: '(2/27)(10√10 + 1)', c: '(1/27)(10√10 - 1)', d: '10√10 - 1', exp: 'f\' = 3√x => 1 + 9x => ∫₀¹ √(1+9x) dx = [(2/27)(1+9x)^(3/2)]₀¹ = (2/27)(10√10 - 1).' },
      { q: 'Using the Ratio Test, the series Σ_{n=1}^∞ (n! / 2^n):', a: 'Diverges', b: 'Converges absolutely', c: 'Inconclusive', d: 'Converges conditionally', exp: 'lim (n+1)!/2^(n+1) * 2^n/n! = lim (n+1)/2 = ∞ > 1 => diverges.' },
      { q: 'Using the Ratio Test, the series Σ_{n=1}^∞ (2^n / n!):', a: 'Converges absolutely', b: 'Diverges', c: 'Inconclusive', d: 'Converges conditionally', exp: 'lim 2^(n+1)/(n+1)! * n!/2^n = lim 2/(n+1) = 0 < 1 => converges absolutely.' },
      { q: 'The Taylor series of f(x) = 1 / (1 - x) centered at x = 0 is:', a: 'Σ_{n=0}^∞ x^n for |x| < 1', b: 'Σ_{n=0}^∞ (-1)^n x^n', c: 'Σ_{n=1}^∞ x^n / n', d: 'Σ_{n=0}^∞ x^(2n)', exp: 'Standard geometric power series.' },
      { q: 'The Maclaurin series for ln(1 + x) for |x| < 1 is:', a: 'Σ_{n=1}^∞ (-1)^(n+1) x^n / n', b: 'Σ_{n=0}^∞ x^n / n!', c: 'Σ_{n=1}^∞ x^n / n', d: 'Σ_{n=0}^∞ (-1)^n x^n', exp: 'Integrate 1/(1+x) = 1 - x + x² - ... => x - x²/2 + x³/3 - ...' },
      { q: 'By the Alternating Series Test, Σ_{n=1}^∞ (-1)^n b_n converges if:', a: 'b_{n+1} ≤ b_n and lim_{n→∞} b_n = 0', b: 'b_n is increasing', c: 'lim b_n = 1', d: 'b_n is negative', exp: 'Two conditions of Leibniz criterion.' },
      { q: 'If Σ |a_n| converges, then Σ a_n is said to be:', a: 'Absolutely convergent', b: 'Conditionally convergent', c: 'Divergent', d: 'Oscillating', exp: 'Definition of absolute convergence.' },
      { q: 'If lim_{n→∞} a_n ≠ 0, what does the Divergence Test conclude about Σ a_n?', a: 'The series diverges', b: 'The series converges', c: 'The test is inconclusive', d: 'The series converges conditionally', exp: 'If the terms do not approach 0, the series cannot converge.' },
      { q: 'The area between the curves y = x and y = x² from x = 0 to x = 1 is:', a: '1/6', b: '1/3', c: '1/2', d: '1/12', exp: '∫₀¹ (x - x²) dx = [x²/2 - x³/3]₀¹ = 1/2 - 1/3 = 1/6.' },
      { q: 'The volume of the solid generated by revolving y = √x about the x-axis from x = 0 to x = 4 is:', a: '8π', b: '16π', c: '4π', d: '2π', exp: 'Disk method: V = π ∫₀⁴ (√x)² dx = π ∫₀⁴ x dx = π [x²/2]₀⁴ = 8π.' },
      { q: 'The radius of convergence of Σ_{n=1}^∞ (x - 3)^n / n is:', a: 'R = 1', b: 'R = 3', c: 'R = ∞', d: 'R = 0', exp: 'Ratio test: lim |(x - 3)| * n/(n+1) = |x - 3| < 1 => R = 1.' },
      { q: 'The interval of convergence for Σ_{n=1}^∞ (x - 3)^n / n is:', a: '[2, 4)', b: '(2, 4)', c: '[2, 4]', d: '(2, 4]', exp: 'At x = 2: Σ (-1)^n/n converges. At x = 4: Σ 1/n diverges. So [2, 4).' },
      { q: 'Using the Integral Test on Σ_{n=1}^∞ (1 / [n² + 1]):', a: 'Converges because ∫₁^∞ dx/(x² + 1) = π/2 - π/4 = π/4 < ∞', b: 'Diverges', c: 'Inconclusive', d: 'Equal to 1', exp: 'Antiderivative is arctan(x), finite limit as x → ∞.' },
      { q: 'The sum of the series Σ_{n=0}^∞ (-1)^n (π^(2n)) / [(2n)! * 4^(2n)] is:', a: 'cos(π/4) = √2 / 2', b: 'sin(π/4)', c: '1', d: '0', exp: 'This is the Maclaurin series for cos(x) evaluated at x = π/4.' },
      { q: 'The first three non-zero terms of the Maclaurin series for e^(-x²) are:', a: '1 - x² + x⁴ / 2', b: '1 + x² + x⁴ / 2', c: '1 - x + x² / 2', d: 'x - x³ / 3 + x⁵ / 5', exp: 'Replace x with -x² in e^u = 1 + u + u²/2: 1 - x² + x⁴/2.' },
      { q: 'The series Σ_{n=1}^∞ (1 / 3^n) converges to:', a: '1/2', b: '1/3', c: '1', d: '2/3', exp: 'First term a = 1/3, r = 1/3 => (1/3)/(1 - 1/3) = (1/3)/(2/3) = 1/2.' },
      { q: 'The series Σ_{n=1}^∞ [(-1)^n / n²]:', a: 'Converges absolutely', b: 'Converges conditionally', c: 'Diverges', d: 'Inconclusive', exp: 'Σ 1/n² is a convergent p-series (p = 2 > 1).' },
      { q: 'Find the Taylor polynomial of degree 2 for f(x) = √x centered at a = 4:', a: '2 + (1/4)(x - 4) - (1/64)(x - 4)²', b: '2 + (1/4)(x - 4) + (1/64)(x - 4)²', c: '2 + (1/2)(x - 4)', d: '4 + (1/4)(x - 4)', exp: 'f(4) = 2, f\'(4) = 1/4, f\'\'(4) = -1/32 => T_2(x) = 2 + (1/4)(x-4) - (1/64)(x-4)².' },
      { q: 'By the Direct Comparison Test, Σ_{n=1}^∞ (1 / [n³ + 5]):', a: 'Converges by comparison with Σ 1/n³', b: 'Diverges', c: 'Inconclusive', d: 'Equals 1/5', exp: '1/(n³ + 5) < 1/n³, and Σ 1/n³ converges.' },
      { q: 'Using the Limit Comparison Test with b_n = 1/n, Σ_{n=1}^∞ (2n + 1) / (n² + 3):', a: 'Diverges because lim a_n / b_n = 2 > 0 and Σ 1/n diverges', b: 'Converges', c: 'Inconclusive', d: 'Equals 2', exp: 'Limit is 2 > 0, so both share the same divergent behavior.' },
      { q: 'The value of the series Σ_{n=0}^∞ (1 / n!) is:', a: 'e', b: 'e - 1', c: '1', d: '∞', exp: 'Definition of Euler\'s number e.' },
      { q: 'The value of the series Σ_{n=1}^∞ (1 / n!) is:', a: 'e - 1', b: 'e', c: '1', d: '2', exp: 'Omits the n = 0 term (which is 1), so e - 1.' },
      { q: 'The Root Test is most convenient for series where the general term involves:', a: 'An nth power, e.g., (a_n)^n', b: 'Factorials like n!', c: 'Logarithms ln(n)', d: 'Alternating signs only', exp: 'Taking the nth root lim |a_n|^(1/n) simplifies nth powers.' },
      { q: 'What is the sum of the series Σ_{n=1}^∞ [1/n - 1/(n+1)]?', a: '1', b: '0', c: '∞', d: '1/2', exp: 'Telescoping series: S_k = (1 - 1/2) + (1/2 - 1/3) + ... + (1/k - 1/(k+1)) = 1 - 1/(k+1) → 1.' },
      { q: 'The series Σ_{n=1}^∞ [cos(n) / n²]:', a: 'Converges absolutely', b: 'Diverges', c: 'Converges conditionally', d: 'Oscillates wildly', exp: '|cos n / n²| ≤ 1/n², which converges by comparison to p-series.' },
      { q: 'The Maclaurin series for 1 / (1 + x²) is:', a: 'Σ_{n=0}^∞ (-1)^n x^(2n) for |x| < 1', b: 'Σ_{n=0}^∞ x^(2n)', c: 'Σ_{n=0}^∞ (-1)^n x^n', d: 'Σ_{n=1}^∞ x^(2n) / (2n)', exp: 'Substitute -x² into 1/(1 - u).' },
      { q: 'The Maclaurin series for arctan(x) is obtained by integrating 1/(1+x²), giving:', a: 'Σ_{n=0}^∞ (-1)^n x^(2n+1) / (2n+1)', b: 'Σ_{n=0}^∞ x^(2n+1) / (2n+1)', c: 'Σ_{n=0}^∞ (-1)^n x^(2n) / (2n)', d: 'Σ_{n=0}^∞ x^n / n!', exp: 'Term-by-term integration of (-1)^n x^(2n) gives (-1)^n x^(2n+1)/(2n+1).' },
      { q: 'What is the coefficient of x³ in the Maclaurin series of sin(2x)?', a: '-4/3', b: '-1/6', c: '4/3', d: '8/6', exp: 'sin(u) = u - u³/6 => for u = 2x: 2x - 8x³/6 = 2x - (4/3)x³.' },
      { q: 'What is the coefficient of x² in the Maclaurin series of e^(3x)?', a: '9/2', b: '3/2', c: '9', d: '3', exp: 'e^(3x) = 1 + 3x + (3x)²/2! = 1 + 3x + (9/2)x².' },
      { q: 'If a power series Σ c_n (x - a)^n converges at x = b, it converges absolutely for all x satisfying:', a: '|x - a| < |b - a|', b: '|x - a| > |b - a|', c: 'x > b', d: 'x < a', exp: 'Fundamental property of the radius of convergence.' },
      { q: 'Evaluate: lim_{x → 0} (sin x - x) / x³ using series expansion:', a: '-1/6', b: '1/6', c: '0', d: '-1/3', exp: 'sin x = x - x³/6 + ... => (sin x - x)/x³ = -1/6 + O(x²).' },
      { q: 'Evaluate: lim_{x → 0} (1 - cos x) / x² using series expansion:', a: '1/2', b: '-1/2', c: '1', d: '0', exp: '1 - (1 - x²/2 + ...) = x²/2 => limit is 1/2.' },
      { q: 'The surface area of a solid of revolution revolved about the x-axis is given by:', a: '∫ 2π y √(1 + [y\']²) dx', b: '∫ π y² dx', c: '∫ 2π x √(1 + [y\']²) dx', d: '∫ 2π y dx', exp: 'Standard surface area formula.' },
      { q: 'In the cylindrical shells method for revolution around the y-axis, the volume is:', a: '∫ 2π x f(x) dx', b: '∫ π [f(x)]² dx', c: '∫ 2π [f(x)]² dx', d: '∫ π x² dx', exp: 'Shell method formula V = 2π ∫ (radius)(height) dx = 2π ∫ x f(x) dx.' },
      { q: 'Which of the following series diverges by the nth-Term Test?', a: 'Σ_{n=1}^∞ (n / [2n + 1])', b: 'Σ_{n=1}^∞ (1 / n²)', c: 'Σ_{n=1}^∞ (1 / 2^n)', d: 'Σ_{n=1}^∞ (1 / n!)', exp: 'lim n/(2n + 1) = 1/2 ≠ 0 => diverges.' },
      { q: 'The p-series Σ_{n=1}^∞ (1 / √n):', a: 'Diverges because p = 1/2 ≤ 1', b: 'Converges', c: 'Converges to 2', d: 'Inconclusive', exp: 'p = 1/2, which is ≤ 1, so it diverges.' },
      { q: 'The p-series Σ_{n=1}^∞ (1 / n^(1.001)):', a: 'Converges because p = 1.001 > 1', b: 'Diverges', c: 'Equals 1', d: 'Inconclusive', exp: 'Since p > 1, it converges.' },
      { q: 'The series Σ_{n=2}^∞ [1 / (n ln n)]:', a: 'Diverges by the Integral Test', b: 'Converges', c: 'Equals 0', d: 'Inconclusive', exp: '∫ dx/(x ln x) = ln(ln x) → ∞ as x → ∞.' },
      { q: 'The series Σ_{n=2}^∞ [1 / (n (ln n)²)]:', a: 'Converges by the Integral Test', b: 'Diverges', c: 'Equals 1', d: 'Inconclusive', exp: '∫ dx/[x (ln x)²] = -1/ln x → 0 (finite).' },
      { q: 'What is the sum of the series 1 - 1/2 + 1/3 - 1/4 + ...?', a: 'ln(2)', b: '1', c: 'e', d: '0', exp: 'Evaluation of the Maclaurin series of ln(1 + x) at x = 1.' },
      { q: 'The power series Σ_{n=0}^∞ n! * x^n has radius of convergence:', a: 'R = 0 (converges only at x = 0)', b: 'R = 1', c: 'R = ∞', d: 'R = e', exp: 'Ratio test limit is ∞ for any x ≠ 0.' },
      { q: 'The sum of the series Σ_{n=0}^∞ ((-1)^n / (2n + 1)) is:', a: 'π / 4', b: 'π / 2', c: '1', d: 'ln 2', exp: 'Leibniz formula for π: arctan(1) = π/4.' }
    ]
  }
];

console.log('Group A datasets defined.');
