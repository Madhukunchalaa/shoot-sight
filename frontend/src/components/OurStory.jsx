import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './OurStory.css';

// Import Real Professional Assets
import story1 from '../assets/SAS_4201.webp';
import story2 from '../assets/NGD_4849-2.webp';

gsap.registerPlugin(ScrollTrigger);

const OurStory = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax for images
      gsap.to(".story-img-wrapper.type-1 img", {
        scale: 1.1,
        y: -30,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

      gsap.to(".story-img-wrapper.type-2", {
        y: -100,
        x: -20,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

      // Text reveal
      gsap.from(".story-content-new > *", {
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%"
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="boutique-story-section">
      <div className="container">
        <div className="story-grid-new">
          
          {/* VISUALS NOW ON THE LEFT */}
          <div className="story-visuals-new">
            <div className="story-img-wrapper type-1">
              <img src={story1} alt="Master Shot" />
            </div>
            <div className="story-img-wrapper type-2">
              <img src={story2} alt="Detail Frame" />
            </div>
          </div>

          {/* CONTENT NOW ON THE RIGHT */}
          <div className="story-content-new">
            <div className="vertical-label">01 // OUR PHILOSOPHY</div>
            <h2 className="section-title-large" style={{ marginBottom: '40px' }}>The Art <br />of <i>Observing</i></h2>
            <p className="story-p-lead">
              We approach each wedding not as a checklist, but as a living, breathing narrative. 
              Our lenses are drawn to the quiet glances, the unscripted laughter, and the fleeting tears.
            </p>
            <p className="story-p-new">
              We believe the most profound moments aren't the ones directed, 
              but the ones discovered. Our approach is quiet, immersive, 
              and deeply intentional.
            </p>
            
            <div className="story-stats-row">
              <div className="stat-item">
                <span className="stat-num">10+</span>
                <span className="stat-label">YEARS OF MASTERY</span>
              </div>
              <div className="stat-item">
                <span className="stat-num">500+</span>
                <span className="stat-label">ETERNAL STORIES</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default OurStory;
