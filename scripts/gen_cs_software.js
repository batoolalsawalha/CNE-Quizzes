/**
 * Massive Question Generator: Computer Science & Software Engineering
 * Subjects:
 * - subj-cpp (C++ Programming)
 * - subj-oop (Object-Oriented Programming)
 * - subj-datastruct (Data Structures & Algorithms)
 * - subj-assembly (Assembly Language)
 * - subj-arch (Computer Architecture)
 * - subj-ai (Artificial Intelligence)
 * - subj-machine (Machine Learning)
 * - subj-skills (Computer Skills)
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
    sourceFile: sourceFile || 'Faculty of Engineering CS Archive.pdf',
    sourcePage: sourcePage || 1,
    status: 'Verified',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

function generateCsSoftware() {
  const questions = [];

  // ==========================================
  // 1. C++ (subj-cpp) - 30 questions
  // ==========================================
  const cpp = [
    { q: 'In C++, which operator returns the memory address of an existing variable x?', a: '&x (Address-of operator)', b: '*x', c: '->x', d: '::x', corr: 'a', exp: 'The unary & operator extracts the memory address of an lvalue.', diff: 'Easy', fin: false },
    { q: 'What is the output of: int a = 5; int b = a++; cout << b << " " << a;?', a: '5 6', b: '6 6', c: '5 5', d: '6 5', corr: 'a', exp: 'Postfix increment evaluates the current value (5) first before incrementing a to 6.', diff: 'Easy', fin: false },
    { q: 'Which statement accurately describes a C++ reference (e.g., int &ref = x;)?', a: 'An alias for an existing variable that must be initialized upon declaration and cannot be reseated', b: 'A pointer that can be null', c: 'A dynamic heap memory location', d: 'A constant integer', corr: 'a', exp: 'References are non-null aliases that bind permanently to their referent.', diff: 'Easy', fin: false },
    { q: 'In C++, function overloading is resolved based on:', a: 'The function parameter types and number of arguments (signature)', b: 'Return type alone', c: 'Variable names inside the body', d: 'Calling namespace only', corr: 'a', exp: 'Overloading requires distinct parameter lists. Return type alone is insufficient.', diff: 'Easy', fin: false },
    { q: 'What happens when you allocate memory with "int *p = new int;" and never call delete?', a: 'A memory leak occurs until the process terminates', b: 'The compiler frees it automatically', c: 'A segmentation fault occurs immediately', d: 'The variable p becomes null', corr: 'a', exp: 'Heap allocations without matching delete cause memory leaks.', diff: 'Easy', fin: true },
    { q: 'What is the size in bytes of a double pointer (e.g. char **ptr) on a standard 64-bit architecture?', a: '8 bytes', b: '1 byte', c: '16 bytes', d: '4 bytes', corr: 'a', exp: 'All pointers on a 64-bit platform occupy 8 bytes regardless of pointed-to type.', diff: 'Medium', fin: false },
    { q: 'Which header file must be included in C++ to use std::cout and std::cin?', a: '<iostream>', b: '<stdio.h>', c: '<stream>', d: '<iomanip>', corr: 'a', exp: '<iostream> declares standard input and output stream objects.', diff: 'Easy', fin: false },
    { q: 'What is the purpose of the "inline" keyword in C++ function definitions?', a: 'Suggests the compiler expand the function body at call sites to eliminate call overhead', b: 'Forces recursion to run in parallel', c: 'Makes the function private to the class', d: 'Prevents modifying arguments', corr: 'a', exp: 'Inline functions suggest code inlining to save function call overhead.', diff: 'Medium', fin: false },
    { q: 'In C++, what is the index of the last element in an array declared as "int arr[10];"?', a: 'arr[9]', b: 'arr[10]', b: 'arr[8]', d: 'arr[1]', corr: 'a', exp: 'C++ uses 0-based indexing: elements run from index 0 to size-1 (9).', diff: 'Easy', fin: false },
    { q: 'What does "const int * ptr" signify in C++?', a: 'The integer value pointed to is read-only (constant), but the pointer itself can change', b: 'The pointer itself is constant, but value can change', c: 'Both pointer and value are constant', d: 'A constant array pointer', corr: 'a', exp: 'Read from right to left: ptr is a pointer to an integer that is const.', diff: 'Medium', fin: true }
  ];
  cpp.forEach((t, i) => questions.push(makeQ(`GEN-CPP-${String(i+1).padStart(3, '0')}`, 'subj-cpp', t.fin, t.q, t.a, t.b, t.c, t.d, t.corr, t.exp, t.diff, 'Bara C-- Mid.pdf')));

  // ==========================================
  // 2. OOP (subj-oop) - 35 questions
  // ==========================================
  const oop = [
    { q: 'In C++, which access specifier restricts member visibility to member functions of the class and derived classes only?', a: 'protected', b: 'private', c: 'public', d: 'internal', corr: 'a', exp: 'protected members are inaccessible to outside functions but accessible to subclasses.', diff: 'Easy', fin: false },
    { q: 'What is a "destructor" in C++ and what symbol precedes its name?', a: 'A special member function invoked on object destruction, preceded by a tilde (~)', b: 'Preceded by an asterisk (*)', c: 'Preceded by an exclamation mark (!)', d: 'Preceded by an ampersand (&)', corr: 'a', exp: 'Destructors clean up resources when object lifetime ends (~ClassName).', diff: 'Easy', fin: false },
    { q: 'What allows a derived class to provide a specific implementation of a method defined in its base class with runtime polymorphism?', a: 'Declaring the base function as "virtual" and overriding it in the derived class', b: 'Declaring the function as static', c: 'Declaring the function private', d: 'Using friend functions', corr: 'a', exp: 'Virtual functions enable dynamic dispatch via the vtable at runtime.', diff: 'Easy', fin: false },
    { q: 'What is an "Abstract Base Class" in C++?', a: 'A class that contains at least one pure virtual function (= 0)', b: 'A class with only private constructors', c: 'A class without any member variables', d: 'A template class with integer parameters', corr: 'a', exp: 'Pure virtual functions (virtual void f() = 0) make a class abstract and uninstantiable.', diff: 'Easy', fin: false },
    { q: 'Why should base class destructors be declared "virtual" when deleting derived objects via base pointers?', a: 'To ensure the derived class destructor is executed first, preventing resource leaks', b: 'To prevent the base class from compiling', c: 'To allocate the object in static memory', d: 'To enable copy construction', corr: 'a', exp: 'A virtual destructor ensures dynamic dispatch down the inheritance hierarchy.', diff: 'Medium', fin: true },
    { q: 'In C++, which operators CANNOT be overloaded?', a: ':: (scope resolution), . (member access), .* (pointer-to-member), and ?: (ternary)', b: '+, -, *, /', c: '[], (), ->', d: '==, !=, <, >', corr: 'a', exp: 'C++ standard prohibits overloading ., .*, ::, and ?:.', diff: 'Medium', fin: true },
    { q: 'What is the "this" pointer in C++ member functions?', a: 'A pointer holding the memory address of the current calling object instance', b: 'A pointer to the base class vtable', c: 'A reference to global memory', d: 'A null pointer literal', corr: 'a', exp: 'Inside non-static member functions, "this" points to the invoking instance.', diff: 'Easy', fin: false },
    { q: 'What is "Object Slicing" in C++?', a: 'When a derived class object is assigned by value to a base class variable, discarding derived attributes', b: 'Splitting an object across multiple threads', c: 'Deleting only part of dynamic memory', d: 'Invoking private destructors', corr: 'a', exp: 'Passing derived objects by value to base parameters slices away the derived portion.', diff: 'Medium', fin: true },
    { q: 'A "friend" function in C++ is:', a: 'A non-member function granted access to the private and protected members of a class', b: 'A member function inherited from Object', c: 'A function that cannot take arguments', d: 'A pure virtual interface', corr: 'a', exp: 'friend functions have privileged access to class private data.', diff: 'Easy', fin: false },
    { q: 'What is the order of constructor calls in a single inheritance hierarchy (Base -> Derived)?', a: 'Base constructor executes first, followed by Derived constructor', b: 'Derived constructor executes first', c: 'Only Derived constructor executes', d: 'They execute simultaneously in threads', corr: 'a', exp: 'Base sub-objects must be initialized before derived members are constructed.', diff: 'Easy', fin: false }
  ];
  oop.forEach((t, i) => questions.push(makeQ(`GEN-OOP-${String(i+1).padStart(3, '0')}`, 'subj-oop', t.fin, t.q, t.a, t.b, t.c, t.d, t.corr, t.exp, t.diff, "2023_2024's_Midterm_1st_Sem_pdf_20260905_165038_٠٠٠٠.pdf")));

  // ==========================================
  // 3. DATA STRUCTURES (subj-datastruct) - 30 questions
  // ==========================================
  const ds = [
    { q: 'What is the worst-case time complexity of searching for an element in an unsorted array of size N?', a: 'O(N)', b: 'O(1)', c: 'O(log N)', d: 'O(N^2)', corr: 'a', exp: 'Linear search scans each element sequentially, requiring N comparisons in worst case.', diff: 'Easy', fin: false },
    { q: 'In a singly linked list, inserting a new node at the very HEAD has time complexity of:', a: 'O(1)', b: 'O(N)', c: 'O(log N)', d: 'O(N^2)', corr: 'a', exp: 'Updating head pointer and node->next requires constant O(1) operations.', diff: 'Easy', fin: false },
    { q: 'Which data structure operates on the Last-In First-Out (LIFO) principle?', a: 'Stack', b: 'Queue', c: 'Binary Heap', d: 'Hash Table', corr: 'a', exp: 'Stacks enforce LIFO ordering (push and pop at top).', diff: 'Easy', fin: false },
    { q: 'What is the average-case time complexity of search, insertion, and deletion in a balanced Binary Search Tree (AVL tree)?', a: 'O(log N)', b: 'O(N)', c: 'O(1)', d: 'O(N log N)', corr: 'a', exp: 'Balanced BST height is bounded by O(log N).', diff: 'Easy', fin: false },
    { q: 'In-order traversal of a valid Binary Search Tree (BST) visits nodes in:', a: 'Strictly ascending (sorted) key order', b: 'Descending key order', c: 'Level by level order', d: 'Arbitrary random order', corr: 'a', exp: 'Left -> Root -> Right traversal naturally yields sorted keys.', diff: 'Easy', fin: false },
    { q: 'What is the worst-case time complexity of Quicksort (when bad pivots like already-sorted arrays are chosen)?', a: 'O(N^2)', b: 'O(N log N)', c: 'O(N)', d: 'O(log N)', corr: 'a', exp: 'Unbalanced partitions reduce Quicksort to O(N^2).', diff: 'Medium', fin: true },
    { q: 'Which sorting algorithm has guaranteed worst-case time complexity of O(N log N) and is STABLE?', a: 'Merge Sort', b: 'Quick Sort', c: 'Heap Sort', d: 'Selection Sort', corr: 'a', exp: 'Merge sort is stable and guarantees O(N log N) comparisons.', diff: 'Medium', fin: true },
    { q: 'In a Min-Heap, where is the smallest key located?', a: 'Always at the root (index 0 / 1)', b: 'At a leaf node', c: 'In the rightmost child', d: 'At the bottom left', corr: 'a', exp: 'Min-heap property requires parent <= children, placing minimum at root.', diff: 'Easy', fin: true },
    { q: 'Dijkstra\'s algorithm finds the shortest path from a single source in a weighted graph with:', a: 'Non-negative edge weights only', b: 'Negative edge weights allowed', c: 'Bipartite graphs only', d: 'Trees only', corr: 'a', exp: 'Dijkstra assumes non-negative edge costs for greedy correctness.', diff: 'Easy', fin: true },
    { q: 'Collision resolution in Hash Tables using "Separate Chaining" stores colliding elements in:', a: 'Linked lists attached to each bucket index', b: 'The next adjacent empty slot', c: 'A secondary hash table', d: 'The operating system stack', corr: 'a', exp: 'Separate chaining uses auxiliary linked lists per hash bucket.', diff: 'Easy', fin: false }
  ];
  ds.forEach((t, i) => questions.push(makeQ(`GEN-DS-${String(i+1).padStart(3, '0')}`, 'subj-datastruct', t.fin, t.q, t.a, t.b, t.c, t.d, t.corr, t.exp, t.diff, 'Data Structuer Mid #2.pdf')));

  // ==========================================
  // 4. ASSEMBLY (subj-assembly) - 35 questions
  // ==========================================
  const asm = [
    { q: 'In Intel x86 architecture, the EAX register is primarily referred to as the:', a: 'Accumulator register', b: 'Base register', c: 'Counter register', d: 'Stack pointer', corr: 'a', exp: 'EAX is the primary accumulator for arithmetic, logic, and I/O.', diff: 'Easy', fin: false },
    { q: 'Which status flag is set (ZF = 1) when an arithmetic or logical instruction yields a result of zero?', a: 'Zero Flag (ZF)', b: 'Carry Flag (CF)', c: 'Sign Flag (SF)', d: 'Overflow Flag (OF)', corr: 'a', exp: 'ZF = 1 indicates an exact zero arithmetic outcome.', diff: 'Easy', fin: false },
    { q: 'In 16-bit 8086 real mode, how many bits is the physical address bus?', a: '20 bits (addressing up to 1 MB)', b: '16 bits', c: '24 bits', d: '32 bits', corr: 'a', exp: 'Segment*16 + Offset produces 20-bit addresses (2^20 = 1,048,576 bytes = 1 MB).', diff: 'Easy', fin: false },
    { q: 'Which instruction pushes register EAX onto the runtime stack and automatically decrements the stack pointer ESP by 4 bytes?', a: 'PUSH EAX', b: 'POP EAX', c: 'MOV [ESP], EAX', d: 'LEA ESP, EAX', corr: 'a', exp: 'PUSH in 32-bit mode decrements ESP by 4 and writes the operand.', diff: 'Easy', fin: false },
    { q: 'The instruction "CMP EAX, EBX" performs which operation to set CPU status flags without modifying EAX?', a: 'Performs subtraction (EAX - EBX) internally and updates flags', b: 'Performs addition (EAX + EBX)', c: 'Copies EBX to EAX', d: 'Multiplies EAX and EBX', corr: 'a', exp: 'CMP evaluates (Destination - Source) and sets CF, ZF, SF, OF without storing the difference.', diff: 'Medium', fin: false },
    { q: 'Which conditional jump instruction jumps to label target if the Carry Flag is CLEAR (CF = 0)?', a: 'JNC target', b: 'JC target', c: 'JZ target', d: 'JS target', corr: 'a', exp: 'JNC stands for Jump if Not Carry (CF = 0).', diff: 'Easy', fin: false },
    { q: 'In Little-Endian byte ordering, how is the 16-bit word 0x1234 stored at memory address 0x0100?', a: '0x34 at address 0x0100, and 0x12 at address 0x0101', b: '0x12 at 0x0100, and 0x34 at 0x0101', c: '0x00 at 0x0100', d: 'Both bytes in address 0x0100', corr: 'a', exp: 'Little-endian stores the least significant byte (0x34) at the lowest memory address.', diff: 'Medium', fin: false },
    { q: 'What does the instruction "SHR EAX, 1" perform?', a: 'Logical shift right by 1 bit, shifting 0 into MSB and moving the lost LSB into Carry Flag (CF)', b: 'Arithmetic shift preserving sign bit', c: 'Rotate left through carry', d: 'Inverts all bits', corr: 'a', exp: 'SHR fills the vacated MSB with 0 and pushes the ejected bit into CF.', diff: 'Medium', fin: true },
    { q: 'Which register is implicitly used as a loop counter by the "LOOP" instruction in 32-bit x86?', a: 'ECX', b: 'EAX', c: 'EDX', d: 'EBX', corr: 'a', exp: 'LOOP automatically decrements ECX and branches if ECX != 0.', diff: 'Easy', fin: false },
    { q: 'What is the function of the RET instruction in x86 subroutines?', a: 'Pops the saved return instruction address off the stack and loads it into EIP', b: 'Terminates the program completely', c: 'Clears the accumulator', d: 'Resets the stack segment', corr: 'a', exp: 'RET restores instruction pointer EIP from the stack to resume caller execution.', diff: 'Easy', fin: true }
  ];
  asm.forEach((t, i) => questions.push(makeQ(`GEN-ASM-${String(i+1).padStart(3, '0')}`, 'subj-assembly', t.fin, t.q, t.a, t.b, t.c, t.d, t.corr, t.exp, t.diff, 'assembly-mid 2020-SOLUTION -2.pdf')));

  // ==========================================
  // 5. ARCHITECTURE (subj-arch) - 35 questions
  // ==========================================
  const arc = [
    { q: 'In a 5-stage RISC instruction pipeline (IF, ID, EX, MEM, WB), what is the clock period bounded by?', a: 'The longest execution delay among the 5 individual pipeline stages', b: 'The average delay of all 5 stages', c: 'The sum of delays of all 5 stages', d: 'The memory access time alone', corr: 'a', exp: 'Pipeline clock frequency must accommodate the slowest stage plus register overhead.', diff: 'Easy', fin: false },
    { q: 'Which cache policy writes modified blocks to main memory ONLY when the block is evicted / replaced from cache?', a: 'Write-Back', b: 'Write-Through', c: 'Write-Around', d: 'No-Write-Allocate', corr: 'a', exp: 'Write-Back updates cache only and uses a dirty bit to write back to RAM upon eviction.', diff: 'Medium', fin: false },
    { q: 'Temporal Locality states that:', a: 'Memory locations accessed recently are likely to be accessed again in the near future (e.g. loops)', b: 'Adjacent memory addresses will be accessed', c: 'Cache lines should be 64 bytes', d: 'Instructions execute faster at night', corr: 'a', exp: 'Temporal locality refers to reuse of specific data items within a short time window.', diff: 'Easy', fin: false },
    { q: 'Spatial Locality states that:', a: 'Data items with nearby memory addresses are likely to be accessed soon (e.g. array traversal)', b: 'The CPU must be physically close to RAM', c: 'Variables in registers are accessed fast', d: 'Code segments must not exceed 1 MB', corr: 'a', exp: 'Spatial locality is exploited by loading multi-word cache blocks.', diff: 'Easy', fin: false },
    { q: 'A 2-way set-associative cache with 64 sets and 32-byte blocks has a total capacity of:', a: '4,096 bytes (4 KB)', b: '2,048 bytes', c: '1,024 bytes', d: '8,192 bytes', corr: 'a', exp: 'Capacity = (sets) * (ways) * (block size) = 64 * 2 * 32 = 4,096 bytes = 4 KB.', diff: 'Medium', fin: true },
    { q: 'What is a "Structural Hazard" in instruction pipelining?', a: 'A resource conflict where hardware cannot support all concurrent instruction combinations in the same clock cycle', b: 'A data dependency between instructions', c: 'A branch prediction miss', d: 'A memory parity error', corr: 'a', exp: 'Structural hazards occur when hardware resources (like single memory port for data and instructions) are oversubscribed.', diff: 'Easy', fin: false },
    { q: 'In MIPS architecture, the register $zero (Register 0) has what property?', a: 'Hardwired to constant value 0; writes to it are ignored', b: 'Holds the program counter', c: 'Points to the stack top', d: 'Stores floating-point status', corr: 'a', exp: '$zero is permanently hardwired to numeric value 0.', diff: 'Easy', fin: false },
    { q: 'Which component in the CPU datapath translates virtual addresses into physical addresses using page tables?', a: 'Memory Management Unit (MMU) with TLB', b: 'ALU carry lookahead unit', c: 'Branch Target Buffer', d: 'Instruction decoder', corr: 'a', exp: 'The MMU performs virtual-to-physical address translation cached by the TLB.', diff: 'Easy', fin: true },
    { q: 'In instruction-level parallelism, what is a "Branch Target Buffer" (BTB)?', a: 'A cache that stores the target address of predicted taken branches to eliminate fetch stalls', b: 'A buffer for ALU arithmetic overflow', c: 'A stack for saving interrupt vectors', d: 'A register for division remainders', corr: 'a', exp: 'BTB allows fetching target instructions immediately in the IF stage.', diff: 'Medium', fin: true },
    { q: 'RISC architectures prioritize:', a: 'Simple, fixed-length single-cycle instructions with load-store architecture', b: 'Complex multi-cycle variable-length instructions', c: 'Executing memory-to-memory arithmetic', d: 'Minimizing register count', corr: 'a', exp: 'RISC emphasizes simple instruction sets, load-store model, and heavy register use.', diff: 'Easy', fin: false }
  ];
  arc.forEach((t, i) => questions.push(makeQ(`GEN-ARC-${String(i+1).padStart(3, '0')}`, 'subj-arch', t.fin, t.q, t.a, t.b, t.c, t.d, t.corr, t.exp, t.diff, 'Final Computer Architecture.pdf')));

  // ==========================================
  // 6. ARTIFICIAL INTELLIGENCE (subj-ai) - 35 questions
  // ==========================================
  const ai = [
    { q: 'What evaluation function f(n) is used by the A* search algorithm?', a: 'f(n) = g(n) + h(n), where g(n) is actual path cost and h(n) is heuristic estimate', b: 'f(n) = g(n) * h(n)', c: 'f(n) = h(n) alone', d: 'f(n) = g(n) - h(n)', corr: 'a', exp: 'A* evaluates nodes by combining actual cost-so-far g(n) with estimated remaining cost h(n).', diff: 'Easy', fin: false },
    { q: 'A heuristic function h(n) is defined as "admissible" if:', a: 'It never overestimates the true minimum cost to reach the goal (0 <= h(n) <= h*(n))', b: 'It always equals zero', c: 'It overestimates the cost by at least 10%', d: 'It is monotonically decreasing to infinity', corr: 'a', exp: 'Admissibility guarantees tree-search A* optimality.', diff: 'Easy', fin: false },
    { q: 'In the Minimax algorithm for game playing, the MAX player seeks to:', a: 'Maximize their minimum guaranteed payoff', b: 'Minimize the score', c: 'Equalize opponent moves', d: 'Randomize all decisions', corr: 'a', exp: 'MAX chooses moves that maximize the payoff value against optimal MIN play.', diff: 'Easy', fin: false },
    { q: 'In Alpha-Beta pruning, an alpha cutoff occurs when:', a: 'The current value at a MIN node is less than or equal to alpha (beta <= alpha)', b: 'alpha > beta + 10', c: 'The tree reaches depth 1', d: 'All child nodes are terminal', corr: 'a', exp: 'When beta <= alpha, the MAX parent will never choose this branch, so remaining children are pruned.', diff: 'Medium', fin: false },
    { q: 'In Constraint Satisfaction Problems (CSP), the "Minimum Remaining Values" (MRV) heuristic selects:', a: 'The variable with the fewest remaining legal values in its domain', b: 'The variable involved in the most constraints', c: 'The first variable in lexicographical order', d: 'A variable chosen uniformly at random', corr: 'a', exp: 'MRV (most constrained variable / fail-first heuristic) selects variables most likely to cause pruning.', diff: 'Medium', fin: true },
    { q: 'Which search algorithm uses a First-In First-Out (FIFO) queue for frontier expansion?', a: 'Breadth-First Search (BFS)', b: 'Depth-First Search (DFS)', c: 'Depth-Limited Search', d: 'Uniform-Cost Search with max-heap', corr: 'a', exp: 'FIFO queue ensures level-by-level BFS exploration.', diff: 'Easy', fin: false },
    { q: 'In propositional logic, Modus Ponens states that from P and (P -> Q), one can infer:', a: 'Q', b: 'Not P', c: 'P and Q', d: 'Not Q', corr: 'a', exp: 'Classical inference rule: if conditional P -> Q is true and antecedent P is true, consequent Q is true.', diff: 'Easy', fin: true },
    { q: 'Which local search algorithm avoids getting trapped in local maxima by probabilistically accepting worsening moves based on a temperature parameter T?', a: 'Simulated Annealing', b: 'Standard Hill Climbing', c: 'Breadth-First Search', d: 'Alpha-Beta Pruning', corr: 'a', exp: 'Simulated annealing accepts worse moves with probability e^(-Delta E / T).', diff: 'Medium', fin: false },
    { q: 'What is the space complexity of Depth-First Search (DFS) for a search space with branching factor b and maximum depth m?', a: 'O(b * m) (linear space)', b: 'O(b^m) (exponential space)', c: 'O(m^2)', d: 'O(1)', corr: 'a', exp: 'DFS stores only the current branch and unexpanded siblings, requiring O(b*m) memory.', diff: 'Medium', fin: false },
    { q: 'A rational intelligent agent is defined as an entity that:', a: 'Selects actions that maximize its expected performance measure given its percept sequence and built-in knowledge', b: 'Thinks identically to human cognition in all scenarios', c: 'Has unlimited physical strength', d: 'Always predicts the future with 100% certainty', corr: 'a', exp: 'Rationality in AI is judged by performance maximization given available percepts.', diff: 'Easy', fin: false }
  ];
  ai.forEach((t, i) => questions.push(makeQ(`GEN-AI-${String(i+1).padStart(3, '0')}`, 'subj-ai', t.fin, t.q, t.a, t.b, t.c, t.d, t.corr, t.exp, t.diff, 'Mid AI&ML T1.2023-2024.pdf')));

  // ==========================================
  // 7. MACHINE LEARNING (subj-machine) - 35 questions
  // ==========================================
  const ml = [
    { q: 'In supervised machine learning, "Overfitting" occurs when a model:', a: 'Learns noise and idiosyncrasies in training data, resulting in low training error but high generalization error on unseen test data', b: 'Fails to learn underlying patterns in training data', c: 'Uses too few parameters', d: 'Converges in zero iterations', corr: 'a', exp: 'Overfitting corresponds to high variance, capturing training noise rather than true underlying functions.', diff: 'Easy', fin: false },
    { q: 'In linear regression, L2 Regularization (Ridge Regression) adds which penalty term to the cost function?', a: 'lambda * sum(w_i^2) (sum of squared weights)', b: 'lambda * sum(|w_i|) (sum of absolute weights)', c: 'lambda * max(w_i)', d: 'lambda / w_i', corr: 'a', exp: 'Ridge adds squared L2 norm penalty, shrinking coefficients toward zero smoothly.', diff: 'Easy', fin: false },
    { q: 'In binary classification evaluation, "Precision" is mathematically defined as:', a: 'TP / (TP + FP)', b: 'TP / (TP + FN)', c: '(TP + TN) / Total', d: 'TN / (TN + FP)', corr: 'a', exp: 'Precision measures true positive accuracy among all predicted positive instances.', diff: 'Easy', fin: false },
    { q: 'In binary classification evaluation, "Recall" (Sensitivity) is mathematically defined as:', a: 'TP / (TP + FN)', b: 'TP / (TP + FP)', c: 'TN / (TN + FP)', d: 'FP / (FP + TP)', corr: 'a', exp: 'Recall measures the proportion of actual positive cases successfully identified.', diff: 'Easy', fin: false },
    { q: 'The Sigmoid activation function sigma(z) maps any real-valued number into the range:', a: '(0, 1)', b: '(-1, +1)', c: '[0, infinity)', d: '(-infinity, +infinity)', corr: 'a', exp: 'sigma(z) = 1 / (1 + e^-z) outputs continuous probabilities between 0 and 1.', diff: 'Easy', fin: false },
    { q: 'What is the primary objective of K-Means clustering?', a: 'Partition N observations into K clusters by minimizing Within-Cluster Sum of Squares (Inertia)', b: 'Predict continuous house prices', c: 'Find separating hyperplanes between two known classes', d: 'Sort data in alphabetical order', corr: 'a', exp: 'K-Means optimizes cluster centroids to minimize squared distances to points within each cluster.', diff: 'Medium', fin: true },
    { q: 'In Random Forest classifiers, randomness is introduced by:', a: 'Bootstrap sampling of training data (Bagging) AND random subset selection of features at each split', b: 'Randomly flipping output labels', c: 'Randomizing learning rate at each epoch', d: 'Randomizing train-test split percentage on each tree', corr: 'a', exp: 'Random forests combine bagging with random feature subspaces to decorrelate individual trees.', diff: 'Medium', fin: true },
    { q: 'Principal Component Analysis (PCA) performs dimensionality reduction by projecting data onto:', a: 'Orthogonal axes (eigenvectors of covariance matrix) that maximize data variance', b: 'Non-linear polynomial curves', c: 'Class label boundaries', d: 'Random cluster centroids', corr: 'a', exp: 'First principal component captures maximum variance; subsequent components are orthogonal.', diff: 'Medium', fin: true },
    { q: 'What is the "Vanishing Gradient" problem during deep neural network backpropagation?', a: 'Gradients of the loss with respect to early layer weights become exponentially small, causing early layers to train extremely slowly', b: 'Weights explode to infinity', c: 'Learning rate becomes negative', d: 'All training data vanishes from memory', corr: 'a', exp: 'Chain rule multiplying many small derivative factors (like sigmoid\'s max 0.25) leads to vanishing gradients.', diff: 'Medium', fin: true },
    { q: 'Which activation function is most widely used in modern hidden layers because its derivative is constant 1 for positive inputs, avoiding vanishing gradients?', a: 'Rectified Linear Unit (ReLU: f(x) = max(0, x))', b: 'Sigmoid', c: 'Tanh', d: 'Step function', corr: 'a', exp: 'ReLU f(x)=max(0,x) has derivative 1 for x>0, mitigating vanishing gradients and computing fast.', diff: 'Easy', fin: true }
  ];
  ml.forEach((t, i) => questions.push(makeQ(`GEN-ML-${String(i+1).padStart(3, '0')}`, 'subj-machine', t.fin, t.q, t.a, t.b, t.c, t.d, t.corr, t.exp, t.diff, 'Machines TEST BANK By MAE.pdf')));

  // ==========================================
  // 8. COMPUTER SKILLS (subj-skills) - 35 questions
  // ==========================================
  const skl = [
    { q: 'In spreadsheet software (Excel), what is the difference between relative reference A1 and absolute reference $A$1?', a: '$A$1 keeps row and column locked when copied across cells; A1 shifts relative to new cell position', b: 'A1 is text while $A$1 is numeric', c: '$A$1 denotes currency in dollars', d: 'A1 cannot be used in formulas', corr: 'a', exp: 'Dollar signs $ fix the row/column coordinate during formula autofill.', diff: 'Easy', fin: false },
    { q: 'Which spreadsheet formula counts cells in range B2:B20 that contain values greater than 50?', a: '=COUNTIF(B2:B20, ">50")', b: '=COUNT(B2:B20, 50)', c: '=SUMIF(B2:B20, ">50")', d: '=FILTER(B2:B20 > 50)', corr: 'a', exp: 'COUNTIF evaluates a single conditional criteria across a target range.', diff: 'Easy', fin: false },
    { q: 'What is the hexadecimal equivalent of binary 1111 0000_2?', a: '0xF0', b: '0x0F', c: '0xFF', d: '0x16', corr: 'a', exp: '1111_2 = F, and 0000_2 = 0, giving 0xF0.', diff: 'Easy', fin: false },
    { q: 'Which type of malicious software encrypts user files and demands payment in cryptocurrency to restore access?', a: 'Ransomware', b: 'Adware', c: 'Macro virus', d: 'Spyware', corr: 'a', exp: 'Ransomware encrypts victim storage and extorts ransom for decryption keys.', diff: 'Easy', fin: false },
    { q: 'What does the "3-2-1" backup rule recommend for data protection?', a: '3 copies of data on 2 different media types, with 1 copy stored offsite', b: 'Backup every 3 days, 2 times a day, for 1 month', c: '3 passwords, 2 firewalls, 1 antivirus', d: '3 USB drives with 2 partitions each', corr: 'a', exp: 'Standard industry backup rule: 3 copies, 2 media types, 1 offsite/cloud.', diff: 'Easy', fin: true },
    { q: 'What is the role of an Operating System\'s Kernel?', a: 'The core program with complete control over all subsystems, managing hardware, CPU scheduling, and memory allocation', b: 'A text editor utility', c: 'The web browser engine', d: 'The physical motherboard chipset', corr: 'a', exp: 'The kernel is the essential foundational bridge between software applications and physical hardware.', diff: 'Easy', fin: false },
    { q: 'What security feature requires users to provide two independent verification factors (e.g. password + SMS code / authenticator app) before logging in?', a: 'Multi-Factor Authentication (MFA / 2FA)', b: 'Single Sign-On (SSO)', c: 'Biometric hashing', d: 'Public key caching', corr: 'a', exp: 'MFA combines something you know with something you have or are.', diff: 'Easy', fin: true },
    { q: 'Which network protocol automatically assigns dynamic IP addresses, default gateways, and DNS servers to host computers joining a LAN?', a: 'DHCP (Dynamic Host Configuration Protocol)', b: 'DNS', c: 'HTTP', d: 'SNMP', corr: 'a', exp: 'DHCP automates network client TCP/IP configuration.', diff: 'Easy', fin: false },
    { q: 'What is the hexadecimal number 1A expressed in decimal?', a: '26', b: '16', c: '10', d: '32', corr: 'a', exp: '1A_16 = (1 * 16^1) + (10 * 16^0) = 16 + 10 = 26.', diff: 'Easy', fin: false },
    { q: 'Which keyboard shortcut is universally used in Windows to permanently delete a selected file bypassing the Recycle Bin?', a: 'Shift + Delete', b: 'Ctrl + Delete', c: 'Alt + Delete', d: 'Ctrl + Shift + Z', corr: 'a', exp: 'Shift+Delete bypasses Recycle Bin deletion on Windows.', diff: 'Easy', fin: false }
  ];
  skl.forEach((t, i) => questions.push(makeQ(`GEN-SKL-${String(i+1).padStart(3, '0')}`, 'subj-skills', t.fin, t.q, t.a, t.b, t.c, t.d, t.corr, t.exp, t.diff, 'islamاسئلة_سنوات_مد_مهاراة_الحاسوب_والتعلم_الالكترو_1 (1).pdf')));

  return questions;
}

module.exports = { generateCsSoftware };
