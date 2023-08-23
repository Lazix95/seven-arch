import { Fragment, ReactNode, useCallback, useMemo } from 'react';
import { FirebaseAuth } from '../firebase/components/FirebaseAuth';
import { SharedHead } from '../shared/SharedHead';
import { SharedSplashScreen } from '../shared/SharedSplashScreen/SharedSplashScreen';
import { SharedThemeProvider } from '../shared/theme/SharedThemeProvider';
import { CssBaseline } from '@mui/material';
import { SharedIf } from '../shared/SharedIf';
import { SharedNamedChild } from '../shared/SharedNamedChild';
import { SharedMainLayout } from '../shared/layouts/SharedMainLayout/SharedMainLayout';
import { SharedDrawer, SharedDrawerItem, SharedDrawerSubItem } from '../shared/SharedDrawer/SharedDrawer';
import { User } from '../firebase';
import { useSystemContext } from '@/context/SystemContext';
import { useLocalRouter } from '@/hooks/useLocalRouter';
import { DocumentSocialNetwork } from '@/models/socialNetworks';
import { SharedDefaultFooter } from '../shared/footer/SharedDefaultFooter';
import { ThemeType } from '@/themes/sharedThemeDefault';

export interface FeatureIndexViewProps {
  readonly splashScreenImageUrl: string | null;
  readonly hasLoginError: boolean;
  readonly isSignInLoading: boolean;
  readonly isAdminPage: boolean;
  readonly drawerItems: SharedDrawerItem[];
  readonly isDrawerActive: boolean;
  readonly userData: User | null | undefined;
  readonly children: ReactNode;
  readonly appBarTitle: string;
  readonly themeType?: ThemeType;
  readonly currentDrawerItem?: SharedDrawerItem;
  readonly socialNetworks?: DocumentSocialNetwork[];
  readonly onSingInSubmit: (email: string, password: string) => Promise<void>;
  readonly onDrawerChange: (state: boolean) => void;
  readonly onSignOut: () => void;
  readonly onLegalAndPoliciesClick?: () => void;
  readonly onSocialNetworkClick?: (socialNetwork: DocumentSocialNetwork) => void;
}

export function FeatureIndexView(props: FeatureIndexViewProps) {
  const {
    children,
    hasLoginError,
    isSignInLoading,
    userData,
    isAdminPage,
    drawerItems,
    isDrawerActive,
    splashScreenImageUrl,
    appBarTitle,
    themeType,
    currentDrawerItem,
    socialNetworks,
  } = props;
  const { onSingInSubmit, onDrawerChange, onSignOut, onSocialNetworkClick, onLegalAndPoliciesClick } = props;

  const { mainViewMaxWidth } = useSystemContext();
  const { push } = useLocalRouter();

  const LoginFallback = useCallback(() => {
    return <FirebaseAuth onSubmit={onSingInSubmit} error={hasLoginError} isLoading={isSignInLoading} />;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignInLoading]);

  const hasAnySubItem = useMemo(() => {
    return drawerItems.some((item) => item.subItems?.length && item.subItems?.length > 0);
  }, [drawerItems]);

  function handleDrawerItemClick(item: SharedDrawerItem | SharedDrawerSubItem) {
    push(item.to);
  }

  function handleSocialNetworkClick(socialNetwork: DocumentSocialNetwork) {
    onSocialNetworkClick?.(socialNetwork);
  }

  function handleLegalAndPoliciesClick() {
    onLegalAndPoliciesClick?.();
  }

  return (
    <Fragment>
      <SharedHead title="Welcome to Sevenarch!" />
      <SharedThemeProvider themeType={themeType}>
        <SharedSplashScreen imageUrl={splashScreenImageUrl} />
        <CssBaseline />
        <SharedIf RIf={!!userData || !isAdminPage} Fallback={LoginFallback}>
          <SharedMainLayout maxMainWidth={mainViewMaxWidth} title={appBarTitle} onDrawerChange={onDrawerChange} onSignOut={onSignOut}>
            <SharedNamedChild name="drawer">
              <SharedDrawer
                title={'Menu'}
                items={drawerItems}
                value={isDrawerActive}
                showSubList={hasAnySubItem}
                currentDrawerItem={currentDrawerItem}
                socialNetworks={socialNetworks ?? []}
                onChange={onDrawerChange}
                onMenuItemClick={handleDrawerItemClick}
                onSocialNetworkClick={handleSocialNetworkClick}
              />
            </SharedNamedChild>

            {children}

            <SharedNamedChild name="footer">
              <SharedDefaultFooter
                socialNetworks={socialNetworks ?? []}
                themeType={themeType}
                companyName={appBarTitle}
                onMenuLinkClick={handleDrawerItemClick}
                onLegalAndPoliciesClick={handleLegalAndPoliciesClick}
                onSocialNetworkClick={handleSocialNetworkClick}
              />
            </SharedNamedChild>
          </SharedMainLayout>
        </SharedIf>
      </SharedThemeProvider>
    </Fragment>
  );
}
