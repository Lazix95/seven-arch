import { StorageReference } from 'firebase/storage';
import { FirebaseImage, getAllImageLinks } from '../utils/firebaseImageUtils';
import { FolderKeys } from '../models/firebaseBaseModels';

export async function fetchSliderImages(folder?: FolderKeys): Promise<DataSliderImages> {
  const sliderImages = await getAllImageLinks({ folder: folder ?? 'sliderImages' });
  return { sliderImages };
}

export async function deleteImageByRef() {}

export interface DataSliderImages {
  readonly sliderImages: FirebaseImage[] | null;
}
