/**
 * Generates an array of risk flag warning strings based on raw seller metrics.
 * Eliminates hardcoded risk data, making the UI fully data-driven.
 * 
 * @param {Object} metrics - Raw metrics (account_age_days, delivery_success_rate, etc.)
 * @param {Object} aiStats - AI specific stats (suspiciousPct)
 * @returns {Array<string>} Array of flag messages
 */
export const generateRiskFlags = (metrics, aiStats) => {
  const flags = [];
  
  // Destructure with safe resilient defaults
  const accountAgeDays = metrics?.account_age_days ?? 999;
  const deliveryRate = metrics?.delivery_success_rate ?? 100;
  const suspiciousPct = aiStats?.suspiciousPct ?? 0;

  // Rule 1: New Seller (< 180 days)
  if (accountAgeDays < 180) {
    flags.push(`New Seller (<6 Months)`);
  }
  
  // Rule 2: High Suspicious Reviews (> 30%)
  if (suspiciousPct > 30) {
    flags.push(`High Suspicious Reviews (${suspiciousPct}%)`);
  }
  
  // Rule 3: Low Delivery Rate (< 70%)
  if (deliveryRate < 70) {
    flags.push(`Low Delivery Rate (${deliveryRate}%)`);
  }
  
  return flags;
};
