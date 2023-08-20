import { fetchBasicInfo } from '@/features/firebase/api/basicDataApi';
import { FeatureSocialNetworksView } from './FeatureSocialNetworksView';
import { createGetStaticProps } from '@/utils/ssgUtils';
import { socialNetworksMap } from '@/constants/socialNetworkItems';
import { DocumentSocialNetworkWithIcon, SocialNetwork } from '@/models/socialNetworks';
import { useContainerData } from '@/hooks/useContainerData';
import { fetchSocialNetworks } from '@/features/firebase/api/socialNetworksDataApi';
import { DataSocialNetworks } from '../../firebase/api/socialNetworksDataApi';

export interface FeatureSocialNetworksContainerProps extends DataSocialNetworks {}

export interface FeatureSocialNetworksContainerState extends DataSocialNetworks {
  readonly isSubmitLoading: boolean;
}

export const getStaticProps = createGetStaticProps([fetchBasicInfo, fetchSocialNetworks]);

export function FeatureSocialNetworksContainer({ socialNetworks }: FeatureSocialNetworksContainerProps) {
  const { initialLoading, state } = useContainerData<FeatureSocialNetworksContainerState>({ socialNetworks, isSubmitLoading: false }, [
    fetchBasicInfo,
    () => fetchSocialNetworks({ withIcons: true }),
  ]);

  function handleSocialNetworkToggle(socialNetwork: DocumentSocialNetworkWithIcon, state: boolean) {
    console.log(socialNetwork, state);
  }

  return (
    <FeatureSocialNetworksView
      socialNetworksMap={socialNetworksMap}
      socialNetworks={state.socialNetworks}
      initLoading={initialLoading}
      isSubmitLoading={state.isSubmitLoading}
      onSocialNetworkToggle={handleSocialNetworkToggle}
      data={[]}
    />
  );
}
