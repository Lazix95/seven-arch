import { FeatureAdminStudioView } from './FeatureAdminStudioView';
import { createGetStaticProps } from '@/utils/ssgUtils';

export const getStaticProps = createGetStaticProps([]);

export interface FeatureAdminStudioContainerProps {}

export function FeatureAdminStudioContainer({}: FeatureAdminStudioContainerProps) {
  return <FeatureAdminStudioView />;
}
