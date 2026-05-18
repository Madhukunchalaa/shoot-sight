import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
const teamImg = "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/team.webp";
const founderImg = "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/NGD_1351jpg.webp";
const aboutHeroBg = "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/DSC01641_-_Copy.webp";
const philosophyBg = "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/camera_lens_detail.webp";
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
    gsap.to('.philosophy-portrait-img', {
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
    gsap.from('.philosophy-stack-item', {
      y: 50,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.philosophy-split-grid',
        start: 'top 95%', // Fires immediately when the grid enters the viewport
        once: true // Keeps elements visible once triggered
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
        start: 'top 90%', // Highly responsive entrance threshold
        once: true
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
        start: 'top 90%',
        once: true
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
              <span className="about-title-word">Curating <i>Legacy</i></span><br/>
              <span className="about-title-word">Through Light.</span>
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
                  <img src={founderImg} alt="Pavithra — Founder & Director" />
                </div>
              </div>
            </div>

            <div className="founder-content-col">
              <span className="subtitle-accent">MEET THE FOUNDER</span>
              <h2 className="founder-main-title">Pavithra</h2>
              <p className="founder-sub-headline">Lead Visual Director & Founder</p>
              
              <h3 className="founder-quote">"We do not merely take photographs. We curate the timeless <i>poetry</i> of your celebration."</h3>
              
              <div className="founder-bio">
                <p className="bio-paragraph dropcap-para">
                  As the visionary behind Shoot @ Sight, Pavithra has spent nearly a decade redefining high-end wedding storytelling. Merging the aesthetics of global fashion editorial with the deep emotion of candid photojournalism, she crafts a cinematic lookbook for couples who view their celebration as a living legacy.
                </p>
                <p className="bio-paragraph">
                  Her signature methodology is marked by an intuitive anticipation of candid glances, true-to-life processing, and a mastery over natural, ethereal lighting. With camera in hand, Pavithra blends seamlessly into the architecture of your day, capturing whispers that would otherwise be lost to time.
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
                <span className="founder-name">Pavithra</span>
                <span className="founder-title">FOUNDER // SHOOT @ SIGHT</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* The Philosophy */}
      <section className="about-philosophy section-padding container">
        <div className="philosophy-split-grid">
          
          {/* Left Column: Gorgeous Light-filled Portrait */}
          <div className="philosophy-image-col">
            <div className="philosophy-portrait-wrapper">
              {/* Offset Backdrop Line */}
              <div className="philosophy-portrait-backdrop"></div>
              
              <div className="philosophy-portrait-mask">
                <img src={philosophyBg} alt="Fine art lighting and details" className="philosophy-portrait-img" />
              </div>
              
              <div className="philosophy-portrait-tag">INTENTIONAL // TIMING // RAW</div>
            </div>
          </div>

          {/* Right Column: Highly Highlighted Content Stack */}
          <div className="philosophy-content-col">
            <span className="subtitle-accent">OUR CORE PILLARS</span>
            <h2 className="philosophy-split-title">The <i>Philosophy</i></h2>
            
            <div className="philosophy-vertical-stack">
              <div className="philosophy-stack-item">
                <span className="philosophy-stack-num">01 /</span>
                <div className="philosophy-stack-info">
                  <h3 className="philosophy-stack-title">Intentionality</h3>
                  <p className="philosophy-stack-desc">We do not believe in spray-and-pray. Every single frame is composed with meticulous purpose, ensuring a cohesive, editorial fine-art narrative throughout your entire collection.</p>
                </div>
              </div>

              <div className="philosophy-stack-item">
                <div className="philosophy-stack-num">02 /</div>
                <div className="philosophy-stack-info">
                  <h3 className="philosophy-stack-title">Fidelity</h3>
                  <p className="philosophy-stack-desc">Utilizing state-of-the-art lossless processing and color curation, we ensure that natural skin tones, fine fabric textures, and raw emotions remain true to life for generations.</p>
                </div>
              </div>

              <div className="philosophy-stack-item">
                <div className="philosophy-stack-num">03 /</div>
                <div className="philosophy-stack-info">
                  <h3 className="philosophy-stack-title">Timelessness</h3>
                  <p className="philosophy-stack-desc">We completely avoid fleeting, heavily-filtered coloring trends. Our classic, cinematic styling guarantees your gallery looks as breathtaking in fifty years as it does today.</p>
                </div>
              </div>
            </div>
          </div>

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
