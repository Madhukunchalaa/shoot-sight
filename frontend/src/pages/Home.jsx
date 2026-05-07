import Hero from '../components/Hero';
import ParisShowcase from '../components/ParisShowcase';
import FilmStripGallery from '../components/FilmStripGallery';
import VideoShowcase from '../components/VideoShowcase';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <Hero />
      <ParisShowcase />
      <FilmStripGallery />
      <VideoShowcase />

      <section className="cta-section section-padding">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Let's create <br />something <i>eternal</i>.</h2>
            <p>Now booking luxury wedding experiences for 2026/27.</p>
            <div className="cta-actions">
              <Link to="/contact" className="btn-premium">Start a Conversation</Link>
            </div>
          </div>
        </div>
        <div className="cta-bg-text">CONTACT</div>
      </section>
    </>
  );
};

export default Home;
