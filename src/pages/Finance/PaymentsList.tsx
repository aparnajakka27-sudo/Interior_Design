import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Label } from '@/components/ui/Label';
import { Plus, Search, Filter, IndianRupee } from 'lucide-react';
import { initialPayments, detailedProjects, initialInvoices } from '@/lib/mock-data';

export function PaymentsList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getProjectName = (id: string) => detailedProjects.find(p => p.id === id)?.name || id;
  const getInvoiceNumber = (id: string) => initialInvoices.find(i => i.id === id)?.invoiceNumber || id;

  const filteredPayments = initialPayments.filter(p => 
    p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.reference.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-primary">Client Payments</h1>
          <p className="text-secondary mt-1 text-sm">Track all incoming payments from clients.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Record Payment
        </Button>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-surface border border-border rounded-xl p-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <Input 
            placeholder="Search reference or ID..." 
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
            <option>All Methods</option>
            <option>Bank Transfer</option>
            <option>UPI</option>
            <option>Cheque</option>
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
              <th className="px-6 py-4 font-medium">Payment ID</th>
              <th className="px-6 py-4 font-medium">Project</th>
              <th className="px-6 py-4 font-medium">Invoice</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Method</th>
              <th className="px-6 py-4 font-medium">Reference</th>
              <th className="px-6 py-4 font-medium text-right">Amount</th>
              <th className="px-6 py-4 font-medium text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredPayments.map((p) => (
              <tr key={p.id} className="hover:bg-elevated/50 transition-colors">
                <td className="px-6 py-4 font-medium text-primary"><IndianRupee className="inline mr-2 h-4 w-4 text-emerald-400"/>{p.id}</td>
                <td className="px-6 py-4 text-secondary">{getProjectName(p.projectId)}</td>
                <td className="px-6 py-4 text-secondary">{getInvoiceNumber(p.invoiceId)}</td>
                <td className="px-6 py-4 text-secondary">{p.date}</td>
                <td className="px-6 py-4 text-secondary">{p.method}</td>
                <td className="px-6 py-4 text-secondary font-mono text-xs">{p.reference}</td>
                <td className="px-6 py-4 font-medium text-emerald-400 text-right">₹{p.amount.toLocaleString()}</td>
                <td className="px-6 py-4 text-right">
                  <Badge variant={p.status === 'Completed' ? 'success' : 'warning'}>{p.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 gap-4 md:hidden">
        {filteredPayments.map(p => (
          <div key={p.id} className="bg-surface border border-border rounded-xl p-5 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-primary">{p.id}</h3>
                <p className="text-xs text-secondary mt-1">{getProjectName(p.projectId)}</p>
              </div>
              <Badge variant={p.status === 'Completed' ? 'success' : 'warning'}>{p.status}</Badge>
            </div>
            <div className="grid grid-cols-2 gap-y-2 text-sm text-secondary">
              <div><span className="text-muted block text-xs">Amount</span> <span className="text-emerald-400 font-medium">₹{p.amount.toLocaleString()}</span></div>
              <div><span className="text-muted block text-xs">Date</span> <span>{p.date}</span></div>
              <div className="col-span-2"><span className="text-muted block text-xs">Reference</span> <span className="font-mono text-xs">{p.reference}</span></div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Record Payment" description="Log a payment received from a client.">
        <form className="space-y-4 mt-4" onSubmit={e => { e.preventDefault(); setIsModalOpen(false); }}>
          <div className="space-y-2">
            <Label>Invoice</Label>
            <select className="flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-primary appearance-none focus:outline-none focus:ring-1 focus:ring-accent">
              <option>Select Invoice...</option>
              {initialInvoices.filter(i => i.outstanding > 0).map(i => (
                <option key={i.id} value={i.id}>{i.invoiceNumber} (Outstanding: ₹{i.outstanding.toLocaleString()})</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label>Amount Received</Label>
            <Input type="number" placeholder="Enter amount" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Payment Date</Label>
              <Input type="date" className="text-secondary" />
            </div>
            <div className="space-y-2">
              <Label>Payment Method</Label>
              <select className="flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-primary appearance-none focus:outline-none focus:ring-1 focus:ring-accent">
                <option>Bank Transfer</option>
                <option>UPI</option>
                <option>Cheque</option>
                <option>Cash</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Transaction Reference</Label>
            <Input placeholder="e.g. UTIB00012345678" />
          </div>
          <div className="pt-4 flex justify-end gap-3 border-t border-border mt-6">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit">Save Payment</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
