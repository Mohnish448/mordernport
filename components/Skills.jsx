'use client';

import React from 'react';
import { Cpu, Terminal, Orbit, ShieldCheck, Zap, Layers, Binary, Box } from 'lucide-react';


const CAPABILITIES = [
  {
    icon: Binary,
    category: 'GENERATIVE AI & AGENTIC AI',
    skills: [
      'LLM Integration',
      'LangChain & AI Workflows',
      'Prompt Engineering',
      'Local LLMs (Ollama)',
      'AI Task Automation',
    ],
  },
  {
    icon: Cpu,
    category: 'PYTHON & BACKEND',
    skills: [
      'Python',
      'FastAPI & REST APIs',
      'Pandas & Data Processing',
      'SQL & Database Management',
      'R Programming',
    ],
  },
  {
    icon: Orbit,
    category: 'FRONTEND & 3D DEVELOPMENT',
    skills: [
      'HTML5 & CSS3',
      'JavaScript (ES6+)',
      'React & Next.js',
      'Tailwind CSS',
      'Three.js',
    ],
  },
  {
    icon: ShieldCheck,
    category: 'UI/UX & DEVELOPMENT TOOLS',
    skills: [
      'UI/UX Design',
      'Figma',
      'Git & GitHub',
      'Firebase',
      'Responsive Web Design',
    ],
  },
];

export default function Skills() {
  return (
    <section id="capabilities" className="relative py-24 px-4 sm:px-6 pointer-events-none">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-14 pointer-events-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs text-sky-400 font-bold tracking-widest uppercase">
              // 03. CORE SYSTEMS
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-sky-500/40 to-transparent" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            TECHNICAL <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-white">STACK MATRIX</span>
          </h2>
          <p className="mt-3 font-mono text-sm text-neutral-300 max-w-xl">
            Specialized engineering capabilities tuned for high framerates, deep interactivity, and immersive interfaces.
          </p>
        </div>

        {/* Matrix Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CAPABILITIES.map((group, idx) => {
            const Icon = group.icon;
            return (
              <div
                key={idx}
                className="group relative p-6 rounded-2xl bg-black/60 backdrop-blur-md border border-neutral-800 hover:border-sky-400/50 hover:shadow-[0_0_25px_rgba(56,189,248,0.15)] transition-all duration-300 pointer-events-auto"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 rounded-lg bg-sky-950/60 border border-sky-500/30 text-sky-400 group-hover:scale-110 group-hover:text-white transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[11px] font-bold tracking-widest text-sky-200">
                    {group.category}
                  </span>
                </div>

                <ul className="space-y-2.5 font-mono text-xs text-neutral-300">
                  {group.skills.map((skill, sIdx) => (
                    <li key={sIdx} className="flex items-center gap-2 group-hover:text-neutral-200 transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400/60 group-hover:bg-sky-400 group-hover:shadow-[0_0_6px_#38bdf8]" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
