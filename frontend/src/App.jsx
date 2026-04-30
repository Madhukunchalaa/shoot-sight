import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Routes, Route, useLocation } from 'react-router-dom';
import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import logo from './assets/logo (1).png';
import './App.css';

// Scroll to Top Helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  const loaderRef = useRef();

  useEffect(() => {
    gsap.to(loaderRef.current, {
      yPercent: -100,
      duration: 1.5,
      ease: 'expo.inOut',
      delay: 0.5
    });
  }, []);

  return (
    <SmoothScroll>
      <div ref={loaderRef} className="page-loader">
        <span className="loader-text">SHOOT @ SIGHT</span>
      </div>
      <ScrollToTop />
      <CustomCursor />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <footer className="footer-stylish">
        <div className="container">
          <div className="footer-top">
            <img src={logo} alt="Shoot @ Sight" className="footer-logo" />
            <div className="footer-nav">
              <a href="/portfolio">Portfolio</a>
              <a href="/about">About</a>
              <a href="/blog">Journal</a>
              <a href="/contact">Contact</a>
            </div>
          </div>
          <div className="footer-divider"></div>
          <div className="footer-bottom">
            <p>© 2026 Shoot @ Sight. Capturing Eternal Narratives.</p>
            <div className="footer-social">
              <a href="#">Instagram</a>
              <a href="https://wa.me/917989776255">WhatsApp</a>
            </div>
          </div>
        </div>
      </footer>
    </SmoothScroll>
  );
}


export default App;
