import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSiteConfig } from "../context/SiteConfigContext";
import "./Hero.css";

gsap.registerPlugin(ScrollTrigger);

const HERO_POSTER = "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/NAVEEN%20AND%20KATE/SYD08467.webp";

const Hero = () => {
  const containerRef = useRef(null);
  const { config } = useSiteConfig();
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.matchMedia("(max-width: 768px)").matches : false
  );

  const heroContent = config?.hero || {
    videoUrl: "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/Naveen%20%26%20Kate%204K%20Teaser.mp4"
  };

  const videoUrl = heroContent.videoUrl || "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/Naveen%20%26%20Kate%204K%20Teaser.mp4";
  const isDirectVideo = videoUrl.startsWith("http") || videoUrl.includes(".mp4");

  // Set scroll restoration and reset scroll position early
  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
    ScrollTrigger.clearScrollMemory();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);
    return () => {
      clearTimeout(refreshTimer);
    };
  }, []);

  // Ship one hero video, not two: only the viewport-appropriate <video> is
  // ever mounted, so the browser only ever fetches one media file.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const mobileVideoUrl = "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/Low%20Bitrate.mp4";

  return (
    <section ref={containerRef} className="hero-full">
      <div className="hero-video-container">

        {isMobile ? (
          <video
            key="mobile"
            src={mobileVideoUrl}
            poster={HERO_POSTER}
            preload="none"
            autoPlay
            loop
            muted
            playsInline
            className="hero-mobile-video"
          />
        ) : (
          <div className="hero-desktop-video">
            {isDirectVideo ? (
              <video
                key="desktop"
                src={videoUrl}
                poster={HERO_POSTER}
                preload="none"
                autoPlay
                loop
                muted
                playsInline
                className="hero-html-video"
              />
            ) : (
              <iframe
                src={`https://www.youtube.com/embed/${videoUrl}?autoplay=1&mute=1&controls=0&disablekb=1&fs=0&iv_load_policy=3&modestbranding=1&rel=0&loop=1&playlist=${videoUrl}&playsinline=1&start=0`}
                title="Hero Background Video"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            )}
          </div>
        )}

        <div className="hero-video-blocker" />

        <div className="hero-heading-overlay">
          <h1 className="hero-h1">Editorial Wedding Photography &amp; Cinematic Films in Bangalore</h1>
          <p className="hero-trust-line">250+ weddings across 15+ cities</p>
          <div className="hero-cta-row">
            <Link to="/portfolio" className="hero-cta hero-cta--primary">View Portfolio</Link>
            <Link to="/contact" className="hero-cta hero-cta--secondary">Start a Conversation</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
