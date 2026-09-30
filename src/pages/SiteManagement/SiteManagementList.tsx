import { useState } from 'react';
import { Link } from '@/components/ui/Link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Plus, Search, Filter, Calendar, HardHat } from 'lucide-react';
import { detailedProjects, type ProjectHealth } from '@/lib/mock-data';

const SUMMARY_METRICS = [
  { label: 'Active Sites', value: '7' },
  { label: 'Site Visits Today', value: '4' },
  { label: 'Projects On Track', value: '5' },
  { label: 'Projects At Risk', value: '2' },
  { label: 'Open Issues', value: '9' },
  { label: 'Open Snags', value: '14' },
];

export function SiteManagementList() {
    const [searchQuery, setSearchQuery] = useState('');
  
  // Dummy Modal states (Not strictly required for List but good to have)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  // Filter out completed projects for active sites view
  const siteProjects = detailedProjects.filter(p => p.stage !== 'Planning' && p.stage !== 'Completed');
  
  const filteredProjects = siteProjects.filter(project => 
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.siteManager.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getHealthBadge = (health: ProjectHealth) => {
    switch(health) {
      case 'Healthy': return <Badge variant="success">On Track</Badge>;
      case 'Attention': return <Badge variant="warning">Attention</Badge>;
      case 'At Risk': return <Badge variant="danger">At Risk</Badge>;
      default: return <Badge variant="neutral">{health}</Badge>;
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 pb-12">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-primary">Site Management</h1>
          <p className="text-secondary mt-1 text-sm">Monitor site progress, daily updates, issues and execution across active projects.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="hidden sm:flex">
            <Calendar className="mr-2 h-4 w-4" /> Schedule Site Visit
          </Button>
          <Button onClick={() => setIsUpdateModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Site Update
          </Button>
        </div>
      </div>

      {/* SUMMARY METRICS */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
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
            placeholder="Search projects, location, managers..." 
            className="pl-9 w-full"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex w-full md:w-auto items-center gap-3 overflow-x-auto custom-scrollbar pb-1 md:pb-0">
          <select className="h-9 rounded-md border border-border bg-background px-3 py-1 text-sm text-primary appearance-none focus:outline-none focus:ring-1 focus:ring-accent min-w-[120px]">
            <option>All Managers</option>
            <option>Vikram Singh</option>
            <option>Kiran Kumar</option>
          </select>
          <select className="h-9 rounded-md border border-border bg-background px-3 py-1 text-sm text-primary appearance-none focus:outline-none focus:ring-1 focus:ring-accent min-w-[120px]">
            <option>All Stages</option>
            <option>Civil Work</option>
            <option>Execution</option>
            <option>Finishing</option>
          </select>
          <Button variant="ghost" size="sm" className="whitespace-nowrap">
            <Filter className="mr-2 h-4 w-4" /> Clear Filters
          </Button>
        </div>
      </div>

      {/* PROJECT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProjects.map((project) => (
          <Link to={`/site-management/${project.id}`} key={project.id}>
            <div className="bg-surface border border-border rounded-xl p-5 hover:bg-elevated transition-colors flex flex-col h-full space-y-4">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-background border border-border rounded-lg text-secondary">
                  <HardHat className="h-5 w-5" />
                </div>
                {getHealthBadge(project.health)}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary">{project.name}</h3>
                <p className="text-sm text-secondary mt-1">{project.type} · {project.location}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm mt-4">
                <div>
                  <span className="text-muted block text-xs mb-1">Stage</span>
                  <span className="text-primary font-medium">{project.stage}</span>
                </div>
                <div>
                  <span className="text-muted block text-xs mb-1">Site Manager</span>
                  <span className="text-primary font-medium">{project.siteManager}</span>
                </div>
              </div>
              <div className="pt-4 mt-auto border-t border-border">
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="text-secondary">Site Progress</span>
                  <span className="text-primary font-medium">{project.progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-background rounded-full overflow-hidden border border-border">
                  <div className="h-full bg-accent" style={{ width: `${project.progress}%` }}></div>
                </div>
              </div>
            </div>
          </Link>
        ))}
        {filteredProjects.length === 0 && (
          <div className="col-span-full p-12 text-center text-muted border border-dashed border-border rounded-xl">
            No active sites found matching your search.
          </div>
        )}
      </div>

      <Modal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        title="Add Site Update"
        description="Submit a daily report for an active site."
      >
        <div className="p-4 bg-background border border-border rounded-md text-sm text-secondary text-center my-4">
          Open a specific project workspace to submit detailed site updates.
        </div>
        <div className="flex justify-end mt-4">
          <Button onClick={() => setIsUpdateModalOpen(false)}>Close</Button>
        </div>
      </Modal>

    </div>
  );
}
