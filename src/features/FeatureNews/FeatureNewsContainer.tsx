import { FeatureComingSoonContainer } from '@/features/FeatureComingSoon/FeatureComingSoonContainer';
import { createGetStaticProps } from '@/utils/ssgUtils';

export const getStaticProps = createGetStaticProps([]);

export interface FeatureNewsContainerProps {}

export function FeatureNewsContainer({}: FeatureNewsContainerProps) {
  return <FeatureComingSoonContainer />;
}
