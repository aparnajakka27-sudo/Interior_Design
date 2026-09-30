import { useNavigate } from 'react-router-dom';
import type { ReactNode, MouseEvent } from 'react';

interface LinkProps {
  to: string;
  children?: ReactNode;
  className?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}

/**
 * A custom synchronous Link component that bypasses React Router v7's concurrent 
 * startTransition wrapper to prevent transition aborts on client-side navigation.
 */
export function Link({ to, children, className, onClick }: LinkProps) {
  const navigate = useNavigate();
  
  return (
    <a 
      href={to} 
      className={className}
      onClick={(e) => {
        e.preventDefault();
        if (onClick) onClick(e);
        navigate(to);
      }}
    >
      {children}
    </a>
  );
}
