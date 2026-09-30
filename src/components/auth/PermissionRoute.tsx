import type { ReactNode } from 'react';
import { usePermissions } from '@/hooks/usePermissions';
import { type Permission } from '@/lib/permissions';
import { AccessDenied } from '@/pages/AccessDenied';

interface PermissionRouteProps {
  permission?: Permission;
  any?: Permission[];
  children: ReactNode;
}

export function PermissionRoute({ permission, any, children }: PermissionRouteProps) {
  const { can, canAny } = usePermissions();

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
