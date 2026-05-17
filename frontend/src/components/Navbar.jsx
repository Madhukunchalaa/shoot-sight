import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
const logo = "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/logo_1.webp";
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close hamburger menu on route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    // If not on home page, navbar is always full visible
    if (!isHomePage) {
      setIsScrolled(true);
      return;
    }

    // Reset scroll state on home page mount
    setIsScrolled(window.scrollY > 100);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isHomePage]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className={`boutique-nav ${(!isHomePage || isScrolled) ? 'nav-full-visible' : 'nav-logo-only'} ${isMenuOpen ? 'menu-is-open' : ''}`}>
        <div className="nav-container">
          
          <div className="nav-left">
            <Link to="/" className="nav-brand-link">
              <img src={logo} alt="Shoot @ Sight" className="nav-logo" />
            </Link>
          </div>

          <div className="nav-right">
            <div className="nav-links">
              <Link to="/" className="nav-link-item">HOME</Link>
              <Link to="/about" className="nav-link-item">ABOUT</Link>
              <Link to="/portfolio" className="nav-link-item">PORTFOLIO</Link>
              <Link to="/blog" className="nav-link-item">BLOG</Link>
              <Link to="/contact" className="nav-link-item">CONTACT</Link>
            </div>
            
            <Link to="/contact" className="nav-cta-pill-camera">
              <svg className="nav-camera-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="13" r="4" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="18.5" cy="8.5" r="0.5" fill="currentColor"/>
              </svg>
              <span>START A CONVERSATION</span>
            </Link>
          </div>

          {/* Luxury Minimalist Hamburger Button (Visible only on mobile) */}
          <button 
            className={`mobile-hamburger-btn ${isMenuOpen ? 'open' : ''}`} 
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <span className="hamburger-line line-top"></span>
            <span className="hamburger-line line-bottom"></span>
          </button>

        </div>
      </nav>

      {/* Fullscreen Luxury Slide Drawer Overlay */}
      <div className={`mobile-menu-overlay ${isMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-inner">
          
          <div className="mobile-menu-links">
            <Link to="/" className="mobile-menu-link-item" onClick={toggleMenu}>
              <span>01 //</span> HOME
            </Link>
            <Link to="/about" className="mobile-menu-link-item" onClick={toggleMenu}>
              <span>02 //</span> ABOUT
            </Link>
            <Link to="/portfolio" className="mobile-menu-link-item" onClick={toggleMenu}>
              <span>03 //</span> PORTFOLIO
            </Link>
            <Link to="/blog" className="mobile-menu-link-item" onClick={toggleMenu}>
              <span>04 //</span> BLOG
            </Link>
            <Link to="/contact" className="mobile-menu-link-item" onClick={toggleMenu}>
              <span>05 //</span> CONTACT
            </Link>
          </div>

          <div className="mobile-menu-footer">
            <span className="mobile-menu-tagline">NOW BOOKING 2026 / 2027</span>
            <a 
              href="https://wa.me/919900233338" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mobile-menu-cta"
              onClick={toggleMenu}
            >
              Start a Conversation
            </a>
          </div>

        </div>
      </div>
    </>
  );
};

export default Navbar;
