import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PermissionRoute } from '@/components/auth/PermissionRoute';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { SettingsLayout } from './pages/Settings/SettingsLayout';
import { GeneralSettings } from './pages/Settings/GeneralSettings';
import { CompanySettings } from './pages/Settings/CompanySettings';
import { TeamSettings } from './pages/Settings/TeamSettings';
import { ProjectSettings } from './pages/Settings/ProjectSettings';
import { LeadSettings } from './pages/Settings/LeadSettings';
import { TaskSettings } from './pages/Settings/TaskSettings';
import { MaterialsSettings } from './pages/Settings/MaterialsSettings';
import { FinanceSettings } from './pages/Settings/FinanceSettings';
import { NotificationSettings } from './pages/Settings/NotificationSettings';
import { ProfileSettings } from './pages/Settings/ProfileSettings';
import { ActivityPage } from './pages/Activity/ActivityPage';
import { CalendarDashboard } from './pages/Calendar/CalendarDashboard';
import { EventDetails } from './pages/Calendar/EventDetails';
import { AnalyticsDashboard } from './pages/Analytics/AnalyticsDashboard';
import { ProjectAnalytics } from './pages/Analytics/ProjectAnalytics';
import { FinanceAnalytics } from './pages/Analytics/FinanceAnalytics';
import { SalesAnalytics } from './pages/Analytics/SalesAnalytics';
import { TeamAnalytics } from './pages/Analytics/TeamAnalytics';
import { ProcurementAnalytics } from './pages/Analytics/ProcurementAnalytics';
import { ClientsList } from './pages/Clients/ClientsList';
import { ClientDetails } from './pages/Clients/ClientDetails';
import { DocumentsList } from './pages/Documents/DocumentsList';
import { DocumentDetails } from './pages/Documents/DocumentDetails';
import { ProjectDocuments } from './pages/Documents/ProjectDocuments';
import { Messages } from './pages/Messages/Messages';
import { Conversation } from './pages/Messages/Conversation';
import { Notifications } from './pages/Notifications/Notifications';
import { MainLayout } from './layouts/MainLayout';


import { Dashboard } from './pages/Dashboard';
import { NotFound } from './pages/NotFound';
import { Login } from './pages/Auth/Login';
import { ForgotPassword } from './pages/Auth/ForgotPassword';
import { LeadsList } from './pages/Leads/LeadsList';
import { LeadDetails } from './pages/Leads/LeadDetails';
import { ProjectsList } from './pages/Projects/ProjectsList';
import { ProjectDetails } from './pages/Projects/ProjectDetails';
import { DesignStudioList } from './pages/DesignStudio/DesignStudioList';
import { DesignWorkspace } from './pages/DesignStudio/DesignWorkspace';
import { ClientApproval } from './pages/DesignStudio/ClientApproval';
import { SiteManagementList } from './pages/SiteManagement/SiteManagementList';
import { SiteWorkspace } from './pages/SiteManagement/SiteWorkspace';
import { SiteVisits } from './pages/SiteManagement/SiteVisits';
import { SiteIssues } from './pages/SiteManagement/SiteIssues';
import { SiteSnags } from './pages/SiteManagement/SiteSnags';
import { MaterialsList } from './pages/Materials/MaterialsList';
import { VendorsList } from './pages/Materials/VendorsList';
import { PurchaseOrdersList } from './pages/Materials/PurchaseOrdersList';
import { PurchaseOrderDetails } from './pages/Materials/PurchaseOrderDetails';
import { DeliveriesList } from './pages/Materials/DeliveriesList';
import { ProjectMaterials } from './pages/Materials/ProjectMaterials';
import { FinanceDashboard } from './pages/Finance/FinanceDashboard';
import { QuotationsList } from './pages/Finance/QuotationsList';
import { QuotationDetails } from './pages/Finance/QuotationDetails';
import { InvoicesList } from './pages/Finance/InvoicesList';
import { InvoiceDetails } from './pages/Finance/InvoiceDetails';
import { PaymentsList } from './pages/Finance/PaymentsList';
import { ExpensesList } from './pages/Finance/ExpensesList';
import { VendorPaymentsList } from './pages/Finance/VendorPaymentsList';
import { ProjectFinance } from './pages/Finance/ProjectFinance';
import { TeamDashboard } from './pages/Team/TeamDashboard';
import { EmployeeDetails } from './pages/Team/EmployeeDetails';
import { TasksList } from './pages/Team/TasksList';
import { TaskDetails } from './pages/Team/TaskDetails';
import { Workload } from './pages/Team/Workload';
import { RolesPermissions } from './pages/Team/RolesPermissions';


