import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Building2, Upload } from 'lucide-react';

export function CompanySettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-medium text-primary">Company Information</h2>
        <p className="text-sm text-secondary mt-1">Manage your corporate identity and contact details.</p>
      </div>

      <Card>
        <CardHeader className="border-b border-border pb-4">
          <CardTitle className="text-base">Branding</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="flex items-center gap-6">
            <div className="h-20 w-20 rounded-lg bg-surface border border-border flex items-center justify-center shrink-0">
              <Building2 className="h-8 w-8 text-muted" />
            </div>
            <div>
              <p className="text-sm font-medium text-primary mb-2">Company Logo</p>
              <div className="flex items-center gap-3">
                <Button variant="secondary" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload New
                </Button>
                <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-400">Remove</Button>
              </div>
              <p className="text-xs text-muted mt-2">Recommended size: 400x400px. Max 2MB.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">Company Name</label>
              <input type="text" defaultValue="Decormart Studio" className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-primary focus:outline-none focus:border-accent" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">GST / Tax Number</label>
              <input type="text" defaultValue="29ABCDE1234F1Z5" className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-primary focus:outline-none focus:border-accent" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="border-b border-border pb-4">
          <CardTitle className="text-base">Contact Details</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">Company Email</label>
              <input type="email" defaultValue="hello@decormart.studio" className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-primary focus:outline-none focus:border-accent" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">Company Phone</label>
              <input type="tel" defaultValue="+91 98765 43210" className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-primary focus:outline-none focus:border-accent" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">Website</label>
              <input type="url" defaultValue="https://decormart.studio" className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-primary focus:outline-none focus:border-accent" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="border-b border-border pb-4">
          <CardTitle className="text-base">Office Address</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">Street Address</label>
            <input type="text" defaultValue="Level 4, Orion Building, 100 Ft Road" className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-primary focus:outline-none focus:border-accent" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">City</label>
              <input type="text" defaultValue="Bangalore" className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-primary focus:outline-none focus:border-accent" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">State / Province</label>
              <input type="text" defaultValue="Karnataka" className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-primary focus:outline-none focus:border-accent" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">Country</label>
              <input type="text" defaultValue="India" className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-primary focus:outline-none focus:border-accent" />
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
