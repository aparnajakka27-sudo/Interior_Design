import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Label } from '@/components/ui/Label';
import { Plus, Search, Filter, CreditCard } from 'lucide-react';
import { initialExpenses, detailedProjects, type ExpenseStatus } from '@/lib/mock-data';

export function ExpensesList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getProjectName = (id: string) => detailedProjects.find(p => p.id === id)?.name || id;

  const filteredExpenses = initialExpenses.filter(e => 
    e.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: ExpenseStatus) => {
    switch(status) {
      case 'Recorded': return <Badge variant="neutral">Recorded</Badge>;
      case 'Approved': return <Badge variant="success">Approved</Badge>;
      case 'Reimbursed': return <Badge variant="neutral">Reimbursed</Badge>;
      default: return <Badge variant="neutral">{status}</Badge>;
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-primary">Expenses</h1>
          <p className="text-secondary mt-1 text-sm">Track all project and company operational expenses.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Expense
        </Button>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-surface border border-border rounded-xl p-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <Input 
            placeholder="Search description or ID..." 
            className="pl-9 w-full"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex w-full md:w-auto items-center gap-3 overflow-x-auto custom-scrollbar pb-1 md:pb-0">
          <select className="h-9 rounded-md border border-border bg-background px-3 py-1 text-sm text-primary appearance-none focus:outline-none focus:ring-1 focus:ring-accent min-w-[120px]">
            <option>All Categories</option>
            <option>Materials</option>
            <option>Labour</option>
            <option>Transport</option>
            <option>Site Expense</option>
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
              <th className="px-6 py-4 font-medium">Expense ID</th>
              <th className="px-6 py-4 font-medium">Project</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Description</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Paid By</th>
              <th className="px-6 py-4 font-medium text-right">Amount</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredExpenses.map((exp) => (
              <tr key={exp.id} className="hover:bg-elevated/50 transition-colors">
                <td className="px-6 py-4 font-medium text-primary"><CreditCard className="inline mr-2 h-4 w-4 text-muted"/>{exp.id}</td>
                <td className="px-6 py-4 text-secondary">{getProjectName(exp.projectId)}</td>
                <td className="px-6 py-4 text-secondary">{exp.category}</td>
                <td className="px-6 py-4 text-primary font-medium">{exp.description}</td>
                <td className="px-6 py-4 text-secondary">{exp.date}</td>
                <td className="px-6 py-4 text-secondary">{exp.paidBy}</td>
                <td className="px-6 py-4 font-medium text-amber-400 text-right">₹{exp.amount.toLocaleString()}</td>
                <td className="px-6 py-4">
                  {getStatusBadge(exp.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 gap-4 md:hidden">
        {filteredExpenses.map(exp => (
          <div key={exp.id} className="bg-surface border border-border rounded-xl p-5 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-primary">{exp.description}</h3>
                <p className="text-xs text-secondary mt-1">{getProjectName(exp.projectId)}</p>
              </div>
              {getStatusBadge(exp.status)}
            </div>
            <div className="grid grid-cols-2 gap-y-2 text-sm text-secondary border-t border-border pt-4">
              <div><span className="text-muted block text-xs">Amount</span> <span className="text-amber-400 font-medium">₹{exp.amount.toLocaleString()}</span></div>
              <div><span className="text-muted block text-xs">Date</span> <span>{exp.date}</span></div>
              <div><span className="text-muted block text-xs">Category</span> <span>{exp.category}</span></div>
              <div><span className="text-muted block text-xs">Paid By</span> <span>{exp.paidBy}</span></div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Expense" description="Log a project or operational expense.">
        <form className="space-y-4 mt-4" onSubmit={e => { e.preventDefault(); setIsModalOpen(false); }}>
          <div className="space-y-2">
            <Label>Project</Label>
            <select className="flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-primary appearance-none focus:outline-none focus:ring-1 focus:ring-accent">
              <option>Sharma Residence</option>
              <option>Mehta Villa</option>
              <option>Company Overhead</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label>Category</Label>
            <select className="flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-primary appearance-none focus:outline-none focus:ring-1 focus:ring-accent">
              <option>Materials</option>
              <option>Labour</option>
              <option>Transport</option>
              <option>Site Expense</option>
              <option>Office Expense</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Input placeholder="e.g. Weekly wages for civil team" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Amount</Label>
              <Input type="number" placeholder="Enter amount" />
            </div>
            <div className="space-y-2">
              <Label>Date</Label>
              <Input type="date" className="text-secondary" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Paid By</Label>
            <Input placeholder="e.g. Accounts, Vikram Singh" />
          </div>
          <div className="pt-4 flex justify-end gap-3 border-t border-border mt-6">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit">Save Expense</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
