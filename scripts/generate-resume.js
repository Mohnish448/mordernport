const fs = require('fs');
const path = require('path');

function createPdf() {
  const lines = [
    { text: 'MOHNISH KUMAR', size: 22, x: 50, y: 740, font: '/F2' },
    { text: 'Python Developer & AI Specialist | Generative AI & Agentic AI', size: 12, x: 50, y: 720, font: '/F1' },
    { text: 'Email: mohnishkumar724@gmail.com  |  GitHub: github.com/Mohnish448', size: 10, x: 50, y: 702, font: '/F1' },
    
    { text: '----------------------------------------------------------------------------------------------------------------', size: 10, x: 50, y: 690, font: '/F1' },
    
    { text: 'PROFESSIONAL SUMMARY', size: 13, x: 50, y: 672, font: '/F2' },
    { text: 'Passionate Python Developer and AI Enthusiast specializing in Generative AI, Agentic workflows,', size: 10, x: 50, y: 654, font: '/F1' },
    { text: 'and full-stack interactive applications. Experienced in developing intelligent document intelligence,', size: 10, x: 50, y: 640, font: '/F1' },
    { text: 'automated CRM task extractors, and scalable modern web solutions.', size: 10, x: 50, y: 626, font: '/F1' },

    { text: 'CORE TECHNICAL SKILLS', size: 13, x: 50, y: 598, font: '/F2' },
    { text: '* Generative AI & Agents: LangChain, Ollama (Local LLMs), Prompt Engineering, AI Workflows', size: 10, x: 50, y: 580, font: '/F1' },
    { text: '* Backend & Data: Python, FastAPI, REST APIs, Pandas, SQL & Database Management, R', size: 10, x: 50, y: 566, font: '/F1' },
    { text: '* Frontend & 3D: React, Next.js, JavaScript (ES6+), Tailwind CSS, Three.js, HTML5/CSS3', size: 10, x: 50, y: 552, font: '/F1' },
    { text: '* Tools & Cloud: Git, GitHub, Firebase, Figma, UI/UX Prototyping, Docker', size: 10, x: 50, y: 538, font: '/F1' },

    { text: 'FEATURED PROJECTS', size: 13, x: 50, y: 510, font: '/F2' },
    { text: '1. DocPilot AI - AI-Powered Document Intelligence & Processing', size: 11, x: 50, y: 492, font: '/F2' },
    { text: '   - Live Production Application (docpilot-ai-production.up.railway.app)', size: 9, x: 50, y: 478, font: '/F1' },
    { text: '   - Simplifies document handling and intelligent extraction using LLM pipelines.', size: 9, x: 50, y: 466, font: '/F1' },
    { text: '   - Built with Python, LLMs, and modern API infrastructure.', size: 9, x: 50, y: 454, font: '/F1' },

    { text: '2. NextStep AI - Career Roadmap & Structured Skill Planning', size: 11, x: 50, y: 432, font: '/F2' },
    { text: '   - Transforms user aspirations into modular, phased learning journeys.', size: 9, x: 50, y: 418, font: '/F1' },
    { text: '   - Stack: Next.js, Firebase, LangChain, FastAPI, Groq.', size: 9, x: 50, y: 406, font: '/F1' },

    { text: '3. CRM Notes Follow-Up - Automated Task & Action-Item Extraction', size: 11, x: 50, y: 384, font: '/F2' },
    { text: '   - Converts unstructured meeting notes into prioritized CRM tasks with deadline detection.', size: 9, x: 50, y: 370, font: '/F1' },
    { text: '   - Implemented human-in-the-loop review for uncertain flags.', size: 9, x: 50, y: 358, font: '/F1' },
    { text: '   - Stack: Python, Streamlit, Ollama, Pandas.', size: 9, x: 50, y: 346, font: '/F1' },

    { text: 'CONTACT & PORTFOLIO', size: 13, x: 50, y: 318, font: '/F2' },
    { text: '* Primary Email: mohnishkumar724@gmail.com', size: 10, x: 50, y: 300, font: '/F1' },
    { text: '* GitHub Repository: https://github.com/Mohnish448', size: 10, x: 50, y: 286, font: '/F1' },
    { text: '* Portfolio: Active Protocol // Open for New Opportunities', size: 10, x: 50, y: 272, font: '/F1' },
  ];

  let streamContent = 'BT\n';
  lines.forEach(l => {
    // Escape parenthesis in text
    const escaped = l.text.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
    streamContent += `${l.font} ${l.size} Tf\n`;
    streamContent += `1 0 0 1 ${l.x} ${l.y} Tm\n`;
    streamContent += `(${escaped}) Tj\n`;
  });
  streamContent += 'ET\n';

  const streamLength = Buffer.byteLength(streamContent, 'utf8');

  const objects = [];
  objects.push('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n');
  objects.push('2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n');
  objects.push('3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>\nendobj\n');
  objects.push(`4 0 obj\n<< /Length ${streamLength} >>\nstream\n${streamContent}\nendstream\nendobj\n`);
  objects.push('5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n');
  objects.push('6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n');

  let pdf = '%PDF-1.4\n';
  const xrefOffsets = [0];

  for (let i = 0; i < objects.length; i++) {
    xrefOffsets.push(Buffer.byteLength(pdf, 'utf8'));
    pdf += objects[i];
  }

  const xrefStart = Buffer.byteLength(pdf, 'utf8');
  pdf += 'xref\n';
  pdf += `0 ${objects.length + 1}\n`;
  pdf += '0000000000 65535 f \n';
  for (let i = 1; i <= objects.length; i++) {
    const offsetStr = String(xrefOffsets[i]).padStart(10, '0');
    pdf += `${offsetStr} 00000 n \n`;
  }
  pdf += 'trailer\n';
  pdf += `<< /Size ${objects.length + 1} /Root 1 0 R >>\n`;
  pdf += 'startxref\n';
  pdf += `${xrefStart}\n`;
  pdf += '%%EOF\n';

  const outDir = path.resolve('public');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const outPath = path.join(outDir, 'resume.pdf');
  fs.writeFileSync(outPath, pdf);
  console.log('Created resume at:', outPath);
}

createPdf();
