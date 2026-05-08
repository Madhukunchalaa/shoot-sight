import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './RecentShoots.css';

// Import Professional Assets
import shoot1 from '../assets/NGD_4961.webp';
import shoot2 from '../assets/NGD_9246.webp';
import shoot3 from '../assets/NGD_9824.webp';
import shoot4 from '../assets/_DSC0075 - Copy.webp';
import shoot5 from '../assets/_DSC2178 - Copy.webp';

gsap.registerPlugin(ScrollTrigger);

const RecentShoots = () => {
  const horizontalRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const horizontalWidth = horizontalRef.current.scrollWidth;
      const windowWidth = window.innerWidth;
      
      gsap.to(horizontalRef.current, {
        x: () => -(horizontalWidth - windowWidth),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          end: () => "+=" + horizontalWidth,
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const shoots = [
    { id: 'naveen-swetha', title: "Naveen & Swetha", cat: "Wedding", img: shoot1 },
    { id: 'rahul-pooja', title: "Rahul & Pooja", cat: "Pre-Wedding", img: shoot2 },
    { id: 'vikram-anjali', title: "Vikram & Anjali", cat: "Cinematic Film", img: shoot3 },
    { id: 'arjun-sneha', title: "Arjun & Sneha", cat: "Destination", img: shoot4 },
    { id: 'royal-affair', title: "The Royal Affair", cat: "Royal Wedding", img: shoot5 },
  ];

  return (
    <section ref={containerRef} className="horizontal-shoots-section">
      <div className="horizontal-header container">
        <span className="subtitle-accent">LATEST WORK</span>
        <h2 className="section-title-large">Recent <i>Captures</i></h2>
      </div>

      <div ref={horizontalRef} className="horizontal-scroll-container">
        {shoots.map((shoot, index) => (
          <Link to={`/shoot/${shoot.id}`} key={index} className="horizontal-item-link">
            <div className="horizontal-item">
              <span className="item-number-overlay">0{index + 1}</span>
              <div className="horizontal-img-wrapper">
                <img src={shoot.img} alt={shoot.title} loading="lazy" />
                <div className="view-more-hover">
                  <span>EXPLORE</span>
                </div>
              </div>
              <div className="horizontal-item-info">
                <span className="item-cat-new">{shoot.cat}</span>
                <h4 className="item-title-new">{shoot.title}</h4>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RecentShoots;
