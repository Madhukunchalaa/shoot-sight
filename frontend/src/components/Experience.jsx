import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import './Experience.css';

const Experience = () => {
  const sectionRef = useRef();
  const triggerRef = useRef();

  useGSAP(() => {
    const pin = gsap.fromTo(
      sectionRef.current,
      { x: 0 },
      {
        x: '-200vw',
        ease: 'none',
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: '2000 top',
          scrub: 0.6,
          pin: true,
        },
      }
    );
    return () => {
      pin.kill();
    };
  }, []);

  return (
    <section className="experience-outer">
      <div ref={triggerRef}>
        <div ref={sectionRef} className="experience-inner">
          <div className="experience-step step-intro">
            <div className="container">
              <span className="subtitle-accent">02 // THE EXPERIENCE</span>
              <h2 className="step-title">How We <br /><i>Manifest</i> Magic</h2>
              <p className="step-desc">A refined journey from the first encounter to the final heirloom.</p>
            </div>
          </div>
          
          <div className="experience-step">
            <div className="step-content">
              <span className="step-num">01</span>
              <h3 className="step-heading">The Curation</h3>
              <p>We begin by understanding the soul of your story, selecting the perfect aesthetic tone for your celebration.</p>
            </div>
            <div className="step-image">
              <img src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070" alt="Curation" />
            </div>
          </div>

          <div className="experience-step">
            <div className="step-content">
              <span className="step-num">02</span>
              <h3 className="step-heading">The Capture</h3>
              <p>Discreet, editorial, and immersive. We capture the moments that feel like a whisper, and the ones that roar.</p>
            </div>
            <div className="step-image">
              <img src="https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=2070" alt="Capture" />
            </div>
          </div>

          <div className="experience-step">
            <div className="step-content">
              <span className="step-num">03</span>
              <h3 className="step-heading">The Heirloom</h3>
              <p>Final delivery of high-fidelity, processed imagery designed to last for generations.</p>
            </div>
            <div className="step-image">
              <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070" alt="Heirloom" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
