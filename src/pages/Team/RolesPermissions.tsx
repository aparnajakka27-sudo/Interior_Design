import { Link } from '@/components/ui/Link';
import { Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const permissionMatrix = [
  { module: 'Leads', admin: 'Full', designer: '—', pm: 'View', site: '—', accounts: '—', sales: 'Full' },
  { module: 'Projects', admin: 'Full', designer: 'Assigned', pm: 'Assigned', site: 'Assigned', accounts: 'View', sales: 'Limited' },
  { module: 'Design', admin: 'Full', designer: 'Full', pm: 'View', site: '—', accounts: '—', sales: '—' },
  { module: 'Site', admin: 'Full', designer: 'View', pm: 'Full', site: 'Full', accounts: '—', sales: '—' },
  { module: 'Materials', admin: 'Full', designer: 'View', pm: 'Full', site: 'Update', accounts: 'View', sales: '—' },
  { module: 'Finance', admin: 'Full', designer: '—', pm: 'View', site: '—', accounts: 'Full', sales: '—' },
  { module: 'Team', admin: 'Full', designer: '—', pm: 'View', site: '—', accounts: '—', sales: '—' },
  { module: 'Tasks', admin: 'Full', designer: 'Assigned', pm: 'Full', site: 'Assigned', accounts: 'Assigned', sales: 'Assigned' }
];

export function RolesPermissions() {
  return (
    <div className="max-w-[1400px] mx-auto space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-primary">Roles & Permissions</h1>
          <p className="text-secondary mt-1 text-sm">System access control and role definitions.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/team"><Button variant="secondary" size="sm">Back to Team</Button></Link>
        </div>
      </div>

      <Card>
        <CardHeader className="border-b border-border pb-4">
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-accent" />
            Permission Matrix
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-muted uppercase bg-elevated/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium">Module</th>
                <th className="px-6 py-4 font-medium text-center">Admin / Owner</th>
                <th className="px-6 py-4 font-medium text-center">Designer</th>
                <th className="px-6 py-4 font-medium text-center">Project Manager</th>
                <th className="px-6 py-4 font-medium text-center">Site Manager</th>
                <th className="px-6 py-4 font-medium text-center">Accounts</th>
                <th className="px-6 py-4 font-medium text-center">Sales</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {permissionMatrix.map((row, i) => (
                <tr key={i} className="hover:bg-elevated/50">
                  <td className="px-6 py-4 font-medium text-primary">{row.module}</td>
                  <td className={`px-6 py-4 text-center font-medium ${row.admin === 'Full' ? 'text-accent' : 'text-secondary'}`}>{row.admin}</td>
                  <td className={`px-6 py-4 text-center font-medium ${row.designer === 'Full' ? 'text-accent' : row.designer === '—' ? 'text-muted' : 'text-secondary'}`}>{row.designer}</td>
                  <td className={`px-6 py-4 text-center font-medium ${row.pm === 'Full' ? 'text-accent' : row.pm === '—' ? 'text-muted' : 'text-secondary'}`}>{row.pm}</td>
                  <td className={`px-6 py-4 text-center font-medium ${row.site === 'Full' ? 'text-accent' : row.site === '—' ? 'text-muted' : 'text-secondary'}`}>{row.site}</td>
                  <td className={`px-6 py-4 text-center font-medium ${row.accounts === 'Full' ? 'text-accent' : row.accounts === '—' ? 'text-muted' : 'text-secondary'}`}>{row.accounts}</td>
                  <td className={`px-6 py-4 text-center font-medium ${row.sales === 'Full' ? 'text-accent' : row.sales === '—' ? 'text-muted' : 'text-secondary'}`}>{row.sales}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
      
      <div className="bg-surface border border-border p-4 rounded-xl text-sm text-secondary">
        <p><span className="text-accent font-medium">Note:</span> Role permissions are currently locked for the demo. Editing role permissions will be available in the Roles & Permissions Settings module in a future update.</p>
      </div>
    </div>
  );
}
