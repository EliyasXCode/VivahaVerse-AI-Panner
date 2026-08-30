const express = require('express');
const router = express.Router();
const { 
  getAdminStats, 
  getUsers,
  createDestination, 
  updateDestination, 
  deleteDestination,
  createVenue,
  updateVenue,
  deleteVenue,
  getInspirationStories,
  createInspirationStory
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/auth');

router.use(protect, admin);

router.get('/stats', getAdminStats);
router.get('/users', getUsers);

router.post('/destinations', createDestination);
router.put('/destinations/:id', updateDestination);
router.delete('/destinations/:id', deleteDestination);

router.post('/venues', createVenue);
router.put('/venues/:id', updateVenue);
router.delete('/venues/:id', deleteVenue);

router.get('/stories', getInspirationStories);
router.post('/stories', createInspirationStory);

module.exports = router;
