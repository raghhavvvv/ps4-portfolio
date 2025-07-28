import React, { useState, useEffect, useMemo } from 'react';
import './HomeScreen.css';
import { motion, AnimatePresence } from 'framer-motion';
import portfolioData from '../data.json';
import useWindowSize from '../hooks/useWindowSize';
import TutorialModal from './TutorialModal';
import Header from './Header';
import ResumeViewer from './ResumeViewer';
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { playSound } from '../utils/audio';
const sections = ['Projects', 'Experiences', 'Education', 'Resume'];


const MainContentNav = ({ activeSection, onSectionClick, sections }) => {
  return (
    <div className="main-content-nav">
      <div className="nav-group-label">PORTFOLIO</div>
      {sections.map(section => (
        <div key={section} className={`main-nav-item ${activeSection === section ? 'active' : ''}`} onClick={() => onSectionClick(section)}>
          {section}
        </div>
      ))}
    </div>
  );
};

const ContentCard = ({ item, isActive, label, onClick }) => (
  <motion.div
    className="content-card"
    onClick={onClick}
    animate={{ scale: isActive ? 1.1 : 1 }}
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
  >
    <img src={item.imageUrl} alt={item.title} />
  </motion.div>
);

const HomeScreen = () => {
  const data = portfolioData;
  const [activeSection, setActiveSection] = useState('Projects');
  const [activeIndex, setActiveIndex] = useState(0);
  const [showTutorial, setShowTutorial] = useState(true);
  const { width } = useWindowSize();
  const isMobile = width <= 768;


  const currentItems = useMemo(() => {
    return data[activeSection.toLowerCase()] || [];
  }, [data, activeSection]);

  useEffect(() => {
    setActiveIndex(0);
  }, [activeSection]);


  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showTutorial) return;
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        playSound('/sounds/navigate.mp3'); // Play navigation sound

        const currentSectionIndex = sections.indexOf(activeSection);
        let nextSectionIndex;

        if (e.key === 'ArrowDown') {
          nextSectionIndex = (currentSectionIndex + 1) % sections.length;
        } else { // ArrowUp
          nextSectionIndex = (currentSectionIndex - 1 + sections.length) % sections.length;
        }
        
        setActiveSection(sections[nextSectionIndex]);
      }

      else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        if (!currentItems.length || activeSection === 'Resume') return;
        
        playSound('/sounds/navigate.mp3');
        
        if (e.key === 'ArrowRight') {
          setActiveIndex(prev => (prev + 1) % currentItems.length);
        } else { // ArrowLeft
          setActiveIndex(prev => (prev - 1 + currentItems.length) % currentItems.length);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    
  }, [currentItems, activeSection, isMobile, showTutorial]);
  return (
    <div className="home-screen-container">
    {showTutorial && !isMobile && <TutorialModal onClose={() => setShowTutorial(false)} />}      
      <Header />
      <MainContentNav activeSection={activeSection} onSectionClick={setActiveSection} sections={sections} />
            
      {activeSection !== 'Resume' ? (
        <div className="content-row-wrapper">
          {/* Show arrows only on desktop and if there's content to scroll */}
          {!isMobile && currentItems.length > 1 && (
            <>
              <div className="nav-arrow left"><FaChevronLeft /></div>
              <div className="nav-arrow right"><FaChevronRight /></div>
            </>
          )}
          
          <motion.div
            className="content-row"
            key={activeSection}
            initial={{ opacity: 0 }}
            animate={{ 
              x: isMobile ? 0 : `calc(50% - ${activeIndex * 220}px - 110px)`, 
              opacity: 1 
            }}
            // ------------------------------------------
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {currentItems.map((item, index) => (
              <React.Fragment key={item._id}>
                <ContentCard 
                  item={item} 
                  isActive={index === activeIndex} 
                  onClick={() => setActiveIndex(index)}
                />
                
                {/* --- KEY CHANGE: Render mobile details conditionally --- */}
                {isMobile && (
                  <AnimatePresence>
                    {index === activeIndex && (
                      <motion.div
                        className="detail-pane" // We can reuse this class now
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: 20, marginBottom: 20 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0, marginBottom: 0 }}
                      >
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                        <div className="action-buttons">
                          {item.liveUrl && <a href={item.liveUrl} target="_blank" rel="noopener noreferrer"><FaExternalLinkAlt /> View Live</a>}
                          {item.repoUrl && <a href={item.repoUrl} target="_blank" rel="noopener noreferrer"><FaGithub /> View Code</a>}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      ) : (
        <ResumeViewer />
      )}

      {/* --- KEY CHANGE: Render desktop details conditionally --- */}
      {!isMobile && currentItems.length > 0 && currentItems[activeIndex] && (
        <div className="detail-pane-desktop">
          <motion.div 
             key={currentItems[activeIndex]._id}
             className="detail-pane"
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
           >
             <h2>{currentItems[activeIndex].title}</h2>
             <p>{currentItems[activeIndex].description}</p>
             <div className="action-buttons">
               {currentItems[activeIndex].liveUrl && <a href={currentItems[activeIndex].liveUrl} target="_blank" rel="noopener noreferrer"><FaExternalLinkAlt /> View Live</a>}
               {currentItems[activeIndex].repoUrl && <a href={currentItems[activeIndex].repoUrl} target="_blank" rel="noopener noreferrer"><FaGithub /> View Code</a>}
             </div>
           </motion.div>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;