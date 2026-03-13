import React, { useRef } from 'react';
import { Maximize2 } from 'lucide-react';

export default function RetroRacingGame() {
  const iframeRef = useRef(null);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      iframeRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="w-full flex flex-col items-center bg-white rounded-3xl border-2 border-slate-200 shadow-xl overflow-hidden">
      <div className="w-full bg-slate-900 text-white px-6 py-3 flex items-center justify-between">
        <h3 className="font-bold uppercase tracking-widest text-sm">Retro Racing Adventure</h3>
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
          id="retro-racing-frame" 
          width="800" 
          height="500" 
          frameBorder="0" 
          scrolling="no" 
          allowFullScreen={true} 
          src="https://credit.riesgocrediticio.com/assets/iframe/33.html"
          className="rounded-lg shadow-2xl max-w-full h-auto aspect-[8/5]"
        />
      </div>
      <div className="p-6 bg-slate-50 w-full border-t border-slate-200">
        <h4 className="font-bold text-slate-900 mb-2 underline decoration-indigo-500 decoration-2 underline-offset-4">Game Description</h4>
        <p className="text-sm text-slate-600 leading-relaxed">
          A classic retro-style racing challenge. Test your reflexes and speed on the track. 
          A great way to clear your mind between intense study sessions!
        </p>
      </div>
    </div>
  );
}
