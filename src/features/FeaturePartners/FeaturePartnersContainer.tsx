import { FeatureComingSoonContainer } from '@/features/FeatureComingSoon/FeatureComingSoonContainer';
import { createGetStaticProps } from '@/utils/ssgUtils';

export const getStaticProps = createGetStaticProps([]);

export interface FeaturePartnersContainerProps {}

export function FeaturePartnersContainer({}: FeaturePartnersContainerProps) {
  return <FeatureComingSoonContainer />;
}
