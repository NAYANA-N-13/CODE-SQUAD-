import { useQuery } from '@tanstack/react-query';
import { productApi } from '@api';

/**
 * Fetch a paginated / filtered product list.
 * @param {object} params – { page, limit, category, minPrice, maxPrice, sort }
 */
export function useProducts(params = {}) {
  return useQuery({
    queryKey: ['products', params],
    queryFn:  () => productApi.getAll(params).then((r) => r.data),
    keepPreviousData: true,
  });
}

/**
 * Fetch a single product by ID.
 */
export function useProduct(id) {
  return useQuery({
    queryKey: ['product', id],
    queryFn:  () => productApi.getById(id).then((r) => r.data),
    enabled:  !!id,
  });
}

/**
 * Fetch all product categories.
 */
export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn:  () => productApi.getCategories().then((r) => r.data),
    staleTime: 1000 * 60 * 30, // 30 min
  });
}
