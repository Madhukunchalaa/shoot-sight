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
      
      <section className="section-padding container journal-section">
        <div className="section-header-centered">
          <span className="subtitle-accent">03 // THE JOURNAL</span>
          <h2 className="section-title-large">Stories <br /><i>In Frame</i></h2>
        </div>
        
        <div className="journal-grid">
          <div className="journal-post">
            <div className="post-img">
              <img src="https://images.unsplash.com/photo-1522673607200-1648832cee98?q=80&w=2070" alt="Post" />
            </div>
            <div className="post-info">
              <span className="post-date">April 2026</span>
              <h3>Finding the Light in Candid Moments</h3>
              <Link to="/blog" className="link-arrow">Read Story</Link>
            </div>
          </div>
        </div>
      </section>

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

      {/* Experience section moved to the bottom, right above the footer */}
      <Experience />
    </>
  );
};

export default Home;
