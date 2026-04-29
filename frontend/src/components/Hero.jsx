import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import './Hero.css';

const Hero = () => {
  const container = useRef();
  const imageRef = useRef();
  const titleRef = useRef();

  useGSAP(() => {
    const tl = gsap.timeline();

    // Initial Image Reveal & Scale Down
    tl.fromTo(imageRef.current, 
      { scale: 1.6, clipPath: 'inset(100% 0% 0% 0%)' },
      { scale: 1.1, clipPath: 'inset(0% 0% 0% 0%)', duration: 2.2, ease: 'expo.inOut' }
    );

    // Text Reveal - Letter by Letter
    const splitTitle = titleRef.current.querySelectorAll('.char');
    tl.fromTo(splitTitle,
      { y: 150, rotateX: -90, opacity: 0 },
      { y: 0, rotateX: 0, opacity: 1, duration: 1.2, stagger: 0.03, ease: 'power4.out' },
      "-=1.2"
    );

    // Subtitle & Button Stagger
    tl.fromTo(['.hero-subtitle', '.hero-action'],
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out' },
      "-=0.5"
    );

    // Mouse Parallax Effect
    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 30;
      const yPos = (clientY / window.innerHeight - 0.5) * 30;

      gsap.to(imageRef.current, {
        x: xPos,
        y: yPos,
        duration: 2,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, { scope: container });

  const renderTitle = (text) => {
    return text.split('').map((char, i) => (
      <span key={i} className="char" style={{ display: 'inline-block' }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section ref={container} className="hero">
      <div className="hero-bg">
        <img 
          ref={imageRef}
          src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop" 
          alt="Cinematic Wedding" 
          className="hero-img"
        />
        <div className="overlay"></div>
      </div>
      <div className="hero-content container">
        <h1 ref={titleRef} className="hero-title">
          <div className="line">{renderTitle("THE ART OF")}</div>
          <div className="line">{renderTitle("STORYTELLING")}</div>
        </h1>
        <p className="hero-subtitle">
          Capturing the soul of every moment. An editorial digital journal by Shoot @ Sight.
        </p>
        <div className="hero-action">
          <a href="#work" className="btn-premium">Explore Journal</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
