import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from '../components/Hero';
import OurStory from '../components/OurStory';
import Services from '../components/Services';
import RecentShoots from '../components/RecentShoots';
import Experience from '../components/Experience';
import FlyingDrone from '../components/FlyingDrone';
import Testimonials from '../components/Testimonials';
import { Link } from 'react-router-dom';

const landingFilmId = "a94LGkUt3Pg";

const Home = () => {
  useEffect(() => {
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
      <div className="home-content-wrapper">
        <OurStory />
        <RecentShoots />
        <Services />

        <Experience />

        <section className="landing-film-section">
          <div className="landing-film-video">
            <iframe
              src={`https://www.youtube.com/embed/${landingFilmId}?autoplay=1&mute=1&controls=0&disablekb=1&fs=0&iv_load_policy=3&modestbranding=1&rel=0&loop=1&playlist=${landingFilmId}&playsinline=1&start=1`}
              title="Featured Shoot @ Sight film"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              referrerPolicy="strict-origin-when-cross-origin"
              tabIndex="-1"
              aria-hidden="true"
            />
          </div>

          <div className="landing-film-overlay">
            <span className="subtitle-accent">03 // FEATURED FILMS</span>
            <h2 className="film-section-heading">Cinematic <i>Poetry</i></h2>
            <p className="film-description">
              Experience the raw emotion, the fleeting glances, and the symphony of love in motion.
            </p>
            <Link to="/films" className="btn-premium">View Films</Link>
          </div>
        </section>

        <Testimonials />

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
      </div>

      <FlyingDrone />
    </>
  );
};

export default Home;
