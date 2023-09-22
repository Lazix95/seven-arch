import { SharedFirebaseImage } from '../shared/SharedFirebaseImage';
import { ExternalImage, FirebaseImage as FirebaseImageType } from '@/firebase/utils/firebaseImageUtils';

export interface MainSliderImageProps {
  image: FirebaseImageType | ExternalImage;
}

export function MainSliderImage({ image }: MainSliderImageProps) {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <SharedFirebaseImage type={'div'} image={image} />
    </div>
  );
}
