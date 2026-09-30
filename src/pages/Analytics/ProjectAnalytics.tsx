import { Link } from '@/components/ui/Link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Download } from 'lucide-react';
import { detailedProjects } from '@/lib/mock-data';

export function ProjectAnalytics() {
  const activeProjects = detailedProjects.filter(p => p.stage !== 'Handover');
  const completedProjects = detailedProjects.filter(p => p.stage === 'Handover');
  
  const healthyCount = detailedProjects.filter(p => p.health === 'Healthy').length;
  const attentionCount = detailedProjects.filter(p => p.health === 'Attention').length;
  const riskCount = detailedProjects.filter(p => p.health === 'At Risk').length;
  
  const avgProgress = Math.round(detailedProjects.reduce((acc, p) => acc + p.progress, 0) / (detailedProjects.length || 1));

  // Stage distribution mock calculation
  const stages = ['Lead', 'Consultation', 'Site Visit', 'Design', 'Client Approval', 'Production', 'Execution', 'Handover'];
  const stageCounts = stages.reduce((acc, stage) => {
    acc[stage] = detailedProjects.filter(p => p.stage === stage).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="max-w-[1200px] mx-auto space-y-6 pb-12">
      <div className="flex items-center gap-4 mb-2">
        <Link to="/analytics">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <span className="text-xs font-medium text-accent uppercase tracking-wider">Analytics</span>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-primary">Project Analytics</h1>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-surface/50 border-border">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-primary">{detailedProjects.length}</p>
            <p className="text-xs text-muted uppercase tracking-wider mt-1">Total Projects</p>
          </CardContent>
        </Card>
        <Card className="bg-surface/50 border-border">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-primary">{activeProjects.length}</p>
            <p className="text-xs text-muted uppercase tracking-wider mt-1">Active</p>
          </CardContent>
        </Card>
        <Card className="bg-surface/50 border-border">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-emerald-400">{completedProjects.length}</p>
            <p className="text-xs text-muted uppercase tracking-wider mt-1">Completed</p>
          </CardContent>
        </Card>
        <Card className="bg-surface/50 border-border">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-accent">{avgProgress}%</p>
            <p className="text-xs text-muted uppercase tracking-wider mt-1">Avg Progress</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Project Health */}
        <Card>
          <CardHeader className="border-b border-border pb-4">
            <CardTitle className="text-lg">Project Health Distribution</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex h-12 w-full rounded-lg overflow-hidden mb-6">
              <div style={{ width: `${(healthyCount/detailedProjects.length)*100}%` }} className="bg-emerald-500/80 transition-all hover:opacity-80"></div>
              <div style={{ width: `${(attentionCount/detailedProjects.length)*100}%` }} className="bg-amber-500/80 transition-all hover:opacity-80"></div>
              <div style={{ width: `${(riskCount/detailedProjects.length)*100}%` }} className="bg-red-500/80 transition-all hover:opacity-80"></div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xl font-bold text-emerald-400">{healthyCount}</p>
                <p className="text-xs text-secondary mt-1">Healthy</p>
              </div>
              <div>
                <p className="text-xl font-bold text-amber-400">{attentionCount}</p>
                <p className="text-xs text-secondary mt-1">Attention</p>
              </div>
              <div>
                <p className="text-xl font-bold text-red-400">{riskCount}</p>
                <p className="text-xs text-secondary mt-1">At Risk</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Project Stage Distribution */}
        <Card>
          <CardHeader className="border-b border-border pb-4">
            <CardTitle className="text-lg">Stage Distribution</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {Object.entries(stageCounts).filter(([_, count]) => count > 0).map(([stage, count]) => (
                <div key={stage} className="flex items-center gap-4">
                  <div className="w-32 text-sm text-secondary truncate">{stage}</div>
                  <div className="flex-1 h-3 bg-surface rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-accent transition-all" 
                      style={{ width: `${(count/detailedProjects.length)*100}%` }}
                    ></div>
                  </div>
                  <div className="w-8 text-right text-sm font-medium text-primary">{count}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Project Value Analysis */}
      <Card>
        <CardHeader className="border-b border-border pb-4">
          <CardTitle className="text-lg">Project Value Analysis</CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted uppercase bg-surface/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium">Project</th>
                <th className="px-6 py-4 font-medium">Contract Value</th>
                <th className="px-6 py-4 font-medium">Collected</th>
                <th className="px-6 py-4 font-medium">Outstanding</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {detailedProjects.map(project => (
                <tr key={project.id} className="hover:bg-elevated/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-primary">{project.name}</td>
                  <td className="px-6 py-4 text-secondary">{project.approvedBudget}</td>
                  <td className="px-6 py-4 text-emerald-400">{project.amountPaid}</td>
                  <td className="px-6 py-4 text-amber-400">{project.outstanding}</td>
                  <td className="px-6 py-4 text-right">
                    <Link to={`/projects/${project.id}`}><Button variant="ghost" size="sm" className="h-8">View</Button></Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
