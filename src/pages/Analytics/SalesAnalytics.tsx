import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Download } from 'lucide-react';
import { initialLeads } from '@/lib/mock-data';

export function SalesAnalytics() {
  const newLeads = initialLeads.filter(l => l.stage === 'New');
  const siteVisits = initialLeads.filter(l => l.stage === 'Site Visit');
  const won = initialLeads.filter(l => l.stage === 'Won');
  const lost = initialLeads.filter(l => l.stage === 'Lost');
  
  const conversionRate = Math.round((won.length / (initialLeads.length || 1)) * 100);

  // Conversion funnel mock
  const funnel = [
    { label: 'Total Leads', value: initialLeads.length, percentage: 100 },
    { label: 'Qualified', value: Math.round(initialLeads.length * 0.8), percentage: 80 },
    { label: 'Site Visit', value: siteVisits.length, percentage: Math.round((siteVisits.length/initialLeads.length)*100) },
    { label: 'Proposal', value: won.length + lost.length, percentage: Math.round(((won.length + lost.length)/initialLeads.length)*100) },
    { label: 'Won', value: won.length, percentage: conversionRate },
  ];

  const leadSources = [
    { source: 'Instagram', count: 12 },
    { source: 'Referral', count: 8 },
    { source: 'Website', count: 5 },
    { source: 'Walk-in', count: 2 },
  ];

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
          <h1 className="text-2xl font-semibold text-primary">Sales Analytics</h1>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card className="bg-surface/50 border-border md:col-span-1">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">{initialLeads.length}</p>
            <p className="text-xs text-muted uppercase tracking-wider mt-1">Total</p>
          </CardContent>
        </Card>
        <Card className="bg-surface/50 border-border md:col-span-1">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">{newLeads.length}</p>
            <p className="text-xs text-muted uppercase tracking-wider mt-1">New</p>
          </CardContent>
        </Card>
        <Card className="bg-surface/50 border-border md:col-span-1">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-amber-400">4</p>
            <p className="text-xs text-muted uppercase tracking-wider mt-1">Follow-ups</p>
          </CardContent>
        </Card>
        <Card className="bg-surface/50 border-border md:col-span-1">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-400">{siteVisits.length}</p>
            <p className="text-xs text-muted uppercase tracking-wider mt-1">Site Visits</p>
          </CardContent>
        </Card>
        <Card className="bg-surface/50 border-border md:col-span-1">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-emerald-400">{won.length}</p>
            <p className="text-xs text-muted uppercase tracking-wider mt-1">Won</p>
          </CardContent>
        </Card>
        <Card className="bg-surface/50 border-border md:col-span-1">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-accent">{conversionRate}%</p>
            <p className="text-xs text-muted uppercase tracking-wider mt-1">Conv. Rate</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Conversion Funnel */}
        <Card>
          <CardHeader className="border-b border-border pb-4">
            <CardTitle className="text-lg">Conversion Funnel</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {funnel.map((step, idx) => (
                <div key={step.label} className="flex items-center gap-4">
                  <div className="w-24 text-sm text-secondary">{step.label}</div>
                  <div className="flex-1">
                    <div 
                      className={`h-8 rounded flex items-center px-3 text-xs font-medium ${
                        idx === 0 ? 'bg-surface text-primary border border-border' : 
                        idx === funnel.length - 1 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 
                        'bg-accent/10 text-accent border border-accent/20'
                      }`}
                      style={{ width: `${Math.max(15, step.percentage)}%` }}
                    >
                      {step.value}
                    </div>
                  </div>
                  <div className="w-12 text-right text-xs text-muted">{step.percentage}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Lead Sources */}
        <Card>
          <CardHeader className="border-b border-border pb-4">
            <CardTitle className="text-lg">Lead Source Analysis</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {leadSources.map((source) => {
                const total = leadSources.reduce((a,b) => a + b.count, 0);
                const percent = Math.round((source.count / total) * 100);
                return (
                  <div key={source.source}>
                    <div className="flex justify-between items-center text-sm mb-2">
                      <span className="font-medium text-primary">{source.source}</span>
                      <span className="text-secondary">{source.count} <span className="text-muted text-xs ml-1">({percent}%)</span></span>
                    </div>
                    <div className="h-2 w-full bg-surface rounded-full overflow-hidden">
                      <div className="h-full bg-blue-400" style={{ width: `${percent}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
