/**
 * TrustCart Mock API Adapter
 * Simulates a Python backend connection with real network latency
 * since Windows requires C++/Rust toolchains to compile the AI database driver natively.
 */

// Simulated Network Latency
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const MOCK_SELLERS = {
  s1: {
    id: "s1",
    name: "AudioTech Pro",
    is_verified: true,
    joined: "Aug 2023",
  },
  s2: {
    id: "s2",
    name: "Bargain Bin Electronics",
    is_verified: false,
    joined: "Jan 2024",
  }
};

const MOCK_AI_PAYLOADS = {
  s1: {
    score: 98,
    tier: 'Highly Trusted',
    explanation: 'TrustCart AI verified a flawless multi-year delivery history with authentic paragraph-length reviews. Review sentiment overwhelmingly points to premium product quality and highly responsive customer service.',
    metrics: { ratingScore: 29.5, sentimentScore: 19.8, deliveryScore: 19.5, ageScore: 18.2, account_age_days: 850, delivery_success_rate: 99.2 },
    aiStats: { genuinePct: 95, suspiciousPct: 5, explanation: 'Minimal bot interference detected based on standard NLP heuristics.' },
    historicalRatings: [
      { month: 'Oct', rating: 4.8 }, { month: 'Nov', rating: 4.9 }, { month: 'Dec', rating: 4.9 },
      { month: 'Jan', rating: 4.8 }, { month: 'Feb', rating: 4.9 }, { month: 'Mar', rating: 4.8 }
    ],
    products: [
      { id: '1', name: 'Acoustic Noise Cancelling Headphones', price: 299.99, rating: 4.8, category: 'Audio', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80' }
    ]
  },
  s2: {
    score: 42,
    tier: 'Risky Entity',
    explanation: 'TrustCart AI detected suspicious clusters of 5-star reviews posted within hours of each other, utilizing identically structured paragraphs. This heavily indicates bot activity artificially boosting the aggregate score.',
    metrics: { ratingScore: 18.5, sentimentScore: 10.5, deliveryScore: 12.8, ageScore: 3.8, account_age_days: 140, delivery_success_rate: 64.5 },
    aiStats: { genuinePct: 54, suspiciousPct: 46, explanation: 'Critical spike of localized fake review clusters dropping from IP farms.' },
    historicalRatings: [
      { month: 'Oct', rating: 4.8 }, { month: 'Nov', rating: 4.7 }, { month: 'Dec', rating: 4.1 },
      { month: 'Jan', rating: 3.8 }, { month: 'Feb', rating: 3.4 }, { month: 'Mar', rating: 3.2 }
    ],
    products: [
      { id: '2', name: 'Ultra-slim 4K Portable Monitor', price: 129.00, rating: 4.2, category: 'Displays', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80' }
    ]
  }
};

const MOCK_PRODUCTS = {
  1: {
    id: "1",
    seller_id: "s1",
    name: "Acoustic Noise Cancelling Headphones",
    price: 299.99,
    category: "Audio",
    image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
  },
  2: {
    id: "2",
    seller_id: "s2",
    name: "Ultra-slim 4K Portable Monitor",
    price: 129.00,
    category: "Displays",
    image_url: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80",
  }
};

export const getSellerData = async (sellerId) => {
  await delay(800);
  const seller = MOCK_SELLERS[sellerId];
  if (!seller) throw new Error("Seller profile not found on the server.");
  return seller;
};

export const getSellerScore = async (sellerId) => {
  await delay(400);
  return { score: MOCK_AI_PAYLOADS[sellerId]?.score || 0 };
};

export const analyzeReviews = async (sellerId) => {
  await delay(1200); // Simulate ML inference delay
  const analysis = MOCK_AI_PAYLOADS[sellerId];
  if (!analysis) throw new Error("AI analysis unavailable for this merchant.");
  return analysis;
};

export const getProductById = async (productId) => {
  await delay(600);
  const product = MOCK_PRODUCTS[productId];
  if (!product) throw new Error("Product data is missing or not found on the server.");
  return product;
};
