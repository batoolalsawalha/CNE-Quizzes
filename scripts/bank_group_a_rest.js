const { createQuestion } = require('./bank_factory');

function getGroupARestQuestions() {
  const qs = [];

  // ==========================================
  // LINEAR ALGEBRA (subj-linear)
  // Mid: 32 (Systems of equations, REF/RREF, Gauss-Jordan, Matrix algebra, Inverses, Determinants, Cramer's rule)
  // Final: 52 (Vector spaces, Subspaces, Linear independence, Basis/Dimension, Rank-Nullity, Eigenvalues/Eigenvectors, Diagonalization, Orthogonality, Gram-Schmidt)
  // ==========================================
  const linMid = [
    { q: 'A system of linear equations is consistent if it has:', c: 'At least one solution (unique or infinitely many)', w1: 'Exactly one solution only', w2: 'No solutions', w3: 'Only the zero solution', exp: 'Consistency means the solution set is non-empty.', d: 'Easy' },
    { q: 'Which elementary row operation does NOT change the solution set of a linear system?', c: 'Multiplying a row by a non-zero constant, row addition, or row swapping', w1: 'Multiplying a row by zero', w2: 'Squaring the elements of a row', w3: 'Adding a constant scalar to all elements of a row', exp: 'Only elementary row operations preserve the solution space.', d: 'Easy' },
    { q: 'In Reduced Row Echelon Form (RREF), each leading entry (pivot) in a non-zero row is:', c: '1, and it is the only non-zero entry in its column', w1: 'Any non-zero real number', w2: 'Located on the main diagonal only', w3: '1, but other numbers can be in its column', exp: 'RREF requires leading 1s and zeros above and below each pivot.', d: 'Easy' },
    { q: 'If an augmented matrix [A | b] has a row [0 0 ... 0 | k] with k ≠ 0, the system has:', c: 'No solution (inconsistent)', w1: 'Infinitely many solutions', w2: 'A unique solution', w3: 'Trivial solution only', exp: 'Corresponds to the contradiction 0 = k.', d: 'Easy' },
    { q: 'If A is an n x n invertible matrix, which statement is FALSE?', c: 'det(A) = 0', w1: 'Rank(A) = n', w2: 'The RREF of A is the identity matrix I_n', w3: 'The homogeneous system Ax = 0 has only the trivial solution', exp: 'Invertible implies det(A) ≠ 0.', d: 'Easy' },
    { q: 'If A and B are invertible n x n matrices, then (A B)⁻¹ equals:', c: 'B⁻¹ A⁻¹', w1: 'A⁻¹ B⁻¹', w2: 'B A⁻¹', w3: '(A + B)⁻¹', exp: 'Shoe-and-sock property of inverses: (AB)⁻¹ = B⁻¹ A⁻¹.', d: 'Easy' },
    { q: 'For any square matrices A and B of the same size, (A B)^T equals:', c: 'B^T A^T', w1: 'A^T B^T', w2: 'B A^T', w3: '(B^T)⁻¹', exp: 'Transpose of a product reverses order: (AB)^T = B^T A^T.', d: 'Easy' },
    { q: 'A square matrix A is symmetric if:', c: 'A^T = A', w1: 'A^T = -A', w2: 'A⁻¹ = A', w3: 'det(A) = 0', exp: 'Definition of symmetric matrix.', d: 'Easy' },
    { q: 'A square matrix A is skew-symmetric if:', c: 'A^T = -A', w1: 'A^T = A', w2: 'det(A) = 1', w3: 'A = -I', exp: 'Definition: entries satisfy a_ji = -a_ij.', d: 'Easy' },
    { q: 'The trace of a square matrix A, tr(A), is defined as:', c: 'The sum of the diagonal entries', w1: 'The product of the diagonal entries', w2: 'The determinant of A', w3: 'The maximum entry of A', exp: 'tr(A) = Σ a_ii.', d: 'Easy' },
    { q: 'If A is a 3x3 matrix with det(A) = 5, then det(2A) equals:', c: '40', w1: '10', w2: '30', w3: '5', exp: 'det(kA) = k^n det(A) => 2³ * 5 = 8 * 5 = 40.', d: 'Medium' },
    { q: 'If det(A) = 4, then det(A⁻¹) is equal to:', c: '1/4', w1: '-4', w2: '4', w3: '16', exp: 'det(A⁻¹) = 1 / det(A) = 1/4.', d: 'Easy' },
    { q: 'If det(A) = -3, what is det(A^T)?', c: '-3', w1: '3', w2: '-1/3', w3: '0', exp: 'det(A^T) = det(A) for any square matrix.', d: 'Easy' },
    { q: 'If a matrix has two identical rows, its determinant is:', c: '0', w1: '1', w2: '-1', w3: 'Undefined', exp: 'Subtracting one identical row from the other produces a zero row.', d: 'Easy' },
    { q: 'Multiplying a single row of matrix A by scalar k produces matrix B. Then det(B) =', c: 'k * det(A)', w1: 'k^n * det(A)', w2: 'det(A) / k', w3: 'det(A) + k', exp: 'Determinant is linear in each row individually.', d: 'Easy' },
    { q: 'Swapping two rows of a square matrix A multiplies its determinant by:', c: '-1', w1: '1', w2: '0', w3: '2', exp: 'Row exchange reverses the sign of determinant.', d: 'Easy' },
    { q: 'Adding a multiple of one row to another row of a matrix:', c: 'Leaves the determinant unchanged', w1: 'Multiplies the determinant by the scalar', w2: 'Makes the determinant zero', w3: 'Negates the determinant', exp: 'Elementary row operation of type III preserves determinant.', d: 'Easy' },
    { q: 'The determinant of an upper triangular matrix is:', c: 'The product of its main diagonal entries', w1: 'The sum of its main diagonal entries', w2: 'Always 1', w3: 'Always 0', exp: 'Cofactor expansion along columns yields product of diagonal elements.', d: 'Easy' },
    { q: 'Cramer\'s rule can be used to solve Ax = b if and only if:', c: 'A is square and det(A) ≠ 0', w1: 'det(A) = 0', w2: 'The system has more unknowns than equations', w3: 'b = 0', exp: 'Requires a unique solution, hence det(A) ≠ 0.', d: 'Easy' },
    { q: 'The formula for the inverse of an invertible matrix A in terms of its adjoint is:', c: 'A⁻¹ = (1 / det(A)) * adj(A)', w1: 'A⁻¹ = det(A) * adj(A)', w2: 'A⁻¹ = (1 / det(A)) * C', w3: 'A⁻¹ = adj(A)^T', exp: 'Standard adjoint formula for inverse matrix.', d: 'Easy' },
    { q: 'Evaluate the determinant of | [2, 3], [1, 4] |:', c: '5', w1: '11', w2: '8', w3: '-5', exp: 'ad - bc = (2)(4) - (3)(1) = 8 - 3 = 5.', d: 'Easy' },
    { q: 'Find the inverse of [ [1, 2], [3, 4] ]:', c: '[ [-2, 1], [1.5, -0.5] ]', w1: '[ [4, -2], [-3, 1] ]', w2: '[ [-4, 2], [3, -1] ]', w3: '[ [1, -2], [-3, 4] ]', exp: 'det = 4 - 6 = -2. (1/-2)[ [4, -2], [-3, 1] ] = [ [-2, 1], [1.5, -0.5] ].', d: 'Medium' },
    { q: 'If A is 2x3 and B is 3x4, the product AB has dimension:', c: '2 x 4', w1: '3 x 3', w2: '4 x 2', w3: 'Undefined', exp: '(m x k) * (k x n) = (m x n) => 2 x 4.', d: 'Easy' },
    { q: 'Is matrix multiplication commutative in general?', c: 'No, AB ≠ BA in general', w1: 'Yes, always AB = BA', w2: 'Only for 2x2 matrices', w3: 'Only when det(A) = 1', exp: 'Matrix multiplication is associative and distributive, but not commutative.', d: 'Easy' },
    { q: 'A homogeneous system of m linear equations with n unknowns where m < n always has:', c: 'Infinitely many non-trivial solutions', w1: 'Only the trivial solution', w2: 'No solutions', w3: 'A unique solution', exp: 'More variables than equations ensures free variables in homogeneous systems.', d: 'Medium' },
    { q: 'An elementary matrix E is obtained by:', c: 'Performing a single elementary row operation on the identity matrix', w1: 'Multiplying two diagonal matrices', w2: 'Setting all off-diagonal entries to zero', w3: 'Inverting a 2x2 matrix', exp: 'Definition of elementary matrices.', d: 'Easy' },
    { q: 'If A is orthogonal, then A^T equals:', c: 'A⁻¹', w1: 'A', w2: '-A', w3: 'I', exp: 'Orthogonal matrix definition: A^T A = I => A^T = A⁻¹.', d: 'Easy' },
    { q: 'For an orthogonal matrix A, det(A) is always:', c: '±1', w1: '0', w2: '2', w3: 'Any positive real number', exp: 'det(A A^T) = det(I) = 1 => (det A)² = 1 => det A = ±1.', d: 'Easy' },
    { q: 'The minor M_ij of entry a_ij in matrix A is defined as:', c: 'The determinant of the submatrix obtained by deleting row i and column j', w1: 'The entry a_ij itself', w2: 'The cofactor C_ij without sign', w3: 'The trace of submatrix', exp: 'Standard definition of matrix minor.', d: 'Easy' },
    { q: 'The cofactor C_ij is related to the minor M_ij by:', c: 'C_ij = (-1)^(i + j) * M_ij', w1: 'C_ij = (-1)^(i * j) * M_ij', w2: 'C_ij = M_ij', w3: 'C_ij = -M_ij', exp: 'Sign factor (-1)^(i+j) defines cofactor.', d: 'Easy' },
    { q: 'If det(A) ≠ 0, the columns of A are:', c: 'Linearly independent', w1: 'Linearly dependent', w2: 'Orthogonal', w3: 'Equal to zero', exp: 'Non-zero determinant is equivalent to linearly independent columns.', d: 'Easy' },
    { q: 'What is the determinant of the 3x3 identity matrix I₃?', c: '1', w1: '3', w2: '0', w3: 'Undefined', exp: 'det(I) = 1.', d: 'Easy' }
  ];

  const linFinal = [
    { q: 'A subset W of a vector space V is a subspace if and only if:', c: 'W contains the zero vector and is closed under addition and scalar multiplication', w1: 'W is finite', w2: 'W contains only unit vectors', w3: 'dim(W) = dim(V)', exp: 'Subspace criteria: non-empty (0 in W), closed under + and scalar mult.', d: 'Easy' },
    { q: 'The vectors v₁, v₂, ..., v_k are linearly independent if c₁v₁ + ... + c_k v_k = 0 implies:', c: 'c₁ = c₂ = ... = c_k = 0 (only trivial coefficients)', w1: 'At least one c_i ≠ 0', w2: 'c₁ + c₂ + ... + c_k = 1', w3: 'v₁ = v₂', exp: 'Linear independence definition.', d: 'Easy' },
    { q: 'A set of vectors B in V is a basis for V if:', c: 'B is linearly independent and spans V', w1: 'B contains orthogonal vectors only', w2: 'B spans V but may be dependent', w3: 'The number of vectors in B is 3', exp: 'Definition of basis.', d: 'Easy' },
    { q: 'The dimension of a vector space V is defined as:', c: 'The number of vectors in any basis of V', w1: 'The number of vectors in V', w2: 'The rank of the zero matrix', w3: 'The maximum length of a vector in V', exp: 'Dimension is the cardinality of any basis.', d: 'Easy' },
    { q: 'The dimension of Rⁿ as a real vector space is:', c: 'n', w1: 'n - 1', w2: 'n²', w3: '2n', exp: 'Standard basis {e₁, e₂, ..., e_n} has n vectors.', d: 'Easy' },
    { q: 'The dimension of the vector space of 2x2 real matrices M_{2x2}(R) is:', c: '4', w1: '2', w2: '1', w3: '8', exp: 'Four independent matrix elements [ [1,0],[0,0] ], etc.', d: 'Easy' },
    { q: 'The dimension of P_n (polynomials of degree at most n) is:', c: 'n + 1', w1: 'n', w2: 'n - 1', w3: '2n', exp: 'Basis is {1, x, x², ..., x^n}, which has n + 1 elements.', d: 'Easy' },
    { q: 'For an m x n matrix A, the Rank-Nullity Theorem states that:', c: 'Rank(A) + Nullity(A) = n (number of columns)', w1: 'Rank(A) + Nullity(A) = m (number of rows)', w2: 'Rank(A) = Nullity(A)', w3: 'Rank(A) * Nullity(A) = n', exp: 'Dimension of column space + dimension of null space = n.', d: 'Medium' },
    { q: 'The null space of an m x n matrix A, Null(A), consists of all x such that:', c: 'A x = 0', w1: 'A x = b for b ≠ 0', w2: 'det(A) = 0', w3: 'x = 0 only', exp: 'Null space is the solution space of the homogeneous system Ax = 0.', d: 'Easy' },
    { q: 'The column space of A, Col(A), is spanned by:', c: 'The columns of A', w1: 'The rows of A', w2: 'The null space vectors', w3: 'The eigenvectors of A', exp: 'Col(A) is the span of column vectors.', d: 'Easy' },
    { q: 'Row operations on matrix A preserve:', c: 'The row space and null space of A (but NOT column space)', w1: 'The column space of A', w2: 'The determinant of A', w3: 'The individual entries', exp: 'Elementary row operations alter column vectors but preserve row combinations.', d: 'Medium' },
    { q: 'A scalar λ is an eigenvalue of square matrix A if there exists a non-zero vector v such that:', c: 'A v = λ v', w1: 'A v = 0', w2: 'A + λ I = 0', w3: 'det(A) = λ', exp: 'Definition of eigenvalue and eigenvector.', d: 'Easy' },
    { q: 'The eigenvalues of matrix A are the roots of the characteristic equation:', c: 'det(A - λ I) = 0', w1: 'det(A + λ I) = 1', w2: 'tr(A - λ I) = 0', w3: 'A - λ I = 0', exp: 'Non-trivial solutions to (A - λ I)v = 0 require singular A - λ I.', d: 'Easy' },
    { q: 'The eigenvalues of a triangular or diagonal matrix are simply:', c: 'Its main diagonal entries', w1: 'The sum of all its entries', w2: 'The roots of x² - 1 = 0', w3: 'All zero', exp: 'det(A - λ I) is the product of (a_ii - λ).', d: 'Easy' },
    { q: 'The sum of the eigenvalues of an n x n matrix A equals:', c: 'The trace of A, tr(A)', w1: 'The determinant of A', w2: 'The rank of A', w3: '0', exp: 'tr(A) = Σ λ_i.', d: 'Easy' },
    { q: 'The product of the eigenvalues of an n x n matrix A equals:', c: 'det(A)', w1: 'tr(A)', w2: '1', w3: 'Rank(A)', exp: 'det(A) = Π λ_i.', d: 'Easy' },
    { q: 'An n x n matrix A is diagonalizable if and only if:', c: 'A has n linearly independent eigenvectors', w1: 'A is invertible', w2: 'det(A) ≠ 0', w3: 'All entries of A are positive', exp: 'Diagonalization requires eigenvector matrix P to be invertible.', d: 'Medium' },
    { q: 'If an n x n matrix A has n distinct real eigenvalues, then A is:', c: 'Guaranteed to be diagonalizable', w1: 'Guaranteed to be symmetric', w2: 'Invertible always', w3: 'Defective', exp: 'Distinct eigenvalues correspond to linearly independent eigenvectors.', d: 'Medium' },
    { q: 'If A is diagonalizable as A = P D P⁻¹, then A^k equals:', c: 'P D^k P⁻¹', w1: 'P^k D P^(-k)', w2: 'D^k', w3: 'k P D P⁻¹', exp: 'Powers of diagonal matrices: D^k has diagonal entries λ_i^k.', d: 'Medium' },
    { q: 'A real symmetric matrix always has:', c: 'Real eigenvalues and an orthonormal basis of eigenvectors', w1: 'Complex eigenvalues', w2: 'det(A) = 0', w3: 'Zero trace', exp: 'Spectral Theorem for real symmetric matrices.', d: 'Medium' },
    { q: 'Two vectors u and v in Rⁿ are orthogonal if and only if:', c: 'u · v = 0', w1: 'u · v = 1', w2: 'u = -v', w3: '||u|| = ||v||', exp: 'Dot product is zero for orthogonal vectors.', d: 'Easy' },
    { q: 'The norm (length) of vector v = [3, 4] is:', c: '5', w1: '7', w2: '25', w3: '1', exp: '√(3² + 4²) = √25 = 5.', d: 'Easy' },
    { q: 'The Cauchy-Schwarz inequality states that for all vectors u, v:', c: '|u · v| ≤ ||u|| * ||v||', w1: '|u · v| ≥ ||u|| * ||v||', w2: 'u · v = ||u|| + ||v||', w3: '||u + v|| = ||u|| + ||v||', exp: 'Fundamental inequality with equality if and only if u and v are parallel.', d: 'Easy' },
    { q: 'The Gram-Schmidt process is used to:', c: 'Convert any basis into an orthogonal (or orthonormal) basis', w1: 'Compute matrix determinants', w2: 'Find matrix eigenvalues', w3: 'Invert a triangular matrix', exp: 'Standard algorithm for orthogonalization.', d: 'Easy' },
    { q: 'In the Gram-Schmidt process, the orthogonal component of v₂ onto u₁ is:', c: 'v₂ - [ (v₂ · u₁) / (u₁ · u₁) ] * u₁', w1: 'v₂ + u₁', w2: '[ (v₂ · u₁) / ||u₁|| ]', w3: 'v₂ - u₁', exp: 'Subtract the projection of v₂ onto u₁.', d: 'Medium' },
    { q: 'A linear transformation T: V → W satisfies:', c: 'T(u + v) = T(u) + T(v) and T(c u) = c T(u)', w1: 'T(u v) = T(u) T(v)', w2: 'T(0) = 1', w3: 'T is invertible', exp: 'Definition of linearity.', d: 'Easy' },
    { q: 'For any linear transformation T: V → W, T(0_V) must equal:', c: '0_W', w1: '1', w2: 'V', w3: 'Undefined', exp: 'T(0) = T(0 + 0) = T(0) + T(0) => T(0) = 0.', d: 'Easy' },
    { q: 'The kernel (null space) of a linear transformation T: V → W is:', c: '{ v ∈ V | T(v) = 0_W }', w1: '{ w ∈ W | w = T(v) }', w2: 'V', w3: 'The zero vector only', exp: 'Definition of ker(T).', d: 'Easy' },
    { q: 'The range (image) of a linear transformation T: V → W is:', c: '{ w ∈ W | w = T(v) for some v ∈ V }', w1: 'ker(T)', w2: 'W', w3: '{ 0 }', exp: 'Definition of range(T).', d: 'Easy' },
    { q: 'A linear transformation T: V → W is one-to-one (injective) if and only if:', c: 'ker(T) = { 0 }', w1: 'range(T) = W', w2: 'dim(V) = dim(W)', w3: 'det(T) = 1', exp: 'T(u) = T(v) => T(u - v) = 0 => u - v = 0 if ker(T) is trivial.', d: 'Medium' },
    { q: 'An isomorphism between vector spaces V and W is a linear transformation that is:', c: 'Both one-to-one and onto (bijective)', w1: 'Invertible only on a subspace', w2: 'Non-linear', w3: 'Symmetric', exp: 'Definition of vector space isomorphism.', d: 'Easy' },
    { q: 'Two finite-dimensional vector spaces over R are isomorphic if and only if:', c: 'They have the same dimension', w1: 'They have the same basis', w2: 'Their vectors have length 1', w3: 'Both are R²', exp: 'Fundamental classification theorem for finite-dimensional spaces.', d: 'Medium' },
    { q: 'Find the eigenvalues of A = [ [2, 0], [0, 5] ]:', c: '2 and 5', w1: '0 and 10', w2: '7 and 10', w3: '1 and 1', exp: 'Diagonal entries are the eigenvalues.', d: 'Easy' },
    { q: 'Find the eigenvalues of A = [ [0, 1], [-2, 3] ]:', c: '1 and 2', w1: '0 and 3', w2: '-1 and -2', w3: '3 and -2', exp: 'det = λ² - 3λ + 2 = (λ - 1)(λ - 2) = 0 => λ = 1, 2.', d: 'Medium' },
    { q: 'The eigenspace corresponding to eigenvalue λ is:', c: 'The null space of (A - λ I)', w1: 'The column space of A', w2: 'The row space of A', w3: 'The span of all eigenvectors', exp: 'E_λ = { v | (A - λ I)v = 0 } = Null(A - λ I).', d: 'Easy' },
    { q: 'The algebraic multiplicity of an eigenvalue λ is:', c: 'Its multiplicity as a root of the characteristic polynomial', w1: 'The dimension of its eigenspace', w2: 'The number of rows of A', w3: 'The trace of A', exp: 'Definition of algebraic multiplicity.', d: 'Easy' },
    { q: 'The geometric multiplicity of an eigenvalue λ is:', c: 'dim(Null(A - λ I)), the dimension of its eigenspace', w1: 'Its multiplicity in the characteristic polynomial', w2: 'Rank(A)', w3: 'Always 1', exp: 'Definition of geometric multiplicity.', d: 'Medium' },
    { q: 'For any eigenvalue, which relation between multiplicities always holds?', c: '1 ≤ Geometric Multiplicity ≤ Algebraic Multiplicity', w1: 'Geometric Multiplicity > Algebraic Multiplicity', w2: 'Geometric Multiplicity = n', w3: 'Algebraic Multiplicity = 1 always', exp: 'Fundamental theorem of eigenspace dimensions.', d: 'Medium' },
    { q: 'A matrix A is defective if:', c: 'At least one eigenvalue has geometric multiplicity strictly less than algebraic multiplicity', w1: 'det(A) = 0', w2: 'A is not invertible', w3: 'A has complex eigenvalues', exp: 'Defective matrices lack a full set of n linearly independent eigenvectors.', d: 'Medium' },
    { q: 'The standard matrix for counter-clockwise rotation by angle θ in R² is:', c: '[ [cos θ, -sin θ], [sin θ, cos θ] ]', w1: '[ [cos θ, sin θ], [-sin θ, cos θ] ]', w2: '[ [sin θ, cos θ], [cos θ, -sin θ] ]', w3: '[ [1, 0], [0, 1] ]', exp: 'T(e₁) = [cos θ, sin θ]^T, T(e₂) = [-sin θ, cos θ]^T.', d: 'Medium' },
    { q: 'The standard matrix for reflection across the x-axis in R² is:', c: '[ [1, 0], [0, -1] ]', w1: '[ [-1, 0], [0, 1] ]', w2: '[ [0, 1], [1, 0] ]', w3: '[ [0, -1], [-1, 0] ]', exp: 'Transforms (x, y) into (x, -y).', d: 'Easy' },
    { q: 'An orthogonal projection matrix P onto a subspace satisfies:', c: 'P² = P and P^T = P', w1: 'P² = 0', w2: 'P⁻¹ = P', w3: 'det(P) = -1', exp: 'Idempotent (P² = P) and symmetric (P^T = P) defines orthogonal projection.', d: 'Medium' },
    { q: 'The least-squares solution to an inconsistent system A x = b satisfies the normal equations:', c: 'A^T A x = A^T b', w1: 'A x = b', w2: 'A A^T x = b', w3: 'x = (A^T)⁻¹ b', exp: 'Normal equations minimize ||Ax - b||².', d: 'Medium' },
    { q: 'If A is m x n with linearly independent columns, then A^T A is:', c: 'Symmetric, positive definite, and invertible', w1: 'Singular', w2: 'Skew-symmetric', w3: 'm x m', exp: 'Rank(A^T A) = Rank(A) = n, so n x n matrix A^T A is invertible.', d: 'Medium' },
    { q: 'The singular values σ_i of matrix A are:', c: 'The square roots of the eigenvalues of A^T A', w1: 'The eigenvalues of A', w2: 'The entries of A', w3: 'The determinants of minors', exp: 'σ_i = √(λ_i(A^T A)).', d: 'Hard' },
    { q: 'The matrix A = [ [1, 2], [2, 4] ] has rank:', c: '1', w1: '2', w2: '0', w3: '4', exp: 'Row 2 is 2 * Row 1, so there is only 1 independent row.', d: 'Easy' },
    { q: 'The nullity of A = [ [1, 2], [2, 4] ] is:', c: '1', w1: '2', w2: '0', w3: '-1', exp: 'Rank + Nullity = n => 1 + Nullity = 2 => Nullity = 1.', d: 'Easy' },
    { q: 'Which of the following is a subspace of R³?', c: '{ (x, y, z) | x + y + z = 0 }', w1: '{ (x, y, z) | x + y + z = 1 }', w2: '{ (x, y, z) | x ≥ 0 }', w3: '{ (x, y, z) | x² + y² = z }', exp: 'Plane through the origin containing zero vector is a subspace.', d: 'Medium' },
    { q: 'What is the dimension of the subspace spanned by [1, 0, 0] and [2, 0, 0] in R³?', c: '1', w1: '2', w2: '3', w3: '0', exp: 'The second vector is a scalar multiple (2 * v₁), so dimension is 1.', d: 'Easy' },
    { q: 'The cross product u x v is defined only in:', c: 'R³ (and R⁷)', w1: 'R²', w2: 'R⁴', w3: 'Any dimension Rⁿ', exp: 'Standard vector cross product producing an orthogonal vector exists in R³.', d: 'Easy' },
    { q: 'If u · v = 0 and u x v = 0 for non-zero vectors u and v, then:', c: 'Impossible (sin θ = 0 and cos θ = 0 cannot happen simultaneously)', w1: 'u is parallel to v', w2: 'u is perpendicular to v', w3: 'u = v', exp: 'Cannot be simultaneously parallel (cross = 0) and perpendicular (dot = 0).', d: 'Medium' },
    { q: 'Cayley-Hamilton Theorem states that every square matrix A satisfies:', c: 'Its own characteristic equation: p(A) = 0', w1: 'A² = I', w2: 'A^T = A', w3: 'tr(A) = det(A)', exp: 'If p(λ) = det(A - λI), then p(A) is the zero matrix.', d: 'Medium' }
  ];

  linMid.forEach((it, idx) => qs.push(createQuestion(`LIN-MID-${String(idx + 1).padStart(3, '0')}`, 'subj-linear', false, it.q, it.c, it.w1, it.w2, it.w3, it.exp, it.d, 'Linear 2026 mid.pdf', idx)));
  linFinal.forEach((it, idx) => qs.push(createQuestion(`LIN-FIN-${String(idx + 1).padStart(3, '0')}`, 'subj-linear', true, it.q, it.c, it.w1, it.w2, it.w3, it.exp, it.d, 'Final T1.2023-2024.pdf', idx)));

  return qs;
}

module.exports = { getGroupARestQuestions };
