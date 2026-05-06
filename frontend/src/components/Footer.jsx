import { Link } from 'react-router-dom';
import logo from '../assets/logo (1).png';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="boutique-footer">
      <div className="container">
        
        <div className="footer-top">
          <div className="footer-brand">
            <img src={logo} alt="Shoot @ Sight" className="footer-logo" />
            <p className="footer-slogan">PRESERVING THE UNSPOKEN</p>
          </div>
          <div className="footer-nav">
            <div className="footer-col">
              <h4>EXPLORE</h4>
              <Link to="/portfolio">Collections</Link>
              <Link to="/blog">The Journal</Link>
              <Link to="/about">Our Story</Link>
            </div>
            <div className="footer-col">
              <h4>CONNECT</h4>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer">Youtube</a>
              <a href="mailto:hello@shootatsight.com">Email Us</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <div className="footer-info">
            <p className="copyright">© 2026 SHOOT @ SIGHT. ALL RIGHTS RESERVED.</p>
            <p className="location">HYDERABAD / GLOBAL</p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
