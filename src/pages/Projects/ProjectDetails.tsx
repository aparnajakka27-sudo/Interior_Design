import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from '@/components/ui/Link';
import { usePermissions } from '@/hooks/usePermissions';
import { Can } from '@/components/auth/Can';
import { AccessDenied } from '@/pages/AccessDenied';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { 
  ArrowLeft, ArrowRight, Building2, MapPin, CheckCircle2, 
  AlertTriangle, Clock, Activity, Edit, Users, Receipt, Package, FileText, PenTool, HardHat, MessageSquare
} from 'lucide-react';
import { 
  detailedProjects, initialProjectTimeline, initialEmployees, initialTasks,
  type DetailedProject, type ProjectTimelineEvent, type ProjectHealth
} from '@/lib/mock-data';

const LIFECYCLE_STAGES = [
  'Planning', 'Site Visit', 'Design', 'Client Approval', 
  'Procurement', 'Production', 'Execution', 'Snagging', 'Handover', 'Completed'
];

export function ProjectDetails() {
  const { id } = useParams();
  const { canAccessProject } = usePermissions();
  
  // Local state
  const [project] = useState<DetailedProject | undefined>(
    detailedProjects.find(p => p.id === id)
  );
  
  
  if (!project) return <div className="p-8 text-center text-secondary">Project not found</div>;
  if (!canAccessProject(project.id)) return <AccessDenied />;
  
  const [timeline] = useState<ProjectTimelineEvent[]>(
    initialProjectTimeline.filter(t => t.projectId === project?.id)
  );

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <p className="text-secondary mb-4">Project not found.</p>
        <Link to="/projects"><Button variant="ghost">Back to Projects</Button></Link>
      </div>
    );
  }

  const currentStageIndex = LIFECYCLE_STAGES.indexOf(project.stage);

  const getHealthBadge = (health: ProjectHealth) => {
    switch(health) {
      case 'Healthy': return <Badge variant="success" className="bg-emerald-900/30 text-emerald-400 border border-emerald-900"><CheckCircle2 className="mr-1 h-3 w-3"/> Healthy</Badge>;
      case 'Attention': return <Badge variant="warning" className="bg-amber-900/30 text-amber-400 border border-amber-900"><Clock className="mr-1 h-3 w-3"/> Attention</Badge>;
      case 'At Risk': return <Badge variant="danger" className="bg-red-900/30 text-red-400 border border-red-900"><AlertTriangle className="mr-1 h-3 w-3"/> At Risk</Badge>;
      default: return <Badge variant="neutral">{health}</Badge>;
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-6 pb-12">
      {/* NAVIGATION */}
      <Link to="/projects" className="inline-flex items-center text-sm font-medium text-secondary hover:text-primary transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
      </Link>

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 bg-surface border border-border p-6 md:p-8 rounded-xl shadow-sm relative overflow-hidden">
        {/* Subtle accent line on top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-accent/20" />
        
        <div className="space-y-4 w-full">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-semibold text-primary tracking-tight">{project.name}</h1>
            <Badge variant="neutral" className="bg-background text-secondary border-border font-mono">{project.id}</Badge>
            {getHealthBadge(project.health)}
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-secondary">
            <span className="flex items-center gap-1.5 text-primary font-medium"><Building2 className="h-4 w-4 text-muted" /> {project.client}</span>
            <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-muted" /> {project.location}</span>
            <span className="flex items-center gap-1.5"><Badge variant="neutral" className="bg-accent/10 text-accent border-accent/20">{project.type}</Badge></span>
            <span className="flex items-center gap-1.5">Deadline: {project.deadline}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <Can permission="projects.edit">
              <Button variant="secondary" className="flex-1 lg:flex-none">
                <Edit className="mr-2 h-4 w-4" /> Edit Project
              </Button>
            </Can>
          <Button className="flex-1 lg:flex-none">
            Project Actions
          </Button>
        </div>
      </div>

      {/* PROGRESS LIFECYCLE */}
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex flex-col items-center justify-center shrink-0 w-24">
              <span className="text-3xl font-semibold text-primary mb-1">{project.progress}%</span>
              <span className="text-xs text-muted">Progress</span>
            </div>
            
            <div className="flex-1 w-full overflow-x-auto custom-scrollbar pb-4 md:pb-0">
              <div className="flex items-center min-w-max px-2">
                {LIFECYCLE_STAGES.map((stage, idx) => {
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
                      {idx < LIFECYCLE_STAGES.length - 1 && (
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

      {/* ROW 2: INFO | TEAM | HEALTH */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="border-b border-border pb-4">
            <CardTitle>Project Information</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div><span className="block text-xs text-muted mb-1">Property Size</span><span className="text-primary">{project.propertySize}</span></div>
              <div><span className="block text-xs text-muted mb-1">Start Date</span><span className="text-primary">{project.startDate}</span></div>
              <div><span className="block text-xs text-muted mb-1">Estimated Budget</span><span className="text-primary">{project.estimatedBudget}</span></div>
              <div><span className="block text-xs text-muted mb-1">Expected Completion</span><span className="text-primary">{project.expectedCompletion}</span></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b border-border pb-4 flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2"><Users className="h-4 w-4" /> Project Team</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            {project.team.map((member, i) => (
              <div key={i} className="flex items-center gap-3">
                <Avatar fallback={member.name.charAt(0)} size="sm" />
                <div>
                  <p className="text-sm font-medium text-primary leading-none">{member.name}</p>
                  <p className="text-xs text-muted mt-1">{member.role}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className={project.health === 'At Risk' ? 'border-red-900/30' : project.health === 'Attention' ? 'border-amber-900/30' : 'border-border'}>
          <CardHeader className="border-b border-border pb-4">
            <CardTitle className="flex items-center gap-2"><Activity className="h-4 w-4" /> Project Health</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 flex flex-col justify-center">
            <div className="mb-4">{getHealthBadge(project.health)}</div>
            <p className="text-sm text-secondary leading-relaxed">{project.healthDetail}</p>
          </CardContent>
        </Card>
      </div>

      {/* ROW 3: BUDGET | TASKS | MATERIALS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="border-b border-border pb-4">
            <CardTitle className="flex items-center gap-2"><Receipt className="h-4 w-4 text-muted" /> Financial Overview</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-3 text-sm">
            <div className="flex justify-between items-center"><span className="text-secondary">Contract Value:</span><span className="font-medium text-primary">₹18.5L</span></div>
            <div className="flex justify-between items-center"><span className="text-secondary">Invoiced:</span><span className="font-medium text-primary">₹14.8L</span></div>
            <div className="flex justify-between items-center"><span className="text-secondary">Received:</span><span className="font-medium text-emerald-400">₹11.2L</span></div>
            <div className="flex justify-between items-center"><span className="text-secondary">Outstanding:</span><span className="font-medium text-amber-400">₹3.6L</span></div>
            <div className="flex justify-between items-center"><span className="text-secondary">Expenses:</span><span className="font-medium text-red-400">₹12.2L</span></div>
            <div className="flex justify-between items-center"><span className="text-secondary">Estimated Profit:</span><span className="font-medium text-accent">₹6.3L (34%)</span></div>
            
            <Link to={`/finance/projects/${project.id}`}>
              <Button variant="ghost" className="w-full text-xs mt-3">View Financials <ArrowRight className="ml-2 h-3 w-3" /></Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b border-border pb-4">
            <CardTitle className="flex items-center gap-2"><HardHat className="h-4 w-4 text-muted" /> Site Execution</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4 text-sm">
            <div className="flex justify-between items-center"><span className="text-secondary">Site Progress:</span><span className="font-medium text-primary">{project.progress}% Complete</span></div>
            <div className="flex justify-between items-center"><span className="text-secondary">Labour:</span><span className="font-medium text-primary">18 Workers On Site</span></div>
            <div className="flex justify-between items-center"><span className="text-secondary">Open Issues:</span><span className="font-medium text-amber-400">2</span></div>
            <div className="flex justify-between items-center"><span className="text-secondary">Open Snags:</span><span className="font-medium text-red-400">4</span></div>
            <Link to={`/site-management/${project.id}`}><Button variant="ghost" className="w-full text-xs mt-3">Open Site Workspace <ArrowRight className="ml-2 h-3 w-3" /></Button></Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b border-border pb-4">
            <CardTitle className="flex items-center gap-2"><Package className="h-4 w-4 text-muted" /> Materials & Procurement</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-3 text-sm">
            <div className="flex justify-between items-center"><span className="text-secondary">Required Materials:</span><span className="font-medium text-primary">18</span></div>
            <div className="flex justify-between items-center"><span className="text-secondary">Pending Orders:</span><span className="font-medium text-amber-400">4</span></div>
            <div className="flex justify-between items-center"><span className="text-secondary">Delayed Deliveries:</span><span className="font-medium text-red-400">2</span></div>
            <div className="flex justify-between items-center"><span className="text-secondary">Procurement Value:</span><span className="font-medium text-accent">₹8.4L</span></div>
            <Link to={`/materials/${project.id}`}><Button variant="ghost" className="w-full text-xs mt-3">Open Procurement <ArrowRight className="ml-2 h-3 w-3" /></Button></Link>
          </CardContent>
        </Card>
      </div>

      {/* ROW 4: DESIGN & DOCUMENTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="border-b border-border pb-4">
            <CardTitle className="flex items-center gap-2"><PenTool className="h-4 w-4 text-muted" /> Design & Approval</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 flex flex-col sm:flex-row gap-6 text-sm">
            <div className="flex-1 space-y-4">
              <h4 className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">Design Status</h4>
              <div className="flex justify-between items-center"><span className="text-secondary">Current Version:</span><span className="font-medium text-primary">{project.design.currentVersion}</span></div>
              <div className="flex justify-between items-center"><span className="text-secondary">Status:</span><Badge variant="success" className="h-5 text-[10px]">{project.design.status}</Badge></div>
              <div className="flex justify-between items-center"><span className="text-secondary">Last Updated:</span><span className="text-primary">{project.design.lastUpdated}</span></div>
              <Link to={`/design-studio/${project.id}`}><Button variant="secondary" size="sm" className="w-full mt-2">Open Design Studio</Button></Link>
            </div>
            <div className="w-px bg-border hidden sm:block"></div>
            <div className="flex-1 space-y-4">
              <h4 className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">Client Approval</h4>
              <div className="flex justify-between items-center"><span className="text-secondary">Latest Approved:</span><span className="font-medium text-primary">{project.approval.latestVersion}</span></div>
              <div className="flex justify-between items-center"><span className="text-secondary">Approved On:</span><span className="text-primary">{project.approval.approvedOn}</span></div>
              <div className="flex justify-between items-center"><span className="text-secondary">Previous Versions:</span><span className="text-muted">{project.approval.previousVersions.join(', ')}</span></div>
              <Link to={`/design-studio/${project.id}/approval`}><Button variant="ghost" size="sm" className="w-full mt-2">View Approval <ArrowRight className="ml-2 h-3 w-3" /></Button></Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b border-border pb-4">
            <CardTitle className="flex items-center gap-2"><FileText className="h-4 w-4 text-muted" /> Documents</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4 text-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-secondary">Total Documents</span>
              <Badge variant="neutral">{project.documents.total}</Badge>
            </div>
            <div className="space-y-2">
              <span className="text-xs text-muted block mb-1">Latest Uploads</span>
              {project.documents.latest.map((doc, i) => (
                <div key={i} className="flex items-center gap-2 p-2 bg-surface border border-border rounded-md">
                  <FileText className="h-3 w-3 text-accent shrink-0" />
                  <span className="text-primary text-xs truncate">{doc}</span>
                </div>
              ))}
            </div>
            <Link to="/documents"><Button variant="ghost" className="w-full text-xs mt-2">View Documents <ArrowRight className="ml-2 h-3 w-3" /></Button></Link>
          </CardContent>
        </Card>
      </div>


      {/* ROW 4.5: PROJECT TEAM */}
      <Card>
        <CardHeader className="border-b border-border pb-4 flex flex-row justify-between items-center">
          <CardTitle className="flex items-center gap-2"><Users className="h-4 w-4 text-muted" /> Project Team</CardTitle>
          <Button variant="secondary" size="sm">Manage Team</Button>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {initialEmployees.filter(e => e.assignedProjects.includes(project.id)).map(emp => {
              const activeTasks = initialTasks.filter(t => t.assigneeId === emp.id && t.projectId === project.id && t.status !== 'Completed').length;
              return (
                <Link to={`/team/${emp.id}`} key={emp.id} className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background hover:border-accent/50 transition-colors">
                  <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-medium shrink-0">
                    {emp.avatarInitials}
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-medium text-primary text-sm truncate">{emp.name}</p>
                    <p className="text-[10px] text-muted">{emp.role}</p>
                    {activeTasks > 0 && <p className="text-[10px] text-amber-400 mt-0.5">{activeTasks} Active Tasks</p>}
                  </div>
                </Link>
              )
            })}
            {initialEmployees.filter(e => e.assignedProjects.includes(project.id)).length === 0 && (
              <p className="text-sm text-muted py-4 col-span-4 text-center">No team members assigned.</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* ROW 5: TIMELINE */}
      <Card>
        <CardHeader className="border-b border-border pb-4">
          <CardTitle>Project Timeline & Activity</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            {timeline.map((event, idx) => (
              <div key={event.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-accent border-2 border-surface mt-1 z-10 shrink-0"></div>
                  {idx !== timeline.length - 1 && (
                    <div className="w-px h-full bg-border -my-1"></div>
                  )}
                </div>
                <div className="pb-4">
                  <p className="text-xs font-medium text-muted mb-1">{event.date}</p>
                  <p className="text-sm font-medium text-primary">{event.title}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>


      {/* Documents & Messages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="border-b border-border pb-4 flex flex-row justify-between items-center">
            <CardTitle className="flex items-center gap-2"><FileText className="h-4 w-4 text-muted"/> Project Documents</CardTitle>
            <Can permission="documents.view">
              <Link to={`/projects/${project.id}/documents`}><Button variant="ghost" size="sm">View All</Button></Link>
            </Can>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-secondary">Recent Documents</span>
              <span className="font-medium text-primary">3</span>
            </div>
            <Can permission="documents.view">
              <Link to={`/projects/${project.id}/documents`}><Button variant="secondary" size="sm" className="w-full mt-2">Open Documents</Button></Link>
            </Can>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b border-border pb-4 flex flex-row justify-between items-center">
            <CardTitle className="flex items-center gap-2"><MessageSquare className="h-4 w-4 text-muted"/> Project Messages</CardTitle>
            <Can permission="messages.view">
              <Link to="/messages/CONV-001"><Button variant="ghost" size="sm">View All</Button></Link>
            </Can>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-secondary">Unread Messages</span>
              <Badge variant="warning" className="bg-accent text-accent-foreground border-accent">2</Badge>
            </div>
            <div className="p-3 bg-surface rounded-lg border border-border">
              <p className="text-xs text-muted mb-1">Latest from Rahul Sharma</p>
              <p className="text-sm font-medium text-primary">"Material delivery has been received."</p>
            </div>
            <Can permission="messages.view">
              <Link to="/messages/CONV-001"><Button variant="secondary" size="sm" className="w-full mt-2">Open Conversation</Button></Link>
            </Can>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
