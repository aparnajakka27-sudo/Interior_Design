import { Link } from '@/components/ui/Link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { FolderKanban, HardHat, Package, Clock, Users , Bell} from 'lucide-react';
import { UpcomingEvents } from '@/components/calendar/UpcomingEvents';
import { useAuth } from '@/contexts/AuthContext';
import { detailedProjects, initialTasks, initialEmployees } from '@/lib/mock-data';

export function ProjectManagerDashboard() {
  const { user } = useAuth();
  const firstName = user?.name?.split(' ')[0] || 'PM';

  const myProjects = detailedProjects.filter(p => user?.assignedProjects?.includes(p.id));
  const myTasks = initialTasks.filter(t => t.assigneeId === user?.id && t.status !== 'Completed');
  const projectIds = myProjects.map(p => p.id);
  const teamMembers = initialEmployees.filter(e => e.assignedProjects.some(pid => projectIds.includes(pid)) && e.id !== user?.id);

  return (
    <div className="max-w-[1400px] mx-auto space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-primary">Good morning, {firstName}</h1>
          <p className="text-secondary mt-1 text-sm">Here's the current status of your projects.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/team/tasks"><Button variant="secondary" size="sm">Create Task</Button></Link>
          <Link to="/projects"><Button size="sm">View Projects</Button></Link>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <div className="bg-surface border border-border p-4 rounded-xl text-center">
          <p className="text-2xl font-bold text-primary">{myProjects.length}</p>
          <p className="text-[10px] text-muted uppercase tracking-wider mt-1">Assigned Projects</p>
        </div>
        <div className="bg-surface border border-border p-4 rounded-xl text-center">
          <p className="text-2xl font-bold text-red-400">{myProjects.filter(p => p.health === 'At Risk').length}</p>
          <p className="text-[10px] text-muted uppercase tracking-wider mt-1">Projects At Risk</p>
        </div>
        <div className="bg-surface border border-border p-4 rounded-xl text-center">
          <p className="text-2xl font-bold text-amber-400">{myTasks.length}</p>
          <p className="text-[10px] text-muted uppercase tracking-wider mt-1">Tasks Due</p>
        </div>
        <div className="bg-surface border border-border p-4 rounded-xl text-center">
          <p className="text-2xl font-bold text-accent">2</p>
          <p className="text-[10px] text-muted uppercase tracking-wider mt-1">Pending Approvals</p>
        </div>
        <div className="bg-surface border border-border p-4 rounded-xl text-center">
          <p className="text-2xl font-bold text-emerald-400">5</p>
          <p className="text-[10px] text-muted uppercase tracking-wider mt-1">Procurement Pending</p>
        </div>
        <div className="bg-surface border border-border p-4 rounded-xl text-center">
          <p className="text-2xl font-bold text-red-400">1</p>
          <p className="text-[10px] text-muted uppercase tracking-wider mt-1">Site Issues</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="flex items-center gap-2"><FolderKanban className="h-4 w-4 text-muted"/> Project Portfolio</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 p-0">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted uppercase bg-elevated/50 border-b border-border">
                  <tr>
                    <th className="px-6 py-3 font-medium">Project</th>
                    <th className="px-6 py-3 font-medium">Progress</th>
                    <th className="px-6 py-3 font-medium">Stage</th>
                    <th className="px-6 py-3 font-medium">Health</th>
                    <th className="px-6 py-3 font-medium">Deadline</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {myProjects.map(proj => (
                    <tr key={proj.id} className="hover:bg-elevated/50">
                      <td className="px-6 py-4 font-medium text-primary">
                        <Link to={`/projects/${proj.id}`} className="hover:text-accent transition-colors">{proj.name}</Link>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-background border border-border rounded-full overflow-hidden">
                            <div className="h-full bg-accent" style={{width: `${proj.progress}%`}}></div>
                          </div>
                          <span className="text-xs text-secondary">{proj.progress}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-secondary">{proj.stage}</td>
                      <td className="px-6 py-4">
                        <Badge variant={proj.health === 'Healthy' ? 'success' : proj.health === 'Attention' ? 'warning' : 'danger'}>{proj.health}</Badge>
                      </td>
                      <td className="px-6 py-4 text-secondary">{proj.deadline}</td>
                    </tr>
                  ))}
                  {myProjects.length === 0 && <tr><td colSpan={5} className="p-6 text-center text-muted">No assigned projects.</td></tr>}
                </tbody>
              </table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="border-b border-border pb-4 flex flex-row justify-between items-center">
              <CardTitle className="flex items-center gap-2"><Users className="h-4 w-4 text-muted"/> Team Workload</CardTitle>
              <Link to="/team/workload"><Button variant="ghost" size="sm">View All</Button></Link>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {teamMembers.map(member => {
                  const memberTasks = initialTasks.filter(t => t.assigneeId === member.id && t.status !== 'Completed');
                  const isOverloaded = memberTasks.length > 5;
                  return (
                    <div key={member.id} className="flex justify-between items-center p-3 border border-border rounded-lg bg-background hover:border-accent/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs font-medium shrink-0">
                          {member.avatarInitials}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-primary">{member.name}</p>
                          <p className="text-[10px] text-muted">{member.role}</p>
                        </div>
                      </div>
                      <div className="text-right flex items-center gap-4">
                        <div className="hidden sm:block text-left">
                          <p className="text-xs font-medium text-secondary">{memberTasks.length} Active Tasks</p>
                          <div className="w-20 h-1.5 bg-surface border border-border rounded-full overflow-hidden mt-1">
                            <div className={`h-full ${isOverloaded ? 'bg-red-400' : 'bg-emerald-400'}`} style={{width: `${Math.min(memberTasks.length * 20, 100)}%`}}></div>
                          </div>
                        </div>
                        <Link to={`/team/${member.id}`}><Button variant="ghost" size="sm" className="h-7 px-2">Profile</Button></Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <UpcomingEvents />
          <Card>
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="flex items-center gap-2"><Clock className="h-4 w-4 text-muted"/> Deadlines</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="p-3 bg-surface rounded-lg border border-border">
                <p className="text-xs font-medium text-primary mb-1">Sharma Residence</p>
                <p className="text-sm text-secondary mb-2">Design Approval</p>
                <p className="text-[10px] font-medium text-amber-400">Tomorrow</p>
              </div>
              <div className="p-3 bg-surface rounded-lg border border-border">
                <p className="text-xs font-medium text-primary mb-1">Mehta Villa</p>
                <p className="text-sm text-secondary mb-2">Material Delivery</p>
                <p className="text-[10px] text-secondary">Oct 05</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="flex items-center gap-2"><HardHat className="h-4 w-4 text-muted"/> Site Status</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-secondary">Active Sites</span>
                <span className="font-medium text-primary">2</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-secondary">Today's Updates</span>
                <span className="font-medium text-primary">1</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-secondary">Open Issues</span>
                <span className="font-medium text-red-400">1</span>
              </div>
              <Link to="/site-management"><Button variant="secondary" size="sm" className="w-full mt-2">Open Site Management</Button></Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="flex items-center gap-2"><Package className="h-4 w-4 text-muted"/> Procurement</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-secondary">Pending POs</span>
                <span className="font-medium text-amber-400">3</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-secondary">In Transit</span>
                <span className="font-medium text-primary">2</span>
              </div>
              <Link to="/materials"><Button variant="ghost" size="sm" className="w-full mt-2 text-xs">View Materials</Button></Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Activity / Notifications */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2"><Bell className="h-5 w-5 text-muted"/> Recent Notifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-surface border border-border rounded-xl">
            <div className="flex justify-between items-start mb-2">
              <Badge variant="warning" className="text-[10px]">High Priority</Badge>
              <span className="text-[10px] text-muted">5 min ago</span>
            </div>
            <p className="text-sm font-medium text-primary mb-1">Client approval requested</p>
            <p className="text-xs text-secondary mb-3">Sharma Residence: Kitchen Layout V3 is awaiting your review.</p>
            <Link to="/notifications"><Button variant="ghost" size="sm" className="h-6 px-2 text-xs w-full">View Details</Button></Link>
          </div>
          <div className="p-4 bg-surface border border-border rounded-xl">
            <div className="flex justify-between items-start mb-2">
              <Badge variant="neutral" className="text-[10px]">Message</Badge>
              <span className="text-[10px] text-muted">20 min ago</span>
            </div>
            <p className="text-sm font-medium text-primary mb-1">New message in Sharma Residence</p>
            <p className="text-xs text-secondary mb-3">Rahul Sharma: "Material delivery has been received."</p>
            <Link to="/messages/CONV-001"><Button variant="ghost" size="sm" className="h-6 px-2 text-xs w-full">Open Conversation</Button></Link>
          </div>
          <div className="p-4 bg-surface border border-border rounded-xl">
            <div className="flex justify-between items-start mb-2">
              <Badge variant="neutral" className="text-[10px]">Document</Badge>
              <span className="text-[10px] text-muted">2 hrs ago</span>
            </div>
            <p className="text-sm font-medium text-primary mb-1">New document uploaded</p>
            <p className="text-xs text-secondary mb-3">Ananya Rao uploaded Kitchen Layout V3.pdf for Sharma Residence.</p>
            <Link to="/documents/DOC-001"><Button variant="ghost" size="sm" className="h-6 px-2 text-xs w-full">View Document</Button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
