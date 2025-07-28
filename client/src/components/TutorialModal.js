import React, { useEffect } from 'react';
import './TutorialModal.css';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUp, FaArrowDown, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const TutorialModal = ({ onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === 'x') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="modal-content"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.7, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          <h2>Welcome to my interactive portfolio!</h2>
          <p>This portfolio is designed to be navigated like a console menu, so you can use arrow keys for navigation.</p>
          <p>Click on my name and profile section on the top left to get to know me better!</p>

          
          <div className="instructions">
            <div className="instruction-item">
              <div className="keys">
                <FaArrowUp /> / <FaArrowDown />
              </div>
              <span>Switch Categories</span>
            </div>
            <div className="instruction-item">
              <div className="keys">
                <FaArrowLeft /> / <FaArrowRight />
              </div>
              <span>Browse Items</span>
            </div>
          </div>

          <button className="close-button" onClick={onClose}>
            <span className="ps-button-x">✕</span>
            Continue
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TutorialModal;