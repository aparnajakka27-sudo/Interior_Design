import { useState } from 'react';
import { Link } from '@/components/ui/Link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Plus, Search, Filter, ArrowRight, FileText } from 'lucide-react';
import { initialQuotations, detailedProjects, type QuotationStatus } from '@/lib/mock-data';

export function QuotationsList() {
  const [searchQuery, setSearchQuery] = useState('');

  const getProjectName = (id: string) => detailedProjects.find(p => p.id === id)?.name || id;

  const getStatusBadge = (status: QuotationStatus) => {
    switch(status) {
      case 'Draft': return <Badge variant="neutral">Draft</Badge>;
      case 'Sent': return <Badge variant="warning">Sent</Badge>;
      case 'Viewed': return <Badge variant="warning">Viewed</Badge>;
      case 'Approved': return <Badge variant="success">Approved</Badge>;
      case 'Rejected': return <Badge variant="danger">Rejected</Badge>;
      case 'Expired': return <Badge variant="danger">Expired</Badge>;
      default: return <Badge variant="neutral">{status}</Badge>;
    }
  };

  const filteredQuotes = initialQuotations.filter(q => 
    q.quoteNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.projectId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-[1200px] mx-auto space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-primary">Quotations & BOQ</h1>
          <p className="text-secondary mt-1 text-sm">Manage project estimates and bills of quantities.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> New Quotation
        </Button>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-surface border border-border rounded-xl p-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <Input 
            placeholder="Search quotations..." 
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
            <option>Approved</option>
            <option>Sent</option>
          </select>
          <Button variant="ghost" size="sm" className="whitespace-nowrap">
            <Filter className="mr-2 h-4 w-4" /> Clear Filters
          </Button>
        </div>
      </div>

      {/* DESKTOP TABLE */}
      <div className="bg-surface border border-border rounded-xl overflow-hidden hidden md:block">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-muted uppercase bg-elevated/50 border-b border-border">
            <tr>
              <th className="px-6 py-4 font-medium">Quote Number</th>
              <th className="px-6 py-4 font-medium">Project</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Valid Until</th>
              <th className="px-6 py-4 font-medium">Amount</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredQuotes.map((q) => (
              <tr key={q.id} className="hover:bg-elevated/50">
                <td className="px-6 py-4 font-medium text-primary"><FileText className="inline mr-2 h-4 w-4 text-muted"/>{q.quoteNumber}</td>
                <td className="px-6 py-4 text-secondary">{getProjectName(q.projectId)}</td>
                <td className="px-6 py-4 text-secondary">{q.date}</td>
                <td className="px-6 py-4 text-secondary">{q.validUntil}</td>
                <td className="px-6 py-4 font-medium text-primary">₹{q.amount.toLocaleString()}</td>
                <td className="px-6 py-4">{getStatusBadge(q.status)}</td>
                <td className="px-6 py-4 text-right">
                  <Link to={`/finance/quotations/${q.id}`}>
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
        {filteredQuotes.map(q => (
          <div key={q.id} className="bg-surface border border-border rounded-xl p-5 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-primary">{q.quoteNumber}</h3>
                <p className="text-xs text-secondary mt-1">{getProjectName(q.projectId)}</p>
              </div>
              {getStatusBadge(q.status)}
            </div>
            <div className="grid grid-cols-2 gap-y-2 text-sm text-secondary">
              <div><span className="text-muted block text-xs">Amount</span> <span className="text-primary font-medium">₹{q.amount.toLocaleString()}</span></div>
              <div><span className="text-muted block text-xs">Date</span> <span>{q.date}</span></div>
            </div>
            <Link to={`/finance/quotations/${q.id}`} className="block">
              <Button variant="secondary" className="w-full text-xs mt-2">View Quote <ArrowRight className="ml-2 h-3 w-3" /></Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
