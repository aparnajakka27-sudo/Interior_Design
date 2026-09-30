import { Link } from '@/components/ui/Link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { MoreHorizontal, Plus, Shield } from 'lucide-react';

export function TeamSettings() {
  const departments = [
    { id: 1, name: 'Management', headcount: 1 },
    { id: 2, name: 'Design', headcount: 4 },
    { id: 3, name: 'Projects', headcount: 3 },
    { id: 4, name: 'Site Operations', headcount: 5 },
    { id: 5, name: 'Accounts', headcount: 2 },
    { id: 6, name: 'Sales', headcount: 3 },
  ];

  const roles = [
    { name: 'Admin / Owner', dept: 'Management', users: 1, perms: 'Full Access' },
    { name: 'Designer', dept: 'Design', users: 4, perms: 'Restricted' },
    { name: 'Project Manager', dept: 'Projects', users: 3, perms: 'Project Level' },
    { name: 'Site Manager', dept: 'Site Operations', users: 5, perms: 'Site Level' },
    { name: 'Accounts', dept: 'Accounts', users: 2, perms: 'Finance Only' },
    { name: 'Sales', dept: 'Sales', users: 3, perms: 'Leads Only' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-medium text-primary">Team & Roles</h2>
        <p className="text-sm text-secondary mt-1">Configure company structure and role boundaries.</p>
      </div>

      <Card>
        <CardHeader className="border-b border-border pb-4 flex flex-row justify-between items-center">
          <CardTitle className="text-base">Departments</CardTitle>
          <Button variant="secondary" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Department
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {departments.map(dept => (
              <div key={dept.id} className="flex justify-between items-center p-4 hover:bg-surface/50 transition-colors">
                <div>
                  <p className="text-sm font-medium text-primary">{dept.name}</p>
                  <p className="text-xs text-secondary mt-1">{dept.headcount} employees</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4 text-muted" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="border-b border-border pb-4 flex flex-row justify-between items-center">
          <CardTitle className="text-base">Roles & Access</CardTitle>
          <Link to="/team/roles">
            <Button variant="secondary" size="sm">
              <Shield className="h-4 w-4 mr-2" />
              Manage Permissions
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted uppercase bg-surface/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium">Department</th>
                <th className="px-6 py-4 font-medium">Active Users</th>
                <th className="px-6 py-4 font-medium">Access Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {roles.map(role => (
                <tr key={role.name} className="hover:bg-elevated/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-primary">{role.name}</td>
                  <td className="px-6 py-4 text-secondary">{role.dept}</td>
                  <td className="px-6 py-4">{role.users}</td>
                  <td className="px-6 py-4">
                    <Badge variant={role.name === 'Admin / Owner' ? 'danger' : 'neutral'}>
                      {role.perms}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

    </div>
  );
}
