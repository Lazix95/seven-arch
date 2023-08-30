import { createGetStaticProps } from '@/utils/ssgUtils';
import { FeatureComingSoonContainer } from '@/features/FeatureComingSoon/FeatureComingSoonContainer';

export interface FeatureContactContainerProps {}

export const getStaticProps = createGetStaticProps([]);

export function FeatureContactContainer({}: FeatureContactContainerProps) {
  return <FeatureComingSoonContainer />;
}
