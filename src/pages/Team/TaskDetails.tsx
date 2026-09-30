import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from '@/components/ui/Link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { ArrowLeft, CheckSquare, Clock, AlignLeft, MessageSquare, Play, CheckCircle2, UserPlus, Link as LinkIcon, FolderKanban } from 'lucide-react';
import { initialTasks, detailedProjects, initialEmployees, type TaskStatus } from '@/lib/mock-data';

export function TaskDetails() {
  const { taskId } = useParams();
  const [task, setTask] = useState(initialTasks.find(t => t.id === taskId) || initialTasks[0]);
  const project = detailedProjects.find(p => p.id === task.projectId);
  const assignee = initialEmployees.find(e => e.id === task.assigneeId);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [progress, setProgress] = useState(task.progress);
  const [status, setStatus] = useState<TaskStatus>(task.status);

  if (!task || !project || !assignee) return <div>Task not found.</div>;

  const handleUpdate = () => {
    setTask({ ...task, progress, status });
    setIsUpdateModalOpen(false);
  };

  const getStatusBadge = (status: TaskStatus) => {
    switch(status) {
      case 'To Do': return <Badge variant="neutral">To Do</Badge>;
      case 'In Progress': return <Badge variant="warning">In Progress</Badge>;
      case 'Blocked': return <Badge variant="danger">Blocked</Badge>;
      case 'Completed': return <Badge variant="success">Completed</Badge>;
      default: return <Badge variant="neutral">{status}</Badge>;
    }
  };

  const getPriorityStyle = (priority: string) => {
    switch(priority) {
      case 'Urgent': return 'border-red-500/30 text-red-400 bg-red-500/10';
      case 'High': return 'border-amber-500/30 text-amber-400 bg-amber-500/10';
      case 'Medium': return 'border-border text-secondary';
      case 'Low': return 'border-border text-muted';
      default: return 'border-border text-secondary';
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto space-y-6 pb-12">
      <div className="flex justify-between items-center">
        <Link to="/team/tasks" className="inline-flex items-center text-sm font-medium text-secondary hover:text-primary transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Tasks
        </Link>
        <div className="flex gap-3">
          <Button variant="secondary" size="sm"><UserPlus className="mr-2 h-4 w-4" /> Reassign</Button>
          <Button size="sm" onClick={() => setIsUpdateModalOpen(true)}><CheckCircle2 className="mr-2 h-4 w-4" /> Update Progress</Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-6">
          <Card>
            <CardContent className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <CheckSquare className="h-6 w-6 text-accent" />
                <h1 className="text-2xl font-bold text-primary">{task.title}</h1>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-secondary mb-8 pb-6 border-b border-border">
                <div className="flex items-center gap-2">
                  <span className="text-muted">Project:</span>
                  <Link to={`/projects/${project.id}`} className="font-medium text-primary hover:text-accent transition-colors">{project.name}</Link>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted">Assignee:</span>
                  <Link to={`/team/${assignee.id}`} className="font-medium text-primary hover:text-accent transition-colors flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-accent/20 flex items-center justify-center text-accent text-[9px] font-bold">
                      {assignee.avatarInitials}
                    </div>
                    {assignee.name}
                  </Link>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted">Status:</span>
                  {getStatusBadge(task.status)}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted">Priority:</span>
                  <span className={`text-xs px-2 py-0.5 rounded border ${getPriorityStyle(task.priority)}`}>{task.priority}</span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-primary flex items-center gap-2"><AlignLeft className="h-4 w-4 text-muted" /> Description</h3>
                <p className="text-sm text-secondary leading-relaxed">{task.description}</p>
                {task.notes && (
                  <div className="bg-surface border border-border p-4 rounded-lg mt-4">
                    <p className="text-xs text-muted mb-1 uppercase tracking-wider font-semibold">Notes</p>
                    <p className="text-sm text-secondary">{task.notes}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="text-lg flex items-center gap-2"><MessageSquare className="h-4 w-4 text-muted" /> Comments & Activity</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="mt-1 h-2 w-2 rounded-full bg-accent ring-4 ring-accent/20"></div>
                  <div>
                    <p className="text-sm font-medium text-primary">Task assigned to {assignee.name}</p>
                    <p className="text-xs text-muted mt-1">{task.startDate}</p>
                  </div>
                </div>
                {task.status !== 'To Do' && (
                  <div className="flex gap-4">
                    <div className="mt-1 h-2 w-2 rounded-full bg-emerald-400 ring-4 ring-emerald-400/20"></div>
                    <div>
                      <p className="text-sm font-medium text-primary">{assignee.name} started working on the task</p>
                      <p className="text-xs text-muted mt-1">{task.startDate}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="w-full lg:w-80 shrink-0 space-y-6">
          <Card>
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="text-sm font-semibold flex items-center gap-2"><Clock className="h-4 w-4 text-muted" /> Timeline & Progress</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-muted">Progress</span>
                  <span className="text-primary font-medium">{task.progress}%</span>
                </div>
                <div className="w-full bg-background h-2 rounded-full overflow-hidden border border-border">
                  <div className="h-full bg-accent" style={{width: `${task.progress}%`}}></div>
                </div>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-secondary">Start Date</span>
                  <span className="font-medium text-primary">{task.startDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary">Due Date</span>
                  <span className={task.status !== 'Completed' && task.dueDate.includes('12 Sep') ? 'font-medium text-red-400' : 'font-medium text-primary'}>{task.dueDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary">Est. Hours</span>
                  <span className="font-medium text-primary">{task.estimatedHours}h</span>
                </div>
              </div>

              {task.status === 'To Do' && (
                <Button className="w-full" onClick={() => { setStatus('In Progress'); setTask({...task, status: 'In Progress'}); }}><Play className="mr-2 h-4 w-4" /> Start Task</Button>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="text-sm font-semibold flex items-center gap-2"><LinkIcon className="h-4 w-4 text-muted" /> Related</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="text-sm">
                <p className="text-xs text-muted mb-1">Project</p>
                <Link to={`/projects/${project.id}`} className="font-medium text-primary hover:text-accent transition-colors flex items-center gap-2">
                  <FolderKanban className="h-4 w-4 text-muted" /> {project.name}
                </Link>
              </div>
              {task.relatedModule && (
                <div className="text-sm">
                  <p className="text-xs text-muted mb-1">Module</p>
                  <span className="font-medium text-primary flex items-center gap-2">
                    <CheckSquare className="h-4 w-4 text-muted" /> {task.relatedModule}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Modal isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)} title="Update Task" description="Update the current progress and status of this task.">
        <form className="space-y-4 mt-4" onSubmit={e => { e.preventDefault(); handleUpdate(); }}>
          <div className="space-y-2">
            <Label>Progress (%)</Label>
            <Input type="number" min="0" max="100" value={progress} onChange={e => setProgress(Number(e.target.value))} />
            <div className="w-full bg-surface h-1.5 rounded-full overflow-hidden border border-border mt-2">
              <div className="h-full bg-accent transition-all" style={{width: `${progress}%`}}></div>
            </div>
          </div>
          <div className="space-y-2 mt-4">
            <Label>Status</Label>
            <select className="flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-primary appearance-none focus:outline-none focus:ring-1 focus:ring-accent" value={status} onChange={e => setStatus(e.target.value as TaskStatus)}>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Blocked">Blocked</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="space-y-2 mt-4">
            <Label>Add Comment (Optional)</Label>
            <textarea className="flex min-h-[60px] w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-primary placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-accent" placeholder="What's the update?"></textarea>
          </div>
          <div className="pt-4 flex justify-end gap-3 border-t border-border mt-6">
            <Button type="button" variant="ghost" onClick={() => setIsUpdateModalOpen(false)}>Cancel</Button>
            <Button type="submit">Save Update</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
