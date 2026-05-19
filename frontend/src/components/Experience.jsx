import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Experience.css';

const curationImg = "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/_DSC4382.webp";
const captureImg = "/perfect_capture.png";
const heirloomImg = "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/_DSC4285.webp";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Simple scroll-reveal for the section header
    gsap.from('.exp-section-header', {
      y: 60,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.exp-section-header',
        start: 'top 85%',
        once: true,
      }
    });

    // Staggered reveal for each card
    gsap.utils.toArray('.exp-card', containerRef.current).forEach((card, i) => {
      gsap.from(card, {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          once: true,
        },
        delay: i * 0.1,
      });
    });

  }, { scope: containerRef, dependencies: [] });

  return (
    <section ref={containerRef} className="experience-section">
      <div className="container">

        {/* Section Header */}
        <div className="exp-section-header">
          <span className="subtitle-accent">02 // THE EXPERIENCE</span>
          <h2 className="exp-main-title">How We <i>Manifest</i> Magic</h2>
          <p className="exp-subtitle">Three deliberate phases, crafted to create timeless imagery.</p>
        </div>

        {/* Cards Grid */}
        <div className="exp-cards-grid">

          {/* Phase 01 */}
          <div className="exp-card exp-card--reverse">
            <div className="exp-card__text">
              <span className="layer-num">Phase 01 // Curation</span>
              <h3 className="layer-heading">The Curation</h3>
              <p className="layer-desc">We begin by understanding the soul of your story, selecting the perfect aesthetic tone and light for your unique celebration.</p>
              <div className="layer-tags">
                <span className="exp-tag">Moodboarding</span>
                <span className="exp-tag">Lighting Design</span>
                <span className="exp-tag">Styling Harmony</span>
              </div>
            </div>
            <div className="exp-card__image">
              <div className="img-reveal-wrapper">
                <img src={curationImg} alt="The Curation Process" loading="lazy" decoding="async" />
              </div>
            </div>
          </div>

          {/* Phase 02 */}
          <div className="exp-card">
            <div className="exp-card__image">
              <div className="img-reveal-wrapper">
                <img src={captureImg} alt="Cinematic Capture" loading="lazy" decoding="async" />
              </div>
            </div>
            <div className="exp-card__text">
              <span className="layer-num">Phase 02 // Capture</span>
              <h3 className="layer-heading">The Capture</h3>
              <p className="layer-desc">Discreet, immersive, and refined. We capture the moments that feel like a whisper, and the ones that roar across time.</p>
              <div className="layer-tags">
                <span className="exp-tag">Discreet Presence</span>
                <span className="exp-tag">Candid Emotion</span>
                <span className="exp-tag">Cinematic Framing</span>
              </div>
            </div>
          </div>

          {/* Phase 03 */}
          <div className="exp-card exp-card--reverse">
            <div className="exp-card__text">
              <span className="layer-num">Phase 03 // Heirloom</span>
              <h3 className="layer-heading">The Heirloom</h3>
              <p className="layer-desc">Final delivery of high-fidelity, processed imagery designed to last for generations. Your legacy, preserved in light.</p>
              <div className="layer-tags">
                <span className="exp-tag">Color Grading</span>
                <span className="exp-tag">Fine Art Prints</span>
                <span className="exp-tag">Digital Vault</span>
              </div>
            </div>
            <div className="exp-card__image">
              <div className="img-reveal-wrapper">
                <img src={heirloomImg} alt="Timeless Heirloom Delivery" loading="lazy" decoding="async" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Experience;
