import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSiteConfig } from '../context/SiteConfigContext';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const { config } = useSiteConfig();

  const heroContent = config?.hero || {
    videoUrl: 'https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/Naveen%20%26%20Kate%204K%20Teaser.mp4'
  };

  const videoUrl = heroContent.videoUrl || 'https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/Naveen%20%26%20Kate%204K%20Teaser.mp4';
  const isDirectVideo = videoUrl.startsWith('http') || videoUrl.includes('.mp4');

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

    return () => {
      clearTimeout(refreshTimer);
    };
  }, []);

  return (
    <section ref={containerRef} className="hero-full">
      <div className="hero-video-container">
        {isDirectVideo ? (
          <video
            src={videoUrl}
            autoPlay
            loop
            muted
            playsInline
            className="hero-html-video"
          />
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${videoUrl}?autoplay=1&mute=1&controls=0&disablekb=1&fs=0&iv_load_policy=3&modestbranding=1&rel=0&loop=1&playlist=${videoUrl}&playsinline=1&start=0`}
            title="Hero Background Video"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        )}
        <div className="hero-video-blocker" />
      </div>
    </section>
  );
};

export default Hero;
