/* eslint-disable react-hooks/exhaustive-deps */
import { FeatureHomePageView } from './FeatureHomePageView';
import { createGetStaticProps } from '@/utils/ssgUtils';
import { fetchBasicInfo, DataBasicInfo } from '../firebase/api/basicDataApi';
import { DataSliderImages, fetchSliderImages } from '../firebase/api/homeApi';
import { useEffect, useState } from 'react';
import { FirebaseImage } from '../firebase/utils/firebaseImageUtils';
import { useSystemContext } from '@/context/SystemContext';
import { DataSocialNetworks, fetchSocialNetworks } from '@/features/firebase/api/socialNetworksDataApi';
import { useContainerData } from '@/hooks/useContainerData';

export const getStaticProps = createGetStaticProps([fetchBasicInfo, fetchSliderImages, fetchSocialNetworks]);

 export interface FeatureHomePageContainerProps extends DataBasicInfo, DataSliderImages, DataSocialNetworks {}

export interface FeatureHomePageContainerState extends DataSliderImages {}

export function FeatureHomePageContainer({ sliderImages }: FeatureHomePageContainerProps) {
  const {state} = useContainerData<FeatureHomePageContainerState>({sliderImages}, [fetchSliderImages]);
  const { setFullWidth, resetMainViewMaxWidthToDefault } = useSystemContext();

  useEffect(() => {
    setFullWidth();
    return () => {
      resetMainViewMaxWidthToDefault();
    };
  }, []);

  async function handleSubscribe(email: string) {}

  return <FeatureHomePageView images={state.sliderImages || []} onSubscribe={handleSubscribe} />;
}
