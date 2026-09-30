import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from '@/components/ui/Link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Label } from '@/components/ui/Label';
import { 
  ArrowLeft, CheckCircle2, AlertTriangle, MessageSquare, History, FileEdit
} from 'lucide-react';
import { 
  detailedProjects, initialApprovalRecords, initialDesignActivities, type ApprovalRecord 
} from '@/lib/mock-data';

export function ClientApproval() {
  const { projectId } = useParams();
  const project = detailedProjects.find(p => p.id === projectId) || detailedProjects[0];
  
  const [approvals, setApprovals] = useState<ApprovalRecord[]>(
    initialApprovalRecords.filter(a => a.projectId === project.id)
  );
  
  const activities = initialDesignActivities.filter(a => a.projectId === project.id);
  
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isChangesModalOpen, setIsChangesModalOpen] = useState(false);
  const [changesReason, setChangesReason] = useState('');
  
  // Local state to track demo status
  const [pendingDesignStatus, setPendingDesignStatus] = useState<'Awaiting Review' | 'Approved' | 'Changes Requested'>('Awaiting Review');

  if (!project) return <div>Project not found</div>;

  const handleApprove = () => {
    setPendingDesignStatus('Approved');
    const newApproval: ApprovalRecord = {
      id: `APP-00${approvals.length + 1}`,
      versionId: 'VER-003',
      projectId: project.id,
      date: 'Just now',
      decision: 'Approved',
      comments: 'Automatically approved via portal.'
    };
    setApprovals([newApproval, ...approvals]);
    setIsApproveModalOpen(false);
  };

  const handleRequestChanges = (e: React.FormEvent) => {
    e.preventDefault();
    setPendingDesignStatus('Changes Requested');
    const newApproval: ApprovalRecord = {
      id: `APP-00${approvals.length + 1}`,
      versionId: 'VER-003',
      projectId: project.id,
      date: 'Just now',
      decision: 'Changes Requested',
      comments: changesReason
    };
    setApprovals([newApproval, ...approvals]);
    setIsChangesModalOpen(false);
    setChangesReason('');
  };

  return (
    <div className="max-w-[1200px] mx-auto space-y-6 pb-12">
      {/* NAVIGATION */}
      <Link to={`/design-studio/${project.id}`} className="inline-flex items-center text-sm font-medium text-secondary hover:text-primary transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Design Workspace
      </Link>

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-primary">Client Approval</h1>
        <p className="text-secondary mt-1 text-sm">Review submitted designs and track client decisions for {project.name}.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* PENDING APPROVAL */}
          <Card className={`border-2 ${pendingDesignStatus === 'Awaiting Review' ? 'border-accent/50' : 'border-border'}`}>
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="text-lg">Awaiting Client Approval</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/3 aspect-video bg-elevated rounded-lg border border-border flex items-center justify-center">
                  <span className="text-xs text-muted">Preview</span>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-primary">Living Room · V3</h3>
                      <p className="text-sm text-secondary mt-1">Submitted: 18 Sep 2026</p>
                      <p className="text-sm text-secondary">Designer: Ananya Rao</p>
                    </div>
                    {pendingDesignStatus === 'Awaiting Review' ? (
                      <Badge variant="warning">Awaiting Review</Badge>
                    ) : pendingDesignStatus === 'Approved' ? (
                      <Badge variant="success">Approved</Badge>
                    ) : (
                      <Badge variant="danger">Changes Requested</Badge>
                    )}
                  </div>
                  
                  {pendingDesignStatus === 'Awaiting Review' && (
                    <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border">
                      <Button variant="secondary" size="sm">View Design</Button>
                      <Button variant="danger" size="sm" onClick={() => setIsChangesModalOpen(true)}>Request Changes</Button>
                      <Button size="sm" onClick={() => setIsApproveModalOpen(true)}>Approve</Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* APPROVAL HISTORY */}
          <Card>
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="flex items-center gap-2"><History className="h-4 w-4 text-muted" /> Approval History</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 p-0">
              <div className="divide-y divide-border">
                {approvals.map(approval => (
                  <div key={approval.id} className="p-5">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-primary">{approval.versionId.replace('VER-00', 'V')}</span>
                        {approval.decision === 'Approved' ? (
                          <Badge variant="success"><CheckCircle2 className="mr-1 h-3 w-3"/> Approved</Badge>
                        ) : (
                          <Badge variant="danger"><AlertTriangle className="mr-1 h-3 w-3"/> Changes Requested</Badge>
                        )}
                      </div>
                      <span className="text-xs text-muted">{approval.date}</span>
                    </div>
                    {approval.comments && (
                      <div className="mt-3 p-3 bg-surface border border-border rounded-md text-sm text-secondary flex items-start gap-3">
                        <MessageSquare className="h-4 w-4 text-muted shrink-0 mt-0.5" />
                        <p>{approval.comments}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="flex items-center gap-2"><FileEdit className="h-4 w-4 text-muted" /> Design Activity</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {activities.map((activity, idx) => (
                  <div key={activity.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0"></div>
                      {idx !== activities.length - 1 && (
                        <div className="w-px h-full bg-border mt-2"></div>
                      )}
                    </div>
                    <div className="pb-1">
                      <p className="text-xs font-medium text-muted mb-1">{activity.date}</p>
                      <p className="text-sm font-medium text-primary">{activity.title}</p>
                      <p className="text-xs text-secondary mt-1">{activity.author}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* APPROVE MODAL */}
      <Modal
        isOpen={isApproveModalOpen}
        onClose={() => setIsApproveModalOpen(false)}
        title="Approve Design V3?"
        description="Once approved, this version will become the current approved design for this space."
      >
        <div className="pt-4 flex justify-end gap-3 mt-4 border-t border-border">
          <Button variant="ghost" onClick={() => setIsApproveModalOpen(false)}>Cancel</Button>
          <Button onClick={handleApprove}>Approve Design</Button>
        </div>
      </Modal>

      {/* REQUEST CHANGES MODAL */}
      <Modal
        isOpen={isChangesModalOpen}
        onClose={() => setIsChangesModalOpen(false)}
        title="Request Changes"
        description="Provide details on what needs to be modified."
      >
        <form onSubmit={handleRequestChanges} className="space-y-4">
          <div className="space-y-2 mt-4">
            <Label>Category (Optional)</Label>
            <select className="flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-primary appearance-none focus:outline-none focus:ring-1 focus:ring-accent">
              <option>Layout</option>
              <option>Colour</option>
              <option>Material</option>
              <option>Furniture</option>
              <option>Lighting</option>
              <option>Other</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label>Reason for changes</Label>
            <textarea 
              className="flex min-h-[100px] w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-primary placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-accent"
              placeholder="e.g., Make the TV wall lighter..."
              value={changesReason}
              onChange={e => setChangesReason(e.target.value)}
              required
            />
          </div>
          <div className="pt-4 flex justify-end gap-3 border-t border-border mt-6">
            <Button type="button" variant="ghost" onClick={() => setIsChangesModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="danger">Submit Changes</Button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
