import { FeatureAdminPeopleView } from './FeatureAdminPeopleView';
import { createGetStaticProps } from '@/utils/ssgUtils';
import { fetchBasicInfo } from '@/features/firebase/api/basicDataApi';

export const getStaticProps = createGetStaticProps([fetchBasicInfo]);

export interface FeatureAdminPeopleContainerProps {}

export function FeatureAdminPeopleContainer({}: FeatureAdminPeopleContainerProps) {
  return <FeatureAdminPeopleView />;
}
