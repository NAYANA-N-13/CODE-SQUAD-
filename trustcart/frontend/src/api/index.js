import apiClient from './client';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

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
  // Use mock intercepts since the local Python FastAPI container is offline
  login: async (credentials) => {
    await delay(1200); // Simulate bcrypt hashing and JWT signing
    if (!credentials.email.includes('@')) throw new Error("Please enter a valid email address.");
    if (credentials.password.length < 6) throw new Error("Incorrect credentials. Please try again.");
    
    // Simulate FastAPI's Pydantic AuthResponse
    return {
      data: {
        access_token: "mock-jwt-token-ey12345",
        token_type: "bearer",
        user: {
          id: "u_demo89",
          name: "Verified User",
          email: credentials.email,
          role: "customer",
          is_active: true,
          created_at: new Date().toISOString()
        }
      }
    };
  },
  
  // Mock intercepts for Registration
  register: async (data) => {
    await delay(1200); // Simulate bcrypt hashing and MongoDB insertion
    if (data.password.length < 8) throw new Error("Password must be at least 8 characters long.");
    if (!data.name || data.name.length < 2) throw new Error("Please enter a valid display name.");
    
    // Simulate FastAPI's Pydantic AuthResponse
    return {
      data: {
        access_token: "mock-jwt-token-ey98765",
        token_type: "bearer",
        user: {
          id: "u_new_" + Math.floor(Math.random() * 10000),
          name: data.name,
          email: data.email,
          role: "customer",
          is_active: true,
          created_at: new Date().toISOString()
        }
      }
    };
  },
  
  me: async () => {
    // If a token exists in context, fake a valid validation response
    await delay(500);
    return {
      data: {
        id: "u_demo89",
        name: "Verified User",
        email: "demo@trustcart.ai",
        role: "customer",
        is_active: true
      }
    };
  },

  logout: async () => {
    await delay(300);
    return { data: { message: "Logged out." } };
  },
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
