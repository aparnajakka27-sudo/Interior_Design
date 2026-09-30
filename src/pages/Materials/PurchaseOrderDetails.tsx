import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from '@/components/ui/Link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { ArrowLeft, ShoppingCart, CheckCircle2, Truck, FileText, Send, XCircle } from 'lucide-react';
import { initialPurchaseOrders, detailedProjects, initialVendors, type POStatus } from '@/lib/mock-data';

export function PurchaseOrderDetails() {
  const { id } = useParams();
  const [po, setPo] = useState(initialPurchaseOrders.find(p => p.id === id) || initialPurchaseOrders[0]);
  const project = detailedProjects.find(p => p.id === po?.projectId);
  const vendor = initialVendors.find(v => v.id === po?.vendorId);

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  if (!po || !project || !vendor) return <div>Purchase Order not found.</div>;

  const handleConfirm = () => {
    setPo({ ...po, status: 'Confirmed' });
    setIsConfirmModalOpen(false);
  };

  const getStatusBadge = (status: POStatus) => {
    switch(status) {
      case 'Draft': return <Badge variant="neutral">Draft</Badge>;
      case 'Sent': return <Badge variant="warning">Sent</Badge>;
      case 'Confirmed': return <Badge variant="neutral">Confirmed</Badge>;
      case 'Partially Received': return <Badge variant="warning">Partially Received</Badge>;
      case 'Delivered': return <Badge variant="success">Delivered</Badge>;
      case 'Delayed': return <Badge variant="danger">Delayed</Badge>;
      case 'Cancelled': return <Badge variant="danger">Cancelled</Badge>;
      default: return <Badge variant="neutral">{status}</Badge>;
    }
  };

  const timelineStages = ['Draft Created', 'Sent to Vendor', 'Vendor Confirmed', 'Material Dispatched', 'Final Delivery'];
  const currentStage = po.status === 'Draft' ? 0 : po.status === 'Sent' ? 1 : po.status === 'Confirmed' ? 2 : po.status === 'Partially Received' ? 3 : po.status === 'Delivered' ? 4 : 2;

  return (
    <div className="max-w-[1200px] mx-auto space-y-6 pb-12">
      <Link to="/materials/purchase-orders" className="inline-flex items-center text-sm font-medium text-secondary hover:text-primary transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Purchase Orders
      </Link>

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-surface border border-border p-6 md:p-8 rounded-xl shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 bottom-0 w-1 bg-accent/80" />
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-primary">{po.poNumber}</h1>
            {getStatusBadge(po.status)}
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-secondary">
            <span>Project: <span className="text-primary font-medium">{project.name}</span></span>
            <span>Vendor: <span className="text-primary font-medium">{vendor.name}</span></span>
            <span>Order Date: <span className="text-primary font-medium">{po.date}</span></span>
            <span>Expected: <span className="text-primary font-medium">{po.expectedDelivery}</span></span>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {po.status === 'Draft' && <Button><Send className="mr-2 h-4 w-4" /> Send to Vendor</Button>}
          {(po.status === 'Sent' || po.status === 'Draft') && <Button onClick={() => setIsConfirmModalOpen(true)}><CheckCircle2 className="mr-2 h-4 w-4" /> Mark Confirmed</Button>}
          {po.status === 'Confirmed' && <Button><Truck className="mr-2 h-4 w-4" /> Mark Dispatched</Button>}
          {po.status !== 'Delivered' && po.status !== 'Cancelled' && <Button variant="danger"><XCircle className="mr-2 h-4 w-4" /> Cancel</Button>}
          <Button variant="secondary"><FileText className="mr-2 h-4 w-4" /> Download PDF</Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center min-w-max px-4">
            {timelineStages.map((stage, idx) => {
              const isCompleted = idx <= currentStage;
              const isCurrent = idx === currentStage;
              return (
                <div key={stage} className="flex items-center">
                  <div className="flex flex-col items-center gap-2 relative z-10 w-32">
                    <div className={`w-4 h-4 rounded-full border-2 bg-background flex items-center justify-center
                      ${isCompleted ? 'border-accent bg-accent' : isCurrent ? 'border-accent' : 'border-border'}`}
                    ></div>
                    <span className={`text-[11px] font-medium text-center leading-tight
                      ${isCurrent ? 'text-accent' : isCompleted ? 'text-primary' : 'text-muted'}`}
                    >
                      {stage}
                    </span>
                  </div>
                  {idx < timelineStages.length - 1 && (
                    <div className={`w-16 h-[2px] -mx-4 mb-5 z-0 ${isCompleted && !isCurrent ? 'bg-accent/50' : 'bg-border'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="text-lg flex items-center gap-2"><ShoppingCart className="h-4 w-4 text-muted" /> Ordered Materials</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-muted uppercase bg-elevated/50 border-b border-border">
                    <tr>
                      <th className="px-6 py-4 font-medium">Material</th>
                      <th className="px-6 py-4 font-medium">Specification</th>
                      <th className="px-6 py-4 font-medium text-right">Quantity</th>
                      <th className="px-6 py-4 font-medium text-right">Unit Cost</th>
                      <th className="px-6 py-4 font-medium text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {po.items.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 font-medium text-primary">{item.name}</td>
                        <td className="px-6 py-4 text-secondary text-xs">{item.specification}</td>
                        <td className="px-6 py-4 text-primary text-right">{item.quantity} <span className="text-muted">{item.unit}</span></td>
                        <td className="px-6 py-4 text-primary text-right">₹{item.unitCost.toLocaleString()}</td>
                        <td className="px-6 py-4 text-primary font-medium text-right">₹{item.total.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4 text-sm">
              <div className="flex justify-between items-center"><span className="text-secondary">Subtotal:</span><span className="font-medium text-primary">₹{po.subtotal.toLocaleString()}</span></div>
              <div className="flex justify-between items-center"><span className="text-secondary">Tax (18%):</span><span className="font-medium text-primary">₹{po.tax.toLocaleString()}</span></div>
              <div className="flex justify-between items-center"><span className="text-secondary">Shipping:</span><span className="font-medium text-primary">₹{po.shipping.toLocaleString()}</span></div>
              {po.discount > 0 && <div className="flex justify-between items-center"><span className="text-secondary">Discount:</span><span className="font-medium text-emerald-400">-₹{po.discount.toLocaleString()}</span></div>}
              
              <div className="pt-4 border-t border-border flex justify-between items-center">
                <span className="font-semibold text-primary text-base">Total:</span>
                <span className="font-bold text-accent text-lg">₹{po.total.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Modal isOpen={isConfirmModalOpen} onClose={() => setIsConfirmModalOpen(false)} title="Confirm Purchase Order" description="Mark this order as confirmed by the vendor.">
        <div className="pt-4 flex justify-end gap-3 mt-4 border-t border-border">
          <Button variant="ghost" onClick={() => setIsConfirmModalOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirm}>Confirm Order</Button>
        </div>
      </Modal>

    </div>
  );
}
