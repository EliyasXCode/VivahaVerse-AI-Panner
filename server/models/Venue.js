const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  destination: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination', required: true },
  destinationName: { type: String, required: true },
  heroImage: { type: String, required: true },
  gallery: [{ type: String }],
  category: { type: String, required: true }, // Palace, Heritage Fort, Beach Resort, Lake Resort, Mountain Retreat, Forest Resort
  capacityMax: { type: Number, required: true },
  roomCount: { type: Number, required: true },
  indoorSpaces: [{ type: String }],
  outdoorSpaces: [{ type: String }],
  airportDistance: { type: String, required: true },
  venueStyle: { type: String, required: true },
  priceTier: { type: String, enum: ['Essential', 'Premium', 'Luxury'], default: 'Luxury' },
  priceOnRequest: { type: Boolean, default: false },
  startingPricePerDay: { type: Number },
  amenities: [{ type: String }],
  whyCouplesChooseIt: [{ type: String }],
  thingsToConsider: [{ type: String }],
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Venue', venueSchema);
