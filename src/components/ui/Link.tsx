import type { ReactNode, MouseEvent } from 'react';

interface LinkProps {
  to: string;
  children?: ReactNode;
  className?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}

/**
 * A custom synchronous Link component that uses native browser navigation
 * to bypass React 19 / React Router v7 concurrent transition aborts.
 */
export function Link({ to, children, className, onClick }: LinkProps) {
  return (
    <a 
      href={to} 
      className={className}
      onClick={(e) => {
        // Do NOT prevent default. Let the browser handle the navigation natively
        // to guarantee the UI updates (acting as a multi-page app).
        if (onClick) onClick(e);
      }}
    >
      {children}
    </a>
  );
}
