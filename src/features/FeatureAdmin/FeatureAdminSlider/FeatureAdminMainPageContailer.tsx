import { fetchBasicInfo } from '@/features/firebase/api/basicDataApi';
import { createGetStaticProps } from '@/utils/ssgUtils';

export const getStaticProps = createGetStaticProps([fetchBasicInfo]);

export interface FeatureAdminMainPageContainerProps {}

export function FeatureAdminMainPageContainer(props: FeatureAdminMainPageContainerProps) {
  return <div>Slider Page</div>;
}
