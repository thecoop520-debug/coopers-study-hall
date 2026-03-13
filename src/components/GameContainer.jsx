import React, { useRef, useState, useEffect } from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';

export default function GameContainer({ children }) {
  const containerRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

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

  return (
    <div 
      ref={containerRef}
      className={`relative w-full rounded-[2rem] overflow-hidden border border-slate-800 shadow-lg bg-black ${isFullscreen ? 'h-screen rounded-none' : 'h-[600px]'}`}
    >
      <div className="absolute top-4 right-4 z-10">
        <button 
          onClick={toggleFullscreen}
          className="bg-slate-900/80 text-white p-2 rounded-full hover:bg-slate-800 transition-colors"
          title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
          {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
        </button>
      </div>
      {children}
    </div>
  );
}
