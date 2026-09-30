const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const q = db.questions.find(x => x.id === 'EXP-CPP-003');
if (q) {
  q.question = 'What is the effect of declaring a local variable inside a C++ function with the "static" keyword (e.g. static int counter = 0;)?';
  q.explanation = 'A static local variable retains its value between function calls and persists for the lifetime of the program, allocated in static storage duration rather than on the call stack.';
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
  console.log('Updated EXP-CPP-003 successfully');
}
