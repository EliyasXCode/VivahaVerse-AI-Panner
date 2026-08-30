const express = require('express');
const router = express.Router();
const { 
  getDestinations, 
  getFeaturedDestinations, 
  getDestinationBySlug, 
  toggleFavorite 
} = require('../controllers/destinationController');
const { protect } = require('../middleware/auth');

router.get('/', getDestinations);
router.get('/featured', getFeaturedDestinations);
router.get('/:slug', getDestinationBySlug);
router.post('/favorite/:destinationId', protect, toggleFavorite);

module.exports = router;
