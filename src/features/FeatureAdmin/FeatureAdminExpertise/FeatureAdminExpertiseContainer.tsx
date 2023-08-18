import { FeatureAdminExpertiseView } from './FeatureAdminExpertiseView';
import { createGetStaticProps } from '@/utils/ssgUtils';
import { fetchBasicInfo } from '@/features/firebase/api/basicDataApi';

export const getStaticProps = createGetStaticProps([fetchBasicInfo]);

export interface FeatureAdminExpertiseContainerProps {}

export function FeatureAdminExpertiseContainer({}: FeatureAdminExpertiseContainerProps) {
  return <FeatureAdminExpertiseView />;
}
