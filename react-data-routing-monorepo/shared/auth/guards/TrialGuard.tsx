import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from '../hooks/useAuth.ts';
import TrialExpired from '../../components/TrialExpired.tsx';

/**
 * Route guard that requires an active trial or paid plan.
 * - Not authenticated → redirect to /auth/login
 * - Trial expired and on free plan → render TrialExpired page
 * - Trial active or on paid plan → render child routes
 */
export default function TrialGuard() {
  const { isAuthenticated, isTrialActive, hasPlan } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location.pathname }} replace />;
  }

  if (!isTrialActive() && !hasPlan('starter')) {
    return <TrialExpired />;
  }

  return <Outlet />;
}
