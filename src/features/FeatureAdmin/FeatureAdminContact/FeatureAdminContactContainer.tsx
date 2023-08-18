import { FeatureAdminContactView } from './FeatureAdminContactView';
import { createGetStaticProps } from '@/utils/ssgUtils';
import { fetchBasicInfo } from '@/features/firebase/api/basicDataApi';

export const getStaticProps = createGetStaticProps([fetchBasicInfo]);

export interface FeatureAdminContactContainerProps {}

export function FeatureAdminContactContainer({}: FeatureAdminContactContainerProps) {
  return <FeatureAdminContactView />;
}
