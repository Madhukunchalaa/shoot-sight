import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo (1).png';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const handleScroll = () => {
      // Show full navbar elements after 100px
      setIsScrolled(window.scrollY > 100);
    };

    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timer);
    };
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  return (
    <nav className={`boutique-nav ${isScrolled ? 'nav-full-visible' : 'nav-logo-only'}`}>
      <div className="nav-container">
        
        <div className="nav-left">
          <Link to="/" className="nav-brand-link">
            <img src={logo} alt="Shoot @ Sight" className="nav-logo" />
          </Link>
        </div>

        <div className="nav-right">
          <div className="nav-links">
            <Link to="/portfolio" className="nav-link-item">PORTFOLIO</Link>
            <div className="nav-divider"></div>
            <div className="nav-location">
              <span>HYDERABAD</span>
              <span className="digital-clock">{formatTime(time)}</span>
            </div>
          </div>
          
          <Link to="/contact" className="nav-cta-pill">
            <span className="dot"></span>
            START A CONVERSATION
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
