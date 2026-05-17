import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

const slide1Left = "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/SAS_2092.webp";
const slide1Right = "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/_I3A6612.webp";
const slide2Left = "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/NGD_1093.webp";
const slide2Right = "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/2S9A8309.webp";
const slide3Left = "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/KRP_9777.webp";
const slide3Right = "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/_DSC1468_-_Copy.webp";
const slide4Left = "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/NGD_9246.webp";
const slide4Right = "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/DSC02320.webp";
const slide5Left = "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/_DSC4382.webp";
const slide5Right = "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/SAS_3280.webp";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  const slides = [
    {
      left: slide1Left,
      right: slide1Right,
      t1: "TIMELESS",
      t2: "MOMENTS"
    },
    {
      left: slide2Left,
      right: slide2Right,
      t1: "ETERNAL",
      t2: "LEGACIES"
    },
    {
      left: slide3Left,
      right: slide3Right,
      t1: "PURE",
      t2: "EMOTIONS"
    },
    {
      left: slide4Left,
      right: slide4Right,
      t1: "SAVORED",
      t2: "SIGHTS"
    },
    {
      left: slide5Left,
      right: slide5Right,
      t1: "INFINITE",
      t2: "VISIONS"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useLayoutEffect(() => {
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

    return () => ctx.revert();
  }, []);

  useEffect(() => {
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

    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={containerRef} className="hero-dual-reveal">
      <div className="hero-side left-side">
        {slides.map((slide, i) => (
          <div 
            key={i} 
            className={`side-img-container left ${i === currentIndex ? 'active' : ''}`}
          >
            <img src={slide.left} alt="Professional Photography" className="side-img" decoding="async" />
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
            <img src={slide.right} alt="Professional Photography" className="side-img" decoding="async" />
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
