import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Contact.css';
import bannerImg from '../assets/SAS_4201.webp';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const container = useRef();

  useGSAP(() => {
    // Banner Parallax
    gsap.to('.contact-banner-img', {
      y: 100,
      scrollTrigger: {
        trigger: '.contact-banner',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    // Content Entrance
    gsap.from('.contact-reveal-light', {
      y: 40,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: 'power3.out',
      delay: 0.2
    });

    // Form input focus effect
    const inputs = document.querySelectorAll('.journal-input-light');
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        gsap.to(input.nextElementSibling, { scaleX: 1, duration: 0.5, ease: 'power2.out' });
      });
      input.addEventListener('blur', () => {
        if (!input.value) {
          gsap.to(input.nextElementSibling, { scaleX: 0, duration: 0.5, ease: 'power2.in' });
        }
      });
    });
  }, { scope: container });

  return (
    <div ref={container} className="contact-page-light">
      
      {/* Short Cinematic Banner */}
      <div className="contact-banner">
        <img src={bannerImg} alt="Shoot @ Sight Contact" className="contact-banner-img" />
        <div className="contact-banner-overlay"></div>
        <h1 className="contact-banner-title contact-reveal-light">Get in Touch</h1>
      </div>

      <div className="container contact-content-light section-padding">
        
        <div className="contact-grid-light">
          {/* LEFT: TITLE & INFO */}
          <div className="contact-info-light">
            <header className="contact-header-light contact-reveal-light">
              <span className="subtitle-accent">05 // INQUIRY</span>
              <h2 className="contact-main-title-light">
                Begin the<br/><i>Narrative</i>
              </h2>
              <p className="contact-intro-text">
                We take on a limited number of commissions each year to ensure every story receives our complete artistic devotion. Tell us about your vision.
              </p>
            </header>

            <div className="info-blocks-light contact-reveal-light">
              <div className="info-section-light">
                <h3 className="info-label">Direct</h3>
                <a href="mailto:hello@shootatsight.com" className="info-link">hello@shootatsight.com</a>
                <a href="tel:+917989776255" className="info-link">+91 7989776255</a>
              </div>

              <div className="info-section-light">
                <h3 className="info-label">Studio</h3>
                <p className="info-text">Bengaluru, India</p>
              </div>
            </div>
          </div>

          {/* RIGHT: THE FORM */}
          <div className="contact-form-light contact-reveal-light">
            <form className="journal-form-light">
              <div className="journal-field-light">
                <input type="text" className="journal-input-light" placeholder="Your Names" required />
                <div className="input-line-light"></div>
              </div>

              <div className="journal-field-light">
                <input type="email" className="journal-input-light" placeholder="Email Address" required />
                <div className="input-line-light"></div>
              </div>

              <div className="journal-field-light">
                <div className="split-fields">
                  <div className="journal-field-sub">
                    <input type="text" className="journal-input-light" placeholder="Event Date" required />
                    <div className="input-line-light"></div>
                  </div>
                  <div className="journal-field-sub">
                    <input type="text" className="journal-input-light" placeholder="Location" required />
                    <div className="input-line-light"></div>
                  </div>
                </div>
              </div>

              <div className="journal-field-light">
                <textarea className="journal-input-light text-area-light" placeholder="Tell us your vision and what draws you to our work..." rows="4"></textarea>
                <div className="input-line-light"></div>
              </div>

              <div className="form-footer-light">
                <button type="submit" className="btn-premium">
                  Submit Inquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
