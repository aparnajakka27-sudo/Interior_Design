import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from '@/components/ui/Link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { 
  ArrowLeft, Mail, Phone, MapPin, Calendar, Building2, 
  CheckCircle2, XCircle, Send, MessageSquare 
} from 'lucide-react';
import { initialLeads, initialLeadActivities, type Lead, type LeadActivity } from '@/lib/mock-data';

export function LeadDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Local state to simulate updates
  const [lead, setLead] = useState<Lead | undefined>(initialLeads.find(l => l.id === id));
  const [activities, setActivities] = useState<LeadActivity[]>(
    initialLeadActivities.filter(a => a.leadId === id)
  );
  
  const [isConvertModalOpen, setIsConvertModalOpen] = useState(false);
  const [isLostModalOpen, setIsLostModalOpen] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [lostReason, setLostReason] = useState('Budget');

  if (!lead) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <p className="text-secondary mb-4">Lead not found.</p>
        <Link to="/leads"><Button variant="ghost">Back to Leads</Button></Link>
      </div>
    );
  }

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    
    const newActivity: LeadActivity = {
      id: `ACT-${Date.now()}`,
      leadId: lead.id,
      date: 'Just now',
      title: 'Note added',
      description: noteText,
      type: 'note',
    };
    
    setActivities([newActivity, ...activities]);
    setNoteText('');
  };

  const handleMarkLost = (e: React.FormEvent) => {
    e.preventDefault();
    setLead({ ...lead, stage: 'Lost' });
    setActivities([{
      id: `ACT-${Date.now()}`,
      leadId: lead.id,
      date: 'Just now',
      title: 'Lead marked as Lost',
      description: `Reason: ${lostReason}`,
      type: 'system',
    }, ...activities]);
    setIsLostModalOpen(false);
  };

  const handleCompleteFollowUp = () => {
    setActivities([{
      id: `ACT-${Date.now()}`,
      leadId: lead.id,
      date: 'Just now',
      title: 'Follow-up completed',
      description: 'Marked the scheduled follow-up as done.',
      type: 'call',
    }, ...activities]);
  };

  const isWonOrLost = lead.stage === 'Won' || lead.stage === 'Lost';

  return (
    <div className="max-w-[1200px] mx-auto space-y-6 pb-12">
      {/* NAVIGATION */}
      <Link to="/leads" className="inline-flex items-center text-sm font-medium text-secondary hover:text-primary transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Leads
      </Link>

      {/* LEAD HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 bg-surface border border-border p-6 rounded-xl">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-primary">{lead.name}</h1>
            <Badge variant={lead.stage === 'Won' ? 'success' : lead.stage === 'Lost' ? 'danger' : 'neutral'}>
              {lead.stage}
            </Badge>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-secondary">
            <span className="flex items-center gap-1.5"><Phone className="h-4 w-4" /> {lead.phone}</span>
            <span className="flex items-center gap-1.5"><Mail className="h-4 w-4" /> {lead.email}</span>
            <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {lead.location}</span>
          </div>
          <p className="text-xs text-muted">Created {lead.createdDate} • Owned by {lead.owner}</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          {!isWonOrLost && (
            <>
              <Button variant="danger" onClick={() => setIsLostModalOpen(true)}>
                <XCircle className="mr-2 h-4 w-4" /> Mark Lost
              </Button>
              <Button onClick={() => setIsConvertModalOpen(true)}>
                <CheckCircle2 className="mr-2 h-4 w-4" /> Create Project
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: INFORMATION */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="border-b border-border pb-4">
              <CardTitle>Project Requirement</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
              <div>
                <span className="text-xs text-muted block mb-1">Requirement</span>
                <span className="text-sm font-medium text-primary">{lead.requirement}</span>
              </div>
              <div>
                <span className="text-xs text-muted block mb-1">Estimated Budget</span>
                <span className="text-sm font-medium text-primary">{lead.budget}</span>
              </div>
              <div>
                <span className="text-xs text-muted block mb-1">Property Type</span>
                <span className="text-sm font-medium text-primary">{lead.propertyType}</span>
              </div>
              <div>
                <span className="text-xs text-muted block mb-1">Property Size</span>
                <span className="text-sm font-medium text-primary">{lead.propertySize}</span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-xs text-muted block mb-1">Rooms</span>
                <span className="text-sm font-medium text-primary">{lead.rooms}</span>
              </div>
              <div>
                <span className="text-xs text-muted block mb-1">Design Style</span>
                <span className="text-sm font-medium text-primary">{lead.designStyle}</span>
              </div>
              <div>
                <span className="text-xs text-muted block mb-1">Expected Start Date</span>
                <span className="text-sm font-medium text-primary">{lead.startDate}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="border-b border-border pb-4">
              <CardTitle>Lead Source</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 flex flex-col gap-2 text-sm">
              <div className="flex justify-between items-center py-2 border-b border-border/50">
                <span className="text-secondary">Source Channel</span>
                <span className="font-medium text-primary">{lead.source}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border/50">
                <span className="text-secondary">First Contact</span>
                <span className="font-medium text-primary">{lead.createdDate}</span>
              </div>
            </CardContent>
          </Card>

          {lead.stage === 'Site Visit' && (
            <Card className="border-accent/30 bg-accent/5">
              <CardHeader className="border-b border-border/50 pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-accent" /> Site Visit
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-xs text-muted block mb-1">Date & Time</span>
                    <span className="font-medium text-primary">2 Oct 2026 · 11:00 AM</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted block mb-1">Location</span>
                    <span className="font-medium text-primary">{lead.location}</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted block mb-1">Assigned To</span>
                    <span className="font-medium text-primary">Rahul Verma</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted block mb-1">Status</span>
                    <span className="font-medium text-accent">Scheduled</span>
                  </div>
                </div>
                <Link to="/site-management">
                  <Button variant="secondary" className="w-full sm:w-auto">View Site Visit</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>

        {/* RIGHT COLUMN: ACTIONS & TIMELINE */}
        <div className="space-y-6">
          
          {!isWonOrLost && (
            <Card className="bg-elevated border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-primary">Next Follow-up</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium text-accent mb-1">{lead.nextFollowUp}</p>
                <p className="text-sm text-secondary mb-4">Call {lead.name.split(' ')[0]} to discuss requirement details.</p>
                <div className="flex gap-2">
                  <Button className="flex-1 text-xs h-8" onClick={handleCompleteFollowUp}>Complete</Button>
                  <Button variant="secondary" className="flex-1 text-xs h-8">Reschedule</Button>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader className="border-b border-border pb-4">
              <CardTitle>Activity & Notes</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 p-0">
              {/* Note Input */}
              <div className="p-4 border-b border-border bg-surface/50">
                <form onSubmit={handleAddNote} className="flex flex-col gap-3">
                  <Input 
                    placeholder="Add a note..." 
                    value={noteText}
                    onChange={e => setNoteText(e.target.value)}
                  />
                  <div className="flex justify-end">
                    <Button type="submit" size="sm" variant="secondary" disabled={!noteText.trim()}>
                      <Send className="mr-2 h-3 w-3" /> Add Note
                    </Button>
                  </div>
                </form>
              </div>

              {/* Timeline */}
              <div className="p-4 space-y-6 max-h-[500px] overflow-y-auto custom-scrollbar">
                {activities.map((activity, idx) => (
                  <div key={activity.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center shrink-0 z-10">
                        {activity.type === 'note' ? <MessageSquare className="h-3 w-3 text-accent" /> :
                         activity.type === 'call' ? <Phone className="h-3 w-3 text-emerald-400" /> :
                         <Calendar className="h-3 w-3 text-secondary" />}
                      </div>
                      {idx !== activities.length - 1 && (
                        <div className="w-px h-full bg-border -my-2" />
                      )}
                    </div>
                    <div className="pt-1 pb-4">
                      <p className="text-xs font-medium text-muted mb-1">{activity.date}</p>
                      <p className="text-sm font-medium text-primary mb-1">{activity.title}</p>
                      <p className="text-sm text-secondary leading-relaxed">{activity.description}</p>
                    </div>
                  </div>
                ))}
                {activities.length === 0 && (
                  <p className="text-sm text-muted text-center py-4">No activity yet.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CONVERT MODAL */}
      <Modal
        isOpen={isConvertModalOpen}
        onClose={() => setIsConvertModalOpen(false)}
        title="Convert Lead to Project?"
        description="This will create a new project using the lead's client and requirement information."
      >
        <div className="pt-4 flex justify-end gap-3 mt-4">
          <Button variant="ghost" onClick={() => setIsConvertModalOpen(false)}>Cancel</Button>
          <Button onClick={() => navigate('/projects')}>Create Project</Button>
        </div>
      </Modal>

      {/* LOST MODAL */}
      <Modal
        isOpen={isLostModalOpen}
        onClose={() => setIsLostModalOpen(false)}
        title="Mark Lead as Lost?"
        description="Please select a reason for marking this lead as lost."
      >
        <form onSubmit={handleMarkLost} className="space-y-4">
          <div className="space-y-2 mt-4">
            <Label>Lost Reason</Label>
            <select 
              className="flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-primary appearance-none focus:outline-none focus:ring-1 focus:ring-accent"
              value={lostReason}
              onChange={e => setLostReason(e.target.value)}
            >
              <option>Budget</option>
              <option>No Response</option>
              <option>Went With Another Designer</option>
              <option>Timeline</option>
              <option>Location</option>
              <option>Other</option>
            </select>
          </div>
          <div className="pt-4 flex justify-end gap-3 border-t border-border mt-6">
            <Button type="button" variant="ghost" onClick={() => setIsLostModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="danger">Confirm Lost</Button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
