import { FirebaseImage } from '@/features/firebase/components/FirebaseImage';
export interface SharedSliderImageProps {}

export function SharedSliderImage({}: SharedSliderImageProps) {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <FirebaseImage type={'div'} folder={'general'} name={'loadingScreenImage'} />
    </div>
  );
}
