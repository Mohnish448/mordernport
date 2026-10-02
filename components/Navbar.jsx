'use client';

import React, { useState, useEffect } from 'react';
import { Cpu, Sparkles, Download, Menu, X, Mail } from 'lucide-react';
import { LinkedinIcon } from './SocialIcons';

export default function Navbar({ onTriggerPulse }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on resize to larger viewport or ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* ========================================================= */}
      {/* DESKTOP / TABLET HUD NAVIGATION (md and above)           */}
      {/* ========================================================= */}
      <header className="hidden md:flex fixed top-5 left-5 right-5 sm:top-6 sm:left-8 sm:right-8 z-50 items-center justify-between pointer-events-none">
        {/* Brand + Nav Links Group */}
        <div className="flex items-center gap-6 lg:gap-8 pointer-events-auto bg-black/60 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-sky-500/20 shadow-[0_0_20px_rgba(2,132,199,0.15)]">
          {/* Brand Logo */}
          <a href="#overview" className="flex items-center gap-3 group cursor-pointer">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-sky-950/80 border border-sky-500/40 shadow-[0_0_12px_rgba(56,189,248,0.3)] group-hover:border-sky-400 transition-all">
              <Cpu className="w-4 h-4 text-sky-400 animate-pulse" />
              <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm tracking-widest font-black text-white group-hover:text-sky-300 transition-colors">
                  NEXUS<span className="text-sky-400">.CORE</span>
                </span>
                <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-sky-500/10 border border-sky-500/30 text-sky-300">
                  v2.6.0
                </span>
              </div>
              <p className="text-[9px] font-mono text-neutral-400 tracking-wider">
                QUANTUM INTERFACE
              </p>
            </div>
          </a>

          {/* Floating Navigation Links */}
          <nav className="flex items-center gap-4 lg:gap-6 font-mono text-xs tracking-widest pl-4 border-l border-white/10">
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

        {/* Pulse Matrix & Live Indicator */}
        <div className="flex items-center gap-3 pointer-events-auto">
          {onTriggerPulse && (
            <button
              onClick={onTriggerPulse}
              className="relative inline-flex items-center gap-2 px-3.5 py-2 rounded-lg font-mono text-xs font-semibold text-sky-200 bg-sky-950/60 border border-sky-400/40 hover:border-sky-300 hover:bg-sky-900/60 shadow-[0_0_15px_rgba(56,189,248,0.25)] hover:shadow-[0_0_25px_rgba(56,189,248,0.45)] transition-all duration-300 cursor-pointer backdrop-blur-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>PULSE MATRIX</span>
            </button>
          )}

          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black/80 backdrop-blur-md border border-neutral-800 text-[11px] font-mono text-emerald-400 shadow-[0_0_12px_rgba(0,0,0,0.5)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-semibold tracking-wider">LIVE</span>
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* MOBILE HEADER (Phones & small screens < md)               */}
      {/* ========================================================= */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-black/85 backdrop-blur-xl border-b border-sky-500/20 px-4 py-3 pointer-events-auto">
        <div className="flex items-center justify-between">
          {/* Brand */}
          <a href="#overview" onClick={handleLinkClick} className="flex items-center gap-2.5">
            <div className="relative flex items-center justify-center w-7 h-7 rounded-md bg-sky-950/80 border border-sky-500/40 shadow-[0_0_10px_rgba(56,189,248,0.3)]">
              <Cpu className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
              <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_6px_#38bdf8]" />
            </div>
            <div>
              <span className="font-mono text-xs tracking-widest font-black text-white">
                NEXUS<span className="text-sky-400">.CORE</span>
              </span>
            </div>
          </a>

          {/* Right Controls: Live status + Hamburger toggle */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/70 border border-neutral-800 text-[10px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-semibold">LIVE</span>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              className="p-2 rounded-lg bg-sky-950/70 border border-sky-500/30 text-sky-300 hover:text-white transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* MOBILE DRAWER / OVERLAY                                   */}
        {/* ========================================================= */}
        {mobileMenuOpen && (
          <div className="mt-3 pt-4 pb-6 border-t border-white/10 space-y-4 animate-in fade-in slide-in-from-top-3 duration-200">
            <nav className="flex flex-col space-y-2 font-mono text-sm tracking-wider">
              <a
                href="#projects"
                onClick={handleLinkClick}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-neutral-950/80 hover:bg-sky-950/50 border border-neutral-900 hover:border-sky-500/30 text-neutral-200 hover:text-sky-300 transition-all"
              >
                <span>01 // ARCHIVE &amp; PROJECTS</span>
                <span className="text-sky-400 text-xs">GO &rarr;</span>
              </a>

              <a
                href="#capabilities"
                onClick={handleLinkClick}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-neutral-950/80 hover:bg-sky-950/50 border border-neutral-900 hover:border-sky-500/30 text-neutral-200 hover:text-sky-300 transition-all"
              >
                <span>02 // CORE CAPABILITIES</span>
                <span className="text-sky-400 text-xs">GO &rarr;</span>
              </a>

              <a
                href="#contact"
                onClick={handleLinkClick}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-neutral-950/80 hover:bg-sky-950/50 border border-neutral-900 hover:border-sky-500/30 text-neutral-200 hover:text-sky-300 transition-all"
              >
                <span>03 // TRANSMIT DISPATCH</span>
                <span className="text-sky-400 text-xs">GO &rarr;</span>
              </a>

              <a
                href="/resume.pdf"
                download="Mohnish_Kumar_Resume.pdf"
                onClick={handleLinkClick}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-sky-500 text-black font-bold hover:bg-sky-400 transition-all shadow-[0_0_15px_rgba(56,189,248,0.3)]"
              >
                <span className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  <span>04 // DOWNLOAD RESUME</span>
                </span>
                <span className="text-xs">&darr;</span>
              </a>
            </nav>

            {/* Mobile Actions: Pulse + Social Links */}
            <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
              {onTriggerPulse && (
                <button
                  onClick={() => {
                    onTriggerPulse();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-sky-950/80 border border-sky-400/40 text-sky-200 font-mono text-xs font-semibold"
                >
                  <Sparkles className="w-4 h-4 text-sky-400" />
                  <span>TRIGGER MATRIX PULSE</span>
                </button>
              )}

              <div className="flex items-center justify-center gap-3 pt-1">
                <a
                  href="mailto:mohnishkumar724@gmail.com"
                  className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-sky-300 text-xs font-mono flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>mohnishkumar724@gmail.com</span>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-sky-300 hover:text-white"
                  title="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
