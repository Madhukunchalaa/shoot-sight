const { Router } = require('express');
const imageRoutes = require('./imageRoutes');

const router = Router();

router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

router.use('/images', imageRoutes);

module.exports = router;
