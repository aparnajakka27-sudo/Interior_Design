import { useParams } from 'react-router-dom';
import { Link } from '@/components/ui/Link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ArrowLeft, MapPin, Calendar, FileText, User, Briefcase, CheckCircle2, Edit, Trash2 } from 'lucide-react';
import { initialCalendarEvents, detailedProjects, initialEmployees, initialLeads, initialClients } from '@/lib/mock-data';
import { usePermissions } from '@/hooks/usePermissions';

export function EventDetails() {
  const { eventId } = useParams();
    const { can } = usePermissions();
  
  const event = initialCalendarEvents.find(e => e.id === eventId);

  if (!event) return <div className="p-8 text-center text-secondary">Event not found.</div>;

  const project = event.projectId ? detailedProjects.find(p => p.id === event.projectId) : null;
  const client = event.clientId ? initialClients.find(c => c.id === event.clientId) : (project?.clientId ? initialClients.find(c => c.id === project.clientId) : null);
  const lead = event.leadId ? initialLeads.find(l => l.id === event.leadId) : null;
  const participants = event.employeeIds.map(id => initialEmployees.find(e => e.id === id)).filter(Boolean);

  const getEventColor = (type: string) => {
    switch(type) {
      case 'Site Visit': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'Design Review': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Material Delivery': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'Payment Due': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Follow-up': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-surface text-primary border-border';
    }
  };

  const startDate = new Date(event.startAt);
  const formattedDate = startDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  const startTime = startDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const endTime = event.endAt ? new Date(event.endAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : null;

  return (
    <div className="max-w-[1000px] mx-auto space-y-6 pb-12">
      <div className="flex items-center gap-4 mb-2">
        <Link to="/calendar">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <span className="text-xs font-medium text-accent uppercase tracking-wider">Event Details</span>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className={`px-2 py-0.5 rounded text-xs font-medium border ${getEventColor(event.type)}`}>
              {event.type}
            </span>
            <Badge variant={event.status === 'Completed' ? 'success' : event.status === 'Cancelled' ? 'danger' : 'warning'}>
              {event.status}
            </Badge>
            {event.priority === 'High' && <Badge variant="danger">High Priority</Badge>}
          </div>
          <h1 className="text-3xl font-semibold text-primary">{event.title}</h1>
        </div>
        <div className="flex items-center gap-3">
          {can('calendar.manage') && (
            <>
              {event.status !== 'Completed' && (
                <Button variant="secondary" size="sm" className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border-emerald-500/30">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Mark Complete
                </Button>
              )}
              <Button variant="secondary" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Reschedule
              </Button>
              <Button variant="secondary" size="sm" className="text-red-400 hover:bg-red-400/10 border-red-400/30 hover:text-red-400">
                <Trash2 className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-4 border-b border-border">
              <CardTitle className="text-lg">Schedule & Details</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-surface border border-border flex items-center justify-center shrink-0">
                  <Calendar className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium text-primary mb-1">{formattedDate}</p>
                  <p className="text-sm text-secondary">
                    {event.allDay ? 'All Day Event' : `${startTime} - ${endTime || 'TBD'}`}
                  </p>
                </div>
              </div>

              {event.location && (
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-surface border border-border flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-primary mb-1">Location</p>
                    <p className="text-sm text-secondary">{event.location}</p>
                  </div>
                </div>
              )}

              {event.description && (
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-surface border border-border flex items-center justify-center shrink-0">
                    <FileText className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-primary mb-1">Description</p>
                    <p className="text-sm text-secondary">{event.description}</p>
                  </div>
                </div>
              )}

            </CardContent>
          </Card>

          {/* Connected Context */}
          {(project || lead) && (
            <Card>
              <CardHeader className="pb-4 border-b border-border">
                <CardTitle className="text-lg">Related Records</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {project && (
                    <div className="p-4 flex justify-between items-center hover:bg-surface/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <Briefcase className="h-5 w-5 text-muted" />
                        <div>
                          <p className="text-sm font-medium text-primary">Project</p>
                          <p className="text-xs text-secondary">{project.name}</p>
                        </div>
                      </div>
                      <Link to={`/projects/${project.id}`}>
                        <Button variant="ghost" size="sm">Open</Button>
                      </Link>
                    </div>
                  )}
                  {client && (
                    <div className="p-4 flex justify-between items-center hover:bg-surface/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-muted" />
                        <div>
                          <p className="text-sm font-medium text-primary">Client Record</p>
                          <p className="text-xs text-secondary">{client.name}</p>
                        </div>
                      </div>
                      <Link to={`/clients/${client.id}`}>
                        <Button variant="ghost" size="sm">View Client</Button>
                      </Link>
                    </div>
                  )}
                  {lead && (
                    <div className="p-4 flex justify-between items-center hover:bg-surface/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-muted" />
                        <div>
                          <p className="text-sm font-medium text-primary">Lead</p>
                          <p className="text-xs text-secondary">{lead.name}</p>
                        </div>
                      </div>
                      <Link to="/leads">
                        <Button variant="ghost" size="sm">View Lead</Button>
                      </Link>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-4 border-b border-border">
              <CardTitle className="text-lg">Participants</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                {participants.map((emp: any) => (
                  <div key={emp.id} className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-xs font-medium text-accent">
                      {emp.avatarInitials}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-primary">{emp.name}</p>
                      <p className="text-xs text-secondary">{emp.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-surface/50">
            <CardContent className="p-4">
              <p className="text-xs text-secondary mb-1">Created By</p>
              <p className="text-sm font-medium text-primary">{initialEmployees.find(e => e.id === event.createdBy)?.name || 'System'}</p>
              <p className="text-xs text-muted mt-2">On {new Date(event.createdAt).toLocaleDateString()}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
