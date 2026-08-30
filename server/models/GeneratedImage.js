const mongoose = require('mongoose');

const generatedImageSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  destination: { type: String, required: true },
  event: { type: String, required: true },
  style: { type: String, required: true },
  colourPalette: { type: String },
  timeOfDay: { type: String },
  decorLevel: { type: String },
  promptUsed: { type: String, required: true },
  imageUrl: { type: String, required: true },
  isAiGenerated: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('GeneratedImage', generatedImageSchema);
