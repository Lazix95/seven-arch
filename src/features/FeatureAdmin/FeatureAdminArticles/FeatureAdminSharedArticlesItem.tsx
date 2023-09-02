import { EntityKeys } from '@/features/firebase/models/firebaseBaseModels';
import { AdminSharedArticle } from '@/features/FeatureAdmin/AdminShared/AdminSharedArticle';
import { useArticleData } from '@/hooks/adminHooks/useArticleData';
import { SharedIf } from '@/features/shared/SharedIf';

export interface FeatureAdminSharedArticlesItemProps {
  entity: EntityKeys;
  order?: number;
}

export function FeatureAdminSharedArticlesItem({ entity, order }: FeatureAdminSharedArticlesItemProps) {
  const { article, isArticleLoading, handleSavePayload, handleOrderChange } = useArticleData({ entity, link: `/${entity}`, options: { initialLoading: true } });
  return (
    <SharedIf If={!isArticleLoading}>
      <AdminSharedArticle
        className={'u-mb--5'}
        key={article?.entity}
        dragAndDrop
        article={article}
        isMainArticle={true}
        onSubmitArticle={handleSavePayload}
        onOrderChange={handleOrderChange}
        label={`${entity} Article Settings`}
        size={'small'}
        order={order}
      />
    </SharedIf>
  );
}
