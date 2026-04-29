import './Blog.css';

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: 'Finding the Light in Candid Moments',
      date: 'April 24, 2026',
      cat: 'Artistry',
      excerpt: 'Exploring the technical and emotional aspects of low-light candid photography in high-end weddings.',
      img: 'https://images.unsplash.com/photo-1522673607200-1648832cee98?q=80&w=2070'
    },
    {
      id: 2,
      title: 'The Editorial Approach to Pre-wedding Shoots',
      date: 'March 15, 2026',
      cat: 'Behind the Lens',
      excerpt: 'How to transition from a simple photoshoot to a magazine-style visual narrative.',
      img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070'
    },
    {
      id: 3,
      title: 'Preserving Fidelity: The Tech Behind the Pixels',
      date: 'February 28, 2026',
      cat: 'Technical',
      excerpt: 'A deep dive into our lossless processing engine and why 4K image quality matters.',
      img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069'
    }
  ];

  return (
    <div className="blog-page section-padding container">
      <div className="page-header">
        <span className="subtitle-accent">THE JOURNAL</span>
        <h1 className="section-title-large">Editorial <br /><i>Perspectives</i></h1>
      </div>

      <div className="blog-list">
        {posts.map(post => (
          <article key={post.id} className="blog-item">
            <div className="blog-img-wrapper">
              <img src={post.img} alt={post.title} />
            </div>
            <div className="blog-content">
              <div className="blog-meta">
                <span className="blog-cat">{post.cat}</span>
                <span className="blog-date">{post.date}</span>
              </div>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <a href={`#blog/${post.id}`} className="link-arrow">Read More</a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog;
