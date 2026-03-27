import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '/api/v1',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15_000,
});

// ── Request interceptor: attach auth token ──────────────────────────────────
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('trustcart_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ── Response interceptor: normalised error handling ─────────────────────────
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('trustcart_token');
      window.location.href = '/login';
    }
    return Promise.reject(error?.response?.data ?? error);
  }
);

export default apiClient;
