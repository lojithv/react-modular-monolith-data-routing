import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import type { UserRole } from '../models/auth.types';
import Forbidden from '../../components/Forbidden';

interface RoleGuardProps {
  roles: UserRole[];
}

/**
 * Route guard that checks authentication and role authorization.
 * - Not authenticated → redirect to /auth/login (preserves intended destination)
 * - Authenticated but wrong role → render 403 Forbidden
 * - Authorized → render child routes via <Outlet />
 */
export default function RoleGuard({ roles }: RoleGuardProps) {
  const { isAuthenticated, hasRole } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location.pathname }} replace />;
  }

  if (!hasRole(roles)) {
    return <Forbidden />;
  }

  return <Outlet />;
}
