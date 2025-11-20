/**
 * User status type definition
 */
export type UserStatus = 'active' | 'inactive' | 'pending';

/**
 * User role type definition
 */
export type UserRole = 'admin' | 'user' | 'moderator';

/**
 * User interface representing a user entity
 */
export interface User {
  /** Unique identifier for the user */
  id: string;
  /** User's full name */
  name: string;
  /** User's email address */
  email: string;
  /** User's role in the system */
  role: UserRole;
  /** Current status of the user */
  status: UserStatus;
  /** URL to user's avatar image (optional) */
  avatar: string | null;
  /** Date when the user was created */
  createdAt: Date;
  /** Date when the user was last updated */
  updatedAt: Date;
}

/**
 * User form data type for creating/updating users
 * Excludes system-generated fields (id, createdAt, updatedAt)
 */
export interface UserFormData {
  /** User's full name */
  name: string;
  /** User's email address */
  email: string;
  /** User's role in the system */
  role: UserRole;
  /** Current status of the user */
  status: UserStatus;
  /** URL to user's avatar image (optional) */
  avatar: string | null;
}

