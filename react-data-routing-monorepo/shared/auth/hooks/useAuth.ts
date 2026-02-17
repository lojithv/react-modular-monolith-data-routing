import { useSyncExternalStore } from 'react';
import { authStore } from '../services/auth.service.ts';
import type { AuthState, AuthUser, UserRole, PlanTier, FeatureFlag } from '../models/auth.types.ts';

interface UseAuthReturn extends AuthState {
  login: (user: AuthUser) => void;
  logout: () => void;
  hasRole: (roles: UserRole | UserRole[]) => boolean;
  hasFeature: (flags: FeatureFlag | FeatureFlag[]) => boolean;
  hasPlan: (minPlan: PlanTier) => boolean;
  isTrialActive: () => boolean;
}

/**
 * React hook that subscribes to the framework-agnostic AuthStore.
 * Uses `useSyncExternalStore` — no Context or Provider needed.
 * Works in both monolith and microfrontend setups.
 */
export function useAuth(): UseAuthReturn {
  const state = useSyncExternalStore(
    authStore.subscribe,
    authStore.getSnapshot,
  );

  return {
    ...state,
    login: authStore.login,
    logout: authStore.logout,
    hasRole: authStore.hasRole,
    hasFeature: authStore.hasFeature,
    hasPlan: authStore.hasPlan,
    isTrialActive: authStore.isTrialActive,
  };
}
