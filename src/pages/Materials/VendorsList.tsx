import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Label } from '@/components/ui/Label';
import { Plus, Search, Filter, Phone, Mail } from 'lucide-react';
import { initialVendors } from '@/lib/mock-data';

export function VendorsList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredVendors = initialVendors.filter(vendor => 
    vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vendor.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-[1200px] mx-auto space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-primary">Vendors</h1>
          <p className="text-secondary mt-1 text-sm">Manage suppliers and procurement partners.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Vendor
        </Button>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-surface border border-border rounded-xl p-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <Input 
            placeholder="Search vendors..." 
            className="pl-9 w-full"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex w-full md:w-auto items-center gap-3 overflow-x-auto custom-scrollbar pb-1 md:pb-0">
          <select className="h-9 rounded-md border border-border bg-background px-3 py-1 text-sm text-primary appearance-none focus:outline-none focus:ring-1 focus:ring-accent min-w-[120px]">
            <option>All Categories</option>
            <option>Marble & Stone</option>
            <option>Wood</option>
            <option>Lighting</option>
          </select>
          <Button variant="ghost" size="sm" className="whitespace-nowrap">
            <Filter className="mr-2 h-4 w-4" /> Clear Filters
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredVendors.map(vendor => (
          <div key={vendor.id} className="bg-surface border border-border rounded-xl p-5 hover:bg-elevated transition-colors flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1 space-y-1">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-primary text-lg">{vendor.name}</h3>
                  <Badge variant="neutral" className="bg-background">{vendor.category}</Badge>
                </div>
                <Badge variant={vendor.status === 'Active' ? 'success' : 'neutral'}>{vendor.status}</Badge>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-secondary pt-2">
                <span className="flex items-center"><Phone className="mr-1.5 h-3 w-3 text-muted"/> {vendor.phone}</span>
                <span className="flex items-center"><Mail className="mr-1.5 h-3 w-3 text-muted"/> {vendor.email}</span>
                <span className="text-muted">Contact: <span className="text-primary">{vendor.contact}</span></span>
              </div>
            </div>
            
            <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-4 md:gap-2 shrink-0 md:w-32 border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6 text-sm">
              <div className="text-center md:text-right">
                <span className="text-primary font-medium block">4</span>
                <span className="text-xs text-muted">Active Orders</span>
              </div>
              <div className="text-center md:text-right">
                <span className="text-amber-400 font-medium block">1</span>
                <span className="text-xs text-muted">Pending Del.</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Vendor" description="Register a new procurement partner.">
        <form className="space-y-4 mt-4" onSubmit={e => { e.preventDefault(); setIsModalOpen(false); }}>
          <div className="space-y-2">
            <Label>Vendor Name</Label>
            <Input placeholder="e.g. Classic Marbles" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Input placeholder="e.g. Marble & Stone" />
            </div>
            <div className="space-y-2">
              <Label>Contact Person</Label>
              <Input placeholder="e.g. Rohit Sharma" />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input placeholder="+91..." />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" placeholder="sales@..." />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Address</Label>
            <Input placeholder="Full address..." />
          </div>
          <div className="pt-4 flex justify-end gap-3 border-t border-border mt-6">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit">Add Vendor</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
