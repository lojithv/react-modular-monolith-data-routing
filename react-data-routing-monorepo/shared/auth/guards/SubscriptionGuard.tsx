import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from '../hooks/useAuth.ts';
import type { PlanTier } from '../models/auth.types.ts';
import Paywall from '../../components/Paywall.tsx';

interface SubscriptionGuardProps {
  minPlan: PlanTier;
}

/**
 * Route guard that enforces a minimum subscription plan.
 * - Not authenticated → redirect to /auth/login
 * - Plan too low → render Paywall upgrade page
 * - Plan sufficient → render child routes
 */
export default function SubscriptionGuard({ minPlan }: SubscriptionGuardProps) {
  const { isAuthenticated, hasPlan } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location.pathname }} replace />;
  }

  if (!hasPlan(minPlan)) {
    return <Paywall requiredPlan={minPlan} />;
  }

  return <Outlet />;
}
