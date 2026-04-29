import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import './PortfolioPreview.css';

const PortfolioPreview = () => {
  const container = useRef();

  useGSAP(() => {
    // Image Mask Reveals
    gsap.utils.toArray('.item-image-wrapper').forEach((wrapper) => {
      gsap.from(wrapper, {
        clipPath: 'inset(100% 0% 0% 0%)',
        duration: 1.5,
        ease: 'power4.inOut',
        scrollTrigger: {
          trigger: wrapper,
          start: 'top 90%',
        }
      });
    });

    // Parallax on images
    gsap.utils.toArray('.item-image').forEach((img) => {
      gsap.to(img, {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: img,
          scrub: true,
        }
      });
    });

    // Text Stagger
    gsap.from('.section-title-large', {
      x: -100,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container.current,
        start: 'top 70%',
      }
    });
  }, { scope: container });

  const items = [
    { id: 1, title: 'Summer Eternal', cat: 'Wedding Story', img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069' },
    { id: 2, title: 'Golden Hour', cat: 'Pre-wedding', img: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=2070' },
    { id: 3, title: 'Modern Muse', cat: 'Candid Narrative', img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070' },
  ];

  return (
    <section ref={container} className="portfolio-preview section-padding">
      <div className="bg-text-decoration">COLLECTIONS</div>
      <div className="container">
        <div className="portfolio-header">
          <span className="subtitle-accent">01 // SELECTED WORKS</span>
          <h2 className="section-title-large">Editorial <br /><i>Narratives</i></h2>
        </div>
        
        <div className="portfolio-stack">
          {items.map((item, index) => (
            <div key={item.id} className={`portfolio-card card-${index + 1}`}>
              <div className="item-image-wrapper">
                <img src={item.img} alt={item.title} className="item-image" />
              </div>
              <div className="item-info-overlap">
                <span className="item-number">0{index + 1}</span>
                <span className="item-cat">{item.cat}</span>
                <h3 className="item-title">{item.title}</h3>
                <div className="item-line"></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="view-all-wrapper">
          <a href="#portfolio" className="btn-premium">View Full Archive</a>
        </div>
      </div>
    </section>
  );
};

export default PortfolioPreview;
