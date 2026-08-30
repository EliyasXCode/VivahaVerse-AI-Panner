const WeddingPlan = require('../models/WeddingPlan');
const User = require('../models/User');

// POST /api/plans
exports.saveWeddingPlan = async (req, res) => {
  try {
    const planData = req.body;
    const plan = await WeddingPlan.create({
      user: req.user ? req.user.id : null,
      ...planData
    });

    if (req.user) {
      await User.findByIdAndUpdate(req.user.id, { $push: { savedPlans: plan._id } });
    }

    res.status(201).json({ success: true, plan });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/plans
exports.getUserPlans = async (req, res) => {
  try {
    const plans = await WeddingPlan.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, plans });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/plans/:id
exports.getPlanById = async (req, res) => {
  try {
    const plan = await WeddingPlan.findById(req.params.id);
    if (!plan) return res.status(404).json({ success: false, message: 'Plan not found' });
    res.status(200).json({ success: true, plan });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/plans/:id
exports.deletePlan = async (req, res) => {
  try {
    await WeddingPlan.findByIdAndDelete(req.params.id);
    if (req.user) {
      await User.findByIdAndUpdate(req.user.id, { $pull: { savedPlans: req.params.id } });
    }
    res.status(200).json({ success: true, message: 'Plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
