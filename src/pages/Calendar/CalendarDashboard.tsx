import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, Clock, MapPin, Search } from 'lucide-react';
import { initialCalendarEvents, detailedProjects, initialLeads } from '@/lib/mock-data';
import { usePermissions } from '@/hooks/usePermissions';

export function CalendarDashboard() {
  const { can } = usePermissions();
  const [view, setView] = useState<'Month' | 'Week' | 'Agenda'>('Agenda');
   // Mocking a specific day for demo to align with mock-data

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

  const todayEvents = initialCalendarEvents.filter(e => e.startAt.includes('2026-10-02'));
  const nextEvent = initialCalendarEvents.find(e => e.startAt >= '2026-10-02T10:00:00Z');

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-primary">Calendar</h1>
          <p className="text-secondary mt-1 text-sm">Manage schedules, project milestones, visits and important deadlines.</p>
        </div>
        <div className="flex items-center gap-3">
          {can('calendar.create') && (
            <Link to="/calendar?create=true">
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Event
              </Button>
            </Link>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        
        {/* Left Panel: Controls & Today */}
        <div className="xl:col-span-1 space-y-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium text-primary">October 2026</h2>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><ChevronLeft className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><ChevronRight className="h-4 w-4" /></Button>
                </div>
              </div>
              
              <div className="grid grid-cols-7 gap-1 text-center text-xs text-muted mb-2">
                <div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div><div>Su</div>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-sm">
                {/* Mock month calendar layout */}
                {Array.from({length: 31}).map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-8 w-8 flex items-center justify-center rounded-full mx-auto cursor-pointer
                      ${i+1 === 2 ? 'bg-accent text-background font-medium' : 'hover:bg-surface text-secondary'}
                      ${[3, 4, 5, 8].includes(i+1) ? 'relative' : ''}
                    `}
                  >
                    {i+1}
                    {[3, 4, 5, 8].includes(i+1) && <span className="absolute bottom-1 w-1 h-1 bg-accent rounded-full"></span>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Today Panel */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm font-medium text-primary mb-4 flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-accent" />
                Today
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-secondary">{todayEvents.length} Events Scheduled</span>
                </div>
                
                {nextEvent && (
                  <div className="bg-surface/50 border border-border p-3 rounded-lg">
                    <p className="text-xs text-muted mb-1">Up Next • 10:00 AM</p>
                    <p className="text-sm font-medium text-primary truncate">{nextEvent.title}</p>
                    <p className="text-xs text-secondary mt-1">{nextEvent.location}</p>
                  </div>
                )}

                <div className="flex justify-between items-center text-sm text-amber-400">
                  <span>1 overdue follow-up</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Filters (Mock) */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm font-medium text-primary mb-4">Filters</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded border-border bg-surface text-accent focus:ring-accent" />
                  <span className="text-sm text-secondary">Site Visits</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded border-border bg-surface text-accent focus:ring-accent" />
                  <span className="text-sm text-secondary">Design Reviews</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded border-border bg-surface text-accent focus:ring-accent" />
                  <span className="text-sm text-secondary">Follow-ups</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded border-border bg-surface text-accent focus:ring-accent" />
                  <span className="text-sm text-secondary">Deliveries</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel: Agenda / Calendar Views */}
        <div className="xl:col-span-3 space-y-4">
          <div className="flex justify-between items-center bg-surface border border-border rounded-lg p-2">
            <div className="relative w-64">
              <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input 
                type="text" 
                placeholder="Search events..." 
                className="w-full bg-background border border-border rounded-md pl-9 pr-3 py-1.5 text-sm text-primary focus:outline-none focus:border-accent"
              />
            </div>
            <div className="flex bg-background border border-border rounded-md overflow-hidden">
              <button 
                onClick={() => setView('Agenda')}
                className={`px-4 py-1.5 text-sm font-medium transition-colors ${view === 'Agenda' ? 'bg-accent/10 text-accent' : 'text-secondary hover:text-primary hover:bg-surface'}`}
              >
                Agenda
              </button>
              <button 
                onClick={() => setView('Week')}
                className={`px-4 py-1.5 text-sm font-medium transition-colors border-l border-border ${view === 'Week' ? 'bg-accent/10 text-accent' : 'text-secondary hover:text-primary hover:bg-surface'}`}
              >
                Week
              </button>
              <button 
                onClick={() => setView('Month')}
                className={`px-4 py-1.5 text-sm font-medium transition-colors border-l border-border ${view === 'Month' ? 'bg-accent/10 text-accent' : 'text-secondary hover:text-primary hover:bg-surface'}`}
              >
                Month
              </button>
            </div>
          </div>

          <Card className="min-h-[600px]">
            <CardContent className="p-0">
              
              {/* Agenda View */}
              {view === 'Agenda' && (
                <div className="divide-y divide-border">
                  {initialCalendarEvents.map((event, idx) => {
                    const isNewDay = idx === 0 || initialCalendarEvents[idx-1].startAt.split('T')[0] !== event.startAt.split('T')[0];
                    const date = new Date(event.startAt);
                    const formattedDate = date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
                    const time = event.allDay ? 'All Day' : date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                    
                    const project = event.projectId ? detailedProjects.find(p => p.id === event.projectId) : null;
                    const lead = event.leadId ? initialLeads.find(l => l.id === event.leadId) : null;
                    
                    return (
                      <div key={event.id}>
                        {isNewDay && (
                          <div className="bg-surface/50 px-6 py-2 text-sm font-medium text-primary sticky top-0">
                            {formattedDate}
                          </div>
                        )}
                        <Link to={`/calendar/event/${event.id}`} className="block hover:bg-elevated/50 transition-colors p-6">
                          <div className="flex gap-6">
                            <div className="w-24 shrink-0 pt-1">
                              <p className="text-sm font-medium text-primary">{time}</p>
                              {event.endAt && !event.allDay && (
                                <p className="text-xs text-muted">{new Date(event.endAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
                              )}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-medium border ${getEventColor(event.type)}`}>
                                  {event.type}
                                </span>
                                {event.priority === 'High' && <Badge variant="danger" className="text-[10px]">High Priority</Badge>}
                              </div>
                              <h3 className="text-base font-medium text-primary truncate mb-1">{event.title}</h3>
                              
                              {(project || lead) && (
                                <p className="text-sm text-secondary mb-2 truncate">
                                  {project ? project.name : lead?.name}
                                </p>
                              )}
                              
                              <div className="flex items-center gap-4 text-xs text-muted">
                                {event.location && (
                                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {event.location}</span>
                                )}
                                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {event.status}</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Placeholder for Week/Month (Since we aren't building a full grid component from scratch) */}
              {view !== 'Agenda' && (
                <div className="flex flex-col items-center justify-center h-[600px] text-center p-8 opacity-60">
                  <CalendarIcon className="h-16 w-16 text-muted mb-4" />
                  <h3 className="text-lg font-medium text-primary">Rich {view} View</h3>
                  <p className="text-sm text-secondary mt-2 max-w-md">
                    In a production environment, this would render a full-scale interactive grid. For this demo, please use the <strong>Agenda</strong> view to interact with event details.
                  </p>
                  <Button variant="secondary" className="mt-6" onClick={() => setView('Agenda')}>Return to Agenda</Button>
                </div>
              )}

            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
