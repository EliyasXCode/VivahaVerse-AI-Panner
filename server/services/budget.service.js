/**
 * Deterministic Wedding Budget Calculator Engine
 * Calculates estimated tier costs (Essential, Premium, Luxury) based on
 * guest count, number of days, rooms, and function counts.
 */
function calculateWeddingBudget({
  guestCount = 150,
  numberOfDays = 3,
  roomCount = Math.ceil(150 / 2),
  eventsCount = 4,
  destinationPricing = null
}) {
  // Default base metrics if destination pricing is missing
  const p = destinationPricing || {
    venueDailyMin: 200000,
    venueDailyMax: 800000,
    roomNightMin: 6000,
    roomNightMax: 18000,
    foodPerGuestMin: 2500,
    foodPerGuestMax: 5000,
    decorEventMin: 200000,
    decorEventMax: 600000,
    photographyMin: 200000,
    photographyMax: 500000,
    entertainmentMin: 150000,
    entertainmentMax: 400000,
    transportationMin: 80000,
    transportationMax: 200000,
    plannerPercentage: 10,
    taxPercentage: 18,
    contingencyPercentage: 5
  };

  const calcTier = (tierFactor) => {
    // tierFactor: 0.3 for Essential, 0.65 for Premium, 1.0 for Luxury
    const venueCost = (p.venueDailyMin + (p.venueDailyMax - p.venueDailyMin) * tierFactor) * numberOfDays;
    const roomCost = (p.roomNightMin + (p.roomNightMax - p.roomNightMin) * tierFactor) * roomCount * numberOfDays;
    const foodCost = (p.foodPerGuestMin + (p.foodPerGuestMax - p.foodPerGuestMin) * tierFactor) * guestCount * eventsCount;
    const decorCost = (p.decorEventMin + (p.decorEventMax - p.decorEventMin) * tierFactor) * eventsCount;
    const photoCost = (p.photographyMin + (p.photographyMax - p.photographyMin) * tierFactor);
    const entertainmentCost = (p.entertainmentMin + (p.entertainmentMax - p.entertainmentMin) * tierFactor);
    const transportCost = (p.transportationMin + (p.transportationMax - p.transportationMin) * tierFactor);
    const makeupCost = 80000 + 120000 * tierFactor;
    const invitesGiftsCost = 50000 + 150000 * tierFactor;

    const subtotal = venueCost + roomCost + foodCost + decorCost + photoCost + entertainmentCost + transportCost + makeupCost + invitesGiftsCost;
    
    const plannerFee = subtotal * (p.plannerPercentage / 100);
    const taxCost = (subtotal + plannerFee) * (p.taxPercentage / 100);
    const contingency = (subtotal + plannerFee + taxCost) * (p.contingencyPercentage / 100);

    const totalINR = Math.round(subtotal + plannerFee + taxCost + contingency);
    const totalLakhs = Number((totalINR / 100000).toFixed(2));

    return {
      venueCost: Math.round(venueCost),
      roomCost: Math.round(roomCost),
      foodCost: Math.round(foodCost),
      decorCost: Math.round(decorCost),
      photoCost: Math.round(photoCost),
      entertainmentCost: Math.round(entertainmentCost),
      transportCost: Math.round(transportCost),
      makeupCost: Math.round(makeupCost),
      invitesGiftsCost: Math.round(invitesGiftsCost),
      plannerFee: Math.round(plannerFee),
      taxCost: Math.round(taxCost),
      contingency: Math.round(contingency),
      totalINR,
      totalLakhs
    };
  };

  return {
    essential: calcTier(0.2),
    premium: calcTier(0.55),
    luxury: calcTier(1.0),
    disclaimer: "Prices are indicative estimates based on regional averages. Actual venue quotes vary based on availability, season, and specific vendor selections."
  };
}

module.exports = { calculateWeddingBudget };
