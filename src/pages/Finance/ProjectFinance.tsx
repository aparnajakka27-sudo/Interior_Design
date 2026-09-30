import { useParams } from 'react-router-dom';
import { Link } from '@/components/ui/Link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ArrowLeft, Receipt, CreditCard } from 'lucide-react';
import { detailedProjects, initialQuotations, initialInvoices, initialExpenses, initialPayments } from '@/lib/mock-data';

export function ProjectFinance() {
  const { projectId } = useParams();
  const project = detailedProjects.find(p => p.id === projectId) || detailedProjects[0];

  const quotes = initialQuotations.filter(q => q.projectId === project.id);
  const invoices = initialInvoices.filter(i => i.projectId === project.id);
  const payments = initialPayments.filter(p => p.projectId === project.id);
  const expenses = initialExpenses.filter(e => e.projectId === project.id);

  const contractValue = quotes.filter(q => q.status === 'Approved').reduce((acc, q) => acc + q.amount, 0);
  const invoiced = invoices.reduce((acc, i) => acc + i.total, 0);
  const received = payments.filter(p => p.status === 'Completed').reduce((acc, p) => acc + p.amount, 0);
  const outstanding = invoiced - received;
  const totalExpenses = expenses.reduce((acc, e) => acc + e.amount, 0);
  const estimatedProfit = contractValue - totalExpenses;
  const margin = contractValue > 0 ? Math.round((estimatedProfit / contractValue) * 100) : 0;

  if (!project) return <div>Project not found.</div>;

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 pb-12">
      <div className="flex justify-between items-center">
        <Link to={`/projects/${project.id}`} className="inline-flex items-center text-sm font-medium text-secondary hover:text-primary transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Project Details
        </Link>
        <Link to="/finance">
          <Button variant="ghost" size="sm">Global Finance Dashboard</Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-surface border border-border p-6 rounded-xl">
        <div>
          <h1 className="text-2xl font-semibold text-primary">Project Financials</h1>
          <p className="text-secondary mt-1 text-sm">{project.name} · {project.location}</p>
        </div>
        <div className="flex gap-3">
          <Link to="/finance/invoices"><Button variant="secondary" size="sm">Create Invoice</Button></Link>
          <Link to="/finance/expenses"><Button size="sm">Add Expense</Button></Link>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <Card className="col-span-2 lg:col-span-1 p-4 flex flex-col justify-center">
          <span className="text-xs font-medium text-secondary mb-1">Contract Value</span>
          <span className="text-xl font-bold text-primary">₹{(contractValue/100000).toFixed(1)}L</span>
        </Card>
        <Card className="col-span-2 lg:col-span-1 p-4 flex flex-col justify-center border-accent/20">
          <span className="text-xs font-medium text-secondary mb-1">Invoiced</span>
          <span className="text-xl font-bold text-primary">₹{(invoiced/100000).toFixed(1)}L</span>
        </Card>
        <Card className="col-span-2 lg:col-span-1 p-4 flex flex-col justify-center border-accent/20">
          <span className="text-xs font-medium text-secondary mb-1">Received</span>
          <span className="text-xl font-bold text-emerald-400">₹{(received/100000).toFixed(1)}L</span>
        </Card>
        <Card className="col-span-2 lg:col-span-1 p-4 flex flex-col justify-center border-accent/20">
          <span className="text-xs font-medium text-secondary mb-1">Outstanding</span>
          <span className="text-xl font-bold text-amber-400">₹{(outstanding/100000).toFixed(1)}L</span>
        </Card>
        <Card className="col-span-2 lg:col-span-1 p-4 flex flex-col justify-center border-red-500/20">
          <span className="text-xs font-medium text-secondary mb-1">Total Expenses</span>
          <span className="text-xl font-bold text-red-400">₹{(totalExpenses/100000).toFixed(1)}L</span>
        </Card>
        <Card className="col-span-2 lg:col-span-1 p-4 flex flex-col justify-center bg-accent/5 border-accent/20">
          <span className="text-xs font-medium text-secondary mb-1">Estimated Profit</span>
          <span className="text-xl font-bold text-accent">₹{(estimatedProfit/100000).toFixed(1)}L</span>
        </Card>
        <Card className="col-span-2 lg:col-span-1 p-4 flex flex-col justify-center bg-accent/5 border-accent/20">
          <span className="text-xs font-medium text-secondary mb-1">Margin</span>
          <span className="text-xl font-bold text-accent">{margin}%</span>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="border-b border-border pb-4">
            <CardTitle className="text-lg flex items-center gap-2"><Receipt className="h-4 w-4 text-muted" /> Invoices & Receivables</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 p-0">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted uppercase bg-elevated/50 border-b border-border">
                <tr>
                  <th className="px-6 py-3 font-medium">Invoice</th>
                  <th className="px-6 py-3 font-medium text-right">Total</th>
                  <th className="px-6 py-3 font-medium text-right">Outstanding</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-elevated/50">
                    <td className="px-6 py-4 font-medium text-primary">
                      <Link to={`/finance/invoices/${inv.id}`} className="hover:text-accent">{inv.invoiceNumber}</Link>
                      <span className="block text-xs text-secondary mt-1">{inv.issueDate}</span>
                    </td>
                    <td className="px-6 py-4 text-primary text-right font-medium">₹{inv.total.toLocaleString()}</td>
                    <td className="px-6 py-4 text-amber-400 text-right font-medium">₹{inv.outstanding.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <Badge variant={inv.status === 'Paid' ? 'success' : inv.status === 'Partially Paid' ? 'warning' : 'neutral'}>{inv.status}</Badge>
                    </td>
                  </tr>
                ))}
                {invoices.length === 0 && <tr><td colSpan={4} className="p-6 text-center text-muted">No invoices generated yet.</td></tr>}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b border-border pb-4">
            <CardTitle className="text-lg flex items-center gap-2"><CreditCard className="h-4 w-4 text-muted" /> Project Expenses</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 p-0">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted uppercase bg-elevated/50 border-b border-border">
                <tr>
                  <th className="px-6 py-3 font-medium">Expense</th>
                  <th className="px-6 py-3 font-medium">Category</th>
                  <th className="px-6 py-3 font-medium text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {expenses.map((exp) => (
                  <tr key={exp.id} className="hover:bg-elevated/50">
                    <td className="px-6 py-4 font-medium text-primary">
                      {exp.description}
                      <span className="block text-xs text-secondary mt-1">{exp.date}</span>
                    </td>
                    <td className="px-6 py-4 text-secondary">{exp.category}</td>
                    <td className="px-6 py-4 text-amber-400 text-right font-medium">₹{exp.amount.toLocaleString()}</td>
                  </tr>
                ))}
                {expenses.length === 0 && <tr><td colSpan={3} className="p-6 text-center text-muted">No expenses recorded yet.</td></tr>}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
