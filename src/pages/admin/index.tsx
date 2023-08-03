import { FeatureBasicInfoContainer, getStaticProps } from '../../features/FeatureBasicInfo/FeatureBasicInfoContainer';

export { getStaticProps };
export default function FeatureBasicInfoAdminContainer(props: any) {
  return <FeatureBasicInfoContainer admin={true} {...props} />;
}
