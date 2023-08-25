import { FeatureAdminNewsView } from './FeatureAdminNewsView';
import { createGetStaticProps } from '@/utils/ssgUtils';
import { fetchBasicInfo } from '@/features/firebase/api/basicDataApi';
import { fetchSocialNetworks } from '@/features/firebase/api/socialNetworksDataApi';
import { ArticleSubmitPayload } from '@/features/FeatureAdmin/AdminShared/AdminSharedArticle';
import { storeEntity } from '@/features/firebase/utils/firebaseEntityUtils';
import { useEffect } from 'react';
import { fetchAllArticles } from '@/features/firebase/api/articleApi';

export const getStaticProps = createGetStaticProps([fetchBasicInfo, fetchSocialNetworks]);

export interface FeatureAdminNewsContainerProps {}

export function FeatureAdminNewsContainer({}: FeatureAdminNewsContainerProps) {
  useEffect(() => {
    async function getArticle() {
      const articles = await fetchAllArticles();
      console.log('articles: ', articles);
    }

    getArticle();
  }, []);

  async function saveArticle(payload: ArticleSubmitPayload) {
    const { image, ...rest } = payload;
    await storeEntity({ entity: 'articles', payload: rest });
  }

  return <FeatureAdminNewsView handleArticleSubmit={saveArticle} />;
}
