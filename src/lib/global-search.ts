import { 
  detailedProjects, initialClients, initialLeads, initialEmployees, 
  initialTasks, initialCalendarEvents 
} from './mock-data';
import type { Permission } from './permissions';

export type SearchEntityType = 'Project' | 'Client' | 'Lead' | 'Employee' | 'Task' | 'Material' | 'PO' | 'Invoice' | 'Quotation' | 'Event' | 'Document';

export type GlobalSearchResult = {
  id: string;
  type: SearchEntityType;
  title: string;
  subtitle?: string;
  metadata?: string;
  route: string;
};

export function performGlobalSearch(query: string, can: (p: Permission) => boolean): GlobalSearchResult[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const results: GlobalSearchResult[] = [];

  if (can('projects.view')) {
    detailedProjects.forEach(p => {
      const client = p.clientId ? initialClients.find(c => c.id === p.clientId) : null;
      if (p.name.toLowerCase().includes(q) || p.location.toLowerCase().includes(q) || (client && client.name.toLowerCase().includes(q))) {
        results.push({
          id: p.id,
          type: 'Project',
          title: p.name,
          subtitle: p.location,
          metadata: 'Project',
          route: "/projects/" + p.id
        });
      }
    });
  }

  if (can('clients.view')) {
    initialClients.forEach(c => {
      if (c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.phone.includes(q)) {
        results.push({
          id: c.id,
          type: 'Client',
          title: c.name,
          subtitle: c.email,
          metadata: 'Client',
          route: "/clients/" + c.id
        });
      }
    });
  }

  if (can('leads.view')) {
    initialLeads.forEach(l => {
      if (l.name.toLowerCase().includes(q) || l.email.toLowerCase().includes(q) || l.requirement.toLowerCase().includes(q)) {
        results.push({
          id: l.id,
          type: 'Lead',
          title: l.name,
          subtitle: l.requirement,
          metadata: 'Lead',
          route: "/leads"
        });
      }
    });
  }

  if (can('team.view')) {
    initialEmployees.forEach(e => {
      if (e.name.toLowerCase().includes(q) || e.role.toLowerCase().includes(q) || e.department.toLowerCase().includes(q)) {
        results.push({
          id: e.id,
          type: 'Employee',
          title: e.name,
          subtitle: e.role,
          metadata: 'Employee',
          route: "/team"
        });
      }
    });
  }

  if (can('tasks.view')) {
    initialTasks.forEach(t => {
      if (t.title.toLowerCase().includes(q) || (t.description && t.description.toLowerCase().includes(q))) {
        const project = t.projectId ? detailedProjects.find(p => p.id === t.projectId) : null;
        results.push({
          id: t.id,
          type: 'Task',
          title: t.title,
          subtitle: project ? project.name : '',
          metadata: 'Task',
          route: "/team/tasks"
        });
      }
    });
  }

  if (can('calendar.view')) {
    initialCalendarEvents.forEach(e => {
      if (e.title.toLowerCase().includes(q) || (e.description && e.description.toLowerCase().includes(q))) {
        results.push({
          id: e.id,
          type: 'Event',
          title: e.title,
          subtitle: new Date(e.startAt).toLocaleDateString(),
          metadata: 'Event',
          route: "/calendar/event/" + e.id
        });
      }
    });
  }

  return results;
}
