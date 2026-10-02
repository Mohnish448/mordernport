'use client';

import React, { useEffect, useState } from 'react';
import { Crosshair, Zap, Eye, Box, Disc } from 'lucide-react';

export default function MatrixHUD({ matrixStats, onTriggerPulse }) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      setCoords({
        x: Math.round(e.clientX),
        y: Math.round(e.clientY),
      });
    };
    window.addEventListener('pointermove', handleMove);
    return () => window.removeEventListener('pointermove', handleMove);
  }, []);

  return (
    <aside aria-label="Cyber Telemetry HUD" className="fixed bottom-6 right-6 z-40 hidden lg:flex flex-col gap-3 pointer-events-none select-none">
      {/* Telemetry panel */}
      <div className="p-3.5 rounded-xl bg-black/75 backdrop-blur-md border border-sky-500/20 shadow-[0_0_25px_rgba(2,132,199,0.15)] pointer-events-auto w-64">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2.5">
          <div className="flex items-center gap-1.5">
            <Crosshair className="w-3.5 h-3.5 text-sky-400 animate-spin" style={{ animationDuration: '8s' }} />
            <span className="font-mono text-[11px] font-bold tracking-widest text-sky-200">
              MATRIX TELEMETRY
            </span>
          </div>
          <span className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
        </div>

        {/* Telemetry Stats */}
        <div className="space-y-1.5 font-mono text-[11px]">
          <div className="flex justify-between items-center text-neutral-300">
            <span>CURSOR COORDS:</span>
            <span className="text-sky-300 font-semibold">
              X:{coords.x} Y:{coords.y}
            </span>
          </div>

          <div className="flex justify-between items-center text-neutral-300">
            <span>POP-UP NODES:</span>
            <span className="text-white font-bold">
              {matrixStats?.activeCubes || 0} / {matrixStats?.totalCubes || 416}
            </span>
          </div>

          <div className="flex justify-between items-center text-neutral-300">
            <span>TOP FACE:</span>
            <span className="text-neutral-400 font-bold bg-neutral-900 px-1.5 py-0.5 rounded border border-neutral-800">
              VOID BLACK
            </span>
          </div>

          <div className="flex justify-between items-center text-neutral-300">
            <span>SIDE FLUX:</span>
            <span className="text-sky-400 font-bold">
              SKY BLUE &amp; WHITE
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-3 pt-2.5 border-t border-white/10">
          <button
            onClick={onTriggerPulse}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-sky-950/60 border border-sky-500/40 text-sky-200 hover:text-white hover:bg-sky-900/60 hover:border-sky-300 font-mono text-xs font-semibold tracking-wider shadow-[0_0_15px_rgba(56,189,248,0.2)] transition-all cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 text-sky-400" />
            <span>DISPATCH SHOCKWAVE</span>
          </button>
        </div>

      </div>

      {/* Guide Note */}
      <div className="px-3 py-1.5 rounded-lg bg-black/60 border border-white/5 font-mono text-[10px] text-neutral-300 text-center backdrop-blur-sm pointer-events-auto">
        Click anywhere on canvas to ripple
      </div>
    </aside>
  );
}
