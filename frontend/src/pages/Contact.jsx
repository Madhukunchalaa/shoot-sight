import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-page section-padding container">
      <div className="contact-grid">
        <div className="contact-info">
          <span className="subtitle-accent">GET IN TOUCH</span>
          <h1 className="section-title-large">Let's Capture <br />Your <i>Story</i></h1>
          <p className="contact-desc">
            Whether it's a destination wedding or an intimate elopement, we'd love to hear your vision.
          </p>

          <div className="contact-methods">
            <div className="method-item">
              <h4>Inquiries</h4>
              <p>hello@shootatsight.com</p>
            </div>
            <div className="method-item">
              <h4>WhatsApp</h4>
              <a href="https://wa.me/917989776255" target="_blank" rel="noreferrer">+91 7989776255</a>
            </div>
            <div className="method-item">
              <h4>Social</h4>
              <a href="#instagram">@shootatsight</a>
            </div>
          </div>
        </div>

        <div className="contact-form-wrapper">
          <form className="premium-form">
            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="Your name" />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="email@example.com" />
              </div>
            </div>
            <div className="form-group">
              <label>Event Date</label>
              <input type="date" />
            </div>
            <div className="form-group">
              <label>Tell us your story</label>
              <textarea placeholder="Tell us more about your event..." rows="5"></textarea>
            </div>
            <button type="submit" className="btn-premium btn-full">Send Inquiry</button>
          </form>
        </div>
      </div>

      <div className="contact-map section-padding">
        <div className="map-placeholder">
          {/* In a real scenario, embed Google Maps here */}
          <div className="map-info">
            <h3>Our Studio</h3>
            <p>Jubilee Hills, Hyderabad, India</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
