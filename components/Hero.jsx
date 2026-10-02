'use client';

import React from 'react';
import { ArrowUpRight, Layers, Activity, Download } from 'lucide-react';
import { LinkedinIcon } from './SocialIcons';

export default function Hero({ onTriggerPulse }) {
  return (
    <section
      id="overview"
      className="relative min-h-screen flex flex-col justify-between px-6 sm:px-10 pt-32 pb-10 pointer-events-none select-none"
    >
      {/* Top Spacer to balance layout */}
      <div />

      {/* Center: Status Bar + "Hi ! i am Mohnish" */}
      <div className="w-full text-center relative z-10 my-auto">
        {/* Status Bar */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-sky-950/50 border border-sky-400/30 backdrop-blur-md shadow-[0_0_20px_rgba(56,189,248,0.2)] mb-8 pointer-events-auto">
          <Activity className="w-4 h-4 text-sky-400 animate-pulse" />
          <span className="font-mono text-xs text-sky-200 tracking-wider">
            STATUS: <span className="text-white font-bold">ACTIVE PROTOCOL</span> // OPEN FOR NEW PROJECTS
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-white leading-tight">
          Hi ! i am{' '}
          <span className="relative inline-block">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-sky-200 to-white drop-shadow-[0_0_40px_rgba(56,189,248,0.6)]">
              Mohnish
            </span>
          </span>
        </h1>

        {/* Short Bio Description */}
        <p className="mt-6 max-w-2xl mx-auto font-mono text-sm sm:text-base text-neutral-300 leading-relaxed tracking-wide pointer-events-auto">
          Python developer and AI enthusiast passionate about building intelligent applications and exploring{' '}
          <span className="text-sky-300 font-semibold">Generative AI</span>,{' '}
          <span className="text-white font-semibold">Agentic AI</span>, and emerging technologies.
        </p>
      </div>

      {/* Bottom Left: Action & Links Row */}
      <div className="relative z-20 flex flex-wrap items-center gap-3.5 pointer-events-auto pt-8">
        <a
          href="#projects"
          className="group relative inline-flex items-center gap-2.5 px-6 py-3 rounded-lg bg-sky-500 text-black font-mono text-xs sm:text-sm font-bold tracking-wider hover:bg-sky-400 hover:shadow-[0_0_30px_rgba(56,189,248,0.6)] transition-all duration-300 cursor-pointer"
        >
          <span>EXPLORE ARCHIVE</span>
          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>

        {/* Download Resume Button */}
        <a
          href="/resume.pdf"
          download="Mohnish_Kumar_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-lg bg-sky-950/80 border border-sky-400/40 text-sky-200 hover:text-white hover:border-sky-300 hover:bg-sky-900/60 font-mono text-xs sm:text-sm font-semibold tracking-wider hover:shadow-[0_0_25px_rgba(56,189,248,0.4)] transition-all duration-300 cursor-pointer backdrop-blur-md"
        >
          <Download className="w-4 h-4 text-sky-400 group-hover:translate-y-0.5 transition-transform" />
          <span>DOWNLOAD RESUME</span>
        </a>

        {/* LinkedIn Quick Connect */}
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          title="Connect on LinkedIn"
          className="group inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-neutral-950/80 border border-sky-500/30 text-sky-200 hover:text-sky-300 hover:border-sky-400 hover:bg-sky-950/50 hover:shadow-[0_0_20px_rgba(56,189,248,0.3)] font-mono text-xs sm:text-sm font-semibold tracking-wider transition-all duration-300 cursor-pointer backdrop-blur-md"
        >
          <LinkedinIcon className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline">LINKEDIN</span>
        </a>

        <button
          onClick={onTriggerPulse}
          className="group inline-flex items-center gap-2.5 px-5 py-3 rounded-lg bg-neutral-950/80 border border-neutral-800 text-neutral-400 font-mono text-xs sm:text-sm font-medium tracking-wider hover:border-sky-400 hover:text-sky-200 hover:bg-sky-950/40 hover:shadow-[0_0_20px_rgba(56,189,248,0.2)] transition-all duration-300 cursor-pointer backdrop-blur-md"
        >
          <Layers className="w-4 h-4 text-sky-400 group-hover:rotate-12 transition-transform" />
          <span>TRIGGER ANIMATION</span>
        </button>
      </div>
    </section>
  );
}
