import { Link } from '@/components/ui/Link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Download } from 'lucide-react';
// We don't have mock POs, but we will create local simulated data for this phase's presentation.

export function ProcurementAnalytics() {
  const kpis = {
    totalPOs: 42,
    totalValue: '₹34.2L',
    activePOs: 14,
    delayed: 3
  };

  const statuses = [
    { label: 'Draft', count: 4, color: 'bg-surface' },
    { label: 'Confirmed', count: 8, color: 'bg-accent/40' },
    { label: 'Dispatched', count: 5, color: 'bg-accent/70' },
    { label: 'In Transit', count: 7, color: 'bg-accent' },
    { label: 'Received', count: 18, color: 'bg-emerald-500' }
  ];

  const vendors = [
    { name: 'Elite Marbles & Tiles', orders: 12, value: '₹14.5L', onTime: 10, delayed: 2 },
    { name: 'WoodCraft Ply & Timbers', orders: 8, value: '₹8.2L', onTime: 8, delayed: 0 },
    { name: 'Lumina Lighting Solutions', orders: 6, value: '₹4.8L', onTime: 4, delayed: 2 },
    { name: 'Urban Bath Fittings', orders: 5, value: '₹3.6L', onTime: 5, delayed: 0 },
  ];

  return (
    <div className="max-w-[1200px] mx-auto space-y-6 pb-12">
      <div className="flex items-center gap-4 mb-2">
        <Link to="/analytics">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <span className="text-xs font-medium text-accent uppercase tracking-wider">Analytics</span>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-primary">Procurement Analytics</h1>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-surface/50 border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">{kpis.totalPOs}</p>
            <p className="text-xs text-muted uppercase tracking-wider mt-1">Total POs</p>
          </CardContent>
        </Card>
        <Card className="bg-surface/50 border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">{kpis.totalValue}</p>
            <p className="text-xs text-muted uppercase tracking-wider mt-1">Procurement Value</p>
          </CardContent>
        </Card>
        <Card className="bg-surface/50 border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-accent">{kpis.activePOs}</p>
            <p className="text-xs text-muted uppercase tracking-wider mt-1">Active Deliveries</p>
          </CardContent>
        </Card>
        <Card className="bg-surface/50 border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-red-400">{kpis.delayed}</p>
            <p className="text-xs text-muted uppercase tracking-wider mt-1">Delayed</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Status Pipeline */}
        <Card className="lg:col-span-1">
          <CardHeader className="border-b border-border pb-4">
            <CardTitle className="text-lg">PO Status Distribution</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {statuses.map(status => (
                <div key={status.label} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${status.color}`}></span>
                    <span className="text-secondary">{status.label}</span>
                  </div>
                  <span className="font-medium text-primary">{status.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Vendor Performance */}
        <Card className="lg:col-span-2">
          <CardHeader className="border-b border-border pb-4 flex flex-row justify-between items-center">
            <CardTitle className="text-lg">Vendor Performance</CardTitle>
            <Button variant="ghost" size="sm" className="h-8">View Vendors</Button>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted uppercase bg-surface/50 border-b border-border">
                <tr>
                  <th className="px-6 py-4 font-medium">Vendor</th>
                  <th className="px-6 py-4 font-medium">Orders</th>
                  <th className="px-6 py-4 font-medium">Value</th>
                  <th className="px-6 py-4 font-medium">On-Time</th>
                  <th className="px-6 py-4 font-medium">Delayed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {vendors.map((vendor, idx) => (
                  <tr key={idx} className="hover:bg-elevated/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-primary">{vendor.name}</td>
                    <td className="px-6 py-4 text-secondary">{vendor.orders}</td>
                    <td className="px-6 py-4 font-medium text-primary">{vendor.value}</td>
                    <td className="px-6 py-4 text-emerald-400">{vendor.onTime}</td>
                    <td className="px-6 py-4">
                      {vendor.delayed > 0 ? (
                        <span className="text-red-400 font-medium">{vendor.delayed}</span>
                      ) : (
                        <span className="text-secondary">0</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
