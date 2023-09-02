import { MainArticleSubmitPayload } from '@/features/FeatureAdmin/AdminShared/AdminSharedArticle';
import { fetchArticleByEntity, saveArticleApi, SaveArticlePayload, updateArticleApi, UpdateArticlePayload } from '@/features/firebase/api/articleApi';
import { EntityKeys } from '@/features/firebase/models/firebaseBaseModels';
import { Article } from '@/models/articleModels';
import { useContainerData } from '@/hooks/useContainerData';
import { useCallback, useEffect, useMemo } from 'react';

export interface UseArticleDataProps {
  readonly entity: EntityKeys;
  readonly link: string;
  readonly options?: {
    readonly initialLoading?: boolean;
  };
}

export interface UseArticleDataState {
  isArticleLoading?: boolean;
  isArticleSubmitLoading?: boolean;
  hasArticleSubmitError?: boolean;
  articlePayload?: MainArticleSubmitPayload | null;
  order?: number;
  article?: Article;
}

export function useArticleData({ entity, link, options }: UseArticleDataProps) {
  const { state, updateState } = useContainerData<UseArticleDataState>({
    isArticleLoading: options?.initialLoading ?? false,
  });

  useEffect(() => {
    async function fetchArticles() {
      try {
        updateState({ isArticleLoading: true });
        const article = await fetchArticleByEntity(entity);
        updateState({ article, order: article?.order });
      } finally {
        updateState({ isArticleLoading: false });
      }
    }

    fetchArticles();
  }, []);

  function handleSavePayload(payload: MainArticleSubmitPayload) {
    console.log('handleSavePayload', payload);
    updateState({ articlePayload: payload });
  }

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

  const saveArticleMemo = useCallback(saveArticle, [entity, link, updateState]);
  const updateArticleMemo = useCallback(updateArticle, [entity, link, updateState]);

  async function handleSubmitArticle(payload: MainArticleSubmitPayload | null | undefined = state.articlePayload) {
    console.log(payload, state.articlePayload);
    if (!payload) return;
    try {
      updateState({ isArticleSubmitLoading: true });
      if (state.article) {
        await updateArticleMemo(payload, state.article.id);
        updateState({ articlePayload: null });
        return;
      }
      await saveArticleMemo(payload);
      updateState({ articlePayload: null });
    } catch (error) {
      updateState({ hasArticleSubmitError: true });
    } finally {
      updateState({ isArticleSubmitLoading: false });
    }
  }

  async function handleOrderChange(order: number) {
    if (!state.article) return;
    console.log('handleOrderChange');
    await updateArticleMemo({ order, subArticles: state.article.subArticles } as unknown as MainArticleSubmitPayload, state.article.id);
  }

  function handleChangTempOrder(order: number) {
    console.log(order);
    updateState({ order });
  }

  const handleSubmitArticleMemo = useCallback(handleSubmitArticle, [saveArticleMemo, state.article, state.articlePayload, updateArticleMemo, updateState]);
  const handleSavePayloadMemo = useCallback(handleSavePayload, [updateState]);
  const handleOrderChangeMemo = useCallback(handleOrderChange, [state.article, updateArticleMemo]);
  const handleChangTempOrderMemo = useCallback(handleChangTempOrder, [updateState]);

  return useMemo(
    () => ({
      article: state.article,
      isArticleSubmitLoading: state.isArticleSubmitLoading,
      isArticleLoading: state.isArticleLoading,
      handleSubmitArticle: handleSubmitArticleMemo,
      handleSavePayload: handleSavePayloadMemo,
      handleOrderChange: handleOrderChangeMemo,
      handleChangTempOrder: handleChangTempOrderMemo,
      order: state.order,
    }),
    [state.article, state.isArticleSubmitLoading, state.isArticleLoading, state.order, handleSubmitArticleMemo, handleSavePayloadMemo, handleOrderChangeMemo],
  );
}
