import React from 'react';

export default function VengeIO() {
  return (
    <div className="w-full h-[600px] rounded-[2rem] overflow-hidden border border-slate-800 shadow-lg">
      <iframe 
        src="https://venge.io/"
        className="w-full h-full border-none"
        title="Venge.io"
        allow="autoplay; fullscreen; pointer-lock"
      />
    </div>
  );
}
