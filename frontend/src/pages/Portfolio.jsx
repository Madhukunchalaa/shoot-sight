import { useState, useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import './Portfolio.css';

const img1 = "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/SAS_4201.webp";
const img2 = "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/2S9A3065.webp";
const img3 = "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/DSC06362.webp";
const img4 = "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/NGD_4849-2.webp";
const img5 = "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/NGD_4961.webp";
const img6 = "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/NGD_9246.webp";
const img7 = "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/NGD_9824.webp";
const img8 = "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/_DSC0075_-_Copy.webp";
const img9 = "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/_DSC2178_-_Copy.webp";

const mockItems = [
  { id: '1', cat: 'Wedding', img: "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/4%20RAGHUDIXITH%20AND%20VARIJASHREE_WEBP/NGD_6702.webp", size: 'large' },
  { id: '2', cat: 'Editorial', img: "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/NAVEEN%20AND%20KATE/SYD08467.webp", size: 'tall' },
  { id: '3', cat: 'Pre-wedding', img: img2, size: 'wide' },
  { id: '4', cat: 'Cinematic', img: img3, size: 'standard' },
  { id: '5', cat: 'Wedding', img: img4, size: 'large' },
  { id: '6', cat: 'Editorial', img: "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/NAVEEN%20AND%20KATE/SYD08292.webp", size: 'tall' },
  { id: '7', cat: 'Pre-wedding', img: img6, size: 'standard' },
  { id: '8', cat: 'Wedding', img: img7, size: 'wide' },
  { id: '9', cat: 'Cinematic', img: img8, size: 'large' },
  { id: '10', cat: 'Pre-wedding', img: "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/NAVEEN%20AND%20KATE/SYD08335.webp", size: 'standard' },
  { id: '11', cat: 'Wedding', img: "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/4%20RAGHUDIXITH%20AND%20VARIJASHREE_WEBP/NGD_6707.webp", size: 'wide' },
  { id: '12', cat: 'Cinematic', img: "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/4%20RAGHUDIXITH%20AND%20VARIJASHREE_WEBP/NGD_6712.webp", size: 'tall' },
  { id: '13', cat: 'Editorial', img: "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/4%20RAGHUDIXITH%20AND%20VARIJASHREE_WEBP/NGD_6719.webp", size: 'standard' },
  { id: '14', cat: 'Wedding', img: "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/4%20RAGHUDIXITH%20AND%20VARIJASHREE_WEBP/NGD_7441.webp", size: 'large' },
  { id: '15', cat: 'Cinematic', img: "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/4%20RAGHUDIXITH%20AND%20VARIJASHREE_WEBP/_01A7645.webp", size: 'wide' },
  { id: '16', cat: 'Pre-wedding', img: "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/4%20RAGHUDIXITH%20AND%20VARIJASHREE_WEBP/_01A8233.webp", size: 'tall' },
  { id: '17', cat: 'Wedding', img: "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/NAVEEN%20AND%20KATE/SYD07968.webp", size: 'standard' },
  { id: '18', cat: 'Editorial', img: "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/NAVEEN%20AND%20KATE/SYD08046.webp", size: 'large' },
  { id: '19', cat: 'Pre-wedding', img: "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/NAVEEN%20AND%20KATE/SYD08209.webp", size: 'wide' },
  { id: '20', cat: 'Cinematic', img: "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/NAVEEN%20AND%20KATE/SYD08264.webp", size: 'tall' },
  { id: '21', cat: 'Wedding', img: "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/NAVEEN%20AND%20KATE/SYD08301.webp", size: 'standard' },
  { id: '22', cat: 'Editorial', img: "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/NAVEEN%20AND%20KATE/SYD08325.webp", size: 'large' },
  { id: '23', cat: 'Pre-wedding', img: "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/SAS_2092.webp", size: 'wide' },
  { id: '24', cat: 'Cinematic', img: "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/_I3A6612.webp", size: 'tall' },
  { id: '25', cat: 'Wedding', img: "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/NGD_1093.webp", size: 'standard' },
  { id: '26', cat: 'Editorial', img: "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/2S9A8309.webp", size: 'large' },
  { id: '27', cat: 'Pre-wedding', img: "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/KRP_9777.webp", size: 'wide' },
  { id: '28', cat: 'Cinematic', img: "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/_DSC1468_-_Copy.webp", size: 'tall' }
];

const Portfolio = () => {
  const [filter, setFilter] = useState('All');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxImage, setLightboxImage] = useState(null);
  const container = useRef();

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
    const fetchPortfolio = async () => {
      try {
        const res = await fetch(`${API_URL}/shoots`);
        const data = await res.json();
        
        if (res.ok && data.data && data.data.length > 0) {
          const sizes = ['large', 'tall', 'wide', 'standard'];
          const cats = ['Wedding', 'Pre-wedding', 'Editorial', 'Cinematic'];
          const mapped = data.data.map((s, idx) => ({
            id: s.slug || s._id,
            cat: s.category || cats[idx % cats.length],
            img: s.heroImage,
            size: sizes[idx % sizes.length]
          }));
          setItems([...mapped, ...mockItems]);
        } else {
          setItems(mockItems);
        }
      } catch (err) {
        setItems(mockItems);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, []);

  const filteredItems = filter === 'All' ? items : items.filter(i => i.cat === filter);

  useGSAP(() => {
    if (filteredItems.length === 0) return;
    gsap.from('.gallery-editorial-item', {
      y: 80,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: 'power3.out',
    });
  }, [filter, filteredItems]);

  if (loading) {
    return (
      <div className="portfolio-page section-padding" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: '#8c8c8c', letterSpacing: '0.15em', fontSize: '0.8rem', textTransform: 'uppercase' }}>Unveiling the Archives...</span>
      </div>
    );
  }

  return (
    <div ref={container} className="portfolio-page section-padding">
      <div className="container">
        <div className="page-header-editorial">
          <span className="subtitle-accent">01 // COLLECTIONS</span>
          <h1 className="section-title-large">The <i>Archives</i></h1>
        </div>

        <div className="portfolio-filters-elegant">
          {['All', 'Wedding', 'Pre-wedding', 'Editorial', 'Cinematic'].map(cat => (
            <button 
              key={cat} 
              className={`filter-btn-chic ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="portfolio-masonry-grid">
          {filteredItems.map((item, index) => (
            <div 
              key={`${item.id}-${index}`} 
              className={`gallery-editorial-item size-${item.size}`}
              onClick={() => setLightboxImage(item.img)}
            >
              <div className="gallery-matte-frame">
                <div className="gallery-img-wrapper">
                  <img src={item.img} alt={`Frame 0${index + 1}`} loading="lazy" />
                  <div className="gallery-overlay">
                    <span className="explore-pill">Explore Fullscreen</span>
                  </div>
                </div>
                <div className="gallery-editorial-details">
                  <span className="item-index-faint">0{index + 1}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
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

export default Portfolio;
