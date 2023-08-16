import { SharedFirebaseImage } from '../firebase/components/FirebaseImage/SharedFirebaseImage';
import { FirebaseImage } from '../firebase/utils/firebaseImageUtils';
import { SharedGridContainer } from '../shared/SharedDrawer/SharedGridContainer';
import { SharedSlider } from '../shared/SharedSlider/SharedSlider';
import { SharedGridItem } from '../shared/grid/SharedGridItem';

interface FeatureBasicInfoViewProps {
  images: FirebaseImage[];
}

export function FeatureBasicInfoView({ images }: FeatureBasicInfoViewProps) {
  return (
    <>
      <div>
        <SharedSlider images={images} />
      </div>
      <SharedGridContainer centerX column mt={0} mb={3} pt={0}>
        <SharedGridItem>
          <SharedFirebaseImage image={images[0]} text="awdawd" />
        </SharedGridItem>
      </SharedGridContainer>
    </>
  );
}
