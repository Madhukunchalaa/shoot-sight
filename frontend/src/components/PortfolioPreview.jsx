import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import './PortfolioPreview.css';

// Import client images
import img1 from '../assets/img1.webp';
import img2 from '../assets/img2.webp';
import img3 from '../assets/img3.webp';

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
    { id: 1, title: 'Summer Eternal', cat: 'Wedding Story', img: img1 },
    { id: 2, title: 'Golden Hour', cat: 'Pre-wedding', img: img2 },
    { id: 3, title: 'Modern Muse', cat: 'Boutique Story', img: img3 },
  ];

  return (
    <section ref={container} className="portfolio-preview section-padding">
      <div className="bg-text-decoration">COLLECTIONS</div>
      <div className="container">
        <div className="portfolio-header">
          <span className="subtitle-accent">01 // SELECTED WORKS</span>
          <h2 className="section-title-large">Selected <br /><i>Collections</i></h2>
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
          <a href="/portfolio" className="btn-premium">View Full Archive</a>
        </div>
      </div>
    </section>
  );
};

export default PortfolioPreview;
