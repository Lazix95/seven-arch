/* eslint-disable react-hooks/exhaustive-deps */
import { FeatureHomePageView } from './FeatureHomePageView';
import { createGetStaticProps } from '@/utils/ssgUtils';
import { fetchBasicInfo, DataBasicInfo } from '../firebase/api/basicDataApi';
import { DataSliderImages, fetchSliderImages } from '../firebase/api/homeApi';
import { useEffect, useMemo } from 'react';
import { useSystemContext } from '@/context/SystemContext';
import { DataSocialNetworks, fetchSocialNetworks } from '@/features/firebase/api/socialNetworksDataApi';
import { useContainerData } from '@/hooks/useContainerData';
import { DataArticles, fetchArticles } from '@/features/firebase/api/articleApi';
import { filterActiveArticles } from '@/utils/articleUtils';

export const getStaticProps = createGetStaticProps([fetchBasicInfo, fetchSliderImages, fetchSocialNetworks, fetchArticles]);

export interface FeatureHomePageContainerProps extends DataBasicInfo, DataSliderImages, DataSocialNetworks, DataArticles {}

export interface FeatureHomePageContainerState extends DataSliderImages, DataArticles {}

export function FeatureHomePageContainer({ sliderImages, articles }: FeatureHomePageContainerProps) {
  const { state } = useContainerData<FeatureHomePageContainerState>({ sliderImages, articles }, [fetchSliderImages, fetchArticles]);
  const { setFullWidth, resetMainViewMaxWidthToDefault } = useSystemContext();

  useEffect(() => {
    setFullWidth();
    return () => {
      resetMainViewMaxWidthToDefault();
    };
  }, []);

  const activeArticles = useMemo(() => {
    return filterActiveArticles(state.articles);
  }, [state.articles]);

  async function handleSubscribe(email: string) {
    console.log(email);
  }

  return <FeatureHomePageView articles={activeArticles} images={state.sliderImages || []} onSubscribe={handleSubscribe} />;
}
