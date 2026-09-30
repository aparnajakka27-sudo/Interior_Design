import { useParams } from 'react-router-dom';
import { Link } from '@/components/ui/Link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ArrowLeft, CheckCircle2, AlertCircle, ShoppingCart, Package } from 'lucide-react';
import { initialMaterials, detailedProjects, initialVendors } from '@/lib/mock-data';

export function ProjectMaterials() {
  const { projectId } = useParams();
  const project = detailedProjects.find(p => p.id === projectId) || detailedProjects[0];
  const materials = initialMaterials.filter(m => m.projectId === project?.id);

  if (!project) return <div>Project not found.</div>;

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Required': return <Badge variant="neutral">{status}</Badge>;
      case 'Quotation Pending': return <Badge variant="warning">{status}</Badge>;
      case 'Approved': return <Badge variant="success" className="bg-emerald-900/30 text-emerald-400">Approved</Badge>;
      case 'Ordered': return <Badge variant="neutral"><ShoppingCart className="mr-1 h-3 w-3" /> Ordered</Badge>;
      case 'Partially Received': return <Badge variant="warning"><Package className="mr-1 h-3 w-3" /> Partial</Badge>;
      case 'Received': return <Badge variant="success"><CheckCircle2 className="mr-1 h-3 w-3" /> Received</Badge>;
      case 'Delayed': return <Badge variant="danger"><AlertCircle className="mr-1 h-3 w-3" /> Delayed</Badge>;
      case 'Cancelled': return <Badge variant="danger">Cancelled</Badge>;
      default: return <Badge variant="neutral">{status}</Badge>;
    }
  };

  const getVendorName = (id: string) => initialVendors.find(v => v.id === id)?.name || id;

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 pb-12">
      <div className="flex justify-between items-center">
        <Link to={`/projects/${project.id}`} className="inline-flex items-center text-sm font-medium text-secondary hover:text-primary transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Project Details
        </Link>
        <Link to="/materials">
          <Button variant="ghost" size="sm">Global Materials Dashboard</Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-surface border border-border p-6 rounded-xl">
        <div>
          <h1 className="text-2xl font-semibold text-primary">Materials & Procurement</h1>
          <p className="text-secondary mt-1 text-sm">{project.name} · {project.location}</p>
        </div>
        <Button>Request Material</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-lg font-semibold text-primary mb-4">Required Materials</h2>
          
          <div className="grid gap-4">
            {materials.map(material => (
              <Card key={material.id}>
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-primary flex items-center gap-3">
                        {material.name}
                        {getStatusBadge(material.status)}
                      </h3>
                      <p className="text-sm text-secondary mt-1">{material.specification}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-primary font-medium">₹{(material.requiredQty * material.unitCost).toLocaleString()}</p>
                      <p className="text-xs text-muted">Estimated Cost</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 border-t border-border pt-4">
                    <div>
                      <p className="text-xs text-muted mb-1">Required</p>
                      <p className="text-primary font-medium">{material.requiredQty} {material.unit}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted mb-1">Ordered</p>
                      <p className="text-primary font-medium">{material.orderedQty} {material.unit}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted mb-1">Received</p>
                      <p className="text-emerald-400 font-medium">{material.receivedQty} {material.unit}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted mb-1">Pending</p>
                      <p className="text-amber-400 font-medium">{material.requiredQty - material.receivedQty} {material.unit}</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 pt-4 border-t border-border gap-4">
                    <div className="text-sm text-secondary">
                      Source: <span className="text-primary">{material.source}</span>
                    </div>
                    <div className="text-sm text-secondary">
                      Vendor: <span className="text-primary">{getVendorName(material.vendorId)}</span>
                    </div>
                    <Button variant="secondary" size="sm">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-primary mb-4">Project Procurement</h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-secondary">Total Materials</span>
                  <span className="font-medium text-primary">{materials.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary">Pending Orders</span>
                  <span className="font-medium text-primary">{materials.filter(m => m.status === 'Required' || m.status === 'Approved').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary">Delayed Deliveries</span>
                  <span className="font-medium text-red-400">{materials.filter(m => m.status === 'Delayed').length}</span>
                </div>
                <div className="pt-4 border-t border-border flex justify-between font-semibold">
                  <span className="text-primary">Procurement Value</span>
                  <span className="text-accent">₹{materials.reduce((acc, m) => acc + (m.requiredQty * m.unitCost), 0).toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
