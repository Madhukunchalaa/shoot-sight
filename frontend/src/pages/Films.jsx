import { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import videosData from '../data/videos.json';
import './Films.css';

gsap.registerPlugin(ScrollTrigger);

const VideoBlock = ({ film, index }) => {
  const videoRef = useRef(null);
  const blockRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const isEven = index % 2 === 0;

  const toggleMute = useCallback((e) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }, []);

  useEffect(() => {
    const block = blockRef.current;
    const video = videoRef.current;
    if (!block || !video) return;

    const ctx = gsap.context(() => {
      gsap.from(block, {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: { trigger: block, start: 'top 90%', once: true },
      });

      ScrollTrigger.create({
        trigger: block,
        start: 'top 85%',
        end: 'bottom 15%',
        onEnter: () => video.play(),
        onLeave: () => video.pause(),
        onEnterBack: () => video.play(),
        onLeaveBack: () => video.pause(),
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      className={`flm__block ${isEven ? '' : 'flm__block--reverse'}`}
      ref={blockRef}
    >
      <div className="flm__text">
        <span className="flm__cat">{film.category}</span>
        <h2 className="flm__title">{film.title}</h2>
        <p className="flm__subtitle"><em>{film.subtitle}</em></p>
        <p className="flm__desc">{film.description}</p>
        <span className="flm__year">{film.year}</span>
      </div>

      <div className="flm__video-wrap">
        <video
          ref={videoRef}
          className="flm__video"
          src={film.url}
          muted
          loop
          playsInline
          preload="metadata"
        />
        <button className="flm__mute-btn" onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'}>
          {muted ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/>
              <line x1="23" y1="9" x2="17" y2="15"/>
              <line x1="17" y1="9" x2="23" y2="15"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/>
              <path d="M15.54,8.46a5,5,0,0,1,0,7.07"/>
              <path d="M19.07,4.93a10,10,0,0,1,0,14.14"/>
            </svg>
          )}
        </button>
        <div className="flm__num" aria-hidden="true">{String(index + 1).padStart(2, '0')}</div>
      </div>
    </div>
  );
};

const Films = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.flm__hero-label, .flm__hero-heading, .flm__hero-sub', {
        y: 32,
        opacity: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: 'power3.out',
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="flm-page" ref={pageRef}>

      <section className="flm__hero">
        <div className="container">
          <span className="flm__hero-label">// THE FILMS</span>
          <h1 className="flm__hero-heading">
            Love in<br /><em>Motion</em>
          </h1>
          <p className="flm__hero-sub">
            Because the way he looked at her — that deserved more than a photograph.
          </p>
        </div>
      </section>

      <section className="flm__list">
        <div className="container">
          {videosData.map((film, i) => (
            <VideoBlock key={film.id} film={film} index={i} />
          ))}
        </div>
      </section>

    </div>
  );
};

export default Films;
