import { useState } from 'react';
import { Link } from '@/components/ui/Link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Label } from '@/components/ui/Label';
import { Plus, Search, Filter, Users, Briefcase, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { initialEmployees, initialTasks, detailedProjects, type EmployeeStatus } from '@/lib/mock-data';

export function TeamDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getProjectName = (id: string) => detailedProjects.find(p => p.id === id)?.name || id;

  const filteredEmployees = initialEmployees.filter(emp => 
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeEmployeesCount = initialEmployees.filter(e => e.status === 'Active').length;
  const onProjectsCount = initialEmployees.filter(e => e.assignedProjects.length > 0).length;
  const dueTodayTasks = initialTasks.filter(t => t.dueDate.includes('Sep')).length; // Mapped loosely
  const overdueTasks = initialTasks.filter(t => t.status !== 'Completed' && t.dueDate === '12 Sep 2026').length;
  const capacityCount = initialEmployees.length - onProjectsCount + 2; // Demo logic

  const KPIs = [
    { title: 'Total Employees', value: initialEmployees.length, icon: Users, color: 'text-primary' },
    { title: 'Active Employees', value: activeEmployeesCount, icon: CheckCircle2, color: 'text-emerald-400' },
    { title: 'On Projects', value: onProjectsCount, icon: Briefcase, color: 'text-accent' },
    { title: 'Tasks Due Today', value: dueTodayTasks, icon: Clock, color: 'text-amber-400' },
    { title: 'Overdue Tasks', value: overdueTasks, icon: AlertCircle, color: 'text-red-400' },
    { title: 'Available Capacity', value: capacityCount, icon: Users, color: 'text-secondary' },
  ];

  const getStatusBadge = (status: EmployeeStatus) => {
    switch(status) {
      case 'Active': return <Badge variant="success">Active</Badge>;
      case 'Away': return <Badge variant="warning">Away</Badge>;
      case 'Inactive': return <Badge variant="neutral">Inactive</Badge>;
      default: return <Badge variant="neutral">{status}</Badge>;
    }
  };

  const getWorkload = (empId: string) => {
    const tasks = initialTasks.filter(t => t.assigneeId === empId && t.status !== 'Completed');
    if (tasks.length > 5) return { label: 'Heavy', color: 'text-red-400', bg: 'bg-red-400/20' };
    if (tasks.length > 2) return { label: 'Balanced', color: 'text-emerald-400', bg: 'bg-emerald-400/20' };
    return { label: 'Low', color: 'text-amber-400', bg: 'bg-amber-400/20' };
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-primary">Team</h1>
          <p className="text-secondary mt-1 text-sm">Manage employees, assignments, workload and team activity.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/team/tasks" className="hidden sm:block"><Button variant="secondary">Create Task</Button></Link>
          <Button onClick={() => setIsModalOpen(true)}><Plus className="mr-2 h-4 w-4" /> Add Employee</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        {KPIs.map((kpi, i) => (
          <div key={i} className="bg-surface border border-border rounded-xl p-5">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-medium text-secondary">{kpi.title}</span>
              <kpi.icon className="h-4 w-4 text-muted" />
            </div>
            <p className={`text-xl font-semibold ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-surface border border-border rounded-xl p-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <Input 
            placeholder="Search employee, role or department..." 
            className="pl-9 w-full"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex w-full md:w-auto items-center gap-3 overflow-x-auto custom-scrollbar pb-1 md:pb-0">
          <select className="h-9 rounded-md border border-border bg-background px-3 py-1 text-sm text-primary appearance-none focus:outline-none focus:ring-1 focus:ring-accent min-w-[120px]">
            <option>All Roles</option>
            <option>Designer</option>
            <option>Project Manager</option>
          </select>
          <select className="h-9 rounded-md border border-border bg-background px-3 py-1 text-sm text-primary appearance-none focus:outline-none focus:ring-1 focus:ring-accent min-w-[120px]">
            <option>All Departments</option>
            <option>Management</option>
            <option>Design</option>
          </select>
          <Button variant="ghost" size="sm" className="whitespace-nowrap">
            <Filter className="mr-2 h-4 w-4" /> Clear Filters
          </Button>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden hidden md:block">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-muted uppercase bg-elevated/50 border-b border-border">
            <tr>
              <th className="px-6 py-4 font-medium">Employee</th>
              <th className="px-6 py-4 font-medium">Role & Dept</th>
              <th className="px-6 py-4 font-medium">Projects</th>
              <th className="px-6 py-4 font-medium text-center">Active Tasks</th>
              <th className="px-6 py-4 font-medium">Workload</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredEmployees.map((emp) => {
              const workload = getWorkload(emp.id);
              return (
                <tr key={emp.id} className="hover:bg-elevated/50 transition-colors">
                  <td className="px-6 py-4">
                    <Link to={`/team/${emp.id}`} className="flex items-center gap-3 group">
                      <div className="h-9 w-9 rounded-full bg-accent/20 flex items-center justify-center text-accent font-medium group-hover:bg-accent group-hover:text-background transition-colors">
                        {emp.avatarInitials}
                      </div>
                      <div>
                        <p className="font-medium text-primary group-hover:text-accent transition-colors">{emp.name}</p>
                        <p className="text-xs text-muted">{emp.email}</p>
                      </div>
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-primary">{emp.role}</p>
                    <p className="text-xs text-secondary">{emp.department}</p>
                  </td>
                  <td className="px-6 py-4 text-secondary">
                    {emp.assignedProjects.length > 0 ? (
                      <div className="flex flex-col gap-1">
                        {emp.assignedProjects.map(pid => (
                          <span key={pid} className="text-xs bg-background border border-border rounded px-2 py-0.5 w-max">
                            {getProjectName(pid)}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-muted text-xs">Unassigned</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="font-medium text-primary">{initialTasks.filter(t => t.assigneeId === emp.id && t.status !== 'Completed').length}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2 py-1 rounded-md ${workload.color} ${workload.bg}`}>
                      {workload.label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(emp.status)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 gap-4 md:hidden">
        {filteredEmployees.map(emp => {
          const workload = getWorkload(emp.id);
          return (
            <Link to={`/team/${emp.id}`} key={emp.id} className="bg-surface border border-border rounded-xl p-5 space-y-4 block hover:border-accent/50 transition-colors">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-medium">
                    {emp.avatarInitials}
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">{emp.name}</h3>
                    <p className="text-xs text-secondary mt-0.5">{emp.role}</p>
                  </div>
                </div>
                {getStatusBadge(emp.status)}
              </div>
              <div className="grid grid-cols-2 gap-y-3 text-sm text-secondary border-t border-border pt-4">
                <div><span className="text-muted block text-xs mb-1">Projects</span> <span className="text-primary font-medium">{emp.assignedProjects.length}</span></div>
                <div><span className="text-muted block text-xs mb-1">Tasks</span> <span className="text-primary font-medium">{initialTasks.filter(t => t.assigneeId === emp.id && t.status !== 'Completed').length}</span></div>
                <div><span className="text-muted block text-xs mb-1">Workload</span> <span className={`text-xs font-medium ${workload.color}`}>{workload.label}</span></div>
                <div><span className="text-muted block text-xs mb-1">Department</span> <span className="text-secondary">{emp.department}</span></div>
              </div>
            </Link>
          );
        })}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Employee" description="Register a new team member to the platform.">
        <form className="space-y-4 mt-4" onSubmit={e => { e.preventDefault(); setIsModalOpen(false); }}>
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input placeholder="e.g. Aditi Sharma" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" placeholder="name@decormart.com" />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input placeholder="+91" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Role</Label>
              <select className="flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-primary appearance-none focus:outline-none focus:ring-1 focus:ring-accent">
                <option>Designer</option>
                <option>Project Manager</option>
                <option>Site Manager</option>
                <option>Accounts</option>
                <option>Sales</option>
                <option>Admin / Owner</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Department</Label>
              <select className="flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-primary appearance-none focus:outline-none focus:ring-1 focus:ring-accent">
                <option>Design</option>
                <option>Projects</option>
                <option>Site Operations</option>
                <option>Accounts</option>
                <option>Sales</option>
                <option>Management</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Employee ID</Label>
              <Input placeholder="DM-008" />
            </div>
            <div className="space-y-2">
              <Label>Joining Date</Label>
              <Input type="date" className="text-secondary" />
            </div>
          </div>
          <div className="pt-4 flex justify-end gap-3 border-t border-border mt-6">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit">Add Employee</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
