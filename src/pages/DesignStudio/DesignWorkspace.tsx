import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from '@/components/ui/Link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { 
  ArrowLeft, LayoutTemplate, Upload, Share2, 
  Plus, MessageSquare, Clock, CheckCircle2, Layers, Ruler, Search, Package
} from 'lucide-react';
import { 
  detailedProjects, initialDesignSpaces, initialDesignVersions, 
  initialDesignComments, type DesignSpace 
} from '@/lib/mock-data';

const DESIGN_STAGES = ['Brief', 'Concept', 'Design Development', 'Client Review', 'Revisions', 'Approved'];

export function DesignWorkspace() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  
  const project = detailedProjects.find(p => p.id === projectId) || detailedProjects[0];
  const spaces = initialDesignSpaces.filter(s => s.projectId === project.id);
  
  const [activeSpace, setActiveSpace] = useState<DesignSpace | null>(spaces[0] || null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [newComment, setNewComment] = useState('');

  if (!project) return <div>Project not found</div>;

  const currentStageIndex = 3; // "Client Review" for demo

  const activeVersions = activeSpace 
    ? initialDesignVersions.filter(v => v.spaceId === activeSpace.id).reverse()
    : [];
    
  const activeVersion = activeVersions[0]; // Latest version
  
  const comments = activeVersion 
    ? initialDesignComments.filter(c => c.versionId === activeVersion.id)
    : [];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Approved': return <Badge variant="success">Approved</Badge>;
      case 'Client Review': return <Badge variant="warning">Client Review</Badge>;
      case 'Changes Requested': return <Badge variant="danger">Changes Requested</Badge>;
      case 'Draft':
      case 'Design Development': return <Badge variant="neutral">{status}</Badge>;
      default: return <Badge variant="neutral">{status}</Badge>;
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-6 pb-12">
      {/* NAVIGATION */}
      <Link to="/design-studio" className="inline-flex items-center text-sm font-medium text-secondary hover:text-primary transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Design Studio
      </Link>

      {/* WORKSPACE HEADER */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-surface border border-border p-6 md:p-8 rounded-xl shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 bottom-0 w-1 bg-accent/80" />
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-primary">{project.name}</h1>
            <Badge variant="neutral" className="bg-background">{project.type}</Badge>
            {getStatusBadge(project.design.status)}
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-secondary">
            <span>Designer: <span className="text-primary font-medium">{project.designer}</span></span>
            <span>Project Manager: <span className="text-primary font-medium">{project.projectManager}</span></span>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <Button variant="secondary" onClick={() => navigate(`/design-studio/${project.id}/approval`)}>
            Client Approvals
          </Button>
          <Button variant="secondary" onClick={() => setIsShareModalOpen(true)}>
            <Share2 className="mr-2 h-4 w-4" /> Share
          </Button>
          <Button>
            <Upload className="mr-2 h-4 w-4" /> Upload Design
          </Button>
        </div>
      </div>

      {/* DESIGN PROGRESS */}
      <div className="bg-elevated border border-border rounded-xl p-6 overflow-x-auto custom-scrollbar">
        <div className="flex items-center min-w-max">
          {DESIGN_STAGES.map((stage, idx) => {
            const isCompleted = idx < currentStageIndex;
            const isCurrent = idx === currentStageIndex;
            return (
              <React.Fragment key={stage}>
                <div className="flex items-center gap-2 relative z-10">
                  <div className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-colors
                    ${isCompleted ? 'border-accent bg-accent/10 text-accent' : 
                      isCurrent ? 'border-accent bg-accent text-background' : 
                      'border-border bg-background text-muted'}`}
                  >
                    {stage}
                  </div>
                </div>
                {idx < DESIGN_STAGES.length - 1 && (
                  <div className={`w-16 h-px mx-2 ${isCompleted ? 'bg-accent' : 'bg-border'}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        
        {/* LEFT COLUMN: SPACES LIST */}
        <div className="xl:col-span-1 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-primary">Spaces</h3>
            <Button variant="ghost" size="sm" className="h-8 px-2"><Plus className="h-4 w-4" /></Button>
          </div>
          
          <div className="space-y-3">
            {spaces.map(space => (
              <div 
                key={space.id} 
                onClick={() => setActiveSpace(space)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  activeSpace?.id === space.id 
                    ? 'border-accent bg-accent/5 shadow-[0_0_0_1px_rgba(181,154,114,0.2)]' 
                    : 'border-border bg-surface hover:border-accent/50'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-primary">{space.name}</h4>
                  <span className="text-xs font-medium text-secondary">{space.currentVersionId.replace('VER-00', 'V')}</span>
                </div>
                <div className="mb-3">{getStatusBadge(space.status)}</div>
                <div className="flex justify-between items-center text-xs text-muted">
                  <span>{space.area}</span>
                  <span>{space.lastUpdated}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: ACTIVE SPACE DETAILS */}
        {activeSpace && activeVersion ? (
          <div className="xl:col-span-3 space-y-6">
            
            {/* VIEWER AREA */}
            <Card className="overflow-hidden border-border bg-surface">
              <div className="p-4 border-b border-border flex justify-between items-center bg-elevated/50">
                <div className="flex items-center gap-3">
                  <LayoutTemplate className="h-5 w-5 text-accent" />
                  <div>
                    <h2 className="font-medium text-primary leading-none">{activeSpace.name} <span className="text-muted ml-2">{activeVersion.versionNumber}</span></h2>
                    <p className="text-xs text-secondary mt-1">{activeVersion.title} • Updated {activeVersion.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="secondary" size="sm">Request Changes</Button>
                  <Button size="sm">Approve Design</Button>
                </div>
              </div>
              
              <div className="aspect-video w-full bg-background flex items-center justify-center relative group">
                <div className="absolute inset-0 flex items-center justify-center border-4 border-dashed border-border/20 m-8 rounded-xl">
                  <div className="text-center">
                    <Search className="h-8 w-8 text-muted mx-auto mb-3 opacity-50" />
                    <p className="text-muted font-medium">Design Preview Placeholder</p>
                    <p className="text-xs text-secondary/50 mt-1">{activeVersion.versionNumber} - {activeSpace.style}</p>
                  </div>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* SPECS & DETAILS */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader className="border-b border-border pb-4">
                    <CardTitle className="text-base flex items-center gap-2"><Layers className="h-4 w-4 text-muted"/> Design Information</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
                      <div>
                        <span className="block text-xs text-muted mb-1">Style</span>
                        <span className="text-sm text-primary font-medium">{activeSpace.style}</span>
                      </div>
                      <div>
                        <span className="block text-xs text-muted mb-1">Dimensions</span>
                        <span className="text-sm text-primary font-medium">{activeSpace.dimensions}</span>
                      </div>
                      <div>
                        <span className="block text-xs text-muted mb-1">Area</span>
                        <span className="text-sm text-primary font-medium">{activeSpace.area}</span>
                      </div>
                      <div>
                        <span className="block text-xs text-muted mb-1">Designer</span>
                        <span className="text-sm text-primary font-medium">{activeVersion.designer}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 border-t border-border pt-6">
                      <div>
                        <h4 className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">Materials</h4>
                        <ul className="space-y-2">
                          {activeVersion.materials.map((m, i) => (
                            <li key={i} className="text-sm text-secondary flex items-center before:content-[''] before:w-1.5 before:h-1.5 before:bg-accent/50 before:rounded-full before:mr-2">{m}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">Colours</h4>
                        <ul className="space-y-2">
                          {activeVersion.colors.map((c, i) => (
                            <li key={i} className="text-sm text-secondary flex items-center before:content-[''] before:w-1.5 before:h-1.5 before:bg-accent/50 before:rounded-full before:mr-2">{c}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">Furniture</h4>
                        <ul className="space-y-2">
                          {activeVersion.furniture.map((f, i) => (
                            <li key={i} className="text-sm text-secondary flex items-center before:content-[''] before:w-1.5 before:h-1.5 before:bg-accent/50 before:rounded-full before:mr-2">{f}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">Lighting</h4>
                        <ul className="space-y-2">
                          {activeVersion.lighting.map((l, i) => (
                            <li key={i} className="text-sm text-secondary flex items-center before:content-[''] before:w-1.5 before:h-1.5 before:bg-accent/50 before:rounded-full before:mr-2">{l}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="border-b border-border pb-4">
                    <CardTitle className="text-base flex items-center gap-2"><Ruler className="h-4 w-4 text-muted"/> Measurements & Clearances</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ul className="space-y-3">
                      {activeVersion.measurements.map((m, i) => (
                        <li key={i} className="text-sm text-secondary bg-background border border-border rounded-md p-2.5 px-4">{m}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="border-b border-border pb-4 flex flex-row justify-between items-center">
                    <CardTitle className="text-base flex items-center gap-2"><Package className="h-4 w-4 text-muted"/> Required Materials</CardTitle>
                    <Link to={`/materials/${project.id}`}>
                      <Button variant="ghost" size="sm">Open Procurement</Button>
                    </Link>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center border-b border-border pb-3">
                        <div>
                          <p className="text-sm font-medium text-primary">Italian Marble</p>
                          <p className="text-xs text-secondary">Classic Marbles</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-primary">420 sq ft</p>
                          <Badge variant="warning" className="mt-1 text-[10px]">Partially Received</Badge>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-primary">Pendant Lights</p>
                          <p className="text-xs text-secondary">Lumina Studio</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-primary">14 Units</p>
                          <Badge variant="success" className="mt-1 bg-emerald-900/30 text-emerald-400 text-[10px]">Approved</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* COMMENTS & VERSIONS */}
              <div className="space-y-6">
                
                <Card>
                  <CardHeader className="border-b border-border pb-4">
                    <CardTitle className="text-base flex items-center justify-between">
                      <span className="flex items-center gap-2"><MessageSquare className="h-4 w-4 text-muted" /> Client Comments</span>
                      <Badge variant="neutral">{comments.length}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 p-0 flex flex-col h-[400px]">
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-4">
                      {comments.map(comment => (
                        <div key={comment.id} className={`p-3 rounded-lg text-sm border ${comment.type === 'client' ? 'bg-background border-border' : 'bg-accent/5 border-accent/20'}`}>
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-medium text-primary">{comment.author}</span>
                            <span className="text-xs text-muted">{comment.date}</span>
                          </div>
                          <p className="text-secondary leading-relaxed">{comment.text}</p>
                          <div className="mt-3 flex justify-between items-center">
                            {comment.isResolved ? (
                              <span className="text-xs text-emerald-400 flex items-center"><CheckCircle2 className="mr-1 h-3 w-3" /> Resolved</span>
                            ) : (
                              <span className="text-xs text-amber-400 flex items-center"><Clock className="mr-1 h-3 w-3" /> Pending</span>
                            )}
                            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">Reply</Button>
                          </div>
                        </div>
                      ))}
                      {comments.length === 0 && (
                        <p className="text-center text-sm text-muted py-8">No comments on this version yet.</p>
                      )}
                    </div>
                    <div className="p-4 border-t border-border bg-surface">
                      <form className="flex gap-2" onSubmit={e => { e.preventDefault(); setNewComment(''); }}>
                        <Input 
                          placeholder="Add a comment..." 
                          className="flex-1 text-sm"
                          value={newComment}
                          onChange={e => setNewComment(e.target.value)}
                        />
                        <Button type="submit" size="sm" disabled={!newComment.trim()}>Send</Button>
                      </form>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="border-b border-border pb-4">
                    <CardTitle className="text-base">Version History</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 p-0">
                    <div className="divide-y divide-border">
                      {activeVersions.map(v => (
                        <div key={v.id} className={`p-4 transition-colors cursor-pointer ${v.id === activeVersion.id ? 'bg-elevated/50 border-l-2 border-l-accent' : 'hover:bg-elevated/30 border-l-2 border-l-transparent'}`}>
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-medium text-primary">{v.versionNumber}: {v.title}</span>
                            <span className="text-xs text-muted">{v.date}</span>
                          </div>
                          <p className="text-xs text-secondary mb-2">{v.status}</p>
                          {v.id !== activeVersion.id && (
                            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs w-full">Open Version</Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

              </div>
            </div>
          </div>
        ) : (
          <div className="xl:col-span-3 flex items-center justify-center border border-border border-dashed rounded-xl bg-surface min-h-[400px]">
            <p className="text-muted">Select a space to view design details.</p>
          </div>
        )}
      </div>

      <Modal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title="Share Design Workspace"
        description="Generate a secure link for the client to review."
      >
        <div className="space-y-4 pt-2">
          <div className="p-3 bg-background border border-border rounded-md text-sm text-secondary font-mono truncate">
            https://decormart.studio/client-portal/PRJ-001/review
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="ghost" onClick={() => setIsShareModalOpen(false)}>Close</Button>
            <Button onClick={() => setIsShareModalOpen(false)}>Copy Link</Button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
