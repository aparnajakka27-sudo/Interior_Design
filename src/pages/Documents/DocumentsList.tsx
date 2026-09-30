import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Search, Filter, Upload, FileText, ArrowRight } from 'lucide-react';
import { initialDocuments, detailedProjects, initialEmployees } from '@/lib/mock-data';
import { usePermissions } from '@/hooks/usePermissions';
import { Can } from '@/components/auth/Can';

export function DocumentsList() {
  const [searchQuery, setSearchQuery] = useState('');
  const { canAccessProject } = usePermissions();

  const accessibleDocuments = initialDocuments.filter(doc => !doc.projectId || canAccessProject(doc.projectId));

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-primary">Documents</h1>
          <p className="text-secondary mt-1 text-sm">Manage project files, contracts, designs, financial documents and site records.</p>
        </div>
        <div className="flex gap-3">
          <Can permission="documents.manage">
            <Button size="sm"><Upload className="h-4 w-4 mr-2" /> Upload Document</Button>
          </Can>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-surface border border-border p-4 rounded-xl text-center">
          <p className="text-2xl font-bold text-primary">{accessibleDocuments.length}</p>
          <p className="text-[10px] text-muted uppercase tracking-wider mt-1">Total Documents</p>
        </div>
        <div className="bg-surface border border-border p-4 rounded-xl text-center">
          <p className="text-2xl font-bold text-primary">3</p>
          <p className="text-[10px] text-muted uppercase tracking-wider mt-1">Recently Added</p>
        </div>
        <div className="bg-surface border border-border p-4 rounded-xl text-center">
          <p className="text-2xl font-bold text-amber-400">1</p>
          <p className="text-[10px] text-muted uppercase tracking-wider mt-1">Awaiting Review</p>
        </div>
        <div className="bg-surface border border-border p-4 rounded-xl text-center">
          <p className="text-2xl font-bold text-red-400">0</p>
          <p className="text-[10px] text-muted uppercase tracking-wider mt-1">Expiring / Important</p>
        </div>
        <div className="bg-surface border border-border p-4 rounded-xl text-center">
          <p className="text-2xl font-bold text-accent">2</p>
          <p className="text-[10px] text-muted uppercase tracking-wider mt-1">Project Documents</p>
        </div>
      </div>

      <Card>
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 justify-between items-center bg-surface/50">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
            <Input 
              placeholder="Search documents..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-background"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button variant="secondary" className="flex-1 sm:flex-none">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted uppercase bg-elevated/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium">Document</th>
                <th className="px-6 py-4 font-medium">Project</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Version</th>
                <th className="px-6 py-4 font-medium">Uploaded By</th>
                <th className="px-6 py-4 font-medium">Updated</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {accessibleDocuments.map(doc => {
                const project = detailedProjects.find(p => p.id === doc.projectId);
                const uploader = initialEmployees.find(e => e.id === doc.uploadedBy);
                return (
                  <tr key={doc.id} className="hover:bg-elevated/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-muted shrink-0" />
                        <Link to={`/documents/${doc.id}`} className="font-medium text-primary hover:text-accent truncate max-w-[200px]">
                          {doc.name}
                        </Link>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-secondary">
                      {project ? (
                        <Link to={`/projects/${project.id}`} className="hover:text-primary transition-colors">{project.name}</Link>
                      ) : (
                        <span className="text-muted">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-secondary">{doc.category}</td>
                    <td className="px-6 py-4 text-secondary">{doc.version}</td>
                    <td className="px-6 py-4 text-secondary">{uploader?.name || doc.uploadedBy}</td>
                    <td className="px-6 py-4 text-secondary">{doc.date}</td>
                    <td className="px-6 py-4">
                      <Badge variant={doc.status === 'Approved' ? 'success' : doc.status === 'Under Review' ? 'warning' : doc.status === 'Rejected' ? 'danger' : 'neutral'}>
                        {doc.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link to={`/documents/${doc.id}`}>
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
              {accessibleDocuments.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-muted">
                    No documents found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
