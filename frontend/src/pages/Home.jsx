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
import { useSiteConfig } from '../context/SiteConfigContext';
import useSEO from '../hooks/useSEO';

const Home = () => {
  const { config } = useSiteConfig();

  useSEO({
    title: 'High-End Editorial Wedding Photography & Films',
    description: 'Bespoke editorial wedding photography and cinematic films for luxury celebrations worldwide. Based in Bangalore, capturing the quiet emotions and poetry of your story.',
  });

  const featuredFilmContent = config?.featured_film || {
    filmId: 'to6ek5xQXrM',
    tagline: '03 // FEATURED FILMS',
    headingMain: 'Cinematic',
    headingHighlight: 'Poetry',
    description: 'Experience the raw emotion, the fleeting glances, and the symphony of love in motion.',
    buttonText: 'View Films'
  };

  const ctaContent = config?.cta || {
    headingMain: "Let's create",
    headingHighlight: 'eternal',
    subtext: 'Now booking luxury wedding experiences for 2026/27.',
    bgText: 'CONTACT',
    buttonText: 'Start a Conversation',
    bgImage: 'https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/shoot-sight-latest-images/KRP_7298.jpg.webp'
  };

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

  const filmId = featuredFilmContent.filmId;

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
              src={`https://www.youtube.com/embed/${filmId}?autoplay=1&mute=1&controls=0&disablekb=1&fs=0&iv_load_policy=3&modestbranding=1&rel=0&loop=1&playlist=${filmId}&playsinline=1&start=1`}
              title="Featured Shoot @ Sight film"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              referrerPolicy="strict-origin-when-cross-origin"
              tabIndex="-1"
              aria-hidden="true"
            />
            <div className="landing-film-blocker" style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'transparent' }} />
          </div>

          <div className="landing-film-overlay">
            <span className="subtitle-accent">{featuredFilmContent.tagline}</span>
            <h2 className="film-section-heading">
              {featuredFilmContent.headingMain} <i>{featuredFilmContent.headingHighlight}</i>
            </h2>
            <p className="film-description">
              {featuredFilmContent.description}
            </p>
            <Link to="/films" className="btn-premium">{featuredFilmContent.buttonText}</Link>
          </div>
        </section>

        <Testimonials />

        <section 
          className="cta-section section-padding"
          style={{ backgroundImage: `url(${ctaContent.bgImage})` }}
        >
          <div className="container">
            <div className="cta-content">
              <h2 className="section-title-large">
                {ctaContent.headingMain} <br />something <i>{ctaContent.headingHighlight}</i>.
              </h2>
              <p>{ctaContent.subtext}</p>
              <div className="cta-actions">
                <Link to="/contact" className="btn-premium">{ctaContent.buttonText}</Link>
              </div>
            </div>
          </div>
          <div className="cta-bg-text">{ctaContent.bgText}</div>
        </section>
      </div>

      <FlyingDrone />
    </>
  );
};

export default Home;
