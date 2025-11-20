import { config, debugLog } from '../../../shared/config/env';
import type { User, UserFormData } from '../types/user.types';

/**
 * Mock users data for development
 * In a real implementation, this would come from an API
 */
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'admin',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    createdAt: new Date('2024-01-15T10:00:00Z'),
    updatedAt: new Date('2024-01-20T14:30:00Z'),
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'user',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    createdAt: new Date('2024-02-01T09:15:00Z'),
    updatedAt: new Date('2024-02-10T11:20:00Z'),
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'moderator',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
    createdAt: new Date('2024-02-05T13:45:00Z'),
    updatedAt: new Date('2024-02-15T16:00:00Z'),
  },
  {
    id: '4',
    name: 'Alice Williams',
    email: 'alice.williams@example.com',
    role: 'user',
    status: 'inactive',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
    createdAt: new Date('2024-01-20T08:30:00Z'),
    updatedAt: new Date('2024-02-18T10:15:00Z'),
  },
  {
    id: '5',
    name: 'Charlie Brown',
    email: 'charlie.brown@example.com',
    role: 'user',
    status: 'pending',
    avatar: null,
    createdAt: new Date('2024-02-20T12:00:00Z'),
    updatedAt: new Date('2024-02-20T12:00:00Z'),
  },
  {
    id: '6',
    name: 'Diana Prince',
    email: 'diana.prince@example.com',
    role: 'admin',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Diana',
    createdAt: new Date('2024-01-10T11:20:00Z'),
    updatedAt: new Date('2024-02-12T15:45:00Z'),
  },
  {
    id: '7',
    name: 'Edward Norton',
    email: 'edward.norton@example.com',
    role: 'user',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Edward',
    createdAt: new Date('2024-02-08T14:10:00Z'),
    updatedAt: new Date('2024-02-16T09:30:00Z'),
  },
  {
    id: '8',
    name: 'Fiona Green',
    email: 'fiona.green@example.com',
    role: 'moderator',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fiona',
    createdAt: new Date('2024-01-25T16:45:00Z'),
    updatedAt: new Date('2024-02-14T13:20:00Z'),
  },
  {
    id: '9',
    name: 'George Miller',
    email: 'george.miller@example.com',
    role: 'user',
    status: 'inactive',
    avatar: null,
    createdAt: new Date('2024-01-30T10:00:00Z'),
    updatedAt: new Date('2024-02-19T11:00:00Z'),
  },
  {
    id: '10',
    name: 'Helen Davis',
    email: 'helen.davis@example.com',
    role: 'user',
    status: 'pending',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Helen',
    createdAt: new Date('2024-02-22T08:15:00Z'),
    updatedAt: new Date('2024-02-22T08:15:00Z'),
  },
  {
    id: '11',
    name: 'Ian Wilson',
    email: 'ian.wilson@example.com',
    role: 'admin',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ian',
    createdAt: new Date('2024-01-12T15:30:00Z'),
    updatedAt: new Date('2024-02-11T10:45:00Z'),
  },
  {
    id: '12',
    name: 'Julia Martinez',
    email: 'julia.martinez@example.com',
    role: 'user',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Julia',
    createdAt: new Date('2024-02-03T11:20:00Z'),
    updatedAt: new Date('2024-02-17T14:10:00Z'),
  },
];

/**
 * Service to interact with the users API.
 *
 * Provides methods to fetch, create, update, and delete users.
 * Currently uses mock data for development.
 */
