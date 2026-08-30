const Destination = require('../models/Destination');
const Venue = require('../models/Venue');
const Inquiry = require('../models/Inquiry');
const InspirationStory = require('../models/InspirationStory');
const User = require('../models/User');

// GET /api/admin/stats
exports.getAdminStats = async (req, res) => {
  try {
    const totalDestinations = await Destination.countDocuments();
    const totalVenues = await Venue.countDocuments();
    const totalInquiries = await Inquiry.countDocuments();
    const totalUsers = await User.countDocuments();
    const recentInquiries = await Inquiry.find().sort({ createdAt: -1 }).limit(5);

    res.status(200).json({
      success: true,
      stats: {
        totalDestinations,
        totalVenues,
        totalInquiries,
        totalUsers
      },
      recentInquiries
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/admin/users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: users.length, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Destination CRUD
exports.createDestination = async (req, res) => {
  try {
    const destination = await Destination.create(req.body);
    res.status(201).json({ success: true, destination });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateDestination = async (req, res) => {
  try {
    const destination = await Destination.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, destination });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteDestination = async (req, res) => {
  try {
    await Destination.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Destination removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Venue CRUD
exports.createVenue = async (req, res) => {
  try {
    const venue = await Venue.create(req.body);
    res.status(201).json({ success: true, venue });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateVenue = async (req, res) => {
  try {
    const venue = await Venue.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, venue });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteVenue = async (req, res) => {
  try {
    await Venue.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Venue removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/admin/stories
exports.getInspirationStories = async (req, res) => {
  try {
    const stories = await InspirationStory.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: stories.length, stories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/admin/stories
exports.createInspirationStory = async (req, res) => {
  try {
    const story = await InspirationStory.create(req.body);
    res.status(201).json({ success: true, story });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
