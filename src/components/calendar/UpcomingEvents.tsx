import { Link } from '@/components/ui/Link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Calendar } from 'lucide-react';
import { initialCalendarEvents, detailedProjects } from '@/lib/mock-data';

export function UpcomingEvents() {
    
  // Simple filter for upcoming events
  // In a real app this would filter by date >= today and limit to top 3-5
  // For demo, we just grab a few that might be assigned to this user or project
  const upcomingEvents = initialCalendarEvents
    .filter(e => e.status !== 'Completed' && e.status !== 'Cancelled')
    .slice(0, 3);

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center pb-2 border-b border-border">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <Calendar className="h-4 w-4 text-accent" />
          Upcoming Events
        </CardTitle>
        <Link to="/calendar">
          <Button variant="ghost" size="sm" className="text-xs h-7">View Calendar</Button>
        </Link>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {upcomingEvents.length > 0 ? (
          upcomingEvents.map(event => {
            const project = event.projectId ? detailedProjects.find(p => p.id === event.projectId) : null;
            const time = new Date(event.startAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
            
            return (
              <div key={event.id} className="flex gap-3">
                <div className="shrink-0 w-16 pt-0.5">
                  <p className="text-xs font-medium text-primary">{time}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-primary truncate">{event.title}</p>
                  <p className="text-xs text-secondary truncate">{project ? project.name : event.type}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-sm text-secondary text-center py-4">No upcoming events.</p>
        )}
      </CardContent>
    </Card>
  );
}
