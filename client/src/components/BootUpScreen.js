import React, { useState, useEffect } from 'react';
import './BootUpScreen.css';
import { ReactComponent as PsLogo } from '../assets/ps-logo.svg'; // Use this import for SVGs
import bootSound from '../assets/ps4-boot.mp3';

const BootUpScreen = ({ onFinished }) => {
  // New state to wait for the user's click
  const [userInteracted, setUserInteracted] = useState(false);
  const [show, setShow] = useState(true);

  // This effect will now run only AFTER the user has clicked
  useEffect(() => {
    // If the user hasn't interacted yet, do nothing.
    if (!userInteracted) {
      return;
    }

    const audio = new Audio(bootSound);
    audio.play().catch(e => console.error("Audio play failed:", e));

    const fadeOutTimer = setTimeout(() => {
      setShow(false);
      setTimeout(onFinished, 500); 
    }, 4000); // You can shorten this time if you like

    // Cleanup function to prevent memory leaks
    return () => clearTimeout(fadeOutTimer);
  }, [userInteracted, onFinished]); // Rerun this effect when userInteracted changes

  const handleStart = () => {
    setUserInteracted(true);
  };

  return (
    // Add an onClick handler to the main container
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