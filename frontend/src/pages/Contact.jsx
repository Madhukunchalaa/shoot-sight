import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Contact.css';

const contactImg = "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/SAS_4201.webp";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const container = useRef();
  const [form, setForm] = useState({
    names: '',
    email: '',
    date: '',
    venue: '',
    vision: '',
    investment: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useGSAP(() => {
    // Elegant entrance reveal
    gsap.from('.reveal-item', {
      y: 50,
      opacity: 0,
      duration: 1.4,
      stagger: 0.15,
      ease: 'power4.out',
      delay: 0.2
    });

    // Image card zoom effect
    gsap.from('.contact-image-wrapper img', {
      scale: 1.15,
      duration: 2.5,
      ease: 'power3.out'
    });

  }, { scope: container, dependencies: [] });

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`New Commission Enquiry — ${form.names}`);
    const body = encodeURIComponent(
`New Commission Application — Shoot @ Sight

Names: ${form.names}
Email: ${form.email}
Celebration Date: ${form.date}
Destinations / Venues: ${form.venue}
Investment Range: ${form.investment}

Artistic Scope / Vision:
${form.vision}`
    );
    window.location.href = `mailto:shootatsightweddings@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div ref={container} className="contact-page-editorial-dark" data-lenis-prevent>
      
      <div className="contact-main-grid container">
        
        {/* LEFT COLUMN: THE COUTURIER PHILOSOPHY & ATTITUDE */}
        <div className="contact-editorial-left">
          
          <div className="reveal-item">
            <span className="contact-accent-tag">05 // THE INITIATION</span>
          </div>

          <h1 className="contact-hero-title reveal-item">
            For those who value <br />
            <i>legacy over pixels.</i>
          </h1>

          <div className="contact-attitude-body reveal-item">
            <p className="attitude-p-bold">
              We do not accommodate traditional wedding checklists. We do not manufacture fake poses. 
            </p>
            <p className="attitude-p-light">
              We exist exclusively for couples who view their celebration as an uninhibited editorial work of art. 
              Our visual signature is raw, cinematic, and unapologetic. We capture the high-fashion drama, 
              the unscripted whispers, and the grand architectural scaling of your love. 
            </p>
            <p className="attitude-p-gold">
              If you are ready to move past standard imagery and immortalize your history as a living masterpiece, let’s begin.
            </p>
          </div>

          {/* Majestic Image Frame with offset borders */}
          <div className="contact-image-frame reveal-item">
            <div className="contact-image-vertical-label">HIGH END EDITORIAL // RAW EMOTION</div>
            <div className="contact-image-backdrop"></div>
            <div className="contact-image-wrapper">
              <img src={contactImg} alt="High-Fashion Editorial Narrative" />
            </div>
          </div>

          {/* Quick Contact Blocks */}
          <div className="contact-direct-blocks reveal-item">
            <div className="direct-item">
              <span className="direct-label">THE STUDIO</span>
              <p className="direct-value">Bengaluru, India // Global Commissions</p>
            </div>
            <div className="direct-item">
              <span className="direct-label">DIRECT CHANNELS</span>
              <a href="mailto:hello@shootatsight.com" className="direct-link">hello@shootatsight.com</a>
              <a href="tel:+919900233338" className="direct-link">+91 9900233338</a>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: THE COMMISSION FORM CARD */}
        <div className="contact-editorial-right reveal-item">
          <div className="contact-form-glass-card">
            
            <div className="form-card-header">
              <h2 className="form-card-title">Apply for Commission</h2>
              <p className="form-card-sub">We accept limited bookings annually to protect our artistic devotion.</p>
            </div>

            <form onSubmit={handleSubmit} className="premium-contact-form">
              
              <div className="form-input-group">
                <label className="form-input-label">Your Names</label>
                <input
                  type="text"
                  name="names"
                  value={form.names}
                  onChange={handleChange}
                  required
                  className="input-contact-chic"
                  placeholder="e.g. Aria & Alexander"
                />
              </div>

              <div className="form-input-group">
                <label className="form-input-label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="input-contact-chic"
                  placeholder="e.g. aria@luxury.com"
                />
              </div>

              <div className="form-double-fields">
                <div className="form-input-group">
                  <label className="form-input-label">Celebration Date</label>
                  <input
                    type="text"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                    className="input-contact-chic"
                    placeholder="DD.MM.YYYY"
                  />
                </div>
                <div className="form-input-group">
                  <label className="form-input-label">Destinations / Venues</label>
                  <input
                    type="text"
                    name="venue"
                    value={form.venue}
                    onChange={handleChange}
                    required
                    className="input-contact-chic"
                    placeholder="e.g. Lake Como, Italy"
                  />
                </div>
              </div>

              <div className="form-input-group">
                <label className="form-input-label">Artistic Scope / Vision</label>
                <textarea
                  rows="4"
                  name="vision"
                  value={form.vision}
                  onChange={handleChange}
                  required
                  className="textarea-contact-chic"
                  placeholder="Tell us about the atmosphere, the styling, and what draws you to our raw visual signature..."
                />
              </div>

              <div className="form-input-group">
                <label className="form-input-label">Investment Range</label>
                <select
                  name="investment"
                  value={form.investment}
                  onChange={handleChange}
                  className="select-contact-chic"
                  required
                >
                  <option value="" disabled>Select Your Curation Tier</option>
                  <option value="Signature Photo Journal (Starting at $8,000)">Signature Photo Journal (Starting at $8,000)</option>
                  <option value="Editorial Photo + Cinema Curation (Starting at $14,000)">Editorial Photo + Cinema Curation (Starting at $14,000)</option>
                  <option value="Multi-day Global Archive (Starting at $25,000)">Multi-day Global Archive (Starting at $25,000)</option>
                </select>
              </div>

              <button type="submit" className="btn-luxury-submit">
                <span>INITIATE NARRATIVE</span>
              </button>

            </form>

          </div>
        </div>

      </div>

    </div>
  );
};

export default Contact;
