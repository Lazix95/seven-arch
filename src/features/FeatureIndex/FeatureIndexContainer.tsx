import { useMemo, useState } from 'react';
import { AppProps } from 'next/app';
import { signIn, signUserOut } from '@/firebase';
import { useUserContext } from '@/context/userContext';
import { FeatureIndexView } from './FeatureIndexView';
import { mainDrawerItems, adminDrawerItems } from '@/constants/mainDrawerItems';
import { useLocalRouter } from '@/hooks/useLocalRouter';
import { ThemeType } from '@/themes/sharedThemeDefault';
import { DocumentSocialNetwork } from '@/models/socialNetworks';
import { useLinks } from '@/hooks/useLinks';
import { triggerVarcelDeploy } from '@/api/varcelApi';
import { sortArray } from '@/utils/arrayUtils';

export function FeatureIndexContainer({ Component, pageProps }: AppProps) {
  const user = useUserContext();
  const { openExternalLink } = useLinks();
  const [hasLoginError, setHasLoginError] = useState<boolean>(false);
  const [isSignInLoading, setIsSignInLoading] = useState<boolean>(false);
  const [isDrawerActive, setIsDrawerActive] = useState(false);
  const [isPublishLoading, setIsPublishLoading] = useState(false);
  const { push, isAdminPage, isHomePage, currentRoute } = useLocalRouter();
  const themeType: ThemeType = useMemo(() => (isHomePage ? 'transparentDark' : 'light'), [isHomePage]);

  const socialNetworkFilteredArray = useMemo(
    () => sortArray(pageProps.socialNetworks?.filter((social: DocumentSocialNetwork) => social.state) ?? [], 'order'),
    [pageProps.socialNetworks],
  );

  async function handleSubmitSignIn(email: string, password: string, rememberMe: boolean): Promise<void> {
    try {
      setIsSignInLoading(true);
      setHasLoginError(false);
      await signIn(email, password, rememberMe);
      setIsSignInLoading(false);
    } catch (err) {
      setIsSignInLoading(false);
      setHasLoginError(true);
    }
  }

  async function handleSignOut() {
    await push('/');
    await signUserOut();
  }

  function handleSocialNetworkClick(socialNetwork: DocumentSocialNetwork) {
    openExternalLink(socialNetwork.link);
  }

  async function handlePublishClick() {
    try {
      if (user) {
        setIsPublishLoading(true);
        await triggerVarcelDeploy();
      }
    } finally {
      setIsPublishLoading(false);
    }
  }

  async function handleLogoClick() {
    await push('/');
  }

  return (
    <FeatureIndexView
      userData={user}
      themeType={themeType}
      currentDrawerItem={currentRoute}
      socialNetworks={socialNetworkFilteredArray as DocumentSocialNetwork[]}
      appBarTitle={pageProps?.basicInfo?.companyName ?? 'Seven Arch'}
      splashScreenImageUrl={pageProps?.basicInfoImages?.loadingScreenImage?.url}
      onSingInSubmit={handleSubmitSignIn}
      onDrawerChange={setIsDrawerActive}
      onSignOut={handleSignOut}
      hasLoginError={hasLoginError}
      isSignInLoading={isSignInLoading}
      isDrawerActive={isDrawerActive}
      isAdminPage={isAdminPage}
      isPublishLoading={isPublishLoading}
      onSocialNetworkClick={handleSocialNetworkClick}
      drawerItems={isAdminPage ? adminDrawerItems : mainDrawerItems}
      onPublishClick={handlePublishClick}
      onLogoClick={handleLogoClick}
    >
      <Component {...pageProps} />
    </FeatureIndexView>
  );
}
