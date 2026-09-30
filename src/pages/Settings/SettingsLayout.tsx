import { Outlet, NavLink, Navigate } from 'react-router-dom';
import { Settings as SettingsIcon, Building2, Users, FolderKanban, TrendingUp, CheckSquare, Package, IndianRupee, Bell, User } from 'lucide-react';
import { usePermissions } from '@/hooks/usePermissions';

export function SettingsLayout() {
  const { can } = usePermissions();
  
  if (!can('settings.view')) {
    return <Navigate to="/dashboard" replace />;
  }

  const navItems = [
    { name: 'General', path: '/settings', icon: SettingsIcon, end: true, permission: 'system.settings' },
    { name: 'Company', path: '/settings/company', icon: Building2, permission: 'company.manage' },
    { name: 'Team & Roles', path: '/settings/team', icon: Users, permission: 'team.manage' },
    { name: 'Projects', path: '/settings/projects', icon: FolderKanban, permission: 'system.settings' },
    { name: 'Leads', path: '/settings/leads', icon: TrendingUp, permission: 'system.settings' },
    { name: 'Tasks', path: '/settings/tasks', icon: CheckSquare, permission: 'system.settings' },
    { name: 'Materials', path: '/settings/materials', icon: Package, permission: 'system.settings' },
    { name: 'Finance', path: '/settings/finance', icon: IndianRupee, permission: 'system.settings' },
    { name: 'Notifications', path: '/settings/notifications', icon: Bell, permission: 'settings.view' },
    { name: 'Profile', path: '/settings/profile', icon: User, permission: 'settings.view' }
  ];

  // We'll loosen the permissions slightly for the demo so people can see the UI if they are Admin,
  // otherwise they only see what they can. 
  // 'system.settings' is given to Admin.
  
  const filteredNavItems = navItems.filter(item => {
    if (item.permission === 'settings.view') return true;
    return can('system.settings'); // Admin sees all config
  });

  return (
    <div className="max-w-[1400px] mx-auto pb-12">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-primary">Settings</h1>
        <p className="text-secondary mt-1 text-sm">Manage Decormart Studio's workspace, team and operational preferences.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Navigation Sidebar */}
        <div className="w-full lg:w-64 shrink-0">
          
          {/* Mobile Dropdown (simplified as scrollable row for demo) */}
          <div className="lg:hidden flex overflow-x-auto gap-2 pb-4 scrollbar-hide border-b border-border">
            {filteredNavItems.map(item => (
              <NavLink 
                key={item.name} 
                to={item.path}
                end={item.end}
                className={({isActive}) => `
                  whitespace-nowrap flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors
                  ${isActive ? 'bg-accent/10 text-accent border border-accent/20' : 'text-secondary hover:text-primary hover:bg-surface border border-transparent'}
                `}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex flex-col space-y-1">
            {filteredNavItems.map(item => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.end}
                className={({isActive}) => `
                  flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-colors
                  ${isActive ? 'bg-accent/10 text-accent' : 'text-secondary hover:text-primary hover:bg-surface'}
                `}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
