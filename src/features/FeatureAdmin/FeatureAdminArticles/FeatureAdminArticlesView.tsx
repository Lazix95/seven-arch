import { useArticleData } from '@/hooks/adminHooks/useArticleData';
import { AdminSharedForm } from '@/features/FeatureAdmin/AdminShared/AdminSharedForm';
import { SharedDragAndDrop } from '@/features/shared/SharedDragAndDrop';
import { FeatureAdminSharedArticlesItem } from '@/features/FeatureAdmin/FeatureAdminArticles/FeatureAdminSharedArticlesItem';
import { useEffect, useState } from 'react';

export interface FeatureStudioContainerProps {
  readonly articles: Array<ReturnType<typeof useArticleData>>;
  readonly isPageLoading?: boolean;
}

export function FeatureAdminArticlesView({ articles, isPageLoading }: FeatureStudioContainerProps) {
  const [sortedArticles, setSortedArticles] = useState<ReturnType<typeof useArticleData>[]>([]);

  useEffect(() => {
    setSortedArticles(articles.sort((a, b) => (a?.order.current ?? 0) - (b.order.current ?? 0)));
  }, [articles]);

  function handleMove(entity: string, order: number) {
    const article = sortedArticles.find(({ article }) => article?.entity === entity);
    article?.handleChangTempOrder(order);
    setSortedArticles([...sortedArticles].sort((a, b) => (a?.order.current ?? 0) - (b.order.current ?? 0)));
  }

  return (
    <AdminSharedForm
      title={'Articles'}
      subTitle={'WARNING: Any action on this page will be saved immediately'}
      formGrid={false}
      noArticle
      noSubmitBtn
      spacing={0}
      initialLoading={isPageLoading}
    >
      <div>
        <div style={{ height: 20 }} />
        <SharedDragAndDrop onDragEnd={() => {}}>
          {sortedArticles.map(({ entity }) => (
            <FeatureAdminSharedArticlesItem key={entity} entity={entity} onMove={handleMove} />
          ))}
        </SharedDragAndDrop>
      </div>
    </AdminSharedForm>
  );
}
