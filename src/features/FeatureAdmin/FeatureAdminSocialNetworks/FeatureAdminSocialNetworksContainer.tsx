import { fetchBasicInfo } from '@/features/firebase/api/basicDataApi';
import { FeatureAdminSocialNetworksView } from './FeatureAdminSocialNetworksView';
import { createGetStaticProps } from '@/utils/ssgUtils';
import { useContainerData } from '@/hooks/useContainerData';
import { fetchSocialNetworks, saveSocialNetworks } from '@/features/firebase/api/socialNetworksDataApi';
import { DataSocialNetworks } from '../../firebase/api/socialNetworksDataApi';
import { DocumentSocialNetwork, DocumentSocialNetworkWithIcon } from '@/models/socialNetworks';

export interface FeatureSocialNetworksContainerProps extends DataSocialNetworks {}

export interface FeatureSocialNetworksContainerState extends DataSocialNetworks {
  readonly isSubmitLoading: boolean;
}

export const getStaticProps = createGetStaticProps([fetchBasicInfo, fetchSocialNetworks]);

export function FeatureAdminSocialNetworksContainer({ socialNetworks }: FeatureSocialNetworksContainerProps) {
  const { initialLoading, state, updateState } = useContainerData<FeatureSocialNetworksContainerState>({ socialNetworks, isSubmitLoading: false }, [
    fetchBasicInfo,
    () => fetchSocialNetworks({ withIcons: true }),
  ]);

  async function handleSubmit(payload: DocumentSocialNetworkWithIcon[]) {
    const socialNetworksPayload: DocumentSocialNetwork[] = payload.map((item) => ({
      id: item.id,
      name: item.name,
      slug: item.slug,
      state: item.state,
      link: item.link,
      order: item.order,
    }));

    try {
      updateState({ isSubmitLoading: true });
      const socialNetworks = await saveSocialNetworks(socialNetworksPayload);
      updateState({ socialNetworks });
    } finally {
      updateState({ isSubmitLoading: false });
    }
  }

  return <FeatureAdminSocialNetworksView socialNetworks={state.socialNetworks} initLoading={initialLoading} isSubmitLoading={state.isSubmitLoading} onSubmit={handleSubmit} />;
}
