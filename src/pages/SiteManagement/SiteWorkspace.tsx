import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from '@/components/ui/Link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { 
  ArrowLeft, Plus, Calendar, AlertTriangle, PenTool, CheckCircle2, Package, Users
} from 'lucide-react';
import { 
  detailedProjects, initialSiteUpdates 
} from '@/lib/mock-data';

const EXECUTION_STAGES = [
  'Pre-Execution', 'Civil Work', 'MEP', 'Carpentry', 'Painting', 
  'Installation', 'Finishing', 'Snagging', 'Handover'
];

export function SiteWorkspace() {
  const { projectId } = useParams();
  
  const project = detailedProjects.find(p => p.id === projectId) || detailedProjects[0];
  const updates = initialSiteUpdates.filter(u => u.projectId === project.id);
  
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [newUpdate, setNewUpdate] = useState({ progress: project.progress.toString(), notes: '' });

  if (!project) return <div>Project not found</div>;

  const currentStageIndex = 3; // 'Carpentry' roughly mapped for demo purposes

  return (
    <div className="max-w-[1600px] mx-auto space-y-6 pb-12">
      {/* NAVIGATION */}
      <Link to="/site-management" className="inline-flex items-center text-sm font-medium text-secondary hover:text-primary transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Sites
      </Link>

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-surface border border-border p-6 md:p-8 rounded-xl shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 bottom-0 w-1 bg-accent/80" />
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-primary">{project.name}</h1>
            <Badge variant="neutral" className="bg-background">{project.type}</Badge>
            {project.health === 'Healthy' ? <Badge variant="success">On Track</Badge> : <Badge variant="danger">At Risk</Badge>}
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-secondary">
            <span>Site Manager: <span className="text-primary font-medium">{project.siteManager}</span></span>
            <span>Project Manager: <span className="text-primary font-medium">{project.projectManager}</span></span>
            <span>Current Stage: <span className="text-primary font-medium">{project.stage}</span></span>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <Link to={`/site-management/${project.id}/visits`}><Button variant="secondary"><Calendar className="mr-2 h-4 w-4" /> Visits</Button></Link>
          <Link to={`/site-management/${project.id}/issues`}><Button variant="secondary"><AlertTriangle className="mr-2 h-4 w-4" /> Issues</Button></Link>
          <Link to={`/site-management/${project.id}/snags`}><Button variant="secondary"><PenTool className="mr-2 h-4 w-4" /> Snags</Button></Link>
          <Button onClick={() => setIsUpdateModalOpen(true)}><Plus className="mr-2 h-4 w-4" /> Update</Button>
        </div>
      </div>

      {/* EXECUTION PROGRESS */}
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex flex-col items-center justify-center shrink-0 w-24">
              <span className="text-3xl font-semibold text-primary mb-1">{project.progress}%</span>
              <span className="text-xs text-muted">Progress</span>
            </div>
            
            <div className="flex-1 w-full overflow-x-auto custom-scrollbar pb-4 md:pb-0">
              <div className="flex items-center min-w-max px-2">
                {EXECUTION_STAGES.map((stage, idx) => {
                  const isCompleted = idx < currentStageIndex;
                  const isCurrent = idx === currentStageIndex;
                  return (
                    <React.Fragment key={stage}>
                      <div className="flex flex-col items-center gap-2 relative z-10 w-24">
                        <div className={`w-4 h-4 rounded-full border-2 bg-background flex items-center justify-center
                          ${isCompleted ? 'border-accent bg-accent' : isCurrent ? 'border-accent' : 'border-border'}`}
                        >
                          {isCurrent && <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />}
                        </div>
                        <span className={`text-[11px] font-medium text-center leading-tight
                          ${isCurrent ? 'text-accent' : isCompleted ? 'text-primary' : 'text-muted'}`}
                        >
                          {stage}
                        </span>
                      </div>
                      {idx < EXECUTION_STAGES.length - 1 && (
                        <div className={`flex-1 h-[2px] -ml-4 -mr-4 mb-5 z-0 min-w-[30px]
                          ${isCompleted ? 'bg-accent/50' : 'bg-border'}`} 
                        />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* TODAY'S SITE SUMMARY */}
          <Card>
            <CardHeader className="border-b border-border pb-4">
              <CardTitle>Today's Site Summary</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4 text-sm">
              <div className="flex justify-between items-center"><span className="text-secondary flex items-center"><Users className="mr-2 h-4 w-4 text-muted"/> Workers On Site:</span><span className="font-medium text-primary">18 / 20</span></div>
              <div className="flex justify-between items-center"><span className="text-secondary flex items-center"><CheckCircle2 className="mr-2 h-4 w-4 text-muted"/> Tasks Completed:</span><span className="font-medium text-primary">12</span></div>
              <div className="flex justify-between items-center"><span className="text-secondary flex items-center"><PenTool className="mr-2 h-4 w-4 text-muted"/> Tasks In Progress:</span><span className="font-medium text-primary">7</span></div>
              <div className="flex justify-between items-center"><span className="text-secondary flex items-center"><AlertTriangle className="mr-2 h-4 w-4 text-muted"/> Issues Reported:</span><span className="font-medium text-primary">2</span></div>
              <div className="flex justify-between items-center"><span className="text-secondary flex items-center"><Package className="mr-2 h-4 w-4 text-muted"/> Materials Received:</span><span className="font-medium text-primary">6</span></div>
            </CardContent>
          </Card>

          {/* SITE TEAM */}
          <Card>
            <CardHeader className="border-b border-border pb-4">
              <CardTitle>Site Team</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-primary">Vikram Singh</p>
                  <p className="text-xs text-muted">Site Manager</p>
                </div>
                <Badge variant="success">Present</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-primary">Karan Sharma</p>
                  <p className="text-xs text-muted">Electrical Supervisor</p>
                </div>
                <Badge variant="success">Present</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-primary">Rakesh Patel</p>
                  <p className="text-xs text-muted">Carpentry Lead</p>
                </div>
                <Badge variant="neutral">Absent</Badge>
              </div>
            </CardContent>
          </Card>

          {/* MATERIALS */}
          <Card>
            <CardHeader className="border-b border-border pb-4">
              <CardTitle>Materials On-Site</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div>
                <p className="text-sm font-medium text-primary">Italian Marble</p>
                <p className="text-xs text-muted">280 / 420 sq ft received</p>
              </div>
              <div>
                <p className="text-sm font-medium text-primary">Oak Veneer</p>
                <p className="text-xs text-muted">0 / 120 sheets received</p>
              </div>
              <div>
                <p className="text-sm font-medium text-primary">Electrical Wiring</p>
                <p className="text-xs text-muted">10 / 18 coils received</p>
              </div>
              <Link to={`/materials/${project.id}`} className="block mt-4">
                <Button variant="secondary" className="w-full text-xs">View Procurement</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="h-full">
            <CardHeader className="border-b border-border pb-4">
              <CardTitle>Daily Site Updates</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-8">
                {updates.map(update => (
                  <div key={update.id} className="relative pl-6 border-l border-border">
                    <div className="absolute w-3 h-3 bg-accent rounded-full -left-[6.5px] top-1"></div>
                    
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-2">
                      <div>
                        <h3 className="text-lg font-medium text-primary">{update.date}</h3>
                        <p className="text-sm text-secondary">{update.author}</p>
                      </div>
                      <Badge variant="neutral" className="w-fit">{update.progressBefore}% &rarr; {update.progressAfter}%</Badge>
                    </div>

                    <div className="space-y-4 bg-surface p-4 rounded-lg border border-border">
                      {update.completed.length > 0 && (
                        <div>
                          <h4 className="text-xs font-semibold text-muted uppercase mb-2">Work Completed</h4>
                          <ul className="list-disc pl-4 space-y-1">
                            {update.completed.map((item, i) => <li key={i} className="text-sm text-primary">{item}</li>)}
                          </ul>
                        </div>
                      )}
                      {update.planned.length > 0 && (
                        <div>
                          <h4 className="text-xs font-semibold text-muted uppercase mb-2">Work Planned (Next Day)</h4>
                          <ul className="list-disc pl-4 space-y-1">
                            {update.planned.map((item, i) => <li key={i} className="text-sm text-secondary">{item}</li>)}
                          </ul>
                        </div>
                      )}
                      {update.blockers.length > 0 && (
                        <div>
                          <h4 className="text-xs font-semibold text-red-400 uppercase mb-2">Blockers / Issues</h4>
                          <ul className="list-disc pl-4 space-y-1">
                            {update.blockers.map((item, i) => <li key={i} className="text-sm text-red-300">{item}</li>)}
                          </ul>
                        </div>
                      )}
                      {update.notes && (
                        <div>
                          <h4 className="text-xs font-semibold text-muted uppercase mb-1">Notes</h4>
                          <p className="text-sm text-secondary italic">{update.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Modal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        title="Add Daily Site Update"
        description="Record today's progress, blockers, and plans for tomorrow."
      >
        <form className="space-y-4 mt-4" onSubmit={e => { e.preventDefault(); setIsUpdateModalOpen(false); }}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date</Label>
              <Input type="date" className="text-secondary" />
            </div>
            <div className="space-y-2">
              <Label>Overall Progress (%)</Label>
              <Input type="number" value={newUpdate.progress} onChange={e => setNewUpdate({...newUpdate, progress: e.target.value})} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Work Completed Today</Label>
            <textarea className="flex min-h-[80px] w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-primary placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-accent" placeholder="Bulleted items..."></textarea>
          </div>
          <div className="space-y-2">
            <Label>Work Planned Tomorrow</Label>
            <textarea className="flex min-h-[80px] w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-primary placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-accent" placeholder="Bulleted items..."></textarea>
          </div>
          <div className="space-y-2">
            <Label>Blockers / Issues</Label>
            <textarea className="flex min-h-[60px] w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-primary placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-accent" placeholder="Any issues blocking progress..."></textarea>
          </div>
          <div className="pt-4 flex justify-end gap-3 border-t border-border mt-6">
            <Button type="button" variant="ghost" onClick={() => setIsUpdateModalOpen(false)}>Cancel</Button>
            <Button type="submit">Submit Update</Button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
