import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import './Portfolio.css';

const Portfolio = () => {
  const [filter, setFilter] = useState('All');
  const container = useRef();

  const items = [
    { id: 1, title: 'Ethereal Morning',  cat: 'Wedding',     img: 'https://pub-cac83bb0873e44ebaf0b34571245ba3d.r2.dev/naveen%20and%20kate/_UNI9421.webp' },
    { id: 2, title: 'Urban Romance',     cat: 'Pre-wedding', img: 'https://pub-cac83bb0873e44ebaf0b34571245ba3d.r2.dev/aishwarya_akshay/KRP_7791.webp' },
    { id: 3, title: 'The Silent Vow',    cat: 'Candid',      img: 'https://pub-cac83bb0873e44ebaf0b34571245ba3d.r2.dev/kiran_tejaswini/NGD_9302.webp' },
    { id: 4, title: 'Golden Legacy',     cat: 'Wedding',     img: 'https://pub-cac83bb0873e44ebaf0b34571245ba3d.r2.dev/raghudixith_varijashree/NGD_6719.webp' },
    { id: 5, title: 'Shadow & Light',    cat: 'Candid',      img: 'https://pub-cac83bb0873e44ebaf0b34571245ba3d.r2.dev/ragini/_I3A6939.webp' },
    { id: 6, title: 'Desert Dream',      cat: 'Pre-wedding', img: 'https://pub-cac83bb0873e44ebaf0b34571245ba3d.r2.dev/PARIS/_DSC2178%20-%20Copy.webp' },
    { id: 7, title: 'Floral Whisper',    cat: 'Wedding',     img: 'https://pub-cac83bb0873e44ebaf0b34571245ba3d.r2.dev/pavithra_arun/DSC00529.webp' },
    { id: 8, title: 'Velvet Evening',    cat: 'Candid',      img: 'https://pub-cac83bb0873e44ebaf0b34571245ba3d.r2.dev/srinidhi_ramya/DSC01641.webp' },
    { id: 9, title: 'Azure Coast',       cat: 'Pre-wedding', img: 'https://pub-cac83bb0873e44ebaf0b34571245ba3d.r2.dev/priyanka%20and%20niranjan/DSC_0347.webp' },
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
