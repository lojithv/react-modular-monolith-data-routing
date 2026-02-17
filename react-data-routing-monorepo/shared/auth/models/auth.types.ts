export type UserRole = 'admin' | 'editor' | 'viewer';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

/** Immutable snapshot returned by AuthStore.getSnapshot() */
export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
}
