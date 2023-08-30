import { FeatureAdminInsightsView } from './FeatureAdminInsightsView';
import { createGetStaticProps } from '@/utils/ssgUtils';

export const getStaticProps = createGetStaticProps([]);

export interface FeatureAdminInsightsContainerProps {}

export function FeatureAdminInsightsContainer({}: FeatureAdminInsightsContainerProps) {
  return <FeatureAdminInsightsView />;
}
