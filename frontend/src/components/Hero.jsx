import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';


gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  const slides = [
    {
      left: 'https://pub-cac83bb0873e44ebaf0b34571245ba3d.r2.dev/PARIS/_DSC7505.webp',
      right: 'https://pub-cac83bb0873e44ebaf0b34571245ba3d.r2.dev/ragini/_I3A7475.webp',
      t1: "TIMELESS",
      t2: "MOMENTS"
    },
    {
      left: 'https://pub-cac83bb0873e44ebaf0b34571245ba3d.r2.dev/kiran_tejaswini/NGD_9302.webp',
      right: 'https://pub-cac83bb0873e44ebaf0b34571245ba3d.r2.dev/naveen%20and%20kate/_UNI9421.webp',
      t1: "ETERNAL",
      t2: "LEGACIES"
    },
    {
      left: 'https://pub-cac83bb0873e44ebaf0b34571245ba3d.r2.dev/aishwarya_akshay/KRP_8887.webp',
      right: 'https://pub-cac83bb0873e44ebaf0b34571245ba3d.r2.dev/srinidhi_ramya/DSC01641.webp',
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
            <img
              src={slide.left}
              alt="Professional Photography"
              className="side-img"
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
              fetchpriority={i === 0 ? 'high' : 'low'}
            />
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
            <img
              src={slide.right}
              alt="Professional Photography"
              className="side-img"
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
              fetchpriority={i === 0 ? 'high' : 'low'}
            />
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

      <div className="hero-corner-detail top-left">EST. 2026 / CINEMA</div>
      <div className="hero-corner-detail top-right">HYDERABAD - GLOBAL</div>
      <div className="hero-corner-detail bottom-left">BOUTIQUE STUDIO</div>
      <div className="hero-corner-detail bottom-right">SCROLL TO BEGIN</div>
    </section>
  );
};

export default Hero;
