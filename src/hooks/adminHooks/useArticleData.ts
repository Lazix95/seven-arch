/* eslint-disable react-hooks/exhaustive-deps */
import { MainArticleSubmitPayload } from '@/features/FeatureAdmin/AdminShared/AdminSharedArticle';
import { fetchArticleByEntity, saveArticleApi, SaveArticlePayload, updateArticleApi, UpdateArticlePayload } from '@/features/firebase/api/articleApi';
import { EntityKeys } from '@/features/firebase/models/firebaseBaseModels';
import { Article } from '@/models/articleModels';
import { useContainerData } from '@/hooks/useContainerData';
import { useEffect } from 'react';

export interface UseArticleDataState {
  isArticleLoading?: boolean;
  isArticleSubmitLoading?: boolean;
  hasArticleSubmitError?: boolean;
  article?: Article;
}

export function useArticleData({ entity, link }: { entity: EntityKeys; link: string }) {
  const { state, updateState } = useContainerData<UseArticleDataState>({});

  useEffect(() => {
    async function fetchArticles() {
      try {
        updateState({ isArticleLoading: true });
        const article = await fetchArticleByEntity(entity);
        updateState({ article });
      } finally {
        updateState({ isArticleLoading: false });
      }
    }

    fetchArticles();
  }, []);

  async function saveArticle(payload: MainArticleSubmitPayload): Promise<Article> {
    const formattedPayload: SaveArticlePayload = {
      ...payload,
      link,
      entity,
    };

    const article = await saveArticleApi(formattedPayload);
    updateState({ article });
    return article;
  }

  async function updateArticle(payload: MainArticleSubmitPayload, id: string): Promise<Article> {
    console.log('updateArticle', payload);
    const formattedPayload: UpdateArticlePayload = {
      id: id,
      ...payload,
      link,
      entity,
    } as UpdateArticlePayload;

    const article = await updateArticleApi(formattedPayload);
    updateState({ article });
    return article;
  }

  async function handleSubmitArticle(payload: MainArticleSubmitPayload) {
    try {
      updateState({ isArticleSubmitLoading: true });
      if (state.article) {
        await updateArticle(payload, state.article.id);
        return;
      }
      await saveArticle(payload);
    } catch (error) {
      updateState({ hasArticleSubmitError: true });
    } finally {
      updateState({ isArticleSubmitLoading: false });
    }
  }

  return {
    saveArticle,
    updateArticle,
    article: state.article,
    isArticleSubmitLoading: state.isArticleSubmitLoading,
    isArticleLoading: state.isArticleLoading,
    handleSubmitArticle,
  };
}
