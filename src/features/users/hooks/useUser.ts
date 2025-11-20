import { useState, useEffect } from 'react';
import { userService } from '../services/userService';
import type { User } from '../types/user.types';

/**
 * Return type for useUser hook
 */
export interface UseUserReturn {
  /** User data or null if not found or not yet loaded */
  user: User | null;
  /** Loading state (true while fetching data) */
  loading: boolean;
  /** Error message or null if no error */
  error: string | null;
}

/**
 * Custom hook to fetch and manage a single user by ID.
 *
 * Automatically handles loading state, data, and errors.
 * Data is loaded automatically when the component mounts or when the ID changes.
 *
 * @param id - User ID to fetch
 * @returns Object with:
 *   - `user`: User data or `null` if not found or not yet loaded
 *   - `loading`: Loading state (true while fetching data)
 *   - `error`: Error message or `null` if no error
 *
 * @example
 * ```tsx
 * function UserForm({ userId }: { userId: string }) {
 *   const { user, loading, error } = useUser(userId);
 *
 *   if (loading) return <Loader />;
 *   if (error) return <Alert>{error}</Alert>;
 *   if (!user) return <Text>User not found</Text>;
 *
 *   return <UserFormContent user={user} />;
 * }
 * ```
 */
export function useUser(id: string): UseUserReturn {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await userService.getUserById(id);
        setUser(result);
        if (!result) {
          setError('User not found');
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load user';
        setError(errorMessage);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUser();
    } else {
      setLoading(false);
      setUser(null);
      setError('User ID is required');
    }
  }, [id]);

  return { user, loading, error };
}

