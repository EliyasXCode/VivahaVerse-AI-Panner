const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Destination = require('../models/Destination');
const Venue = require('../models/Venue');
const InspirationStory = require('../models/InspirationStory');
const { SEED_DESTINATIONS, SEED_VENUES, SEED_STORIES } = require('./seedData');

const runSeed = async () => {
  console.log('[Seed Runner] Starting VivahaVerse database seed script...');
  const connected = await connectDB();
  if (!connected) {
    console.warn('[Seed Runner] Unable to connect to local/atlas MongoDB instance. Memory fallback mode active.');
    process.exit(0);
  }

  try {
    await Destination.deleteMany({});
    await Venue.deleteMany({});
    await InspirationStory.deleteMany({});

    console.log('[Seed Runner] Existing data cleared.');

    const createdDestinations = await Destination.insertMany(SEED_DESTINATIONS);
    console.log(`[Seed Runner] Successfully seeded ${createdDestinations.length} destinations.`);

    // Map destination IDs to venue references
    const venueDocs = SEED_VENUES.map(v => {
      const match = createdDestinations.find(d => d.name === v.destinationName);
      return {
        ...v,
        destination: match ? match._id : createdDestinations[0]._id
      };
    });

    const createdVenues = await Venue.insertMany(venueDocs);
    console.log(`[Seed Runner] Successfully seeded ${createdVenues.length} venues.`);

    const createdStories = await InspirationStory.insertMany(SEED_STORIES);
    console.log(`[Seed Runner] Successfully seeded ${createdStories.length} inspiration stories.`);

    console.log('[Seed Runner] Database seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Runner Error]', error.message);
    process.exit(1);
  }
};

runSeed();
