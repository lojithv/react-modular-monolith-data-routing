import { createBrowserRouter } from 'react-router';
import RootLayout from '../shared/layouts/RootLayout.tsx';
import NotFound from '../shared/components/NotFound.tsx';
import ErrorBoundary from '../shared/components/ErrorBoundary.tsx';
import { RoleGuard, type UserRole } from '../shared/auth/index.ts';

import authRoutes from '../modules/auth/routes.ts';
import dashboardRoutes from '../modules/dashboard/routes.ts';
import productRoutes from '../modules/products/routes.ts';
import userRoutes from '../modules/users/routes.ts';
import settingsRoutes from '../modules/settings/routes.ts';

/**
 * Helper — wraps children in a role-guarded layout route.
 * Unauthenticated users are redirected to /auth/login.
 * Authenticated users without the required role see a 403 page.
 */
function withRoles(roles: UserRole[]) {
  return { element: <RoleGuard roles={roles} /> };
}

/**
 * Root route configuration — composes module routes.
 * Each module defines its own route subtree in its routes.ts file.
 * This file only handles composition, guards, and the app shell.
 */
const router = createBrowserRouter([
  // ─── Auth Module (public, no sidebar layout) ──────────
  { ...authRoutes, ErrorBoundary },

  // ─── Authenticated Shell ──────────────────────────────
  {
    path: '/',
    Component: RootLayout,
    ErrorBoundary,
    children: [
      // ─── Dashboard (all authenticated roles) ──────────
      { ...withRoles(['admin', 'editor', 'viewer']), children: [dashboardRoutes] },

      // ─── Products (admin + editor) ────────────────────
      { ...withRoles(['admin', 'editor']), children: [productRoutes] },

      // ─── Users (admin only) ───────────────────────────
      { ...withRoles(['admin']), children: [userRoutes] },

      // ─── Settings (admin + editor) ────────────────────
      { ...withRoles(['admin', 'editor']), children: [settingsRoutes] },

      // ─── UI Showcase (dev only) ─────────────────────
      { path: 'ui', lazy: () => import('../shared/ui/pages/UIShowcase.tsx') },

      // ─── Home (default redirect) ──────────────────────
      { index: true, lazy: () => import('../modules/dashboard/pages/DashboardHome.tsx') },

      // ─── 404 Catch-all ────────────────────────────────
      { path: '*', Component: NotFound },
    ],
  },
]);

export default router;
