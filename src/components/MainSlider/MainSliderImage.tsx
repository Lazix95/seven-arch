import { SharedFirebaseImage } from '@/features/firebase/components/FirebaseImage';
import { ExternalImage, FirebaseImage as FirebaseImageType } from '@/features/firebase/utils/firebaseImageUtils';

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
