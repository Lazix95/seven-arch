import { FeatureAdminInsightsView } from './FeatureAdminInsightsView';
import { createGetStaticProps } from '@/utils/ssgUtils';
import { fetchBasicInfo } from '@/features/firebase/api/basicDataApi';

export const getStaticProps = createGetStaticProps([fetchBasicInfo]);

export interface FeatureAdminInsightsContainerProps {}

export function FeatureAdminInsightsContainer({}: FeatureAdminInsightsContainerProps) {
  return <FeatureAdminInsightsView />;
}
