import { FeatureAdminCareersView } from './FeatureAdminCareersView';
import { createGetStaticProps } from '@/utils/ssgUtils';
import { fetchBasicInfo } from '@/features/firebase/api/basicDataApi';

export const getStaticProps = createGetStaticProps([fetchBasicInfo]);

export interface FeatureAdminCareersContainerProps {}

export function FeatureAdminCareersContainer({}: FeatureAdminCareersContainerProps) {
  return <FeatureAdminCareersView />;
}
