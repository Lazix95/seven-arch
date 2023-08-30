import { createGetStaticProps } from '@/utils/ssgUtils';
import { FeatureComingSoonContainer } from '@/features/FeatureComingSoon/FeatureComingSoonContainer';

export interface FeatureInsightsContainerProps {}

export const getStaticProps = createGetStaticProps([]);

export function FeatureInsightsContainer({}: FeatureInsightsContainerProps) {
  return <FeatureComingSoonContainer />;
}
