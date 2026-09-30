import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { GripVertical, Plus, Trash2 } from 'lucide-react';

export function FinanceSettings() {
  const expenseCategories = ['Materials', 'Labour', 'Transport', 'Site Expense', 'Professional Fees', 'Utilities', 'Other'];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-medium text-primary">Finance Settings</h2>
        <p className="text-sm text-secondary mt-1">Configure invoicing, quotations and expense categories.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="border-b border-border pb-4">
            <CardTitle className="text-base">Invoices</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">Invoice Number Prefix</label>
              <input type="text" defaultValue="INV-" className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-primary focus:outline-none focus:border-accent" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">Default Payment Terms</label>
              <input type="text" defaultValue="30 Days" className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-primary focus:outline-none focus:border-accent" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b border-border pb-4">
            <CardTitle className="text-base">Quotations</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">Quotation Number Prefix</label>
              <input type="text" defaultValue="QUO-" className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-primary focus:outline-none focus:border-accent" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">Default Validity</label>
              <input type="text" defaultValue="15 Days" className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-primary focus:outline-none focus:border-accent" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="border-b border-border pb-4 flex flex-row justify-between items-center">
          <CardTitle className="text-base">Expense Categories</CardTitle>
          <Button variant="secondary" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {expenseCategories.map(c => (
              <div key={c} className="flex justify-between items-center p-4 hover:bg-surface/50 transition-colors">
                <div className="flex items-center gap-3">
                  <GripVertical className="h-4 w-4 text-muted cursor-move" />
                  <p className="text-sm font-medium text-primary">{c}</p>
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
