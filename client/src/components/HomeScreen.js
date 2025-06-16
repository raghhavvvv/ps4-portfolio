import React, { useState, useEffect, useMemo } from 'react';
import './HomeScreen.css'; // We will update this file too
import Header from './Header'; // Import the new Header
import { motion } from 'framer-motion';
import ResumeViewer from './ResumeViewer';
import { playSound } from '../utils/audio';
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';



// This is our main content navigator now
const MainContentNav = ({ activeSection, onSectionClick }) => {
  const sections = ['Projects', 'Experiences', 'Education', 'Resume']; // Add more here as needed

  return (
    <div className="main-content-nav">
      <div className="nav-group-label">PORTFOLIO</div> {/* Like "GAMES & MEDIA" */}
      {sections.map(section => (
        <div
          key={section}
          className={`main-nav-item ${activeSection === section ? 'active' : ''}`}
          onClick={() => onSectionClick(section)}
        >
          {section}
        </div>
      ))}
    </div>
  );
};

const ContentCard = ({ item, isActive }) => (
  <motion.div
    className="content-card"
    animate={{ scale: isActive ? 1.1 : 1 }}
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
  >
    <img src={item.imageUrl} alt={item.title} />
    {isActive && <h4 className="card-title">{item.title}</h4>}
  </motion.div>
);

const HomeScreen = () => {
  const [data, setData] = useState({ projects: [], experiences: [], education: [] });
  const [activeSection, setActiveSection] = useState('Projects');
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetch('/api/portfolio-data')
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error("Failed to fetch data:", err));
  }, []);
  
  // This logic determines which array of items to display
  const currentItems = useMemo(() => {
    return data[activeSection.toLowerCase()] || [];
  }, [data, activeSection]);
  // Reset activeIndex when the section changes
  useEffect(() => {
    setActiveIndex(0);
  }, [activeSection]);

 // In your HomeScreen component, find the useEffect that handles keydown events

  useEffect(() => {
    // --- The Completed Function ---
    const handleKeyDown = (e) => {
      // If there are no items to navigate, do nothing
      if (!currentItems.length) return;

      // Handle right arrow key press
      if (e.key === 'ArrowRight') {
        // Play the navigation sound first
        playSound('/sounds/navigate.mp3'); 
        // Then, update the state to move to the next item
        setActiveIndex(prev => (prev + 1) % currentItems.length);
      } 
      // Handle left arrow key press
      else if (e.key === 'ArrowLeft') {
        // Play the navigation sound first
        playSound('/sounds/navigate.mp3');
        // Then, update the state to move to the previous item
        setActiveIndex(prev => (prev - 1 + currentItems.length) % currentItems.length);
      }
    };

    // Add the event listener when the component mounts
    window.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener when the component unmounts to prevent memory leaks
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentItems]); // The effect re-runs if the list of items changes

   return (
    <div className="home-screen-container">
      <Header />
      <MainContentNav activeSection={activeSection} onSectionClick={setActiveSection} />
      
      {activeSection !== 'Resume' ? (
        <>
          <div className="content-row-wrapper">
                      {currentItems.length > 1 && (
              <>
                <div className="nav-arrow left">
                  <FaChevronLeft />
                </div>
                <div className="nav-arrow right">
                  <FaChevronRight />
                </div>
              </>
            )}
            {/* --------------------------- */}
            
            <motion.div
              className="content-row"
              key={activeSection}
              initial={{ opacity: 0 }}
              animate={{ x: `calc(50% - ${activeIndex * 220}px - 110px)`, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {currentItems.map((item, index) => (
                <ContentCard 
                  key={item._id} 
                  item={item} 
                  isActive={index === activeIndex} 
                  label={
                    activeSection === 'Education' ? item.school :
                    activeSection === 'Experiences' ? item.company :
                    item.title
                  } 
                />
              ))}
            </motion.div>
          </div>
          
          {currentItems[activeIndex] && (
          <motion.div 
            key={currentItems[activeIndex]._id}
            className="detail-pane"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2>{currentItems[activeIndex].title}</h2>
            <p>{currentItems[activeIndex].description}</p>
            
            {/* --- THIS IS THE NEW CODE --- */}
            <div className="action-buttons">
              {/* Conditionally render the "View Live" button */}
              {currentItems[activeIndex].liveUrl && (
                <a href={currentItems[activeIndex].liveUrl} target="_blank" rel="noopener noreferrer">
                  <FaExternalLinkAlt /> View Live
                </a>
              )}
              {/* Conditionally render the "View Code" button */}
              {currentItems[activeIndex].repoUrl && (
                <a href={currentItems[activeIndex].repoUrl} target="_blank" rel="noopener noreferrer">
                  <FaGithub /> View Code
                </a>
              )}
            </div>
            {/* --------------------------- */}
            
          </motion.div>
        )}
        </>
      ) : (
        // If the section IS 'Resume', show our new component
        <ResumeViewer />
      )}
    </div>
  );
};

export default HomeScreen;