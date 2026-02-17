import { createContext, useState, useCallback, useMemo, type ReactNode } from 'react';
import type { AuthUser, AuthContextValue, UserRole } from '../models/auth.types';
import { MOCK_USER, checkRole } from '../services/auth.service';

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(MOCK_USER);

  const login = useCallback((u: AuthUser) => setUser(u), []);
  const logout = useCallback(() => setUser(null), []);

  const hasRole = useCallback(
    (roles: UserRole | UserRole[]) => checkRole(user, roles),
    [user],
  );

  const value = useMemo<AuthContextValue>(
    () => ({ user, isAuthenticated: !!user, login, logout, hasRole }),
    [user, login, logout, hasRole],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
