import { Link } from '@/components/ui/Link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  TrendingUp, IndianRupee, FolderKanban, Users, Package, ArrowRight, Download 
} from 'lucide-react';
import { detailedProjects, initialEmployees } from '@/lib/mock-data';
import { Can } from '@/components/auth/Can';

export function AnalyticsDashboard() {
  const activeProjects = detailedProjects.filter(p => p.stage !== 'Handover');
  const atRiskProjects = detailedProjects.filter(p => p.health === 'At Risk');

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-primary">Analytics & Reports</h1>
          <p className="text-secondary mt-1 text-sm">Understand project performance, financial health, sales activity and studio operations.</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="bg-background border border-border rounded-md px-3 py-1.5 text-sm text-primary focus:outline-none focus:border-accent">
            <option>This Quarter</option>
            <option>This Month</option>
            <option>This Year</option>
            <option>All Time</option>
          </select>
          <Button variant="secondary" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Executive KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="bg-surface/50">
          <CardContent className="p-4">
            <p className="text-[10px] text-muted uppercase tracking-wider mb-1">Active Projects</p>
            <p className="text-2xl font-bold text-primary">{activeProjects.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-surface/50">
          <CardContent className="p-4">
            <p className="text-[10px] text-muted uppercase tracking-wider mb-1">Total Value</p>
            <p className="text-2xl font-bold text-primary">₹2.84 Cr</p>
          </CardContent>
        </Card>
        <Card className="bg-surface/50">
          <CardContent className="p-4">
            <p className="text-[10px] text-muted uppercase tracking-wider mb-1">Collected</p>
            <p className="text-2xl font-bold text-emerald-400">₹1.92 Cr</p>
          </CardContent>
        </Card>
        <Card className="bg-surface/50">
          <CardContent className="p-4">
            <p className="text-[10px] text-muted uppercase tracking-wider mb-1">Outstanding</p>
            <p className="text-2xl font-bold text-amber-400">₹42.6L</p>
          </CardContent>
        </Card>
        <Card className="bg-surface/50">
          <CardContent className="p-4">
            <p className="text-[10px] text-muted uppercase tracking-wider mb-1">Gross Profit</p>
            <p className="text-2xl font-bold text-emerald-400">₹91.2L</p>
          </CardContent>
        </Card>
        <Card className="bg-surface/50">
          <CardContent className="p-4">
            <p className="text-[10px] text-muted uppercase tracking-wider mb-1">At Risk</p>
            <p className="text-2xl font-bold text-red-400">{atRiskProjects.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Navigation Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        
        <Link to="/analytics/projects" className="group">
          <Card className="h-full hover:border-accent/50 transition-colors">
            <CardHeader className="pb-2">
              <div className="h-10 w-10 rounded-lg bg-surface border border-border flex items-center justify-center mb-2 group-hover:bg-accent/10 transition-colors">
                <FolderKanban className="h-5 w-5 text-primary group-hover:text-accent" />
              </div>
              <CardTitle className="flex justify-between items-center text-lg">
                Project Analytics
                <ArrowRight className="h-4 w-4 text-muted group-hover:text-accent transition-transform group-hover:translate-x-1" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-secondary mb-4">View project health, completion rates, and stage distribution across the studio.</p>
              <div className="flex gap-2">
                <Badge variant="neutral" className="text-[10px]">{detailedProjects.length} Total Projects</Badge>
                <Badge variant="warning" className="text-[10px]">2 Delayed</Badge>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Can permission="finance.view">
          <Link to="/analytics/finance" className="group">
            <Card className="h-full hover:border-accent/50 transition-colors">
              <CardHeader className="pb-2">
                <div className="h-10 w-10 rounded-lg bg-surface border border-border flex items-center justify-center mb-2 group-hover:bg-emerald-400/10 transition-colors">
                  <IndianRupee className="h-5 w-5 text-emerald-400" />
                </div>
                <CardTitle className="flex justify-between items-center text-lg">
                  Finance Analytics
                  <ArrowRight className="h-4 w-4 text-muted group-hover:text-emerald-400 transition-transform group-hover:translate-x-1" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-secondary mb-4">Analyze revenue, expenses, project profitability, and accounts receivable.</p>
                <div className="flex gap-2">
                  <Badge variant="success" className="text-[10px]">32% Margin</Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        </Can>

        <Can permission="leads.view">
          <Link to="/analytics/sales" className="group">
            <Card className="h-full hover:border-accent/50 transition-colors">
              <CardHeader className="pb-2">
                <div className="h-10 w-10 rounded-lg bg-surface border border-border flex items-center justify-center mb-2 group-hover:bg-blue-400/10 transition-colors">
                  <TrendingUp className="h-5 w-5 text-blue-400" />
                </div>
                <CardTitle className="flex justify-between items-center text-lg">
                  Sales Analytics
                  <ArrowRight className="h-4 w-4 text-muted group-hover:text-blue-400 transition-transform group-hover:translate-x-1" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-secondary mb-4">Track lead conversion, pipeline value, and marketing source performance.</p>
                <div className="flex gap-2">
                  <Badge variant="neutral" className="text-[10px]">24 Active Leads</Badge>
                  <Badge variant="success" className="text-[10px]">18% Conversion</Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        </Can>

        <Can permission="team.view">
          <Link to="/analytics/team" className="group">
            <Card className="h-full hover:border-accent/50 transition-colors">
              <CardHeader className="pb-2">
                <div className="h-10 w-10 rounded-lg bg-surface border border-border flex items-center justify-center mb-2 group-hover:bg-purple-400/10 transition-colors">
                  <Users className="h-5 w-5 text-purple-400" />
                </div>
                <CardTitle className="flex justify-between items-center text-lg">
                  Team Analytics
                  <ArrowRight className="h-4 w-4 text-muted group-hover:text-purple-400 transition-transform group-hover:translate-x-1" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-secondary mb-4">Monitor workload distribution, task completion rates, and employee capacity.</p>
                <div className="flex gap-2">
                  <Badge variant="neutral" className="text-[10px]">{initialEmployees.length} Employees</Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        </Can>

        <Can permission="materials.view">
          <Link to="/analytics/procurement" className="group">
            <Card className="h-full hover:border-accent/50 transition-colors">
              <CardHeader className="pb-2">
                <div className="h-10 w-10 rounded-lg bg-surface border border-border flex items-center justify-center mb-2 group-hover:bg-amber-400/10 transition-colors">
                  <Package className="h-5 w-5 text-amber-400" />
                </div>
                <CardTitle className="flex justify-between items-center text-lg">
                  Procurement Analytics
                  <ArrowRight className="h-4 w-4 text-muted group-hover:text-amber-400 transition-transform group-hover:translate-x-1" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-secondary mb-4">Evaluate material costs, delivery timelines, and vendor reliability.</p>
                <div className="flex gap-2">
                  <Badge variant="neutral" className="text-[10px]">14 Active POs</Badge>
                  <Badge variant="warning" className="text-[10px]">3 Delayed</Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        </Can>

        {/* Project Performance Mini-Table */}
        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader className="border-b border-border pb-4 flex flex-row justify-between items-center">
            <CardTitle>Project Performance Snapshot</CardTitle>
            <Link to="/analytics/projects"><Button variant="ghost" size="sm">View Details</Button></Link>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted uppercase bg-surface/50 border-b border-border">
                <tr>
                  <th className="px-6 py-4 font-medium">Project</th>
                  <th className="px-6 py-4 font-medium">Value</th>
                  <th className="px-6 py-4 font-medium">Progress</th>
                  <th className="px-6 py-4 font-medium">Stage</th>
                  <th className="px-6 py-4 font-medium">Health</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {activeProjects.slice(0, 4).map(project => (
                  <tr key={project.id} className="hover:bg-elevated/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-primary">{project.name}</td>
                    <td className="px-6 py-4 text-secondary">{project.approvedBudget}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-xs">{project.progress}%</span>
                        <div className="w-16 h-1.5 bg-surface rounded-full overflow-hidden">
                          <div className="h-full bg-accent" style={{ width: `${project.progress}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-secondary">{project.stage}</td>
                    <td className="px-6 py-4">
                      <Badge variant={project.health === 'Healthy' ? 'success' : project.health === 'At Risk' ? 'danger' : 'warning'}>
                        {project.health}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
