import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Download } from 'lucide-react';
import { initialEmployees, initialTasks } from '@/lib/mock-data';

export function TeamAnalytics() {
  const completedTasks = initialTasks.filter(t => t.status === 'Completed').length;
  const inProgressTasks = initialTasks.filter(t => t.status === 'In Progress').length;
    const blockedTasks = initialTasks.filter(t => t.status === 'Blocked').length;

  const roles = ['Designer', 'Project Manager', 'Site Manager', 'Accounts', 'Sales', 'Admin / Owner'];
  const roleDistribution = roles.map(role => ({
    role,
    count: initialEmployees.filter(e => e.role === role).length
  })).filter(r => r.count > 0);

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
          <h1 className="text-2xl font-semibold text-primary">Team Analytics</h1>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="bg-surface/50 border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">{initialEmployees.length}</p>
            <p className="text-xs text-muted uppercase tracking-wider mt-1">Total Team</p>
          </CardContent>
        </Card>
        <Card className="bg-surface/50 border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">{initialTasks.length}</p>
            <p className="text-xs text-muted uppercase tracking-wider mt-1">Total Tasks</p>
          </CardContent>
        </Card>
        <Card className="bg-surface/50 border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-emerald-400">{completedTasks}</p>
            <p className="text-xs text-muted uppercase tracking-wider mt-1">Completed</p>
          </CardContent>
        </Card>
        <Card className="bg-surface/50 border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-accent">{inProgressTasks}</p>
            <p className="text-xs text-muted uppercase tracking-wider mt-1">In Progress</p>
          </CardContent>
        </Card>
        <Card className="bg-surface/50 border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-red-400">{blockedTasks}</p>
            <p className="text-xs text-muted uppercase tracking-wider mt-1">Overdue</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Role Distribution */}
        <Card className="lg:col-span-1">
          <CardHeader className="border-b border-border pb-4">
            <CardTitle className="text-lg">Role Distribution</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {roleDistribution.map(rd => (
                <div key={rd.role} className="flex justify-between items-center text-sm">
                  <span className="text-secondary">{rd.role}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-primary">{rd.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Workload Distribution */}
        <Card className="lg:col-span-2">
          <CardHeader className="border-b border-border pb-4 flex flex-row justify-between items-center">
            <CardTitle className="text-lg">Team Workload</CardTitle>
            <Link to="/team/workload"><Button variant="ghost" size="sm" className="h-8">View All</Button></Link>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted uppercase bg-surface/50 border-b border-border">
                <tr>
                  <th className="px-6 py-4 font-medium">Employee</th>
                  <th className="px-6 py-4 font-medium">Role</th>
                  <th className="px-6 py-4 font-medium">Active Tasks</th>
                  <th className="px-6 py-4 font-medium">Overdue</th>
                  <th className="px-6 py-4 font-medium">Workload</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {initialEmployees.slice(0, 5).map(emp => (
                  <tr key={emp.id} className="hover:bg-elevated/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-primary">{emp.name}</td>
                    <td className="px-6 py-4 text-secondary">{emp.role}</td>
                    <td className="px-6 py-4">{initialTasks.filter(t => t.assigneeId === emp.id && t.status === 'In Progress').length}</td>
                    <td className="px-6 py-4 text-red-400">{initialTasks.filter(t => t.assigneeId === emp.id && t.status === 'Blocked').length}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-surface rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${(Math.min(100, Math.round((initialTasks.filter(t => t.assigneeId === emp.id).length / 5) * 100))) > 85 ? 'bg-red-500' : (Math.min(100, Math.round((initialTasks.filter(t => t.assigneeId === emp.id).length / 5) * 100))) > 70 ? 'bg-amber-500' : 'bg-emerald-500'}`} 
                            style={{ width: `${(Math.min(100, Math.round((initialTasks.filter(t => t.assigneeId === emp.id).length / 5) * 100)))}%` }}
                          ></div>
                        </div>
                        <span className="text-xs w-8 text-right">{(Math.min(100, Math.round((initialTasks.filter(t => t.assigneeId === emp.id).length / 5) * 100)))}%</span>
                      </div>
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
