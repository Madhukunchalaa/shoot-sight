import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import gsap from 'gsap';
import './ShootDetail.css';

const ShootDetail = () => {
  const { id } = useParams();

  // In the future, this data will come from your Admin Dashboard/Database
  const shootData = {
    'naveen-swetha': { title: "Naveen & Swetha", date: "Jan 2026", location: "Hyderabad", desc: "A soulful celebration of love and culture.", hero: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070" },
    'rahul-pooja': { title: "Rahul & Pooja", date: "Feb 2026", location: "Bangalore", desc: "A modern pre-wedding story captured at dusk.", hero: "https://images.unsplash.com/photo-1522673607200-1648832cee98?q=80&w=2070" },
    // Add more as needed...
  };

  const shoot = shootData[id] || shootData['naveen-swetha'];

  useEffect(() => {
    window.scrollTo(0, 0);
    const tl = gsap.timeline();
    tl.from(".detail-hero-img", { scale: 1.2, duration: 2, ease: "power2.out" })
      .from(".detail-content-box", { y: 100, opacity: 0, duration: 1, ease: "power3.out" }, "-=1");
  }, [id]);

  return (
    <div className="shoot-detail-page">
      <div className="detail-hero">
        <img src={shoot.hero} alt={shoot.title} className="detail-hero-img" />
        <div className="detail-hero-overlay"></div>
        <div className="detail-hero-text">
          <span className="detail-location">{shoot.location}</span>
          <h1 className="detail-title">{shoot.title}</h1>
        </div>
      </div>

      <section className="detail-info section-padding container">
        <div className="detail-grid">
          <div className="detail-main">
            <h2 className="detail-heading">The Story</h2>
            <p className="detail-desc">{shoot.desc}</p>
          </div>
          <div className="detail-meta">
            <div className="meta-item">
              <span>DATE</span>
              <p>{shoot.date}</p>
            </div>
            <div className="meta-item">
              <span>CATEGORY</span>
              <p>Luxury Wedding</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Placeholder - Ready for Admin Uploads */}
      <section className="detail-gallery container">
        <div className="gallery-grid">
          <div className="gallery-item large">
            <img src="https://images.unsplash.com/photo-1519225495810-753b35a962bb?q=80&w=2070" alt="Gallery 1" />
          </div>
          <div className="gallery-item">
            <img src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1974" alt="Gallery 2" />
          </div>
          <div className="gallery-item">
            <img src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070" alt="Gallery 3" />
          </div>
        </div>
      </section>

      <div className="detail-footer section-padding container">
        <Link to="/" className="btn-boutique-discover">BACK TO CAPTURES</Link>
      </div>
    </div>
  );
};

export default ShootDetail;
