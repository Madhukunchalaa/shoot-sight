import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import img1 from '../assets/hero_detail.png';
import img2 from '../assets/hero_carousel_1.png';
import img3 from '../assets/hero_carousel_2.png';
import './Hero.css';

const Hero = () => {
  const container = useRef();
  const [index, setIndex] = useState(0);
  const images = [img1, img2, img3];
  const total = images.length;

  useGSAP(() => {
    // Entrance Animation
    const tl = gsap.timeline();
    
    tl.fromTo('.hero-title .char', 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.02, ease: 'power4.out' }
    );

    tl.fromTo(['.hero-subtitle', '.hero-action'],
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out' },
      "-=0.5"
    );

    // Carousel Logic
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, 6000);

    return () => clearInterval(interval);
  }, { scope: container });

  useEffect(() => {
    // Crossfade Animation
    gsap.fromTo('.hero-img-slide',
      { opacity: 0, scale: 1.2 },
      { opacity: 1, scale: 1.1, duration: 2, ease: 'power2.inOut' }
    );
  }, [index]);

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
        {images.map((img, i) => (
          i === index && (
            <img 
              key={i}
              src={img} 
              alt="Cinematic Narrative" 
              className="hero-img hero-img-slide"
            />
          )
        ))}
        <div className="overlay"></div>
      </div>
      <div className="hero-content container">
        <h1 className="hero-title">
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
      
      {/* Carousel Dots */}
      <div className="carousel-indicators">
        {images.map((_, i) => (
          <div 
            key={i} 
            className={`indicator ${i === index ? 'active' : ''}`}
            onClick={() => setIndex(i)}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