function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected Application Routes (MainLayout enforces auth) */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            
            {/* Future Module Placeholders */}
            <Route path="projects" element={<PermissionRoute permission="projects.view"><ProjectsList /></PermissionRoute>} />
            <Route path="projects/:id" element={<PermissionRoute permission="projects.view"><ProjectDetails /></PermissionRoute>} />
            <Route path="leads" element={<PermissionRoute permission="leads.view"><LeadsList /></PermissionRoute>} />
            <Route path="leads/:id" element={<PermissionRoute permission="leads.view"><LeadDetails /></PermissionRoute>} />
            
            <Route path="clients" element={<PermissionRoute permission="clients.view"><ClientsList /></PermissionRoute>} />
            <Route path="clients/:id" element={<PermissionRoute permission="clients.view"><ClientDetails /></PermissionRoute>} />

            <Route path="design-studio" element={<DesignStudioList />} />
            <Route path="design-studio/:projectId" element={<PermissionRoute permission="design.view"><DesignWorkspace /></PermissionRoute>} />
            <Route path="design-studio/:projectId/approval" element={<PermissionRoute permission="design.view"><ClientApproval /></PermissionRoute>} />
            
            <Route path="site-management" element={<SiteManagementList />} />
            <Route path="site-management/:projectId" element={<PermissionRoute permission="site.view"><SiteWorkspace /></PermissionRoute>} />
            <Route path="site-management/:projectId/visits" element={<SiteVisits />} />
            <Route path="site-management/:projectId/issues" element={<SiteIssues />} />
            <Route path="site-management/:projectId/snags" element={<SiteSnags />} />
            
            <Route path="materials" element={<PermissionRoute permission="materials.view"><MaterialsList /></PermissionRoute>} />
            <Route path="materials/:projectId" element={<PermissionRoute permission="materials.view"><ProjectMaterials /></PermissionRoute>} />
            <Route path="materials/vendors" element={<PermissionRoute permission="materials.purchase"><VendorsList /></PermissionRoute>} />
            <Route path="materials/purchase-orders" element={<PermissionRoute permission="materials.purchase"><PurchaseOrdersList /></PermissionRoute>} />
            <Route path="materials/purchase-orders/:id" element={<PurchaseOrderDetails />} />
            <Route path="materials/deliveries" element={<DeliveriesList />} />
            
            <Route path="team" element={<PermissionRoute permission="team.view"><TeamDashboard /></PermissionRoute>} />
            <Route path="team/roles" element={<PermissionRoute permission="system.settings"><RolesPermissions /></PermissionRoute>} />
            <Route path="team/:employeeId" element={<PermissionRoute permission="team.view"><EmployeeDetails /></PermissionRoute>} />
            <Route path="team/tasks" element={<PermissionRoute permission="tasks.view"><TasksList /></PermissionRoute>} />
            <Route path="team/tasks/:taskId" element={<TaskDetails />} />
            <Route path="team/workload" element={<PermissionRoute permission="team.manage"><Workload /></PermissionRoute>} />
                        <Route path="finance" element={<PermissionRoute permission="finance.view"><FinanceDashboard /></PermissionRoute>} />
            <Route path="finance/quotations" element={<QuotationsList />} />
            <Route path="finance/quotations/:id" element={<QuotationDetails />} />
            <Route path="finance/invoices" element={<PermissionRoute permission="finance.view"><InvoicesList /></PermissionRoute>} />
            <Route path="finance/invoices/:id" element={<InvoiceDetails />} />
            <Route path="finance/payments" element={<PermissionRoute permission="finance.view"><PaymentsList /></PermissionRoute>} />
            <Route path="finance/expenses" element={<PermissionRoute permission="finance.view"><ExpensesList /></PermissionRoute>} />
            <Route path="finance/vendor-payments" element={<PermissionRoute permission="finance.view"><VendorPaymentsList /></PermissionRoute>} />
            <Route path="finance/projects/:projectId" element={<PermissionRoute permission="finance.view"><ProjectFinance /></PermissionRoute>} />
            
            <Route path="documents" element={<PermissionRoute permission="documents.view"><DocumentsList /></PermissionRoute>} />
            <Route path="documents/:id" element={<PermissionRoute permission="documents.view"><DocumentDetails /></PermissionRoute>} />
            <Route path="projects/:projectId/documents" element={<PermissionRoute permission="documents.view"><ProjectDocuments /></PermissionRoute>} />

            
            <Route path="messages" element={<PermissionRoute permission="messages.view"><Messages /></PermissionRoute>} />
            <Route path="messages/:id" element={<PermissionRoute permission="messages.view"><Conversation /></PermissionRoute>} />

            
            <Route path="notifications" element={<PermissionRoute permission="notifications.view"><Notifications /></PermissionRoute>} />

            
            
            {/* Calendar Routes */}
            <Route path="calendar" element={<PermissionRoute permission="calendar.view"><CalendarDashboard /></PermissionRoute>} />
            <Route path="calendar/event/:eventId" element={<PermissionRoute permission="calendar.view"><EventDetails /></PermissionRoute>} />

            {/* Analytics Routes */}
            <Route path="analytics" element={<PermissionRoute permission="dashboard.view"><AnalyticsDashboard /></PermissionRoute>} />
            <Route path="analytics/projects" element={<PermissionRoute permission="dashboard.view"><ProjectAnalytics /></PermissionRoute>} />
            <Route path="analytics/finance" element={<PermissionRoute permission="finance.view"><FinanceAnalytics /></PermissionRoute>} />
            <Route path="analytics/sales" element={<PermissionRoute permission="leads.view"><SalesAnalytics /></PermissionRoute>} />
            <Route path="analytics/team" element={<PermissionRoute permission="team.view"><TeamAnalytics /></PermissionRoute>} />
            <Route path="analytics/procurement" element={<PermissionRoute permission="materials.view"><ProcurementAnalytics /></PermissionRoute>} />

            
            
            {/* Activity Routes */}
            <Route path="activity" element={<PermissionRoute permission="activity.view"><ActivityPage /></PermissionRoute>} />

            {/* Settings Routes */}
            <Route path="settings" element={<PermissionRoute permission="settings.view"><SettingsLayout /></PermissionRoute>}>
              <Route index element={<PermissionRoute permission="system.settings"><GeneralSettings /></PermissionRoute>} />
              <Route path="company" element={<PermissionRoute permission="company.manage"><CompanySettings /></PermissionRoute>} />
              <Route path="team" element={<PermissionRoute permission="team.manage"><TeamSettings /></PermissionRoute>} />
              <Route path="projects" element={<PermissionRoute permission="system.settings"><ProjectSettings /></PermissionRoute>} />
              <Route path="leads" element={<PermissionRoute permission="system.settings"><LeadSettings /></PermissionRoute>} />
              <Route path="tasks" element={<PermissionRoute permission="system.settings"><TaskSettings /></PermissionRoute>} />
              <Route path="materials" element={<PermissionRoute permission="system.settings"><MaterialsSettings /></PermissionRoute>} />
              <Route path="finance" element={<PermissionRoute permission="system.settings"><FinanceSettings /></PermissionRoute>} />
              <Route path="notifications" element={<PermissionRoute permission="settings.view"><NotificationSettings /></PermissionRoute>} />
              <Route path="profile" element={<PermissionRoute permission="settings.view"><ProfileSettings /></PermissionRoute>} />
            </Route>

                        
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
      </ThemeProvider>
  );
}

export default App;
