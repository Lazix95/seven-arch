import { FeatureComingSoonContainer } from '@/features/FeatureComingSoon/FeatureComingSoonContainer';
import { createGetStaticProps } from '@/utils/ssgUtils';

export interface FeatureStudioContainerProps {}

export const getStaticProps = createGetStaticProps([]);

export function FeatureStudioContainer({}: FeatureStudioContainerProps) {
  return <FeatureComingSoonContainer />;
}
