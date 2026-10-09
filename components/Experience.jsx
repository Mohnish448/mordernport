'use client';

import React from 'react';
import { Briefcase, Calendar, Building2, Sparkles, Wrench, Cpu, CheckCircle2, Terminal } from 'lucide-react';

const EXPERIENCES = [
  {
    id: '01',
    role: 'LLM Application Developer',
    company: 'First Quadrant Labs',
    type: 'Internship',
    period: 'Pursuing',
    status: 'ACTIVE DEPLOYMENT',
    icon: Cpu,
    gradient: 'from-sky-500/20 via-sky-950/40 to-black',
    accentColor: 'border-emerald-500/30 bg-emerald-950/50 text-emerald-300',
    dotColor: 'bg-emerald-400',
    description:
      'Developed AI-powered workflows to transform unstructured operational notes into structured, actionable data. Built Python-based applications and APIs for information extraction, data validation, and automated processing, with a focus on reliability, efficiency, and human review.',
    highlights: [
      'Automated extraction of high-priority operational items from complex unstructured records.',
      'Constructed scalable backend endpoints using FastAPI and interactive prototypes with Streamlit.',
      'Integrated local LLM execution via Ollama and prompt pipelines for privacy and performance.',
    ],
    techStack: [
      'Python',
      'FastAPI',
      'REST APIs',
      'Pandas',
      'JSON',
      'CSV',
      'Streamlit',
      'Ollama',
      'LLMs',
      'Pytest',
      'Git',
      'Swagger / OpenAPI',
    ],
  },
  {
    id: '02',
    role: 'Computer Hardware Installer & Tester',
    company: 'Surekha Enterprise',
    type: 'Internship',
    period: '6 Months',
    status: 'COMPLETED MISSION',
    icon: Wrench,
    gradient: 'from-cyan-500/20 via-sky-950/40 to-black',
    accentColor: 'border-sky-500/30 bg-sky-950/50 text-sky-300',
    dotColor: 'bg-sky-400',
    description:
      'Worked on computer hardware testing, installation, troubleshooting, and system setup to ensure reliable hardware performance. Assisted with diagnosing hardware issues, configuring computer systems, installing components, and performing routine maintenance.',
    highlights: [
      'Performed deep hardware diagnostics, component installations, and stress testing across client workstations.',
      'Configured BIOS/UEFI settings, device firmware, and operating system optimizations.',
      'Delivered preventive system maintenance and resolved complex peripheral and motherboard issues.',
    ],
    techStack: [
      'Computer Hardware Diagnostics',
      'PC Assembly',
      'Hardware Installation',
      'Windows OS',
      'Device Drivers',
      'BIOS/UEFI Configuration',
      'Peripheral Setup',
      'Hardware Troubleshooting',
      'Preventive Maintenance',
    ],
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative py-20 sm:py-28 px-4 sm:px-6 md:px-8 pointer-events-none"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16 pointer-events-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs text-sky-400 font-bold tracking-widest uppercase">
              / 04. EXPERIENCE PROTOCOLS
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-sky-500/40 to-transparent" />
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            FIELD <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-white">EXPERIENCE</span>
          </h2>

          <p className="mt-3 font-mono text-xs sm:text-sm text-neutral-300 max-w-xl leading-relaxed">
            Real-world deployments, hands-on engineering missions, and system-level operations.
          </p>
        </div>

        {/* Experience Timeline / Cards Grid */}
        <div className="space-y-6 sm:space-y-8">
          {EXPERIENCES.map((exp) => {
            const Icon = exp.icon;
            return (
              <div
                key={exp.id}
                className="group relative p-6 sm:p-8 rounded-2xl bg-black/75 backdrop-blur-md border border-neutral-800 hover:border-sky-400/50 hover:shadow-[0_0_35px_rgba(56,189,248,0.2)] transition-all duration-500 pointer-events-auto overflow-hidden"
              >
                {/* Cyber Corner Accents */}
                <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-sky-400/60" />
                <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-sky-400/60" />
                <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-sky-400/60" />
                <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-sky-400/60" />

                {/* Ambient Hover Gradient Glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${exp.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
                />

                <div className="relative z-10">
                  {/* Top Meta Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4 sm:mb-5">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 sm:p-2.5 rounded-lg bg-sky-950/60 border border-sky-500/30 text-sky-400 group-hover:scale-110 group-hover:text-white transition-all">
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div>
                        <span className="font-mono text-xs font-bold text-sky-400">
                          LOG_{exp.id} / {exp.type.toUpperCase()}
                        </span>
                        <div className="flex items-center gap-1.5 text-neutral-400 text-xs font-mono">
                          <Building2 className="w-3.5 h-3.5 text-neutral-500" />
                          <span className="text-white font-semibold">{exp.company}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-neutral-300 font-mono text-[11px]">
                        <Calendar className="w-3 h-3 text-sky-400" />
                        <span>{exp.period}</span>
                      </div>

                      <div
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border font-mono text-[10px] tracking-wider font-semibold ${exp.accentColor}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${exp.dotColor} ${exp.period === 'Pursuing' ? 'animate-ping' : ''}`} />
                        <span>{exp.status}</span>
                      </div>
                    </div>
                  </div>

                  {/* Role Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-sky-300 transition-colors duration-300 mb-3">
                    {exp.role}
                  </h3>

                  {/* Description Paragraph */}
                  <p className="font-mono text-xs sm:text-sm text-neutral-300 leading-relaxed mb-5">
                    {exp.description}
                  </p>

                  {/* Key Execution Highlights */}
                  <div className="space-y-2 mb-6 p-4 rounded-xl bg-neutral-950/60 border border-neutral-900/80">
                    <div className="font-mono text-[11px] font-bold text-sky-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5" />
                      <span>MISSION PARAMETERS &amp; ACHIEVEMENTS</span>
                    </div>
                    {exp.highlights.map((highlight, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2.5 font-mono text-xs text-neutral-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 mt-0.5 shrink-0" />
                        <span className="leading-relaxed">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Chips */}
                  <div>
                    <div className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest mb-2.5">
                      DEPLOYED TECH STACK &amp; TOOLS:
                    </div>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {exp.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-[10px] sm:text-[11px] px-2.5 py-1 rounded-md bg-neutral-900/90 border border-neutral-800 text-neutral-200 group-hover:border-sky-500/30 group-hover:text-sky-200 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
