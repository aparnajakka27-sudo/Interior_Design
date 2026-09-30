import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { 
  ArrowLeft, FileText, Download, UploadCloud, Clock, MessageSquare, CheckCircle, FolderKanban
} from 'lucide-react';
import { initialDocuments, initialEmployees, detailedProjects } from '@/lib/mock-data';
import { usePermissions } from '@/hooks/usePermissions';
import { Can } from '@/components/auth/Can';
import { AccessDenied } from '@/pages/AccessDenied';

export function DocumentDetails() {
  const { id } = useParams();
  const { canAccessProject } = usePermissions();
  
  const [document] = useState(initialDocuments.find(d => d.id === id));

  if (!document) return <div className="p-8 text-center text-secondary">Document not found</div>;
  if (document.projectId && !canAccessProject(document.projectId)) return <AccessDenied />;

  const uploader = initialEmployees.find(e => e.id === document.uploadedBy);
  const project = detailedProjects.find(p => p.id === document.projectId);

  return (
    <div className="max-w-[1000px] mx-auto space-y-6 pb-12">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/documents">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="neutral">{document.category}</Badge>
            <Badge variant={document.status === 'Approved' ? 'success' : document.status === 'Under Review' ? 'warning' : 'neutral'}>
              {document.status}
            </Badge>
          </div>
          <h1 className="text-2xl font-semibold text-primary flex items-center gap-3">
            <FileText className="h-6 w-6 text-accent" />
            {document.name}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm"><Download className="h-4 w-4 mr-2"/> Download</Button>
          <Can permission="documents.manage">
            <Button size="sm"><UploadCloud className="h-4 w-4 mr-2"/> New Version</Button>
          </Can>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="text-lg">Document Details</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                <div>
                  <p className="text-xs text-muted mb-1">Project</p>
                  {project ? (
                    <Link to={`/projects/${project.id}`} className="text-sm font-medium text-primary hover:text-accent flex items-center gap-2">
                      <FolderKanban className="h-4 w-4 text-muted" />
                      {project.name}
                    </Link>
                  ) : (
                    <p className="text-sm text-secondary">—</p>
                  )}
                </div>
                <div>
                  <p className="text-xs text-muted mb-1">Uploaded By</p>
                  <div className="flex items-center gap-2">
                    <Avatar fallback={uploader?.avatarInitials || 'U'} size="sm" className="h-6 w-6" />
                    <span className="text-sm font-medium text-primary">{uploader?.name || document.uploadedBy}</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted mb-1">Current Version</p>
                  <p className="text-sm font-medium text-primary">{document.version}</p>
                </div>
                <div>
                  <p className="text-xs text-muted mb-1">Last Updated</p>
                  <p className="text-sm text-primary">{document.date}</p>
                </div>
                <div>
                  <p className="text-xs text-muted mb-1">File Size</p>
                  <p className="text-sm text-primary">{document.size}</p>
                </div>
                <div>
                  <p className="text-xs text-muted mb-1">Category</p>
                  <p className="text-sm text-primary">{document.category}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="text-lg flex items-center gap-2"><Clock className="h-5 w-5 text-muted"/> Version History</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {document.versions.map(v => {
                  const user = initialEmployees.find(e => e.id === v.uploadedBy);
                  return (
                    <div key={v.id} className="p-4 flex items-center justify-between hover:bg-elevated/30">
                      <div className="flex items-center gap-4">
                        <div className="bg-surface border border-border h-10 w-10 rounded flex items-center justify-center font-medium text-primary">
                          {v.version}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-primary">{user?.name || v.uploadedBy}</p>
                          <p className="text-xs text-muted">{v.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {v.status === 'Current' && <Badge variant="success">Current</Badge>}
                        <Button variant="ghost" size="sm" className="h-8 px-2"><Download className="h-4 w-4" /></Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="text-lg">Activity</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-border before:z-0">
                {document.activity.map((act) => {
                  const actUser = initialEmployees.find(e => e.id === act.user) || { name: act.user, avatarInitials: 'U' };
                  return (
                    <div key={act.id} className="relative z-10 flex items-start gap-4">
                      <div className="h-8 w-8 rounded-full bg-surface border border-border flex items-center justify-center shrink-0 text-xs">
                        {act.type === 'Reviewed' || act.type === 'Comment added' ? <MessageSquare className="h-4 w-4 text-amber-400" /> :
                         act.type === 'Approved' ? <CheckCircle className="h-4 w-4 text-emerald-400" /> :
                         <UploadCloud className="h-4 w-4 text-accent" />}
                      </div>
                      <div className="flex-1 pt-1">
                        <p className="text-sm font-medium text-primary">{act.type}</p>
                        <p className="text-xs text-muted mt-0.5">{actUser.name} · {act.date}</p>
                        {act.comment && (
                          <div className="mt-2 p-3 bg-surface border border-border rounded-lg text-sm text-secondary italic">
                            "{act.comment}"
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
