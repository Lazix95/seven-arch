import { createGetStaticProps } from '@/utils/ssgUtils';
import { FeatureComingSoonContainer } from '@/features/FeatureComingSoon/FeatureComingSoonContainer';

export interface FeaturePeopleContainerProps {}

export const getStaticProps = createGetStaticProps([]);

export function FeaturePeopleContainer({}: FeaturePeopleContainerProps) {
  return <FeatureComingSoonContainer />;
}
