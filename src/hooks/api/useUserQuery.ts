import { useQuery } from '@tanstack/react-query';
import { UserService } from '../../services/userService';

/**
 * Custom hook following separation of concerns.
 * UI components use this hook instead of calling services directly.
 */
export const useUserQuery = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => UserService.getUserProfile(userId),
    enabled: !!userId, // Only fetch if userId exists
  });
};
