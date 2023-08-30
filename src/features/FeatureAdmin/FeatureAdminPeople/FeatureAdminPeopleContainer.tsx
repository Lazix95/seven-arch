import { FeatureAdminPeopleView } from './FeatureAdminPeopleView';
import { createGetStaticProps } from '@/utils/ssgUtils';

export const getStaticProps = createGetStaticProps([]);

export interface FeatureAdminPeopleContainerProps {}

export function FeatureAdminPeopleContainer({}: FeatureAdminPeopleContainerProps) {
  return <FeatureAdminPeopleView />;
}
