import { useRouter } from 'next/router';
import { useMemo } from 'react';

export function useLocalRouter() {
  const { push, asPath, pathname } = useRouter();

  const isAdminPage = useMemo(() => {
    return asPath.includes('admin');
  }, [asPath]);

  const isHomePage = useMemo(() => {
    return pathname === '/';
  }, [pathname]);

  return { push, isAdminPage, isHomePage };
}
