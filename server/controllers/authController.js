const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'vivahaverse_super_secret_jwt_key_2026_luxury_wedding', {
    expiresIn: '30d'
  });
};

const sendTokenResponse = (user, statusCode, res) => {
  const token = generateToken(user._id);
  const cookieOptions = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production'
  };

  res.cookie('token', token, cookieOptions).status(statusCode).json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      favorites: user.favorites,
      favoriteVenues: user.favoriteVenues,
      checklist: user.checklist
    }
  });
};

// POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and password' });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email address already registered' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Initial default wedding checklist items for new user
    const initialChecklist = [
      { title: 'Choose wedding destination', category: 'Destination', completed: false },
      { title: 'Finalize venue and dates', category: 'Venue', completed: false },
      { title: 'Create estimated guest list', category: 'Guests', completed: false },
      { title: 'Book room blocks for guests', category: 'Accommodation', completed: false },
      { title: 'Hire Decorator & Florist', category: 'Vendors', completed: false },
      { title: 'Select Photographer & Videographer', category: 'Media', completed: false },
      { title: 'Finalize Mehendi & Sangeet themes', category: 'Events', completed: false }
    ];

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phone: phone || '',
      checklist: initialChecklist
    });

    sendTokenResponse(user, 201, res);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/auth/logout
exports.logout = async (req, res) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 5 * 1000),
    httpOnly: true
  });
  res.status(200).json({ success: true, message: 'Logged out successfully' });
};

// GET /api/auth/me
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password').populate('favorites').populate('favoriteVenues');
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/auth/checklist
exports.updateChecklist = async (req, res) => {
  try {
    const { checklist } = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, { checklist }, { new: true }).select('-password');
    res.status(200).json({ success: true, checklist: user.checklist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
