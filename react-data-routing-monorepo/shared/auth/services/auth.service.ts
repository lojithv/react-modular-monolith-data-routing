import type { AuthUser, UserRole } from '../models/auth.types';

/** Sample user — swap with real auth service in production */
export const MOCK_USER: AuthUser = {
  id: '1',
  name: 'Alice Johnson',
  email: 'alice@example.com',
  role: 'admin',
};

/**
 * Check whether a user's role is included in the allowed list.
 */
export function checkRole(user: AuthUser | null, roles: UserRole | UserRole[]): boolean {
  if (!user) return false;
  const allowed = Array.isArray(roles) ? roles : [roles];
  return allowed.includes(user.role);
}
