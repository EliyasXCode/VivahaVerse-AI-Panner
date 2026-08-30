const Destination = require('../models/Destination');
const GeneratedImage = require('../models/GeneratedImage');
const { SEED_DESTINATIONS } = require('../seed/seedData');
const { 
  generateWeddingPlanAI, 
  chatConciergeAI, 
  getBudgetOptimizationAdvice 
} = require('../services/gemini.service');
const { generateWeddingConceptImage } = require('../services/imageGeneration.service');
const { calculateWeddingBudget } = require('../services/budget.service');

// Helper to retrieve database grounded destinations
async function getGroundedDestinations(filters = {}) {
  let destinations = [];
  try {
    let query = {};
    if (filters.style && filters.style !== 'All') {
      query.weddingStyles = filters.style;
    }
    if (filters.climate && filters.climate !== 'All') {
      query.climate = filters.climate;
    }
    destinations = await Destination.find(query).limit(10);
  } catch (e) {}

  if (!destinations || destinations.length === 0) {
    destinations = SEED_DESTINATIONS;
  }
  return destinations;
}

// POST /api/ai/wedding-plan
exports.generateWeddingPlan = async (req, res) => {
  try {
    const plannerInputs = req.body;
    const grounded = await getGroundedDestinations({
      style: plannerInputs.style,
      climate: plannerInputs.climatePreference
    });

    const aiPlan = await generateWeddingPlanAI(plannerInputs, grounded);
    res.status(200).json({ success: true, plan: aiPlan });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/ai/chat
exports.chatConcierge = async (req, res) => {
  try {
    const { message, conversationHistory } = req.body;
    if (!message) {
      return res.status(400).json({ success: false, message: 'Message text is required' });
    }

    const grounded = await getGroundedDestinations();
    const chatResponse = await chatConciergeAI(message, conversationHistory || [], grounded);

    res.status(200).json({ success: true, chat: chatResponse });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/ai/budget-advice
exports.getBudgetAdvice = async (req, res) => {
  try {
    const { destinationName, guestCount, numberOfDays, roomCount, eventsCount } = req.body;
    
    let destPricing = null;
    try {
      const dest = await Destination.findOne({ name: { $regex: destinationName || '', $options: 'i' } });
      if (dest) destPricing = dest.pricing;
    } catch (e) {}

    const calculatedBudgets = calculateWeddingBudget({
      guestCount: Number(guestCount) || 150,
      numberOfDays: Number(numberOfDays) || 3,
      roomCount: Number(roomCount) || 75,
      eventsCount: Number(eventsCount) || 4,
      destinationPricing: destPricing
    });

    const advice = await getBudgetOptimizationAdvice(calculatedBudgets.premium, destinationName);

    res.status(200).json({
      success: true,
      budgets: calculatedBudgets,
      aiAdvice: advice
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/ai/generate-wedding-image
exports.generateWeddingImage = async (req, res) => {
  try {
    const {
      destination,
      event,
      style,
      timeOfDay,
      colourPalette,
      decorLevel,
      guestCount
    } = req.body;

    const result = await generateWeddingConceptImage({
      destination: destination || 'Udaipur',
      event: event || 'Wedding',
      style: style || 'Royal',
      timeOfDay: timeOfDay || 'Golden Hour',
      colourPalette: colourPalette || 'Ivory & Gold',
      decorLevel: decorLevel || 'Luxury',
      guestCount: guestCount || 150
    });

    // Save concept to DB if user is logged in
    let savedRecord = null;
    try {
      savedRecord = await GeneratedImage.create({
        user: req.user ? req.user.id : null,
        destination: destination || 'Udaipur',
        event: event || 'Wedding',
        style: style || 'Royal',
        colourPalette: colourPalette || 'Ivory & Gold',
        timeOfDay: timeOfDay || 'Golden Hour',
        decorLevel: decorLevel || 'Luxury',
        promptUsed: result.promptUsed,
        imageUrl: result.imageUrl,
        isAiGenerated: true
      });
    } catch (e) {}

    res.status(200).json({
      success: true,
      image: result.imageUrl,
      promptUsed: result.promptUsed,
      disclaimer: "AI Concept Visualization – actual venue appearance may differ.",
      recordId: savedRecord ? savedRecord._id : null
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/ai/moodboard
exports.getWeddingMoodboard = async (req, res) => {
  try {
    const { style, destination, colourPalette } = req.body;

    const moodboardCards = [
      {
        category: "Mandap Architecture",
        title: "Sunset Royal Mandap",
        description: `Carved heritage mandap with antique gold pillars, draped with white mogra strings and dusk lighting over ${destination || 'lakeside waters'}.`,
        imageUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80"
      },
      {
        category: "Floral Design",
        title: "Pastel & Marigold Fusion",
        description: `High floral ceiling canopy mixing dusty blush roses with traditional Indian marigold strings and brass bells.`,
        imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80"
      },
      {
        category: "Table & Dinner Setting",
        title: "Imperial Royal Banquet",
        description: `Long banquet tables with mirrors, vintage candlelabras, gold rimmed charger plates, and personalized calligraphy menus.`,
        imageUrl: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80"
      },
      {
        category: "Bridal Entrance Concept",
        title: "Lakeside Boat / Palki Entrance",
        description: `Cinematic bridal arrival on a lotus floral decorated royal boat under fireworks and acoustic flutists.`,
        imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
      },
      {
        category: "Sangeet Stage",
        title: "Modern Jaali & LED Canopy",
        description: `Grand concert stage with gold jaali backdrop frames, ambient warm tungsten lamps, and multi-tier dance floor.`,
        imageUrl: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80"
      },
      {
        category: "Stationery & Favors",
        title: "Custom Wax Seal Invitations",
        description: `Handcrafted royal scroll invitations with gold foil motifs, paired with silk favor boxes filled with artisanal Indian sweets.`,
        imageUrl: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80"
      }
    ];

    res.status(200).json({
      success: true,
      style: style || 'Royal',
      destination: destination || 'Udaipur',
      colourPalette: colourPalette || ['Antique Gold', 'Ivory', 'Rose'],
      moodboard: moodboardCards
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
