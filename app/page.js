'use client';

import React, { useState, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import ContactTerminal from '../components/ContactTerminal';
import Footer from '../components/Footer';
import MatrixHUD from '../components/MatrixHUD';

// Dynamic import with SSR disabled to guarantee clean WebGL canvas mount
const InteractiveCubeGrid = dynamic(
  () => import('../components/InteractiveCubeGrid'),
  { ssr: false }
);

export default function PortfolioPage() {
  const [matrixStats, setMatrixStats] = useState({ activeCubes: 0, totalCubes: 416 });
  const pulseTriggerRef = useRef(null);

  const handleStats = useCallback((stats) => {
    setMatrixStats(stats);
  }, []);

  const triggerPulseWave = useCallback(() => {
    // Dispatch a custom event or trigger canvas shockwave
    window.dispatchEvent(
      new MouseEvent('pointerdown', {
        clientX: window.innerWidth / 2,
        clientY: window.innerHeight / 2,
        bubbles: true,
      })
    );
  }, []);

  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-sky-500 selection:text-black overflow-x-hidden font-sans">
      {/* 1. Interactive 3D Cube Grid (Square Pop-Up Animation on Hover) */}
      <InteractiveCubeGrid onMatrixStats={handleStats} />

      {/* 2. Floating Telemetry HUD */}
      <MatrixHUD matrixStats={matrixStats} onTriggerPulse={triggerPulseWave} />

      {/* 3. Futuristic Navigation */}
      <Navbar onTriggerPulse={triggerPulseWave} />

      {/* 4. Portfolio Content Flow (All hoverable and interactive) */}
      <div className="relative z-10">
        <Hero onTriggerPulse={triggerPulseWave} />
        <Projects />
        <Skills />
        <ContactTerminal />
        <Footer />
      </div>
    </main>
  );
}