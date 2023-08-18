import { FeatureAdminNewsView } from './FeatureAdminNewsView';
import { createGetStaticProps } from '@/utils/ssgUtils';
import { fetchBasicInfo } from '@/features/firebase/api/basicDataApi';

export const getStaticProps = createGetStaticProps([fetchBasicInfo]);

export interface FeatureAdminNewsContainerProps {}

export function FeatureAdminNewsContainer({}: FeatureAdminNewsContainerProps) {
  return <FeatureAdminNewsView />;
}
