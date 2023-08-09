import { Breakpoint } from '@mui/material';
import { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { User, signIn, signUserOut, watchForUserData } from '../firebase';
import { UserContextProvider } from '../firebase/context/userContext';
import { FeatureIndexView } from './FeatureIndexView';
import { mainDrawerItems } from '@/constants/mainDrawerItems';
import { StaticDataProvider } from '@/hooks/useStaticPropsData';

export function FeatureIndexContainer({ Component, pageProps }: AppProps) {
  const [hasLoginError, setHasLoginError] = useState<boolean>(false);
  const [isSignInLoading, setIsSignInLoading] = useState<boolean>(false);
  const [isDrawerActive, setIsDrawerActive] = useState(false);
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const { asPath, push } = useRouter();
  const isAdminPage = asPath.includes('admin');

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
      <StaticDataProvider>
        <FeatureIndexView
          appBarTitle={pageProps.basicInfo.companyName}
          splashScreenImageUrl={pageProps.savedImages.loadingScreenImage}
          onSingInSubmit={handleSubmitSignIn}
          onDrawerChange={setIsDrawerActive}
          onSignOut={handleSignOut}
          hasLoginError={hasLoginError}
          isSignInLoading={isSignInLoading}
          isDrawerActive={isDrawerActive}
          isAdminPage={isAdminPage}
          userData={user}
          drawerItems={mainDrawerItems}
        >
          <Component {...pageProps} />
        </FeatureIndexView>
      </StaticDataProvider>
    </UserContextProvider>
  );
}
