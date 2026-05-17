import { useState, useEffect } from 'react';
import './Testimonials.css';

const testimonialsData = [
  {
    num: "01",
    quote: "We didn't want standard wedding photography; we wanted an author for our legacy. Shoot @ Sight didn't just capture our celebration—they curated a high-fashion, digital visual spread. Every single frame is pure art.",
    author: "Raghu Dixit & Varijashree",
    location: "THE HEIRLOOM CEREMONY",
    tags: ["Editorial Narrative", "High-Fashion Spread"]
  },
  {
    num: "02",
    quote: "To say they captured the emotion is an understatement. They captured the unspoken whispers, the raw poetry, and the cinematic architecture of our wedding. Absolute masters of high-end visual art.",
    author: "Naveen & Kate",
    location: "THE CINEMATIC CAPTURE",
    tags: ["Cinematic Poetry", "Candid Emotion"]
  },
  {
    num: "03",
    quote: "The sheer drama, the unscripted whispers, the absolute masterclass in lighting. Working with them was an immersive luxury experience. They don't just document—they command the lens with sheer prestige.",
    author: "Aishwarya & Akshay",
    location: "THE LUXURY PORTFOLIO",
    tags: ["Luxury Curation", "Prestige Lighting"]
  },
  {
    num: "04",
    quote: "Every single print is a physical masterpiece. The deep emotional weight, the rich color grading, and the timeless textures. They have forever preserved the raw soul of our celebration.",
    author: "Srinidhi & Ramya",
    location: "THE FINE ART LEGACY",
    tags: ["Fine Art Legacy", "Color Grading"]
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 6500); // Shift every 6.5s
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  return (
    <section className="testimonials-section section-padding">
      <div className="container testimonials-grid">
        
        {/* Left Side: Editorial Quote Accent & Headers */}
        <div className="testimonials-left-panel">
          <span className="subtitle-accent">04 // KUDOS & PRAISE</span>
          <h2 className="section-title-large">Unscripted <i>Whispers</i></h2>
          
          <div className="luxury-quote-icon">“</div>
          <p className="testimonials-manifesto">
            Crafting visual legacies, not just wedding galleries. Read the unvarnished experiences of the visionaries, the romantics, and the rebels who chose the extraordinary.
          </p>

          {/* Numerical Slide Selector */}
          <div className="testimonial-selectors">
            {testimonialsData.map((t, idx) => (
              <button 
                key={idx}
                className={`selector-num-btn ${idx === activeIndex ? 'active' : ''}`}
                onClick={() => setActiveIndex(idx)}
              >
                {t.num}
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Animated Testimonial Card Frame */}
        <div className="testimonials-right-panel">
          <div className="testimonial-card-frame">
            <div className="card-border-backing"></div>
            
            <div className="testimonial-card-inner">
              {testimonialsData.map((t, idx) => (
                <div 
                  key={idx} 
                  className={`testimonial-slide-item ${idx === activeIndex ? 'slide-active' : 'slide-inactive'}`}
                >
                  <p className="testimonial-quote-text">"{t.quote}"</p>
                  
                  <div className="testimonial-author-meta">
                    <h4 className="author-name">{t.author}</h4>
                    <span className="author-loc">{t.location}</span>
                  </div>

                  <div className="testimonial-card-tags">
                    {t.tags.map((tag, tagIdx) => (
                      <span key={tagIdx} className="card-tag-pill">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Slider Navigation Arrows */}
            <div className="testimonial-nav-arrows">
              <button className="nav-arrow prev" onClick={handlePrev} aria-label="Previous Slide">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
              </button>
              <button className="nav-arrow next" onClick={handleNext} aria-label="Next Slide">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
