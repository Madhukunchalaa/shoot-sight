import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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

  return (
    <>
      <Hero />
      <OurStory />
      <RecentShoots />
      <Services />
      
      {/* Immersive Pinned Process Experience (culminates the Services offering) */}
      <Experience />
      
      {/* Featured Films Section */}
      <section className="section-padding container film-section-editorial">
        <div className="massive-bg-word">CINEMA</div>
        <div className="film-editorial-grid">
          
          <div className="film-text-content">
            <span className="subtitle-accent">03 // FEATURED FILMS</span>
            <h2 className="section-title-large">Cinematic <br /><i>Poetry</i></h2>
            <p className="film-description">
              Experience the raw emotion, the fleeting glances, and the symphony of love in motion. Our films are crafted not just to document, but to make you feel.
            </p>
            <Link to="/portfolio" className="btn-premium">Explore Films</Link>
          </div>

          <div className="film-videos-column">
            
            {/* Video 1 */}
            <div className="film-video-item">
              <div className="video-backdrop"></div>
              <div className="video-responsive">
                <iframe 
                  width="560" 
                  height="315" 
                  src="https://www.youtube.com/embed/E6mpqvgMyUY?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&loop=1&playlist=E6mpqvgMyUY&playsinline=1" 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  allowFullScreen
                ></iframe>
              </div>
              <div className="floating-film-label">DIRECTOR'S CUT // MONACO</div>
            </div>

            {/* Video 2 */}
            <div className="film-video-item">
              <div className="video-backdrop"></div>
              <div className="video-responsive">
                <iframe 
                  width="560" 
                  height="315" 
                  src="https://www.youtube.com/embed/wLqHwzM9ABo?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&loop=1&playlist=wLqHwzM9ABo&playsinline=1" 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  allowFullScreen
                ></iframe>
              </div>
              <div className="floating-film-label">CINEMATIC ESSENCE // TUSCANY</div>
            </div>

            {/* Video 3 */}
            <div className="film-video-item">
              <div className="video-backdrop"></div>
              <div className="video-responsive">
                <iframe 
                  width="560" 
                  height="315" 
                  src="https://www.youtube.com/embed/a94LGkUt3Pg?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&loop=1&playlist=a94LGkUt3Pg&playsinline=1" 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  allowFullScreen
                ></iframe>
              </div>
              <div className="floating-film-label">THE SYMPHONY // PARIS</div>
            </div>

            {/* Video 4 */}
            <div className="film-video-item">
              <div className="video-backdrop"></div>
              <div className="video-responsive">
                <iframe 
                  width="560" 
                  height="315" 
                  src="https://www.youtube.com/embed/b58Iizh8Dfg?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&loop=1&playlist=b58Iizh8Dfg&playsinline=1" 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  allowFullScreen
                ></iframe>
              </div>
              <div className="floating-film-label">ETERNAL NARRATIVE // AMALFI</div>
            </div>

          </div>

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
