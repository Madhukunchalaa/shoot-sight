import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const slides = [
  { t1: "TIMELESS",  t2: "MOMENTS"  },
  { t1: "ETERNAL",   t2: "LEGACIES"  },
  { t1: "PURE",      t2: "EMOTIONS"  },
  { t1: "SAVORED",   t2: "SIGHTS"    },
  { t1: "INFINITE",  t2: "VISIONS"   },
];

const Hero = () => {
  const containerRef = useRef(null);
  const [showVideo, setShowVideo] = useState(true);
  const [shutterState, setShutterState] = useState('open'); // 'open', 'closing', 'closed', 'opening'
  const [currentIndex, setCurrentIndex] = useState(0);

  const autoTransitionRef = useRef(null);
  const slideIntervalRef = useRef(null);

  const startAutoTransition = () => {
    if (autoTransitionRef.current) clearTimeout(autoTransitionRef.current);
    autoTransitionRef.current = setTimeout(() => {
      triggerShutterTransition(false); // transition to camera/quote
    }, 12000); // 12 seconds of video
  };

  const triggerShutterTransition = (toVideo) => {
    setShutterState('closing');
    
    // After 1.2s (shutter closed), switch screen and start opening
    setTimeout(() => {
      setShowVideo(toVideo);
      setShutterState('closed');
      
      // Small buffer, then open the shutter
      setTimeout(() => {
        setShutterState('opening');
        // Reset state after opening animation completes (1.2s)
        setTimeout(() => {
          setShutterState('open');
          if (toVideo) {
            startAutoTransition();
          }
        }, 1200);
      }, 100);
    }, 1200);
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

  // Auto-advance slides for title text when video is active
  useEffect(() => {
    if (showVideo) {
      slideIntervalRef.current = setInterval(() => {
        gsap.to(".hero-center-title", {
          opacity: 0,
          y: -20,
          duration: 0.8,
          onComplete: () => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
            gsap.fromTo(".hero-center-title",
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
            );
          },
        });
      }, 4000);
    } else {
      if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
    }

    return () => {
      if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
    };
  }, [showVideo]);

  // Start the 12-second auto-transition on mount
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
        <div className="hero-video-container">
          <iframe
            src="https://www.youtube.com/embed/E6mpqvgMyUY?autoplay=1&mute=1&controls=0&disablekb=1&fs=0&iv_load_policy=3&modestbranding=1&rel=0&loop=1&playlist=E6mpqvgMyUY&playsinline=1&start=0"
            title="Hero Background Video"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      )}

      {/* Luxury camera background image (after shutter transition) */}
      {!showVideo && (
        <div className="hero-camera-bg">
          <img src="/luxury_camera.png" alt="Luxury Camera" className="hero-camera-img" />
        </div>
      )}

      {/* Dark overlay */}
      <div className="hero-overlay" />

      {/* Centered title slides text (only when video is playing) */}
      {showVideo && (
        <div className="hero-center-content">
          <h1 className="hero-center-title">
            <span className="brand-main">{slides[currentIndex].t1}</span>
            <span className="brand-accent"><i>{slides[currentIndex].t2}</i></span>
          </h1>
          <p className="hero-tagline-luxury">SHOOT @ SIGHT // PRESERVING THE UNSPOKEN</p>
        </div>
      )}

      {/* High-end Quotation Screen (only when video is finished/skipped) */}
      {!showVideo && (
        <div className="hero-quote-content">
          <span className="quote-tagline">SHOOT @ SIGHT // THE ART OF PRESERVATION</span>
          <h2 className="quote-main-title">
            We Don't Just <i>Capture</i> Weddings.<br />
            We Preserve <span>Emotions</span> Forever.
          </h2>
          <div className="quote-actions">
            <button className="btn-premium replay-btn" onClick={() => triggerShutterTransition(true)}>
              <svg viewBox="0 0 24 24" className="btn-icon">
                <path fill="currentColor" d="M8 5v14l11-7z" />
              </svg>
              Replay Cinematic Film
            </button>
          </div>
        </div>
      )}

      {/* Skip button for video */}
      {showVideo && (
        <button className="skip-video-btn" onClick={() => triggerShutterTransition(false)}>
          Skip Video
          <svg viewBox="0 0 24 24" className="btn-icon-arrow">
            <path fill="none" stroke="currentColor" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Camera Iris Shutter Screen Overlay */}
      <div className={`shutter-screen ${shutterState}`}>
        <svg className="lens-graphic" viewBox="0 0 100 100" fill="none" stroke="#d4af37" strokeWidth="1.2">
          <circle cx="50" cy="50" r="45" strokeDasharray="3 3" opacity="0.6" />
          <circle cx="50" cy="50" r="38" strokeWidth="0.8" opacity="0.8" />
          <circle cx="50" cy="50" r="30" />
          
          {/* Shutter Blades */}
          <path d="M50 20 C65 20, 75 30, 75 50" strokeWidth="1" />
          <path d="M75 50 C75 65, 65 75, 50 75" strokeWidth="1" />
          <path d="M50 75 C35 75, 25 65, 25 50" strokeWidth="1" />
          <path d="M25 50 C25 35, 35 20, 50 20" strokeWidth="1" />
          
          <path d="M50 20 L80 35" opacity="0.5" />
          <path d="M80 50 L65 80" opacity="0.5" />
          <path d="M50 80 L20 65" opacity="0.5" />
          <path d="M20 50 L35 20" opacity="0.5" />
          
          <path d="M30 30 A28 28 0 0 1 70 30" stroke="#ffffff" strokeWidth="0.8" opacity="0.4" />
          <circle cx="45" cy="45" r="2" fill="#ffffff" opacity="0.7" />
        </svg>
        <div className="shutter-brand-text">SHOOT @ SIGHT</div>
      </div>
    </section>
  );
};

export default Hero;
