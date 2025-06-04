'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import ReactConfetti from 'react-confetti';

interface EasterEggContextType {
  isPartyMode: boolean;
  triggerPartyMode: () => void;
  stopPartyMode: () => void;
}

const EasterEggContext = createContext<EasterEggContextType | undefined>(undefined);

export function EasterEggProvider({ children }: { children: React.ReactNode }) {
  const [isPartyMode, setIsPartyMode] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const triggerPartyMode = () => {
    setIsPartyMode(true);
    // Add a class to the body for global effects
    document.body.classList.add('party-mode');
    
    // Stop party mode after 30 seconds
    setTimeout(() => {
      stopPartyMode();
    }, 30000);
  };

  const stopPartyMode = () => {
    setIsPartyMode(false);
    document.body.classList.remove('party-mode');
  };

  return (
    <EasterEggContext.Provider value={{ isPartyMode, triggerPartyMode, stopPartyMode }}>
      {isPartyMode && (
        <>
          <ReactConfetti
            width={windowSize.width}
            height={windowSize.height}
            numberOfPieces={200}
            recycle={false}
          />
          <div className="fixed inset-0 pointer-events-none bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 opacity-20 animate-gradient-x" />
        </>
      )}
      <div className={isPartyMode ? 'animate-bounce-slow' : ''}>
        {children}
      </div>
    </EasterEggContext.Provider>
  );
}

export function useEasterEgg() {
  const context = useContext(EasterEggContext);
  if (context === undefined) {
    throw new Error('useEasterEgg must be used within an EasterEggProvider');
  }
  return context;
} 