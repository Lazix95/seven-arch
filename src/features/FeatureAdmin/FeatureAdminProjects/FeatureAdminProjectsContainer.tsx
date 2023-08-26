import { FeatureAdminProjectsView } from './FeatureAdminProjectsView';
import { createGetStaticProps } from '@/utils/ssgUtils';
import { fetchBasicInfo } from '@/features/firebase/api/basicDataApi';
import { fetchSocialNetworks } from '@/features/firebase/api/socialNetworksDataApi';

export const getStaticProps = createGetStaticProps([fetchBasicInfo, fetchSocialNetworks]);

export interface FeatureAdminProjectsContainerProps {}

export function FeatureAdminProjectsContainer({}: FeatureAdminProjectsContainerProps) {
  return <FeatureAdminProjectsView />;
}
