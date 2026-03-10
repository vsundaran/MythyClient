import axios from 'axios';

/**
 * Enterprise-grade API client configuration.
 * Centralizing request/response logic for easier debugging and header management.
 */
const apiClient = axios.create({
  baseURL: 'https://api.example.com', // Replace with actual API URL or env var
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor (e.g., adding Auth tokens)
apiClient.interceptors.request.use(
  (config) => {
    // const token = useAuthStore.getState().token; // Access Zustand store directly if needed
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (standardized error handling)
apiClient.interceptors.response.use(
  (response) => {
    // MNC Best Practice: Return only the data to the service layer
    return response.data;
  },
  (error) => {
    // Handle global errors (e.g., 401 logout, 500 alert)
    const message = error.response?.data?.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

export default apiClient;
