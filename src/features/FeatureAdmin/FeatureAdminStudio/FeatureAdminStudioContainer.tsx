import { FeatureAdminStudioView } from './FeatureAdminStudioView';
import { createGetStaticProps } from '@/utils/ssgUtils';
import { fetchBasicInfo } from '@/features/firebase/api/basicDataApi';

export const getStaticProps = createGetStaticProps([fetchBasicInfo]);

export interface FeatureAdminStudioContainerProps {}

export function FeatureAdminStudioContainer({}: FeatureAdminStudioContainerProps) {
  return <FeatureAdminStudioView />;
}
