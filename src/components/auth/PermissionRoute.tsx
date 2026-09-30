import type { ReactNode } from 'react';
import { usePermissions } from '@/hooks/usePermissions';
import { type Permission } from '@/lib/permissions';
import { AccessDenied } from '@/pages/AccessDenied';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface PermissionRouteProps {
  permission?: Permission;
  any?: Permission[];
  children: ReactNode;
}

export function PermissionRoute({ permission, any, children }: PermissionRouteProps) {
  const { can, canAny } = usePermissions();
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="h-full w-full flex items-center justify-center bg-background min-h-[50vh]"><div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div></div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  let hasAccess = false;

  if (permission && can(permission)) {
    hasAccess = true;
  } else if (any && canAny(any)) {
    hasAccess = true;
  } else if (!permission && !any) {
    hasAccess = true; // No permissions required
  }

  if (hasAccess) {
    return <>{children}</>;
  }

  return <AccessDenied />;
}
