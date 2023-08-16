import { FeatureBasicInfoView } from './FeatureBasicInfoView';
import { createGetStaticProps } from '@/utils/ssgUtils';
import { fetchBasicInfo, DataBasicInfo } from '../firebase/api/basicDataApi';
import { DataSliderImages, fetchSliderImages } from '../firebase/api/mainPageApi';
import { useEffect, useState } from 'react';
import { FirebaseImage } from '../firebase/utils/firebaseImageUtils';

export const getStaticProps = createGetStaticProps([fetchBasicInfo, fetchSliderImages]);

interface FeatureBasicInfoContainerProps extends DataBasicInfo, DataSliderImages {}

export function FeatureBasicInfoContainer({ sliderImages }: FeatureBasicInfoContainerProps) {
  const [localImages, setLocalImages] = useState<FirebaseImage[]>(sliderImages ?? []);

  useEffect(() => {
    async function getImages() {
      const images = await fetchSliderImages('general');
      setLocalImages(images.sliderImages ?? []);
    }
    getImages();
  }, []);

  return <FeatureBasicInfoView images={localImages} />;
}
