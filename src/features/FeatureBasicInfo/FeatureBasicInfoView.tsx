import { FirebaseImage } from '../firebase/components/FirebaseImage';
import { SharedGridContainer } from '../shared/SharedDrawer/SharedGridContainer';
import { SharedGridItem } from '../shared/grid/SharedGridItem';

export function FeatureBasicInfoView() {
  return (
    <SharedGridContainer centerX column mt={0} mb={3} pt={0}>
      <SharedGridItem>{/* <FirebaseImage folder={'general'} name={'spalashScreen'} /> */}</SharedGridItem>
    </SharedGridContainer>
  );
}
