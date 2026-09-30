import { useParams, Link } from 'react-router-dom';
import { usePermissions } from '@/hooks/usePermissions';
import { ROLE_PERMISSIONS } from '@/lib/permissions';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ArrowLeft, CheckSquare, Clock, FolderKanban, Activity, Phone, Mail, UserCircle } from 'lucide-react';
import { initialEmployees, initialTasks, initialTeamActivity, detailedProjects } from '@/lib/mock-data';

export function EmployeeDetails() {
  const { role: currentUserRole } = usePermissions();
  const { employeeId } = useParams();
  const emp = initialEmployees.find(e => e.id === employeeId) || initialEmployees[0];
  
  const empTasks = initialTasks.filter(t => t.assigneeId === emp.id);
  const activeTasks = empTasks.filter(t => t.status !== 'Completed').length;
  const completedTasks = empTasks.filter(t => t.status === 'Completed').length;
  const overdueTasks = empTasks.filter(t => t.status !== 'Completed' && t.dueDate.includes('12 Sep')).length; // Loose check

  const getProjectName = (id: string) => detailedProjects.find(p => p.id === id)?.name || id;

  if (!emp) return <div>Employee not found.</div>;

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 pb-12">
      <div className="flex justify-between items-center">
        <Link to="/team" className="inline-flex items-center text-sm font-medium text-secondary hover:text-primary transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Team Directory
        </Link>
        <Button variant="ghost" size="sm">Edit Profile</Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-80 shrink-0 space-y-6">
          <Card className="overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-background to-accent/10 border-b border-border"></div>
            <CardContent className="pt-0 relative px-6 pb-6">
              <div className="h-20 w-20 rounded-xl bg-surface border-4 border-background flex items-center justify-center text-accent text-2xl font-bold -mt-10 mb-4 shadow-sm">
                {emp.avatarInitials}
              </div>
              <h2 className="text-xl font-bold text-primary">{emp.name}</h2>
              <p className="text-sm font-medium text-accent mt-1 mb-4">{emp.role}</p>
              
              <div className="space-y-3 text-sm border-t border-border pt-4">
                <div className="flex items-center text-secondary gap-3">
                  <Mail className="h-4 w-4 text-muted" /> {emp.email}
                </div>
                <div className="flex items-center text-secondary gap-3">
                  <Phone className="h-4 w-4 text-muted" /> {emp.phone}
                </div>
                <div className="flex items-center text-secondary gap-3">
                  <UserCircle className="h-4 w-4 text-muted" /> ID: <span className="text-primary font-mono ml-1">{emp.employeeId}</span>
                </div>
              </div>
            
              
              {currentUserRole === 'Admin / Owner' && emp.role !== 'Admin / Owner' && (
                <div className="mt-6 border-t border-border pt-6">
                  <h3 className="font-semibold text-primary mb-3 text-sm">Access Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-secondary">Projects</span>
                      <span className="font-medium text-primary">{ROLE_PERMISSIONS[emp.role]?.includes('projects.create') ? 'Full access' : ROLE_PERMISSIONS[emp.role]?.includes('projects.view') ? 'Assigned only' : 'No access'}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-secondary">Finance</span>
                      <span className="font-medium text-primary">{ROLE_PERMISSIONS[emp.role]?.includes('finance.create') ? 'Full access' : ROLE_PERMISSIONS[emp.role]?.includes('finance.view') ? 'View only' : 'No access'}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-secondary">Site</span>
                      <span className="font-medium text-primary">{ROLE_PERMISSIONS[emp.role]?.includes('site.update') ? 'Full access' : ROLE_PERMISSIONS[emp.role]?.includes('site.view') ? 'View only' : 'No access'}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-secondary">Design</span>
                      <span className="font-medium text-primary">{ROLE_PERMISSIONS[emp.role]?.includes('design.edit') ? 'Full access' : ROLE_PERMISSIONS[emp.role]?.includes('design.view') ? 'View only' : 'No access'}</span>
                    </div>
                  </div>
                </div>
              )}

            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-primary mb-4 text-sm">Workload Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-border pb-2">
                  <span className="text-secondary text-sm flex items-center gap-2"><FolderKanban className="h-4 w-4 text-muted"/> Assigned Projects</span>
                  <span className="font-medium text-primary">{emp.assignedProjects.length}</span>
                </div>
                <div className="flex justify-between items-center border-b border-border pb-2">
                  <span className="text-secondary text-sm flex items-center gap-2"><CheckSquare className="h-4 w-4 text-muted"/> Active Tasks</span>
                  <span className="font-medium text-primary">{activeTasks}</span>
                </div>
                <div className="flex justify-between items-center border-b border-border pb-2">
                  <span className="text-secondary text-sm flex items-center gap-2"><Clock className="h-4 w-4 text-muted"/> Overdue</span>
                  <span className="font-medium text-red-400">{overdueTasks}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-secondary text-sm flex items-center gap-2"><CheckSquare className="h-4 w-4 text-muted"/> Completed Tasks</span>
                  <span className="font-medium text-emerald-400">{completedTasks}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex-1 space-y-6">
          <Card>
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="text-lg">Assigned Projects</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {emp.assignedProjects.map(pid => {
                  const proj = detailedProjects.find(p => p.id === pid);
                  if(!proj) return null;
                  return (
                    <Link to={`/projects/${pid}`} key={pid} className="block bg-background border border-border p-4 rounded-lg hover:border-accent/50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-primary">{proj.name}</h4>
                        <Badge variant="neutral" className="text-[10px]">{proj.stage}</Badge>
                      </div>
                      <p className="text-xs text-secondary mb-4">{emp.role} on Project</p>
                      <div className="w-full bg-surface h-1.5 rounded-full overflow-hidden border border-border">
                        <div className="h-full bg-accent" style={{width: `${proj.progress}%`}}></div>
                      </div>
                      <p className="text-right text-[10px] text-muted mt-1">{proj.progress}% Complete</p>
                    </Link>
                  )
                })}
                {emp.assignedProjects.length === 0 && (
                  <p className="text-muted text-sm col-span-2 text-center py-4">No projects assigned.</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="border-b border-border pb-4">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Active Tasks</CardTitle>
                <Link to="/team/tasks"><Button variant="ghost" size="sm">View All</Button></Link>
              </div>
            </CardHeader>
            <CardContent className="pt-0 p-0">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted uppercase bg-elevated/50 border-b border-border">
                  <tr>
                    <th className="px-6 py-3 font-medium">Task</th>
                    <th className="px-6 py-3 font-medium">Project</th>
                    <th className="px-6 py-3 font-medium">Priority</th>
                    <th className="px-6 py-3 font-medium">Due</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {empTasks.filter(t => t.status !== 'Completed').map(task => (
                    <tr key={task.id} className="hover:bg-elevated/50">
                      <td className="px-6 py-4 font-medium text-primary"><Link to={`/team/tasks/${task.id}`} className="hover:text-accent">{task.title}</Link></td>
                      <td className="px-6 py-4 text-secondary">{getProjectName(task.projectId)}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs px-2 py-1 rounded border ${
                          task.priority === 'Urgent' ? 'border-red-500/30 text-red-400 bg-red-500/10' :
                          task.priority === 'High' ? 'border-amber-500/30 text-amber-400 bg-amber-500/10' :
                          'border-border text-secondary'
                        }`}>{task.priority}</span>
                      </td>
                      <td className="px-6 py-4 text-secondary">{task.dueDate}</td>
                      <td className="px-6 py-4"><Badge variant="neutral">{task.status}</Badge></td>
                    </tr>
                  ))}
                  {activeTasks === 0 && <tr><td colSpan={5} className="text-center py-6 text-muted">No active tasks.</td></tr>}
                </tbody>
              </table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="text-lg flex items-center gap-2"><Activity className="h-4 w-4 text-muted" /> Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {initialTeamActivity.filter(a => a.employeeId === emp.id).map(act => (
                  <div key={act.id} className="flex gap-4">
                    <div className="mt-1 h-2 w-2 rounded-full bg-accent ring-4 ring-accent/20"></div>
                    <div>
                      <p className="text-sm font-medium text-primary">{act.description}</p>
                      <p className="text-xs text-muted mt-1">{act.date} · {getProjectName(act.projectId)}</p>
                    </div>
                  </div>
                ))}
                {initialTeamActivity.filter(a => a.employeeId === emp.id).length === 0 && (
                  <p className="text-muted text-sm text-center py-2">No recent activity.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
