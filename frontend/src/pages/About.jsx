import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import teamImg from '../assets/team.webp';
import founderImg from '../assets/NGD_4849-2.webp';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const container = useRef();

  useGSAP(() => {
    // 1. Hero Text Reveal
    const tl = gsap.timeline();
    tl.from('.about-title-word', {
      y: 100,
      opacity: 0,
      duration: 1.2,
      stagger: 0.1,
      ease: 'power4.out',
      delay: 0.2
    }).from('.about-hero-img', {
      scale: 1.1,
      opacity: 0,
      duration: 1.5,
      ease: 'power3.out'
    }, "-=1");

    // 2. Parallax Image
    gsap.to('.about-hero-img img', {
      y: 100,
      scrollTrigger: {
        trigger: '.about-hero-spread',
        scrub: true
      }
    });

    // 3. Stagger Philosophy items
    gsap.from('.philosophy-block', {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.about-philosophy',
        start: 'top 75%'
      }
    });

    // 4. Founder Entrance
    gsap.from('.founder-content-col > *', {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.about-founder-section',
        start: 'top 70%'
      }
    });
  }, { scope: container });

  return (
    <div ref={container} className="about-page-editorial">
      
      {/* Magazine Spread Hero */}
      <section className="about-hero-spread container section-padding">
        <div className="about-hero-grid">
          <div className="about-hero-text">
            <span className="subtitle-accent">02 // THE STUDIO</span>
            <h1 className="about-main-title">
              <span className="about-title-word">Curating</span><br/>
              <span className="about-title-word"><i>Legacy</i></span><br/>
              <span className="about-title-word">Through</span><br/>
              <span className="about-title-word">Light.</span>
            </h1>
            <p className="about-hero-desc about-title-word">
              Founded in 2018, Shoot @ Sight is a boutique photography studio specializing in high-end, editorial wedding narratives. We believe your story deserves to be told with the intentionality of fine art.
            </p>
          </div>
          
          <div className="about-hero-img">
            <div className="about-img-mask">
              <img src={teamImg} alt="Shoot @ Sight Studio Team" />
            </div>
            <div className="img-caption">The Founders, 2026</div>
          </div>
        </div>
      </section>

      {/* The Founder Section */}
      <section className="about-founder-section section-padding">
        <div className="container">
          <div className="founder-grid">
            <div className="founder-image-col">
              <div className="founder-img-wrapper">
                <img src={founderImg} alt="Shoot @ Sight Founder" />
              </div>
            </div>
            <div className="founder-content-col">
              <h2 className="founder-quote">"We capture the moments you <i>feel</i>, long after the memory fades."</h2>
              <div className="founder-bio">
                <p>
                  As the visionary behind Shoot @ Sight, my approach is deeply rooted in cinematic storytelling and fashion editorial. A wedding isn't just an event; it's the culmination of a unique legacy. 
                </p>
                <p>
                  I believe in documenting truth over perfection, ensuring every frame we deliver holds the weight of genuine emotion and timeless artistry.
                </p>
              </div>
              <div className="founder-signature-block">
                <span className="founder-name">Pavitra</span>
                <span className="founder-title">Lead Director & Founder</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Philosophy */}
      <section className="about-philosophy section-padding">
        <div className="container">
          <div className="philosophy-header text-center">
            <h2 className="section-title-large">The <i>Philosophy</i></h2>
          </div>

          <div className="philosophy-grid">
            <div className="philosophy-block">
              <div className="phil-num">01</div>
              <h3 className="phil-title">Intentionality</h3>
              <p className="phil-desc">We do not believe in spray-and-pray. Every frame is composed with purpose, ensuring a cohesive, editorial visual language throughout your entire collection.</p>
            </div>
            
            <div className="philosophy-block offset-block">
              <div className="phil-num">02</div>
              <h3 className="phil-title">Fidelity</h3>
              <p className="phil-desc">Utilizing state-of-the-art lossless processing, we ensure that the colors, textures, and deep emotions remain vibrant and true to life for generations.</p>
            </div>
            
            <div className="philosophy-block">
              <div className="phil-num">03</div>
              <h3 className="phil-title">Timelessness</h3>
              <p className="phil-desc">We avoid fleeting color grading trends. Our true-to-life, cinematic editing style guarantees your gallery will look as stunning in fifty years as it does today.</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Stats (Editorial Style) */}
      <section className="about-stats-editorial section-padding">
        <div className="container">
          <div className="stats-divider"></div>
          <div className="stats-row-chic">
            <div className="stat-chic">
              <h4>400+</h4>
              <p>STORIES TOLD</p>
            </div>
            <div className="stat-chic">
              <h4>08+</h4>
              <p>YEARS OF ARTISTRY</p>
            </div>
            <div className="stat-chic">
              <h4>25+</h4>
              <p>GLOBAL AWARDS</p>
            </div>
          </div>
          <div className="stats-divider"></div>
        </div>
      </section>

      {/* Signature Closing */}
      <section className="about-signature-editorial section-padding">
        <div className="container text-center">
          <p className="editorial-quote">"Photography is the only language that can be understood anywhere in the world."</p>
          <div className="editorial-signature">Shoot @ Sight</div>
        </div>
      </section>

    </div>
  );
};

export default About;
