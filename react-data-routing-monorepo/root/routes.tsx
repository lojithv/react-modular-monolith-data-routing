import { createBrowserRouter } from 'react-router';
import RootLayout from '../shared/layouts/RootLayout.tsx';
import NotFound from '../shared/components/NotFound.tsx';
import ErrorBoundary from '../shared/components/ErrorBoundary.tsx';
import {
  RoleGuard,
  FeatureGuard,
  SubscriptionGuard,
  TrialGuard,
  type UserRole,
  type PlanTier,
  type FeatureFlag,
} from '../shared/auth/index.ts';

import authRoutes from '../modules/auth/routes.ts';
import dashboardRoutes from '../modules/dashboard/routes.ts';
import productRoutes from '../modules/products/routes.ts';
import userRoutes from '../modules/users/routes.ts';
import settingsRoutes from '../modules/settings/routes.ts';

// ─── Guard Helpers ──────────────────────────────────────
// Wrap module routes with pathless layout routes that enforce access rules.

function withRoles(roles: UserRole[]) {
  return { element: <RoleGuard roles={roles} /> };
}

function withFeatures(features: FeatureFlag[]) {
  return { element: <FeatureGuard features={features} /> };
}

function withPlan(minPlan: PlanTier) {
  return { element: <SubscriptionGuard minPlan={minPlan} /> };
}

function withTrial() {
  return { element: <TrialGuard /> };
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
      // ─── Dashboard (all roles, free tier OK) ──────────
      {
        ...withRoles(['admin', 'editor', 'viewer']),
        children: [dashboardRoutes],
      },

      // ─── Products (admin + editor, requires starter+) ─
      {
        ...withRoles(['admin', 'editor']),
        children: [
          {
            ...withPlan('starter'),
            children: [productRoutes],
          },
        ],
      },

      // ─── Users (admin only, requires pro+) ────────────
      {
        ...withRoles(['admin']),
        children: [
          {
            ...withPlan('pro'),
            children: [userRoutes],
          },
        ],
      },

      // ─── Settings (admin + editor) ────────────────────
      { ...withRoles(['admin', 'editor']), children: [settingsRoutes] },

      // ─── UI Showcase (dev only) ───────────────────────
      { path: 'ui', lazy: () => import('../shared/ui/pages/UIShowcase.tsx') },

      // ─── Home (default redirect) ──────────────────────
      { index: true, lazy: () => import('../modules/dashboard/pages/DashboardHome.tsx') },

      // ─── 404 Catch-all ────────────────────────────────
      { path: '*', Component: NotFound },
    ],
  },
]);

export default router;

// Re-export helpers so modules can use them in their own routes.ts if needed
export { withRoles, withFeatures, withPlan, withTrial };
