import { useState } from 'react';
import { Link } from '@/components/ui/Link';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Search, Filter, Plus, ArrowRight } from 'lucide-react';
import { initialClients, detailedProjects } from '@/lib/mock-data';
import { Can } from '@/components/auth/Can';

export function ClientsList() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-primary">Clients</h1>
          <p className="text-secondary mt-1 text-sm">Manage client relationships and project assignments.</p>
        </div>
        <div className="flex gap-3">
          <Can permission="clients.create">
            <Button size="sm"><Plus className="h-4 w-4 mr-2" /> New Client</Button>
          </Can>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-surface border border-border p-4 rounded-xl text-center">
          <p className="text-2xl font-bold text-primary">{initialClients.length}</p>
          <p className="text-[10px] text-muted uppercase tracking-wider mt-1">Total Clients</p>
        </div>
        <div className="bg-surface border border-border p-4 rounded-xl text-center">
          <p className="text-2xl font-bold text-emerald-400">{initialClients.filter(c => c.status === 'Active').length}</p>
          <p className="text-[10px] text-muted uppercase tracking-wider mt-1">Active</p>
        </div>
        <div className="bg-surface border border-border p-4 rounded-xl text-center">
          <p className="text-2xl font-bold text-amber-400">{initialClients.filter(c => c.status === 'Onboarding').length}</p>
          <p className="text-[10px] text-muted uppercase tracking-wider mt-1">Onboarding</p>
        </div>
        <div className="bg-surface border border-border p-4 rounded-xl text-center">
          <p className="text-2xl font-bold text-primary">{initialClients.filter(c => c.status === 'Completed').length}</p>
          <p className="text-[10px] text-muted uppercase tracking-wider mt-1">Completed</p>
        </div>
      </div>

      <Card>
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 justify-between items-center bg-surface/50">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
            <Input 
              placeholder="Search clients..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-background"
            />
          </div>
          <Button variant="secondary" className="w-full sm:w-auto">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted uppercase bg-elevated/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium">Client</th>
                <th className="px-6 py-4 font-medium">Contact</th>
                <th className="px-6 py-4 font-medium">Active Projects</th>
                <th className="px-6 py-4 font-medium">Joined</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {initialClients.map(client => {
                const activeProjects = detailedProjects.filter(p => p.clientId === client.id);
                return (
                  <tr key={client.id} className="hover:bg-elevated/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar fallback={client.avatarInitials} size="sm" />
                        <div>
                          <Link to={`/clients/${client.id}`} className="font-medium text-primary hover:text-accent block">
                            {client.name}
                          </Link>
                          {client.company && <span className="text-[10px] text-muted">{client.company}</span>}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-secondary text-xs space-y-1">
                        <p>{client.email}</p>
                        <p>{client.phone}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {activeProjects.length > 0 ? (
                        <div className="space-y-1">
                          {activeProjects.map(p => (
                            <Link key={p.id} to={`/projects/${p.id}`} className="block text-xs text-secondary hover:text-accent truncate max-w-[200px]">
                              {p.name}
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <span className="text-muted">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-secondary">{client.createdAt}</td>
                    <td className="px-6 py-4">
                      <Badge variant={client.status === 'Active' ? 'success' : client.status === 'Completed' ? 'neutral' : 'warning'}>
                        {client.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link to={`/clients/${client.id}`}>
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
