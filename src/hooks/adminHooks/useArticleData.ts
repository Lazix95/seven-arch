/* eslint-disable react-hooks/exhaustive-deps */
import { MainArticleSubmitPayload, SubArticleSubmitPayload } from '@/features/FeatureAdmin/AdminShared/AdminSharedArticle';
import {
  fetchArticleByEntity,
  saveArticleApi,
  SaveArticlePayload,
  saveSubArticleApi,
  SaveSubArticlePayload,
  updateArticleApi,
  UpdateArticlePayload,
  updateSubArticleApi,
  UpdateSubArticlePayload,
} from '@/features/firebase/api/articleApi';
import { EntityKeys } from '@/features/firebase/models/firebaseBaseModels';
import { Article, SubArticle } from '@/models/articleModels';
import { useContainerData } from '@/hooks/useContainerData';
import { useEffect } from 'react';

export interface UseArticleDataState {
  isArticleLoading?: boolean;
  isArticleSubmitLoading?: boolean;
  hasArticleSubmitError?: boolean;
  article?: Article;
}

export function useArticleData({ entity, link, subEntity }: { entity: EntityKeys; link: string; subEntity?: EntityKeys }) {
  const { state, updateState } = useContainerData<UseArticleDataState>({});

  useEffect(() => {
    async function fetchArticles() {
      try {
        updateState({ isArticleLoading: true });
        const article = await fetchArticleByEntity('news');
        console.log(article);
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

    return await saveArticleApi(formattedPayload);
  }

  async function updateArticle(payload: MainArticleSubmitPayload, id: string): Promise<Article> {
    const formattedPayload: UpdateArticlePayload = {
      id: id,
      ...payload,
      link,
      entity,
    };

    return await updateArticleApi(formattedPayload);
  }

  async function saveSubArticle(payload: SubArticleSubmitPayload): Promise<SubArticle> {
    if (!subEntity) throw new Error('subEntity is required');

    const formattedPayload: SaveSubArticlePayload = {
      ...payload,
      link,
      entity,
      subEntity,
    };

    return await saveSubArticleApi(formattedPayload);
  }

  async function updateSubArticle(payload: SubArticleSubmitPayload, id?: string): Promise<SubArticle> {
    if (!subEntity) throw new Error('subEntity is required');

    const formattedPayload: UpdateSubArticlePayload = {
      id: id ?? state.article?.id ?? '',
      ...payload,
      link,
      entity,
      subEntity,
    };
    return await updateSubArticleApi(formattedPayload);
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

  async function handleSubmitSubArticle(payload: SubArticleSubmitPayload) {
    try {
      updateState({ isArticleSubmitLoading: true });
      if (state.article) {
        await updateSubArticle(payload, state.article.id);
        return;
      }
      await saveSubArticle(payload);
    } catch (error) {
      updateState({ hasArticleSubmitError: true });
    } finally {
      updateState({ isArticleSubmitLoading: false });
    }
  }

  return {
    saveArticle,
    updateArticle,
    saveSubArticle,
    updateSubArticle,
    article: state.article,
    isArticleSubmitLoading: state.isArticleSubmitLoading,
    isArticleLoading: state.isArticleLoading,
    handleSubmitArticle,
    handleSubmitSubArticle,
  };
}
