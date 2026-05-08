import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo (1).png';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const links = [
    { to: '/', label: 'HOME' },
    { to: '/portfolio', label: 'PORTFOLIO' },
    { to: '/films', label: 'FILMS' },
    { to: '/blog', label: 'BLOG' },
    { to: '/contact', label: 'CONTACT' },
  ];

  return (
    <>
      <nav className={`boutique-nav ${isScrolled ? 'nav-full-visible' : 'nav-logo-only'}`}>
        <div className="nav-container">

          <div className="nav-left">
            <Link to="/" className="nav-brand-link">
              <img src={logo} alt="Shoot @ Sight" className="nav-logo" />
            </Link>
          </div>

          {/* Desktop links */}
          <div className="nav-right">
            <div className="nav-links">
              <Link to="/" className="nav-link-item">HOME</Link>
              <div className="nav-divider"></div>
              <Link to="/portfolio" className="nav-link-item">PORTFOLIO</Link>
              <div className="nav-divider"></div>
              <Link to="/films" className="nav-link-item">FILMS</Link>
              <div className="nav-divider"></div>
              <Link to="/blog" className="nav-link-item">BLOG</Link>
              <div className="nav-divider"></div>
              <Link to="/contact" className="nav-link-item">CONTACT</Link>
            </div>
          </div>

          {/* Hamburger button */}
          <button
            className={`nav-hamburger ${menuOpen ? 'nav-hamburger--open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>

        </div>
      </nav>

      {/* Mobile overlay menu */}
      <div className={`nav-mobile-menu ${menuOpen ? 'nav-mobile-menu--open' : ''}`}>
        <nav className="nav-mobile-links">
          {links.map(({ to, label }, i) => (
            <Link
              key={to}
              to={to}
              className="nav-mobile-link"
              style={{ transitionDelay: menuOpen ? `${i * 80}ms` : '0ms' }}
            >
              <span className="nav-mobile-link__num">0{i + 1}</span>
              {label}
            </Link>
          ))}
        </nav>
        <div className="nav-mobile-footer">
          <span>SHOOT @ SIGHT</span>
          <span>HYDERABAD · INDIA</span>
        </div>
      </div>
    </>
  );
};

export default Navbar;
