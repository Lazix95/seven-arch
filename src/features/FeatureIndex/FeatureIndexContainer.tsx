import { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import { User, signIn, signUserOut, watchForUserData } from '../firebase';
import { UserContextProvider } from '../firebase/context/userContext';
import { FeatureIndexView } from './FeatureIndexView';
import { mainDrawerItems, adminDrawerItems } from '@/constants/mainDrawerItems';
import { useLocalRouter } from '@/hooks/useLocalRouter';
import { createGetStaticProps } from '@/utils/ssgUtils';
import { fetchBasicInfo } from '../firebase/api/basicDataApi';

export const getStaticProps = createGetStaticProps([fetchBasicInfo]);

export function FeatureIndexContainer({ Component, pageProps }: AppProps) {
  const [hasLoginError, setHasLoginError] = useState<boolean>(false);
  const [isSignInLoading, setIsSignInLoading] = useState<boolean>(false);
  const [isDrawerActive, setIsDrawerActive] = useState(false);
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const { push, isAdminPage } = useLocalRouter();

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

  function handleSignOut() {
    push('/');
    signUserOut();
  }

  return (
    <UserContextProvider value={user}>
      <FeatureIndexView
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
        drawerItems={isAdminPage ? adminDrawerItems : mainDrawerItems}
      >
        <Component {...pageProps} />
      </FeatureIndexView>
    </UserContextProvider>
  );
}
