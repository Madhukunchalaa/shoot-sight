import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('list'); // 'list', 'create', 'blogs-list', 'create-blog'
  const [shoots, setShoots] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  
  // Create Shoot Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Wedding');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [desc, setDesc] = useState('');
  const [heroImage, setHeroImage] = useState(null);
  const [gallery, setGallery] = useState([]);

  // Blog Management State
  const [blogs, setBlogs] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogCategory, setBlogCategory] = useState('ARTISTRY');
  const [blogContent, setBlogContent] = useState('');
  const [blogCover, setBlogCover] = useState("https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/_DSC3521_-_Copy.webp");
  
  // UI States
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    // Auth Guard
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchShoots();
    fetchBlogs();
  }, [navigate]);

  const fetchShoots = async () => {
    setLoadingList(true);
    try {
      const res = await fetch(`${API_URL}/shoots`);
      const data = await res.json();
      if (res.ok) {
        setShoots(data.data || []);
      } else {
        setError('Failed to fetch collections.');
      }
    } catch (err) {
      setError('Could not connect to the server.');
    } finally {
      setLoadingList(false);
    }
  };

  const fetchBlogs = async () => {
    setLoadingBlogs(true);
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${API_URL}/admin/blogs`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setBlogs(data.blogs || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingBlogs(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    navigate('/admin/login');
  };

  const handleHeroChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setHeroImage(e.target.files[0]);
    }
  };

  const handleGalleryChange = (e) => {
    if (e.target.files) {
      setGallery(Array.from(e.target.files));
    }
  };

  const handleDelete = async (shootId, shootTitle) => {
    if (!window.confirm(`Are you sure you want to delete "${shootTitle}" and all its uploaded images?`)) {
      return;
    }

    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${API_URL}/shoots/${shootId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess('Shoot deleted successfully.');
        setShoots(shoots.filter(s => s._id !== shootId));
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Deletion failed.');
      }
    } catch (err) {
      setError('Connection to server failed during deletion.');
    }
  };

  const handleDeleteBlog = async (blogId, blogTitle) => {
    if (!window.confirm(`Are you sure you want to delete blog "${blogTitle}"?`)) {
      return;
    }

    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${API_URL}/admin/blogs/${blogId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.ok) {
        setSuccess('Blog deleted successfully.');
        setBlogs(blogs.filter(b => b._id !== blogId));
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError('Blog deletion failed.');
      }
    } catch (err) {
      setError('Connection to server failed during deletion.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!heroImage) {
      setError('A Hero Cover Image is required.');
      return;
    }

    setUploading(true);
    setUploadProgress('Preparing files & connecting...');

    const token = localStorage.getItem('adminToken');
    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('location', location);
    formData.append('date', date);
    formData.append('desc', desc);
    formData.append('heroImage', heroImage);

    gallery.forEach((file) => {
      formData.append('gallery', file);
    });

    try {
      setUploadProgress('Compressing & converting images to .webp...');
      const res = await fetch(`${API_URL}/shoots`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      setUploadProgress('Saving records to storage...');
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to upload shoot');
      }

      setSuccess(`Successfully published "${title}"!`);
      
      // Reset Form
      setTitle('');
      setCategory('Wedding');
      setLocation('');
      setDate('');
      setDesc('');
      setHeroImage(null);
      setGallery([]);
      
      // Clear file inputs
      const heroInput = document.getElementById('heroImageInput');
      const galleryInput = document.getElementById('galleryInput');
      if (heroInput) heroInput.value = '';
      if (galleryInput) galleryInput.value = '';

      // Refresh Shoots list
      fetchShoots();
      
      // Navigate back to list tab
      setTimeout(() => {
        setActiveTab('list');
        setSuccess('');
      }, 2000);

    } catch (err) {
      setError(err.message || 'Failed to submit shoot.');
    } finally {
      setUploading(false);
      setUploadProgress('');
    }
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess(''); setUploading(true);
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${API_URL}/admin/blogs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: blogTitle,
          content: blogContent,
          coverImageUrl: blogCover,
          tags: [blogCategory],
          isPublished: true
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to publish blog');
      setSuccess(`Successfully published "${blogTitle}"!`);
      setBlogTitle(''); setBlogContent('');
      fetchBlogs();
      setTimeout(() => { setActiveTab('blogs-list'); setSuccess(''); }, 2000);
    } catch (err) {
      setError(err.message || 'Failed to submit blog.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar / Topbar Header */}
      <header className="dashboard-header">
        <div className="header-branding">
          <span className="subtitle-accent">PORTFOLIO & BLOG CONSOLE</span>
          <h2 className="header-title">Studio <i>Admin</i> Console</h2>
        </div>
        <div className="header-actions">
          <span className="admin-badge">{localStorage.getItem('adminEmail')}</span>
          <button onClick={handleLogout} className="btn-logout">Sign Out</button>
        </div>
      </header>

      {/* Primary Notifications */}
      {success && <div className="dash-alert success">{success}</div>}
      {error && <div className="dash-alert error">{error}</div>}

      <main className="dashboard-main container">
        {/* Navigation Tabs */}
        <div className="dash-tabs">
          <button 
            className={`dash-tab-btn ${activeTab === 'list' ? 'active' : ''}`}
            onClick={() => setActiveTab('list')}
            disabled={uploading}
          >
            Archives List ({shoots.length})
          </button>
          <button 
            className={`dash-tab-btn ${activeTab === 'create' ? 'active' : ''}`}
            onClick={() => setActiveTab('create')}
            disabled={uploading}
          >
            Publish New Story
          </button>
          <button 
            className={`dash-tab-btn ${activeTab === 'blogs-list' ? 'active' : ''}`}
            onClick={() => { setActiveTab('blogs-list'); fetchBlogs(); }}
            disabled={uploading}
          >
            Blog Articles ({blogs.length})
          </button>
          <button 
            className={`dash-tab-btn ${activeTab === 'create-blog' ? 'active' : ''}`}
            onClick={() => setActiveTab('create-blog')}
            disabled={uploading}
          >
            Write Blog Post
          </button>
        </div>

        {/* Tab content 1: Shoots List */}
        {activeTab === 'list' && (
          <div className="tab-content list-tab">
            {loadingList ? (
              <div className="dash-loader">Retrieving archives...</div>
            ) : shoots.length === 0 ? (
              <div className="dash-empty-state">
                <p>No shoots found in database. Create your first portfolio story!</p>
                <button onClick={() => setActiveTab('create')} className="btn-premium-action">Publish First Story</button>
              </div>
            ) : (
              <div className="admin-shoots-grid">
                {shoots.map((shoot) => (
                  <div key={shoot._id} className="admin-shoot-card">
                    <div className="card-thumbnail-wrapper">
                      <img src={shoot.heroImage} alt={shoot.title} />
                      <span className="card-cat-badge">{shoot.category}</span>
                    </div>
                    <div className="card-details">
                      <h4 className="card-title-new">{shoot.title}</h4>
                      <p className="card-meta-faint">{shoot.location} // {shoot.date}</p>
                      <p className="card-gallery-count">{shoot.gallery?.length || 0} gallery photos</p>
                      <div className="card-actions-framer">
                        <a href={`/shoot/${shoot.slug}`} target="_blank" rel="noreferrer" className="btn-preview-link">
                          View Live ↗
                        </a>
                        <button 
                          onClick={() => handleDelete(shoot._id, shoot.title)}
                          className="btn-delete-card"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab content 2: Create Form */}
        {activeTab === 'create' && (
          <div className="tab-content form-tab">
            <form onSubmit={handleSubmit} className="admin-chic-form">
              <div className="form-double-column">
                <div className="input-group-chic">
                  <label htmlFor="shootTitle">Couple Names (Title)</label>
                  <input
                    type="text"
                    id="shootTitle"
                    required
                    placeholder="e.g., Naveen & Swetha"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={uploading}
                  />
                </div>
                
                <div className="input-group-chic">
                  <label htmlFor="shootCategory">Category</label>
                  <select
                    id="shootCategory"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    disabled={uploading}
                    className="select-chic"
                  >
                    <option value="Wedding">Wedding</option>
                    <option value="Pre-wedding">Pre-wedding</option>
                    <option value="Candid">Candid</option>
                    <option value="Cinematic Film">Cinematic Film</option>
                  </select>
                </div>
              </div>

              <div className="form-double-column">
                <div className="input-group-chic">
                  <label htmlFor="shootLocation">Location</label>
                  <input
                    type="text"
                    id="shootLocation"
                    required
                    placeholder="e.g., Hyderabad"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    disabled={uploading}
                  />
                </div>

                <div className="input-group-chic">
                  <label htmlFor="shootDate">Date</label>
                  <input
                    type="text"
                    id="shootDate"
                    required
                    placeholder="e.g., Jan 2026"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    disabled={uploading}
                  />
                </div>
              </div>

              <div className="input-group-chic">
                <label htmlFor="shootDesc">The Narrative Story</label>
                <textarea
                  id="shootDesc"
                  required
                  rows="5"
                  placeholder="Tell the beautiful story of this capture..."
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  disabled={uploading}
                />
              </div>

              {/* Uploads row */}
              <div className="form-double-column">
                <div className="input-group-chic upload-box-chic">
                  <label htmlFor="heroImageInput">Hero Cover Image (Card Thumbnail)</label>
                  <div className="file-input-wrapper">
                    <input
                      type="file"
                      id="heroImageInput"
                      accept="image/*"
                      onChange={handleHeroChange}
                      disabled={uploading}
                    />
                    <div className="custom-file-label">
                      {heroImage ? `Selected: ${heroImage.name}` : 'Choose Cover Photo'}
                    </div>
                  </div>
                </div>

                <div className="input-group-chic upload-box-chic">
                  <label htmlFor="galleryInput">Gallery Photos (Collage Collection)</label>
                  <div className="file-input-wrapper">
                    <input
                      type="file"
                      id="galleryInput"
                      accept="image/*"
                      multiple
                      onChange={handleGalleryChange}
                      disabled={uploading}
                    />
                    <div className="custom-file-label">
                      {gallery.length > 0 ? `Selected: ${gallery.length} files` : 'Choose Gallery Photos'}
                    </div>
                  </div>
                </div>
              </div>

              {uploading && (
                <div className="upload-progress-card">
                  <div className="progress-spinner"></div>
                  <p className="progress-text">{uploadProgress}</p>
                </div>
              )}

              <button type="submit" className="btn-premium-submit" disabled={uploading}>
                {uploading ? 'Processing & Uploading...' : 'Publish Story Archive'}
              </button>
            </form>
          </div>
        )}

        {/* Tab content 3: Blogs List */}
        {activeTab === 'blogs-list' && (
          <div className="tab-content list-tab">
            {loadingBlogs ? (
              <div className="dash-loader">Retrieving blog articles...</div>
            ) : blogs.length === 0 ? (
              <div className="dash-empty-state">
                <p>No blog articles published yet. Write your first behind-the-scenes piece!</p>
                <button onClick={() => setActiveTab('create-blog')} className="btn-premium-action">Write First Blog</button>
              </div>
            ) : (
              <div className="admin-shoots-grid">
                {blogs.map((blog) => (
                  <div key={blog._id} className="admin-shoot-card">
                    <div className="card-thumbnail-wrapper">
                      <img src={blog.coverImageUrl || "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/_DSC3521_-_Copy.webp"} alt={blog.title} />
                      <span className="card-cat-badge">{blog.tags?.[0] || 'ARTISTRY'}</span>
                    </div>
                    <div className="card-details">
                      <h4 className="card-title-new">{blog.title}</h4>
                      <p className="card-meta-faint">{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                      <div className="card-actions-framer">
                        <a href="/blog" target="_blank" rel="noreferrer" className="btn-preview-link">
                          View Live ↗
                        </a>
                        <button 
                          onClick={() => handleDeleteBlog(blog._id, blog.title)}
                          className="btn-delete-card"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab content 4: Create Blog */}
        {activeTab === 'create-blog' && (
          <div className="tab-content form-tab">
            <form onSubmit={handleBlogSubmit} className="admin-chic-form">
              <div className="form-double-column">
                <div className="input-group-chic">
                  <label htmlFor="blogTitle">Article Title</label>
                  <input
                    type="text"
                    id="blogTitle"
                    required
                    placeholder="e.g., Finding the Light in Candid Moments"
                    value={blogTitle}
                    onChange={(e) => setBlogTitle(e.target.value)}
                    disabled={uploading}
                  />
                </div>
                
                <div className="input-group-chic">
                  <label htmlFor="blogCategory">Tag / Category</label>
                  <select
                    id="blogCategory"
                    value={blogCategory}
                    onChange={(e) => setBlogCategory(e.target.value)}
                    disabled={uploading}
                    className="select-chic"
                  >
                    <option value="ARTISTRY">ARTISTRY</option>
                    <option value="GUIDE">GUIDE</option>
                    <option value="INSPIRATION">INSPIRATION</option>
                    <option value="DESTINATIONS">DESTINATIONS</option>
                  </select>
                </div>
              </div>

              <div className="input-group-chic">
                <label htmlFor="blogCover">Cover Image WebP URL</label>
                <input
                  type="text"
                  id="blogCover"
                  required
                  placeholder="https://pub-...r2.dev/..."
                  value={blogCover}
                  onChange={(e) => setBlogCover(e.target.value)}
                  disabled={uploading}
                />
              </div>

              <div className="input-group-chic">
                <label htmlFor="blogContent">Article Content (Paragraphs)</label>
                <textarea
                  id="blogContent"
                  required
                  rows="8"
                  placeholder="Write your article content here. Separate paragraphs with a blank line (double newline)..."
                  value={blogContent}
                  onChange={(e) => setBlogContent(e.target.value)}
                  disabled={uploading}
                />
              </div>

              {uploading && (
                <div className="upload-progress-card">
                  <div className="progress-spinner"></div>
                  <p className="progress-text">Publishing article...</p>
                </div>
              )}

              <button type="submit" className="btn-premium-submit" disabled={uploading}>
                {uploading ? 'Publishing...' : 'Publish Blog Article'}
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
