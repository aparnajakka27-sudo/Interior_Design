import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from '@/components/ui/Link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { ArrowLeft, CalendarPlus, Clock, CheckCircle2, User, FileText } from 'lucide-react';
import { detailedProjects, initialSiteVisits } from '@/lib/mock-data';

export function SiteVisits() {
  const { projectId } = useParams();
  const project = detailedProjects.find(p => p.id === projectId) || detailedProjects[0];
  const visits = initialSiteVisits.filter(v => v.projectId === project.id);
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!project) return <div>Project not found</div>;

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Completed': return <Badge variant="success"><CheckCircle2 className="mr-1 h-3 w-3"/> Completed</Badge>;
      case 'Scheduled': return <Badge variant="warning"><Clock className="mr-1 h-3 w-3"/> Scheduled</Badge>;
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
          <h1 className="text-2xl font-semibold text-primary">Site Visits</h1>
          <p className="text-secondary mt-1 text-sm">{project.name}</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}><CalendarPlus className="mr-2 h-4 w-4" /> Schedule Visit</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visits.map(visit => (
          <Card key={visit.id} className="hover:border-accent/50 transition-colors">
            <CardContent className="p-5 space-y-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-primary text-lg">{visit.purpose}</h3>
                  <p className="text-sm text-secondary">{visit.date} at {visit.time}</p>
                </div>
                {getStatusBadge(visit.status)}
              </div>
              <div className="flex items-center text-sm text-secondary gap-2">
                <User className="h-4 w-4 text-muted" />
                <span>Visitor: <span className="text-primary font-medium">{visit.visitor}</span></span>
              </div>
              {visit.notes && (
                <div className="bg-surface border border-border p-3 rounded-md mt-4 text-sm flex items-start gap-2">
                  <FileText className="h-4 w-4 text-muted shrink-0 mt-0.5" />
                  <p className="text-secondary">{visit.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Schedule Site Visit"
        description="Book a visit for inspection, clients, or vendors."
      >
        <form className="space-y-4 mt-4" onSubmit={e => { e.preventDefault(); setIsModalOpen(false); }}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date</Label>
              <Input type="date" className="text-secondary" />
            </div>
            <div className="space-y-2">
              <Label>Time</Label>
              <Input type="time" className="text-secondary" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Visit Type</Label>
            <select className="flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-primary appearance-none focus:outline-none focus:ring-1 focus:ring-accent">
              <option>Routine Inspection</option>
              <option>Client Visit</option>
              <option>Designer Visit</option>
              <option>Vendor Visit</option>
              <option>Quality Check</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label>Visitor Name</Label>
            <Input placeholder="e.g. Rahul Mehta" />
          </div>
          <div className="space-y-2">
            <Label>Notes</Label>
            <textarea className="flex min-h-[80px] w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-primary placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-accent" placeholder="Purpose of visit..."></textarea>
          </div>
          <div className="pt-4 flex justify-end gap-3 border-t border-border mt-6">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit">Schedule Visit</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
