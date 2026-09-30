import { useAuth } from '@/contexts/AuthContext';
import { AdminDashboard } from './Dashboards/AdminDashboard';
import { DesignerDashboard } from './Dashboards/DesignerDashboard';
import { ProjectManagerDashboard } from './Dashboards/ProjectManagerDashboard';
import { SiteManagerDashboard } from './Dashboards/SiteManagerDashboard';
import { AccountsDashboard } from './Dashboards/AccountsDashboard';
import { SalesDashboard } from './Dashboards/SalesDashboard';

export function Dashboard() {
  const { user } = useAuth();

  switch (user?.role) {
    case 'Designer':
      return <DesignerDashboard />;
    case 'Project Manager':
      return <ProjectManagerDashboard />;
    case 'Site Manager':
      return <SiteManagerDashboard />;
    case 'Accounts':
      return <AccountsDashboard />;
    case 'Sales':
      return <SalesDashboard />;
    case 'Admin / Owner':
    default:
      return <AdminDashboard />;
  }
}
