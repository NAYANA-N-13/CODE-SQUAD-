import { useMutation } from '@tanstack/react-query';
import { aiApi } from '@api';
import toast from 'react-hot-toast';

/**
 * Mutation hook to fetch AI recommendations.
 * Usage: const { mutate, data, isLoading } = useAIRecommend();
 */
export function useAIRecommend() {
  return useMutation({
    mutationFn: (payload) => aiApi.recommend(payload).then((r) => r.data),
    onError: () => toast.error('AI service unavailable. Please try again.'),
  });
}

/**
 * Mutation hook to get a trust score for a product.
 */
export function useTrustScore() {
  return useMutation({
    mutationFn: (productId) => aiApi.trustScore(productId).then((r) => r.data),
    onError: () => toast.error('Could not compute trust score.'),
  });
}

/**
 * Mutation hook to get an AI-generated review summary.
 */
export function useReviewSummary() {
  return useMutation({
    mutationFn: (productId) => aiApi.reviewSummary(productId).then((r) => r.data),
  });
}
