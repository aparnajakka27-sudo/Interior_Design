import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { GripVertical, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export function MaterialsSettings() {
  const categories = [
    'Civil', 'Electrical', 'Plumbing', 'Flooring', 'Marble', 'Wood', 'Furniture', 
    'Hardware', 'Paint', 'Lighting', 'Sanitary', 'Kitchen', 'DAccor', 'Other'
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-medium text-primary">Materials & Procurement</h2>
          <p className="text-sm text-secondary mt-1">Configure material categories and statuses.</p>
        </div>
        <Link to="/materials/vendors">
          <Button variant="secondary">Manage Vendors</Button>
        </Link>
      </div>

      <Card>
        <CardHeader className="border-b border-border pb-4 flex flex-row justify-between items-center">
          <CardTitle className="text-base">Material Categories</CardTitle>
          <Button variant="secondary" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {categories.map(c => (
              <div key={c} className="flex justify-between items-center p-4 hover:bg-surface/50 transition-colors">
                <div className="flex items-center gap-3">
                  <GripVertical className="h-4 w-4 text-muted cursor-move" />
                  <p className="text-sm font-medium text-primary">{c}</p>
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-secondary hover:text-red-400">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
