import { Link } from '@/components/ui/Link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { AlertTriangle, CheckSquare, Package, Clock, Activity, FileText , Bell} from 'lucide-react';
import { UpcomingEvents } from '@/components/calendar/UpcomingEvents';
import { useAuth } from '@/contexts/AuthContext';
import { detailedProjects } from '@/lib/mock-data';

export function SiteManagerDashboard() {
  const { user } = useAuth();
  const firstName = user?.name?.split(' ')[0] || 'Site Manager';

  const mySites = detailedProjects.filter(p => user?.assignedProjects?.includes(p.id) && (p.stage === 'Execution' || p.stage === 'Handover'));

  return (
    <div className="max-w-[1400px] mx-auto space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-primary">Good morning, {firstName}</h1>
          <p className="text-secondary mt-1 text-sm">Here's what needs attention on site today.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/site-management"><Button variant="secondary" size="sm">Add Daily Update</Button></Link>
          <Link to="/site-management/issues"><Button size="sm" className="bg-red-900 text-red-100 hover:bg-red-800 border border-red-800">Report Issue</Button></Link>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <div className="bg-surface border border-border p-4 rounded-xl text-center">
          <p className="text-2xl font-bold text-primary">{mySites.length || 1}</p>
          <p className="text-[10px] text-muted uppercase tracking-wider mt-1">Active Sites</p>
        </div>
        <div className="bg-surface border border-border p-4 rounded-xl text-center">
          <p className="text-2xl font-bold text-accent">1</p>
          <p className="text-[10px] text-muted uppercase tracking-wider mt-1">Today's Visits</p>
        </div>
        <div className="bg-surface border border-border p-4 rounded-xl text-center">
          <p className="text-2xl font-bold text-red-400">2</p>
          <p className="text-[10px] text-muted uppercase tracking-wider mt-1">Open Issues</p>
        </div>
        <div className="bg-surface border border-border p-4 rounded-xl text-center">
          <p className="text-2xl font-bold text-amber-400">4</p>
          <p className="text-[10px] text-muted uppercase tracking-wider mt-1">Open Snags</p>
        </div>
        <div className="bg-surface border border-border p-4 rounded-xl text-center">
          <p className="text-2xl font-bold text-emerald-400">2</p>
          <p className="text-[10px] text-muted uppercase tracking-wider mt-1">Materials Received</p>
        </div>
        <div className="bg-surface border border-border p-4 rounded-xl text-center">
          <p className="text-2xl font-bold text-primary">12</p>
          <p className="text-[10px] text-muted uppercase tracking-wider mt-1">Labour Today</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-accent/30">
            <CardHeader className="border-b border-border pb-4 bg-accent/5 rounded-t-xl">
              <CardTitle className="flex items-center gap-2 text-accent"><Activity className="h-4 w-4"/> Today's Work</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
          <UpcomingEvents />
                <div>
                  <h3 className="font-semibold text-primary mb-3 text-sm">Sharma Residence</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 border border-border rounded-lg bg-surface">
                      <span className="text-sm font-medium text-primary">Civil work & debris clearing</span>
                      <Badge variant="success">Completed</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 border border-border rounded-lg bg-surface">
                      <span className="text-sm font-medium text-primary">Kitchen electrical wiring</span>
                      <Badge variant="warning">In Progress</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 border border-border rounded-lg bg-surface">
                      <span className="text-sm font-medium text-primary">Material unloading (Plywood)</span>
                      <Badge variant="neutral">Pending</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="flex items-center gap-2"><FileText className="h-4 w-4 text-muted"/> Daily Site Updates</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="p-4 bg-surface border border-border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-xs font-medium text-primary">Sharma Residence</p>
                    <span className="text-[10px] text-muted flex items-center gap-1"><Clock className="h-3 w-3"/> 10:42 AM</span>
                  </div>
                  <p className="text-sm text-secondary">"Electrical work completed up to kitchen area. Facing slight delay due to material shortage for wiring in master bedroom. Raised issue."</p>
                  <Link to="/site-management"><Button variant="ghost" size="sm" className="mt-3 text-xs h-6 px-2">View in Workspace</Button></Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <Card className="border-red-900/30">
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-red-400"/> Issues</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="p-3 bg-surface rounded-lg border border-border">
                <Badge variant="danger" className="mb-2 text-[10px]">High</Badge>
                <p className="text-sm font-medium text-primary mb-1">Water seepage in master bath</p>
                <p className="text-xs text-muted mb-3">Sharma Residence</p>
                <div className="flex gap-2">
                  <Button size="sm" className="h-6 text-xs px-2 flex-1">Resolve</Button>
                  <Button variant="secondary" size="sm" className="h-6 text-xs px-2 flex-1">Details</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="flex items-center gap-2"><CheckSquare className="h-4 w-4 text-muted"/> Snags</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <div>
                  <p className="font-medium text-primary">Uneven paint finish</p>
                  <p className="text-xs text-muted">Sharma Residence · Living Room</p>
                </div>
                <Badge variant="warning">Open</Badge>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div>
                  <p className="font-medium text-primary">Cabinet door alignment</p>
                  <p className="text-xs text-muted">Sharma Residence · Kitchen</p>
                </div>
                <Badge variant="neutral">Draft</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="flex items-center gap-2"><Package className="h-4 w-4 text-muted"/> Materials Received</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-3">
              <div className="p-3 border border-border rounded-lg bg-surface">
                <div className="flex justify-between items-start mb-1">
                  <p className="text-sm font-medium text-primary">18mm Marine Plywood</p>
                  <Badge variant="success" className="text-[10px]">Received</Badge>
                </div>
                <p className="text-xs text-secondary">Qty: 40 Sheets · Sharma Res.</p>
              </div>
              <Link to="/materials/deliveries"><Button variant="ghost" size="sm" className="w-full text-xs mt-2">View Deliveries</Button></Link>
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
