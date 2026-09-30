import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import { Upload, LogOut } from 'lucide-react';
import { initialEmployees } from '@/lib/mock-data';

export function ProfileSettings() {
  const { user, logout } = useAuth();
  
  // Try to find the full employee record for more details
  const employee = user ? initialEmployees.find(e => e.id === user.id) : null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-medium text-primary">My Profile</h2>
        <p className="text-sm text-secondary mt-1">Manage your personal information and security.</p>
      </div>

      <Card>
        <CardHeader className="border-b border-border pb-4">
          <CardTitle className="text-base">Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="flex items-center gap-6">
            <div className="h-20 w-20 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center shrink-0">
              <span className="text-2xl font-medium text-accent">{user?.avatarInitials}</span>
            </div>
            <div>
              <p className="text-sm font-medium text-primary mb-2">Profile Picture</p>
              <div className="flex items-center gap-3">
                <Button variant="secondary" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload New
                </Button>
                <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-400">Remove</Button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">Full Name</label>
              <input type="text" defaultValue={user?.name} className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-primary focus:outline-none focus:border-accent" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">Email Address</label>
              <input type="email" defaultValue={user?.email} className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-primary focus:outline-none focus:border-accent" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">Phone Number</label>
              <input type="tel" defaultValue={employee?.phone || ''} className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-primary focus:outline-none focus:border-accent" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">Department</label>
              <input type="text" defaultValue={employee?.department || ''} disabled className="w-full bg-surface border border-border rounded-md px-3 py-2 text-sm text-secondary cursor-not-allowed" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">Role</label>
              <input type="text" defaultValue={user?.role} disabled className="w-full bg-surface border border-border rounded-md px-3 py-2 text-sm text-secondary cursor-not-allowed" />
              <p className="text-xs text-muted">Role changes must be made by an Administrator.</p>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button>Save Profile</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="border-b border-border pb-4">
          <CardTitle className="text-base">Security</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">Current Password</label>
              <input type="password" placeholder="••••••••" className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-primary focus:outline-none focus:border-accent" />
            </div>
            <div className="hidden md:block"></div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">New Password</label>
              <input type="password" placeholder="Enter new password" className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-primary focus:outline-none focus:border-accent" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">Confirm New Password</label>
              <input type="password" placeholder="Confirm new password" className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-primary focus:outline-none focus:border-accent" />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button variant="secondary">Update Password</Button>
          </div>
        </CardContent>
      </Card>

      <div className="pt-4 border-t border-border flex justify-between items-center">
        <div>
          <h3 className="text-sm font-medium text-primary">Account Session</h3>
          <p className="text-xs text-secondary mt-1">Sign out of your current session on this device.</p>
        </div>
        <Button variant="secondary" className="text-red-400 hover:text-red-400 hover:bg-red-400/10 border-red-400/30" onClick={logout}>
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>

    </div>
  );
}
