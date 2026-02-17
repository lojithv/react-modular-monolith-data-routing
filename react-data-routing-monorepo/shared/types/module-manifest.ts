import type { RouteObject } from 'react-router';
import type { UserRole } from '@shared/auth/index.ts';

export interface SidebarItem {
  to: string;
  label: string;
  roles?: UserRole[];
}

/**
 * Each feature module exports a manifest describing its public surface.
 * The app shell reads these manifests to compose routing, navigation,
 * and access control — making module registration declarative.
 *
 * When migrating to microfrontends, each remote exposes its manifest
 * via Module Federation and the shell consumes them dynamically.
 */
export interface ModuleManifest {
  /** Unique module identifier */
  name: string;
  /** Route subtree for this module */
  routes: RouteObject;
  /** Sidebar navigation items this module contributes */
  sidebar?: SidebarItem[];
  /** Roles that may access this module (empty = public) */
  allowedRoles?: UserRole[];
}
