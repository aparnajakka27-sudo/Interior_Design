import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-6xl font-bold text-accent">404</h1>
      <h2 className="text-xl font-medium text-primary mt-4">Page Not Found</h2>
      <p className="text-secondary mt-2 max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link 
        to="/" 
        className="mt-8 px-6 py-2 bg-surface border border-border rounded-lg text-primary hover:text-accent hover:border-accent transition-colors"
      >
        Return to Dashboard
      </Link>
    </div>
  );
}
