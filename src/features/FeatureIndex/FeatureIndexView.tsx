import { Fragment, ReactNode, useCallback } from 'react';
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

export interface FeatureIndexViewProps {
  onSingInSubmit: (email: string, password: string) => Promise<void>;
  onDrawerChange: (state: boolean) => void;
  onSignOut: () => void;
  hasLoginError: boolean;
  isSignInLoading: boolean;
  isAdminPage: boolean;
  drawerItems: SharedDrawerItem[];
  isDrawerActive: boolean;
  userData: User | null | undefined;
  children: ReactNode;
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
}: FeatureIndexViewProps) {
  const LoginFallback = useCallback(() => {
    return <FirebaseAuth onSubmit={onSingInSubmit} error={hasLoginError} loading={isSignInLoading} />;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <SharedHead title="Welcome to Sevenarch!" />
      <SharedThemeProvider mode={'light'}>
        <SharedSplashScreen />
        <CssBaseline />
        <SharedIf RIf={!!userData || !isAdminPage} Fallback={LoginFallback}>
          <SharedMainLayout onDrawerChange={onDrawerChange} onSignOut={onSignOut}>
            <SharedNamedChild name="drawer">
              <SharedDrawer title={'Menu'} items={drawerItems} value={isDrawerActive} showSubList={false} onChange={onDrawerChange} />
            </SharedNamedChild>
            {children}
          </SharedMainLayout>
        </SharedIf>
      </SharedThemeProvider>
    </Fragment>
  );
}
