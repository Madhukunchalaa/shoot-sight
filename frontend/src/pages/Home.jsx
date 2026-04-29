import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from '../components/Hero';
import PortfolioPreview from '../components/PortfolioPreview';
import Experience from '../components/Experience';
import { Link } from 'react-router-dom';
import './Home.css';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const testimonialRef = useRef();

  useEffect(() => {
    // Fade-in for testimonials
    const quotes = testimonialRef.current?.querySelectorAll('.testimonial-item');
    if (quotes) {
      gsap.fromTo(quotes,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, stagger: 0.25, ease: 'power3.out',
          scrollTrigger: { trigger: testimonialRef.current, start: 'top 75%' }
        }
      );
    }
  }, []);

  return (
    <>
      <Hero />
      <PortfolioPreview />
      <Experience />

      {/* ── Testimonials Section ── */}
      <section ref={testimonialRef} className="section-padding testimonials-section">
        <div className="container">
          <div className="section-header-centered">
            <span className="subtitle-accent">03 // WORDS</span>
            <h2 className="section-title-large">Behind <br /><i>The Lens</i></h2>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-item">
              <div className="testimonial-image">
                <img src="https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800" alt="Priya & Arjun" />
              </div>
              <p className="testimonial-quote">"They didn't just photograph our wedding — they preserved every emotion we felt that day. Every frame is a painting."</p>
              <span className="testimonial-author">— Priya &amp; Arjun, Udaipur 2025</span>
            </div>
            <div className="testimonial-item">
              <div className="testimonial-image">
                <img src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800" alt="Meera & Rohan" />
              </div>
              <p className="testimonial-quote">"The team was invisible yet everywhere. We forgot cameras existed, and that's exactly why the photos feel so real."</p>
              <span className="testimonial-author">— Meera &amp; Rohan, Goa 2025</span>
            </div>
            <div className="testimonial-item">
              <div className="testimonial-image">
                <img src="https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=80&w=800" alt="Ananya & Dev" />
              </div>
              <p className="testimonial-quote">"Worth every rupee. The film made our parents cry. That's the highest compliment we can give."</p>
              <span className="testimonial-author">— Ananya &amp; Dev, Coorg 2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Journal Section ── */}
      <section className="section-padding container journal-section">
        <div className="section-header-centered">
          <span className="subtitle-accent">04 // THE JOURNAL</span>
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

      {/* ── CTA Section ── */}
      <section className="cta-section section-padding">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Let's create <br />something <i>eternal</i>.</h2>
            <p>Now booking editorial narratives for 2026/27.</p>
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
