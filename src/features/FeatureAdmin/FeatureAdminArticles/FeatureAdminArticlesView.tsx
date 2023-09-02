import { useArticleData } from '@/hooks/adminHooks/useArticleData';
import { AdminSharedForm } from '@/features/FeatureAdmin/AdminShared/AdminSharedForm';
import { AdminSharedArticle } from '@/features/FeatureAdmin/AdminShared/AdminSharedArticle';
import { SharedDragAndDrop } from '@/features/shared/SharedDragAndDrop';
import { FeatureAdminSharedArticlesItem } from '@/features/FeatureAdmin/FeatureAdminArticles/FeatureAdminSharedArticlesItem';
import { useEffect, useState } from 'react';
import { sortArray } from '@/utils/arrayUtils';
import { Article } from '@/models/articleModels';

export interface FeatureStudioContainerProps {
  readonly articles: Array<ReturnType<typeof useArticleData>>;
  readonly careerArticle: ReturnType<typeof useArticleData>;
  readonly contactArticle: ReturnType<typeof useArticleData>;
  readonly expertiseArticle: ReturnType<typeof useArticleData>;
  readonly insightsArticle: ReturnType<typeof useArticleData>;
  readonly newsArticle: ReturnType<typeof useArticleData>;
  readonly partnersArticle: ReturnType<typeof useArticleData>;
  readonly peopleArticle: ReturnType<typeof useArticleData>;
  readonly projectsArticle: ReturnType<typeof useArticleData>;
  readonly studioArticle: ReturnType<typeof useArticleData>;
  readonly isSubmitLoading?: boolean;
  readonly isPageLoading?: boolean;
  readonly onSubmit?: () => void;
}

function handleDragEnd(startIndex: number, endIndex: number) {
  console.log('drag end', startIndex, endIndex);
}

export function FeatureAdminArticlesView({ articles, isPageLoading, isSubmitLoading, onSubmit }: FeatureStudioContainerProps) {
  const [sortedArticles, setSortedArticles] = useState<ReturnType<typeof useArticleData>[]>([]);

  useEffect(() => {
    console.log(sortedArticles);
    if (sortedArticles.length > 0) return;
    if (articles.some(({ article }) => !article)) return;
    setSortedArticles(articles.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
  }, [articles]);

  function handleDragEnd(fromIndex: number, toIndex: number) {
    const sortedArticlesCopy = [...sortedArticles];
    const [removed] = sortedArticlesCopy.splice(fromIndex, 1);
    sortedArticlesCopy.splice(toIndex, 0, removed);
    sortedArticlesCopy.forEach((item, index) => item.handleChangTempOrder(index + 1));
    setSortedArticles(sortedArticlesCopy);
  }

  return (
    <AdminSharedForm
      title={'Articles'}
      subTitle={'WARNING: Any action on this page is saved immediately'}
      formGrid={false}
      noArticle
      noSubmitBtn
      spacing={0}
      isSubmitLoading={isSubmitLoading}
      initialLoading={isPageLoading}
      onSubmit={onSubmit}
    >
      <div>
        <div style={{ height: 20 }} />
        <SharedDragAndDrop onDragEnd={handleDragEnd}>
          {sortedArticles.map(({ article }, index) => article && <FeatureAdminSharedArticlesItem key={article.entity} order={index + 1} entity={article.entity} />)}
        </SharedDragAndDrop>
      </div>
    </AdminSharedForm>
  );
}
