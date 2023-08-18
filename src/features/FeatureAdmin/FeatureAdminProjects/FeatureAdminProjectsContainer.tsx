import { FeatureAdminProjectsView } from './FeatureAdminProjectsView';
import { createGetStaticProps } from '@/utils/ssgUtils';
import { fetchBasicInfo } from '@/features/firebase/api/basicDataApi';

export const getStaticProps = createGetStaticProps([fetchBasicInfo]);

export interface FeatureAdminProjectsContainerProps {}

export function FeatureAdminProjectsContainer({}: FeatureAdminProjectsContainerProps) {
  return <FeatureAdminProjectsView />;
}
