import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import './Contact.css';

const Contact = () => {
  const container = useRef();

  useGSAP(() => {
    // 1. Entrance Stagger
    gsap.from('.contact-reveal', {
      y: 50,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: 'power4.out'
    });

    // 2. Parallax background text
    gsap.to('.bg-contact-text', {
      x: 100,
      scrollTrigger: {
        trigger: '.contact-page-stylish',
        scrub: 1
      }
    });

    // 3. Form input focus effect
    const inputs = document.querySelectorAll('.journal-input');
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
    <div ref={container} className="contact-page-stylish">
      <div className="bg-contact-text">START A CONVERSATION // START A CONVERSATION</div>
      
      <div className="container section-padding">
        <header className="contact-header contact-reveal">
          <span className="subtitle-accent">05 // CONTACT</span>
          <h1 className="contact-main-title">
            Begin the <i>Narrative</i>
          </h1>
        </header>

        <div className="contact-stylish-grid">
          {/* LEFT: INFO */}
          <div className="contact-info-block contact-reveal">
            <div className="info-section">
              <h3 className="info-label">Direct</h3>
              <a href="mailto:hello@shootatsight.com" className="info-link">hello@shootatsight.com</a>
              <a href="tel:+917989776255" className="info-link">+91 7989776255</a>
            </div>

            <div className="info-section">
              <h3 className="info-label">WhatsApp</h3>
              <a href="https://wa.me/917989776255" target="_blank" rel="noreferrer" className="info-link-accent">Message the Studio</a>
            </div>

            <div className="info-section">
              <h3 className="info-label">Studio Location</h3>
              <p className="info-text">Jubilee Hills, <br />Hyderabad, India</p>
            </div>

            <div className="info-social-links">
              <a href="#">Instagram</a>
              <a href="#">Pinterest</a>
              <a href="#">Vimeo</a>
            </div>
          </div>

          {/* RIGHT: THE INQUIRY JOURNAL (FORM) */}
          <div className="contact-form-block contact-reveal">
            <form className="journal-form">
              <div className="journal-field">
                <input type="text" className="journal-input" placeholder="Your Name" required />
                <div className="input-line"></div>
              </div>

              <div className="journal-field">
                <input type="email" className="journal-input" placeholder="Email Address" required />
                <div className="input-line"></div>
              </div>

              <div className="journal-field">
                <input type="text" className="journal-input" placeholder="Event Location" required />
                <div className="input-line"></div>
              </div>

              <div className="journal-field">
                <textarea className="journal-input" placeholder="Tell us your vision..." rows="4"></textarea>
                <div className="input-line"></div>
              </div>

              <div className="form-footer">
                <p className="form-note">By submitting, you agree to our artistic vision and processing timeline.</p>
                <button type="submit" className="btn-journal">
                  <span>Send Inquiry</span>
                  <div className="btn-circle"></div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Decorative Signature Section */}
      <section className="contact-bottom-signature container">
        <div className="signature-divider"></div>
        <div className="signature-flex">
          <p>SHOOT @ SIGHT // DIGITAL JOURNAL</p>
          <p>EST. 2018</p>
        </div>
      </section>
    </div>
  );
};

export default Contact;
