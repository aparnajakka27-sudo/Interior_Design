import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { initialAuditActivity } from '@/lib/mock-data';
import { Search, Filter, History, Clock, FileText, CheckCircle2, Package, IndianRupee, Users } from 'lucide-react';

export function ActivityPage() {
    const [query, setQuery] = useState('');
  
  // Basic mock filters
  const activities = initialAuditActivity.filter(a => 
    a.actorName.toLowerCase().includes(query.toLowerCase()) || 
    a.description.toLowerCase().includes(query.toLowerCase()) ||
    a.entityName.toLowerCase().includes(query.toLowerCase())
  );

  const getActionIcon = (_action: string, entityType: string) => {
    switch (entityType) {
      case 'project': return <History className="h-4 w-4 text-blue-400" />;
      case 'document': return <FileText className="h-4 w-4 text-purple-400" />;
      case 'task': return <CheckCircle2 className="h-4 w-4 text-emerald-400" />;
      case 'material': return <Package className="h-4 w-4 text-amber-400" />;
      case 'finance': return <IndianRupee className="h-4 w-4 text-emerald-400" />;
      case 'team': return <Users className="h-4 w-4 text-blue-400" />;
      default: return <Clock className="h-4 w-4 text-secondary" />;
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-primary">Activity</h1>
          <p className="text-secondary mt-1 text-sm">Track important actions across Decormart Studio.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input 
              type="text" 
              placeholder="Search activity..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-surface border border-border rounded-md pl-9 pr-3 py-2 text-sm text-primary focus:outline-none focus:border-accent"
            />
          </div>
          <Button variant="secondary" className="px-3 shrink-0">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-surface/50 border-border">
          <CardContent className="p-4">
            <p className="text-xs text-muted uppercase tracking-wider mb-1">Today's Actions</p>
            <p className="text-2xl font-bold text-primary">12</p>
          </CardContent>
        </Card>
        <Card className="bg-surface/50 border-border">
          <CardContent className="p-4">
            <p className="text-xs text-muted uppercase tracking-wider mb-1">This Week</p>
            <p className="text-2xl font-bold text-primary">148</p>
          </CardContent>
        </Card>
        <Card className="bg-surface/50 border-border">
          <CardContent className="p-4">
            <p className="text-xs text-muted uppercase tracking-wider mb-1">Projects Updated</p>
            <p className="text-2xl font-bold text-primary">4</p>
          </CardContent>
        </Card>
        <Card className="bg-surface/50 border-border">
          <CardContent className="p-4">
            <p className="text-xs text-muted uppercase tracking-wider mb-1">Pending Approvals</p>
            <p className="text-2xl font-bold text-amber-400">2</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="border-b border-border pb-4 flex flex-row justify-between items-center">
          <CardTitle className="text-base">Activity Timeline</CardTitle>
          <div className="flex gap-2">
            <select className="bg-surface border border-border rounded-md px-2 py-1 text-xs text-primary focus:outline-none focus:border-accent">
              <option>All Modules</option>
              <option>Projects</option>
              <option>Design</option>
              <option>Finance</option>
            </select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {activities.length > 0 ? (
            <div className="divide-y divide-border">
              {activities.map(activity => (
                <div key={activity.id} className="p-4 flex gap-4 hover:bg-surface/30 transition-colors">
                  <div className="mt-1 h-8 w-8 rounded-full bg-elevated border border-border flex items-center justify-center shrink-0">
                    {getActionIcon(activity.action, activity.entityType)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-primary leading-snug">
                      <span className="font-medium">{activity.actorName}</span>{' '}
                      <span className="text-secondary">{activity.description}</span>
                    </p>
                    <div className="flex items-center gap-3 mt-1.5 text-xs">
                      <span className="text-muted">{new Date(activity.timestamp).toLocaleString()}</span>
                      <span className="text-border">•</span>
                      <span className="font-medium text-accent hover:underline cursor-pointer">{activity.entityName}</span>
                      <span className="text-border">•</span>
                      <span className="text-muted capitalize">{activity.entityType}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <History className="h-10 w-10 text-muted mx-auto mb-4" />
              <p className="text-primary font-medium">No activity found</p>
              <p className="text-sm text-secondary mt-1">Try changing your search or filters.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
