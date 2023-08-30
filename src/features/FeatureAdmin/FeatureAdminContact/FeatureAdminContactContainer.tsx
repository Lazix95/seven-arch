import { FeatureAdminContactView } from './FeatureAdminContactView';
import { createGetStaticProps } from '@/utils/ssgUtils';

export const getStaticProps = createGetStaticProps([]);

export interface FeatureAdminContactContainerProps {}

export function FeatureAdminContactContainer({}: FeatureAdminContactContainerProps) {
  return <FeatureAdminContactView />;
}
