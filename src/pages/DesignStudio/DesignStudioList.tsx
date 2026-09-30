import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from '@/components/ui/Link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Label } from '@/components/ui/Label';
import { Plus, Search, Filter, ArrowRight, LayoutTemplate } from 'lucide-react';
import { detailedProjects } from '@/lib/mock-data';

const SUMMARY_METRICS = [
  { label: 'Active Designs', value: '8' },
  { label: 'Awaiting Client Review', value: '3' },
  { label: 'Changes Requested', value: '2' },
  { label: 'Approved Designs', value: '14' },
  { label: 'Design Versions', value: '27' },
];

export function DesignStudioList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewDesignModalOpen, setIsNewDesignModalOpen] = useState(false);

  // Derive design projects from detailedProjects for demo
  const designProjects = detailedProjects.map(p => ({
    id: p.id,
    name: p.name,
    client: p.client,
    location: p.location,
    type: p.type,
    designStatus: p.design.status,
    progress: p.progress,
    pendingApprovals: p.design.status === 'Client Review' ? 2 : p.design.status === 'Changes Requested' ? 1 : 0
  }));

  const filteredProjects = designProjects.filter(project => 
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Approved': return <Badge variant="success">Approved</Badge>;
      case 'Client Review': return <Badge variant="warning">Client Review</Badge>;
      case 'Changes Requested': return <Badge variant="danger">Changes Requested</Badge>;
      default: return <Badge variant="neutral">{status}</Badge>;
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 pb-12">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-primary">Design Studio</h1>
          <p className="text-secondary mt-1 text-sm">Manage spaces, design versions, client reviews and approvals.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" onClick={() => navigate('/design-studio/PRJ-001/approval')} className="hidden sm:flex">
            View Pending Approvals
          </Button>
          <Button onClick={() => setIsNewDesignModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> New Design
          </Button>
        </div>
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
            placeholder="Search projects or clients..." 
            className="pl-9 w-full"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex w-full md:w-auto items-center gap-3 overflow-x-auto custom-scrollbar pb-1 md:pb-0">
          <select className="h-9 rounded-md border border-border bg-background px-3 py-1 text-sm text-primary appearance-none focus:outline-none focus:ring-1 focus:ring-accent min-w-[120px]">
            <option>All Projects</option>
            <option>Sharma Residence</option>
          </select>
          <select className="h-9 rounded-md border border-border bg-background px-3 py-1 text-sm text-primary appearance-none focus:outline-none focus:ring-1 focus:ring-accent min-w-[120px]">
            <option>All Statuses</option>
            <option>Client Review</option>
            <option>Changes Requested</option>
            <option>Approved</option>
          </select>
          <Button variant="ghost" size="sm" className="whitespace-nowrap">
            <Filter className="mr-2 h-4 w-4" /> Clear Filters
          </Button>
        </div>
      </div>

      {/* PROJECT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Link to={`/design-studio/${project.id}`} key={project.id}>
            <div className="bg-surface border border-border rounded-xl overflow-hidden hover:border-accent/50 transition-colors group flex flex-col h-full">
              <div className="p-6 flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-background border border-border rounded-lg group-hover:bg-accent/10 group-hover:border-accent/20 group-hover:text-accent transition-colors">
                    <LayoutTemplate className="h-5 w-5" />
                  </div>
                  {getStatusBadge(project.designStatus)}
                </div>
                <h3 className="text-lg font-semibold text-primary mb-1">{project.name}</h3>
                <p className="text-sm text-secondary mb-6">{project.type} · {project.location}</p>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-muted">Design Progress</span>
                      <span className="text-primary font-medium">{project.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-background rounded-full overflow-hidden border border-border">
                      <div className="h-full bg-accent" style={{ width: `${project.progress}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 bg-elevated border-t border-border flex justify-between items-center">
                <span className="text-xs font-medium text-amber-400">
                  {project.pendingApprovals > 0 ? `${project.pendingApprovals} Pending Actions` : 'Up to date'}
                </span>
                <span className="text-xs text-secondary group-hover:text-accent transition-colors flex items-center">
                  Open Workspace <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* NEW DESIGN MODAL */}
      <Modal
        isOpen={isNewDesignModalOpen}
        onClose={() => setIsNewDesignModalOpen(false)}
        title="New Design"
        description="Initialize a new design space or version for a project."
      >
        <form className="space-y-4" onSubmit={e => { e.preventDefault(); setIsNewDesignModalOpen(false); }}>
          <div className="space-y-2">
            <Label>Project</Label>
            <select className="flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-primary appearance-none focus:outline-none focus:ring-1 focus:ring-accent">
              <option>Sharma Residence (PRJ-001)</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label>Space / Room Name</Label>
            <Input placeholder="e.g. Master Bedroom" />
          </div>
          <div className="space-y-2">
            <Label>Design Style</Label>
            <select className="flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-primary appearance-none focus:outline-none focus:ring-1 focus:ring-accent">
              <option>Modern Luxury</option>
              <option>Minimal</option>
              <option>Contemporary</option>
              <option>Scandinavian</option>
              <option>Classic</option>
              <option>Industrial</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label>Designer</Label>
            <select className="flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-primary appearance-none focus:outline-none focus:ring-1 focus:ring-accent">
              <option>Ananya Rao</option>
              <option>Rahul Verma</option>
            </select>
          </div>
          <div className="pt-4 flex justify-end gap-3 border-t border-border mt-6">
            <Button type="button" variant="ghost" onClick={() => setIsNewDesignModalOpen(false)}>Cancel</Button>
            <Button type="submit">Create Space</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
