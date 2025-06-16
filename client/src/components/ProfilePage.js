import React from 'react';
import './ProfilePage.css'; // We will create this next
import { Link } from 'react-router-dom';
import { FaUser, FaInfoCircle, FaGamepad, FaArrowLeft, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';


const ProfilePage = () => {
  const user = {
    name: 'Raghav Pant',
    avatar: '/images/profile-pic.jpeg', 
    bio: 'I am a passionate full-stack developer with a love for creating intuitive and dynamic user experiences. Inspired by gaming interfaces and modern design, I strive to build applications that are both functional and fun to use.',
    skills: 'React, Node.js, MongoDB, Express, JavaScript, Python, UI/UX Design, Machine Learning, Artificial Intelligence, Docker & Containerization, Agile Methodologies, RESTful APIs, Git & Version Control, Problem Solving, Team Collaboration, Continuous Learning', 
    socials: [
      {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/raghav-pant-361716219/',
        icon: <FaLinkedin />
      },
      {
        name: 'Email',
        url: 'mailto:raghavpant443@gmail.com',
        icon: <FaEnvelope />
      },
      {
        name: 'LeetCode',
        url: 'https://leetcode.com/u/raghhavvvv/',
        icon: <SiLeetcode />
      }
    ]
    // -------------------------
  };

  return (
    <div className="profile-page-container">
      <div className="profile-sidebar">
        <div className="profile-picture-placeholder">
          {user.avatar ? <img src={user.avatar} alt="Profile" /> : <FaUser />}
        </div>
        <div className="profile-info">
          <h2>{user.name}</h2>
          <p className="tagline">MERN Stack Developer</p> 
        </div>
        <nav className="profile-nav">
          <ul>
            <li className="active"><FaInfoCircle /> About</li>
            {/* Add more sections here later */}
          </ul>
        </nav>
        <Link to="/" className="back-button">
          <FaArrowLeft /> Back to Home
        </Link>
      </div>

      <main className="profile-content">
        <div className="content-panel">
          <h3>About Me</h3>
          <p>{user.bio}</p>
          
        <div className="socials-container">
            {user.socials.map((social) => (
              <a 
                key={social.name} 
                href={social.url} 
                // Open external links in a new tab, but not mailto links
                target={social.name === 'Email' ? '_self' : '_blank'} 
                rel="noopener noreferrer" 
                className="social-link"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
          {/* --------------------------- */}

        </div>
        <div className="content-panel">
          <h3>Core Skills</h3>
          <p>{user.skills}</p>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;