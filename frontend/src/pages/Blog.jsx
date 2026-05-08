import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import './Blog.css';

import img1 from '../assets/_DSC3521 - Copy.webp';
import img2 from '../assets/_DSC0075 - Copy.webp';
import img3 from '../assets/_DSC2178 - Copy.webp';
import img4 from '../assets/SAS_4201.webp';

const Blog = () => {
  const container = useRef();
  
  const posts = [
    {
      id: 1,
      title: 'Finding the Light in Candid Moments',
      date: 'April 24, 2026',
      cat: 'Artistry',
      excerpt: 'Exploring the technical and emotional aspects of low-light candid photography in high-end weddings.',
      img: img1,
      featured: true
    },
    {
      id: 2,
      title: 'The Editorial Approach to Pre-wedding Shoots',
      date: 'March 15, 2026',
      cat: 'Behind the Lens',
      excerpt: 'How to transition from a simple photoshoot to a magazine-style visual narrative.',
      img: img2
    },
    {
      id: 3,
      title: 'Preserving Fidelity: The Tech Behind the Pixels',
      date: 'February 28, 2026',
      cat: 'Technical',
      excerpt: 'A deep dive into our lossless processing engine and why 4K image quality matters.',
      img: img3
    },
    {
      id: 4,
      title: 'Shadow & Soul: The Art of Black and White',
      date: 'January 10, 2026',
      cat: 'Monochrome',
      excerpt: 'Why stripping away color can often reveal the truest essence of a shared glance.',
      img: img4
    }
  ];

  useGSAP(() => {
    // Typing Animation for Title
    const chars = container.current.querySelectorAll('.typing-char');
    gsap.fromTo(chars,
      { opacity: 0 },
      { opacity: 1, duration: 0.05, stagger: 0.05, ease: 'none', delay: 0.5 }
    );

    // Parallax on large background numbers
    gsap.utils.toArray('.bg-number').forEach((num) => {
      gsap.to(num, {
        y: -100,
        scrollTrigger: {
          trigger: num,
          scrub: true,
        }
      });
    });

    // Image Mask Reveals
    gsap.utils.toArray('.blog-img-box').forEach((box) => {
      gsap.from(box, {
        clipPath: 'inset(100% 0% 0% 0%)',
        duration: 1.5,
        ease: 'expo.inOut',
        scrollTrigger: {
          trigger: box,
          start: 'top 90%',
        }
      });
    });
  }, { scope: container });

  const renderTypingText = (text) => {
    return text.split('').map((char, i) => (
      <span key={i} className="typing-char" style={{ opacity: 0 }}>
        {char}
      </span>
    ));
  };

  return (
    <div ref={container} className="blog-page">
      <div className="blog-hero-section section-padding container">
        <div className="blog-header-stylish">
          <span className="subtitle-accent">04 // JOURNAL</span>
          <h1 className="editorial-title">
            <i>{renderTypingText("Editorial")}</i> <br /> 
            {renderTypingText("Perspectives")}
          </h1>
          <div className="title-accent-line"></div>
        </div>
      </div>

      <div className="blog-container container">
        {posts.map((post, index) => (
          <article key={post.id} className={`blog-post-card ${index % 2 === 0 ? 'even' : 'odd'} ${post.featured ? 'featured' : ''}`}>
            <div className="bg-number">0{index + 1}</div>
            
            <div className="post-visual">
              <div className="blog-img-box">
                <img src={post.img} alt={post.title} />
              </div>
              <div className="post-cat-vertical">{post.cat}</div>
            </div>

            <div className="post-details">
              <div className="post-meta-top">
                <span className="post-date">{post.date}</span>
                <div className="meta-line"></div>
              </div>
              <h2 className="post-title-stylish">{post.title}</h2>
              <p className="post-excerpt">{post.excerpt}</p>
              <a href={`#blog/${post.id}`} className="read-more-magazine">
                <span>View Narrative</span>
                <div className="btn-line"></div>
              </a>
            </div>
          </article>
        ))}
      </div>

      <section className="journal-footer-cta section-padding">
        <div className="container">
          <div className="cta-box-editorial">
            <h3>Subscribe to <i>The Narrative</i></h3>
            <p>A monthly curation of visual stories and editorial insights delivered to your inbox.</p>
            <div className="editorial-input-group">
              <input type="email" placeholder="YOUR EMAIL ADDRESS" />
              <button>JOIN</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
