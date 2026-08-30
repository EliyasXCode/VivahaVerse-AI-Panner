const express = require('express');
const router = express.Router();
const { getVenues, getVenueBySlug, compareVenues } = require('../controllers/venueController');

router.get('/', getVenues);
router.post('/compare', compareVenues);
router.get('/:slug', getVenueBySlug);

module.exports = router;
