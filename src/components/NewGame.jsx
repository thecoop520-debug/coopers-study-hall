import React from 'react';

export default function NewGame() {
  return (
    <div className="w-full h-[600px] rounded-[2rem] overflow-hidden border border-slate-800 shadow-lg bg-black">
      <iframe 
        src="https://script.google.com/macros/s/AKfycbwzYMDDcdDUAvEP7iO6OdRk-5_oUp6vYvDdyEEz8tTOzWi5y4-Qf3vQ6TBoZuc9UYVcLg/exec"
        className="w-full h-full border-none"
        title="New Game"
        allow="autoplay; fullscreen"
      />
    </div>
  );
}