export const userService = {
  /**
   * Fetches all users.
   *
   * @returns Promise that resolves with an array of users
   * @throws {Error} If the request fails
   *
   * @example
   * ```tsx
   * try {
   *   const users = await userService.getUsers();
   *   console.log(users);
   * } catch (error) {
   *   console.error('Error:', error);
   * }
   * ```
   */
  async getUsers(): Promise<User[]> {
    debugLog('Fetching users from:', config.apiUrl);

    // Example: In a real implementation, you would use config.apiUrl
    // const response = await fetch(`${config.apiUrl}/users`, {
    //   signal: AbortSignal.timeout(config.apiTimeout),
    // });
    // if (!response.ok) {
    //   throw new Error('Failed to fetch users');
    // }
    // return response.json();

    // Simulate API call with delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockUsers]);
      }, 500);
    });
  },

  /**
   * Fetches a single user by ID.
   *
   * @param id - User ID
   * @returns Promise that resolves with the user or null if not found
   * @throws {Error} If the request fails
   *
   * @example
   * ```tsx
   * try {
   *   const user = await userService.getUserById('1');
   *   if (user) {
   *     console.log(user.name);
   *   }
   * } catch (error) {
   *   console.error('Error:', error);
   * }
   * ```
   */
  async getUserById(id: string): Promise<User | null> {
    debugLog('Fetching user by ID:', id);

    // Example: In a real implementation, you would use config.apiUrl
    // const response = await fetch(`${config.apiUrl}/users/${id}`, {
    //   signal: AbortSignal.timeout(config.apiTimeout),
    // });
    // if (!response.ok) {
    //   if (response.status === 404) {
    //     return null;
    //   }
    //   throw new Error('Failed to fetch user');
    // }
    // return response.json();

    // Simulate API call with delay
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = mockUsers.find((u) => u.id === id);
        resolve(user || null);
      }, 500);
    });
  },

  /**
   * Creates a new user.
   *
   * @param userData - User data for creation
   * @returns Promise that resolves with the created user
   * @throws {Error} If the request fails or data is invalid
   *
   * @example
   * ```tsx
   * try {
   *   const newUser = await userService.createUser({
   *     name: 'John Doe',
   *     email: 'john@example.com',
   *     role: 'user',
   *     status: 'active',
   *     avatar: null,
   *   });
   *   console.log('User created:', newUser);
   * } catch (error) {
   *   console.error('Error:', error);
   * }
   * ```
   */
  async createUser(userData: UserFormData): Promise<User> {
    debugLog('Creating user:', userData);

    // Example: In a real implementation, you would use config.apiUrl
    // const response = await fetch(`${config.apiUrl}/users`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(userData),
    //   signal: AbortSignal.timeout(config.apiTimeout),
    // });
    // if (!response.ok) {
    //   throw new Error('Failed to create user');
    // }
    // return response.json();

    // Simulate API call with delay
    return new Promise((resolve) => {
      setTimeout(() => {
        // Generate new ID by finding the maximum existing ID and incrementing
        // This prevents ID collisions when users are deleted
        const maxId = mockUsers.reduce((max, user) => {
          const userId = Number.parseInt(user.id, 10);
          return !Number.isNaN(userId) && userId > max ? userId : max;
        }, 0);
        const newId = String(maxId + 1);

        const newUser: User = {
          ...userData,
          id: newId,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        mockUsers.push(newUser);
        resolve(newUser);
      }, 800);
    });
  },

  /**
   * Updates an existing user.
   *
   * @param id - User ID
   * @param userData - Updated user data
   * @returns Promise that resolves with the updated user
   * @throws {Error} If the request fails or user is not found
   *
   * @example
   * ```tsx
   * try {
   *   const updatedUser = await userService.updateUser('1', {
   *     name: 'John Updated',
   *     email: 'john.updated@example.com',
   *     role: 'admin',
   *     status: 'active',
   *     avatar: null,
   *   });
   *   console.log('User updated:', updatedUser);
   * } catch (error) {
   *   console.error('Error:', error);
   * }
   * ```
   */
  async updateUser(id: string, userData: UserFormData): Promise<User> {
    debugLog('Updating user:', id, userData);

    // Example: In a real implementation, you would use config.apiUrl
    // const response = await fetch(`${config.apiUrl}/users/${id}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(userData),
    //   signal: AbortSignal.timeout(config.apiTimeout),
    // });
    // if (!response.ok) {
    //   if (response.status === 404) {
    //     throw new Error('User not found');
    //   }
    //   throw new Error('Failed to update user');
    // }
    // return response.json();

    // Simulate API call with delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const userIndex = mockUsers.findIndex((u) => u.id === id);
        if (userIndex === -1) {
          reject(new Error('User not found'));
          return;
        }

        const updatedUser: User = {
          ...mockUsers[userIndex],
          ...userData,
          updatedAt: new Date(),
        };
        mockUsers[userIndex] = updatedUser;
        resolve(updatedUser);
      }, 800);
    });
  },

  /**
   * Deletes a user by ID.
   *
   * @param id - User ID
   * @returns Promise that resolves when the user is deleted
   * @throws {Error} If the request fails or user is not found
   *
   * @example
   * ```tsx
   * try {
   *   await userService.deleteUser('1');
   *   console.log('User deleted');
   * } catch (error) {
   *   console.error('Error:', error);
   * }
   * ```
   */
  async deleteUser(id: string): Promise<void> {
    debugLog('Deleting user:', id);

    // Example: In a real implementation, you would use config.apiUrl
    // const response = await fetch(`${config.apiUrl}/users/${id}`, {
    //   method: 'DELETE',
    //   signal: AbortSignal.timeout(config.apiTimeout),
    // });
    // if (!response.ok) {
    //   if (response.status === 404) {
    //     throw new Error('User not found');
    //   }
    //   throw new Error('Failed to delete user');
    // }

    // Simulate API call with delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const userIndex = mockUsers.findIndex((u) => u.id === id);
        if (userIndex === -1) {
          reject(new Error('User not found'));
          return;
        }

        mockUsers.splice(userIndex, 1);
        resolve();
      }, 600);
    });
  },
};

