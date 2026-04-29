import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <section className="about-hero section-padding container">
        <div className="about-hero-content">
          <span className="subtitle-accent">OUR PHILOSOPHY</span>
          <h1 className="section-title-large">Preserving the <br /><i>Silent</i> Narrative</h1>
          <p className="lead-text">
            At Shoot @ Sight, we don't just take pictures. We curate memories through an editorial lens, 
            focusing on the quiet emotions that define your legacy.
          </p>
        </div>
      </section>

      <section className="about-story container section-padding">
        <div className="story-grid">
          <div className="story-img">
            <img src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070" alt="The Artist" />
          </div>
          <div className="story-text">
            <h2>The Vision</h2>
            <p>
              Founded on the belief that wedding photography should be more than a service—it should be an art form. 
              Our approach is inspired by high-end fashion and editorial storytelling, blending cinematic 
              compositions with the raw authenticity of candid moments.
            </p>
            <div className="story-stat">
              <div className="stat-item">
                <span className="stat-num">08+</span>
                <span className="stat-label">Years of Artistry</span>
              </div>
              <div className="stat-item">
                <span className="stat-num">400+</span>
                <span className="stat-label">Stories Told</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-process section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header-centered">
            <h2 className="section-title">The Master's Craft</h2>
          </div>
          <div className="process-grid">
            <div className="process-item">
              <h3>Intentionality</h3>
              <p>Every frame is composed with purpose, ensuring a cohesive visual language throughout your album.</p>
            </div>
            <div className="process-item">
              <h3>Fidelity</h3>
              <p>We use state-of-the-art processing to maintain the highest image quality, ready for 4K and Retina displays.</p>
            </div>
            <div className="process-item">
              <h3>Timelessness</h3>
              <p>Our editing style avoids fleeting trends, focusing on natural tones that will look stunning decades from now.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
