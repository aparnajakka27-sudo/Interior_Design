import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { ArrowLeft, PenTool, AlertCircle, Clock, CheckCircle2, User, MapPin } from 'lucide-react';
import { detailedProjects, initialSiteSnags } from '@/lib/mock-data';

export function SiteSnags() {
  const { projectId } = useParams();
  const project = detailedProjects.find(p => p.id === projectId) || detailedProjects[0];
  const snags = initialSiteSnags.filter(s => s.projectId === project.id);
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!project) return <div>Project not found</div>;

  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case 'Critical': return <Badge variant="danger">Critical</Badge>;
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
          <h1 className="text-2xl font-semibold text-primary">Snagging</h1>
          <p className="text-secondary mt-1 text-sm">Track finishing defects and handover items for {project.name}.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}><PenTool className="mr-2 h-4 w-4" /> Add Snag</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {snags.map(snag => (
          <Card key={snag.id} className={`hover:border-accent/50 transition-colors ${snag.status === 'Resolved' ? 'opacity-70' : ''}`}>
            <CardContent className="p-5 flex flex-col h-full">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  {getStatusBadge(snag.status)}
                  <span className="text-xs text-muted">{snag.id}</span>
                </div>
                {getPriorityBadge(snag.priority)}
              </div>
              <h3 className="font-semibold text-primary text-base mb-2">{snag.title}</h3>
              <p className="text-sm text-secondary mb-4 line-clamp-2 flex-1">{snag.description}</p>
              
              <div className="grid grid-cols-2 gap-y-2 text-xs text-muted pt-4 border-t border-border">
                <span className="flex items-center"><MapPin className="mr-1 h-3 w-3"/> {snag.room}</span>
                <span className="flex items-center"><User className="mr-1 h-3 w-3"/> {snag.assignedTo}</span>
                <span>Reported: {snag.reportedDate}</span>
                <span className={snag.status !== 'Resolved' ? 'text-amber-400' : ''}>Due: {snag.dueDate}</span>
              </div>
              
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                {snag.status === 'Resolved' ? (
                  <Button variant="secondary" size="sm" className="w-full">Reopen</Button>
                ) : (
                  <>
                    <Button variant="secondary" size="sm" className="flex-1">Start Work</Button>
                    <Button size="sm" className="flex-1">Mark Resolved</Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Snag"
        description="Log a defect or unfinished item that needs correction."
      >
        <form className="space-y-4 mt-4" onSubmit={e => { e.preventDefault(); setIsModalOpen(false); }}>
          <div className="space-y-2">
            <Label>Snag Title</Label>
            <Input placeholder="e.g. Paint touch-up required" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Room / Location</Label>
              <Input placeholder="e.g. Master Bedroom" />
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
              <Label>Assigned Team</Label>
              <select className="flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-primary appearance-none focus:outline-none focus:ring-1 focus:ring-accent">
                <option>Painting Team</option>
                <option>Carpentry Team</option>
                <option>Electrical Team</option>
                <option>Plumbing Team</option>
                <option>Civil Team</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Due Date</Label>
              <Input type="date" className="text-secondary" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <textarea className="flex min-h-[80px] w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-primary placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-accent" placeholder="Details about the defect..."></textarea>
          </div>
          <div className="pt-4 flex justify-end gap-3 border-t border-border mt-6">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit">Add Snag</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
