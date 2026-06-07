import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const [showVideo, setShowVideo] = useState(true);
  const [transitioning, setTransitioning] = useState(false);
  const [lensState, setLensState] = useState('idle'); // 'idle', 'closing', 'opening'

  const autoTransitionRef = useRef(null);

  const startAutoTransition = () => {
    if (autoTransitionRef.current) clearTimeout(autoTransitionRef.current);
    autoTransitionRef.current = setTimeout(() => {
      triggerTransition(false); // transition to quote
    }, 12000); // 12 seconds of video
  };

  const triggerTransition = (toVideo) => {
    setTransitioning(true);
    setLensState('closing');
    
    // After 1s, swap the content and set lens state to opening
    setTimeout(() => {
      setShowVideo(toVideo);
      setLensState('opening');
      
      // Complete the transition shortly after
      setTimeout(() => {
        setTransitioning(false);
        setLensState('idle');
        if (toVideo) {
          startAutoTransition();
        }
      }, 1000);
    }, 1000);
  };

  // Scroll pin
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
        scrub: true,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // GSAP animations for the quotation text fading in
  useEffect(() => {
    if (!showVideo) {
      gsap.fromTo(".quote-tagline", 
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: "power2.out" }
      );
      gsap.fromTo(".quote-main-title", 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.4, ease: "power3.out" }
      );
      gsap.fromTo(".quote-actions", 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 0.8, ease: "power2.out" }
      );
    }
  }, [showVideo]);

  // Start the auto transition on mount
  useEffect(() => {
    startAutoTransition();
    return () => {
      if (autoTransitionRef.current) clearTimeout(autoTransitionRef.current);
    };
  }, []);

  return (
    <section ref={containerRef} className="hero-full">
      {/* Background Video (Muted, looping YouTube) */}
      {showVideo && (
        <div className={`hero-video-container ${transitioning ? 'fade-out' : ''}`}>
          <iframe
            src="https://www.youtube.com/embed/E6mpqvgMyUY?autoplay=1&mute=1&controls=0&disablekb=1&fs=0&iv_load_policy=3&modestbranding=1&rel=0&loop=1&playlist=E6mpqvgMyUY&playsinline=1&start=0"
            title="Hero Background Video"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      )}

      {/* Romantic Golden Bokeh Background (fades in as video blurs out) */}
      <div className={`hero-bokeh-bg ${!showVideo ? 'visible' : ''} ${transitioning ? 'fade-in' : ''}`}>
        <img src="/luxury_bokeh.png" alt="Luxury Bokeh" className="hero-bokeh-img" />
      </div>

      {/* Dark overlay */}
      <div className="hero-overlay" />

      {/* High-end Camera Lens & Quotation Screen */}
      {(!showVideo || transitioning) && (
        <div className={`hero-quote-content ${!showVideo ? 'active' : ''}`}>
          
          {/* Custom Luxury Camera Lens Vector Animation */}
          <div className={`camera-lens-animation-wrap ${lensState} ${!showVideo ? 'active' : ''}`}>
            <div className="lens-glass-reflection"></div>
            <svg className="luxury-lens-svg" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" className="lens-rim-outer" />
              <circle cx="60" cy="60" r="50" className="lens-rim-inner" />
              <circle cx="60" cy="60" r="44" className="lens-glass-edge" />
              <circle cx="60" cy="60" r="38" className="lens-focus-ring" strokeDasharray="2 4" />
              
              <g className="aperture-blades-group">
                <path d="M60 22 L88 38 L78 60 Z" className="aperture-blade blade-1" />
                <path d="M88 38 L88 72 L66 72 Z" className="aperture-blade blade-2" />
                <path d="M88 72 L60 88 L60 66 Z" className="aperture-blade blade-3" />
                <path d="M60 88 L32 72 L42 50 Z" className="aperture-blade blade-4" />
                <path d="M32 72 L32 38 L54 38 Z" className="aperture-blade blade-5" />
                <path d="M32 38 L60 22 L60 44 Z" className="aperture-blade blade-6" />
              </g>

              <circle cx="60" cy="60" r="22" className="lens-aperture-opening" />
              <circle cx="50" cy="50" r="2" className="lens-flare-dot" />
            </svg>
          </div>

          <span className="quote-tagline">SHOOT @ SIGHT // THE ART OF PRESERVATION</span>
          <h2 className="quote-main-title">
            We Don't Just <i>Capture</i> Weddings.<br />
            We Preserve <span>Emotions</span> Forever.
          </h2>
          
          <div className="quote-actions">
            <button className="btn-premium replay-btn" onClick={() => triggerTransition(true)}>
              <svg viewBox="0 0 24 24" className="btn-icon">
                <path fill="currentColor" d="M8 5v14l11-7z" />
              </svg>
              Replay Cinematic Film
            </button>
          </div>
        </div>
      )}

      {/* Skip button for video */}
      {showVideo && !transitioning && (
        <button className="skip-video-btn" onClick={() => triggerTransition(false)}>
          Skip Video
          <svg viewBox="0 0 24 24" className="btn-icon-arrow">
            <path fill="none" stroke="currentColor" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </section>
  );
};

export default Hero;
