import { useAuth } from '@/contexts/AuthContext';
import { hasPermission, type Permission, canAccessProject } from '@/lib/permissions';

export function usePermissions() {
  const { user } = useAuth();

  const can = (permission: Permission) => {
    return hasPermission(user?.role || '', permission);
  };

  const canAny = (permissions: Permission[]) => {
    return permissions.some(p => hasPermission(user?.role || '', p));
  };

  const canAll = (permissions: Permission[]) => {
    return permissions.every(p => hasPermission(user?.role || '', p));
  };

  const canAccessProjectContext = (projectId: string) => {
    return canAccessProject(user, projectId);
  };

  return {
    can,
    canAny,
    canAll,
    canAccessProject: canAccessProjectContext,
    role: user?.role
  };
}
