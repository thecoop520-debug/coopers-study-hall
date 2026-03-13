import React from 'react';
import GameContainer from './GameContainer';

export default function VengeIO() {
  return (
    <GameContainer>
      <iframe 
        src="https://venge.io/"
        className="w-full h-full border-none"
        title="Venge.io"
        allow="autoplay; fullscreen; pointer-lock"
      />
    </GameContainer>
  );
}
