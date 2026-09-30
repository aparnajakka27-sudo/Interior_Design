import { History } from 'lucide-react';
import { Calendar } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { usePermissions } from '@/hooks/usePermissions';
import { type Permission } from '@/lib/permissions';
import { 
  LayoutDashboard, FolderKanban, Users, Building2, 
  Paintbrush, HardHat, Package, CheckSquare, 
  Wallet,
  BarChart3, Settings, TrendingUp,
  Receipt, IndianRupee, CreditCard, Shield, MessageSquare, FileText
} from 'lucide-react';

type NavItem = {
  name: string;
  path: string;
  icon: any;
  permission?: Permission;
};

type NavGroup = {
  title: string;
  items: NavItem[];
};

const navGroups: NavGroup[] = [
  {
    title: 'MAIN',
    items: [
      { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, permission: 'dashboard.view' },
      
      { name: 'Leads', path: '/leads', icon: Users, permission: 'leads.view' },
      { name: 'Clients', path: '/clients', icon: Users, permission: 'clients.view' },
      { name: 'Projects', path: '/projects', icon: FolderKanban, permission: 'projects.view' },
    ]
  },
  {
    title: 'DESIGN & EXECUTION',
    items: [
      { name: 'Design Studio', path: '/design-studio', icon: Paintbrush, permission: 'design.view' },
      { name: 'Site Management', path: '/site-management', icon: HardHat, permission: 'site.view' },
      { name: 'Materials', path: '/materials', icon: Package, permission: 'materials.view' },
    ]
  },
  {
    title: 'FINANCE & ACCOUNTS',
    items: [
      { name: 'Finance Overview', path: '/finance', icon: Wallet, permission: 'finance.view' },
      { name: 'Invoices', path: '/finance/invoices', icon: Receipt, permission: 'finance.view' },
      { name: 'Payments', path: '/finance/payments', icon: IndianRupee, permission: 'finance.view' },
      { name: 'Expenses', path: '/finance/expenses', icon: CreditCard, permission: 'finance.view' },
      { name: 'Vendor Payments', path: '/finance/vendor-payments', icon: Building2, permission: 'finance.view' },
    ]
  },
  {
    title: 'TEAM & TASKS',
    items: [
      { name: 'Team Directory', path: '/team', icon: Users, permission: 'team.view' },
      { name: 'Tasks', path: '/team/tasks', icon: CheckSquare, permission: 'tasks.view' },
      { name: 'Workload', path: '/team/workload', icon: BarChart3, permission: 'team.manage' },
    ]
  },
  
  {
    title: 'COMMUNICATION & FILES',
    items: [
      { name: 'Messages', path: '/messages', icon: MessageSquare, permission: 'messages.view' },
      { name: 'Documents', path: '/documents', icon: FileText, permission: 'documents.view' },
    ]
  },
  
  
  {
    title: 'CALENDAR',
    items: [
      { name: 'Calendar', path: '/calendar', icon: Calendar, permission: 'calendar.view' },
    ]
  },
  {
    title: 'ANALYTICS',
    items: [
      { name: 'Analytics Overview', path: '/analytics', icon: BarChart3, permission: 'dashboard.view' },
      { name: 'Project Analytics', path: '/analytics/projects', icon: FolderKanban, permission: 'dashboard.view' },
      { name: 'Finance Analytics', path: '/analytics/finance', icon: IndianRupee, permission: 'finance.view' },
      { name: 'Sales Analytics', path: '/analytics/sales', icon: TrendingUp, permission: 'leads.view' },
      { name: 'Team Analytics', path: '/analytics/team', icon: Users, permission: 'team.view' },
      { name: 'Procurement Analytics', path: '/analytics/procurement', icon: Package, permission: 'materials.view' },
    ]
  },
  {
    title: 'SYSTEM',
    items: [
      { name: 'Roles & Permissions', path: '/team/roles', icon: Shield, permission: 'system.settings' },
      { name: 'Activity', path: '/activity', icon: History, permission: 'activity.view' },
      { name: 'Settings', path: '/settings', icon: Settings, permission: 'settings.view' },
    ]
  }

];

export function Sidebar({ className, onNavClick }: { className?: string, onNavClick?: () => void }) {
  const { can } = usePermissions();
  const location = useLocation();
  const navigate = useNavigate();

  // Filter groups and items based on permissions
  const visibleGroups = navGroups.map(group => {
    return {
      ...group,
      items: group.items.filter(item => !item.permission || can(item.permission))
    };
  }).filter(group => group.items.length > 0);

  return (
    <aside className={cn("flex flex-col h-full bg-sidebar border-r border-border", className)}>
      <div className="h-16 flex items-center px-6 border-b border-border shrink-0">
        <div className="flex flex-col">
          <span className="text-primary font-bold tracking-widest text-sm leading-tight">DECORMART</span>
          <span className="text-secondary tracking-widest text-[10px] leading-tight">STUDIO</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 px-3 custom-scrollbar">
        {visibleGroups.map((group, i) => (
          <div key={i} className="mb-6">
            <h4 className="px-3 mb-2 text-xs font-semibold text-muted tracking-wider">
              {group.title}
            </h4>
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);
                const Icon = item.icon;
                
                return (
                  <a
                      key={item.path}
                      href={item.path}
                      onClick={(e) => { e.preventDefault(); if (onNavClick) onNavClick(); navigate(item.path); }}
                      className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive 
                        ? "bg-accent/10 text-accent" 
                        : "text-secondary hover:text-primary hover:bg-elevated"
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {item.name}
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
