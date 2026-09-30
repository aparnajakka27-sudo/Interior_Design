import { useState } from 'react';
import { Link } from '@/components/ui/Link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Plus, Search, Filter, ArrowRight, Receipt } from 'lucide-react';
import { initialInvoices, detailedProjects, type InvoiceStatus } from '@/lib/mock-data';

export function InvoicesList() {
  const [searchQuery, setSearchQuery] = useState('');

  const getProjectName = (id: string) => detailedProjects.find(p => p.id === id)?.name || id;

  const getStatusBadge = (status: InvoiceStatus) => {
    switch(status) {
      case 'Draft': return <Badge variant="neutral">Draft</Badge>;
      case 'Sent': return <Badge variant="warning">Sent</Badge>;
      case 'Partially Paid': return <Badge variant="warning">Partially Paid</Badge>;
      case 'Paid': return <Badge variant="success">Paid</Badge>;
      case 'Overdue': return <Badge variant="danger">Overdue</Badge>;
      case 'Cancelled': return <Badge variant="danger">Cancelled</Badge>;
      default: return <Badge variant="neutral">{status}</Badge>;
    }
  };

  const filteredInvoices = initialInvoices.filter(inv => 
    inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inv.projectId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-primary">Invoices</h1>
          <p className="text-secondary mt-1 text-sm">Manage client billing and track outstanding payments.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create Invoice
        </Button>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-surface border border-border rounded-xl p-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <Input 
            placeholder="Search invoices..." 
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
            <option>Paid</option>
            <option>Partially Paid</option>
            <option>Overdue</option>
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
              <th className="px-6 py-4 font-medium">Invoice Number</th>
              <th className="px-6 py-4 font-medium">Project</th>
              <th className="px-6 py-4 font-medium">Issue Date</th>
              <th className="px-6 py-4 font-medium">Due Date</th>
              <th className="px-6 py-4 font-medium text-right">Total</th>
              <th className="px-6 py-4 font-medium text-right">Paid</th>
              <th className="px-6 py-4 font-medium text-right">Outstanding</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredInvoices.map((inv) => (
              <tr key={inv.id} className="hover:bg-elevated/50 transition-colors">
                <td className="px-6 py-4 font-medium text-primary"><Receipt className="inline mr-2 h-4 w-4 text-muted"/>{inv.invoiceNumber}</td>
                <td className="px-6 py-4 text-secondary">{getProjectName(inv.projectId)}</td>
                <td className="px-6 py-4 text-secondary">{inv.issueDate}</td>
                <td className="px-6 py-4 text-secondary">{inv.dueDate}</td>
                <td className="px-6 py-4 font-medium text-primary text-right">₹{inv.total.toLocaleString()}</td>
                <td className="px-6 py-4 text-emerald-400 font-medium text-right">₹{inv.paid.toLocaleString()}</td>
                <td className="px-6 py-4 text-amber-400 font-medium text-right">₹{inv.outstanding.toLocaleString()}</td>
                <td className="px-6 py-4">{getStatusBadge(inv.status)}</td>
                <td className="px-6 py-4 text-right">
                  <Link to={`/finance/invoices/${inv.id}`}>
                    <Button variant="ghost" size="sm">Open <ArrowRight className="ml-2 h-3 w-3" /></Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 gap-4 md:hidden">
        {filteredInvoices.map(inv => (
          <div key={inv.id} className="bg-surface border border-border rounded-xl p-5 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-primary">{inv.invoiceNumber}</h3>
                <p className="text-xs text-secondary mt-1">{getProjectName(inv.projectId)}</p>
              </div>
              {getStatusBadge(inv.status)}
            </div>
            <div className="grid grid-cols-2 gap-y-2 text-sm text-secondary border-t border-border pt-4">
              <div><span className="text-muted block text-xs">Total</span> <span className="text-primary font-medium">₹{inv.total.toLocaleString()}</span></div>
              <div><span className="text-muted block text-xs">Outstanding</span> <span className="text-amber-400 font-medium">₹{inv.outstanding.toLocaleString()}</span></div>
              <div><span className="text-muted block text-xs">Due Date</span> <span>{inv.dueDate}</span></div>
            </div>
            <Link to={`/finance/invoices/${inv.id}`} className="block">
              <Button variant="secondary" className="w-full text-xs mt-2">View Invoice <ArrowRight className="ml-2 h-3 w-3" /></Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
