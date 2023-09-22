import { fetchBasicInfo } from '@/firebase/api/basicDataApi';
import { FeatureAdminSocialNetworksView } from './FeatureAdminSocialNetworksView';
import { createGetStaticProps } from '@/utils/ssgUtils';
import { useContainerData } from '@/hooks/useContainerData';
import { fetchSocialNetworks, saveSocialNetworks } from '@/firebase/api/socialNetworksDataApi';
import { DataSocialNetworks } from '@/firebase/api/socialNetworksDataApi';
import { DocumentSocialNetwork } from '@/models/socialNetworks';

export interface FeatureSocialNetworksContainerProps extends DataSocialNetworks {}

export interface FeatureSocialNetworksContainerState extends DataSocialNetworks {
  readonly isSubmitLoading: boolean;
}

export const getStaticProps = createGetStaticProps([]);

export function FeatureAdminSocialNetworksContainer({ socialNetworks }: FeatureSocialNetworksContainerProps) {
  const { initialLoading, state, updateState } = useContainerData<FeatureSocialNetworksContainerState>({ socialNetworks, isSubmitLoading: false }, [
    fetchBasicInfo,
    fetchSocialNetworks,
  ]);

  async function handleSubmit(payload: DocumentSocialNetwork[]) {
    try {
      updateState({ isSubmitLoading: true });
      const socialNetworks = await saveSocialNetworks(payload);
      updateState({ socialNetworks });
    } finally {
      updateState({ isSubmitLoading: false });
    }
  }

  return (
    <FeatureAdminSocialNetworksView
      socialNetworks={state.socialNetworks}
      initLoading={initialLoading}
      isSubmitLoading={state.isSubmitLoading}
      onSubmit={handleSubmit}
    />
  );
}
