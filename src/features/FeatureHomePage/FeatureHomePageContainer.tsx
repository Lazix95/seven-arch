/* eslint-disable react-hooks/exhaustive-deps */
import { FeatureHomePageView } from './FeatureHomePageView';
import { createGetStaticProps } from '@/utils/ssgUtils';
import { DataBasicInfo } from '@/firebase/api/basicDataApi';
import { DataSliderImages, fetchSliderImages } from '@/firebase/api/homeApi';
import { useEffect, useMemo } from 'react';
import { useSystemContext } from '@/context/SystemContext';
import { DataSocialNetworks } from '@/firebase/api/socialNetworksDataApi';
import { useContainerData } from '@/hooks/useContainerData';
import { DataArticles, fetchArticles } from '@/firebase/api/articleApi';
import { filterActiveArticles } from '@/utils/articleUtils';
import { Article, SubArticle } from '@/models/articleModels';
import { useLinks } from '@/hooks/useLinks';
import { sortArray } from '@/utils/arrayUtils';

export const getStaticProps = createGetStaticProps([fetchSliderImages, fetchArticles]);

export interface FeatureHomePageContainerProps extends DataBasicInfo, DataSliderImages, DataSocialNetworks, DataArticles {}

export interface FeatureHomePageContainerState extends DataSliderImages, DataArticles {}

export function FeatureHomePageContainer({ sliderImages, articles }: FeatureHomePageContainerProps) {
  const { state } = useContainerData<FeatureHomePageContainerState>({ sliderImages, articles });
  const { setFullWidth, resetMainViewMaxWidthToDefault, setIsTransparentAppBar } = useSystemContext();
  const { openInternalLink, openExternalLink, isExternalLink } = useLinks();

  useEffect(() => {
    setFullWidth();
    setIsTransparentAppBar(true);
    return () => {
      resetMainViewMaxWidthToDefault();
      setIsTransparentAppBar(false);
    };
  }, []);

  const sortedSliderImages = useMemo(() => {
    return sortArray(state.sliderImages || [], 'order');
  }, [state.sliderImages]);

  const activeArticles = useMemo(() => {
    return filterActiveArticles(state.articles);
  }, [state.articles]);

  function handleArticleClick(article: Article | SubArticle) {
    if (isExternalLink(article.link)) {
      openExternalLink(article.link);
      return;
    }
    openInternalLink(article.link);
  }

  async function handleSubscribe(email: string) {
    console.log(email);
  }

  return (
    <FeatureHomePageView
      articles={activeArticles}
      images={sortedSliderImages}
      onSubscribe={handleSubscribe}
      onSubArticleClick={handleArticleClick}
      onArticleCLick={handleArticleClick}
    />
  );
}
