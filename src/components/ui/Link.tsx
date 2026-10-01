import { Link as RouterLink, type LinkProps as RouterLinkProps } from 'react-router-dom';

export interface LinkProps extends RouterLinkProps {}

/**
 * SPA Link component using React Router for client-side navigation.
 */
export function Link({ to, children, className, onClick, ...props }: LinkProps) {
  return (
    <RouterLink to={to} className={className} onClick={onClick} {...props}>
      {children}
    </RouterLink>
  );
}
