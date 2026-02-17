// Models
export type { UserRole, AuthUser, AuthState } from './models/auth.types.ts';

// Store (framework-agnostic singleton)
export { authStore } from './services/auth.service.ts';

// Hooks (React adapter)
export { useAuth } from './hooks/useAuth.ts';

// Guards
export { default as AuthGuard } from './guards/AuthGuard.tsx';
export { default as RoleGuard } from './guards/RoleGuard.tsx';
