import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { 
  ArrowLeft, Edit, Mail, Phone, FolderKanban, MessageSquare, FileText, IndianRupee
} from 'lucide-react';
import { initialClients, detailedProjects, initialDocuments, initialConversations } from '@/lib/mock-data';
import { Can } from '@/components/auth/Can';

export function ClientDetails() {
  const { id } = useParams();
  const [client] = useState(initialClients.find(c => c.id === id));

  if (!client) return <div className="p-8 text-center text-secondary">Client not found</div>;

  const clientProjects = detailedProjects.filter(p => p.clientId === client.id);
  const clientDocs = initialDocuments.filter(d => d.visibility === 'client' && clientProjects.some(p => p.id === d.projectId));
  const clientConvs = initialConversations.filter(c => c.type === 'Client' && clientProjects.some(p => p.id === c.projectId));

  return (
    <div className="max-w-[1200px] mx-auto space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-4">
          <Link to="/clients">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <Avatar fallback={client.avatarInitials} size="lg" className="h-12 w-12" />
            <div>
              <h1 className="text-2xl font-semibold text-primary leading-tight">{client.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-secondary">{client.company || 'Private Client'}</span>
                <Badge variant={client.status === 'Active' ? 'success' : 'neutral'} className="text-[10px]">{client.status}</Badge>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Can permission="clients.manage">
            <Button variant="secondary" size="sm"><Edit className="h-4 w-4 mr-2" /> Edit Client</Button>
          </Can>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="text-lg">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center gap-3 text-sm text-secondary">
                <Mail className="h-4 w-4 text-muted" />
                <a href={`mailto:${client.email}`} className="hover:text-accent">{client.email}</a>
              </div>
              <div className="flex items-center gap-3 text-sm text-secondary">
                <Phone className="h-4 w-4 text-muted" />
                <a href={`tel:${client.phone}`} className="hover:text-accent">{client.phone}</a>
              </div>
              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted mb-1">Joined</p>
                <p className="text-sm text-primary">{client.createdAt}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="text-lg">Communication</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {clientConvs.length > 0 ? (
                <div className="space-y-4">
                  {clientConvs.map(conv => (
                    <Link key={conv.id} to={`/messages/${conv.id}`} className="block p-3 bg-surface border border-border rounded-lg hover:border-accent/50 transition-colors">
                      <div className="flex items-center gap-2 mb-1">
                        <MessageSquare className="h-4 w-4 text-muted" />
                        <span className="text-sm font-medium text-primary">{conv.name}</span>
                      </div>
                      <p className="text-xs text-secondary truncate">{conv.lastMessage}</p>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted">No active client conversations.</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="text-lg flex items-center gap-2"><FolderKanban className="h-5 w-5 text-muted"/> Projects</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {clientProjects.map(project => (
                  <div key={project.id} className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <Link to={`/projects/${project.id}`} className="text-lg font-medium text-primary hover:text-accent">
                        {project.name}
                      </Link>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-secondary">{project.stage}</span>
                        <Badge variant="neutral" className="text-[10px]">{project.progress}% Complete</Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link to={`/projects/${project.id}/finance`}><Button variant="secondary" size="sm"><IndianRupee className="h-4 w-4 mr-2"/> Finance</Button></Link>
                      <Link to={`/projects/${project.id}`}><Button size="sm">Open Project</Button></Link>
                    </div>
                  </div>
                ))}
                {clientProjects.length === 0 && (
                  <div className="p-8 text-center text-muted">
                    No active projects.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="text-lg flex items-center gap-2"><FileText className="h-5 w-5 text-muted"/> Client-Visible Documents</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {clientDocs.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {clientDocs.map(doc => (
                    <div key={doc.id} className="p-3 bg-surface border border-border rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-3 truncate mr-2">
                        <FileText className="h-4 w-4 text-muted shrink-0" />
                        <Link to={`/documents/${doc.id}`} className="text-sm font-medium text-primary hover:text-accent truncate">
                          {doc.name}
                        </Link>
                      </div>
                      <Badge variant="neutral" className="text-[10px] shrink-0">{doc.category}</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted">No documents shared with client.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
