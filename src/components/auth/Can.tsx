import type { ReactNode } from 'react';
import { usePermissions } from '@/hooks/usePermissions';
import { type Permission } from '@/lib/permissions';

interface CanProps {
  permission?: Permission;
  any?: Permission[];
  all?: Permission[];
  children: ReactNode;
  fallback?: ReactNode;
}

export function Can({ permission, any, all, children, fallback = null }: CanProps) {
  const { can, canAny, canAll } = usePermissions();

  let hasAccess = false;

  if (permission && can(permission)) {
    hasAccess = true;
  }
  if (any && canAny(any)) {
    hasAccess = true;
  }
  if (all && canAll(all)) {
    hasAccess = true;
  }

  if (hasAccess) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
}
