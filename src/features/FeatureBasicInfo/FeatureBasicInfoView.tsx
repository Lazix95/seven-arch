import { SharedGridContainer } from '../shared/SharedDrawer/SharedGridContainer';
import { SharedSlider } from '../shared/SharedSlider/SharedSlider';
import { SharedGridItem } from '../shared/grid/SharedGridItem';

export function FeatureBasicInfoView() {
  return (
    <>
      <div>
        <SharedSlider />
      </div>
      <SharedGridContainer centerX column mt={0} mb={3} pt={0}>
        <SharedGridItem>{/* <FirebaseImage folder={'general'} name={'spalashScreen'} /> */}</SharedGridItem>
      </SharedGridContainer>
    </>
  );
}
