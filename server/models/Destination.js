const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true, index: true },
  state: { type: String, required: true, index: true },
  region: { 
    type: String, 
    required: true, 
    enum: ['Rajasthan', 'Goa', 'Kerala', 'Uttarakhand', 'Himachal Pradesh', 'Jammu & Kashmir', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Uttar Pradesh', 'Island Destinations', 'Telangana'],
    index: true 
  },
  tagline: { type: String, required: true },
  description: { type: String, required: true },
  heroImage: { type: String, required: true },
  gallery: [{ type: String }],
  weddingStyles: [{ type: String, index: true }], // e.g. Royal, Palace, Lakeside, Beach, Heritage, Mountain, Desert, Forest
  bestMonths: [{ type: String }], // e.g. Oct-Mar
  bestMonthsList: [{ type: String }], // e.g. ['October', 'November', 'December', 'January', 'February', 'March']
  climate: { type: String, required: true }, // Beach, Mountain, Lake, Desert, Forest, City
  nearestAirport: { type: String, required: true },
  airportDistance: { type: String, required: true },
  idealGuestMin: { type: Number, default: 50 },
  idealGuestMax: { type: Number, default: 500 },
  budgetRange: {
    min: { type: Number, required: true, index: true }, // in Lakh INR (e.g. 25)
    max: { type: Number, required: true, index: true }  // in Lakh INR (e.g. 150)
  },
  pricing: {
    venueDailyMin: { type: Number, default: 200000 },
    venueDailyMax: { type: Number, default: 1200000 },
    roomNightMin: { type: Number, default: 5000 },
    roomNightMax: { type: Number, default: 25000 },
    foodPerGuestMin: { type: Number, default: 2000 },
    foodPerGuestMax: { type: Number, default: 6000 },
    decorEventMin: { type: Number, default: 150000 },
    decorEventMax: { type: Number, default: 800000 },
    photographyMin: { type: Number, default: 150000 },
    photographyMax: { type: Number, default: 600000 },
    entertainmentMin: { type: Number, default: 100000 },
    entertainmentMax: { type: Number, default: 500000 },
    transportationMin: { type: Number, default: 50000 },
    transportationMax: { type: Number, default: 300000 },
    plannerPercentage: { type: Number, default: 10 },
    taxPercentage: { type: Number, default: 18 },
    contingencyPercentage: { type: Number, default: 5 }
  },
  priceLastUpdated: { type: Date, default: Date.now },
  priceDisclaimer: { 
    type: String, 
    default: "Indicative estimates only. Actual venue quotations vary by date, seasonality, and vendor specifications." 
  },
  highlights: [{ type: String }],
  considerations: [{ type: String }],
  experiences: [{ type: String }],
  faqs: [{
    question: { type: String },
    answer: { type: String }
  }],
  featured: { type: Boolean, default: false, index: true },
  createdAt: { type: Date, default: Date.now }
});

destinationSchema.index({ name: 'text', state: 'text', region: 'text', description: 'text' });

module.exports = mongoose.model('Destination', destinationSchema);
