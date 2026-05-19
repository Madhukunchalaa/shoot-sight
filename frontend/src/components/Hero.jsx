import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

const img1 = "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/4%20RAGHUDIXITH%20AND%20VARIJASHREE_WEBP/NGD_7441.webp";
const img2 = "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/NAVEEN%20AND%20KATE/SYD07968.webp";
const img3 = "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/aishwarya%20and%20akshay/KRP_6193.webp";
const img4 = "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/ragini/_I3A6398.webp";
const img5 = "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/2S9A8309.webp";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  { img: img1, t1: "TIMELESS",  t2: "MOMENTS"  },
  { img: img2, t1: "ETERNAL",   t2: "LEGACIES"  },
  { img: img3, t1: "PURE",      t2: "EMOTIONS"  },
  { img: img4, t1: "SAVORED",   t2: "SIGHTS"    },
  { img: img5, t1: "INFINITE",  t2: "VISIONS"   },
];

const Hero = () => {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Cinematic entrance
      gsap.from(".hero-bg-slide.active .hero-bg-img", {
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

      // Scroll pin
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
        scrub: true,
      });

      // Parallax drift upward on scroll
      gsap.to(".hero-bg-img", {
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

  // Auto-advance slides
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
        },
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={containerRef} className="hero-full">

      {/* Background images — only the active one is visible */}
      {slides.map((slide, i) => (
        <div key={i} className={`hero-bg-slide ${i === currentIndex ? 'active' : ''}`}>
          <img src={slide.img} alt="Photography" className="hero-bg-img" decoding="async" />
        </div>
      ))}

      {/* Dark overlay */}
      <div className="hero-overlay" />

      {/* Centered text */}
      <div className="hero-center-content">
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
