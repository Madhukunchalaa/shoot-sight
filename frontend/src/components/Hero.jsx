import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSiteConfig } from '../context/SiteConfigContext';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const [showVideo, setShowVideo] = useState(true);
  const [focusState, setFocusState] = useState('hidden'); // 'hidden', 'lens-zoom', 'focused'
  const timerRef = useRef(null);
  const { config } = useSiteConfig();

  const heroContent = config?.hero || {
    tagline: 'SHOOT @ SIGHT // THE ART OF PRESERVATION',
    line1Main: "We Don't Just",
    line1Italic: 'Capture',
    line1End: 'Weddings.',
    line2Main: 'We Preserve',
    line2Highlight: 'Emotions',
    line2End: 'Forever.',
    videoUrl: 'uJYT8dm1YKg',
    bgImage: 'https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/_DSC2178_-_Copy.webp'
  };

  const startFocusSequence = () => {
    setShowVideo(true);
    setFocusState('hidden');
    if (timerRef.current) clearTimeout(timerRef.current);
    
    // Play video completely cleanly for 12 seconds first
    timerRef.current = setTimeout(() => {
      // Start transition state (dims the video)
      setFocusState('lens-zoom');
      
      // After 1.2 seconds of dimming, swap focused state to fade video completely and show text
      timerRef.current = setTimeout(() => {
        setFocusState('focused');
        
        // Wait 1 second for the CSS opacity transition to finish, then unmount video
        timerRef.current = setTimeout(() => {
          setShowVideo(false);
        }, 1000);
      }, 1200);
    }, 12000);
  };

  // Set scroll restoration and reset scroll position early
  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    ScrollTrigger.clearScrollMemory();
  }, []);

  // Start the auto transition on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Safety refresh after a short delay to align with Lenis
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    startFocusSequence();
    
    return () => {
      clearTimeout(refreshTimer);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [heroContent.videoUrl]); // Restart sequence if video URL changes dynamically

  return (
    <section ref={containerRef} className="hero-full">
      {/* Realistic Couple Background (Pavithra) - Rendered behind the video */}
      <div className="hero-couple-bg">
        <img 
          src={heroContent.bgImage} 
          alt="Pavithra Founder" 
          className="hero-couple-img" 
        />
      </div>

      {/* Background Video (Plays continuously for first 12s) */}
      {showVideo && (
        <div className={`hero-video-container ${focusState}`}>
          <iframe
            src={`https://www.youtube.com/embed/${heroContent.videoUrl}?autoplay=1&mute=1&controls=0&disablekb=1&fs=0&iv_load_policy=3&modestbranding=1&rel=0&loop=1&playlist=${heroContent.videoUrl}&playsinline=1&start=0`}
            title="Hero Background Video"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            referrerPolicy="strict-origin-when-cross-origin"
          />
          <div className="hero-video-blocker" />
        </div>
      )}

      {/* Dark overlay */}
      <div className="hero-overlay" />

      {/* High-end Quotation Screen overlay */}
      <div className="hero-quote-content">
        
        {/* Ultra-stylish text display */}
        <div className={`quote-text-wrapper ${focusState === 'focused' ? 'active' : ''}`}>
          <span className="quote-tagline">{heroContent.tagline}</span>
          
          <div className="quote-line-top">
            <h2 className="quote-text-inner">
              {heroContent.line1Main} <i>{heroContent.line1Italic}</i> {heroContent.line1End}
            </h2>
          </div>
          
          <div className="quote-divider-line"></div>
          
          <div className="quote-line-bottom">
            <h2 className="quote-text-inner">
              {heroContent.line2Main} <span>{heroContent.line2Highlight}</span> {heroContent.line2End}
            </h2>
          </div>
        </div>

        {/* Replay focusing animation action */}
        {focusState === 'focused' && (
          <div className="quote-actions">
            <button className="btn-premium replay-btn" onClick={startFocusSequence}>
              <svg viewBox="0 0 24 24" className="btn-icon">
                <path fill="currentColor" d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46A7.93 7.93 0 0 0 20 12c0-4.42-3.58-8-8-8zm-6 8c0-1.01.25-1.97.7-2.8L5.24 7.74A7.93 7.93 0 0 0 4 12c0 4.42 3.58 8 8 8v-3l4 4-4-4v3c-3.31 0-6-2.69-6-6z" />
              </svg>
              Replay Focus
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
