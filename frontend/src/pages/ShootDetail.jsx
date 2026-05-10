import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ShootDetail.css';

// Import local assets for fallback
import hero1 from '../assets/SAS_4201.webp';
import hero2 from '../assets/2S9A3065.webp';
import gal1 from '../assets/DSC06362.webp';
import gal2 from '../assets/NGD_4849-2.webp';
import gal3 from '../assets/NGD_4961.webp';
import gal4 from '../assets/_DSC3521 - Copy.webp';

gsap.registerPlugin(ScrollTrigger);

const mockShootData = {
  'naveen-swetha': { 
    title: "Naveen & Swetha", 
    date: "Jan 2026", 
    location: "Hyderabad", 
    desc: "A soulful celebration of love and culture. Every glance captured the essence of two families becoming one under the golden evening sky. The focus was on raw, unposed emotions and the delicate details of their heritage.", 
    hero: hero1,
    gallery: [gal1, gal2, gal3, gal4]
  },
  'rahul-pooja': { 
    title: "Rahul & Pooja", 
    date: "Feb 2026", 
    location: "Bangalore", 
    desc: "A modern pre-wedding story captured at dusk. We focused on the architecture, the dramatic light, and the quiet, intimate moments between the chaos of the city.", 
    hero: hero2,
    gallery: [gal4, gal3, gal2, gal1]
  },
  'vikram-anjali': { 
    title: "Vikram & Anjali", 
    date: "Mar 2026", 
    location: "Ooty", 
    desc: "A misty, cinematic affair in the hills. The weather provided a natural softbox, allowing us to capture incredibly moody and romantic portraits that feel like stills from a film.", 
    hero: gal1,
    gallery: [hero1, hero2, gal3, gal4]
  },
  'arjun-sneha': { 
    title: "Arjun & Sneha", 
    date: "Apr 2026", 
    location: "Paris", 
    desc: "A classic destination story. From the cobblestone streets to the grand architecture, their love story was documented with an editorial, high-fashion approach.", 
    hero: gal4,
    gallery: [gal2, gal1, hero1, hero2]
  }
};

const ShootDetail = () => {
  const { id } = useParams();
  const container = useRef();
  const [shoot, setShoot] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchShoot = async () => {
      try {
        const res = await fetch(`${API_URL}/shoots/${id}`);
        const data = await res.json();
        
        if (res.ok && data.data) {
          const s = data.data;
          setShoot({
            title: s.title,
            date: s.date,
            location: s.location,
            desc: s.desc,
            hero: s.heroImage,
            gallery: s.gallery || []
          });
        } else {
          setShoot(mockShootData[id] || mockShootData['naveen-swetha']);
        }
      } catch (err) {
        setShoot(mockShootData[id] || mockShootData['naveen-swetha']);
      } finally {
        setLoading(false);
      }
    };
    fetchShoot();
  }, [id]);

  useEffect(() => {
    if (loading || !shoot) return;

    const ctx = gsap.context(() => {
      // Title Entrance
      gsap.from(".exhibition-title-line", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.2
      });

      // Hero Image Reveal
      gsap.from(".exhibition-hero-img-wrapper", {
        scale: 0.95,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
        delay: 0.5
      });

      // Gallery Scroll reveal
      gsap.utils.toArray('.exhibition-gallery-item').forEach(item => {
        gsap.from(item, {
          y: 100,
          opacity: 0,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: "top 85%"
          }
        });
      });
    }, container);

    return () => ctx.revert();
  }, [loading, shoot]);

  // Safe helper to fetch gallery image with fallback
  const getGalleryImage = (index) => {
    if (shoot && shoot.gallery && shoot.gallery[index]) {
      return shoot.gallery[index];
    }
    const fallbacks = [gal1, gal2, gal3, gal4];
    return fallbacks[index % fallbacks.length];
  };

  if (loading || !shoot) {
    return (
      <div className="shoot-exhibition-page" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#8c8c8c', letterSpacing: '0.15em', fontSize: '0.8rem', textTransform: 'uppercase' }}>Dimming the Lights...</p>
      </div>
    );
  }

  return (
    <div ref={container} className="shoot-exhibition-page">
      
      {/* Minimalist Header */}
      <header className="exhibition-header container">
        <div className="exhibition-meta exhibition-title-line">
          <span>{shoot.location}</span>
          <span className="meta-dot">•</span>
          <span>{shoot.date}</span>
        </div>
        <h1 className="exhibition-title exhibition-title-line">
          {shoot.title}
        </h1>
      </header>

      {/* Hero Feature */}
      <section className="exhibition-hero container">
        <div className="exhibition-hero-img-wrapper">
          <img src={shoot.hero} alt={shoot.title} />
        </div>
      </section>

      {/* The Narrative Split */}
      <section className="exhibition-narrative container section-padding">
        <div className="narrative-grid">
          <div className="narrative-label">
            <h2>The Story</h2>
          </div>
          <div className="narrative-content">
            <p className="narrative-text">{shoot.desc}</p>
            <div className="narrative-tags">
              <span className="n-tag">Editorial</span>
              <span className="n-tag">Documentary</span>
              <span className="n-tag">Cinematic</span>
            </div>
          </div>
        </div>
      </section>

      {/* The Gallery Asymmetric Collage */}
      <section className="exhibition-gallery-collage container">
        <div className="collage-grid-vintage">
          <div className="collage-cell cell-tall exhibition-gallery-item">
            <div className="gallery-img-wrapper">
              <img src={getGalleryImage(0)} alt="Story Frame 1" />
            </div>
            <div className="gallery-caption">Frame 01 // Intentionality</div>
          </div>

          <div className="collage-cell cell-wide exhibition-gallery-item">
            <div className="gallery-img-wrapper">
              <img src={getGalleryImage(1)} alt="Story Frame 2" />
            </div>
            <div className="gallery-caption">Frame 02 // Atmosphere</div>
          </div>

          <div className="collage-cell cell-square exhibition-gallery-item">
            <div className="gallery-img-wrapper">
              <img src={getGalleryImage(2)} alt="Story Frame 3" />
            </div>
            <div className="gallery-caption">Frame 03 // Composition</div>
          </div>

          <div className="collage-cell cell-portrait exhibition-gallery-item">
            <div className="gallery-img-wrapper">
              <img src={getGalleryImage(3)} alt="Story Frame 4" />
            </div>
            <div className="gallery-caption">Frame 04 // Legacy</div>
          </div>
        </div>
      </section>

      {/* Footer Navigation */}
      <div className="exhibition-footer section-padding container text-center">
        <Link to="/portfolio" className="btn-premium">Return to Archives</Link>
      </div>
    </div>
  );
};

export default ShootDetail;
