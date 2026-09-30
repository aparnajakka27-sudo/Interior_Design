import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export function GeneralSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-medium text-primary">General Settings</h2>
        <p className="text-sm text-secondary mt-1">Configure your workspace defaults.</p>
      </div>

      <Card>
        <CardHeader className="border-b border-border pb-4">
          <CardTitle className="text-base">Workspace</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">Workspace Name</label>
              <input type="text" defaultValue="Decormart Studio" className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-primary focus:outline-none focus:border-accent" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">Currency</label>
              <select className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-primary focus:outline-none focus:border-accent">
                <option>INR ₹</option>
                <option>USD $</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">Time Zone</label>
              <select className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-primary focus:outline-none focus:border-accent">
                <option>Asia/Kolkata (IST)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">Date Format</label>
              <select className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-primary focus:outline-none focus:border-accent">
                <option>DD/MM/YYYY</option>
                <option>MM/DD/YYYY</option>
                <option>YYYY-MM-DD</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">Time Format</label>
              <select className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-primary focus:outline-none focus:border-accent">
                <option>12-hour (AM/PM)</option>
                <option>24-hour</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="border-b border-border pb-4">
          <CardTitle className="text-base">System Defaults</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">Default Project Stage</label>
              <select className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-primary focus:outline-none focus:border-accent">
                <option>Planning</option>
                <option>Consultation</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">Default Lead Stage</label>
              <select className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-primary focus:outline-none focus:border-accent">
                <option>New Lead</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">Default Task Priority</label>
              <select className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-primary focus:outline-none focus:border-accent">
                <option>Medium</option>
                <option>High</option>
                <option>Low</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">Default Calendar View</label>
              <select className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-primary focus:outline-none focus:border-accent">
                <option>Agenda</option>
                <option>Month</option>
                <option>Week</option>
              </select>
            </div>
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
