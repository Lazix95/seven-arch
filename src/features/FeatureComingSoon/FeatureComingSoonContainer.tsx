import { FeatureComingSoonView } from '@/features/FeatureComingSoon/FeatureComingSoonView';
import { createGetStaticProps } from '@/utils/ssgUtils';
import { fetchBasicInfo } from '@/features/firebase/api/basicDataApi';
import { fetchSocialNetworks } from '@/features/firebase/api/socialNetworksDataApi';

export const getStaticProps = createGetStaticProps([fetchBasicInfo, fetchSocialNetworks]);

export interface FeatureComingSoonContainerProps {}

export function FeatureComingSoonContainer({}: FeatureComingSoonContainerProps) {
  return <FeatureComingSoonView />;
}
