import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './RecentShoots.css';

// Import Professional Assets for fallback
import shoot1 from '../assets/NGD_4961.webp';
import shoot2 from '../assets/NGD_9246.webp';
import shoot3 from '../assets/NGD_9824.webp';
import shoot4 from '../assets/_DSC0075 - Copy.webp';
import shoot5 from '../assets/_DSC2178 - Copy.webp';

gsap.registerPlugin(ScrollTrigger);

const mockShoots = [
  { id: 'naveen-swetha', title: "Naveen & Swetha", cat: "Wedding", img: shoot1 },
  { id: 'rahul-pooja', title: "Rahul & Pooja", cat: "Pre-Wedding", img: shoot2 },
  { id: 'vikram-anjali', title: "Vikram & Anjali", cat: "Cinematic Film", img: shoot3 },
  { id: 'arjun-sneha', title: "Arjun & Sneha", cat: "Destination", img: shoot4 },
  { id: 'royal-affair', title: "The Royal Affair", cat: "Royal Wedding", img: shoot5 },
];

const RecentShoots = () => {
  const horizontalRef = useRef(null);
  const containerRef = useRef(null);
  const [shoots, setShoots] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch(`${API_URL}/shoots`);
        const data = await res.json();
        if (res.ok && data.data && data.data.length > 0) {
          const mapped = data.data.map(s => ({
            id: s.slug || s._id,
            title: s.title,
            cat: s.category,
            img: s.heroImage
          }));
          // Slice to top 5 for horizontal scroll
          setShoots(mapped.slice(0, 5));
        } else {
          setShoots(mockShoots);
        }
      } catch (err) {
        setShoots(mockShoots);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (shoots.length === 0) return;

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
  }, [shoots]);

  if (loading) {
    return (
      <section className="horizontal-shoots-section" style={{ height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#8c8c8c', letterSpacing: '0.1em', fontSize: '0.8rem', textTransform: 'uppercase' }}>Entering Archives...</p>
      </section>
    );
  }

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
