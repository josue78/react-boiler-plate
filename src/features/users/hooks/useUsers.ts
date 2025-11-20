import { useState, useEffect, useCallback } from 'react';
import { userService } from '../services/userService';
import type { User } from '../types/user.types';

/**
 * Return type for useUsers hook
 */
export interface UseUsersReturn {
  /** Array of users or null if not yet loaded */
  users: User[] | null;
  /** Loading state (true while fetching data) */
  loading: boolean;
  /** Error message or null if no error */
  error: string | null;
  /** Function to refetch users */
  refetch: () => Promise<void>;
}

/**
 * Custom hook to fetch and manage users list state.
 *
 * Automatically handles loading state, data, and errors.
 * Data is loaded automatically when the component mounts.
 *
 * @returns Object with:
 *   - `users`: Array of users or `null` if not yet loaded
 *   - `loading`: Loading state (true while fetching data)
 *   - `error`: Error message or `null` if no error
 *   - `refetch`: Function to manually refetch users
 *
 * @example
 * ```tsx
 * function UserList() {
 *   const { users, loading, error, refetch } = useUsers();
 *
 *   if (loading) return <Loader />;
 *   if (error) return <Alert>{error}</Alert>;
 *
 *   return (
 *     <div>
 *       {users?.map(user => <UserCard key={user.id} user={user} />)}
 *       <Button onClick={refetch}>Refresh</Button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useUsers(): UseUsersReturn {
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await userService.getUsers();
      setUsers(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load users';
      setError(errorMessage);
      setUsers(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, loading, error, refetch: fetchUsers };
}

