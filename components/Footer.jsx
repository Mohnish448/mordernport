'use client';

import React from 'react';
import { Mail, Globe } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from './SocialIcons';

export default function Footer() {
  return (
    <footer className="relative border-t border-neutral-900 bg-black/90 backdrop-blur-md py-10 sm:py-12 px-4 sm:px-6 md:px-8 pointer-events-none">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 pointer-events-auto text-center md:text-left">
        
        {/* Left */}
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
          <span className="font-mono text-xs font-bold text-white tracking-widest">
            NEXUS<span className="text-sky-400">.SYSTEMS</span>
          </span>
          <span className="text-neutral-700">|</span>
          <span className="font-mono text-[11px] sm:text-xs text-neutral-400">
            ALL PROTOCOLS VERIFIED
          </span>
        </div>

        {/* Center */}
        <div className="font-mono text-[10px] sm:text-[11px] text-neutral-400 tracking-wider">
          KINETIC MATRIX ANIMATION &copy; {new Date().getFullYear()} // SKY BLUE &amp; WHITE CORES
        </div>

        {/* Right Socials & Contact */}
        <div className="flex items-center justify-center gap-3">
          <a
            href="mailto:mohnishkumar724@gmail.com"
            title="Email mohnishkumar724@gmail.com"
            className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-sky-400 hover:border-sky-500/40 transition-colors"
          >
            <Mail className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/mohnish-dev/"
            target="_blank"
            rel="noreferrer"
            title="Connect on LinkedIn"
            className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-sky-400 hover:border-sky-500/40 transition-colors"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href="https://github.com/Mohnish448"
            target="_blank"
            rel="noreferrer"
            title="GitHub Profile"
            className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-sky-400 hover:border-sky-500/40 transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noreferrer"
            title="X / Twitter"
            className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-sky-400 hover:border-sky-500/40 transition-colors"
          >
            <Globe className="w-4 h-4" />
          </a>
        </div>

      </div>
    </footer>
  );
}
