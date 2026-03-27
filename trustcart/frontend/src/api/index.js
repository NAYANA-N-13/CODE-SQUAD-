import apiClient from './client';

export const productApi = {
  /** GET /products – list with filters */
  getAll: (params) => apiClient.get('/products', { params }),

  /** GET /products/:id – single product */
  getById: (id) => apiClient.get(`/products/${id}`),

  /** GET /products/search?q= */
  search: (query) => apiClient.get('/products/search', { params: { q: query } }),

  /** GET /products/categories */
  getCategories: () => apiClient.get('/products/categories'),
};

export const authApi = {
  login:    (credentials) => apiClient.post('/auth/login', credentials),
  register: (data)        => apiClient.post('/auth/register', data),
  me:       ()            => apiClient.get('/auth/me'),
  logout:   ()            => apiClient.post('/auth/logout'),
};

export const cartApi = {
  get:    ()           => apiClient.get('/cart'),
  add:    (item)       => apiClient.post('/cart/items', item),
  update: (itemId, q)  => apiClient.patch(`/cart/items/${itemId}`, { quantity: q }),
  remove: (itemId)     => apiClient.delete(`/cart/items/${itemId}`),
  clear:  ()           => apiClient.delete('/cart'),
};

export const orderApi = {
  create:  (data)  => apiClient.post('/orders', data),
  getAll:  ()      => apiClient.get('/orders'),
  getById: (id)    => apiClient.get(`/orders/${id}`),
  cancel:  (id)    => apiClient.patch(`/orders/${id}/cancel`),
};

export const reviewApi = {
  getByProduct: (productId) => apiClient.get(`/products/${productId}/reviews`),
  create:       (productId, data) => apiClient.post(`/products/${productId}/reviews`, data),
};

export const aiApi = {
  /** POST /ai/recommend – AI-driven product recommendations */
  recommend: (payload) => apiClient.post('/ai/recommend', payload),

  /** POST /ai/trust-score – analyse a product listing for trustworthiness */
  trustScore: (productId) => apiClient.post('/ai/trust-score', { product_id: productId }),

  /** POST /ai/review-summary – summarise reviews with AI */
  reviewSummary: (productId) => apiClient.post('/ai/review-summary', { product_id: productId }),
};
