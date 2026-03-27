import React, { createContext, useContext, useState, useCallback } from 'react';
import { getSellerData, analyzeReviews } from '../services/api';

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
    const [sellerData, aiTrustData] = await Promise.all([
      getSellerData(sellerId),
      analyzeReviews(sellerId)
    ]);
    
    const payload = { seller: sellerData, aiTrust: aiTrustData };
    
    // 3. Write payload directly to the permanent App memory bank
    setCache(prev => ({ ...prev, [sellerId]: payload }));
    
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
