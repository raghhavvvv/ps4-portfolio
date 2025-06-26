import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { FaUser, FaRegEnvelope, FaSmile, FaHeadphones, FaTrophy, FaCog, FaPowerOff } from 'react-icons/fa';

const Clock = () => {
  const [time, setTime] = React.useState(new Date());
  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000 * 60); // Update every minute
    return () => clearInterval(timer);
  }, []);
  return <div className="clock">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>;
};


const Header = () => {
  return (
    <div className="header-container">
      <div className="profile-section">
        <Link to="/profile" className="profile-link">
          <FaUser className="profile-icon" />
          <span>Raghav Pant</span>
        </Link>
      </div>

      {}
      <div className="header-right-section">
        {}
        <div className="system-icons">
          <FaRegEnvelope />
          <FaSmile />
          <FaHeadphones />
          <FaTrophy />
          <FaCog />
          <FaPowerOff />
        </div>
        <Clock />
      </div>
      {/* --------------------------------- */}

    </div>
  );
};

export default Header;