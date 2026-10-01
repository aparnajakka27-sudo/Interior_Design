import { useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { hasPermission, type Permission, canAccessProject } from '@/lib/permissions';

export function usePermissions() {
  const { user } = useAuth();

  const can = useCallback((permission: Permission) => {
    return hasPermission(user?.role || '', permission);
  }, [user?.role]);

  const canAny = useCallback((permissions: Permission[]) => {
    return permissions.some(p => hasPermission(user?.role || '', p));
  }, [user?.role]);

  const canAll = useCallback((permissions: Permission[]) => {
    return permissions.every(p => hasPermission(user?.role || '', p));
  }, [user?.role]);

  const canAccessProjectContext = useCallback((projectId: string) => {
    return canAccessProject(user, projectId);
  }, [user]);

  return {
    can,
    canAny,
    canAll,
    canAccessProject: canAccessProjectContext,
    role: user?.role
  };
}
