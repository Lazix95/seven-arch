import { FirebaseImage } from '@/features/firebase/components/FirebaseImage';
export interface SharedSliderImageProps {
  name: string;
}

export function SharedSliderImage({ name }: SharedSliderImageProps) {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <FirebaseImage type={'div'} folder={'general'} name={name} />
    </div>
  );
}
