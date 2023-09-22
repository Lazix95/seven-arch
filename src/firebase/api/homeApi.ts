import { ExternalImage, FirebaseImage, getAllImageLinks } from '../utils/firebaseImageUtils';

export async function fetchSliderImages(): Promise<DataSliderImages> {
  const sliderImages = await getAllImageLinks({ folder: 'sliderImages' });
  return { sliderImages };
}

export interface DataSliderImages {
  readonly sliderImages: (FirebaseImage | ExternalImage)[] | null;
}
