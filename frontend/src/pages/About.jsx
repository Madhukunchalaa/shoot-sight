import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import teamImg from '../assets/team.jpg';
import './About.css';

const About = () => {
  const container = useRef();

  useGSAP(() => {
    // 1. Hero Text Reveal
    gsap.from('.manifesto-title span', {
      y: 100,
      opacity: 0,
      duration: 1.5,
      stagger: 0.2,
      ease: 'power4.out'
    });

    // 2. Parallax on large background text
    gsap.to('.bg-text-outline', {
      x: -200,
      scrollTrigger: {
        trigger: '.about-manifesto-hero',
        scrub: 1
      }
    });

    // 3. Image Mask Reveal
    gsap.from('.manifesto-img-wrapper', {
      clipPath: 'inset(0% 100% 0% 0%)',
      duration: 2,
      ease: 'expo.inOut',
      scrollTrigger: {
        trigger: '.manifesto-img-wrapper',
        start: 'top 80%'
      }
    });

    // 4. Stagger Process items
    gsap.from('.process-card', {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.3,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.process-grid-stylish',
        start: 'top 80%'
      }
    });
  }, { scope: container });

  return (
    <div ref={container} className="about-page-stylish">
      
      {/* SECTION 1: HERO MANIFESTO */}
      <section className="about-manifesto-hero">
        <div className="bg-text-outline">THE ARTIST // THE STORY // THE LEGACY</div>
        <div className="container">
          <div className="manifesto-content">
            <span className="subtitle-accent">02 // ABOUT US</span>
            <h1 className="manifesto-title">
              <span>We believe in the</span> <br />
              <span className="italic-accent">Invisible Narratives</span>
            </h1>
            <p className="manifesto-lead">
              Founded on the belief that wedding photography should be more than a service—it should be an art form. 
              Our approach is inspired by high-end fashion and editorial storytelling.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE VISION IMAGE */}
      <section className="about-vision-reveal container">
        <div className="manifesto-img-wrapper">
          <img src={teamImg} alt="The Team" />
          <div className="vision-tag">EST. 2018</div>
        </div>
        <div className="vision-text-overlap">
          <h2>The <i>Curation</i> of Emotion</h2>
          <p>
            At Shoot @ Sight, we don't just take pictures. We curate memories through an editorial lens, 
            focusing on the quiet emotions that define your legacy.
          </p>
        </div>
      </section>

      {/* SECTION 3: THE MASTER'S CRAFT (PROCESS) */}
      <section className="about-process-grid section-padding">
        <div className="container">
          <div className="process-header">
            <h2 className="section-title">The Master's Craft</h2>
            <div className="title-line"></div>
          </div>
          <div className="process-grid-stylish">
            <div className="process-card">
              <span className="process-num">01</span>
              <h3>Intentionality</h3>
              <p>Every frame is composed with purpose, ensuring a cohesive visual language throughout your album.</p>
            </div>
            <div className="process-card">
              <span className="process-num">02</span>
              <h3>Fidelity</h3>
              <p>We use state-of-the-art processing to maintain the highest image quality, ready for 4K and Retina displays.</p>
            </div>
            <div className="process-card">
              <span className="process-num">03</span>
              <h3>Timelessness</h3>
              <p>Our editing style avoids fleeting trends, focusing on natural tones that will look stunning decades from now.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: THE STATS (MINIMAL) */}
      <section className="about-stats-minimal container">
        <div className="stats-row">
          <div className="stat-box">
            <h4>400+</h4>
            <p>STORIES TOLD</p>
          </div>
          <div className="stat-box">
            <h4>08+</h4>
            <p>YEARS OF ARTISTRY</p>
          </div>
          <div className="stat-box">
            <h4>25+</h4>
            <p>AWARDS WON</p>
          </div>
        </div>
      </section>

      {/* SECTION 5: SIGNATURE CLOSING */}
      <section className="about-signature section-padding">
        <div className="container text-center">
          <div className="signature-content">
            <p className="quote">"Photography is the only language that can be understood anywhere in the world."</p>
            <div className="signature-mark">Shoot @ Sight</div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
