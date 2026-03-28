import React, { createContext, useContext, useState, useCallback } from 'react';
import { getSellerData, analyzeReviews, getSellerScore } from '../services/api';

// Create a globally persistent dictionary cache context
const SellerContext = createContext();

export const SellerProvider = ({ children }) => {
  // Holds all localized payloads. Map: { "s1": { sellerData, aiTrustData } }
  const [cache, setCache] = useState({});

  const fetchSeller = useCallback(async (sellerId) => {
    // 1. Immediately bypass network completely if data exists locally
    if (cache[sellerId]) {
      return cache[sellerId];
    }

    // 2. Heavy concurrent network execution if data is missing
    const [sellerData, reviewAnalysis, scoreData] = await Promise.all([
      getSellerData(sellerId),
      analyzeReviews(sellerId),
      getSellerScore(sellerId),
    ]);

    const normalizedAITrust = {
      score: scoreData?.trust_score ?? sellerData?.trust_score ?? 0,
      tier: scoreData?.tier ?? 'Unknown',
      metrics: {
        ratingScore: scoreData?.score_breakdown?.rating_score?.value ?? 0,
        sentimentScore: scoreData?.score_breakdown?.sentiment_score?.value ?? 0,
        deliveryScore: scoreData?.score_breakdown?.delivery_score?.value ?? 0,
        ageScore: scoreData?.score_breakdown?.account_age_score?.value ?? 0,
      },
      aiStats: {
        suspiciousPct: reviewAnalysis?.suspicious_percentage ?? 0,
        explanation: reviewAnalysis?.explanation || reviewAnalysis?.message || 'No analysis data available.',
      },
      explanation: reviewAnalysis?.explanation || scoreData?.tier || 'No explanation available.',
      historicalRatings: reviewAnalysis?.distribution ? Object.entries(reviewAnalysis.distribution).map(([key, value]) => ({ name: key, value: value?.percent ?? 0 })) : [],
      products: reviewAnalysis?.products || [],
      raw: { reviewAnalysis, scoreData },
    };

    // Backward compatibility alias for residual old bundle references
    const normalizedAITust = normalizedAITrust;

    const normalizedSeller = {
      ...sellerData,
      id: sellerData?.seller_id || sellerData?.sellerId || sellerData?.id || sellerId,
      seller_id: sellerData?.seller_id || sellerData?.id || sellerId,
    };

    const payload = { seller: normalizedSeller, aiTrust: normalizedAITrust };

    // 3. Write payload directly to the permanent App memory bank
    setCache((prev) => ({ ...prev, [sellerId]: payload }));

    return payload;
  }, [cache]);

  return (
    <SellerContext.Provider value={{ cache, fetchSeller }}>
      {children}
    </SellerContext.Provider>
  );
};

/**
 * Super-Hook handling Caching, Fetching, Loading, Error parsing, AND Retry logic.
 */
export const useSeller = (sellerId) => {
  const context = useContext(SellerContext);
  if (!context) throw new Error("useSeller must be executed inside a SellerProvider boundary");

  const [data, setData] = useState(context.cache[sellerId] || null);
  const [loading, setLoading] = useState(!context.cache[sellerId]);
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    if (!sellerId) {
      setError("Invalid seller ID provided.");
      setLoading(false);
      return;
    }
    
    // If the cache populated right before this mount sequence, snap it locally
    if (context.cache[sellerId]) {
      setData(context.cache[sellerId]);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const payload = await context.fetchSeller(sellerId);
      setData(payload);
    } catch (err) {
      // Passes graceful User-facing errors back down to the UI views
      setError(err.message || "The TrustCart backend network is critically unreachable right now.");
    } finally {
      setLoading(false);
    }
  }, [sellerId, context]);

  // Ensures we only spin up API logic if the component parameter id updates
  React.useEffect(() => {
    loadData();
  }, [loadData]);

  // We return a 'retry' pointer so the Error UI can trigger a manual re-ping
  return {
    seller: data?.seller || null,
    aiTrust: data?.aiTrust || null,
    loading,
    error,
    retry: loadData 
  };
};
