import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { FolderKanban, CheckSquare, Package, MessageSquare, Clock , Bell} from 'lucide-react';
import { UpcomingEvents } from '@/components/calendar/UpcomingEvents';
import { useAuth } from '@/contexts/AuthContext';
import { detailedProjects, initialTasks } from '@/lib/mock-data';

export function DesignerDashboard() {
  const { user } = useAuth();
  const firstName = user?.name?.split(' ')[0] || 'Designer';

  const myProjects = detailedProjects.filter(p => user?.assignedProjects?.includes(p.id));
  const myTasks = initialTasks.filter(t => t.assigneeId === user?.id);
  const activeTasks = myTasks.filter(t => t.status !== 'Completed');

  return (
    <div className="max-w-[1400px] mx-auto space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-primary">Good morning, {firstName}</h1>
          <p className="text-secondary mt-1 text-sm">Here's what's happening across your design work.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/team/tasks"><Button variant="secondary" size="sm">Create Task</Button></Link>
          <Link to="/design-studio"><Button size="sm">Open Design Studio</Button></Link>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-surface border border-border p-4 rounded-xl text-center">
          <p className="text-2xl font-bold text-primary">{myProjects.length}</p>
          <p className="text-[10px] text-muted uppercase tracking-wider mt-1">Assigned Projects</p>
        </div>
        <div className="bg-surface border border-border p-4 rounded-xl text-center">
          <p className="text-2xl font-bold text-accent">3</p>
          <p className="text-[10px] text-muted uppercase tracking-wider mt-1">Active Designs</p>
        </div>
        <div className="bg-surface border border-border p-4 rounded-xl text-center">
          <p className="text-2xl font-bold text-amber-400">2</p>
          <p className="text-[10px] text-muted uppercase tracking-wider mt-1">Client Reviews</p>
        </div>
        <div className="bg-surface border border-border p-4 rounded-xl text-center">
          <p className="text-2xl font-bold text-red-400">1</p>
          <p className="text-[10px] text-muted uppercase tracking-wider mt-1">Revision Requests</p>
        </div>
        <div className="bg-surface border border-border p-4 rounded-xl text-center">
          <p className="text-2xl font-bold text-emerald-400">{activeTasks.length}</p>
          <p className="text-[10px] text-muted uppercase tracking-wider mt-1">Tasks Due</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="border-b border-border pb-4 flex flex-row justify-between items-center">
              <CardTitle className="flex items-center gap-2"><FolderKanban className="h-4 w-4 text-muted"/> My Projects</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 p-0">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted uppercase bg-elevated/50 border-b border-border">
                  <tr>
                    <th className="px-6 py-3 font-medium">Project</th>
                    <th className="px-6 py-3 font-medium">Design Stage</th>
                    <th className="px-6 py-3 font-medium">Progress</th>
                    <th className="px-6 py-3 font-medium">Deadline</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {myProjects.map(proj => (
                    <tr key={proj.id} className="hover:bg-elevated/50">
                      <td className="px-6 py-4 font-medium text-primary">
                        <Link to={`/design-studio/${proj.id}`} className="hover:text-accent transition-colors">{proj.name}</Link>
                      </td>
                      <td className="px-6 py-4 text-secondary">{proj.design.status}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-background border border-border rounded-full overflow-hidden">
                            <div className="h-full bg-accent" style={{width: `${proj.progress}%`}}></div>
                          </div>
                          <span className="text-xs text-secondary">{proj.progress}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-secondary">{proj.deadline}</td>
                    </tr>
                  ))}
                  {myProjects.length === 0 && <tr><td colSpan={4} className="p-6 text-center text-muted">No assigned projects.</td></tr>}
                </tbody>
              </table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="flex items-center gap-2"><CheckSquare className="h-4 w-4 text-muted"/> My Tasks</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3">
                {activeTasks.slice(0, 4).map(task => (
                  <div key={task.id} className="flex justify-between items-center p-3 border border-border rounded-lg bg-background hover:border-accent/50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className={`mt-1 w-2 h-2 rounded-full ${task.priority === 'Urgent' ? 'bg-red-400' : task.priority === 'High' ? 'bg-amber-400' : 'bg-accent'}`}></div>
                      <div>
                        <p className="text-sm font-medium text-primary">{task.title}</p>
                        <p className="text-xs text-muted mt-0.5">{task.projectId} · Due {task.dueDate}</p>
                      </div>
                    </div>
                    <Link to={`/team/tasks/${task.id}`}>
                      <Button variant="ghost" size="sm" className="h-7 px-2">View</Button>
                    </Link>
                  </div>
                ))}
                {activeTasks.length === 0 && <p className="text-sm text-muted">No active tasks.</p>}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <UpcomingEvents />
          <Card className="border-amber-900/30">
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="flex items-center gap-2"><MessageSquare className="h-4 w-4 text-amber-400"/> Client Feedback</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="p-4 bg-surface rounded-lg border border-border relative">
                <Badge variant="warning" className="absolute top-0 right-0 -mt-2 -mr-2 text-[10px]">New</Badge>
                <p className="text-xs font-medium text-primary mb-1">Sharma Residence · Living Room</p>
                <p className="text-sm text-secondary italic mb-2">"Can we change the lighting temperature to be warmer, and revise the TV wall cladding?"</p>
                <p className="text-[10px] text-muted flex items-center gap-1"><Clock className="h-3 w-3"/> 2 hours ago</p>
              </div>
              <div className="p-4 bg-surface rounded-lg border border-border">
                <p className="text-xs font-medium text-primary mb-1">Mehta Villa · Kitchen</p>
                <p className="text-sm text-secondary italic mb-2">"Approved. Proceed with the quartz counter."</p>
                <p className="text-[10px] text-muted flex items-center gap-1"><Clock className="h-3 w-3"/> 1 day ago</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="flex items-center gap-2"><Package className="h-4 w-4 text-muted"/> Recent Materials</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <div>
                  <p className="font-medium text-primary">Italian Statuario Marble</p>
                  <p className="text-xs text-muted">Sharma Residence</p>
                </div>
                <Badge variant="success">Approved</Badge>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div>
                  <p className="font-medium text-primary">Fluted Oak Veneer</p>
                  <p className="text-xs text-muted">Sharma Residence</p>
                </div>
                <Badge variant="warning">Pending</Badge>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div>
                  <p className="font-medium text-primary">Brass Pendant Light</p>
                  <p className="text-xs text-muted">Mehta Villa</p>
                </div>
                <Badge variant="neutral">Draft</Badge>
              </div>
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
