
/**
 * BijliBill.pk — Central NEPRA Tariff Data
 * Update tariff rates here when officially revised.
 *
 * Note: These are energy rates (Rs/kWh), not the complete bill.
 */

export const nepraTariff = {
  year: 2026,
  currency: "PKR",

  protected: [
    { limit: 100, rate: 10.54 },
    { limit: 200, rate: 13.01 },
  ],

  nonProtected: [
    { limit: 100, rate: 22.44 },
    { limit: 200, rate: 28.91 },
    { limit: 300, rate: 33.10 },
    { limit: 400, rate: 36.46 },
    { limit: 500, rate: 38.95 },
    { limit: 600, rate: 40.22 },
    { limit: 700, rate: 41.85 },
    { limit: Infinity, rate: 47.20 },
  ],
};
