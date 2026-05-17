import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import './Blog.css';

const img1 = "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/_DSC3521_-_Copy.webp";
const img2 = "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/_DSC0075_-_Copy.webp";
const img3 = "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/_DSC2178_-_Copy.webp";
const img4 = "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/SAS_4201.webp";

const initialPosts = [
  {
    id: 1,
    title: 'Finding the Light in Candid Moments',
    date: 'April 24, 2026',
    cat: 'ARTISTRY',
    excerpt: 'Exploring the technical and emotional aspects of low-light candid photography in high-end weddings.',
    content: [
      'Golden hour is that magical window of time just before sunset where the sun is low in the sky, producing a warm, soft light that behaves like a natural filter. In Hyderabad, the sunset light reflecting off heritage stone and lake vistas creates a dreamlike amber glow. To capture this, timing is everything.',
      'We coordinate with our couples to block out exactly 45 minutes of their schedule. Tips for your shoot: 1. Keep moving. Low-angle light is perfect for capturing natural movement. 2. Lean into the flare. Backlighting creates a halo effect on hair and dresses. 3. Colors matter. Earthy colors, pastel pinks, and ivory reflect this light spectacularly.',
      'Beyond technical specifications, candid lighting is about emotional pacing. We watch for silent cues—a heavy breath before the ceremony, a slight touch of hands, or tears half-hidden by a veil. Allowing these moments to occur naturally, without forcing unnatural lighting grids, keeps the integrity of the frame pure.'
    ],
    img: img1,
    featured: true
  },
  {
    id: 2,
    title: 'How to Stay Natural on Camera: 5 Essential Tips',
    date: 'March 15, 2026',
    cat: 'GUIDE',
    excerpt: 'Feeling stiff or nervous in front of the lens? Read our guide on how to let go of the camera and focus on each other.',
    content: [
      'The biggest fear couples share with us is "We aren\'t photogenic" or "We feel awkward." We hear you! The secret to natural photos is simple: stop posing and start interacting. Here are 5 tips we use to keep things authentic:',
      '1. Whisper a joke: Whispering something silly instantly breaks the tension and brings out real laughter. 2. Walk and talk: Walking gives your body a natural action, distracting you from the lens. 3. Touch points: Keep a hand on their waist or hold fingers. Physical contact grounds you.',
      '4. Trust your photographer: We capture the spaces between the poses where your real connection shines. 5. Forget perfection: The most beautiful images are the ones with wind-blown hair and spontaneous smiles. Let go, look at each other, and let us handle the frames.'
    ],
    img: img2
  },
  {
    id: 3,
    title: 'Behind the Lens: Designing Your Pre-wedding Moodboard',
    date: 'February 28, 2026',
    cat: 'INSPIRATION',
    excerpt: 'How we collaborate with couples to design customized, high-fashion visual concepts before taking a single shot.',
    content: [
      'A pre-wedding shoot isn\'t just about taking pictures in a nice park—it is about telling your unique story. We begin every project by collaborating on a digital moodboard. We look at cinematic films, editorial fashion magazines, and vintage color grading to find a theme that resonates.',
      'Whether it is "Classic Noir" in an urban setting or "Moody Romanticism" in the mountains, a moodboard ensures our wardrobe, styling, locations, and cameras are completely aligned.',
      'By planning color coordination and movement patterns beforehand, we reduce the stress on the day of the shoot. This level of curated planning is what elevates a standard couple shoot into a bespoke work of fine art.'
    ],
    img: img3
  },
  {
    id: 4,
    title: 'Misty Mountains: Capturing Love in Ooty\'s Valleys',
    date: 'January 10, 2026',
    cat: 'DESTINATIONS',
    excerpt: 'A deep dive into our cinematic experience shooting in the cold, foggy tea-gardens of Ooty.',
    content: [
      'Ooty offers a completely different vibe compared to the grand, warm palaces of Hyderabad. The fog, the deep greens of tea estates, and the cold air create an incredibly moody, intimate atmosphere.',
      'During our recent shoot with Vikram & Anjali, the mist rolled in so thick that the background completely disappeared. This allowed us to focus purely on their expressions and the soft texture of their sweaters.',
      'It is a testament to how weather can become a powerful storytelling tool in photography. Instead of hiding from rain or fog, we lean directly into them to capture the high-contrast, moody colors of the environment.'
    ],
    img: img4
  }
];

const Blog = () => {
  const container = useRef();
  const [activePost, setActivePost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${API_URL}/blogs`);
        const data = await res.json();
        if (res.ok && data.blogs && data.blogs.length > 0) {
          const mapped = data.blogs.map((b, idx) => ({
            id: b._id,
            title: b.title,
            date: new Date(b.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            cat: (b.tags && b.tags[0]) ? b.tags[0].toUpperCase() : 'ARTISTRY',
            excerpt: b.content ? (b.content.substring(0, 140) + '...') : '',
            content: b.content ? b.content.split('\n\n') : [],
            img: b.coverImageUrl || img1,
            featured: idx === 0
          }));
          setPosts([...mapped, ...initialPosts]);
        } else {
          setPosts(initialPosts);
        }
      } catch (err) {
        setPosts(initialPosts);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  useGSAP(() => {
    if (loading || posts.length === 0) return;

    // Typing Animation for Title
    const chars = container.current.querySelectorAll('.typing-char');
    gsap.fromTo(chars,
      { opacity: 0 },
      { opacity: 1, duration: 0.05, stagger: 0.05, ease: 'none', delay: 0.2 }
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
  }, { scope: container, dependencies: [loading, posts] });

  const renderTypingText = (text) => {
    return text.split('').map((char, i) => (
      <span key={i} className="typing-char" style={{ opacity: 0 }}>
        {char}
      </span>
    ));
  };

  if (loading) {
    return (
      <div className="blog-page section-padding" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: '#8c8c8c', letterSpacing: '0.15em', fontSize: '0.8rem', textTransform: 'uppercase' }}>Curating the Journal...</span>
      </div>
    );
  }

  return (
    <div ref={container} className="blog-page">
      <div className="blog-hero-section section-padding container">
        <div className="blog-header-stylish">
          <span className="subtitle-accent">04 // BLOG</span>
          <h1 className="editorial-title">
            <i>{renderTypingText("Behind")}</i> <br /> 
            {renderTypingText("The Scenes")}
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
              <button onClick={() => setActivePost(post)} className="read-more-magazine" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}>
                <span>Read Article</span>
                <div className="btn-line"></div>
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Interactive Reader Modal */}
      {activePost && (
        <div className="blog-reader-modal" onClick={() => setActivePost(null)}>
          <div className="modal-inner-glass" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setActivePost(null)}>✕</button>
            
            <div className="modal-scroll-content" data-lenis-prevent>
              <div className="modal-header-meta">
                <span className="modal-cat">{activePost.cat}</span>
                <span className="modal-dot">•</span>
                <span className="modal-date">{activePost.date}</span>
              </div>
              
              <h2 className="modal-title">{activePost.title}</h2>
              
              <div className="modal-hero-img-box">
                <img src={activePost.img} alt={activePost.title} />
              </div>

              <div className="modal-body-paragraphs">
                {activePost.content.map((para, i) => (
                  <p key={i} className="modal-p">{para}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="journal-footer-cta section-padding">
        <div className="container">
          <div className="cta-box-editorial">
            <h3>Subscribe to <i>The Blog</i></h3>
            <p>A monthly curation of shoot stories, lighting tips, and backstage guides delivered directly to your inbox.</p>
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
