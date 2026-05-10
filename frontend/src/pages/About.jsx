import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import teamImg from '../assets/team.webp';
import founderImg from '../assets/NGD_1351.jpg.webp';
import aboutHeroBg from '../assets/DSC01641 - Copy.webp'; // Perfect warm romantic sunset background
import philosophyBg from '../assets/_DSC4761 - Copy.webp'; // Stunning cinematic landscape backdrop
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const container = useRef();

  useGSAP(() => {
    // 0. Fullscreen Hero Entrance & Parallax
    const heroTl = gsap.timeline();
    heroTl.from('.about-hero-bg-img', {
      scale: 1.15,
      duration: 2.2,
      ease: 'power3.out'
    }).from('.about-hero-centered-content > *', {
      y: 40,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: 'power3.out'
    }, '-=1.7');

    gsap.to('.about-hero-bg-img', {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: '.about-fullscreen-hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    // 0.1 Philosophy Background Parallax
    gsap.to('.philosophy-image-bg', {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: '.about-philosophy',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });

    // 1. Hero Text Reveal (Magazine Spread)
    gsap.from('.about-title-word', {
      y: 100,
      opacity: 0,
      duration: 1.2,
      stagger: 0.1,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: '.about-hero-spread',
        start: 'top 80%'
      }
    });

    gsap.from('.about-hero-img', {
      scale: 1.08,
      opacity: 0,
      duration: 1.5,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.about-hero-spread',
        start: 'top 80%'
      }
    });

    // 2. Parallax Image (Magazine Spread)
    gsap.to('.about-hero-img img', {
      y: 60,
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
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.about-founder-section',
        start: 'top 70%'
      }
    });

    // 5. Founder Card Parallax/Reveal
    gsap.from('.founder-card-container', {
      x: -50,
      opacity: 0,
      duration: 1.5,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.about-founder-section',
        start: 'top 70%'
      }
    });
  }, { scope: container });

  return (
    <div ref={container} className="about-page-editorial">
      
      {/* Fullscreen Hero Section with Parallax Background */}
      <section className="about-fullscreen-hero">
        <div className="about-hero-bg-wrapper">
          <img src={aboutHeroBg} alt="The Story Behind The Light" className="about-hero-bg-img" />
          <div className="about-hero-overlay"></div>
        </div>
        <div className="about-hero-centered-content">
          <span className="subtitle-accent-white">BEHIND THE LENS</span>
          <h1 className="about-hero-title">The Story Behind <br /><i>The Light</i></h1>
          <p className="about-hero-tagline">SHOOT @ SIGHT // ARCHITECTS OF TIMELESS MEMORIES</p>
          <div className="scroll-indicator-boutique white-indicator">
            <span className="line"></span>
            <span className="txt">DISCOVER OUR JOURNEY</span>
          </div>
        </div>
      </section>

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
            <div className="about-team-card-container">
              {/* Sideways Text Tag */}
              <div className="about-team-vertical-tag">CREATIVE COLLECTIVE // EST. 2018</div>
              
              {/* Offset Decorative Border */}
              <div className="about-team-backdrop"></div>
              
              <div className="about-img-mask">
                <img src={teamImg} alt="Shoot @ Sight Studio Team" />
              </div>
            </div>
            <div className="img-caption">The Shoot @ Sight Creative Collective, 2026</div>
          </div>
        </div>
      </section>

      {/* The Founder Section */}
      <section className="about-founder-section section-padding">
        <div className="container">
          <div className="founder-grid">
            
            <div className="founder-image-col">
              <div className="founder-card-container">
                {/* Vertical Tag */}
                <div className="founder-vertical-tag">CREATIVE DIRECTOR // PAVITRA</div>
                
                {/* Decorative Offset Outline Frame */}
                <div className="founder-backdrop-frame"></div>
                
                <div className="founder-img-wrapper">
                  <img src={founderImg} alt="Pavitra — Founder & Director" />
                </div>
              </div>
            </div>

            <div className="founder-content-col">
              <span className="subtitle-accent">MEET THE FOUNDER</span>
              <h2 className="founder-main-title">Pavitra</h2>
              <p className="founder-sub-headline">Lead Visual Director & Founder</p>
              
              <h3 className="founder-quote">"We do not merely take photographs. We curate the timeless <i>poetry</i> of your celebration."</h3>
              
              <div className="founder-bio">
                <p className="bio-paragraph dropcap-para">
                  As the visionary behind Shoot @ Sight, Pavitra has spent nearly a decade redefining high-end wedding storytelling. Merging the aesthetics of global fashion editorial with the deep emotion of candid photojournalism, she crafts a cinematic lookbook for couples who view their celebration as a living legacy.
                </p>
                <p className="bio-paragraph">
                  Her signature methodology is marked by an intuitive anticipation of candid glances, true-to-life processing, and a mastery over natural, ethereal lighting. With camera in hand, Pavitra blends seamlessly into the architecture of your day, capturing whispers that would otherwise be lost to time.
                </p>
              </div>

              {/* Core Attributes */}
              <div className="founder-pillars">
                <div className="pillar-item">
                  <span className="pillar-num">01 /</span>
                  <div className="pillar-info">
                    <span className="pillar-title">Cinematic Intuition</span>
                    <span className="pillar-desc">Reading the room, anticipating micro-moments, and capturing raw, unposed emotions.</span>
                  </div>
                </div>
                <div className="pillar-item">
                  <span className="pillar-num">02 /</span>
                  <div className="pillar-info">
                    <span className="pillar-title">Editorial Polish</span>
                    <span className="pillar-desc">Crafting stylized, Vogue-ready portraits on-site that feel elegant and modern.</span>
                  </div>
                </div>
              </div>

              <div className="founder-signature-block">
                <span className="founder-name">Pavitra</span>
                <span className="founder-title">FOUNDER // SHOOT @ SIGHT</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* The Philosophy */}
      <section className="about-philosophy section-padding">
        <div className="philosophy-image-bg" style={{ backgroundImage: `url(${philosophyBg})` }}></div>
        <div className="philosophy-overlay"></div>
        
        <div className="container philosophy-content">
          <div className="philosophy-header text-center">
            <h2 className="section-title-large-white">The <i>Philosophy</i></h2>
          </div>

          <div className="philosophy-grid">
            <div className="philosophy-block">
              <div className="phil-num">01</div>
              <h3 className="phil-title">Intentionality</h3>
              <p className="phil-desc">We do not believe in spray-and-pray. Every frame is composed with purpose, ensuring a cohesive, editorial visual language throughout your entire collection.</p>
            </div>
            
            <div className="philosophy-block">
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
