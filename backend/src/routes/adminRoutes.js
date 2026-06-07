const { Router } = require('express');
const adminAuth = require('../middlewares/adminAuth');
const { getAllBlogs, createBlog, updateBlog, deleteBlog } = require('../controllers/blogController');
const { createTestimonial, updateTestimonial, deleteTestimonial } = require('../controllers/testimonialController');

const router = Router();

router.use(adminAuth);

router.get('/blogs', getAllBlogs);
router.post('/blogs', createBlog);
router.put('/blogs/:id', updateBlog);
router.delete('/blogs/:id', deleteBlog);

// Testimonials management
router.post('/testimonials', createTestimonial);
router.put('/testimonials/:id', updateTestimonial);
router.delete('/testimonials/:id', deleteTestimonial);

module.exports = router;
