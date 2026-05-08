import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ParisShowcase.css';

gsap.registerPlugin(ScrollTrigger);

const ParisShowcase = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.prs__label, .prs__heading, .prs__sub', {
        y: 28,
        opacity: 0,
        stagger: 0.1,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.prs__text', start: 'top 82%' },
      });

      gsap.from(['.prs__left', '.prs__right-top', '.prs__right-bottom'], {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: { trigger: '.prs__layout', start: 'top 82%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="prs" ref={sectionRef} aria-label="Paris">

      <div className="prs__inner container">

        {/* Text */}
        <div className="prs__text">
          <span className="prs__label">01 // DESTINATION</span>
          <h2 className="prs__heading">
            Paris,<br /><em>Always</em>
          </h2>
          <p className="prs__sub">
            Some cities don't just set the scene —<br />they become part of the love story itself.
          </p>
        </div>

        {/* 3-image editorial layout */}
        <div className="prs__layout">

          {/* Large left image */}
          <div className="prs__left">
            <img
              src="https://pub-cac83bb0873e44ebaf0b34571245ba3d.r2.dev/paris/_DSC2178%20-%20Copy.webp"
              alt="Paris"
              className="prs__img"
              loading="lazy"
              decoding="async"
            />
            <div className="prs__overlay" />
          </div>

          {/* Two stacked right */}
          <div className="prs__right">
            <div className="prs__right-top">
              <img
                src="https://pub-cac83bb0873e44ebaf0b34571245ba3d.r2.dev/paris/_DSC7505.webp"
                alt="Paris"
                className="prs__img"
                loading="lazy"
                decoding="async"
              />
              <div className="prs__overlay" />
            </div>
            <div className="prs__right-bottom">
              <img
                src="https://pub-cac83bb0873e44ebaf0b34571245ba3d.r2.dev/paris/_DSC7759.webp"
                alt="Paris"
                className="prs__img"
                loading="lazy"
                decoding="async"
              />
              <div className="prs__overlay" />
            </div>
          </div>

        </div>

      </div>

      <div className="prs__corner" aria-hidden="true">PARIS · FRANCE · 2025</div>

    </section>
  );
};

export default ParisShowcase;
