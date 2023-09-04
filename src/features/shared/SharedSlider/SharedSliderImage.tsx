import { FirebaseImage } from '@/features/firebase/components/FirebaseImage';
import { ExternalImage, FirebaseImage as FirebaseImageType } from '@/features/firebase/utils/firebaseImageUtils';

export interface SharedSliderImageProps {
  image: FirebaseImageType | ExternalImage;
}

export function SharedSliderImage({ image }: SharedSliderImageProps) {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <FirebaseImage type={'div'} image={image} />
    </div>
  );
}
