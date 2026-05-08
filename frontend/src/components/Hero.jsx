import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

// Import Real Professional Assets
import hero1 from '../assets/SAS_4201.webp';
import hero2 from '../assets/2S9A3065.webp';
import hero3 from '../assets/DSC06362.webp';
import hero4 from '../assets/NGD_4849-2.webp';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  const slides = [
    {
      left: hero1,
      right: hero2,
      t1: "TIMELESS",
      t2: "MOMENTS"
    },
    {
      left: hero3,
      right: hero4,
      t1: "ETERNAL",
      t2: "LEGACIES"
    },
    {
      left: hero4,
      right: hero1,
      t1: "PURE",
      t2: "EMOTIONS"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance
      const tl = gsap.timeline();
      tl.from(".hero-side", {
        width: 0,
        duration: 1.8,
        stagger: 0.3,
        ease: "expo.inOut"
      })
      .from(".center-line", {
        height: 0,
        duration: 1,
        ease: "power2.inOut"
      }, "-=1");

      // 2. Section Pinning & Layered Scroll
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
        scrub: true
      });

      // Continuous Parallax
      gsap.to(".side-img-container.left", {
        y: -150,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1
        }
      });

      gsap.to(".side-img-container.right", {
        y: 100,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1
        }
      });
    }, containerRef);

    // Auto Carousel Logic with Text Sync
    const interval = setInterval(() => {
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
        }
      });
    }, 5000);

    return () => {
      ctx.revert();
      clearInterval(interval);
    };
  }, []);

  return (
    <section ref={containerRef} className="hero-dual-reveal">
      <div className="hero-side left-side">
        {slides.map((slide, i) => (
          <div 
            key={i} 
            className={`side-img-container left ${i === currentIndex ? 'active' : ''}`}
          >
            <img src={slide.left} alt="Professional Photography" className="side-img" />
          </div>
        ))}
        <div className="side-overlay"></div>
      </div>

      <div className="hero-side right-side">
        {slides.map((slide, i) => (
          <div 
            key={i} 
            className={`side-img-container right ${i === currentIndex ? 'active' : ''}`}
          >
            <img src={slide.right} alt="Professional Photography" className="side-img" />
          </div>
        ))}
        <div className="side-overlay"></div>
      </div>

      <div className="center-line"></div>

      <div className="hero-center-content" ref={textRef}>
        <h1 className="hero-center-title">
          <span className="brand-main">{slides[currentIndex].t1}</span>
          <span className="brand-accent"><i>{slides[currentIndex].t2}</i></span>
        </h1>
        <p className="hero-tagline-luxury">SHOOT @ SIGHT // PRESERVING THE UNSPOKEN</p>
      </div>

    </section>
  );
};

export default Hero;
