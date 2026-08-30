const { GoogleGenAI } = require('@google/genai');

const apiKey = process.env.GEMINI_API_KEY || '';
const textModel = process.env.GEMINI_TEXT_MODEL || 'gemini-3.7-flash';

let ai = null;
if (apiKey) {
  try {
    ai = new GoogleGenAI({ apiKey });
  } catch (err) {
    console.warn('[Gemini Service] Initialization notice:', err.message);
  }
}

const SYSTEM_INSTRUCTION = `You are Vivaha AI, an expert luxury Indian destination wedding planning assistant for VivahaVerse AI.

Your job is to help couples choose wedding destinations across India, understand estimated indicative budgets, create multi-day wedding itineraries, and develop personalized wedding concepts.

CRITICAL DIRECTIVES:
1. Always use factual destination and pricing context supplied in the database groundings.
2. Never invent exact venue prices or claim estimates are official venue quotes. Always mention prices in INR (Lakhs / Crores).
3. Consider budget, guest count, wedding date/season, weather, travel accessibility (nearest airport), ceremony style (Hindu, Sikh, Muslim, Christian, Interfaith), food preferences, and cultural details.
4. Recommendations must be practical, elegant, romantic, and deeply informed by Indian wedding traditions.
5. Return clean structured JSON when structured format is requested, or warm, respectful, editorial markdown for chat responses.`;

/**
 * Generate structured wedding plan from AI using DB Grounding Context
 */
