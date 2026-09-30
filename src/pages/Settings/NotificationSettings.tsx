import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export function NotificationSettings() {
  const categories = [
    'Task Assignments', 'Task Deadlines', 'Client Approvals', 
    'Messages', 'Payments', 'Materials', 'Site Issues', 'Leads', 'Documents', 'Calendar Events'
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-medium text-primary">Notification Preferences</h2>
        <p className="text-sm text-secondary mt-1">Control how and when you are notified about studio activity.</p>
      </div>

      <Card>
        <CardHeader className="border-b border-border pb-4">
          <CardTitle className="text-base">My Notification Settings</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted uppercase bg-surface/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium text-center">In-App</th>
                <th className="px-6 py-4 font-medium text-center">Email <span className="text-[10px] text-muted ml-1">(Soon)</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {categories.map((c, idx) => (
                <tr key={c} className="hover:bg-elevated/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-primary">{c}</td>
                  <td className="px-6 py-4 text-center">
                    <input type="checkbox" defaultChecked={true} className="rounded border-border bg-surface text-accent focus:ring-accent" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <input type="checkbox" defaultChecked={idx % 2 === 0} disabled className="rounded border-border bg-surface text-accent focus:ring-accent opacity-50 cursor-not-allowed" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button variant="ghost">Reset</Button>
        <Button>Save Preferences</Button>
      </div>
    </div>
  );
}
