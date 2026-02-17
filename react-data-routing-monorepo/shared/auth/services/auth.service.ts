import type { AuthUser, AuthState, UserRole, PlanTier, FeatureFlag } from '../models/auth.types.ts';
import { PLAN_HIERARCHY } from '../models/auth.types.ts';

/** Sample user — swap with real auth service in production */
const MOCK_USER: AuthUser = {
  id: '1',
  name: 'Alice Johnson',
  email: 'alice@example.com',
  role: 'admin',
  subscription: {
    plan: 'pro',
    trialEndsAt: null,
  },
  features: ['analytics', 'bulk-export', 'api-access'],
};

function buildSnapshot(user: AuthUser | null): AuthState {
  return Object.freeze({ user, isAuthenticated: !!user });
}

/**
 * Framework-agnostic auth store.
 *
 * Exposes the subscribe/getSnapshot contract that React's
 * `useSyncExternalStore` expects, but has zero React dependencies.
 *
 * In a microfrontend setup, this module becomes a Module Federation
 * shared singleton so every remote shares the same auth state.
 */
class AuthStore {
  private listeners = new Set<() => void>();
  private snapshot: AuthState;

  constructor(initialUser: AuthUser | null = MOCK_USER) {
    this.snapshot = buildSnapshot(initialUser);

    this.subscribe = this.subscribe.bind(this);
    this.getSnapshot = this.getSnapshot.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.hasRole = this.hasRole.bind(this);
    this.hasFeature = this.hasFeature.bind(this);
    this.hasPlan = this.hasPlan.bind(this);
    this.isTrialActive = this.isTrialActive.bind(this);
  }

  // ─── External Store Contract ────────────────────────────

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  getSnapshot(): AuthState {
    return this.snapshot;
  }

  // ─── Auth Actions ───────────────────────────────────────

  login(user: AuthUser): void {
    this.snapshot = buildSnapshot(user);
    this.emit();
  }

  logout(): void {
    this.snapshot = buildSnapshot(null);
    this.emit();
  }

  // ─── Role Checks ────────────────────────────────────────

  hasRole(roles: UserRole | UserRole[]): boolean {
    const { user } = this.snapshot;
    if (!user) return false;
    const allowed = Array.isArray(roles) ? roles : [roles];
    return allowed.includes(user.role);
  }

  // ─── Feature Flag Checks ────────────────────────────────

  hasFeature(flags: FeatureFlag | FeatureFlag[]): boolean {
    const { user } = this.snapshot;
    if (!user) return false;
    const required = Array.isArray(flags) ? flags : [flags];
    return required.every((f) => user.features.includes(f));
  }

  // ─── Subscription / Plan Checks ─────────────────────────

  /** Returns true if the user's plan is at least `minPlan` */
  hasPlan(minPlan: PlanTier): boolean {
    const { user } = this.snapshot;
    if (!user) return false;
    const userTier = PLAN_HIERARCHY.indexOf(user.subscription.plan);
    const requiredTier = PLAN_HIERARCHY.indexOf(minPlan);
    return userTier >= requiredTier;
  }

  /** Returns true if the user has an active (non-expired) trial */
  isTrialActive(): boolean {
    const { user } = this.snapshot;
    if (!user) return false;
    const { trialEndsAt } = user.subscription;
    if (!trialEndsAt) return false;
    return new Date(trialEndsAt) > new Date();
  }

  // ─── Internal ───────────────────────────────────────────

  private emit(): void {
    this.listeners.forEach((listener) => listener());
  }
}

/** Singleton instance — shared across the entire app (or via Module Federation) */
export const authStore = new AuthStore();
