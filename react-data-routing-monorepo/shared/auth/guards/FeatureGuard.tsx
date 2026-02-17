import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from '../hooks/useAuth.ts';
import type { FeatureFlag } from '../models/auth.types.ts';
import FeatureUnavailable from '../../components/FeatureUnavailable.tsx';

interface FeatureGuardProps {
  features: FeatureFlag[];
}

/**
 * Route guard that checks for required feature flags.
 * - Not authenticated → redirect to /auth/login
 * - Missing feature flag → render FeatureUnavailable page
 * - All flags present → render child routes
 */
export default function FeatureGuard({ features }: FeatureGuardProps) {
  const { isAuthenticated, hasFeature } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location.pathname }} replace />;
  }

  if (!hasFeature(features)) {
    return <FeatureUnavailable features={features} />;
  }

  return <Outlet />;
}
