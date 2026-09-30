import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Plus, Wallet, FileText, Receipt, IndianRupee, CreditCard, Building2, CheckCircle2 } from 'lucide-react';
import { initialInvoices, detailedProjects, initialFinanceActivity } from '@/lib/mock-data';

export function FinanceDashboard() {
  const getProjectName = (id: string) => detailedProjects.find(p => p.id === id)?.name || id;

  const KPIs = [
    { title: 'Total Project Value', value: '₹1.42 Cr', icon: Building2 },
    { title: 'Invoiced', value: '₹86.4L', icon: FileText },
    { title: 'Received', value: '₹62.8L', icon: IndianRupee },
    { title: 'Outstanding', value: '₹23.6L', icon: Receipt },
    { title: 'Project Expenses', value: '₹48.2L', icon: CreditCard },
    { title: 'Estimated Profit', value: '₹38.2L', icon: Wallet },
  ];

  const recentTransactions = initialFinanceActivity.slice(0, 5);
  const outstandingInvoices = initialInvoices.filter(inv => inv.outstanding > 0);

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-primary">Finance & Accounts</h1>
          <p className="text-secondary mt-1 text-sm">Monitor revenue, receivables, expenses and project profitability.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/finance/quotations" className="hidden sm:block"><Button variant="secondary">New Quotation</Button></Link>
          <Link to="/finance/payments" className="hidden sm:block"><Button variant="secondary">Record Payment</Button></Link>
          <Link to="/finance/invoices"><Button><Plus className="mr-2 h-4 w-4" /> Create Invoice</Button></Link>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        {KPIs.map((kpi, i) => (
          <div key={i} className="bg-surface border border-border rounded-xl p-5">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-medium text-secondary">{kpi.title}</span>
              <kpi.icon className="h-4 w-4 text-muted" />
            </div>
            <p className="text-xl font-semibold text-primary">{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-primary mb-6">Revenue Overview</h2>
              <div className="h-48 w-full flex items-end justify-between px-2 gap-2">
                {[40, 55, 35, 65, 80, 60].map((h, i) => (
                  <div key={i} className="w-full bg-surface border border-border rounded-t-sm relative group" style={{ height: '100%' }}>
                    <div className="absolute bottom-0 w-full bg-accent/20 rounded-t-sm" style={{ height: `${h}%` }}></div>
                    <div className="absolute bottom-0 w-full bg-accent rounded-t-sm" style={{ height: `${h * 0.7}%` }}></div>
                    <div className="absolute -bottom-6 w-full text-center text-xs text-secondary">
                      {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i]}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-6 mt-10 text-xs">
                <div className="flex items-center gap-2"><span className="w-3 h-3 bg-accent/20 rounded-sm"></span> <span className="text-secondary">Invoiced</span></div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 bg-accent rounded-sm"></span> <span className="text-secondary">Received</span></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-primary">Outstanding Payments</h2>
                <Link to="/finance/invoices"><Button variant="ghost" size="sm">View All</Button></Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-muted uppercase border-b border-border">
                    <tr>
                      <th className="py-3 pr-4 font-medium">Invoice</th>
                      <th className="py-3 px-4 font-medium">Project</th>
                      <th className="py-3 px-4 font-medium">Due Date</th>
                      <th className="py-3 px-4 font-medium text-right">Amount</th>
                      <th className="py-3 pl-4 font-medium text-right">Outstanding</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {outstandingInvoices.map((inv) => (
                      <tr key={inv.id} className="hover:bg-elevated/50">
                        <td className="py-3 pr-4">
                          <Link to={`/finance/invoices/${inv.id}`} className="font-medium text-primary hover:text-accent transition-colors">{inv.invoiceNumber}</Link>
                        </td>
                        <td className="py-3 px-4 text-secondary">{getProjectName(inv.projectId)}</td>
                        <td className="py-3 px-4 text-amber-400">{inv.dueDate}</td>
                        <td className="py-3 px-4 text-right text-secondary">₹{inv.total.toLocaleString()}</td>
                        <td className="py-3 pl-4 text-right font-medium text-primary">₹{inv.outstanding.toLocaleString()}</td>
                      </tr>
                    ))}
                    {outstandingInvoices.length === 0 && (
                      <tr><td colSpan={5} className="py-6 text-center text-muted">No outstanding payments.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-primary mb-6">Project Profitability</h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Link to="/finance/projects/PRJ-001" className="font-medium text-primary hover:text-accent">Sharma Residence</Link>
                    <Badge variant="success">34%</Badge>
                  </div>
                  <div className="flex justify-between text-xs text-secondary">
                    <span>Revenue: ₹18.5L</span>
                    <span>Profit: ₹6.3L</span>
                  </div>
                  <div className="h-1.5 w-full bg-background rounded-full overflow-hidden border border-border">
                    <div className="h-full bg-accent w-[34%]"></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Link to="/finance/projects/PRJ-002" className="font-medium text-primary hover:text-accent">Mehta Villa</Link>
                    <Badge variant="warning">22%</Badge>
                  </div>
                  <div className="flex justify-between text-xs text-secondary">
                    <span>Revenue: ₹42.0L</span>
                    <span>Profit: ₹9.2L</span>
                  </div>
                  <div className="h-1.5 w-full bg-background rounded-full overflow-hidden border border-border">
                    <div className="h-full bg-amber-400 w-[22%]"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-primary mb-6">Recent Activity</h2>
              <div className="space-y-5">
                {recentTransactions.map((act) => (
                  <div key={act.id} className="flex gap-4">
                    <div className="mt-1">
                      {act.type === 'Invoice' ? <FileText className="h-4 w-4 text-accent" /> :
                       act.type === 'Payment' ? <IndianRupee className="h-4 w-4 text-emerald-400" /> :
                       act.type === 'Expense' ? <CreditCard className="h-4 w-4 text-amber-400" /> :
                       <CheckCircle2 className="h-4 w-4 text-muted" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-primary">{act.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted">{act.date}</span>
                        {act.amount && <span className="text-xs font-medium text-secondary">· ₹{act.amount.toLocaleString()}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
