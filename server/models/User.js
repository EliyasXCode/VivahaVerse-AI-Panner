const mongoose = require('mongoose');

const checklistItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, default: 'General' },
  completed: { type: Boolean, default: false },
  dueDate: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  phone: { type: String, trim: true, default: '' },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Destination' }],
  favoriteVenues: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Venue' }],
  savedPlans: [{ type: mongoose.Schema.Types.ObjectId, ref: 'WeddingPlan' }],
  checklist: [checklistItemSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
