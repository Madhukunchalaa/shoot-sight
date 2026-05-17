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

  // Gallery Edit State
  const [editingShoot, setEditingShoot] = useState(null); // shoot being edited
  const [editingBlog, setEditingBlog] = useState(null);   // blog being edited
  const [editUploading, setEditUploading] = useState(false);
  const [editMsg, setEditMsg] = useState('');

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
    // 5 second timeout — if MongoDB is offline, fail silently
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    try {
      const res = await fetch(`${API_URL}/admin/blogs`, {
        headers: { 'Authorization': `Bearer ${token}` },
        signal: controller.signal
      });
      clearTimeout(timeout);
      const data = await res.json();
      if (res.ok) {
        setBlogs(data.blogs || []);
      }
      // Blog fetch failure is silent — doesn't block the shoot upload
    } catch (err) {
      clearTimeout(timeout);
      // Silently handle — blogs are optional, don't block the admin panel
      setBlogs([]);
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

  // ── Gallery Edit Handlers ────────────────────────────────────────────────
  const openEditPanel = (shoot) => {
    setEditingShoot({ ...shoot, gallery: [...(shoot.gallery || [])] });
    setEditMsg('');
  };

  const handleAddGalleryImages = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setEditUploading(true);
    setEditMsg('Uploading new images...');
    const token = localStorage.getItem('adminToken');
    const fd = new FormData();
    files.forEach(f => fd.append('gallery', f));
    try {
      const res = await fetch(`${API_URL}/shoots/${editingShoot._id}/gallery`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` },
        body: fd,
      });
      const data = await res.json();
      if (res.ok) {
        setEditingShoot(prev => ({ ...prev, gallery: data.gallery }));
        setShoots(prev => prev.map(s => s._id === editingShoot._id ? { ...s, gallery: data.gallery } : s));
        setEditMsg(`✅ ${files.length} image(s) added successfully!`);
      } else {
        setEditMsg(`❌ ${data.message || 'Upload failed'}`);
      }
    } catch { setEditMsg('❌ Connection error'); }
    finally { setEditUploading(false); e.target.value = ''; }
  };

  const handleRemoveGalleryImage = async (imageUrl) => {
    if (!window.confirm('Remove this image from the gallery?')) return;
    setEditUploading(true);
    setEditMsg('Removing image...');
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${API_URL}/shoots/${editingShoot._id}/gallery`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl }),
      });
      const data = await res.json();
      if (res.ok) {
        setEditingShoot(prev => ({ ...prev, gallery: data.gallery }));
        setShoots(prev => prev.map(s => s._id === editingShoot._id ? { ...s, gallery: data.gallery } : s));
        setEditMsg('✅ Image removed.');
      } else {
        setEditMsg(`❌ ${data.message || 'Remove failed'}`);
      }
    } catch { setEditMsg('❌ Connection error'); }
    finally { setEditUploading(false); }
  };

  const handleChangeHero = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setEditUploading(true);
    setEditMsg('Updating cover image...');
    const token = localStorage.getItem('adminToken');
    const fd = new FormData();
    fd.append('heroImage', file);
    try {
      const res = await fetch(`${API_URL}/shoots/${editingShoot._id}/hero`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` },
        body: fd,
      });
      const data = await res.json();
      if (res.ok) {
        setEditingShoot(prev => ({ ...prev, heroImage: data.heroImage }));
        setShoots(prev => prev.map(s => s._id === editingShoot._id ? { ...s, heroImage: data.heroImage } : s));
        setEditMsg('✅ Cover image updated!');
      } else {
        setEditMsg(`❌ ${data.message || 'Update failed'}`);
      }
    } catch { setEditMsg('❌ Connection error'); }
    finally { setEditUploading(false); e.target.value = ''; }
  };

  // ── Blog Cover Upload & Edit Handlers ────────────────────────────────────
  const handleBlogCoverUpload = async (e, isEdit = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (isEdit) {
      setEditUploading(true);
      setEditMsg('Uploading cover image...');
    } else {
      setUploading(true);
      setUploadProgress('Uploading blog cover image...');
    }

    const token = localStorage.getItem('adminToken');
    const fd = new FormData();
    fd.append('image', file);

    try {
      const res = await fetch(`${API_URL}/images/upload`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: fd
      });
      const data = await res.json();
      if (res.ok && data.url) {
        if (isEdit) {
          setEditingBlog(prev => ({ ...prev, coverImageUrl: data.url }));
          setEditMsg('✅ Cover image uploaded!');
        } else {
          setBlogCover(data.url);
          setSuccess('✅ Cover image uploaded!');
          setTimeout(() => setSuccess(''), 3000);
        }
      } else {
        const errMsg = data.message || 'Upload failed';
        if (isEdit) setEditMsg(`❌ ${errMsg}`);
        else setError(errMsg);
      }
    } catch {
      if (isEdit) setEditMsg('❌ Connection error');
      else setError('Connection error');
    } finally {
      if (isEdit) setEditUploading(false);
      else {
        setUploading(false);
        setUploadProgress('');
      }
      e.target.value = '';
    }
  };

  const openEditBlogPanel = (blog) => {
    if (!blog) {
      setEditingBlog(null);
      return;
    }
    setEditingBlog({ ...blog });
    setEditMsg('');
  };

  const handleEditBlogSubmit = async (e) => {
    e.preventDefault();
    setEditUploading(true);
    setEditMsg('Updating blog post...');
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${API_URL}/admin/blogs/${editingBlog._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: editingBlog.title,
          content: editingBlog.content,
          coverImageUrl: editingBlog.coverImageUrl,
          tags: editingBlog.tags,
          isPublished: editingBlog.isPublished ?? true
        })
      });
      const data = await res.json();
      if (res.ok) {
        setBlogs(prev => prev.map(b => b._id === editingBlog._id ? data.blog : b));
        setEditingBlog(null);
        setSuccess('✅ Blog article updated successfully!');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setEditMsg(`❌ ${data.message || 'Update failed'}`);
      }
    } catch {
      setEditMsg('❌ Connection error');
    } finally {
      setEditUploading(false);
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
      setUploadProgress('Crafting your story archive — optimising images for the web...');
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
                      <img src={editingShoot?._id === shoot._id ? editingShoot.heroImage : shoot.heroImage} alt={shoot.title} />
                      <span className="card-cat-badge">{shoot.category}</span>
                    </div>
                    <div className="card-details">
                      <h4 className="card-title-new">{shoot.title}</h4>
                      <p className="card-meta-faint">{shoot.location} // {shoot.date}</p>
                      <p className="card-gallery-count">
                        {(editingShoot?._id === shoot._id ? editingShoot.gallery : shoot.gallery)?.length || 0} gallery photos
                      </p>
                      <div className="card-actions-framer">
                        <a href={`/shoot/${shoot.slug}`} target="_blank" rel="noreferrer" className="btn-preview-link">View Live ↗</a>
                        <button onClick={() => openEditPanel(shoot)} className="btn-edit-gallery">
                          Edit Gallery
                        </button>
                        <button onClick={() => handleDelete(shoot._id, shoot.title)} className="btn-delete-card">Delete</button>
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
                      <img src={(editingBlog?._id === blog._id ? editingBlog.coverImageUrl : blog.coverImageUrl) || "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/_DSC3521_-_Copy.webp"} alt={blog.title} />
                      <span className="card-cat-badge">{(editingBlog?._id === blog._id ? editingBlog.tags?.[0] : blog.tags?.[0]) || 'ARTISTRY'}</span>
                    </div>
                    <div className="card-details">
                      <h4 className="card-title-new">{blog.title}</h4>
                      <p className="card-meta-faint">
                        {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        {!blog.isPublished && <span className="draft-badge"> (DRAFT)</span>}
                      </p>
                      <div className="card-actions-framer">
                        <a href="/blog" target="_blank" rel="noreferrer" className="btn-preview-link">
                          View Live ↗
                        </a>
                        <button onClick={() => openEditBlogPanel(blog)} className="btn-edit-gallery">
                          Edit Article
                        </button>
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

              <div className="input-group-chic upload-box-chic">
                <label htmlFor="blogCoverInput">Cover Image (R2 Optimized)</label>
                <div className="file-input-wrapper">
                  <input
                    type="file"
                    id="blogCoverInput"
                    accept="image/*"
                    onChange={(e) => handleBlogCoverUpload(e, false)}
                    disabled={uploading}
                  />
                  <div className="custom-file-label">
                    {blogCover ? '✅ Cover Image Uploaded (Click to Change)' : 'Choose Cover Photo'}
                  </div>
                </div>
                {blogCover && (
                  <div className="hero-preview-row" style={{ marginTop: '15px' }}>
                    <img src={blogCover} alt="blog cover preview" className="hero-thumb-edit" />
                  </div>
                )}
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

      {/* ── SPACIOUS FULL-SCREEN PORTFOLIO EDIT MODAL ── */}
      {editingShoot && (
        <div className="premium-edit-modal-overlay" onClick={() => setEditingShoot(null)}>
          <div className="premium-edit-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setEditingShoot(null)}>✕</button>
            
            <div className="edit-panel-header" style={{ marginBottom: '10px' }}>
              <span style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#c9b57f' }}>Manage Client Shoot</span>
              {editMsg && <span className={`edit-msg ${editMsg.startsWith('✅') ? 'ok' : 'err'}`}>{editMsg}</span>}
            </div>
            
            <h2 className="modal-title-editorial">
              Editing: <i>{editingShoot.title}</i>
            </h2>

            <div className="modal-body-scrollable" data-lenis-prevent>
              {/* Cover Photo */}
              <div className="edit-section" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '25px', marginBottom: '25px' }}>
                <div className="edit-section-label">Cover / Hero Image</div>
                <div className="hero-preview-row">
                  <img src={editingShoot.heroImage} alt="cover" className="hero-thumb-edit" style={{ width: '160px', height: '100px', borderRadius: '4px' }} />
                  <div>
                    <p style={{ fontSize: '0.8rem', color: '#a0a0a0', marginBottom: '12px', lineHeight: '1.4' }}>
                      This represents the face of this shoot archive. Upload a new landscape/portrait image to change it.
                    </p>
                    <label className={`btn-edit-upload ${editUploading ? 'disabled' : ''}`}>
                      {editUploading ? 'Uploading WebP...' : '⬆ Upload New Cover'}
                      <input type="file" accept="image/*" hidden onChange={handleChangeHero} disabled={editUploading} />
                    </label>
                  </div>
                </div>
              </div>

              {/* Gallery Grid */}
              <div className="edit-section">
                <div className="edit-section-label" style={{ marginBottom: '10px' }}>
                  Gallery Collage Collection ({editingShoot.gallery?.length || 0} images)
                </div>
                <p style={{ fontSize: '0.8rem', color: '#a0a0a0', marginBottom: '20px', lineHeight: '1.4' }}>
                  These images populate the scrollable narrative collection. Click the red ✕ button on any image to permanently delete it, or click "Add Photos" to upload multiple new images.
                </p>
                
                <div className="gallery-edit-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '15px' }}>
                  {(editingShoot.gallery || []).map((url, idx) => (
                    <div key={idx} className="gallery-edit-thumb" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                      <img src={url} alt={`gallery-${idx}`} />
                      <button
                        className="gallery-remove-btn"
                        onClick={() => handleRemoveGalleryImage(url)}
                        disabled={editUploading}
                        title="Remove Image"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  {/* Add More Card */}
                  <label className={`gallery-add-btn ${editUploading ? 'disabled' : ''}`} style={{ minHeight: '130px' }}>
                    <span>＋</span>
                    <small>Add Photos</small>
                    <input type="file" accept="image/*" multiple hidden onChange={handleAddGalleryImages} disabled={editUploading} />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── SPACIOUS FULL-SCREEN BLOG EDIT MODAL ── */}
      {editingBlog && (
        <div className="premium-edit-modal-overlay" onClick={() => setEditingBlog(null)}>
          <div className="premium-edit-modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '800px' }}>
            <button className="modal-close-btn" onClick={() => setEditingBlog(null)}>✕</button>
            
            <div className="edit-panel-header" style={{ marginBottom: '10px' }}>
              <span style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#c9b57f' }}>Edit Blog Post</span>
              {editMsg && <span className={`edit-msg ${editMsg.startsWith('✅') ? 'ok' : 'err'}`}>{editMsg}</span>}
            </div>

            <h2 className="modal-title-editorial">
              Editing: <i>{editingBlog.title}</i>
            </h2>

            <form onSubmit={handleEditBlogSubmit} className="modal-body-scrollable" data-lenis-prevent>
              {/* Title */}
              <div className="edit-section">
                <label className="edit-section-label">Article Title</label>
                <input
                  type="text"
                  required
                  className="input-chic"
                  value={editingBlog.title}
                  onChange={(e) => setEditingBlog(prev => ({ ...prev, title: e.target.value }))}
                  disabled={editUploading}
                />
              </div>

              {/* Category & Status */}
              <div className="form-double-column edit-section" style={{ gap: '20px' }}>
                <div>
                  <label className="edit-section-label">Tag / Category</label>
                  <select
                    value={editingBlog.tags?.[0] || 'ARTISTRY'}
                    onChange={(e) => setEditingBlog(prev => ({ ...prev, tags: [e.target.value] }))}
                    className="select-chic"
                    style={{ width: '100%', padding: '14px', background: '#0e0e0e', border: '1px solid rgba(255,255,255,0.1)' }}
                    disabled={editUploading}
                  >
                    <option value="ARTISTRY">ARTISTRY</option>
                    <option value="GUIDE">GUIDE</option>
                    <option value="INSPIRATION">INSPIRATION</option>
                    <option value="DESTINATIONS">DESTINATIONS</option>
                  </select>
                </div>
                <div>
                  <label className="edit-section-label">Status</label>
                  <select
                    value={editingBlog.isPublished ? 'Published' : 'Draft'}
                    onChange={(e) => setEditingBlog(prev => ({ ...prev, isPublished: e.target.value === 'Published' }))}
                    className="select-chic"
                    style={{ width: '100%', padding: '14px', background: '#0e0e0e', border: '1px solid rgba(255,255,255,0.1)' }}
                    disabled={editUploading}
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              {/* Cover Image */}
              <div className="edit-section" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '25px', marginBottom: '25px' }}>
                <label className="edit-section-label">Cover Image</label>
                <div className="hero-preview-row">
                  <img src={editingBlog.coverImageUrl || "https://pub-53f55a87e6f64c51862dbd0fa933eee1.r2.dev/common/_DSC3521_-_Copy.webp"} alt="cover" className="hero-thumb-edit" style={{ width: '160px', height: '100px', borderRadius: '4px' }} />
                  <div>
                    <p style={{ fontSize: '0.8rem', color: '#a0a0a0', marginBottom: '12px' }}>
                      Choose an image from your computer to update this article's primary cover.
                    </p>
                    <label className={`btn-edit-upload ${editUploading ? 'disabled' : ''}`}>
                      {editUploading ? 'Uploading WebP...' : '⬆ Upload New Cover'}
                      <input type="file" accept="image/*" hidden onChange={(e) => handleBlogCoverUpload(e, true)} disabled={editUploading} />
                    </label>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="edit-section">
                <label className="edit-section-label">Content (Separate paragraphs with a blank line)</label>
                <textarea
                  required
                  rows="10"
                  className="textarea-chic"
                  value={editingBlog.content}
                  onChange={(e) => setEditingBlog(prev => ({ ...prev, content: e.target.value }))}
                  disabled={editUploading}
                />
              </div>

              <button type="submit" className="btn-premium-submit" style={{ width: '100%', padding: '16px', background: '#ffeaa7', color: '#111' }} disabled={editUploading}>
                {editUploading ? 'Saving changes...' : 'Save Blog Post Changes'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
