import { useState } from 'react';
import { Link } from '@/components/ui/Link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Label } from '@/components/ui/Label';
import { Plus, Search, Filter, ShoppingCart, ArrowRight } from 'lucide-react';
import { initialPurchaseOrders, detailedProjects, initialVendors } from '@/lib/mock-data';

const PO_METRICS = [
  { label: 'Draft', value: '4' },
  { label: 'Sent', value: '7' },
  { label: 'Confirmed', value: '9' },
  { label: 'Partially Received', value: '5' },
  { label: 'Completed', value: '18' },
  { label: 'Delayed', value: '3' },
];

export function PurchaseOrdersList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Draft': return <Badge variant="neutral">Draft</Badge>;
      case 'Sent': return <Badge variant="warning">Sent</Badge>;
      case 'Confirmed': return <Badge variant="neutral">Confirmed</Badge>;
      case 'Partially Received': return <Badge variant="warning">Partially Received</Badge>;
      case 'Delivered': return <Badge variant="success">Delivered</Badge>;
      case 'Delayed': return <Badge variant="danger">Delayed</Badge>;
      case 'Cancelled': return <Badge variant="danger">Cancelled</Badge>;
      default: return <Badge variant="neutral">{status}</Badge>;
    }
  };

  const getProjectName = (id: string) => detailedProjects.find(p => p.id === id)?.name || id;
  const getVendorName = (id: string) => initialVendors.find(v => v.id === id)?.name || id;

  const filteredPOs = initialPurchaseOrders.filter(po => 
    po.poNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    po.vendorId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-[1400px] mx-auto space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-primary">Purchase Orders</h1>
          <p className="text-secondary mt-1 text-sm">Track material orders from creation through delivery.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Create PO
        </Button>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {PO_METRICS.map((metric, i) => (
          <div key={i} className="bg-surface border border-border rounded-xl p-4 text-center">
            <p className="text-xl font-semibold text-primary mb-1">{metric.value}</p>
            <p className="text-xs font-medium text-secondary">{metric.label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-surface border border-border rounded-xl p-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <Input 
            placeholder="Search PO number or vendor..." 
            className="pl-9 w-full"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex w-full md:w-auto items-center gap-3 overflow-x-auto custom-scrollbar pb-1 md:pb-0">
          <select className="h-9 rounded-md border border-border bg-background px-3 py-1 text-sm text-primary appearance-none focus:outline-none focus:ring-1 focus:ring-accent min-w-[120px]">
            <option>All Projects</option>
            <option>Sharma Residence</option>
          </select>
          <select className="h-9 rounded-md border border-border bg-background px-3 py-1 text-sm text-primary appearance-none focus:outline-none focus:ring-1 focus:ring-accent min-w-[120px]">
            <option>All Statuses</option>
            <option>Confirmed</option>
            <option>Delayed</option>
          </select>
          <Button variant="ghost" size="sm" className="whitespace-nowrap">
            <Filter className="mr-2 h-4 w-4" /> Clear Filters
          </Button>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden hidden md:block">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-muted uppercase bg-elevated/50 border-b border-border">
            <tr>
              <th className="px-6 py-4 font-medium">PO Number</th>
              <th className="px-6 py-4 font-medium">Project</th>
              <th className="px-6 py-4 font-medium">Vendor</th>
              <th className="px-6 py-4 font-medium">Order Date</th>
              <th className="px-6 py-4 font-medium">Expected</th>
              <th className="px-6 py-4 font-medium">Total</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredPOs.map((po) => (
              <tr key={po.id} className="hover:bg-elevated/50 transition-colors group">
                <td className="px-6 py-4 font-medium text-primary"><ShoppingCart className="inline mr-2 h-4 w-4 text-muted"/>{po.poNumber}</td>
                <td className="px-6 py-4 text-secondary">{getProjectName(po.projectId)}</td>
                <td className="px-6 py-4 text-secondary">{getVendorName(po.vendorId)}</td>
                <td className="px-6 py-4 text-secondary">{po.date}</td>
                <td className="px-6 py-4 text-secondary">{po.expectedDelivery}</td>
                <td className="px-6 py-4 font-medium text-primary">₹{po.total.toLocaleString()}</td>
                <td className="px-6 py-4">{getStatusBadge(po.status)}</td>
                <td className="px-6 py-4 text-right">
                  <Link to={`/materials/purchase-orders/${po.id}`}>
                    <Button variant="ghost" size="sm">Open <ArrowRight className="ml-2 h-3 w-3" /></Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE LIST */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {filteredPOs.map(po => (
          <div key={po.id} className="bg-surface border border-border rounded-xl p-5 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-primary">{po.poNumber}</h3>
                <p className="text-xs text-secondary mt-1">{getProjectName(po.projectId)}</p>
              </div>
              {getStatusBadge(po.status)}
            </div>
            <div className="grid grid-cols-2 gap-y-2 text-sm text-secondary">
              <div><span className="text-muted block text-xs">Vendor</span> <span>{getVendorName(po.vendorId)}</span></div>
              <div><span className="text-muted block text-xs">Total Value</span> <span className="text-primary font-medium">₹{po.total.toLocaleString()}</span></div>
              <div><span className="text-muted block text-xs">Order Date</span> <span>{po.date}</span></div>
              <div><span className="text-muted block text-xs">Expected</span> <span>{po.expectedDelivery}</span></div>
            </div>
            <Link to={`/materials/purchase-orders/${po.id}`} className="block">
              <Button variant="secondary" className="w-full text-xs mt-2">View Order <ArrowRight className="ml-2 h-3 w-3" /></Button>
            </Link>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Purchase Order" description="Draft a new material purchase order.">
        <form className="space-y-4 mt-4" onSubmit={e => { e.preventDefault(); setIsModalOpen(false); }}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Project</Label>
              <select className="flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-primary appearance-none focus:outline-none focus:ring-1 focus:ring-accent">
                <option>Sharma Residence</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Vendor</Label>
              <select className="flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-primary appearance-none focus:outline-none focus:ring-1 focus:ring-accent">
                <option>Classic Marbles</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Expected Delivery</Label>
            <Input type="date" className="text-secondary" />
          </div>
          <div className="pt-4 flex justify-end gap-3 border-t border-border mt-6">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit">Draft Order</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
