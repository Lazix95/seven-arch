/* eslint-disable react-hooks/exhaustive-deps */
import { FeatureHomePageView } from './FeatureHomePageView';
import { createGetStaticProps } from '@/utils/ssgUtils';
import { fetchBasicInfo, DataBasicInfo } from '../firebase/api/basicDataApi';
import { DataSliderImages, fetchSliderImages } from '../firebase/api/homeApi';
import { useEffect, useState } from 'react';
import { FirebaseImage } from '../firebase/utils/firebaseImageUtils';
import { useSystemContext } from '@/context/SystemContext';

export const getStaticProps = createGetStaticProps([fetchBasicInfo, fetchSliderImages]);

interface FeatureHomePageContainerProps extends DataBasicInfo, DataSliderImages {}

export function FeatureHomePageContainer({ sliderImages }: FeatureHomePageContainerProps) {
  const [localImages, setLocalImages] = useState<FirebaseImage[]>(sliderImages ?? []);
  const { setFullWidth, resetMainViewMaxWidthToDefault } = useSystemContext();

  useEffect(() => {
    async function getImages() {
      const images = await fetchSliderImages();
      setLocalImages(images.sliderImages ?? []);
      setFullWidth();
      return () => {
        resetMainViewMaxWidthToDefault();
      };
    }
    getImages();
  }, []);

  return <FeatureHomePageView images={localImages} />;
}
