const express = require('express');
const router = express.Router();
const { saveWeddingPlan, getUserPlans, getPlanById, deletePlan } = require('../controllers/planController');
const { protect } = require('../middleware/auth');

router.post('/', saveWeddingPlan);
router.get('/', protect, getUserPlans);
router.get('/:id', getPlanById);
router.delete('/:id', protect, deletePlan);

module.exports = router;
