import { FeatureComingSoonContainer } from '@/features/FeatureComingSoon/FeatureComingSoonContainer';
import { createGetStaticProps } from '@/utils/ssgUtils';
import { DataBasicInfo } from '@/features/firebase/api/basicDataApi';

export const getStaticProps = createGetStaticProps([]);

interface FeatureExpertiseContainerProps extends DataBasicInfo {}

export function FeatureExpertiseContainer({}: FeatureExpertiseContainerProps) {
  return <FeatureComingSoonContainer />;
}
