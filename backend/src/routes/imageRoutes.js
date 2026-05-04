const { Router } = require('express');
const multer = require('multer');
const { uploadImage } = require('../controllers/imageController');

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB hard limit at multer level
});

router.post('/upload', upload.single('image'), uploadImage);

module.exports = router;
