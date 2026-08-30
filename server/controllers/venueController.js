const Venue = require('../models/Venue');
const Destination = require('../models/Destination');
const { SEED_VENUES } = require('../seed/seedData');
const { chatConciergeAI } = require('../services/gemini.service');

// GET /api/venues
exports.getVenues = async (req, res) => {
  try {
    const { destination, style, tier, search } = req.query;
    let query = {};

    if (destination && destination !== 'All') {
      query.destinationName = { $regex: destination, $options: 'i' };
    }
    if (style && style !== 'All') {
      query.venueStyle = { $regex: style, $options: 'i' };
    }
    if (tier && tier !== 'All') {
      query.priceTier = tier;
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { destinationName: { $regex: search, $options: 'i' } }
      ];
    }

    let venues = [];
    try {
      venues = await Venue.find(query).populate('destination');
    } catch (e) {}

    if (!venues || venues.length === 0) {
      venues = SEED_VENUES.filter(v => {
        if (destination && destination !== 'All' && !v.destinationName.toLowerCase().includes(destination.toLowerCase())) return false;
        if (tier && tier !== 'All' && v.priceTier !== tier) return false;
        return true;
      });
    }

    res.status(200).json({ success: true, count: venues.length, venues });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/venues/:slug
exports.getVenueBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    let venue = null;
    try {
      venue = await Venue.findOne({ slug: slug.toLowerCase() }).populate('destination');
    } catch (e) {}

    if (!venue) {
      venue = SEED_VENUES.find(v => v.slug === slug.toLowerCase() || v.name.toLowerCase().includes(slug.toLowerCase()));
    }

    if (!venue) {
      return res.status(404).json({ success: false, message: 'Venue not found' });
    }

    res.status(200).json({ success: true, venue });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/venues/compare
exports.compareVenues = async (req, res) => {
  try {
    const { venueIds } = req.body;
    if (!venueIds || !Array.isArray(venueIds) || venueIds.length === 0) {
      return res.status(400).json({ success: false, message: 'Please provide venue IDs to compare' });
    }

    let selectedVenues = [];
    try {
      selectedVenues = await Venue.find({ _id: { $in: venueIds } }).populate('destination');
    } catch (e) {}

    if (selectedVenues.length === 0) {
      // Fallback matching slug or ID string from seed
      selectedVenues = SEED_VENUES.filter(v => venueIds.includes(v._id) || venueIds.includes(v.slug));
    }

    // AI comparison prompt
    let aiRecommendation = null;
    if (selectedVenues.length > 0) {
      const summaryText = selectedVenues.map(v => `${v.name} (${v.destinationName}) - Max Capacity: ${v.capacityMax}, Rooms: ${v.roomCount}, Tier: ${v.priceTier}`).join(' vs ');
      const aiRes = await chatConciergeAI(`Compare these venues for me and tell me which is best for a luxury 150-guest wedding: ${summaryText}`, [], []);
      aiRecommendation = aiRes.reply;
    }

    res.status(200).json({
      success: true,
      venues: selectedVenues,
      aiRecommendation
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
