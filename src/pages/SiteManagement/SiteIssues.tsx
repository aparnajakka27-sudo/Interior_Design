import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from '@/components/ui/Link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { ArrowLeft, AlertTriangle, AlertCircle, Clock, CheckCircle2, User, MapPin } from 'lucide-react';
import { detailedProjects, initialSiteIssues } from '@/lib/mock-data';

export function SiteIssues() {
  const { projectId } = useParams();
  const project = detailedProjects.find(p => p.id === projectId) || detailedProjects[0];
  const issues = initialSiteIssues.filter(i => i.projectId === project.id);
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!project) return <div>Project not found</div>;

  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case 'Critical': return <Badge variant="danger"><AlertTriangle className="mr-1 h-3 w-3"/> Critical</Badge>;
      case 'High': return <Badge variant="danger">High</Badge>;
      case 'Medium': return <Badge variant="warning">Medium</Badge>;
      case 'Low': return <Badge variant="neutral">Low</Badge>;
      default: return <Badge variant="neutral">{priority}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Open': return <Badge variant="danger"><AlertCircle className="mr-1 h-3 w-3"/> Open</Badge>;
      case 'In Progress': return <Badge variant="warning"><Clock className="mr-1 h-3 w-3"/> In Progress</Badge>;
      case 'Waiting': return <Badge variant="neutral"><Clock className="mr-1 h-3 w-3"/> Waiting</Badge>;
      case 'Resolved': return <Badge variant="success"><CheckCircle2 className="mr-1 h-3 w-3"/> Resolved</Badge>;
      default: return <Badge variant="neutral">{status}</Badge>;
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto space-y-6 pb-12">
      <Link to={`/site-management/${project.id}`} className="inline-flex items-center text-sm font-medium text-secondary hover:text-primary transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Site Workspace
      </Link>

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-primary">Site Issues</h1>
          <p className="text-secondary mt-1 text-sm">Track execution blockers and site-level problems for {project.name}.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} variant="danger"><AlertTriangle className="mr-2 h-4 w-4" /> Report Issue</Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {issues.map(issue => (
          <Card key={issue.id} className="hover:border-accent/50 transition-colors">
            <CardContent className="p-5 flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-semibold text-primary text-lg">{issue.title}</h3>
                  {getPriorityBadge(issue.priority)}
                </div>
                <p className="text-sm text-secondary">{issue.description}</p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-muted pt-2">
                  <span className="flex items-center"><MapPin className="mr-1 h-3 w-3"/> {issue.location}</span>
                  <span className="flex items-center"><User className="mr-1 h-3 w-3"/> Owner: <span className="text-primary ml-1">{issue.owner}</span></span>
                  <span>Reported: {issue.date}</span>
                  <span className="text-amber-400">Due: {issue.dueDate}</span>
                </div>
              </div>
              <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-4 md:gap-2 shrink-0 md:w-32 border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6">
                {getStatusBadge(issue.status)}
                <Button variant="ghost" size="sm" className="w-full text-xs">View Details</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Report Site Issue"
        description="Log a blocker or execution issue that needs attention."
      >
        <form className="space-y-4 mt-4" onSubmit={e => { e.preventDefault(); setIsModalOpen(false); }}>
          <div className="space-y-2">
            <Label>Issue Title</Label>
            <Input placeholder="e.g. Marble delivery delayed" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <select className="flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-primary appearance-none focus:outline-none focus:ring-1 focus:ring-accent">
                <option>Material</option>
                <option>Execution</option>
                <option>Design</option>
                <option>Labour</option>
                <option>Quality</option>
                <option>Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input placeholder="e.g. Living Room" />
            </div>
            <div className="space-y-2">
              <Label>Priority</Label>
              <select className="flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-primary appearance-none focus:outline-none focus:ring-1 focus:ring-accent">
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
                <option>Low</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Owner</Label>
              <Input placeholder="Assign to..." />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <textarea className="flex min-h-[80px] w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-primary placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-accent" placeholder="Detailed description of the problem..."></textarea>
          </div>
          <div className="pt-4 flex justify-end gap-3 border-t border-border mt-6">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="danger">Report Issue</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
