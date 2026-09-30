import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function AccessDenied() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="h-16 w-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
        <ShieldAlert className="h-8 w-8 text-red-400" />
      </div>
      <h1 className="text-2xl font-bold text-primary mb-2">Access Restricted</h1>
      <p className="text-secondary mb-8 max-w-md">
        You don't have permission to access this section. If you believe this is an error, please contact your administrator.
      </p>
      <Link to="/dashboard">
        <Button>Return to Dashboard</Button>
      </Link>
    </div>
  );
}
