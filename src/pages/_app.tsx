import { FeatureIndexContainer } from '@/features/FeatureIndex/FeatureIndexContainer';
import './../styles/globals.scss';
import { UserContextProvider } from '@/context/userContext';
import { ToastMessageProvider } from '@/context/ToastMessageContext';
import { SystemContextProvider } from '@/context/SystemContext';

export default function IndexContainer(props: any) {
  return (
    <ToastMessageProvider>
      <SystemContextProvider>
        <UserContextProvider>
          <FeatureIndexContainer {...props} />;
        </UserContextProvider>
      </SystemContextProvider>
    </ToastMessageProvider>
  );
}
