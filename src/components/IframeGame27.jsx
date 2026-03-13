import React, { useRef } from 'react';
import { Maximize2 } from 'lucide-react';

export default function IframeGame27() {
  const iframeRef = useRef(null);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      iframeRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="w-full flex flex-col items-center bg-slate-900 rounded-3xl border border-slate-800 shadow-xl overflow-hidden">
      <div className="w-full bg-slate-950 text-white px-6 py-3 flex items-center justify-between">
        <h3 className="font-bold uppercase tracking-widest text-sm">Racing Challenge 27</h3>
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleFullscreen}
            className="text-slate-400 hover:text-white transition-colors p-1"
            title="Fullscreen Game"
          >
            <Maximize2 size={16} />
          </button>
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
          </div>
        </div>
      </div>
      <div className="relative w-full flex justify-center bg-black p-4">
        <iframe 
          ref={iframeRef}
          id="game-27-frame" 
          width="800" 
          height="500" 
          frameBorder="0" 
          scrolling="no" 
          allowFullScreen={true} 
          src="https://credit.riesgocrediticio.com/assets/iframe/27.html"
          className="rounded-lg shadow-2xl max-w-full h-auto aspect-[8/5]"
        />
      </div>
      <div className="p-6 bg-slate-950 w-full border-t border-slate-800">
        <h4 className="font-bold text-white mb-2 underline decoration-indigo-500 decoration-2 underline-offset-4">Game Description</h4>
        <p className="text-sm text-slate-400 leading-relaxed">
          Challenge yourself with this new racing game!
        </p>
      </div>
    </div>
  );
}
