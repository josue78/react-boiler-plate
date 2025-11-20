import { useState } from 'react';
import { userService } from '../services/userService';
import type { User, UserFormData } from '../types/user.types';

/**
 * Return type for useUserForm hook
 */
export interface UseUserFormReturn {
  /** Loading state (true while submitting) */
  loading: boolean;
  /** Error message or null if no error */
  error: string | null;
  /** Function to create a new user */
  createUser: (userData: UserFormData) => Promise<User | null>;
  /** Function to update an existing user */
  updateUser: (id: string, userData: UserFormData) => Promise<User | null>;
  /** Function to delete a user */
  deleteUser: (id: string) => Promise<boolean>;
  /** Function to clear the error state */
  clearError: () => void;
}

/**
 * Custom hook to manage user form operations (create, update, delete).
 *
 * Handles loading state and errors for form submissions.
 *
 * @returns Object with:
 *   - `loading`: Loading state (true while submitting)
 *   - `error`: Error message or `null` if no error
 *   - `createUser`: Function to create a new user
 *   - `updateUser`: Function to update an existing user
 *   - `deleteUser`: Function to delete a user
 *   - `clearError`: Function to clear the error state
 *
 * @example
 * ```tsx
 * function UserForm({ userId }: { userId?: string }) {
 *   const { loading, error, createUser, updateUser } = useUserForm();
 *
 *   const handleSubmit = async (data: UserFormData) => {
 *     if (userId) {
 *       await updateUser(userId, data);
 *     } else {
 *       await createUser(data);
 *     }
 *   };
 *
 *   return <form onSubmit={handleSubmit}>...</form>;
 * }
 * ```
 */
export function useUserForm(): UseUserFormReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createUser = async (userData: UserFormData): Promise<User | null> => {
    try {
      setLoading(true);
      setError(null);
      const newUser = await userService.createUser(userData);
      return newUser;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create user';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id: string, userData: UserFormData): Promise<User | null> => {
    try {
      setLoading(true);
      setError(null);
      const updatedUser = await userService.updateUser(id, userData);
      return updatedUser;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update user';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      await userService.deleteUser(id);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete user';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    loading,
    error,
    createUser,
    updateUser,
    deleteUser,
    clearError,
  };
}

