import { Link } from '@/components/ui/Link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { IndianRupee, CreditCard, Receipt, Building2, TrendingUp , Bell} from 'lucide-react';
import { UpcomingEvents } from '@/components/calendar/UpcomingEvents';
import { useAuth } from '@/contexts/AuthContext';
import { initialInvoices, initialPayments, initialVendorPayments, detailedProjects } from '@/lib/mock-data';

export function AccountsDashboard() {
  const { user } = useAuth();
  const firstName = user?.name?.split(' ')[0] || 'Accounts';

  return (
    <div className="max-w-[1400px] mx-auto space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-primary">Good morning, {firstName}</h1>
          <p className="text-secondary mt-1 text-sm">Here's the current financial position across your assigned work.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/finance/invoices"><Button variant="secondary" size="sm">Create Invoice</Button></Link>
          <Link to="/finance/payments"><Button size="sm">Record Payment</Button></Link>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <div className="bg-surface border border-border p-4 rounded-xl text-center">
          <p className="text-2xl font-bold text-primary">₹38L</p>
          <p className="text-[10px] text-muted uppercase tracking-wider mt-1">Total Receivables</p>
        </div>
        <div className="bg-surface border border-border p-4 rounded-xl text-center">
          <p className="text-2xl font-bold text-emerald-400">₹25L</p>
          <p className="text-[10px] text-muted uppercase tracking-wider mt-1">Payments Received</p>
        </div>
        <div className="bg-surface border border-border p-4 rounded-xl text-center">
          <p className="text-2xl font-bold text-amber-400">₹13L</p>
          <p className="text-[10px] text-muted uppercase tracking-wider mt-1">Outstanding Invoices</p>
        </div>
        <div className="bg-surface border border-border p-4 rounded-xl text-center">
          <p className="text-2xl font-bold text-red-400">₹4.2L</p>
          <p className="text-[10px] text-muted uppercase tracking-wider mt-1">Expenses YTD</p>
        </div>
        <div className="bg-surface border border-border p-4 rounded-xl text-center">
          <p className="text-2xl font-bold text-accent">₹18L</p>
          <p className="text-[10px] text-muted uppercase tracking-wider mt-1">Vendor Payments</p>
        </div>
        <div className="bg-surface border border-border p-4 rounded-xl text-center">
          <p className="text-2xl font-bold text-primary">24%</p>
          <p className="text-[10px] text-muted uppercase tracking-wider mt-1">Avg Profitability</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="border-b border-border pb-4 flex flex-row justify-between items-center">
              <CardTitle className="flex items-center gap-2"><Receipt className="h-4 w-4 text-muted"/> Receivables & Invoices</CardTitle>
              <Link to="/finance/invoices"><Button variant="ghost" size="sm">View All</Button></Link>
            </CardHeader>
            <CardContent className="pt-0 p-0">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted uppercase bg-elevated/50 border-b border-border">
                  <tr>
                    <th className="px-6 py-3 font-medium">Invoice</th>
                    <th className="px-6 py-3 font-medium">Client & Project</th>
                    <th className="px-6 py-3 font-medium text-right">Amount</th>
                    <th className="px-6 py-3 font-medium">Due Date</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {initialInvoices.slice(0, 4).map(inv => (
                    <tr key={inv.id} className="hover:bg-elevated/50">
                      <td className="px-6 py-4 font-medium text-primary">
                        <Link to={`/finance/invoices/${inv.id}`} className="hover:text-accent transition-colors">{inv.id}</Link>
                      </td>
                      <td className="px-6 py-4 text-secondary">
                        <p className="text-primary">{inv.clientId}</p>
                        <p className="text-xs">{detailedProjects.find(p => p.id === inv.projectId)?.name}</p>
                      </td>
                      <td className="px-6 py-4 text-right font-medium text-primary">₹{inv.total.toLocaleString()}</td>
                      <td className={`px-6 py-4 text-secondary ${inv.status === 'Overdue' ? 'text-red-400 font-medium' : ''}`}>{inv.dueDate}</td>
                      <td className="px-6 py-4">
                        <Badge variant={inv.status === 'Paid' ? 'success' : inv.status === 'Overdue' ? 'danger' : inv.status === 'Sent' ? 'warning' : 'neutral'}>{inv.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="border-b border-border pb-4 flex flex-row justify-between items-center">
              <CardTitle className="flex items-center gap-2"><TrendingUp className="h-4 w-4 text-muted"/> Project Profitability</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {detailedProjects.slice(0, 3).map(proj => (
                  <div key={proj.id} className="p-4 border border-border rounded-lg bg-background">
                    <div className="flex justify-between items-center mb-3">
                      <Link to={`/finance/projects/${proj.id}`} className="font-medium text-primary hover:text-accent">{proj.name}</Link>
                      <Badge variant="neutral">{proj.stage}</Badge>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-xs text-muted mb-1">Contract Value</p>
                        <p className="font-medium text-primary">₹45,00,000</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted mb-1">Revenue</p>
                        <p className="font-medium text-emerald-400">₹22,50,000</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted mb-1">Expenses</p>
                        <p className="font-medium text-red-400">₹14,20,000</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted mb-1">Gross Profit</p>
                        <p className="font-medium text-accent">₹8,30,000</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <UpcomingEvents />
          <Card>
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="flex items-center gap-2"><IndianRupee className="h-4 w-4 text-muted"/> Recent Payments</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {initialPayments.slice(0, 3).map(payment => (
                <div key={payment.id} className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-primary">{payment.clientId}</p>
                    <p className="text-[10px] text-muted">{payment.date} · {payment.method}</p>
                  </div>
                  <span className="text-sm font-medium text-emerald-400">+₹{payment.amount.toLocaleString()}</span>
                </div>
              ))}
              <Link to="/finance/payments"><Button variant="ghost" size="sm" className="w-full text-xs mt-2">View All Payments</Button></Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="flex items-center gap-2"><Building2 className="h-4 w-4 text-muted"/> Vendor Payments</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {initialVendorPayments.slice(0, 3).map(vp => (
                <div key={vp.id} className="p-3 bg-surface border border-border rounded-lg">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-sm font-medium text-primary">{vp.vendorId}</p>
                    <span className="text-sm font-medium text-primary">₹{vp.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-secondary">Due: {vp.date}</p>
                    <Badge variant={vp.status === 'Paid' ? 'success' : vp.status === 'Overdue' ? 'danger' : 'warning'} className="text-[10px] h-5">{vp.status}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="flex items-center gap-2"><CreditCard className="h-4 w-4 text-muted"/> Recent Expenses</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-primary">Site Travel</p>
                  <p className="text-[10px] text-muted">Sharma Residence</p>
                </div>
                <span className="text-sm font-medium text-red-400">-₹1,250</span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-primary">Material Samples</p>
                  <p className="text-[10px] text-muted">Studio Overhead</p>
                </div>
                <span className="text-sm font-medium text-red-400">-₹4,500</span>
              </div>
              <Link to="/finance/expenses"><Button variant="ghost" size="sm" className="w-full text-xs mt-2">View Expenses</Button></Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Activity / Notifications */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2"><Bell className="h-5 w-5 text-muted"/> Recent Notifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-surface border border-border rounded-xl">
            <div className="flex justify-between items-start mb-2">
              <Badge variant="warning" className="text-[10px]">High Priority</Badge>
              <span className="text-[10px] text-muted">5 min ago</span>
            </div>
            <p className="text-sm font-medium text-primary mb-1">Client approval requested</p>
            <p className="text-xs text-secondary mb-3">Sharma Residence: Kitchen Layout V3 is awaiting your review.</p>
            <Link to="/notifications"><Button variant="ghost" size="sm" className="h-6 px-2 text-xs w-full">View Details</Button></Link>
          </div>
          <div className="p-4 bg-surface border border-border rounded-xl">
            <div className="flex justify-between items-start mb-2">
              <Badge variant="neutral" className="text-[10px]">Message</Badge>
              <span className="text-[10px] text-muted">20 min ago</span>
            </div>
            <p className="text-sm font-medium text-primary mb-1">New message in Sharma Residence</p>
            <p className="text-xs text-secondary mb-3">Rahul Sharma: "Material delivery has been received."</p>
            <Link to="/messages/CONV-001"><Button variant="ghost" size="sm" className="h-6 px-2 text-xs w-full">Open Conversation</Button></Link>
          </div>
          <div className="p-4 bg-surface border border-border rounded-xl">
            <div className="flex justify-between items-start mb-2">
              <Badge variant="neutral" className="text-[10px]">Document</Badge>
              <span className="text-[10px] text-muted">2 hrs ago</span>
            </div>
            <p className="text-sm font-medium text-primary mb-1">New document uploaded</p>
            <p className="text-xs text-secondary mb-3">Ananya Rao uploaded Kitchen Layout V3.pdf for Sharma Residence.</p>
            <Link to="/documents/DOC-001"><Button variant="ghost" size="sm" className="h-6 px-2 text-xs w-full">View Document</Button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
