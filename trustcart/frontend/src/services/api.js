import apiClient from '@api/client';

/**
 * TrustCart real API adapter
 */

export const getSellerData = async (sellerId) => {
  const response = await apiClient.get('/sellers/get-seller-data', { params: { seller_id: sellerId } });
  return response.data;
};

export const getSellerScore = async (sellerId, options = {}) => {
  const response = await apiClient.get('/sellers/get-seller-score', {
    params: {
      seller_id: sellerId,
      email_domain: options.email_domain,
      post_velocity: options.post_velocity,
      has_red_flags: options.has_red_flags,
      suspicious_ip: options.suspicious_ip,
    },
  });
  return response.data;
};

export const analyzeReviews = async (sellerId) => {
  const response = await apiClient.get('/sellers/analyze-reviews', { params: { seller_id: sellerId } });
  return response.data;
};

export const getProductById = async (productId) => {
  const response = await apiClient.get(`/products/${productId}`);
  return response.data;
};

export const vouchSeller = async (sellerId, voucherId, stake = 10) => {
  const response = await apiClient.post('/sellers/vouch', {
    seller_id: sellerId,
    voucher_id: voucherId,
    stake,
  });
  return response.data;
};
