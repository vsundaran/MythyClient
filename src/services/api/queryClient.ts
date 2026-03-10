import { QueryClient } from '@tanstack/react-query';

/**
 * Centralized QueryClient instance with production-grade defaults.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 60 * 24, // 24 hours (for persistence if used)
      refetchOnWindowFocus: false, // Recommended for mobile
    },
    mutations: {
      retry: 1,
    },
  },
});
