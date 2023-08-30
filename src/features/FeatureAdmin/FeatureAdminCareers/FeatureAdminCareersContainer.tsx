import { FeatureAdminCareersView } from './FeatureAdminCareersView';
import { createGetStaticProps } from '@/utils/ssgUtils';

export const getStaticProps = createGetStaticProps([]);

export interface FeatureAdminCareersContainerProps {}

export function FeatureAdminCareersContainer({}: FeatureAdminCareersContainerProps) {
  return <FeatureAdminCareersView />;
}
