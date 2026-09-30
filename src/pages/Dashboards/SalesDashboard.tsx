import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Users, Phone, Calendar, Building2, TrendingUp, ArrowRight , Bell} from 'lucide-react';
import { UpcomingEvents } from '@/components/calendar/UpcomingEvents';
import { useAuth } from '@/contexts/AuthContext';
import { initialLeads } from '@/lib/mock-data';

export function SalesDashboard() {
  const { user } = useAuth();
  const firstName = user?.name?.split(' ')[0] || 'Sales';

  return (
    <div className="max-w-[1400px] mx-auto space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-primary">Good morning, {firstName}</h1>
          <p className="text-secondary mt-1 text-sm">Here's what needs attention in your sales pipeline.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/leads"><Button variant="secondary" size="sm">New Lead</Button></Link>
          <Link to="/leads"><Button size="sm">View Pipeline</Button></Link>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <div className="bg-surface border border-border p-4 rounded-xl text-center">
          <p className="text-2xl font-bold text-accent">12</p>
          <p className="text-[10px] text-muted uppercase tracking-wider mt-1">New Leads</p>
        </div>
        <div className="bg-surface border border-border p-4 rounded-xl text-center">
          <p className="text-2xl font-bold text-primary">{initialLeads.filter(l => l.stage !== 'Won' && l.stage !== 'Lost').length}</p>
          <p className="text-[10px] text-muted uppercase tracking-wider mt-1">Active Leads</p>
        </div>
        <div className="bg-surface border border-border p-4 rounded-xl text-center">
          <p className="text-2xl font-bold text-amber-400">4</p>
          <p className="text-[10px] text-muted uppercase tracking-wider mt-1">Follow-ups Today</p>
        </div>
        <div className="bg-surface border border-border p-4 rounded-xl text-center">
          <p className="text-2xl font-bold text-emerald-400">2</p>
          <p className="text-[10px] text-muted uppercase tracking-wider mt-1">Site Visits</p>
        </div>
        <div className="bg-surface border border-border p-4 rounded-xl text-center">
          <p className="text-2xl font-bold text-primary">8</p>
          <p className="text-[10px] text-muted uppercase tracking-wider mt-1">Converted (YTD)</p>
        </div>
        <div className="bg-surface border border-border p-4 rounded-xl text-center">
          <p className="text-2xl font-bold text-red-400">3</p>
          <p className="text-[10px] text-muted uppercase tracking-wider mt-1">Lost (YTD)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="flex items-center gap-2"><Phone className="h-4 w-4 text-amber-400"/> Follow-ups Today</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex justify-between items-center p-4 border border-border rounded-lg bg-surface">
                <div>
                  <h3 className="font-medium text-primary">Rahul Kumar</h3>
                  <p className="text-xs text-secondary mt-0.5">3 BHK Apartment Interior</p>
                </div>
                <div className="text-right flex items-center gap-4">
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-amber-400">Today</p>
                    <p className="text-[10px] text-muted">10:30 AM</p>
                  </div>
                  <Button size="sm">Complete</Button>
                </div>
              </div>
              <div className="flex justify-between items-center p-4 border border-border rounded-lg bg-surface">
                <div>
                  <h3 className="font-medium text-primary">Sneha Reddy</h3>
                  <p className="text-xs text-secondary mt-0.5">Villa Interior & Execution</p>
                </div>
                <div className="text-right flex items-center gap-4">
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-amber-400">Today</p>
                    <p className="text-[10px] text-muted">2:00 PM</p>
                  </div>
                  <Button size="sm">Complete</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="border-b border-border pb-4 flex flex-row justify-between items-center">
              <CardTitle className="flex items-center gap-2"><Users className="h-4 w-4 text-muted"/> Recent Leads</CardTitle>
              <Link to="/leads"><Button variant="ghost" size="sm">View All</Button></Link>
            </CardHeader>
            <CardContent className="pt-0 p-0">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted uppercase bg-elevated/50 border-b border-border">
                  <tr>
                    <th className="px-6 py-3 font-medium">Name</th>
                    <th className="px-6 py-3 font-medium">Requirement</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                    <th className="px-6 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {initialLeads.slice(0, 4).map(lead => (
                    <tr key={lead.id} className="hover:bg-elevated/50">
                      <td className="px-6 py-4 font-medium text-primary">
                        <Link to={`/leads/${lead.id}`} className="hover:text-accent transition-colors">{lead.name}</Link>
                        <p className="text-[10px] text-muted">{lead.source}</p>
                      </td>
                      <td className="px-6 py-4 text-secondary">{lead.requirement}</td>
                      <td className="px-6 py-4">
                        <Badge variant={lead.stage === 'New' ? 'success' : lead.stage === 'Won' ? 'neutral' : 'warning'} className="text-[10px]">{lead.stage}</Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link to={`/leads/${lead.id}`}><Button variant="ghost" size="sm" className="h-7 px-2"><ArrowRight className="h-3 w-3"/></Button></Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <UpcomingEvents />
          <Card>
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="flex items-center gap-2"><Calendar className="h-4 w-4 text-emerald-400"/> Upcoming Site Visits</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="p-3 bg-surface rounded-lg border border-border">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-sm font-medium text-primary">Karan Gupta</p>
                    <p className="text-xs text-muted">Office Interior</p>
                  </div>
                  <Badge variant="neutral">Tomorrow</Badge>
                </div>
                <p className="text-xs text-secondary flex items-center gap-2"><Building2 className="h-3 w-3 text-muted"/> Hitec City, Hyderabad</p>
              </div>
              <div className="p-3 bg-surface rounded-lg border border-border">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-sm font-medium text-primary">Aditi Verma</p>
                    <p className="text-xs text-muted">4 BHK Duplex</p>
                  </div>
                  <Badge variant="neutral">Oct 03</Badge>
                </div>
                <p className="text-xs text-secondary flex items-center gap-2"><Building2 className="h-3 w-3 text-muted"/> Jubilee Hills</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="flex items-center gap-2"><TrendingUp className="h-4 w-4 text-muted"/> Conversion Summary</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="relative">
                <div className="absolute left-[15px] top-4 bottom-4 w-px bg-border"></div>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 relative">
                    <div className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center text-xs font-medium text-primary shrink-0 z-10">42</div>
                    <p className="text-sm text-secondary">New Leads</p>
                  </div>
                  <div className="flex items-center gap-4 relative">
                    <div className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center text-xs font-medium text-primary shrink-0 z-10">28</div>
                    <p className="text-sm text-secondary">Contacted</p>
                  </div>
                  <div className="flex items-center gap-4 relative">
                    <div className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center text-xs font-medium text-primary shrink-0 z-10">15</div>
                    <p className="text-sm text-secondary">Site Visits</p>
                  </div>
                  <div className="flex items-center gap-4 relative">
                    <div className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center text-xs font-medium text-primary shrink-0 z-10">10</div>
                    <p className="text-sm text-secondary">Proposals</p>
                  </div>
                  <div className="flex items-center gap-4 relative">
                    <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent flex items-center justify-center text-xs font-medium text-accent shrink-0 z-10">8</div>
                    <p className="text-sm font-medium text-accent">Converted</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Activity / Notifications */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2"><Bell className="h-5 w-5 text-muted"/> Recent Notifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-surface border border-border rounded-xl">
            <div className="flex justify-between items-start mb-2">
              <Badge variant="warning" className="text-[10px]">High Priority</Badge>
              <span className="text-[10px] text-muted">5 min ago</span>
            </div>
            <p className="text-sm font-medium text-primary mb-1">Client approval requested</p>
            <p className="text-xs text-secondary mb-3">Sharma Residence: Kitchen Layout V3 is awaiting your review.</p>
            <Link to="/notifications"><Button variant="ghost" size="sm" className="h-6 px-2 text-xs w-full">View Details</Button></Link>
          </div>
          <div className="p-4 bg-surface border border-border rounded-xl">
            <div className="flex justify-between items-start mb-2">
              <Badge variant="neutral" className="text-[10px]">Message</Badge>
              <span className="text-[10px] text-muted">20 min ago</span>
            </div>
            <p className="text-sm font-medium text-primary mb-1">New message in Sharma Residence</p>
            <p className="text-xs text-secondary mb-3">Rahul Sharma: "Material delivery has been received."</p>
            <Link to="/messages/CONV-001"><Button variant="ghost" size="sm" className="h-6 px-2 text-xs w-full">Open Conversation</Button></Link>
          </div>
          <div className="p-4 bg-surface border border-border rounded-xl">
            <div className="flex justify-between items-start mb-2">
              <Badge variant="neutral" className="text-[10px]">Document</Badge>
              <span className="text-[10px] text-muted">2 hrs ago</span>
            </div>
            <p className="text-sm font-medium text-primary mb-1">New document uploaded</p>
            <p className="text-xs text-secondary mb-3">Ananya Rao uploaded Kitchen Layout V3.pdf for Sharma Residence.</p>
            <Link to="/documents/DOC-001"><Button variant="ghost" size="sm" className="h-6 px-2 text-xs w-full">View Document</Button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
