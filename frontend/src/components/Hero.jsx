import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const heroFilmId = "E6mpqvgMyUY";

const Hero = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-video-frame", {
        scale: 1.08,
        duration: 2.2,
        ease: "power2.out",
      });

      gsap.from(".hero-center-content", {
        opacity: 0,
        y: 30,
        duration: 1.6,
        delay: 0.5,
        ease: "power3.out",
      });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
        scrub: true,
      });

      gsap.to(".hero-video-frame", {
        y: -120,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="hero-full">
      <div className="hero-video-bg">
        <iframe
          className="hero-video-frame"
          src={`https://www.youtube.com/embed/${heroFilmId}?autoplay=1&mute=1&controls=0&disablekb=1&fs=0&iv_load_policy=3&modestbranding=1&rel=0&loop=1&playlist=${heroFilmId}&playsinline=1&start=1`}
          title="Shoot @ Sight hero film"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>

      <div className="hero-overlay" />

      <div className="hero-center-content">
        <h1 className="hero-center-title">
          <span className="brand-main">TIMELESS</span>
          <span className="brand-accent"><i>MOMENTS</i></span>
        </h1>
        <p className="hero-tagline-luxury">SHOOT @ SIGHT // PRESERVING THE UNSPOKEN</p>
      </div>
    </section>
  );
};

export default Hero;
