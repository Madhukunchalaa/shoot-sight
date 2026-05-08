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
            <h2 className="cta-title">Your love deserves <br />to be <i>remembered</i>.</h2>
            <p>Every great love story has a photographer who was paying attention. Let's make yours unforgettable.</p>
            <div className="cta-actions">
              <Link to="/contact" className="btn-premium">Begin Your Story</Link>
            </div>
          </div>
        </div>
        <div className="cta-bg-text">CONTACT</div>
      </section>
    </>
  );
};

export default Home;
