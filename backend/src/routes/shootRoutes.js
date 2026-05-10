const { Router } = require('express');
const multer = require('multer');
const adminAuth = require('../middlewares/adminAuth');
const {
  getAllShoots,
  getShootByIdOrSlug,
  createShoot,
  deleteShoot,
} = require('../controllers/shootController');

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
});

const uploadFields = upload.fields([
  { name: 'heroImage', maxCount: 1 },
  { name: 'gallery', maxCount: 30 }, // allow up to 30 photos in gallery
]);

// Public endpoints
router.get('/', getAllShoots);
router.get('/:idOrSlug', getShootByIdOrSlug);

// Admin protected endpoints
router.post('/', adminAuth, (req, res, next) => {
  uploadFields(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ success: false, message: `Upload error: ${err.message}` });
    }
    if (err) return next(err);
    next();
  });
}, createShoot);

router.delete('/:id', adminAuth, deleteShoot);

module.exports = router;
