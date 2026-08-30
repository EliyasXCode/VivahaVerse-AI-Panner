const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  partner1Name: { type: String, required: true },
  partner2Name: { type: String, required: true },
  currentCity: { type: String, required: true },
  residency: { type: String, enum: ['Resident', 'NRI', 'International'], default: 'Resident' },
  weddingDate: { type: String },
  guestCount: { type: Number, required: true },
  ceremonyType: { type: String },
  numberOfDays: { type: Number, default: 3 },
  preferredDestination: { type: String, required: true },
  venueStyle: { type: String },
  specificVenue: { type: String },
  budgetRange: { type: String, required: true },
  contactName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  whatsappPreference: { type: Boolean, default: true },
  bestTimeToContact: { type: String },
  message: { type: String },
  status: { type: String, enum: ['New', 'Contacted', 'In Progress', 'Confirmed', 'Closed'], default: 'New' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Inquiry', inquirySchema);
