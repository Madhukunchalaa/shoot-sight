import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import clientsData from '../data/clients-gallery.json';
import galleryData from '../data/gallery-images.json';
import './Portfolio.css';

const Portfolio = () => {
  const [filter, setFilter] = useState('All');
  const container = useRef();

  const items = [
    { id: 1,  title: 'Where Two Worlds Became One',     cat: 'Wedding',     img: clientsData.find(c => c.id === 'naveen-and-kate').images[0] },
    { id: 2,  title: 'City of Light, City of Love',     cat: 'Pre-wedding', img: clientsData.find(c => c.id === 'paris').images[3] },
    { id: 3,  title: 'She Was the Room',                cat: 'Candid',      img: clientsData.find(c => c.id === 'ragini').images[3] },
    { id: 4,  title: 'A Promise in Golden Hour',        cat: 'Wedding',     img: clientsData.find(c => c.id === 'aishwarya-and-akshay').images[0] },
    { id: 5,  title: 'Heritage & Heart',                cat: 'Pre-wedding', img: galleryData[2].url },
    { id: 6,  title: 'The Quiet Between Vows',          cat: 'Candid',      img: clientsData.find(c => c.id === 'kiran-and-tejaswini').images[0] },
    { id: 7,  title: 'Sacred & Celebrated',             cat: 'Wedding',     img: clientsData.find(c => c.id === 'pavithra-and-arun').images[7] },
    { id: 8,  title: 'Two Strangers, One Story',        cat: 'Pre-wedding', img: clientsData.find(c => c.id === 'raghu-dixith-and-varijashree').images[1] },
    { id: 9,  title: 'Candlelight & Courage',           cat: 'Candid',      img: clientsData.find(c => c.id === 'srinidhi-and-ramya').images[4] },
    { id: 10, title: 'Beneath the Ancient Sun',         cat: 'Wedding',     img: galleryData[0].url },
    { id: 11, title: 'Letters Never Sent',              cat: 'Pre-wedding', img: clientsData.find(c => c.id === 'priyanka-and-niranjan').images[5] },
    { id: 12, title: 'Still Waters, Still in Love',     cat: 'Candid',      img: galleryData[8].url },
    { id: 13, title: 'The Day Everything Changed',      cat: 'Wedding',     img: clientsData.find(c => c.id === 'naveen-and-kate').images[3] },
    { id: 14, title: 'Paris Was Their Witness',         cat: 'Pre-wedding', img: clientsData.find(c => c.id === 'paris').images[5] },
    { id: 15, title: 'Joy Unfiltered',                  cat: 'Candid',      img: clientsData.find(c => c.id === 'aishwarya-and-akshay').images[11] },
    { id: 16, title: 'Dancing Barefoot on Forever',     cat: 'Wedding',     img: galleryData[3].url },
    { id: 17, title: 'A Glance Worth a Thousand Words', cat: 'Pre-wedding', img: clientsData.find(c => c.id === 'ragini').images[6] },
    { id: 18, title: 'The Smile Before the Vow',        cat: 'Candid',      img: clientsData.find(c => c.id === 'kiran-and-tejaswini').images[7] },
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
