import { useEffect, useMemo, useState } from 'react';
import { AppProps } from 'next/app';
import { User, signIn, signUserOut, watchForUserData } from '../firebase';
import { UserContextProvider } from '@/context/userContext';
import { FeatureIndexView } from './FeatureIndexView';
import { mainDrawerItems, adminDrawerItems } from '@/constants/mainDrawerItems';
import { useLocalRouter } from '@/hooks/useLocalRouter';
import { createGetStaticProps } from '@/utils/ssgUtils';
import { fetchBasicInfo } from '../firebase/api/basicDataApi';
import { SystemContextProvider } from '@/context/SystemContext';
import { ThemeType } from '@/themes/sharedThemeDefault';
import { fetchSocialNetworks } from '@/features/firebase/api/socialNetworksDataApi';
import { DocumentSocialNetwork } from '@/models/socialNetworks';
import { useLinks } from '@/hooks/useLinks';

export const getStaticProps = createGetStaticProps([fetchBasicInfo, fetchSocialNetworks]);

export function FeatureIndexContainer({ Component, pageProps }: AppProps) {
  const { openExternalLink } = useLinks();
  const [a, b] = useState(process.env);
  const [hasLoginError, setHasLoginError] = useState<boolean>(false);
  const [isSignInLoading, setIsSignInLoading] = useState<boolean>(false);
  const [isDrawerActive, setIsDrawerActive] = useState(false);
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const { push, isAdminPage, isHomePage, currentRoute } = useLocalRouter();
  const themeType: ThemeType = useMemo(() => (isHomePage ? 'transparentDark' : 'light'), [isHomePage]);

  useEffect(() => {
    watchForUserData((user) => {
      setUser?.(user);
    });
  }, []);

  async function handleSubmitSignIn(email: string, password: string): Promise<void> {
    try {
      setIsSignInLoading(true);
      setHasLoginError(false);
      await signIn(email, password);
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

  return (
    <SystemContextProvider>
      <UserContextProvider value={user}>
        <FeatureIndexView
          themeType={themeType}
          currentDrawerItem={currentRoute}
          socialNetworks={pageProps?.socialNetworks}
          appBarTitle={pageProps?.basicInfo?.companyName ?? 'Seven Arch'}
          splashScreenImageUrl={pageProps?.basicInfoImages?.loadingScreenImage?.url}
          onSingInSubmit={handleSubmitSignIn}
          onDrawerChange={setIsDrawerActive}
          onSignOut={handleSignOut}
          hasLoginError={hasLoginError}
          isSignInLoading={isSignInLoading}
          isDrawerActive={isDrawerActive}
          isAdminPage={isAdminPage}
          userData={user}
          onSocialNetworkClick={handleSocialNetworkClick}
          drawerItems={isAdminPage ? adminDrawerItems : mainDrawerItems}
        >
          <Component {...pageProps} />
        </FeatureIndexView>
      </UserContextProvider>
    </SystemContextProvider>
  );
}
