import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Blog.css';

gsap.registerPlugin(ScrollTrigger);

const POSTS = [
  {
    id: 1,
    title: 'Finding the Light in Candid Moments',
    date: 'April 24, 2026',
    cat: 'Artistry',
    readTime: '6 min read',
    excerpt: 'Exploring the technical and emotional depth of low-light candid photography at high-end Indian weddings.',
    img: 'https://images.unsplash.com/photo-1522673607200-1648832cee98?q=80&w=2070',
    featured: true,
  },
  {
    id: 2,
    title: 'The Editorial Approach to Pre-Wedding Shoots',
    date: 'March 15, 2026',
    cat: 'Behind the Lens',
    readTime: '8 min read',
    excerpt: "How to transition from a simple photoshoot to a magazine-style visual narrative that tells a couple's unique story.",
    img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070',
  },
  {
    id: 3,
    title: 'Preserving Fidelity: The Tech Behind the Pixels',
    date: 'February 28, 2026',
    cat: 'Technical',
    readTime: '5 min read',
    excerpt: 'A deep dive into our lossless processing pipeline and why 4K archival quality matters for wedding memories.',
    img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069',
  },
  {
    id: 4,
    title: 'Shadow & Soul: The Art of Black and White',
    date: 'January 10, 2026',
    cat: 'Artistry',
    readTime: '7 min read',
    excerpt: "Why stripping away color reveals the truest essence of a shared glance and a lifetime's promise.",
    img: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=2070',
  },
  {
    id: 5,
    title: 'Golden Hour: Mastering the Magic Window',
    date: 'December 12, 2025',
    cat: 'Behind the Lens',
    readTime: '4 min read',
    excerpt: 'The hour before sunset holds a quality of light that transforms ordinary frames into extraordinary memories.',
    img: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?q=80&w=2069',
  },
  {
    id: 6,
    title: 'Composing the Chaos: Baraat Coverage',
    date: 'November 5, 2025',
    cat: 'Technical',
    readTime: '9 min read',
    excerpt: 'How we navigate the beautiful chaos of a baraat procession to capture every electric, joyous moment.',
    img: 'https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=2071',
  },
  {
    id: 7,
    title: 'A Still Life: Decor That Speaks',
    date: 'October 3, 2025',
    cat: 'Artistry',
    readTime: '5 min read',
    excerpt: 'The overlooked art of wedding detail photography — how a single marigold can hold an entire story.',
    img: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2070',
  },
];

const CATEGORIES = ['All', 'Artistry', 'Behind the Lens', 'Technical'];

const Blog = () => {
  const containerRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All' ? POSTS : POSTS.filter(p => p.cat === activeCategory);
  const featuredPost = activeCategory === 'All' ? filtered[0] : null;
  const gridPosts = activeCategory === 'All' ? filtered.slice(1) : filtered;

  useGSAP(() => {
    // Hero entrance
    const heroTl = gsap.timeline({ delay: 0.1 });
    heroTl
      .from('.blg-hero-label', { y: 16, opacity: 0, duration: 0.7, ease: 'power3.out' })
      .from('.blg-hero-title', { y: 44, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.4')
      .from('.blg-hero-desc', { y: 16, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
      .from('.blg-cats', { y: 14, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4');

    // Featured post
    gsap.from('.blg-featured-img', {
      clipPath: 'inset(100% 0% 0% 0%)',
      duration: 1.4,
      ease: 'expo.inOut',
      scrollTrigger: { trigger: '.blg-featured', start: 'top 78%' },
    });

    gsap.from('.blg-featured-content', {
      x: 36,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.blg-featured', start: 'top 72%' },
    });

    // Newsletter
    gsap.from('.blg-newsletter-inner', {
      y: 28,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.blg-newsletter', start: 'top 80%' },
    });
  }, { scope: containerRef });

  return (
    <div className="blg-page" ref={containerRef}>

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="blg-hero">
        <div className="container">
          <div className="blg-hero-top">
            <div className="blg-hero-left">
              <span className="blg-hero-label">04 // THE JOURNAL</span>
              <h1 className="blg-hero-title">
                The<br /><em>Narrative</em>
              </h1>
              <p className="blg-hero-desc">
                Visual stories and perspectives from behind the lens
              </p>
            </div>
            <div className="blg-hero-stat" aria-hidden="true">
              <span className="blg-stat-num">{POSTS.length}</span>
              <span className="blg-stat-label">Stories</span>
            </div>
          </div>

          {/* Category filter */}
          <div className="blg-cats">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`blg-cat-btn${activeCategory === cat ? ' active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
                {cat !== 'All' && (
                  <span className="blg-cat-count">
                    {POSTS.filter(p => p.cat === cat).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Post ─────────────────────────────────── */}
      {featuredPost && (
        <section className="blg-featured">
          <div className="container">
            <div className="blg-featured-grid">
              <a href="#" className="blg-featured-img">
                <img
                  src={featuredPost.img}
                  alt={featuredPost.title}
                  loading="eager"
                />
                <span className="blg-featured-badge">Featured</span>
              </a>

              <div className="blg-featured-content">
                <span className="blg-post-cat">{featuredPost.cat}</span>
                <h2 className="blg-featured-title">{featuredPost.title}</h2>
                <p className="blg-featured-excerpt">{featuredPost.excerpt}</p>
                <div className="blg-post-meta">
                  <span>{featuredPost.date}</span>
                  <span className="blg-dot">·</span>
                  <span>{featuredPost.readTime}</span>
                </div>
                <a href="#" className="blg-read-btn">
                  Read Story <span className="blg-arrow">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Posts Grid ────────────────────────────────────── */}
      <section className="blg-grid-section">
        <div className="container">
          {gridPosts.length > 0 ? (
            <>
              <div className="blg-grid-header">
                <span className="blg-grid-label">
                  {activeCategory === 'All' ? 'ALL STORIES' : activeCategory.toUpperCase()}
                </span>
                <span className="blg-grid-count">{gridPosts.length} articles</span>
              </div>

              <div className="blg-grid" key={activeCategory}>
                {gridPosts.map((post, i) => (
                  <article
                    key={post.id}
                    className="blg-card"
                    style={{ animationDelay: `${i * 75}ms` }}
                  >
                    <a href="#" className="blg-card-link">
                      <div className="blg-card-img-wrap">
                        <img
                          src={post.img}
                          alt={post.title}
                          loading="lazy"
                          decoding="async"
                        />
                        <span className="blg-card-cat">{post.cat}</span>
                      </div>
                      <div className="blg-card-body">
                        <h3 className="blg-card-title">{post.title}</h3>
                        <p className="blg-card-excerpt">{post.excerpt}</p>
                        <div className="blg-card-meta">
                          <span>{post.date}</span>
                          <span className="blg-dot">·</span>
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </a>
                  </article>
                ))}
              </div>
            </>
          ) : (
            <div className="blg-empty">
              <p>No stories in this category yet — check back soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Newsletter ────────────────────────────────────── */}
      <section className="blg-newsletter">
        <div className="container">
          <div className="blg-newsletter-inner">
            <div className="blg-nl-text">
              <span className="blg-nl-label">STAY INSPIRED</span>
              <h3 className="blg-nl-heading">
                Subscribe to <em>The Narrative</em>
              </h3>
              <p>Monthly visual stories and editorial insights, delivered quietly.</p>
            </div>
            <form className="blg-nl-form" onSubmit={e => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="blg-nl-input"
                required
              />
              <button type="submit" className="blg-nl-btn">Subscribe</button>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Blog;
