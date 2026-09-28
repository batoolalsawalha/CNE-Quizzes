const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// Extract all readable text from a PDF buffer using zlib inflate
function extractTextFromPdf(filePath) {
  try {
    const stat = fs.statSync(filePath);
    // Skip files larger than 15MB to prevent memory exhaustion
    if (stat.size > 15 * 1024 * 1024) return '';

    const buf = fs.readFileSync(filePath);
    const streamRegex = /stream\r?\n([\s\S]*?)\r?\nendstream/g;
    let match;
    let chunks = [];

    while ((match = streamRegex.exec(buf.toString('binary'))) !== null) {
      try {
        const decomp = zlib.inflateSync(Buffer.from(match[1], 'binary')).toString('latin1');
        
        // Extract parentheses text: (text) Tj or TJ arrays [(t) 12 (e) -5 (xt)]
        const tjMatches = decomp.match(/\((.*?)\)\s*Tj/g);
        if (tjMatches) {
          tjMatches.forEach(m => {
            const clean = m.replace(/^\(/, '').replace(/\)\s*Tj$/, '').trim();
            if (clean) chunks.push(clean);
          });
        }

        const arrayMatches = decomp.match(/\[(.*?)\]\s*TJ/g);
        if (arrayMatches) {
          arrayMatches.forEach(m => {
            const inParens = m.match(/\((.*?)\)/g);
            if (inParens) {
              const joined = inParens.map(p => p.slice(1, -1)).join('');
              if (joined.trim()) chunks.push(joined.trim());
            }
          });
        }
      } catch (_) {}
    }
    return chunks.join(' ');
  } catch (err) {
    return '';
  }
}

// Check how many files have readable text across subjects
const subjects = fs.readdirSync('qu');
let stats = [];

for (const s of subjects) {
  const p = path.join('qu', s);
  if (fs.statSync(p).isDirectory()) {
    const files = fs.readdirSync(p).filter(f => f.endsWith('.pdf'));
    let subTextLength = 0;
    let textFiles = 0;

    for (const f of files) {
      const full = path.join(p, f);
      const text = extractTextFromPdf(full);
      if (text.length > 200) {
        textFiles++;
        subTextLength += text.length;
      }
    }
    stats.push({ subject: s, totalFiles: files.length, textFiles, textLength: subTextLength });
  }
}

console.table(stats);
