const mongoose = require('mongoose');

const weddingPlanSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true, default: 'My AI Wedding Plan' },
  guestCount: { type: Number, required: true },
  budgetLakhs: { type: Number, required: true },
  weddingMonth: { type: String },
  numberOfDays: { type: Number, default: 3 },
  style: { type: String, default: 'Royal' },
  ceremonyType: { type: String, default: 'Hindu' },
  climatePreference: { type: String, default: 'Lake' },
  recommendedDestinations: [{
    destinationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination' },
    name: { type: String },
    matchScore: { type: Number },
    reason: { type: String },
    estimatedBudget: {
      minimum: { type: Number },
      maximum: { type: Number }
    },
    advantages: [{ type: String }],
    considerations: [{ type: String }],
    bestVenueStyles: [{ type: String }]
  }],
  aiSummary: { type: String },
  recommendedDestinationName: { type: String },
  weddingTheme: { type: String },
  colourPalette: [{ type: String }],
  events: [{ type: String }],
  budgetBreakdown: { type: Object },
  itinerary: [{
    day: { type: Number },
    title: { type: String },
    schedule: [{
      time: { type: String },
      activity: { type: String },
      description: { type: String }
    }]
  }],
  plannerTips: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('WeddingPlan', weddingPlanSchema);
