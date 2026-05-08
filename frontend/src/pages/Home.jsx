import Hero from '../components/Hero';
import OurStory from '../components/OurStory';
import Services from '../components/Services';
import RecentShoots from '../components/RecentShoots';
import Experience from '../components/Experience';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <Hero />
      <OurStory />
      <RecentShoots />
      <Services />
      
      <section className="section-padding container film-section-editorial">
        <div className="massive-bg-word">CINEMA</div>
        <div className="film-editorial-grid">
          
          <div className="film-text-content">
            <span className="subtitle-accent">03 // FEATURED FILM</span>
            <h2 className="section-title-large">Cinematic <br /><i>Poetry</i></h2>
            <p className="film-description">
              Experience the raw emotion, the fleeting glances, and the symphony of love in motion. Our films are crafted not just to document, but to make you feel.
            </p>
            <Link to="/portfolio" className="btn-premium">Explore Films</Link>
          </div>

          <div className="film-video-presentation">
            <div className="video-backdrop"></div>
            <div className="video-responsive">
              <iframe 
                width="560" 
                height="315" 
                src="https://www.youtube.com/embed/uJYT8dm1YKg?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&loop=1&playlist=uJYT8dm1YKg&playsinline=1" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
              ></iframe>
            </div>
            <div className="floating-film-label">DIRECTOR'S CUT</div>
          </div>

        </div>
      </section>

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

      {/* Experience section moved to the bottom, right above the footer */}
      <Experience />
    </>
  );
};

export default Home;
