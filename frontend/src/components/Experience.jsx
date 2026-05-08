import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Experience.css';

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
          <div className="layer-grid">
            <div className="layer-text-side">
              <span className="layer-num">01</span>
              <h3 className="layer-heading">The Curation</h3>
              <p className="layer-desc">We begin by understanding the soul of your story, selecting the perfect aesthetic tone and light for your unique celebration.</p>
            </div>
            <div className="layer-img-side">
              <div className="img-reveal-wrapper">
                <img src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070" alt="Curation" loading="lazy" />
              </div>
            </div>
          </div>
        </div>

        {/* STEP 02 */}
        <div className="experience-layer step-layer color-2">
          <div className="layer-grid">
            <div className="layer-img-side">
              <div className="img-reveal-wrapper">
                <img src="https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=2070" alt="Capture" loading="lazy" />
              </div>
            </div>
            <div className="layer-text-side">
              <span className="layer-num">02</span>
              <h3 className="layer-heading">The Capture</h3>
              <p className="layer-desc">Discreet, immersive, and refined. We capture the moments that feel like a whisper, and the ones that roar across time.</p>
            </div>
          </div>
        </div>

        {/* STEP 03 */}
        <div className="experience-layer step-layer color-3">
          <div className="layer-grid">
            <div className="layer-text-side">
              <span className="layer-num">03</span>
              <h3 className="layer-heading">The Heirloom</h3>
              <p className="layer-desc">Final delivery of high-fidelity, processed imagery designed to last for generations. Your legacy, preserved in light.</p>
            </div>
            <div className="layer-img-side">
              <div className="img-reveal-wrapper">
                <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070" alt="Heirloom" loading="lazy" />
              </div>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
};

export default Experience;
