import type { AuthUser, AuthState, UserRole } from '../models/auth.types.ts';

/** Sample user — swap with real auth service in production */
const MOCK_USER: AuthUser = {
  id: '1',
  name: 'Alice Johnson',
  email: 'alice@example.com',
  role: 'admin',
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

    // Bind public methods so they can be passed as callbacks
    this.subscribe = this.subscribe.bind(this);
    this.getSnapshot = this.getSnapshot.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.hasRole = this.hasRole.bind(this);
  }

  /** Subscribe to state changes (useSyncExternalStore contract) */
  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  /** Return the current immutable state snapshot */
  getSnapshot(): AuthState {
    return this.snapshot;
  }

  login(user: AuthUser): void {
    this.snapshot = buildSnapshot(user);
    this.emit();
  }

  logout(): void {
    this.snapshot = buildSnapshot(null);
    this.emit();
  }

  hasRole(roles: UserRole | UserRole[]): boolean {
    const { user } = this.snapshot;
    if (!user) return false;
    const allowed = Array.isArray(roles) ? roles : [roles];
    return allowed.includes(user.role);
  }

  private emit(): void {
    this.listeners.forEach((listener) => listener());
  }
}

/** Singleton instance — shared across the entire app (or via Module Federation) */
export const authStore = new AuthStore();
