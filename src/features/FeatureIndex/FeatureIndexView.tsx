import { Fragment, ReactNode, useCallback, useEffect, useMemo } from 'react';
import { FirebaseAuth } from '../firebase/components/FirebaseAuth';
import { SharedHead } from '../shared/SharedHead';
import { SharedSplashScreen } from '../shared/SharedSplashScreen/SharedSplashScreen';
import { SharedThemeProvider } from '../shared/theme/SharedThemeProvider';
import { CssBaseline } from '@mui/material';
import { SharedIf } from '../shared/SharedIf';
import { SharedNamedChild } from '../shared/SharedNamedChild';
import { SharedMainLayout } from '../shared/layouts/SharedMainLayout/SharedMainLayout';
import { SharedDrawer, SharedDrawerItem } from '../shared/SharedDrawer/SharedDrawer';
import { User } from '../firebase';
import { useSystemContext } from '@/context/SystemContext';

export interface FeatureIndexViewProps {
  onSingInSubmit: (email: string, password: string) => Promise<void>;
  onDrawerChange: (state: boolean) => void;
  onSignOut: () => void;
  splashScreenImageUrl: string | null;
  hasLoginError: boolean;
  isSignInLoading: boolean;
  isAdminPage: boolean;
  drawerItems: SharedDrawerItem[];
  isDrawerActive: boolean;
  userData: User | null | undefined;
  children: ReactNode;
  appBarTitle: string;
}

export function FeatureIndexView({
  children,
  onSingInSubmit,
  onDrawerChange,
  onSignOut,
  hasLoginError,
  isSignInLoading,
  userData,
  isAdminPage,
  drawerItems,
  isDrawerActive,
  splashScreenImageUrl,
  appBarTitle,
}: FeatureIndexViewProps) {
  const { mainViewMaxWidth } = useSystemContext();

  const LoginFallback = useCallback(() => {
    return <FirebaseAuth onSubmit={onSingInSubmit} error={hasLoginError} isLoading={isSignInLoading} />;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignInLoading]);

  const hasAnySubItem = useMemo(() => {
    return drawerItems.some((item) => item.subItems?.length && item.subItems?.length > 0);
  }, [drawerItems]);

  return (
    <Fragment>
      <SharedHead title="Welcome to Sevenarch!" />
      <SharedThemeProvider mode={'light'}>
        <SharedSplashScreen imageUrl={splashScreenImageUrl} />
        <CssBaseline />
        <SharedIf RIf={!!userData || !isAdminPage} Fallback={LoginFallback}>
          <SharedMainLayout maxMainWidth={mainViewMaxWidth} title={appBarTitle} onDrawerChange={onDrawerChange} onSignOut={onSignOut}>
            <SharedNamedChild name="drawer">
              <SharedDrawer title={'Menu'} items={drawerItems} value={isDrawerActive} showSubList={hasAnySubItem} onChange={onDrawerChange} />
            </SharedNamedChild>
            {children}
          </SharedMainLayout>
        </SharedIf>
      </SharedThemeProvider>
    </Fragment>
  );
}
