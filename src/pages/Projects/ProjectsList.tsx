import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from '@/components/ui/Link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Label } from '@/components/ui/Label';
import { Plus, Search, Filter, ArrowRight } from 'lucide-react';
import { overviewProjects, type Project, type ProjectHealth } from '@/lib/mock-data';

const SUMMARY_METRICS = [
  { label: 'Active Projects', value: '12' },
  { label: 'In Design', value: '3' },
  { label: 'In Execution', value: '5' },
  { label: 'At Risk', value: '2' },
  { label: 'Completed This Month', value: '4' },
];

export function ProjectsList() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>(overviewProjects);
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);

  // New Project Form State
  const [newProjectForm, setNewProjectForm] = useState({
    name: '', client: '', phone: '', email: '', location: '', propertyType: '', 
    propertySize: '', budget: '', startDate: '', completion: '', pm: '', designer: '', siteManager: ''
  });

  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getHealthBadge = (health: ProjectHealth) => {
    switch(health) {
      case 'Healthy': return <Badge variant="success">Healthy</Badge>;
      case 'Attention': return <Badge variant="warning">Attention</Badge>;
      case 'At Risk': return <Badge variant="danger">At Risk</Badge>;
      default: return <Badge variant="neutral">{health}</Badge>;
    }
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `PRJ-00${projects.length + 1}`;
    
    // Minimal standard fields to populate list locally
    const newProject: Project = {
      id: newId,
      name: newProjectForm.name,
      client: newProjectForm.client,
      location: newProjectForm.location,
      stage: 'Planning',
      progress: 0,
      health: 'Healthy',
      deadline: newProjectForm.completion || 'TBD',
    };
    
    setProjects([newProject, ...projects]);
    setIsNewProjectModalOpen(false);
    
    // Navigate to details page
    navigate(`/projects/${newId}`);
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 pb-12">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-primary">Projects</h1>
          <p className="text-secondary mt-1 text-sm">Track active interiors, timelines, teams and delivery progress.</p>
        </div>
        <Button onClick={() => setIsNewProjectModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> New Project
        </Button>
      </div>

      {/* SUMMARY METRICS */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {SUMMARY_METRICS.map((metric, i) => (
          <div key={i} className="bg-surface border border-border rounded-xl p-5">
            <p className="text-sm font-medium text-secondary">{metric.label}</p>
            <p className="text-2xl font-semibold text-primary mt-2">{metric.value}</p>
          </div>
        ))}
      </div>

      {/* LIST CONTROLS */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-surface border border-border rounded-xl p-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <Input 
            placeholder="Search projects..." 
            className="pl-9 w-full"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex w-full md:w-auto items-center gap-3 overflow-x-auto custom-scrollbar pb-1 md:pb-0">
          <select className="h-9 rounded-md border border-border bg-background px-3 py-1 text-sm text-primary appearance-none focus:outline-none focus:ring-1 focus:ring-accent min-w-[120px]">
            <option>All Statuses</option>
            <option>Planning</option>
            <option>Execution</option>
            <option>Completed</option>
          </select>
          <select className="h-9 rounded-md border border-border bg-background px-3 py-1 text-sm text-primary appearance-none focus:outline-none focus:ring-1 focus:ring-accent min-w-[120px]">
            <option>All Managers</option>
            <option>Rahul Verma</option>
            <option>Ananya Rao</option>
            <option>Kiran Kumar</option>
          </select>
          <Button variant="ghost" size="sm" className="whitespace-nowrap">
            <Filter className="mr-2 h-4 w-4" /> Clear Filters
          </Button>
        </div>
      </div>

      {/* PROJECT TABLE (Desktop) */}
      <div className="bg-surface border border-border rounded-xl overflow-hidden hidden lg:block">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-muted uppercase bg-elevated/50 border-b border-border">
            <tr>
              <th className="px-6 py-4 font-medium">Project</th>
              <th className="px-6 py-4 font-medium">Client</th>
              <th className="px-6 py-4 font-medium">Location</th>
              <th className="px-6 py-4 font-medium">Stage</th>
              <th className="px-6 py-4 font-medium w-40">Progress</th>
              <th className="px-6 py-4 font-medium">Health</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredProjects.map((project) => (
              <tr key={project.id} className="hover:bg-elevated/50 transition-colors group cursor-pointer" onClick={() => navigate(`/projects/${project.id}`)}>
                <td className="px-6 py-4">
                  <p className="font-medium text-primary">{project.name}</p>
                  <p className="text-xs text-secondary mt-0.5">{project.id}</p>
                </td>
                <td className="px-6 py-4 text-secondary">{project.client}</td>
                <td className="px-6 py-4 text-secondary">{project.location}</td>
                <td className="px-6 py-4 text-secondary">{project.stage}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-background border border-border rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-accent rounded-full" 
                        style={{ width: `${project.progress}%` }} 
                      />
                    </div>
                    <span className="text-xs text-muted w-8">{project.progress}%</span>
                  </div>
                </td>
                <td className="px-6 py-4">{getHealthBadge(project.health)}</td>
                <td className="px-6 py-4 text-right">
                  <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    Open <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredProjects.length === 0 && (
          <div className="p-12 text-center text-muted">No projects found matching your search.</div>
        )}
      </div>

      {/* PROJECT CARDS (Mobile/Tablet) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
        {filteredProjects.map((project) => (
          <Link to={`/projects/${project.id}`} key={project.id}>
            <div className="bg-surface border border-border rounded-xl p-5 hover:bg-elevated transition-colors space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-primary text-lg">{project.name}</p>
                  <p className="text-xs text-secondary">{project.id} • {project.client}</p>
                </div>
                {getHealthBadge(project.health)}
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted block text-xs mb-0.5">Stage</span>
                  <span className="text-secondary">{project.stage}</span>
                </div>
                <div>
                  <span className="text-muted block text-xs mb-0.5">Location</span>
                  <span className="text-secondary">{project.location}</span>
                </div>
              </div>
              <div className="pt-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-secondary">Progress</span>
                  <div className="flex-1 h-1.5 bg-background border border-border rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-accent rounded-full" 
                      style={{ width: `${project.progress}%` }} 
                    />
                  </div>
                  <span className="text-xs text-muted font-medium">{project.progress}%</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* NEW PROJECT MODAL */}
      <Modal
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
        title="Create New Project"
        description="Initialize a new project workspace."
      >
        <form onSubmit={handleCreateProject} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 col-span-2">
              <Label htmlFor="name">Project Name</Label>
              <Input id="name" required value={newProjectForm.name} onChange={e => setNewProjectForm({...newProjectForm, name: e.target.value})} />
            </div>
            <div className="space-y-2 col-span-2 sm:col-span-1">
              <Label htmlFor="client">Client Name</Label>
              <Input id="client" required value={newProjectForm.client} onChange={e => setNewProjectForm({...newProjectForm, client: e.target.value})} />
            </div>
            <div className="space-y-2 col-span-2 sm:col-span-1">
              <Label htmlFor="location">Location</Label>
              <Input id="location" required value={newProjectForm.location} onChange={e => setNewProjectForm({...newProjectForm, location: e.target.value})} />
            </div>
            
            {/* Quick basic details */}
            <div className="space-y-2 col-span-2 sm:col-span-1">
              <Label htmlFor="budget">Estimated Budget</Label>
              <Input id="budget" value={newProjectForm.budget} onChange={e => setNewProjectForm({...newProjectForm, budget: e.target.value})} />
            </div>
            <div className="space-y-2 col-span-2 sm:col-span-1">
              <Label htmlFor="completion">Expected Completion</Label>
              <Input id="completion" type="date" className="text-secondary" value={newProjectForm.completion} onChange={e => setNewProjectForm({...newProjectForm, completion: e.target.value})} />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="pm">Project Manager</Label>
              <select 
                id="pm"
                className="flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-primary appearance-none focus:outline-none focus:ring-1 focus:ring-accent"
                value={newProjectForm.pm} 
                onChange={e => setNewProjectForm({...newProjectForm, pm: e.target.value})}
              >
                <option value="">Select Manager</option>
                <option>Rahul Verma</option>
                <option>Ananya Rao</option>
                <option>Kiran Kumar</option>
              </select>
            </div>
          </div>
          <div className="pt-4 flex justify-end gap-3 border-t border-border mt-6">
            <Button type="button" variant="ghost" onClick={() => setIsNewProjectModalOpen(false)}>Cancel</Button>
            <Button type="submit">Create Project</Button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
