import { useEffect, useState, useLayoutEffect } from 'react';
import './Hero.css';

const logo = "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/logo_1.webp";

const triads = [
  [
    "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/hero-banner/2S9A9106__4__jpg.webp",
    "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/hero-banner/DSC06041_3__1___2__jpg.webp",
    "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/hero-banner/KRP_7295_jpg.webp"
  ],
  [
    "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/hero-banner/KRP_9557__3__jpg.webp",
    "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/hero-banner/KRP_9878__2__jpg.webp",
    "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/hero-banner/KRP_9878__3__jpg.webp"
  ],
  [
    "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/hero-banner/SASP4766__2__jpg.webp",
    "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/hero-banner/SAS_2092__2__jpg.webp",
    "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/hero-banner/SYD08443__5__jpg.webp"
  ]
];

const Hero = () => {
  const [triadIndex, setTriadIndex] = useState(0);

  // Set scroll restoration and reset scroll position early
  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  // Auto transition slides every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setTriadIndex((prev) => (prev + 1) % triads.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setTriadIndex((prev) => (prev === 0 ? triads.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setTriadIndex((prev) => (prev + 1) % triads.length);
  };

  return (
    <section className="hero-full">
      {/* Faint watermark background of the active slide */}
      <div className="carousel-bg-watermark">
        <img src={triads[triadIndex][0]} alt="Background Watermark" key={triadIndex} />
      </div>

      <div className="portfolio-hero-carousel">
        {/* Logo Masthead Header */}
        <div className="carousel-header-area">
          <img src={logo} alt="Shoot @ Sight Logo" className="carousel-brand-logo" />
        </div>

        {/* White Card Framed Container */}
        <div className="carousel-frame-container">
          <div className="carousel-grid-row" key={triadIndex}>
            {triads[triadIndex].map((url, idx) => (
              <div key={idx} className="carousel-grid-img-wrapper">
                <img src={url} alt={`Featured Image ${idx + 1}`} loading={idx === 0 ? "eager" : "lazy"} />
              </div>
            ))}
          </div>

        </div>

        {/* Footer Area */}
        <div className="carousel-footer-area">
          <span className="carousel-footer-script">unscripted</span>
          
          <div className="carousel-text-nav">
            <button onClick={handlePrev}>PREV</button>
            <span className="nav-divider">/</span>
            <button onClick={handleNext}>NEXT</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
