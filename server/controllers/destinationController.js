const Destination = require('../models/Destination');
const User = require('../models/User');
const { SEED_DESTINATIONS } = require('../seed/seedData');

// GET /api/destinations
exports.getDestinations = async (req, res) => {
  try {
    const {
      search,
      region,
      style,
      month,
      climate,
      minBudget,
      maxBudget,
      guestCount,
      sort,
      featured
    } = req.query;

    let query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { state: { $regex: search, $options: 'i' } },
        { region: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tagline: { $regex: search, $options: 'i' } }
      ];
    }

    if (region && region !== 'All') {
      query.region = region;
    }

    if (style && style !== 'All') {
      query.weddingStyles = style;
    }

    if (climate && climate !== 'All') {
      query.climate = climate;
    }

    if (month && month !== 'All') {
      query.$or = [
        { bestMonths: { $regex: month, $options: 'i' } },
        { bestMonthsList: month }
      ];
    }

    if (featured === 'true') {
      query.featured = true;
    }

    if (minBudget || maxBudget) {
      query['budgetRange.min'] = { $lte: Number(maxBudget) || 200 };
      query['budgetRange.max'] = { $gte: Number(minBudget) || 0 };
    }

    if (guestCount) {
      const guests = Number(guestCount);
      query.idealGuestMin = { $lte: guests };
      query.idealGuestMax = { $gte: guests };
    }

    let sortOptions = { featured: -1, createdAt: -1 };
    if (sort === 'budget-asc') {
      sortOptions = { 'budgetRange.min': 1 };
    } else if (sort === 'budget-desc') {
      sortOptions = { 'budgetRange.max': -1 };
    } else if (sort === 'name') {
      sortOptions = { name: 1 };
    } else if (sort === 'capacity') {
      sortOptions = { idealGuestMax: -1 };
    }

    let destinations = [];
    try {
      destinations = await Destination.find(query).sort(sortOptions);
    } catch (e) {
      console.warn('[Destinations DB Notice] Using local memory collection');
    }

    // Fallback to memory seed data if DB collection empty or offline
    if (!destinations || destinations.length === 0) {
      destinations = SEED_DESTINATIONS.filter(d => {
        if (region && region !== 'All' && d.region !== region) return false;
        if (style && style !== 'All' && !d.weddingStyles.includes(style)) return false;
        if (search && !d.name.toLowerCase().includes(search.toLowerCase()) && !d.state.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
      });
    }

    res.status(200).json({
      success: true,
      count: destinations.length,
      destinations
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/destinations/featured
exports.getFeaturedDestinations = async (req, res) => {
  try {
    let destinations = [];
    try {
      destinations = await Destination.find({ featured: true }).limit(8);
    } catch (e) {}

    if (!destinations || destinations.length === 0) {
      destinations = SEED_DESTINATIONS.filter(d => d.featured).slice(0, 8);
    }

    res.status(200).json({ success: true, count: destinations.length, destinations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/destinations/:slug
exports.getDestinationBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    let destination = null;
    try {
      destination = await Destination.findOne({ slug: slug.toLowerCase() });
    } catch (e) {}

    if (!destination) {
      destination = SEED_DESTINATIONS.find(d => d.slug === slug.toLowerCase() || d.name.toLowerCase() === slug.toLowerCase());
    }

    if (!destination) {
      return res.status(404).json({ success: false, message: 'Destination not found' });
    }

    res.status(200).json({ success: true, destination });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/favorites/:destinationId
exports.toggleFavorite = async (req, res) => {
  try {
    const { destinationId } = req.params;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const isFav = user.favorites.some(f => f.toString() === destinationId);
    if (isFav) {
      user.favorites = user.favorites.filter(f => f.toString() !== destinationId);
    } else {
      user.favorites.push(destinationId);
    }
    await user.save();

    res.status(200).json({ success: true, isFavorite: !isFav, favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
