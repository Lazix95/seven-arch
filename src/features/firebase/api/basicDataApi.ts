import { getDocument, getImageLink } from '../firebase';

export async function fetchBasicInfo(): Promise<FetchBasicInfo> {
  const basicInfo = await getDocument<FetchBasicInfo['basicInfo']>('general', 'basicInfo');
  const images = { loadingScreenImage: await getImageLink({ folder: 'general', name: 'loadingScreenImage' }) };
  const sliderImage1 = await getImageLink({ folder: 'general', name: 'sliderImage1' });
  const sliderImage2 = await getImageLink({ folder: 'general', name: 'sliderImage2' });
  const sliderImage3 = await getImageLink({ folder: 'general', name: 'sliderImage3' });
  return { basicInfo, savedImages: images, sliderImages: { sliderImage1, sliderImage2, sliderImage3 } };
}

export async function fetchSliderImages(): Promise<{ sliderImages: { sliderImage1: string | null; sliderImage2: string | null; sliderImage3: string | null } }> {
  const sliderImage1 = await getImageLink({ folder: 'general', name: 'sliderImage1' });
  const sliderImage2 = await getImageLink({ folder: 'general', name: 'sliderImage2' });
  const sliderImage3 = await getImageLink({ folder: 'general', name: 'sliderImage3' });
  return { sliderImages: { sliderImage1, sliderImage2, sliderImage3 } };
}

interface FetchBasicInfo {
  basicInfo: { companyName: string };
  savedImages: { loadingScreenImage: string | null };
  sliderImages: { sliderImage1: string | null; sliderImage2: string | null; sliderImage3: string | null };
}
