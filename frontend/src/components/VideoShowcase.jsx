import { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './VideoShowcase.css';

gsap.registerPlugin(ScrollTrigger);

const VideoShowcase = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  const toggleMute = useCallback((e) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.vs__label, .vs__heading, .vs__sub', {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.vs__text', start: 'top 82%' },
      });

      gsap.from('.vs__video-wrap', {
        opacity: 0,
        y: 50,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.vs__video-wrap', start: 'top 85%' },
      });

      ScrollTrigger.create({
        trigger: '.vs__video-wrap',
        start: 'top bottom',
        end: 'bottom top',
        onEnter: () => videoRef.current?.play(),
        onLeave: () => videoRef.current?.pause(),
        onEnterBack: () => videoRef.current?.play(),
        onLeaveBack: () => videoRef.current?.pause(),
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="vs" ref={sectionRef} aria-label="Showreel">
      <div className="container">

        <div className="vs__text">
          <span className="vs__label">03 // THE FILM</span>
          <h2 className="vs__heading">
            Motion<br /><em>& Memory</em>
          </h2>
          <p className="vs__sub">Every frame breathes. Every moment lives.</p>
        </div>

        <div className="vs__video-wrap">
          <video
            ref={videoRef}
            className="vs__video"
            src="https://pub-cac83bb0873e44ebaf0b34571245ba3d.r2.dev/ezyZip.mp4"
            muted
            autoPlay
            loop
            playsInline
            preload="metadata"
          />

          {/* Unmute / mute button */}
          <button className="vs__mute-btn" onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'}>
            {muted ? (
              // Speaker off
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/>
                <line x1="23" y1="9" x2="17" y2="15"/>
                <line x1="17" y1="9" x2="23" y2="15"/>
              </svg>
            ) : (
              // Speaker on
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/>
                <path d="M15.54,8.46a5,5,0,0,1,0,7.07"/>
                <path d="M19.07,4.93a10,10,0,0,1,0,14.14"/>
              </svg>
            )}
          </button>

          <div className="vs__overlay" aria-hidden="true" />
        </div>

      </div>

      <div className="vs__corner" aria-hidden="true">SHOOT @ SIGHT · 2026</div>
    </section>
  );
};

export default VideoShowcase;
