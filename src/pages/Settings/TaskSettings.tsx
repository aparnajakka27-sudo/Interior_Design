import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { GripVertical, Plus, Trash2 } from 'lucide-react';

export function TaskSettings() {
  const statuses = ['To Do', 'In Progress', 'Blocked', 'Completed'];
  const priorities = ['Low', 'Medium', 'High', 'Urgent'];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-medium text-primary">Task Settings</h2>
        <p className="text-sm text-secondary mt-1">Configure task workflow and priority levels.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="border-b border-border pb-4 flex flex-row justify-between items-center">
            <CardTitle className="text-base">Statuses</CardTitle>
            <Button variant="secondary" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {statuses.map(s => (
                <div key={s} className="flex justify-between items-center p-4 hover:bg-surface/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <GripVertical className="h-4 w-4 text-muted cursor-move" />
                    <p className="text-sm font-medium text-primary">{s}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-secondary hover:text-red-400">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b border-border pb-4 flex flex-row justify-between items-center">
            <CardTitle className="text-base">Priorities</CardTitle>
            <Button variant="secondary" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {priorities.map(p => (
                <div key={p} className="flex justify-between items-center p-4 hover:bg-surface/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <GripVertical className="h-4 w-4 text-muted cursor-move" />
                    <p className="text-sm font-medium text-primary">{p}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-secondary hover:text-red-400">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
