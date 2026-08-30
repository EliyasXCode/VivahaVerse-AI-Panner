const mongoose = require('mongoose');

const inspirationStorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  coupleNames: { type: String, required: true },
  destination: { type: String, required: true },
  venue: { type: String },
  style: { type: String, required: true }, // Royal, Beach, Pastel, Mountain, Traditional, Minimal, Luxury
  heroImage: { type: String, required: true },
  gallery: [{ type: String }],
  story: { type: String, required: true },
  theme: { type: String },
  colourPalette: [{ type: String }],
  guestCount: { type: Number },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('InspirationStory', inspirationStorySchema);
