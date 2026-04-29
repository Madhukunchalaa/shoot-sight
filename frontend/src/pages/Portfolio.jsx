import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import './Portfolio.css';

const Portfolio = () => {
  const [filter, setFilter] = useState('All');
  const container = useRef();

  const items = [
    { id: 1, title: 'Ethereal Morning', cat: 'Wedding', img: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070' },
    { id: 2, title: 'Urban Romance', cat: 'Pre-wedding', img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069' },
    { id: 3, title: 'The Silent Vow', cat: 'Candid', img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070' },
    { id: 4, title: 'Golden Legacy', cat: 'Wedding', img: 'https://images.unsplash.com/photo-1460364155352-f5ee23a6b721?q=80&w=2070' },
    { id: 5, title: 'Shadow & Light', cat: 'Candid', img: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=2070' },
    { id: 6, title: 'Desert Dream', cat: 'Pre-wedding', img: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=2070' },
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
