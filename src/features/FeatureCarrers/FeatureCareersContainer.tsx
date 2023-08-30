import { createGetStaticProps } from '@/utils/ssgUtils';
import { FeatureComingSoonContainer } from '@/features/FeatureComingSoon/FeatureComingSoonContainer';

export interface FeatureCareersContainerProps {}

export const getStaticProps = createGetStaticProps([]);

export function FeatureCareersContainer({}: FeatureCareersContainerProps) {
  return <FeatureComingSoonContainer />;
}
