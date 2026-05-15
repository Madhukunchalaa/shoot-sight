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
  const containerRef = useRef();

  useGSAP(() => {
    const panels = gsap.utils.toArray('.experience-layer');
    
    // 1. Create a Master Pin for the entire section to ensure it stays isolated
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: `+=${panels.length * 100}%`,
      pin: true,
      pinSpacing: true, // This creates the "Safety Buffer"
      refreshPriority: -1
    });

    // 2. Individual Layer Reveals
    panels.forEach((panel, i) => {
      if (i !== 0) { // Skip intro for stacking logic
        gsap.fromTo(panel, 
          { yPercent: 100 },
          { 
            yPercent: 0,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: () => (i * window.innerHeight) + " top",
              end: () => ((i + 1) * window.innerHeight) + " top",
              scrub: true,
            }
          }
        );
      }
    });

  }, { scope: containerRef });

  return (
    <div className="experience-isolation-wrapper">
      <section ref={containerRef} className="experience-stack-container">
        
        {/* INTRO LAYER */}
        <div className="experience-layer intro-layer">
          <div className="layer-content-centered">
            <span className="subtitle-accent">02 // THE EXPERIENCE</span>
            <h2 className="section-title-large">How We <br /><i>Manifest</i> Magic</h2>
            <div className="scroll-indicator-boutique">
              <span className="line"></span>
              <span className="txt">SCROLL TO UNVEIL</span>
            </div>
          </div>
        </div>

        {/* STEP 01 */}
        <div className="experience-layer step-layer color-1">
          <div className="layer-grid container">
            <div className="layer-text-side">
              <span className="layer-num">Phase 01 // Curation</span>
              <h3 className="layer-heading">The Curation</h3>
              <p className="layer-desc">We begin by understanding the soul of your story, selecting the perfect aesthetic tone and light for your unique celebration.</p>
              <div className="layer-tags">
                <span className="exp-tag">Moodboarding</span>
                <span className="exp-tag">Lighting Design</span>
                <span className="exp-tag">Styling Harmony</span>
              </div>
            </div>
            <div className="layer-img-side">
              <div className="img-reveal-wrapper">
                <img src={curationImg} alt="The Curation Process" loading="lazy" decoding="async" />
              </div>
            </div>
          </div>
        </div>

        {/* STEP 02 */}
        <div className="experience-layer step-layer color-2">
          <div className="layer-grid container">
            <div className="layer-img-side">
              <div className="img-reveal-wrapper">
                <img src={captureImg} alt="Cinematic Capture" loading="lazy" decoding="async" />
              </div>
            </div>
            <div className="layer-text-side">
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
        </div>

        {/* STEP 03 */}
        <div className="experience-layer step-layer color-3">
          <div className="layer-grid container">
            <div className="layer-text-side">
              <span className="layer-num">Phase 03 // Heirloom</span>
              <h3 className="layer-heading">The Heirloom</h3>
              <p className="layer-desc">Final delivery of high-fidelity, processed imagery designed to last for generations. Your legacy, preserved in light.</p>
              <div className="layer-tags">
                <span className="exp-tag">Color Grading</span>
                <span className="exp-tag">Fine Art Prints</span>
                <span className="exp-tag">Digital Vault</span>
              </div>
            </div>
            <div className="layer-img-side">
              <div className="img-reveal-wrapper">
                <img src={heirloomImg} alt="Timeless Heirloom Delivery" loading="lazy" decoding="async" />
              </div>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
};

export default Experience;
