import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import './Portfolio.css';

// Import client images
import img1 from '../assets/img1.webp';
import img2 from '../assets/img2.webp';
import img3 from '../assets/img3.webp';
import img4 from '../assets/img4.webp';
import img5 from '../assets/img5.webp';
import img6 from '../assets/img6.webp';
import img7 from '../assets/img7.webp';
import img8 from '../assets/img8.webp';
import img9 from '../assets/img9.webp';

const Portfolio = () => {
  const [filter, setFilter] = useState('All');
  const container = useRef();

  const items = [
    { id: 1, title: 'Ethereal Morning', cat: 'Wedding', img: img1 },
    { id: 2, title: 'Urban Romance', cat: 'Pre-wedding', img: img2 },
    { id: 3, title: 'The Silent Vow', cat: 'Candid', img: img3 },
    { id: 4, title: 'Golden Legacy', cat: 'Wedding', img: img4 },
    { id: 5, title: 'Shadow & Light', cat: 'Candid', img: img5 },
    { id: 6, title: 'Desert Dream', cat: 'Pre-wedding', img: img6 },
    { id: 7, title: 'Floral Whisper', cat: 'Wedding', img: img7 },
    { id: 8, title: 'Velvet Evening', cat: 'Candid', img: img8 },
    { id: 9, title: 'Azure Coast', cat: 'Pre-wedding', img: img9 },
  ];

  const filteredItems = filter === 'All' ? items : items.filter(i => i.cat === filter);

  useGSAP(() => {
    gsap.from('.gallery-item', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out',
    });
  }, [filter]);

  return (
    <div ref={container} className="portfolio-page section-padding">
      <div className="container">
        <div className="page-header">
          <span className="subtitle-accent">COLLECTIONS</span>
          <h1 className="section-title-large">The <i>Archives</i></h1>
        </div>

        <div className="portfolio-filters">
          {['All', 'Wedding', 'Pre-wedding', 'Candid'].map(cat => (
            <button 
              key={cat} 
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="portfolio-gallery">
          {filteredItems.map(item => (
            <div key={item.id} className="gallery-item">
              <div className="gallery-img-wrapper">
                <img src={item.img} alt={item.title} />
                <div className="gallery-overlay">
                  <span>View Story</span>
                </div>
              </div>
              <div className="gallery-details">
                <span className="item-cat">{item.cat}</span>
                <h3 className="item-title">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
