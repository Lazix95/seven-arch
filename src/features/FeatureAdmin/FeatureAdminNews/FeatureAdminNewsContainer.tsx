/* eslint-disable react-hooks/exhaustive-deps */
import { FeatureAdminNewsView } from './FeatureAdminNewsView';
import { createGetStaticProps } from '@/utils/ssgUtils';
import { fetchBasicInfo } from '@/features/firebase/api/basicDataApi';
import { fetchSocialNetworks } from '@/features/firebase/api/socialNetworksDataApi';
import { MainArticleSubmitPayload } from '@/features/FeatureAdmin/AdminShared/AdminSharedArticle';
import { useEffect } from 'react';
import { fetchArticleByEntity, saveArticleApi, SaveArticlePayload, updateArticleApi, UpdateArticlePayload } from '@/features/firebase/api/articleApi';
import { useContainerData } from '@/hooks/useContainerData';
import { Article } from '@/models/articleModels';

export const getStaticProps = createGetStaticProps([fetchBasicInfo, fetchSocialNetworks]);

export interface FeatureAdminNewsContainerProps {}

export interface FeatureAdminNewsContainerState {
  article?: Article;
  articleSubmitError?: boolean;
  submitLoading?: boolean;
  articleSubmitLoading?: boolean;
  pageLoading?: boolean;
}

export function FeatureAdminNewsContainer({}: FeatureAdminNewsContainerProps) {
  const { state, updateState } = useContainerData<FeatureAdminNewsContainerState>({});

  useEffect(() => {
    async function fetchArticles() {
      try {
        updateState({ pageLoading: true });
        const article = await fetchArticleByEntity('news');
        console.log(article);
        updateState({ article });
      } finally {
        updateState({ pageLoading: false });
      }
    }

    fetchArticles();
  }, []);

  async function saveArticle(payload: MainArticleSubmitPayload) {
    const formattedPayload: SaveArticlePayload = {
      ...payload,
      link: '/news',
      entity: 'news',
    };

    await saveArticleApi(formattedPayload);
  }

  async function updateArticle(payload: MainArticleSubmitPayload) {
    const formattedPayload: UpdateArticlePayload = {
      id: state.article!.id,
      ...payload,
      link: '/news',
      entity: 'news',
    };

    await updateArticleApi(formattedPayload);
  }

  async function handleSubmitArticle(payload: MainArticleSubmitPayload) {
    try {
      updateState({ articleSubmitLoading: true });
      if (state.article) {
        await updateArticle(payload);
        return;
      }
      await saveArticle(payload);
    } catch (error) {
      updateState({ articleSubmitError: true });
    } finally {
      updateState({ articleSubmitLoading: false });
    }
  }

  return (
    <FeatureAdminNewsView
      article={state.article}
      initialLoading={state.pageLoading}
      isSubmitLoading={state.articleSubmitLoading || state.submitLoading}
      handleArticleSubmit={handleSubmitArticle}
    />
  );
}
