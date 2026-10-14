'use client';

import React, { useEffect } from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { usePathname, useRouter, useParams as useNextParams } from 'next/navigation';

export interface LinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to?: string;
  href?: string;
  replace?: boolean;
  scroll?: boolean;
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ to, href, replace, scroll, children, ...rest }, ref) => {
    const destination = href || to || '/';
    return (
      <NextLink
        ref={ref}
        href={destination}
        replace={replace}
        scroll={scroll}
        {...rest}
      >
        {children}
      </NextLink>
    );
  }
);

Link.displayName = 'Link';

export const useLocation = () => {
  const pathname = usePathname();
  return {
    pathname: pathname || '/',
    search: '',
    hash: '',
    state: null,
    key: 'default',
  };
};

export const useNavigate = () => {
  const router = useRouter();
  return (to: string | number, options?: { replace?: boolean }) => {
    if (typeof to === 'number') {
      if (to === -1) window.history.back();
      else if (to === 1) window.history.forward();
      return;
    }
    if (options?.replace) {
      router.replace(to);
    } else {
      router.push(to);
    }
  };
};

export const useParams = <T extends Record<string, string | string[] | undefined> = Record<string, string>>() => {
  const params = useNextParams();
  return (params || {}) as T;
};

export const Navigate: React.FC<{ to: string; replace?: boolean }> = ({ to, replace = true }) => {
  const router = useRouter();
  useEffect(() => {
    if (replace) {
      router.replace(to);
    } else {
      router.push(to);
    }
  }, [router, to, replace]);
  return null;
};

export const Outlet: React.FC = () => null;

export const BrowserRouter: React.FC<{ children?: React.ReactNode }> = ({ children }) => <>{children}</>;
export const Routes: React.FC<{ children?: React.ReactNode }> = ({ children }) => <>{children}</>;
export const Route: React.FC<{ path?: string; element?: React.ReactNode }> = ({ element }) => <>{element}</>;
