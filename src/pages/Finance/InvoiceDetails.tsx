import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { ArrowLeft, Receipt, Send, Download, IndianRupee, Edit } from 'lucide-react';
import { initialInvoices, detailedProjects, type InvoiceStatus } from '@/lib/mock-data';

export function InvoiceDetails() {
  const { id } = useParams();
  const [invoice] = useState(initialInvoices.find(inv => inv.id === id) || initialInvoices[0]);
  const project = detailedProjects.find(p => p.id === invoice?.projectId);

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  if (!invoice || !project) return <div>Invoice not found.</div>;

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

  return (
    <div className="max-w-[1000px] mx-auto space-y-6 pb-12">
      <Link to="/finance/invoices" className="inline-flex items-center text-sm font-medium text-secondary hover:text-primary transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Invoices
      </Link>

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-surface border border-border p-6 md:p-8 rounded-xl shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 bottom-0 w-1 bg-accent/80" />
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-primary">{invoice.invoiceNumber}</h1>
            {getStatusBadge(invoice.status)}
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-secondary">
            <span>Project: <span className="text-primary font-medium">{project.name}</span></span>
            <span>Issue Date: <span className="text-primary font-medium">{invoice.issueDate}</span></span>
            <span>Due Date: <span className="text-primary font-medium">{invoice.dueDate}</span></span>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {invoice.outstanding > 0 && invoice.status !== 'Cancelled' && (
            <Button onClick={() => setIsPaymentModalOpen(true)}><IndianRupee className="mr-2 h-4 w-4" /> Record Payment</Button>
          )}
          <Button variant="secondary"><Send className="mr-2 h-4 w-4" /> Send</Button>
          <Button variant="secondary"><Download className="mr-2 h-4 w-4" /> PDF</Button>
          <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
        </div>
      </div>

      <Card>
        <CardHeader className="border-b border-border pb-4">
          <CardTitle className="text-lg flex items-center gap-2"><Receipt className="h-4 w-4 text-muted" /> Invoice Items</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted uppercase bg-elevated/50 border-b border-border">
                <tr>
                  <th className="px-6 py-4 font-medium">Description</th>
                  <th className="px-6 py-4 font-medium text-right">Quantity</th>
                  <th className="px-6 py-4 font-medium text-right">Rate</th>
                  <th className="px-6 py-4 font-medium text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {invoice.items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 font-medium text-primary">{item.description}</td>
                    <td className="px-6 py-4 text-secondary text-right">{item.quantity}</td>
                    <td className="px-6 py-4 text-primary text-right">₹{item.rate.toLocaleString()}</td>
                    <td className="px-6 py-4 text-primary font-medium text-right">₹{item.amount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col md:flex-row justify-end gap-6">
        <div className="w-full md:w-80 shrink-0">
          <Card>
            <CardContent className="p-6 space-y-4 text-sm">
              <div className="flex justify-between items-center"><span className="text-secondary">Subtotal:</span><span className="font-medium text-primary">₹{invoice.subtotal.toLocaleString()}</span></div>
              {invoice.discount > 0 && <div className="flex justify-between items-center"><span className="text-secondary">Discount:</span><span className="font-medium text-emerald-400">-₹{invoice.discount.toLocaleString()}</span></div>}
              <div className="flex justify-between items-center"><span className="text-secondary">Tax (18%):</span><span className="font-medium text-primary">₹{invoice.tax.toLocaleString()}</span></div>
              
              <div className="pt-4 border-t border-border flex justify-between items-center">
                <span className="font-semibold text-primary text-base">Total:</span>
                <span className="font-bold text-accent text-lg">₹{invoice.total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center"><span className="text-secondary">Paid:</span><span className="font-medium text-emerald-400">₹{invoice.paid.toLocaleString()}</span></div>
              <div className="pt-4 border-t border-border flex justify-between items-center">
                <span className="font-semibold text-secondary text-base">Outstanding:</span>
                <span className="font-bold text-amber-400 text-lg">₹{invoice.outstanding.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Modal isOpen={isPaymentModalOpen} onClose={() => setIsPaymentModalOpen(false)} title="Record Payment" description="Log a payment received from the client for this invoice.">
        <form className="space-y-4 mt-4" onSubmit={e => { e.preventDefault(); setIsPaymentModalOpen(false); }}>
          <div className="space-y-2">
            <Label>Amount Received</Label>
            <Input type="number" defaultValue={invoice.outstanding} />
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
          <div className="space-y-2">
            <Label>Notes</Label>
            <textarea className="flex min-h-[60px] w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-primary placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-accent" placeholder="Any additional details..."></textarea>
          </div>
          <div className="pt-4 flex justify-end gap-3 border-t border-border mt-6">
            <Button type="button" variant="ghost" onClick={() => setIsPaymentModalOpen(false)}>Cancel</Button>
            <Button type="submit">Save Payment</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
