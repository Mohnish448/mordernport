'use client';

import React from 'react';
import { ExternalLink, Code2 } from 'lucide-react';

const PROJECTS = [
  {
    id: '01',
    title: 'DOCPILOT AI',
    category: 'AI / DOCUMENT INTELLIGENCE',
    points: [
      {
        title: 'Smart Document Processing',
        description: 'Simplifies document handling with AI-powered capabilities.',
      },
      {
        title: 'Intelligent Information Access',
        description: 'Makes extracting and working with document information easier.',
      },
      {
        title: 'Live AI Application',
        description: 'An accessible, deployed application demonstrating practical AI.',
      },
    ],
    tags: ['AI', 'Python', 'LLM'],
    status: 'DEPLOYED',
    liveUrl: 'https://docpilot-ai-production.up.railway.app/',
    githubUrl: 'https://github.com/Mohnish448/DocPilot-AI',
    gradient: 'from-sky-500/20 via-sky-950/40 to-black',
  },
  {
    id: '02',
    title: 'NEXTSTEP AI',
    category: 'GENERATIVE AI / CAREER DEVELOPMENT',
    points: [
      {
        title: 'Personalized Career Roadmaps',
        description: 'Creates learning paths tailored to individual career goals.',
      },
      {
        title: 'AI-Powered Guidance',
        description: 'Transforms skills and aspirations into structured learning plans.',
      },
      {
        title: 'Structured Learning',
        description: 'Breaks career development into manageable phases and tasks.',
      },
    ],
    tags: ['Next.js', 'Firebase', 'LangChain', 'FastAPI', 'Groq'],
    status: 'NOT DEPLOYED',
    liveUrl: null,
    githubUrl: 'https://github.com/Mohnish448/NextStep-AI',
    gradient: 'from-sky-600/20 via-sky-950/40 to-black',
  },
  {
    id: '03',
    title: 'CRM NOTES FOLLOW-UP',
    category: 'AI / NLP / AUTOMATION',
    points: [
      {
        title: 'Automated Task Extraction',
        description: 'Converts unstructured CRM notes into actionable follow-up tasks.',
      },
      {
        title: 'Intelligent Data Structuring',
        description: 'Identifies owners, deadlines, priorities and potential blockers.',
      },
      {
        title: 'Human-in-the-Loop Review',
        description: 'Flags uncertain information for manual verification.',
      },
    ],
    tags: ['Python', 'Streamlit', 'Ollama', 'Pandas'],
    status: 'COMPLETED',
    liveUrl: null,
    githubUrl: 'https://github.com/Mohnish448/CRM-Notes-Follow-Up-Task-Extraction',
    gradient: 'from-cyan-500/20 via-sky-950/40 to-black',
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative py-20 sm:py-28 px-4 sm:px-6 md:px-8 pointer-events-none"
    >
      <div className="max-w-6xl mx-auto w-full">

        {/* Section Header */}
        <div className="mb-12 sm:mb-16 pointer-events-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs text-sky-400 font-bold tracking-widest uppercase">
              // 02. INDEX OF WORKS
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-sky-500/40 to-transparent" />
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            FEATURED{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-white">
              PROJECTS
            </span>
          </h2>

          <p className="mt-3 font-mono text-xs sm:text-sm text-neutral-300 max-w-xl leading-relaxed">
            Exploring AI, intelligent applications, automation and modern
            web technologies through practical projects.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className="group relative p-5 sm:p-7 md:p-8 rounded-2xl bg-black/75 backdrop-blur-md border border-neutral-800 hover:border-sky-400/50 hover:shadow-[0_0_30px_rgba(56,189,248,0.2)] transition-all duration-500 pointer-events-auto overflow-hidden flex flex-col justify-between"
            >
              {/* Corner Cyber Accents */}
              <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-sky-400/60" />
              <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-sky-400/60" />
              <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-sky-400/60" />
              <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-sky-400/60" />

              {/* Ambient Glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
              />

              <div className="relative z-10">

                {/* Meta Header */}
                <div className="flex items-center justify-between gap-3 mb-3 sm:mb-4">
                  <span className="font-mono text-xs font-bold text-sky-400">
                    PRJ_{project.id}
                  </span>

                  <span
                    className={`font-mono text-[10px] tracking-wider px-2 py-0.5 rounded border ${
                      project.status === 'DEPLOYED'
                        ? 'bg-emerald-950/60 border-emerald-500/30 text-emerald-300'
                        : project.status === 'COMPLETED'
                          ? 'bg-sky-950/60 border-sky-500/30 text-sky-300'
                          : 'bg-neutral-900/80 border-neutral-700 text-neutral-400'
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                {/* Category */}
                <div className="font-mono text-[10px] sm:text-[11px] text-neutral-400 mb-1 tracking-wider uppercase">
                  {project.category}
                </div>

                {/* Project Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-sky-300 transition-colors duration-300 mb-4 sm:mb-5">
                  {project.title}
                </h3>

                {/* Highlights */}
                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-7">
                  {project.points.map((point, index) => (
                    <div key={point.title} className="flex gap-2.5 sm:gap-3">
                      <span className="shrink-0 font-mono text-xs font-bold text-sky-400 mt-0.5">
                        0{index + 1}
                      </span>

                      <div>
                        <h4 className="font-mono text-xs font-bold text-white mb-0.5 sm:mb-1 group-hover:text-sky-300 transition-colors">
                          {point.title}
                        </h4>
                        <p className="font-mono text-[11px] text-neutral-300 leading-relaxed">
                          {point.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Tags & Links Footer */}
              <div className="relative z-10 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[9px] sm:text-[10px] px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300 group-hover:border-sky-500/30 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Project Links */}
                <div className="flex items-center gap-2 ml-auto sm:ml-0">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Live demo of ${project.title}`}
                      className="flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-lg bg-neutral-900/90 hover:bg-sky-500 hover:text-black border border-white/10 text-neutral-300 transition-all duration-200"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span className="font-mono text-[10px] font-bold">
                        LIVE
                      </span>
                    </a>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`GitHub repository for ${project.title}`}
                      className="flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-lg bg-neutral-900/90 hover:bg-neutral-800 border border-white/10 text-neutral-300 transition-all duration-200"
                    >
                      <Code2 className="w-3.5 h-3.5" />
                      <span className="font-mono text-[10px] font-bold">
                        CODE
                      </span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}