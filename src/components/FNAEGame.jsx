import React from 'react';

export default function FNAEGame() {
  return (
    <div className="w-full h-[600px] rounded-[2rem] overflow-hidden border border-slate-800 shadow-lg bg-black">
      <iframe 
        src="https://harshulmoon.github.io/fnae.html"
        className="w-full h-full border-none"
        title="FNAE Game"
        allow="autoplay; fullscreen"
      />
    </div>
  );
}
