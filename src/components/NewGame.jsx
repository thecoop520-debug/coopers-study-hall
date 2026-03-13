import React from 'react';
import GameContainer from './GameContainer';

export default function NewGame() {
  return (
    <GameContainer>
      <iframe 
        src="https://script.google.com/macros/s/AKfycbwzYMDDcdDUAvEP7iO6OdRk-5_oUp6vYvDdyEEz8tTOzWi5y4-Qf3vQ6TBoZuc9UYVcLg/exec"
        className="w-full h-full border-none"
        title="New Game"
        allow="autoplay; fullscreen"
      />
    </GameContainer>
  );
}
