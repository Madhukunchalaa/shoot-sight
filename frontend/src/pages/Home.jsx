import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Hero from '../components/Hero';
import OurStory from '../components/OurStory';
import Services from '../components/Services';
import RecentShoots from '../components/RecentShoots';
import Experience from '../components/Experience';
import FlyingDrone from '../components/FlyingDrone';
import Testimonials from '../components/Testimonials';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  useEffect(() => {
    // Perform a series of safety refreshes as images and iframes finish painting
    const timer1 = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    const timer2 = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    const timer3 = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  useGSAP(() => {
    // Staggered reveal for film text content
    gsap.from(".film-text-content > *", {
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".film-section-editorial",
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    // Parallax sliding for the background "CINEMA" word
    gsap.fromTo(".massive-bg-word",
      { xPercent: -15 },
      {
        xPercent: 15,
        scrollTrigger: {
          trigger: ".film-section-editorial",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2
        }
      }
    );

    // Spotlight entrance for the single video
    gsap.fromTo(".film-video-item",
      { scale: 0.96, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".film-video-item",
          start: "top 75%",
          toggleActions: "play none none none"
        }
      }
    );

    // Backdrop parallax
    gsap.fromTo(".video-backdrop",
      { yPercent: -8 },
      {
        yPercent: 8,
        scrollTrigger: {
          trigger: ".video-backdrop",
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      }
    );
  }, []);

  return (
    <>
      <Hero />
      <OurStory />
      <RecentShoots />
      <Services />
      
      {/* Immersive Pinned Process Experience (culminates the Services offering) */}
      <Experience />
      
      {/* Featured Films Section */}
      <section className="container film-section-editorial">
        <div className="massive-bg-word">CINEMA</div>
        <div className="film-editorial-grid">

          <div className="film-text-content">
            <span className="subtitle-accent">03 // FEATURED FILMS</span>
            <h2 className="film-section-heading">Cinematic <i>Poetry</i></h2>
            <p className="film-description">
              Experience the raw emotion, the fleeting glances, and the symphony of love in motion. Our films are crafted not just to document, but to make you feel.
            </p>
          </div>

          <div className="film-video-item">
            <div className="video-backdrop"></div>
            <div className="video-responsive">
              <iframe
                src="https://www.youtube.com/embed/E6mpqvgMyUY?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&loop=1&playlist=E6mpqvgMyUY&playsinline=1"
                title="Director's Cut — Monaco"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>

        </div>

        <div className="film-view-btn-row">
          <Link to="/films" className="btn-premium">View Films</Link>
        </div>

      </section>

      {/* Testimonials (Kudos & Praise) */}
      <Testimonials />

      {/* CTA Booking Section */}
      <section className="cta-section section-padding">
        <div className="container">
          <div className="cta-content">
            <h2 className="section-title-large">Let's create <br />something <i>eternal</i>.</h2>
            <p>Now booking luxury wedding experiences for 2026/27.</p>
            <div className="cta-actions">
              <Link to="/contact" className="btn-premium">Start a Conversation</Link>
            </div>
          </div>
        </div>
        <div className="cta-bg-text">CONTACT</div>
      </section>
      
      {/* Interactive Floating WhatsApp Drone */}
      <FlyingDrone />
    </>
  );
};

export default Home;