async function generateWeddingPlanAI(plannerInputs, groundedDestinations) {
  const prompt = `User Wedding Request:
- Budget: ₹${plannerInputs.budgetLakhs || 40} Lakhs
- Guest Count: ${plannerInputs.guestCount || 150} guests
- Duration: ${plannerInputs.numberOfDays || 3} days
- Preferred Month: ${plannerInputs.weddingMonth || 'November'}
- Wedding Style: ${plannerInputs.style || 'Royal'}
- Ceremony Type: ${plannerInputs.ceremonyType || 'Hindu'}
- Climate Preference: ${plannerInputs.climatePreference || 'Lake'}
- Home City (Bride): ${plannerInputs.homeCityBride || 'Delhi'}
- Home City (Groom): ${plannerInputs.homeCityGroom || 'Mumbai'}
- Events Planned: ${(plannerInputs.events || ['Mehendi', 'Haldi', 'Sangeet', 'Wedding', 'Reception']).join(', ')}

Available Grounded Destinations from Database:
${JSON.stringify(groundedDestinations.map(d => ({
  name: d.name,
  state: d.state,
  region: d.region,
  budgetRange: d.budgetRange,
  weddingStyles: d.weddingStyles,
  bestMonths: d.bestMonths,
  climate: d.climate,
  nearestAirport: d.nearestAirport,
  airportDistance: d.airportDistance,
  tagline: d.tagline,
  highlights: d.highlights
})), null, 2)}

Please select and rank top destinations from the grounded list, formulate a wedding theme, colour palette, budget breakdown, 3-day itinerary schedule, and expert planner tips.

Return ONLY a valid JSON object matching this schema:
{
  "summary": "Romantic 2-3 sentence overview",
  "recommendedDestinations": [
    {
      "destinationId": "string or name",
      "name": "Destination Name",
      "matchScore": 95,
      "reason": "Why this destination matches user preferences",
      "estimatedBudget": { "minimum": 35, "maximum": 50 },
      "advantages": ["Advantage 1", "Advantage 2"],
      "considerations": ["Consideration 1"],
      "bestVenueStyles": ["Palace", "Lakeside"]
    }
  ],
  "recommendedDestination": "Primary Top Recommended Destination Name",
  "weddingTheme": "Theme Name",
  "colourPalette": ["Palette 1", "Palette 2", "Palette 3", "Palette 4"],
  "events": ["Mehendi", "Haldi", "Sangeet", "Wedding Ceremony", "Reception"],
  "budgetBreakdown": {
    "venueCost": "₹X Lakhs",
    "accommodation": "₹X Lakhs",
    "foodAndCatering": "₹X Lakhs",
    "decorAndLighting": "₹X Lakhs",
    "photography": "₹X Lakhs",
    "entertainment": "₹X Lakhs",
    "miscellaneous": "₹X Lakhs"
  },
  "itinerary": [
    {
      "day": 1,
      "title": "Welcome & Royal Dinner",
      "schedule": [
        { "time": "02:00 PM", "activity": "Guest Arrival & Royal Welcome", "description": "Traditional dhol & garland reception" },
        { "time": "07:30 PM", "activity": "Sangeet / Welcome Night", "description": "Music & cocktail celebration" }
      ]
    }
  ],
  "plannerTips": ["Tip 1", "Tip 2", "Tip 3"]
}`;

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: textModel,
        contents: [
          { role: 'user', parts: [{ text: `${SYSTEM_INSTRUCTION}\n\n${prompt}` }] }
        ],
        config: {
          responseMimeType: 'application/json'
        }
      });

      const text = response.text;
      const parsed = JSON.parse(text);
      return parsed;
    } catch (err) {
      console.error('[Gemini AI Plan Error]', err.message);
    }
  }

  // Fallback if AI call failed or API key missing
  const topDest = groundedDestinations[0] || { name: 'Udaipur', budgetRange: { min: 35, max: 75 } };
  return {
    summary: `Based on your request for a ${plannerInputs.style || 'Royal'} wedding for ${plannerInputs.guestCount || 150} guests with a budget of ₹${plannerInputs.budgetLakhs || 40} Lakhs, ${topDest.name} offers an exquisite setting for your dream celebration.`,
    recommendedDestinations: groundedDestinations.slice(0, 3).map((d, index) => ({
      destinationId: d._id || d.slug || d.name,
      name: d.name,
      matchScore: 96 - index * 5,
      reason: `Fits your ${plannerInputs.style || 'Royal'} style preference, guest capacity of ${plannerInputs.guestCount || 150}, and climate choice.`,
      estimatedBudget: { minimum: d.budgetRange?.min || 30, maximum: d.budgetRange?.max || 60 },
      advantages: d.highlights ? d.highlights.slice(0, 3) : ["Heritage ambiance", "Airport proximity", "Luxury hospitality"],
      considerations: d.considerations ? d.considerations.slice(0, 2) : ["Book 6-8 months in advance"],
      bestVenueStyles: d.weddingStyles || ["Palace", "Lakeside"]
    })),
    recommendedDestination: topDest.name,
    weddingTheme: `${plannerInputs.style || 'Royal'} Elegance`,
    colourPalette: ['Antique Gold', 'Deep Wine', 'Ivory', 'Blush Pink'],
    events: plannerInputs.events || ['Welcome Dinner', 'Haldi & Mehendi', 'Sangeet', 'Wedding Ceremony', 'Reception'],
    budgetBreakdown: {
      venueCost: `₹${Math.round((plannerInputs.budgetLakhs || 40) * 0.25)} Lakhs`,
      accommodation: `₹${Math.round((plannerInputs.budgetLakhs || 40) * 0.28)} Lakhs`,
      foodAndCatering: `₹${Math.round((plannerInputs.budgetLakhs || 40) * 0.20)} Lakhs`,
      decorAndLighting: `₹${Math.round((plannerInputs.budgetLakhs || 40) * 0.15)} Lakhs`,
      photography: `₹${Math.round((plannerInputs.budgetLakhs || 40) * 0.06)} Lakhs`,
      entertainment: `₹${Math.round((plannerInputs.budgetLakhs || 40) * 0.04)} Lakhs`,
      miscellaneous: `₹${Math.round((plannerInputs.budgetLakhs || 40) * 0.02)} Lakhs`
    },
    itinerary: [
      {
        day: 1,
        title: "Guest Arrival & Welcome Soirée",
        schedule: [
          { time: "02:00 PM", activity: "Guest Check-in & Refreshments", description: "Royal welcome with dhol, thali, and mocktails" },
          { time: "07:00 PM", activity: "Sundowner / Welcome Dinner", description: "Lakeside acoustic session and dinner" }
        ]
      },
      {
        day: 2,
        title: "Haldi, Mehendi & Sangeet Gala",
        schedule: [
          { time: "10:30 AM", activity: "Floral Haldi Ceremony", description: "Yellow marigold decor with playful flower petal ceremony" },
          { time: "03:00 PM", activity: "Mehendi & High Tea", description: "Henna artists, folk songs, and live chaat counters" },
          { time: "08:00 PM", activity: "Grand Sangeet Night", description: "Choreographed family dances, DJ night, and cocktail feast" }
        ]
      },
      {
        day: 3,
        title: "The Wedding Vows & Gala Reception",
        schedule: [
          { time: "04:30 PM", activity: "Baraat Procession", description: "Royal horse/vintage car procession with live band" },
          { time: "06:30 PM", activity: "Pheras Ceremony", description: "Mandap ceremony during sunset/golden hour" },
          { time: "09:00 PM", activity: "Royal Reception Feast", description: "Gourmet multi-cuisine dinner & cake cutting" }
        ]
      }
    ],
    plannerTips: [
      "Reserve venue room blocks at least 6-8 months prior for winter dates.",
      "Incorporate local regional cuisine (e.g. Dal Baati Churma in Rajasthan, Seafood counters in Goa) for guest delight.",
      "Arrange airport transfer shuttles for major guest arrival windows to save logistics costs."
    ]
  };
}

