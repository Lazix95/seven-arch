import { useArticleData } from '@/hooks/adminHooks/useArticleData';
import { AdminSharedForm } from '@/features/FeatureAdmin/AdminShared/AdminSharedForm';
import { SharedDragAndDrop } from '@/components/shared/util/SharedDragAndDrop';
import { FeatureAdminSharedArticlesItem } from '@/features/FeatureAdmin/FeatureAdminArticles/FeatureAdminSharedArticlesItem';
import { useEffect, useState } from 'react';

export interface FeatureStudioContainerProps {
  readonly articles: Array<ReturnType<typeof useArticleData>>;
  readonly isPageLoading?: boolean;
  readonly isSubmitLoading?: boolean;
  readonly onSubmit?: () => void;
}

export function FeatureAdminArticlesView({ articles, isPageLoading, isSubmitLoading, onSubmit }: FeatureStudioContainerProps) {
  const [sortedArticles, setSortedArticles] = useState<ReturnType<typeof useArticleData>[]>([]);

  useEffect(() => {
    setSortedArticles(articles.sort((a, b) => (a?.order ?? 0) - (b.order ?? 0)));
  }, [articles]);

  function handleDragEnd(fromIndex: number, toIndex: number) {
    const sortedArticlesCopy = [...sortedArticles];
    const [removed] = sortedArticlesCopy.splice(fromIndex, 1);
    sortedArticlesCopy.splice(toIndex, 0, removed);
    sortedArticlesCopy.forEach((item, index) => item.handleChangTempOrder(++index));
    setSortedArticles(sortedArticlesCopy);
  }

  return (
    <AdminSharedForm title={'Articles'} formGrid={false} noArticle spacing={0} initialLoading={isPageLoading} onSubmit={onSubmit} isSubmitLoading={isSubmitLoading}>
      <div>
        <div style={{ height: 20 }} />
        <SharedDragAndDrop onDragEnd={handleDragEnd}>
          {sortedArticles.map((articleData) => (
            <FeatureAdminSharedArticlesItem articleData={articleData} key={articleData.entity} entity={articleData.entity} />
          ))}
        </SharedDragAndDrop>
      </div>
    </AdminSharedForm>
  );
}
