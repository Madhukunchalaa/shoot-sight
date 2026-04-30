import { Link } from 'react-router-dom';
import logo from '../assets/logo (1).png';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          <img src={logo} alt="Shoot @ Sight Logo" className="navbar-logo" />
        </Link>
        <div className="nav-links">
          <Link to="/portfolio" className="nav-item">Portfolio</Link>
          <Link to="/blog" className="nav-item">Journal</Link>
          <Link to="/about" className="nav-item">About</Link>
          <Link to="/contact" className="nav-item">Contact</Link>
        </div>
        <div className="nav-cta">
          <Link to="/contact" className="btn-premium">Inquire</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
