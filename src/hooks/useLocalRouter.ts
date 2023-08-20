import { adminDrawerItems, mainDrawerItems } from '@/constants/mainDrawerItems';
import { useRouter } from 'next/router';
import path from 'path';
import { useMemo } from 'react';

export function useLocalRouter() {
  const { push, asPath, pathname } = useRouter();

  const isAdminPage = useMemo(() => {
    return asPath.includes('admin');
  }, [asPath]);

  const isHomePage = useMemo(() => {
    return pathname === '/';
  }, [pathname]);

  const currentRoute = useMemo(() => {
    return [...mainDrawerItems, ...adminDrawerItems].find((item) => {
      return path.join(item.to) === pathname;
    });
  }, [pathname]);

  return { push, isAdminPage, isHomePage, currentRoute };
}
