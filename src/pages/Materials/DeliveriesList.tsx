import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Label } from '@/components/ui/Label';
import { Search, Filter, Truck, PackageCheck, AlertCircle } from 'lucide-react';
import { initialDeliveries, detailedProjects, initialVendors } from '@/lib/mock-data';

export function DeliveriesList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeDelivery, setActiveDelivery] = useState(initialDeliveries[0]);

  const filteredDeliveries = initialDeliveries.filter(del => 
    del.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    del.purchaseOrderId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'In Transit': return <Badge variant="warning"><Truck className="mr-1 h-3 w-3" /> In Transit</Badge>;
      case 'Received': return <Badge variant="success"><PackageCheck className="mr-1 h-3 w-3" /> Received</Badge>;
      case 'Delayed': return <Badge variant="danger"><AlertCircle className="mr-1 h-3 w-3" /> Delayed</Badge>;
      default: return <Badge variant="neutral">{status}</Badge>;
    }
  };

  const getProjectName = (id: string) => detailedProjects.find(p => p.id === id)?.name || id;
  const getVendorName = (id: string) => initialVendors.find(v => v.id === id)?.name || id;

  const handleOpenReceive = (del: any) => {
    setActiveDelivery(del);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-primary">Material Deliveries</h1>
          <p className="text-secondary mt-1 text-sm">Track what has been dispatched, received and delayed across project sites.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-surface border border-border rounded-xl p-4 text-center">
          <p className="text-xl font-semibold text-primary mb-1">4</p>
          <p className="text-xs font-medium text-secondary">Expected Today</p>
        </div>
        <div className="bg-surface border border-border rounded-xl p-4 text-center">
          <p className="text-xl font-semibold text-amber-400 mb-1">11</p>
          <p className="text-xs font-medium text-secondary">In Transit</p>
        </div>
        <div className="bg-surface border border-border rounded-xl p-4 text-center">
          <p className="text-xl font-semibold text-emerald-400 mb-1">6</p>
          <p className="text-xs font-medium text-secondary">Received Today</p>
        </div>
        <div className="bg-surface border border-border rounded-xl p-4 text-center">
          <p className="text-xl font-semibold text-red-400 mb-1">4</p>
          <p className="text-xs font-medium text-secondary">Delayed</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-surface border border-border rounded-xl p-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <Input 
            placeholder="Search deliveries or POs..." 
            className="pl-9 w-full"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex w-full md:w-auto items-center gap-3 overflow-x-auto custom-scrollbar pb-1 md:pb-0">
          <select className="h-9 rounded-md border border-border bg-background px-3 py-1 text-sm text-primary appearance-none focus:outline-none focus:ring-1 focus:ring-accent min-w-[120px]">
            <option>All Sites</option>
            <option>Sharma Residence</option>
          </select>
          <select className="h-9 rounded-md border border-border bg-background px-3 py-1 text-sm text-primary appearance-none focus:outline-none focus:ring-1 focus:ring-accent min-w-[120px]">
            <option>All Statuses</option>
            <option>In Transit</option>
            <option>Received</option>
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
              <th className="px-6 py-4 font-medium">Delivery ID</th>
              <th className="px-6 py-4 font-medium">PO Number</th>
              <th className="px-6 py-4 font-medium">Project Site</th>
              <th className="px-6 py-4 font-medium">Vendor</th>
              <th className="px-6 py-4 font-medium">Expected Date</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredDeliveries.map((del) => (
              <tr key={del.id} className="hover:bg-elevated/50 transition-colors">
                <td className="px-6 py-4 font-medium text-primary"><Truck className="inline mr-2 h-4 w-4 text-muted"/>{del.id}</td>
                <td className="px-6 py-4 text-secondary">{del.purchaseOrderId}</td>
                <td className="px-6 py-4 text-secondary">{getProjectName(del.projectId)}</td>
                <td className="px-6 py-4 text-secondary">{getVendorName(del.vendorId)}</td>
                <td className="px-6 py-4 text-secondary">{del.expectedDate}</td>
                <td className="px-6 py-4">{getStatusBadge(del.status)}</td>
                <td className="px-6 py-4 text-right">
                  {del.status !== 'Received' ? (
                    <Button size="sm" onClick={() => handleOpenReceive(del)}>Receive</Button>
                  ) : (
                    <Button variant="ghost" size="sm">Details</Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Receive Materials" description="Log quantities received and note any damages.">
        <form className="space-y-6 mt-4" onSubmit={e => { e.preventDefault(); setIsModalOpen(false); }}>
          <div className="bg-elevated border border-border p-4 rounded-lg flex justify-between items-center text-sm">
            <div>
              <span className="text-muted block mb-1">Delivery</span>
              <span className="text-primary font-medium">{activeDelivery?.id}</span>
            </div>
            <div>
              <span className="text-muted block mb-1">Purchase Order</span>
              <span className="text-primary font-medium">{activeDelivery?.purchaseOrderId}</span>
            </div>
            <div className="text-right">
              <span className="text-muted block mb-1">Project Site</span>
              <span className="text-primary font-medium">{activeDelivery?.site}</span>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-primary">Items</h4>
            {activeDelivery?.items.map(item => (
              <div key={item.materialId} className="border border-border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-primary">{item.name}</span>
                  <span className="text-xs text-muted">Ordered: {item.orderedQty}</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs">Received</Label>
                    <Input type="number" defaultValue={item.receivedQty} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Damaged</Label>
                    <Input type="number" defaultValue={item.damagedQty} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Accepted</Label>
                    <Input type="number" defaultValue={item.acceptedQty} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Received By</Label>
              <Input placeholder="e.g. Vikram Singh" />
            </div>
            <div className="space-y-2">
              <Label>Date</Label>
              <Input type="date" className="text-secondary" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Notes</Label>
            <textarea className="flex min-h-[60px] w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-primary placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-accent" placeholder="Any issues with delivery..."></textarea>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-border mt-6">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit">Confirm Receipt</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
