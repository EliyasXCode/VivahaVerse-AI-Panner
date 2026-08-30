const express = require('express');
const router = express.Router();
const { 
  generateWeddingPlan, 
  chatConcierge, 
  getBudgetAdvice, 
  generateWeddingImage, 
  getWeddingMoodboard 
} = require('../controllers/aiController');

router.post('/wedding-plan', generateWeddingPlan);
router.post('/chat', chatConcierge);
router.post('/recommend-destination', generateWeddingPlan);
router.post('/budget-advice', getBudgetAdvice);
router.post('/generate-wedding-image', generateWeddingImage);
router.post('/moodboard', getWeddingMoodboard);

module.exports = router;
