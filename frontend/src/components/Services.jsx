import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './Services.css';

const Services = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!imageRef.current) return;
      
      const { clientX, clientY } = e;
      // Pushing it further to the right (+150) and higher up (-300)
      gsap.to(imageRef.current, {
        x: clientX + 150, 
        y: clientY - 300,
        rotation: 3, 
        duration: 1,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const services = [
    {
      title: "Wedding Photography",
      desc: "Candid, emotional, and trend-forward photography that captures the soul of your celebration. We specialize in natural expressions, ethereal lighting, and storytelling frames that preserve your most intimate memories forever.",
      num: "01",
      img: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070"
    },
    {
      title: "Cinematic Wedding Films",
      desc: "High-definition movies inspired by your unique love story. With artistic angles, cinematic drone perspectives, emotional pacing, and professional-grade color grading, we turn your wedding day into a timeless motion picture experience.",
      num: "02",
      img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069"
    },
    {
      title: "Pre-Wedding & Engagement",
      desc: "A bespoke, conceptual shoot that reflects the essence of your partnership. Whether urban, nature-focused, luxury, or minimalist aesthetic — we curate mood-driven visuals designed for your legacy and invites.",
      num: "03",
      img: "https://images.unsplash.com/photo-1510076857177-74700760be49?q=80&w=2070"
    },
    {
      title: "Drone & Aerial Coverage",
      desc: "Sweeping aerial views that provide a grand perspective of your wedding story. From majestic heritage venues to scenic outdoor landscapes, our advanced drone cinematography adds a breathtaking dimension to your visuals.",
      num: "04",
      img: "https://images.unsplash.com/photo-1508394522741-82ac9c15ba69?q=80&w=2070"
    }
  ];

  return (
    <section 
      ref={sectionRef} 
      className="services-section section-padding"
      onMouseLeave={() => {
        // Force hide when mouse leaves the entire section
        gsap.to(imageRef.current, { opacity: 0, scale: 0.8, duration: 0.4 });
      }}
    >
      <div className="container">
        <div className="services-header">
          <span className="subtitle-accent">CRAFT & MASTERY</span>
          <h2 className="services-main-title">Our <i>Signature</i> Services</h2>
        </div>

        <div className="services-list">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="service-item"
              onMouseEnter={() => {
                setActiveImage(service.img);
                gsap.to(imageRef.current, { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" });
              }}
              onMouseLeave={() => {
                gsap.to(imageRef.current, { opacity: 0, scale: 0.8, duration: 0.4, ease: "power2.in" });
              }}
            >
              <div className="service-number">{service.num}</div>
              <div className="service-content">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Image Follower */}
        <div ref={imageRef} className="floating-service-image">
          {activeImage && <img src={activeImage} alt="Service Preview" />}
        </div>
      </div>
    </section>
  );
};

export default Services;
