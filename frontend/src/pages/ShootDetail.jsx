import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ShootDetail.css';

const hero1 = "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/SAS_4201.webp";
const hero2 = "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/2S9A3065.webp";
const gal1 = "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/DSC06362.webp";
const gal2 = "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/NGD_4849-2.webp";
const gal3 = "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/NGD_4961.webp";
const gal4 = "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/_DSC3521_-_Copy.webp";

gsap.registerPlugin(ScrollTrigger);

const mockShootData = {
  'aishwarya-and-akshay': {
    title: "Aishwarya & Akshay",
    date: "May 2026",
    location: "Bangalore",
    desc: "An editorial wedding narrative captured with timeless sophistication. From grand architectural frames to the quietest glances, Aishwarya and Akshay's celebration was a masterclass in elegance.",
    hero: "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/aishwarya%20and%20akshay/KRP_8213.webp",
    gallery: [
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/aishwarya%20and%20akshay/KRP_6193.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/aishwarya%20and%20akshay/KRP_6202.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/aishwarya%20and%20akshay/KRP_6209.jpg",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/aishwarya%20and%20akshay/KRP_7208.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/aishwarya%20and%20akshay/KRP_7791.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/aishwarya%20and%20akshay/KRP_7858.jpg",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/aishwarya%20and%20akshay/KRP_7896.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/aishwarya%20and%20akshay/KRP_8213.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/aishwarya%20and%20akshay/KRP_8887.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/aishwarya%20and%20akshay/KRP_9045.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/aishwarya%20and%20akshay/KRP_9106.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/aishwarya%20and%20akshay/_DSC7299.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/aishwarya%20and%20akshay/_DSC7806.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/aishwarya%20and%20akshay/_DSC8119.webp"
    ]
  },
  'srinidhi-and-ramya': {
    title: "Srinidhi & Ramya",
    date: "May 2026",
    location: "Bangalore",
    desc: "A heartfelt celebration of love, warmth, and togetherness. Srinidhi and Ramya's wedding was a beautiful story of two families coming together, captured in every candid laugh and tender moment.",
    hero: "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/srinidhi%20and%20ramya/DSC00045.webp",
    gallery: [
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/srinidhi%20and%20ramya/DSC00013.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/srinidhi%20and%20ramya/DSC00045.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/srinidhi%20and%20ramya/DSC00167.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/srinidhi%20and%20ramya/DSC00174.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/srinidhi%20and%20ramya/DSC00219.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/srinidhi%20and%20ramya/DSC00236-Edit.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/srinidhi%20and%20ramya/DSC00238-Edit.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/srinidhi%20and%20ramya/DSC00868.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/srinidhi%20and%20ramya/DSC01641.webp"
    ]
  },
  'raghudixith-varijashree': {
    title: "Raghu Dixit & Varijashree",
    date: "May 2026",
    location: "Bangalore",
    desc: "A beautiful, musical celebration of love and art. Documented with raw emotion, vibrant energy, and timeless cinematic framing.",
    hero: "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/4%20RAGHUDIXITH%20AND%20VARIJASHREE_WEBP/NGD_6702.webp",
    gallery: [
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/4%20RAGHUDIXITH%20AND%20VARIJASHREE_WEBP/NGD_6707.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/4%20RAGHUDIXITH%20AND%20VARIJASHREE_WEBP/NGD_6712.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/4%20RAGHUDIXITH%20AND%20VARIJASHREE_WEBP/NGD_6719.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/4%20RAGHUDIXITH%20AND%20VARIJASHREE_WEBP/NGD_6723.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/4%20RAGHUDIXITH%20AND%20VARIJASHREE_WEBP/NGD_7085.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/4%20RAGHUDIXITH%20AND%20VARIJASHREE_WEBP/NGD_7151.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/4%20RAGHUDIXITH%20AND%20VARIJASHREE_WEBP/NGD_7412.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/4%20RAGHUDIXITH%20AND%20VARIJASHREE_WEBP/NGD_7441.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/4%20RAGHUDIXITH%20AND%20VARIJASHREE_WEBP/_01A7334.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/4%20RAGHUDIXITH%20AND%20VARIJASHREE_WEBP/_01A7603.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/4%20RAGHUDIXITH%20AND%20VARIJASHREE_WEBP/_01A7606-2.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/4%20RAGHUDIXITH%20AND%20VARIJASHREE_WEBP/_01A7645.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/4%20RAGHUDIXITH%20AND%20VARIJASHREE_WEBP/_01A7854.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/4%20RAGHUDIXITH%20AND%20VARIJASHREE_WEBP/_01A8221.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/4%20RAGHUDIXITH%20AND%20VARIJASHREE_WEBP/_01A8224.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/4%20RAGHUDIXITH%20AND%20VARIJASHREE_WEBP/_01A8226.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/4%20RAGHUDIXITH%20AND%20VARIJASHREE_WEBP/_01A8233.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/4%20RAGHUDIXITH%20AND%20VARIJASHREE_WEBP/_01A8234.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/4%20RAGHUDIXITH%20AND%20VARIJASHREE_WEBP/_01A8267.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/4%20RAGHUDIXITH%20AND%20VARIJASHREE_WEBP/_01A8274.webp"
    ]
  },
  'naveen-kate': { 
    title: "Naveen & Kate", 
    date: "May 2026", 
    location: "Sydney", 
    desc: "A breathtaking high-fashion wedding celebration. Every single moment radiated elegance, love, and joyous festivity, captured against beautiful backdrops with pristine lighting.", 
    hero: "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/NAVEEN%20AND%20KATE/SYD08467.webp",
    gallery: [
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/NAVEEN%20AND%20KATE/SYD07968.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/NAVEEN%20AND%20KATE/SYD07976.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/NAVEEN%20AND%20KATE/SYD08046.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/NAVEEN%20AND%20KATE/SYD08122.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/NAVEEN%20AND%20KATE/SYD08132.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/NAVEEN%20AND%20KATE/SYD08167.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/NAVEEN%20AND%20KATE/SYD08209.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/NAVEEN%20AND%20KATE/SYD08264.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/NAVEEN%20AND%20KATE/SYD08292.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/NAVEEN%20AND%20KATE/SYD08295.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/NAVEEN%20AND%20KATE/SYD08301.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/NAVEEN%20AND%20KATE/SYD08325.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/NAVEEN%20AND%20KATE/SYD08335.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/NAVEEN%20AND%20KATE/SYD08347.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/NAVEEN%20AND%20KATE/SYD08349.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/NAVEEN%20AND%20KATE/SYD08396.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/NAVEEN%20AND%20KATE/SYD08404.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/NAVEEN%20AND%20KATE/SYD08450.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/NAVEEN%20AND%20KATE/SYD08467.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/NAVEEN%20AND%20KATE/SYD08504.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/NAVEEN%20AND%20KATE/SYD08510.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/NAVEEN%20AND%20KATE/SYD08526.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/NAVEEN%20AND%20KATE/SYD08556.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/NAVEEN%20AND%20KATE/SYD08617.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/NAVEEN%20AND%20KATE/SYD08653.webp"
    ]
  },
  'ragini': {
    title: "Ragini",
    date: "May 2026",
    location: "Bangalore",
    desc: "A stunning portrait story of grace and beauty. Every frame was crafted to celebrate Ragini's elegance with soft, cinematic lighting and a timeless editorial approach.",
    hero: "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/ragini/_I3A6607.webp",
    gallery: [
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/ragini/_I3A6369.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/ragini/_I3A6392.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/ragini/_I3A6398.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/ragini/_I3A6607.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/ragini/_I3A6939.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/ragini/_I3A6987.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/ragini/_I3A7057.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/ragini/_I3A7175.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/ragini/_I3A7398.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/ragini/_I3A7446.webp",
      "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/ragini/_I3A7475.webp"
    ]
  }
};

