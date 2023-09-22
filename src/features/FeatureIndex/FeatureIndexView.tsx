import { Fragment, ReactNode, useCallback, useMemo } from 'react';
import { FormAuth } from '../../components/forms/FormAuth';
import { SharedHead } from '@/components/shared/util/SharedHead';
import { MainSplashScreen } from '@/components/MainSplashScreen/MainSplashScreen';
import { SharedThemeProvider } from '@/themes/SharedThemeProvider';
import { CssBaseline } from '@mui/material';
import { SharedIf } from '@/components/shared/util/SharedIf';
import { SharedNamedChild } from '@/components/shared/util/SharedNamedChild';
import { SharedMainLayout } from '@/components/shared/layouts/SharedMainLayout/SharedMainLayout';
import { MainDrawer, MainDrawerItem, MainDrawerSubItem } from '@/components/MainDrawer/MainDrawer';
import { User } from '../firebase';
import { useSystemContext } from '@/context/SystemContext';
import { useLocalRouter } from '@/hooks/useLocalRouter';
import { DocumentSocialNetwork } from '@/models/socialNetworks';
import { SharedDefaultFooter } from '@/components/shared/footer/SharedDefaultFooter';
import { ThemeType } from '@/themes/sharedThemeDefault';

export interface FeatureIndexViewProps {
  readonly splashScreenImageUrl: string | null;
  readonly hasLoginError: boolean;
  readonly isSignInLoading: boolean;
  readonly isAdminPage: boolean;
  readonly drawerItems: MainDrawerItem[];
  readonly isDrawerActive: boolean;
  readonly userData: User | null | undefined;
  readonly children: ReactNode;
  readonly appBarTitle: string;
  readonly themeType?: ThemeType;
  readonly currentDrawerItem?: MainDrawerItem;
  readonly socialNetworks?: DocumentSocialNetwork[];
  readonly isPublishLoading?: boolean;
  readonly onSingInSubmit: (email: string, password: string, rememberMe: boolean) => Promise<void>;
  readonly onDrawerChange: (state: boolean) => void;
  readonly onSignOut: () => void;
  readonly onLegalAndPoliciesClick?: () => void;
  readonly onSocialNetworkClick?: (socialNetwork: DocumentSocialNetwork) => void;
  readonly onPublishClick?: () => void;
  readonly onLogoClick?: () => void;
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
    isPublishLoading,
    onPublishClick,
    onLogoClick,
  } = props;
  const { onSingInSubmit, onDrawerChange, onSignOut, onSocialNetworkClick, onLegalAndPoliciesClick } = props;

  const { mainViewMaxWidth, isTransparentAppBar } = useSystemContext();
  const { push } = useLocalRouter();

  const hasAnySubItem = useMemo(() => {
    return drawerItems.some((item) => item.subItems?.length && item.subItems?.length > 0);
  }, [drawerItems]);

  function handleDrawerItemClick(item: MainDrawerItem | MainDrawerSubItem) {
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
      <SharedHead title="Welcome to Seven-arch!" />
      <SharedThemeProvider themeType={themeType}>
        <MainSplashScreen imageUrl={splashScreenImageUrl} />
        <CssBaseline />
        <SharedIf If={!userData && isAdminPage}>
          <FormAuth onSubmit={onSingInSubmit} error={hasLoginError} isLoading={isSignInLoading} />
        </SharedIf>
        <SharedIf If={userData || !isAdminPage}>
          <SharedMainLayout
            onLogoClick={onLogoClick}
            isTransparentAppBar={isTransparentAppBar}
            maxMainWidth={mainViewMaxWidth}
            title={appBarTitle}
            isPublishLoading={isPublishLoading}
            onDrawerChange={onDrawerChange}
            onSignOut={onSignOut}
            onPublishClick={onPublishClick}
          >
            <SharedNamedChild name="drawer">
              <MainDrawer
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
