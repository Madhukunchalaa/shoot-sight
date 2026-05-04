const { Router } = require('express');
const adminAuth = require('../middlewares/adminAuth');
const { getAllBlogs, createBlog, updateBlog, deleteBlog } = require('../controllers/blogController');

const router = Router();

router.use(adminAuth);

router.get('/blogs', getAllBlogs);
router.post('/blogs', createBlog);
router.put('/blogs/:id', updateBlog);
router.delete('/blogs/:id', deleteBlog);

module.exports = router;
