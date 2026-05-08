import { useEffect, useRef, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SmoothScroll = () => {
  const { pathname } = useLocation();
  const lenisRef = useRef(null);

  // 1. Initialize Lenis Smooth Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateTicker);
    };
  }, []);

  // 2. Reset scroll instantly on route change *before* paint to avoid ScrollTrigger calculation bugs
  useLayoutEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  // 3. Refresh GSAP ScrollTrigger after route mount to recalibrate trigger positions
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
};

export default SmoothScroll;
