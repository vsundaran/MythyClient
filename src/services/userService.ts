import apiClient from './api/apiClient';

/**
 * Service layer to isolate API logic from hooks and components.
 */
export const UserService = {
  getUserProfile: async (userId: string) => {
    return apiClient.get(`/users/${userId}`);
  },

  updateUserProfile: async (userId: string, data: any) => {
    return apiClient.put(`/users/${userId}`, data);
  },
};
