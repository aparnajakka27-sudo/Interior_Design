import { useState } from 'react';
import { Link } from '@/components/ui/Link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Label } from '@/components/ui/Label';
import { Plus, Search, Filter, ShoppingCart, Truck, AlertCircle, CheckCircle2, Package, ArrowRight } from 'lucide-react';
import { initialMaterials, detailedProjects, initialVendors } from '@/lib/mock-data';

const SUMMARY_METRICS = [
  { label: 'Active Materials', value: '126' },
  { label: 'Pending Orders', value: '18' },
  { label: 'In Transit', value: '11' },
  { label: 'Delayed Deliveries', value: '4' },
  { label: 'Received This Month', value: '37' },
  { label: 'Procurement Value', value: '₹24.8L' },
];

export function MaterialsList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredMaterials = initialMaterials.filter(material => 
    material.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    material.vendorId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Required': return <Badge variant="neutral">{status}</Badge>;
      case 'Quotation Pending': return <Badge variant="warning">{status}</Badge>;
      case 'Approved': return <Badge variant="success" className="bg-emerald-900/30 text-emerald-400">Approved</Badge>;
      case 'Ordered': return <Badge variant="neutral"><ShoppingCart className="mr-1 h-3 w-3" /> Ordered</Badge>;
      case 'Partially Received': return <Badge variant="warning"><Package className="mr-1 h-3 w-3" /> Partial</Badge>;
      case 'Received': return <Badge variant="success"><CheckCircle2 className="mr-1 h-3 w-3" /> Received</Badge>;
      case 'Delayed': return <Badge variant="danger"><AlertCircle className="mr-1 h-3 w-3" /> Delayed</Badge>;
      case 'Cancelled': return <Badge variant="danger">Cancelled</Badge>;
      default: return <Badge variant="neutral">{status}</Badge>;
    }
  };

  const getProjectName = (id: string) => detailedProjects.find(p => p.id === id)?.name || id;
  const getVendorName = (id: string) => initialVendors.find(v => v.id === id)?.name || id;

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 pb-12">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-primary">Materials & Procurement</h1>
          <p className="text-secondary mt-1 text-sm">Manage material requirements, suppliers, purchase orders and deliveries.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/materials/purchase-orders">
            <Button variant="secondary" className="hidden sm:flex"><ShoppingCart className="mr-2 h-4 w-4" /> Purchase Orders</Button>
          </Link>
          <Link to="/materials/deliveries">
            <Button variant="secondary" className="hidden sm:flex"><Truck className="mr-2 h-4 w-4" /> Deliveries</Button>
          </Link>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Material
          </Button>
        </div>
      </div>

      {/* SUMMARY METRICS */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        {SUMMARY_METRICS.map((metric, i) => (
          <div key={i} className="bg-surface border border-border rounded-xl p-5">
            <p className="text-xs font-medium text-secondary">{metric.label}</p>
            <p className="text-xl font-semibold text-primary mt-2">{metric.value}</p>
          </div>
        ))}
      </div>

      {/* LIST CONTROLS */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-surface border border-border rounded-xl p-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <Input 
            placeholder="Search materials..." 
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
            <option>Required</option>
            <option>Ordered</option>
            <option>Received</option>
          </select>
          <Button variant="ghost" size="sm" className="whitespace-nowrap">
            <Filter className="mr-2 h-4 w-4" /> Clear Filters
          </Button>
        </div>
      </div>

      {/* MATERIALS TABLE (Desktop) */}
      <div className="bg-surface border border-border rounded-xl overflow-hidden hidden lg:block">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-muted uppercase bg-elevated/50 border-b border-border">
            <tr>
              <th className="px-6 py-4 font-medium">Material</th>
              <th className="px-6 py-4 font-medium">Project</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Quantity</th>
              <th className="px-6 py-4 font-medium">Vendor</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Expected Delivery</th>
              <th className="px-6 py-4 font-medium text-right">Cost</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredMaterials.map((material) => (
              <tr key={material.id} className="hover:bg-elevated/50 transition-colors">
                <td className="px-6 py-4">
                  <p className="font-medium text-primary">{material.name}</p>
                  <p className="text-xs text-secondary mt-0.5">{material.id}</p>
                </td>
                <td className="px-6 py-4 text-secondary">{getProjectName(material.projectId)}</td>
                <td className="px-6 py-4 text-secondary">{material.category}</td>
                <td className="px-6 py-4 text-primary font-medium">{material.requiredQty} <span className="text-muted font-normal">{material.unit}</span></td>
                <td className="px-6 py-4 text-secondary">{getVendorName(material.vendorId)}</td>
                <td className="px-6 py-4">{getStatusBadge(material.status)}</td>
                <td className="px-6 py-4 text-secondary">{material.expectedDelivery || '-'}</td>
                <td className="px-6 py-4 text-primary font-medium text-right">₹{(material.requiredQty * material.unitCost).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
        {filteredMaterials.map(material => (
          <div key={material.id} className="bg-surface border border-border rounded-xl p-5 space-y-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-primary">{material.name}</h3>
                <p className="text-xs text-secondary mt-0.5">{getProjectName(material.projectId)}</p>
              </div>
              {getStatusBadge(material.status)}
            </div>
            <div className="grid grid-cols-2 gap-y-2 text-sm text-secondary">
              <div><span className="text-muted block text-xs">Quantity</span> <span className="text-primary">{material.requiredQty} {material.unit}</span></div>
              <div><span className="text-muted block text-xs">Cost</span> <span className="text-primary">₹{(material.requiredQty * material.unitCost).toLocaleString()}</span></div>
              <div><span className="text-muted block text-xs">Vendor</span> <span>{getVendorName(material.vendorId)}</span></div>
              <div><span className="text-muted block text-xs">Delivery</span> <span>{material.expectedDelivery || '-'}</span></div>
            </div>
            <Button variant="secondary" className="w-full text-xs mt-2">View Material <ArrowRight className="ml-2 h-3 w-3" /></Button>
          </div>
        ))}
      </div>

      {/* ADD MATERIAL MODAL */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Material Requirement" description="Log a new material required for a project.">
        <form className="space-y-4 mt-4" onSubmit={e => { e.preventDefault(); setIsModalOpen(false); }}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 col-span-2 sm:col-span-1">
              <Label>Project</Label>
              <select className="flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-primary appearance-none focus:outline-none focus:ring-1 focus:ring-accent">
                <option>Sharma Residence</option>
              </select>
            </div>
            <div className="space-y-2 col-span-2 sm:col-span-1">
              <Label>Category</Label>
              <select className="flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-primary appearance-none focus:outline-none focus:ring-1 focus:ring-accent">
                <option>Marble</option>
                <option>Wood</option>
                <option>Lighting</option>
              </select>
            </div>
            <div className="space-y-2 col-span-2">
              <Label>Material Name</Label>
              <Input placeholder="e.g. Italian Marble" />
            </div>
            <div className="space-y-2 col-span-2">
              <Label>Specification</Label>
              <Input placeholder="e.g. Statuario, 18mm" />
            </div>
            <div className="space-y-2">
              <Label>Quantity</Label>
              <Input type="number" />
            </div>
            <div className="space-y-2">
              <Label>Unit</Label>
              <Input placeholder="e.g. sq ft" />
            </div>
          </div>
          <div className="pt-4 flex justify-end gap-3 border-t border-border mt-6">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit">Add Requirement</Button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
