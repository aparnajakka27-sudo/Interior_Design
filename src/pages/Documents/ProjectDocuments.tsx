
import { useParams } from 'react-router-dom';
import { Link } from '@/components/ui/Link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { FileText, ArrowLeft, Upload } from 'lucide-react';
import { initialDocuments, detailedProjects, initialEmployees } from '@/lib/mock-data';
import { usePermissions } from '@/hooks/usePermissions';
import { Can } from '@/components/auth/Can';
import { AccessDenied } from '@/pages/AccessDenied';

export function ProjectDocuments() {
  const { projectId } = useParams();
  const { canAccessProject } = usePermissions();
  
  if (!projectId || !canAccessProject(projectId)) return <AccessDenied />;

  const project = detailedProjects.find(p => p.id === projectId);
  if (!project) return <div className="p-8 text-center text-secondary">Project not found</div>;

  const projectDocs = initialDocuments.filter(d => d.projectId === projectId);
  
  const categories = Array.from(new Set(projectDocs.map(d => d.category)));

  return (
    <div className="max-w-[1200px] mx-auto space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Link to={`/projects/${projectId}`}>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-muted hover:text-primary">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <span className="text-xs font-medium text-accent uppercase tracking-wider">{project.name}</span>
          </div>
          <h1 className="text-2xl font-semibold text-primary">Project Documents</h1>
        </div>
        <div className="flex gap-3">
          <Can permission="documents.manage">
            <Button size="sm"><Upload className="h-4 w-4 mr-2" /> Upload Document</Button>
          </Can>
        </div>
      </div>

      <div className="space-y-8">
        {categories.length === 0 && (
          <div className="text-center p-12 bg-surface border border-border rounded-xl">
            <FileText className="h-12 w-12 text-muted mx-auto mb-4" />
            <h3 className="text-lg font-medium text-primary">No Documents</h3>
            <p className="text-sm text-secondary mt-1">There are no documents uploaded for this project yet.</p>
          </div>
        )}

        {categories.map(category => (
          <div key={category} className="space-y-4">
            <h3 className="text-lg font-medium text-primary border-b border-border pb-2">{category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projectDocs.filter(d => d.category === category).map(doc => {
                const uploader = initialEmployees.find(e => e.id === doc.uploadedBy);
                return (
                  <Card key={doc.id} className="hover:border-accent/50 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-start gap-3">
                          <FileText className="h-8 w-8 text-muted shrink-0" />
                          <div>
                            <Link to={`/documents/${doc.id}`} className="font-medium text-primary hover:text-accent text-sm line-clamp-2">
                              {doc.name}
                            </Link>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="neutral" className="text-[10px]">{doc.version}</Badge>
                              <Badge variant={doc.status === 'Approved' ? 'success' : doc.status === 'Under Review' ? 'warning' : 'neutral'} className="text-[10px]">
                                {doc.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-end mt-4 pt-4 border-t border-border">
                        <div>
                          <p className="text-[10px] text-muted">Uploaded by</p>
                          <p className="text-xs text-secondary font-medium">{uploader?.name || doc.uploadedBy}</p>
                        </div>
                        <p className="text-[10px] text-muted">{doc.date}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
