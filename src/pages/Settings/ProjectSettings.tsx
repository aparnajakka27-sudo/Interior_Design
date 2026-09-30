import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { GripVertical, Plus, Trash2 } from 'lucide-react';

export function ProjectSettings() {
  const stages = [
    'Planning', 'Site Visit', 'Design', 'Client Approval', 
    'Procurement', 'Production', 'Execution', 'Snagging', 'Handover', 'Completed', 'Cancelled'
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-medium text-primary">Project Settings</h2>
        <p className="text-sm text-secondary mt-1">Configure project lifecycle and statuses.</p>
      </div>

      <Card>
        <CardHeader className="border-b border-border pb-4 flex flex-row justify-between items-center">
          <CardTitle className="text-base">Project Stages</CardTitle>
          <Button variant="secondary" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Stage
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {stages.map(stage => (
              <div key={stage} className="flex justify-between items-center p-4 hover:bg-surface/50 transition-colors">
                <div className="flex items-center gap-3">
                  <GripVertical className="h-4 w-4 text-muted cursor-move" />
                  <p className="text-sm font-medium text-primary">{stage}</p>
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-secondary hover:text-red-400">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button variant="ghost">Reset</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}