/**
 * Handle AI Concierge Chat query with Database Grounding
 */
async function chatConciergeAI(userMessage, conversationHistory, groundedDestinations) {
  const prompt = `User Question: "${userMessage}"

Database Grounded Destination Info:
${JSON.stringify(groundedDestinations.map(d => ({
  name: d.name,
  state: d.state,
  region: d.region,
  budgetRange: d.budgetRange,
  weddingStyles: d.weddingStyles,
  bestMonths: d.bestMonths,
  climate: d.climate,
  nearestAirport: d.nearestAirport,
  airportDistance: d.airportDistance,
  tagline: d.tagline
})), null, 2)}

Provide a helpful, refined, and luxury wedding planner response to the user's question using the grounded destination database context. 
Offer 2-3 relevant follow-up prompt chips for the user.

Return ONLY JSON:
{
  "reply": "Your detailed friendly markdown advice here...",
  "suggestedChips": ["Suggested question 1", "Suggested question 2", "Suggested question 3"]
}`;

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: textModel,
        contents: [
          { role: 'user', parts: [{ text: `${SYSTEM_INSTRUCTION}\n\n${prompt}` }] }
        ],
        config: {
          responseMimeType: 'application/json'
        }
      });
      const parsed = JSON.parse(response.text);
      return parsed;
    } catch (err) {
      console.error('[Gemini Chat Error]', err.message);
    }
  }

  // Fallback chat response
  return {
    reply: `Thank you for asking! Based on our Indian wedding destination data, for your query regarding **"${userMessage}"**, we highly recommend considering destinations like **Udaipur**, **Jaipur**, or **Goa** depending on your climate preference. For example, a luxury 3-day celebration in Udaipur for 150 guests typically spans between ₹35 Lakhs and ₹75 Lakhs including venue, guest rooms, catering, and decor.`,
    suggestedChips: [
      "Compare Udaipur vs Jaipur for 150 guests",
      "What is the best month for a Goa beach wedding?",
      "Can I plan a destination wedding under ₹30 Lakhs?"
    ]
  };
}

/**
 * AI Budget Advice Optimization
 */
async function getBudgetOptimizationAdvice(budgetData, destinationName) {
  const prompt = `Analyze this estimated wedding budget for a destination wedding in ${destinationName || 'India'}:
${JSON.stringify(budgetData, null, 2)}

Provide 4 actionable cost-optimization tips for the couple to reduce expenditure by 15-20% without sacrificing luxury or guest experience.

Return JSON:
{
  "optimizationSummary": "Summary statement...",
  "savingOpportunities": [
    { "category": "Category Name", "potentialSaving": "₹X Lakhs", "advice": "Advice detail..." }
  ]
}`;

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: textModel,
        contents: [{ role: 'user', parts: [{ text: `${SYSTEM_INSTRUCTION}\n\n${prompt}` }] }],
        config: { responseMimeType: 'application/json' }
      });
      return JSON.parse(response.text);
    } catch (err) {
      console.error('[Gemini Budget Advice Error]', err.message);
    }
  }

  return {
    optimizationSummary: "Here are high-impact ways to optimize your destination wedding budget in " + (destinationName || "India") + ":",
    savingOpportunities: [
      {
        category: "Venue & Off-Peak Dates",
        potentialSaving: "₹4 - ₹8 Lakhs",
        advice: "Host your wedding on weekdays (Tue-Thu) or shoulder seasons (late September or early April) to secure 20-30% room tariff discounts."
      },
      {
        category: "Decor & Floral Design",
        potentialSaving: "₹3 - ₹5 Lakhs",
        advice: "Utilize local seasonal blooms (marigolds, tuberose, local roses) rather than imported orchids/hydrangeas, and re-purpose morning Mandap flowers for evening reception decor."
      },
      {
        category: "Food & Beverage Logistics",
        potentialSaving: "₹2 - ₹4 Lakhs",
        advice: "Curate regional live food stations instead of multi-country buffets, reducing food wastage and lowering per-plate catering costs."
      },
      {
        category: "Guest Logistics",
        potentialSaving: "₹1.5 - ₹3 Lakhs",
        advice: "Group guest arrivals into scheduled luxury bus/van shuttle intervals rather than individual private cabs from the airport."
      }
    ]
  };
}

module.exports = {
  generateWeddingPlanAI,
  chatConciergeAI,
  getBudgetOptimizationAdvice
};
