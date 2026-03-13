import React, { useState, useRef, useEffect } from 'react';
import { Maximize2, Minimize2, RotateCw, ShieldCheck, ArrowLeft, Gamepad2 } from 'lucide-react';

export default function ArcadeGame169() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const reloadGame = () => {
    const iframe = document.getElementById('game-area-169');
    if (iframe) {
      iframe.src = iframe.src;
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full bg-slate-950 flex flex-col transition-all duration-500 ${
        isFullscreen ? 'h-screen rounded-none' : 'h-[600px] rounded-[2.5rem] border-4 border-slate-900 shadow-2xl overflow-hidden'
      }`}
    >
      {/* Game Header / Controls */}
      <div className="bg-slate-900/80 backdrop-blur-md px-6 py-3 flex items-center justify-between border-b border-white/5 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-rose-500 flex items-center justify-center text-white shadow-lg shadow-rose-500/20">
            <Gamepad2 size={18} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">Neon Slope</h3>
            <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest">Arcade ID: 169</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full uppercase tracking-tighter border border-emerald-400/20">
            <ShieldCheck size={12} />
            Verified Safe
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={reloadGame}
              className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"
              title="Reload Game"
            >
              <RotateCw size={18} />
            </button>
            <button 
              onClick={toggleFullscreen}
              className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"
              title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            >
              {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Game Content */}
      <div className="flex-grow relative bg-black flex items-center justify-center">
        <iframe 
          id="game-area-169"
          src="https://y8.com/embed/slope"
          style={{ width: '960px', height: '641px', border: '0', margin: '0', padding: '0' }}
          className="max-w-full max-h-full"
          allowFullScreen
          scrolling="no"
          title="Slope Arcade (Y8 version)"
        />
        
        {/* Mobile Back Button Simulation (as per snippet) */}
        {!isFullscreen && (
          <div className="absolute top-4 left-4 pointer-events-none opacity-50">
            <div className="bg-slate-900/80 p-2 rounded-full text-white border border-white/10">
              <ArrowLeft size={16} />
            </div>
          </div>
        )}
      </div>

      {/* Game Footer */}
      {!isFullscreen && (
        <div className="bg-slate-900/50 px-6 py-3 border-t border-white/5 flex items-center justify-between shrink-0">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            Controls: Arrow Keys / WASD
          </div>
          <div className="text-[10px] font-bold text-rose-500/80 uppercase tracking-widest">
            High Score: 4,200
          </div>
        </div>
      )}
    </div>
  );
}
