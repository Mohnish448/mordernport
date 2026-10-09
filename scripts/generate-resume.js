const fs = require('fs');
const path = require('path');

function createPdf() {
  const lines = [
    { text: 'MOHNISH KUMAR', size: 20, x: 50, y: 745, font: '/F2' },
    { text: 'Python Developer & AI Specialist | Generative AI & Agentic Workflows', size: 10, x: 50, y: 728, font: '/F1' },
    { text: 'Email: mohnishkumar724@gmail.com  |  GitHub: github.com/Mohnish448', size: 9, x: 50, y: 714, font: '/F1' },
    
    { text: '----------------------------------------------------------------------------------------------------------------', size: 9, x: 50, y: 704, font: '/F1' },
    
    { text: 'PROFESSIONAL SUMMARY', size: 11, x: 50, y: 690, font: '/F2' },
    { text: 'Python Developer and AI Enthusiast specializing in Generative AI, LLM applications, agentic workflows,', size: 9, x: 50, y: 676, font: '/F1' },
    { text: 'and backend API engineering. Proven experience in turning unstructured operational data into reliable,', size: 9, x: 50, y: 664, font: '/F1' },
    { text: 'automated processing pipelines with human-in-the-loop review.', size: 9, x: 50, y: 652, font: '/F1' },

    { text: 'PROFESSIONAL EXPERIENCE', size: 11, x: 50, y: 634, font: '/F2' },
    { text: 'First Quadrant Labs  -  LLM Application Developer (Internship, Pursuing)', size: 9.5, x: 50, y: 620, font: '/F2' },
    { text: '   - Developed AI-powered workflows to transform unstructured operational notes into structured, actionable data.', size: 8.5, x: 50, y: 608, font: '/F1' },
    { text: '   - Built Python-based applications and APIs for information extraction, data validation, and automated processing.', size: 8.5, x: 50, y: 596, font: '/F1' },
    { text: '   - Stack: Python, FastAPI, REST APIs, Pandas, JSON, CSV, Streamlit, Ollama, LLMs, Pytest, Git, Swagger.', size: 8.5, x: 50, y: 584, font: '/F1' },

    { text: 'Surekha Enterprise  -  Computer Hardware Installer & Tester (Internship, 6 Months)', size: 9.5, x: 50, y: 568, font: '/F2' },
    { text: '   - Executed hardware diagnostics, assembly, component testing, and preventive system maintenance.', size: 8.5, x: 50, y: 556, font: '/F1' },
    { text: '   - Configured operating systems, device drivers, and BIOS/UEFI settings for reliable workstation performance.', size: 8.5, x: 50, y: 544, font: '/F1' },
    { text: '   - Tools: Hardware Diagnostics, PC Assembly, Windows OS, Drivers, BIOS/UEFI, Hardware Troubleshooting.', size: 8.5, x: 50, y: 532, font: '/F1' },

    { text: 'CORE TECHNICAL SKILLS', size: 11, x: 50, y: 514, font: '/F2' },
    { text: '* GenAI & LLMs: LangChain, Ollama, Prompt Engineering, LLM Integration, Agentic Workflows', size: 8.5, x: 50, y: 500, font: '/F1' },
    { text: '* Backend & Data: Python, FastAPI, REST APIs, Pandas, SQL, JSON, CSV, Pytest, R', size: 8.5, x: 50, y: 488, font: '/F1' },
    { text: '* Frontend & 3D: React, Next.js, JavaScript, Tailwind CSS, Three.js, HTML5/CSS3', size: 8.5, x: 50, y: 476, font: '/F1' },
    { text: '* Tools: Git, GitHub, Streamlit, Firebase, Figma, BIOS/UEFI, Hardware Diagnostics', size: 8.5, x: 50, y: 464, font: '/F1' },

    { text: 'FEATURED PROJECTS', size: 11, x: 50, y: 446, font: '/F2' },
    { text: '1. DocPilot AI - AI-Powered Document Intelligence & Processing (Deployed)', size: 9.5, x: 50, y: 432, font: '/F2' },
    { text: '   - Deployed at docpilot-ai-production.up.railway.app | Stack: Python, LLMs, API infrastructure.', size: 8.5, x: 50, y: 420, font: '/F1' },
    { text: '   - Simplifies document handling with automated parsing and intelligent information extraction.', size: 8.5, x: 50, y: 408, font: '/F1' },

    { text: '2. NextStep AI - Career Roadmaps & Structured Learning Guidance', size: 9.5, x: 50, y: 392, font: '/F2' },
    { text: '   - Stack: Next.js, Firebase, LangChain, FastAPI, Groq | Generates personalized learning paths.', size: 8.5, x: 50, y: 380, font: '/F1' },

    { text: '3. CRM Notes Follow-Up - Automated Task Extraction (Completed)', size: 9.5, x: 50, y: 364, font: '/F2' },
    { text: '   - Stack: Python, Streamlit, Ollama, Pandas | Converts unstructured CRM notes to prioritized tasks.', size: 8.5, x: 50, y: 352, font: '/F1' },

    { text: 'CONTACT & PORTFOLIO', size: 11, x: 50, y: 332, font: '/F2' },
    { text: '* Primary Email: mohnishkumar724@gmail.com  |  GitHub: https://github.com/Mohnish448', size: 8.5, x: 50, y: 318, font: '/F1' },
    { text: '* Status: Active Protocol // Open for New Opportunities', size: 8.5, x: 50, y: 306, font: '/F1' },
  ];

  let streamContent = 'BT\n';
  lines.forEach(l => {
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
