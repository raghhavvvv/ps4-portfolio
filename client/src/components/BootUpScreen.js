import React, { useState, useEffect } from 'react';
import './BootUpScreen.css';
import { ReactComponent as PsLogo } from '../assets/ps-logo.svg'; // Use this import for SVGs
import bootSound from '../assets/ps4-boot.mp3';

const BootUpScreen = ({ onFinished }) => {
  const [userInteracted, setUserInteracted] = useState(false);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!userInteracted) {
      return;
    }

    const audio = new Audio(bootSound);
    audio.play().catch(e => console.error("Audio play failed:", e));

    const fadeOutTimer = setTimeout(() => {
      setShow(false);
      setTimeout(onFinished, 500); 
    }, 4000); 
    return () => clearTimeout(fadeOutTimer);
  }, [userInteracted, onFinished]); 

  const handleStart = () => {
    setUserInteracted(true);
  };

  return (
    <div 
      className={`boot-screen ${!show ? 'fade-out' : ''}`} 
      onClick={!userInteracted ? handleStart : undefined}
    >
      <PsLogo className="boot-logo" />
      {/* Show a "click to start" message before interaction */}
      {!userInteracted && (
        <div className="start-prompt">
          Click to Start
        </div>
      )}
    </div>
  );
};

export default BootUpScreen;