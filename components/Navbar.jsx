'use client';

import React from 'react';
import { Cpu, Sparkles } from 'lucide-react';

export default function Navbar({ onTriggerPulse }) {
  return (
    <>
      {/* Top Left: NEXUS.CORE Logo & Minimal Floating Content Links (No Navbar Bar) */}
      <div className="fixed top-6 left-6 sm:left-8 z-50 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 pointer-events-auto">
        {/* Brand Group */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-sky-950/70 border border-sky-500/40 shadow-[0_0_15px_rgba(56,189,248,0.3)]">
            <Cpu className="w-5 h-5 text-sky-400 animate-pulse" />
            <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm tracking-widest font-black text-white">
                NEXUS<span className="text-sky-400">.CORE</span>
              </span>
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-sky-500/10 border border-sky-500/30 text-sky-300">
                v2.6.0
              </span>
            </div>
            <p className="text-[10px] font-mono text-neutral-400 tracking-wider">
              QUANTUM INTERFACE
            </p>
          </div>
        </div>

        {/* Minimal Floating Navigation (No bar background, pure HUD text) */}
        <nav className="flex items-center gap-5 sm:gap-6 font-mono text-xs tracking-widest pl-1 sm:pl-3 sm:border-l sm:border-white/10">
          <a
            href="#projects"
            className="text-neutral-300 hover:text-sky-400 transition-colors duration-200 group flex items-center gap-1"
          >
            <span className="text-sky-500/50 group-hover:text-sky-400">01//</span> ARCHIVE
          </a>
          <a
            href="#capabilities"
            className="text-neutral-300 hover:text-sky-400 transition-colors duration-200 group flex items-center gap-1"
          >
            <span className="text-sky-500/50 group-hover:text-sky-400">02//</span> CAPABILITIES
          </a>
          <a
            href="#contact"
            className="text-neutral-300 hover:text-sky-400 transition-colors duration-200 group flex items-center gap-1"
          >
            <span className="text-sky-500/50 group-hover:text-sky-400">03//</span> TRANSMIT
          </a>
          <a
            href="/resume.pdf"
            download="Mohnish_Kumar_Resume.pdf"
            className="text-sky-300 hover:text-white transition-colors duration-200 group flex items-center gap-1"
            title="Download Mohnish Kumar's Resume"
          >
            <span className="text-sky-500/50 group-hover:text-sky-400">04//</span> RESUME
          </a>
        </nav>
      </div>

      {/* Top Right: Pulse Matrix & Live Box */}
      <div className="fixed top-6 right-6 sm:right-8 z-50 flex items-center gap-3 pointer-events-auto">
        {onTriggerPulse && (
          <button
            onClick={onTriggerPulse}
            className="relative inline-flex items-center gap-2 px-3.5 py-2 rounded-lg font-mono text-xs font-semibold text-sky-200 bg-sky-950/60 border border-sky-400/40 hover:border-sky-300 hover:bg-sky-900/60 shadow-[0_0_15px_rgba(56,189,248,0.25)] hover:shadow-[0_0_25px_rgba(56,189,248,0.45)] transition-all duration-300 cursor-pointer backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">PULSE MATRIX</span>
          </button>
        )}

        <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-black/80 backdrop-blur-md border border-neutral-800 text-[11px] font-mono text-emerald-400 shadow-[0_0_12px_rgba(0,0,0,0.5)]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-semibold tracking-wider">LIVE</span>
        </div>
      </div>
    </>
  );
}
