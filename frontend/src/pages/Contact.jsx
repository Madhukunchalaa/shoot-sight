import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

const EVENT_TYPES = ['Wedding', 'Pre-Wedding', 'Portrait', 'Engagement', 'Other'];

const Contact = () => {
  const pageRef = useRef(null);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', date: '', location: '', eventType: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cnt__hero-label', { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out', delay: 0.1 });
      gsap.from('.cnt__hero-heading', { y: 48, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.2 });
      gsap.from('.cnt__hero-sub', { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out', delay: 0.4 });

      gsap.from('.cnt__info-item', {
        y: 28, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: { trigger: '.cnt__info', start: 'top 90%', once: true },
      });

      gsap.from('.cnt__form-wrap', {
        y: 40, opacity: 0, duration: 1, ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: { trigger: '.cnt__form-wrap', start: 'top 90%', once: true },
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="cnt-page" ref={pageRef}>

      {/* ── Hero ────────────────────────────────────────── */}
      <section className="cnt__hero">
        <div className="container">
          <span className="cnt__hero-label">05 // CONTACT</span>
          <h1 className="cnt__hero-heading">
            Let's make<br /><em>something eternal</em>
          </h1>
          <p className="cnt__hero-sub">
            Now booking luxury wedding experiences for 2026 & 2027.
          </p>
        </div>
      </section>

      {/* ── Body grid ───────────────────────────────────── */}
      <section className="cnt__body">
        <div className="container cnt__grid">

          {/* Left — info */}
          <aside className="cnt__info">

            <div className="cnt__info-item">
              <span className="cnt__info-label">Write to us</span>
              <a href="mailto:hello@shootatsight.com" className="cnt__info-value cnt__info-link">
                hello@shootatsight.com
              </a>
            </div>

            <div className="cnt__info-item">
              <span className="cnt__info-label">Call or WhatsApp</span>
              <a href="tel:+917989776255" className="cnt__info-value cnt__info-link">
                +91 79897 76255
              </a>
            </div>

            <div className="cnt__info-item">
              <span className="cnt__info-label">Studio</span>
              <p className="cnt__info-value">
                Jubilee Hills<br />Hyderabad, India
              </p>
            </div>

            <div className="cnt__info-item">
              <span className="cnt__info-label">Follow</span>
              <div className="cnt__socials">
                <a href="#" className="cnt__social-link">Instagram ↗</a>
                <a href="#" className="cnt__social-link">Pinterest ↗</a>
                <a href="#" className="cnt__social-link">Vimeo ↗</a>
              </div>
            </div>

            <div className="cnt__availability">
              <span className="cnt__avail-dot" />
              <span>Available for bookings in 2026 & 2027</span>
            </div>

          </aside>

          {/* Right — form */}
          <div className="cnt__form-wrap">
            {submitted ? (
              <div className="cnt__success">
                <span className="cnt__success-icon">✦</span>
                <h2 className="cnt__success-heading">We've received your inquiry.</h2>
                <p className="cnt__success-text">
                  We'll be in touch within 24 hours to begin crafting your story.
                </p>
              </div>
            ) : (
              <form className="cnt__form" onSubmit={handleSubmit}>

                <div className="cnt__form-row">
                  <div className="cnt__field">
                    <label className="cnt__field-label">Your Name</label>
                    <input
                      type="text" name="name" value={form.name}
                      onChange={handleChange} required
                      className="cnt__input" placeholder="Full name"
                    />
                    <span className="cnt__line" />
                  </div>
                  <div className="cnt__field">
                    <label className="cnt__field-label">Email Address</label>
                    <input
                      type="email" name="email" value={form.email}
                      onChange={handleChange} required
                      className="cnt__input" placeholder="your@email.com"
                    />
                    <span className="cnt__line" />
                  </div>
                </div>

                <div className="cnt__form-row">
                  <div className="cnt__field">
                    <label className="cnt__field-label">Phone / WhatsApp</label>
                    <input
                      type="tel" name="phone" value={form.phone}
                      onChange={handleChange}
                      className="cnt__input" placeholder="+91"
                    />
                    <span className="cnt__line" />
                  </div>
                  <div className="cnt__field">
                    <label className="cnt__field-label">Event Date</label>
                    <input
                      type="date" name="date" value={form.date}
                      onChange={handleChange}
                      className="cnt__input cnt__input--date"
                    />
                    <span className="cnt__line" />
                  </div>
                </div>

                <div className="cnt__field">
                  <label className="cnt__field-label">Event Location</label>
                  <input
                    type="text" name="location" value={form.location}
                    onChange={handleChange}
                    className="cnt__input" placeholder="City, venue or destination"
                  />
                  <span className="cnt__line" />
                </div>

                <div className="cnt__field">
                  <label className="cnt__field-label">Type of Shoot</label>
                  <div className="cnt__event-types">
                    {EVENT_TYPES.map(type => (
                      <button
                        key={type}
                        type="button"
                        className={`cnt__type-btn ${form.eventType === type ? 'cnt__type-btn--active' : ''}`}
                        onClick={() => setForm(prev => ({ ...prev, eventType: type }))}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="cnt__field">
                  <label className="cnt__field-label">Tell us your vision</label>
                  <textarea
                    name="message" value={form.message}
                    onChange={handleChange}
                    className="cnt__input cnt__textarea"
                    placeholder="Share details about your event, aesthetic preferences, or anything that inspires you..."
                    rows="5"
                  />
                  <span className="cnt__line" />
                </div>

                <div className="cnt__form-footer">
                  <p className="cnt__form-note">
                    We respond within 24 hours. All inquiries are treated with complete discretion.
                  </p>
                  <button type="submit" className="cnt__submit">
                    <span>Send Inquiry</span>
                    <span className="cnt__submit-arrow">→</span>
                  </button>
                </div>

              </form>
            )}
          </div>

        </div>
      </section>

      {/* ── Bottom bar ──────────────────────────────────── */}
      <div className="cnt__bottom container">
        <span>SHOOT @ SIGHT</span>
        <span>HYDERABAD · INDIA · 2026</span>
      </div>

    </div>
  );
};

export default Contact;
