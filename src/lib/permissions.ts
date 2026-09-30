export type Permission = 
  // Global
  | 'dashboard.view'
  
  // Leads
  | 'leads.view'
  | 'leads.create'
  | 'leads.edit'
  | 'leads.delete'
  
  // Projects
  | 'projects.view'
  | 'projects.create'
  | 'projects.edit'
  | 'projects.delete'
  
  // Design
  | 'design.view'
  | 'design.edit'
  | 'design.approve'
  
  // Site
  | 'site.view'
  | 'site.update'
  
  // Materials
  | 'materials.view'
  | 'materials.purchase'
  
  // Finance
  | 'finance.view'
  | 'finance.create'
  
  // Team
  | 'team.view'
  | 'team.manage'
  
  // System
  | 'system.settings'
  | 'settings.view'
  | 'company.manage'
  | 'activity.view'
  | 'activity.manage'

  // Tasks
  | 'tasks.view'
  | 'tasks.create'
  | 'tasks.assign'
  | 'tasks.edit'
  | 'tasks.delete'
  
  // Clients
  | 'clients.view'
  | 'clients.create'
  | 'clients.manage'

  // Documents
  | 'documents.view'
  | 'documents.manage'
  
  // Messages
  | 'messages.view'
  | 'messages.send'
  
  // Notifications
  | 'notifications.view'

  // Calendar
  | 'calendar.view'
  | 'calendar.create'
  | 'calendar.manage';

export type RolePermissions = {
  [key: string]: Permission[];
};

export const ROLE_PERMISSIONS: RolePermissions = {
  'Admin / Owner': [
    'dashboard.view', 'clients.view', 'clients.create', 'clients.manage',
    'leads.view', 'leads.create', 'leads.edit', 'leads.delete',
    'projects.view', 'projects.create', 'projects.edit', 'projects.delete',
    'design.view', 'design.edit', 'design.approve',
    'site.view', 'site.update',
    'materials.view', 'materials.purchase',
    'finance.view', 'finance.create',
    'team.view', 'team.manage',
    'system.settings', 'settings.view', 'activity.view', 'company.manage', 'activity.view', 'activity.manage',
    'tasks.view', 'tasks.create', 'tasks.assign', 'tasks.edit', 'tasks.delete',
    'documents.view', 'documents.manage',
    'messages.view', 'messages.send',
    'notifications.view', 'settings.view', 'activity.view',
    'calendar.view', 'calendar.create', 'calendar.manage'
  ],
  'Designer': [
    'dashboard.view',
    'projects.view',
    'design.view', 'design.edit',
    'materials.view',
    'tasks.view', 'tasks.edit',
    'documents.view', 'documents.manage',
    'messages.view', 'messages.send',
    'notifications.view', 'settings.view', 'activity.view',
    'calendar.view', 'calendar.create', 'calendar.manage'
  ],
  'Project Manager': [
    'dashboard.view', 'clients.view',
    'projects.view', 'projects.edit',
    'design.view',
    'site.view', 'site.update',
    'materials.view', 'materials.purchase',
    'finance.view',
    'team.view',
    'tasks.view', 'tasks.create', 'tasks.assign', 'tasks.edit',
    'documents.view', 'documents.manage',
    'messages.view', 'messages.send',
    'notifications.view', 'settings.view', 'activity.view',
    'calendar.view', 'calendar.create', 'calendar.manage'
  ],
  'Site Manager': [
    'dashboard.view',
    'projects.view',
    'site.view', 'site.update',
    'materials.view',
    'tasks.view', 'tasks.edit',
    'documents.view', 'documents.manage',
    'messages.view', 'messages.send',
    'notifications.view', 'settings.view', 'activity.view',
    'calendar.view', 'calendar.create', 'calendar.manage'
  ],
  'Accounts': [
    'dashboard.view',
    'projects.view',
    'finance.view', 'finance.create',
    'tasks.view', 'tasks.edit',
    'documents.view', 'documents.manage',
    'messages.view', 'messages.send',
    'notifications.view', 'settings.view', 'activity.view',
    'calendar.view', 'calendar.create', 'calendar.manage'
  ],
  'Sales': [
    'dashboard.view', 'clients.view', 'clients.create', 'clients.manage',
    'leads.view', 'leads.create', 'leads.edit',
    'projects.view',
    'tasks.view', 'tasks.edit',
    'documents.view', 'documents.manage',
    'messages.view', 'messages.send',
    'notifications.view', 'settings.view', 'activity.view',
    'calendar.view', 'calendar.create', 'calendar.manage'
  ],
};

// We will update the user parameter to allow any to support Client which doesn't have assignedProjects
export function hasPermission(role: string, permission: Permission): boolean {
  if (role === 'Admin / Owner') return true;
  
  const permissions = ROLE_PERMISSIONS[role] || [];
  return permissions.includes(permission);
}

export function canAccessProject(user: any, projectId: string): boolean {
  if (!user) return false;
  if (user.role === 'Admin / Owner') return true;
  
  if (user.role === 'Designer' || user.role === 'Site Manager' || user.role === 'Project Manager') {
    return user.assignedProjects.includes(projectId);
  }
  
  if (user.role === 'Accounts' || user.role === 'Sales') {
    return true; 
  }
  
  return false;
}
