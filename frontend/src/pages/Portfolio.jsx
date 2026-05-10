import { useState, useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import './Portfolio.css';

// Import client images for fallback (New High-Res WebP)
import img1 from '../assets/SAS_4201.webp';
import img2 from '../assets/2S9A3065.webp';
import img3 from '../assets/DSC06362.webp';
import img4 from '../assets/NGD_4849-2.webp';
import img5 from '../assets/NGD_4961.webp';
import img6 from '../assets/NGD_9246.webp';
import img7 from '../assets/NGD_9824.webp';
import img8 from '../assets/_DSC0075 - Copy.webp';
import img9 from '../assets/_DSC2178 - Copy.webp';

const mockItems = [
  { id: 'naveen-swetha', title: 'Naveen & Swetha', cat: 'Wedding', img: img1, size: 'large' },
  { id: 'rahul-pooja', title: 'Rahul & Pooja', cat: 'Pre-wedding', img: img2, size: 'tall' },
  { id: 'vikram-anjali', title: 'Vikram & Anjali', cat: 'Candid', img: img3, size: 'wide' },
  { id: 'arjun-sneha', title: 'Arjun & Sneha', cat: 'Wedding', img: img4, size: 'standard' },
  { id: 'naveen-swetha', title: 'Shadow & Light', cat: 'Candid', img: img5, size: 'tall' },
  { id: 'rahul-pooja', title: 'Urban Romance', cat: 'Pre-wedding', img: img6, size: 'standard' },
  { id: 'vikram-anjali', title: 'Floral Whisper', cat: 'Wedding', img: img7, size: 'wide' },
  { id: 'arjun-sneha', title: 'Velvet Evening', cat: 'Candid', img: img8, size: 'large' },
  { id: 'naveen-swetha', title: 'Azure Coast', cat: 'Pre-wedding', img: img9, size: 'standard' },
];

const Portfolio = () => {
  const [filter, setFilter] = useState('All');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const container = useRef();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await fetch(`${API_URL}/shoots`);
        const data = await res.json();
        
        if (res.ok && data.data && data.data.length > 0) {
          const sizes = ['large', 'tall', 'wide', 'standard'];
          const mapped = data.data.map((s, idx) => ({
            id: s.slug || s._id,
            title: s.title,
            cat: s.category,
            img: s.heroImage,
            size: sizes[idx % sizes.length]
          }));
          setItems(mapped);
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
          {['All', 'Wedding', 'Pre-wedding', 'Candid'].map(cat => (
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
            <Link 
              to={`/shoot/${item.id}`} 
              key={`${item.id}-${index}`} 
              className={`gallery-editorial-item size-${item.size}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="gallery-matte-frame">
                <div className="gallery-img-wrapper">
                  <img src={item.img} alt={item.title} loading="lazy" />
                  <div className="gallery-overlay">
                    <span className="explore-pill">View Story</span>
                  </div>
                </div>
                <div className="gallery-editorial-details">
                  <span className="item-index-faint">0{index + 1}</span>
                  <div>
                    <span className="item-cat">{item.cat}</span>
                    <h3 className="item-title-chic">{item.title}</h3>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
