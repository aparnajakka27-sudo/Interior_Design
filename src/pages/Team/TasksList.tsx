import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Label } from '@/components/ui/Label';
import { Plus, Search, Filter, CheckSquare, ArrowRight } from 'lucide-react';
import { initialTasks, detailedProjects, initialEmployees, type TaskStatus } from '@/lib/mock-data';

export function TasksList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getProjectName = (id: string) => detailedProjects.find(p => p.id === id)?.name || id;
  const getAssigneeName = (id: string) => initialEmployees.find(e => e.id === id)?.name || id;
  const getAssigneeInitials = (id: string) => initialEmployees.find(e => e.id === id)?.avatarInitials || '';

  const filteredTasks = initialTasks.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.projectId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    getAssigneeName(t.assigneeId).toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    <div className="max-w-[1400px] mx-auto space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-primary">Tasks</h1>
          <p className="text-secondary mt-1 text-sm">Track work across projects, teams and deadlines.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Create Task
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-surface border border-border rounded-xl p-4 text-center">
          <p className="text-xl font-semibold text-primary mb-1">{initialTasks.length}</p>
          <p className="text-xs font-medium text-secondary">Total Tasks</p>
        </div>
        <div className="bg-surface border border-border rounded-xl p-4 text-center">
          <p className="text-xl font-semibold text-primary mb-1">{initialTasks.filter(t => t.status === 'To Do').length}</p>
          <p className="text-xs font-medium text-secondary">To Do</p>
        </div>
        <div className="bg-surface border border-border rounded-xl p-4 text-center">
          <p className="text-xl font-semibold text-amber-400 mb-1">{initialTasks.filter(t => t.status === 'In Progress').length}</p>
          <p className="text-xs font-medium text-secondary">In Progress</p>
        </div>
        <div className="bg-surface border border-border rounded-xl p-4 text-center">
          <p className="text-xl font-semibold text-emerald-400 mb-1">{initialTasks.filter(t => t.status === 'Completed').length}</p>
          <p className="text-xs font-medium text-secondary">Completed</p>
        </div>
        <div className="bg-surface border border-border rounded-xl p-4 text-center">
          <p className="text-xl font-semibold text-red-400 mb-1">{initialTasks.filter(t => t.status !== 'Completed' && t.dueDate.includes('12 Sep')).length}</p>
          <p className="text-xs font-medium text-secondary">Overdue</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-surface border border-border rounded-xl p-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <Input 
            placeholder="Search tasks, projects, or assignees..." 
            className="pl-9 w-full"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex w-full md:w-auto items-center gap-3 overflow-x-auto custom-scrollbar pb-1 md:pb-0">
          <select className="h-9 rounded-md border border-border bg-background px-3 py-1 text-sm text-primary appearance-none focus:outline-none focus:ring-1 focus:ring-accent min-w-[120px]">
            <option>All Statuses</option>
            <option>To Do</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
          <select className="h-9 rounded-md border border-border bg-background px-3 py-1 text-sm text-primary appearance-none focus:outline-none focus:ring-1 focus:ring-accent min-w-[120px]">
            <option>All Assignees</option>
            <option>Ananya Rao</option>
            <option>Rahul Sharma</option>
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
              <th className="px-6 py-4 font-medium">Task</th>
              <th className="px-6 py-4 font-medium">Project</th>
              <th className="px-6 py-4 font-medium">Assignee</th>
              <th className="px-6 py-4 font-medium">Priority</th>
              <th className="px-6 py-4 font-medium">Due Date</th>
              <th className="px-6 py-4 font-medium">Progress</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredTasks.map((t) => (
              <tr key={t.id} className="hover:bg-elevated/50 transition-colors">
                <td className="px-6 py-4">
                  <Link to={`/team/tasks/${t.id}`} className="font-medium text-primary hover:text-accent transition-colors flex items-center gap-2">
                    <CheckSquare className="h-4 w-4 text-muted" /> {t.title}
                  </Link>
                </td>
                <td className="px-6 py-4 text-secondary">{getProjectName(t.projectId)}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-accent/20 flex items-center justify-center text-accent text-[10px] font-medium shrink-0">
                      {getAssigneeInitials(t.assigneeId)}
                    </div>
                    <span className="text-secondary">{getAssigneeName(t.assigneeId)}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-xs px-2 py-1 rounded border ${getPriorityStyle(t.priority)}`}>{t.priority}</span>
                </td>
                <td className="px-6 py-4 text-secondary">{t.dueDate}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 w-24">
                    <div className="w-full bg-background h-1.5 rounded-full overflow-hidden border border-border">
                      <div className="h-full bg-accent" style={{width: `${t.progress}%`}}></div>
                    </div>
                    <span className="text-xs text-secondary">{t.progress}%</span>
                  </div>
                </td>
                <td className="px-6 py-4">{getStatusBadge(t.status)}</td>
                <td className="px-6 py-4 text-right">
                  <Link to={`/team/tasks/${t.id}`}>
                    <Button variant="ghost" size="sm">Open <ArrowRight className="ml-2 h-3 w-3" /></Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 gap-4 md:hidden">
        {filteredTasks.map(t => (
          <div key={t.id} className="bg-surface border border-border rounded-xl p-5 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-primary">{t.title}</h3>
                <p className="text-xs text-secondary mt-1">{getProjectName(t.projectId)}</p>
              </div>
              {getStatusBadge(t.status)}
            </div>
            <div className="grid grid-cols-2 gap-y-3 text-sm text-secondary border-t border-border pt-4">
              <div><span className="text-muted block text-xs mb-1">Due Date</span> <span>{t.dueDate}</span></div>
              <div>
                <span className="text-muted block text-xs mb-1">Assignee</span> 
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-accent/20 flex items-center justify-center text-accent text-[9px] font-medium">
                    {getAssigneeInitials(t.assigneeId)}
                  </div>
                  <span className="text-primary text-xs">{getAssigneeName(t.assigneeId)}</span>
                </div>
              </div>
              <div><span className="text-muted block text-xs mb-1">Priority</span> <span className={`text-xs px-2 py-0.5 rounded border ${getPriorityStyle(t.priority)}`}>{t.priority}</span></div>
              <div><span className="text-muted block text-xs mb-1">Progress</span> <span className="text-primary">{t.progress}%</span></div>
            </div>
            <Link to={`/team/tasks/${t.id}`} className="block">
              <Button variant="secondary" className="w-full text-xs mt-2">View Task <ArrowRight className="ml-2 h-3 w-3" /></Button>
            </Link>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Task" description="Assign a new task to a team member.">
        <form className="space-y-4 mt-4" onSubmit={e => { e.preventDefault(); setIsModalOpen(false); }}>
          <div className="space-y-2">
            <Label>Task Title</Label>
            <Input placeholder="e.g. Finalize Living Room Concept" />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <textarea className="flex min-h-[60px] w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-primary placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-accent" placeholder="Add detailed instructions..."></textarea>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Project</Label>
              <select className="flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-primary appearance-none focus:outline-none focus:ring-1 focus:ring-accent">
                <option>Sharma Residence</option>
                <option>Mehta Villa</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Assignee</Label>
              <select className="flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-primary appearance-none focus:outline-none focus:ring-1 focus:ring-accent">
                {initialEmployees.map(e => (
                  <option key={e.id} value={e.id}>{e.name} ({e.role})</option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Due Date</Label>
              <Input type="date" className="text-secondary" />
            </div>
            <div className="space-y-2">
              <Label>Priority</Label>
              <select className="flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-primary appearance-none focus:outline-none focus:ring-1 focus:ring-accent">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Urgent</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Estimated Hours</Label>
              <Input type="number" placeholder="e.g. 16" />
            </div>
            <div className="space-y-2">
              <Label>Related Module (Optional)</Label>
              <select className="flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-primary appearance-none focus:outline-none focus:ring-1 focus:ring-accent">
                <option value="">None</option>
                <option>Design</option>
                <option>Site</option>
                <option>Materials</option>
                <option>Finance</option>
              </select>
            </div>
          </div>
          <div className="pt-4 flex justify-end gap-3 border-t border-border mt-6">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit">Create Task</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
