import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { ArrowLeft, FileText, Send, CheckCircle2, XCircle, Download, FilePlus2 } from 'lucide-react';
import { initialQuotations, detailedProjects, type QuotationStatus } from '@/lib/mock-data';

export function QuotationDetails() {
  const { id } = useParams();
  const [quote, setQuote] = useState(initialQuotations.find(q => q.id === id) || initialQuotations[0]);
  const project = detailedProjects.find(p => p.id === quote?.projectId);

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<'approve' | 'reject'>('approve');

  if (!quote || !project) return <div>Quotation not found.</div>;

  const handleAction = () => {
    setQuote({ ...quote, status: modalAction === 'approve' ? 'Approved' : 'Rejected' });
    setIsConfirmModalOpen(false);
  };

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

  return (
    <div className="max-w-[1000px] mx-auto space-y-6 pb-12">
      <Link to="/finance/quotations" className="inline-flex items-center text-sm font-medium text-secondary hover:text-primary transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Quotations
      </Link>

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-surface border border-border p-6 md:p-8 rounded-xl shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 bottom-0 w-1 bg-accent/80" />
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-primary">{quote.quoteNumber}</h1>
            {getStatusBadge(quote.status)}
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-secondary">
            <span>Project: <span className="text-primary font-medium">{project.name}</span></span>
            <span>Created: <span className="text-primary font-medium">{quote.date}</span></span>
            <span>Valid Until: <span className="text-primary font-medium">{quote.validUntil}</span></span>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {quote.status !== 'Approved' && (
            <>
              <Button variant="secondary" onClick={() => { setModalAction('reject'); setIsConfirmModalOpen(true); }}><XCircle className="mr-2 h-4 w-4" /> Reject</Button>
              <Button onClick={() => { setModalAction('approve'); setIsConfirmModalOpen(true); }}><CheckCircle2 className="mr-2 h-4 w-4" /> Approve</Button>
            </>
          )}
          {quote.status === 'Approved' && (
            <Link to="/finance/invoices">
              <Button><FilePlus2 className="mr-2 h-4 w-4" /> Convert to Invoice</Button>
            </Link>
          )}
          <Button variant="secondary"><Send className="mr-2 h-4 w-4" /> Send</Button>
          <Button variant="secondary"><Download className="mr-2 h-4 w-4" /> PDF</Button>
        </div>
      </div>

      <Card>
        <CardHeader className="border-b border-border pb-4">
          <CardTitle className="text-lg flex items-center gap-2"><FileText className="h-4 w-4 text-muted" /> Bill of Quantities</CardTitle>
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
                {quote.items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 font-medium text-primary">{item.description}</td>
                    <td className="px-6 py-4 text-secondary text-right">{item.quantity} <span className="text-muted">{item.unit}</span></td>
                    <td className="px-6 py-4 text-primary text-right">₹{item.rate.toLocaleString()}</td>
                    <td className="px-6 py-4 text-primary font-medium text-right">₹{item.amount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col md:flex-row justify-between gap-6">
        <div className="flex-1 space-y-4">
          {quote.notes && (
            <Card>
              <CardContent className="p-6">
                <h4 className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">Terms & Notes</h4>
                <p className="text-sm text-secondary">{quote.notes}</p>
              </CardContent>
            </Card>
          )}
        </div>
        
        <div className="w-full md:w-80 shrink-0">
          <Card>
            <CardContent className="p-6 space-y-4 text-sm">
              <div className="flex justify-between items-center"><span className="text-secondary">Subtotal:</span><span className="font-medium text-primary">₹{quote.subtotal.toLocaleString()}</span></div>
              {quote.discount > 0 && <div className="flex justify-between items-center"><span className="text-secondary">Discount:</span><span className="font-medium text-emerald-400">-₹{quote.discount.toLocaleString()}</span></div>}
              <div className="flex justify-between items-center"><span className="text-secondary">Tax:</span><span className="font-medium text-primary">₹{quote.tax.toLocaleString()}</span></div>
              
              <div className="pt-4 border-t border-border flex justify-between items-center">
                <span className="font-semibold text-primary text-base">Grand Total:</span>
                <span className="font-bold text-accent text-lg">₹{quote.amount.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Modal isOpen={isConfirmModalOpen} onClose={() => setIsConfirmModalOpen(false)} title="Confirm Action" description={`Are you sure you want to ${modalAction} this quotation?`}>
        <div className="pt-4 flex justify-end gap-3 mt-4 border-t border-border">
          <Button variant="ghost" onClick={() => setIsConfirmModalOpen(false)}>Cancel</Button>
          <Button variant={modalAction === 'reject' ? 'danger' : 'primary'} onClick={handleAction}>Yes, {modalAction}</Button>
        </div>
      </Modal>
    </div>
  );
}
