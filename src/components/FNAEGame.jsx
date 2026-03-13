import React from 'react';
import GameContainer from './GameContainer';

export default function FNAEGame() {
  return (
    <GameContainer>
      <iframe 
        src="https://harshulmoon.github.io/fnae.html"
        className="w-full h-full border-none"
        title="FNAE Game"
        allow="autoplay; fullscreen"
      />
    </GameContainer>
  );
}
