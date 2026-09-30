import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Download } from 'lucide-react';
import { detailedProjects } from '@/lib/mock-data';

export function FinanceAnalytics() {
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
          <h1 className="text-2xl font-semibold text-primary">Finance Analytics</h1>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-surface/50 border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">₹2.84 Cr</p>
            <p className="text-xs text-muted uppercase tracking-wider mt-1">Total Revenue</p>
          </CardContent>
        </Card>
        <Card className="bg-surface/50 border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-secondary">₹1.92 Cr</p>
            <p className="text-xs text-muted uppercase tracking-wider mt-1">Total Expenses</p>
          </CardContent>
        </Card>
        <Card className="bg-surface/50 border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-emerald-400">₹92.0 L</p>
            <p className="text-xs text-muted uppercase tracking-wider mt-1">Net Profit</p>
          </CardContent>
        </Card>
        <Card className="bg-surface/50 border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-accent">32.3%</p>
            <p className="text-xs text-muted uppercase tracking-wider mt-1">Avg Margin</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Receivables Analysis */}
        <Card>
          <CardHeader className="border-b border-border pb-4">
            <CardTitle className="text-lg">Receivables Analysis</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-medium text-secondary">Total Outstanding</span>
              <span className="text-xl font-bold text-amber-400">₹42.6L</span>
            </div>
            <div className="h-4 w-full bg-surface rounded-full overflow-hidden border border-border flex mb-6">
              <div className="h-full bg-emerald-500/80" style={{ width: '40%' }} title="Current"></div>
              <div className="h-full bg-amber-500/80" style={{ width: '45%' }} title="Due Soon"></div>
              <div className="h-full bg-red-500/80" style={{ width: '15%' }} title="Overdue"></div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Current</span>
                <span className="font-medium">₹17.0L</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Due Soon (0-15d)</span>
                <span className="font-medium">₹19.2L</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500"></span> Overdue</span>
                <span className="font-medium">₹6.4L</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profit Trend (Mock Visual) */}
        <Card>
          <CardHeader className="border-b border-border pb-4">
            <CardTitle className="text-lg">Revenue vs Profit Trend</CardTitle>
          </CardHeader>
          <CardContent className="p-6 h-64 flex items-end justify-between gap-2 opacity-80">
            {/* Extremely simple mock bar chart using CSS */}
            {[40, 65, 80, 50, 95, 120].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end items-center gap-1 h-full">
                <div className="w-full flex gap-1 items-end justify-center h-[90%]">
                  <div className="w-1/2 bg-secondary/30 rounded-t-sm transition-all hover:bg-secondary/50" style={{ height: `${Math.min(100, val)}%` }}></div>
                  <div className="w-1/2 bg-emerald-500/50 rounded-t-sm transition-all hover:bg-emerald-500/70" style={{ height: `${Math.min(100, val * 0.35)}%` }}></div>
                </div>
                <span className="text-[10px] text-muted">M{i+1}</span>
              </div>
            ))}
          </CardContent>
        </Card>

      </div>

      <Card>
        <CardHeader className="border-b border-border pb-4">
          <CardTitle className="text-lg">Project Profitability</CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted uppercase bg-surface/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium">Project</th>
                <th className="px-6 py-4 font-medium">Contract Value</th>
                <th className="px-6 py-4 font-medium">Revenue</th>
                <th className="px-6 py-4 font-medium">Expenses</th>
                <th className="px-6 py-4 font-medium">Profit</th>
                <th className="px-6 py-4 font-medium">Margin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {detailedProjects.map((project, idx) => {
                // Mock calculation based on approved budget for demo aesthetics
                const val = parseFloat(project.approvedBudget.replace(/[^0-9.]/g, '')) * (project.approvedBudget.includes('Cr') ? 100 : 1);
                const revenue = val;
                const expenses = val * (0.6 + (idx * 0.05));
                const profit = revenue - expenses;
                const margin = (profit / revenue) * 100;
                
                return (
                  <tr key={project.id} className="hover:bg-elevated/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-primary">{project.name}</td>
                    <td className="px-6 py-4 text-secondary">{project.approvedBudget}</td>
                    <td className="px-6 py-4 text-emerald-400">₹{revenue.toFixed(1)}{project.approvedBudget.includes('Cr') ? 'Cr' : 'L'}</td>
                    <td className="px-6 py-4 text-secondary">₹{expenses.toFixed(1)}{project.approvedBudget.includes('Cr') ? 'Cr' : 'L'}</td>
                    <td className="px-6 py-4 font-medium text-primary">₹{profit.toFixed(1)}{project.approvedBudget.includes('Cr') ? 'Cr' : 'L'}</td>
                    <td className="px-6 py-4">
                      <span className={margin > 30 ? 'text-emerald-400' : margin > 20 ? 'text-amber-400' : 'text-red-400'}>
                        {margin.toFixed(1)}%
                      </span>
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