const ShootDetail = () => {
  const { id } = useParams();
  const container = useRef();
  const [shoot, setShoot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightboxImage, setLightboxImage] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setLightboxImage(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
          setShoot(mockShootData[id] || mockShootData['naveen-kate']);
        }
      } catch (err) {
        setShoot(mockShootData[id] || mockShootData['naveen-kate']);
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

    // Refresh ScrollTrigger parameters on the next tick to ensure dynamic layout offsets are computed correctly
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      ctx.revert();
      clearTimeout(refreshTimer);
    };
  }, [loading, shoot]);

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
        <div 
          className="exhibition-hero-img-wrapper lightbox-trigger" 
          onClick={() => setLightboxImage(shoot.hero)}
        >
          <img src={shoot.hero} alt={shoot.title} />
          <div className="zoom-indicator">EXPLORE FULLSCREEN</div>
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
          {shoot.gallery.map((imgUrl, idx) => {
            const cellClasses = ['cell-tall', 'cell-wide', 'cell-square', 'cell-portrait'];
            const captions = ['Intentionality', 'Atmosphere', 'Composition', 'Legacy', 'Harmony', 'Raw Emotion', 'Elegance', 'Timeless', 'Vibrancy', 'Rhythm'];
            const cellClass = cellClasses[idx % cellClasses.length];
            const caption = captions[idx % captions.length];
            return (
              <div key={idx} className={`collage-cell ${cellClass} exhibition-gallery-item`}>
                <div 
                  className="gallery-img-wrapper lightbox-trigger" 
                  onClick={() => setLightboxImage(imgUrl)}
                >
                  <img src={imgUrl} alt={`Story Frame ${idx + 1}`} loading="lazy" />
                  <div className="zoom-indicator">EXPLORE FULLSCREEN</div>
                </div>
                <div className="gallery-caption">Frame {idx + 1 < 10 ? `0${idx + 1}` : idx + 1} // {caption}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer Navigation */}
      <div className="exhibition-footer section-padding container text-center">
        <Link to="/portfolio" className="btn-premium">Return to Archives</Link>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxImage && (
        <div className="shoot-lightbox-modal" onClick={() => setLightboxImage(null)}>
          <button className="lightbox-close-btn" onClick={() => setLightboxImage(null)}>✕</button>
          <div className="lightbox-content-wrapper" onClick={(e) => e.stopPropagation()}>
            <img src={lightboxImage} alt="Fullscreen exhibition view" className="lightbox-img" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ShootDetail;
