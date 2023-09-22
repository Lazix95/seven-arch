import { EntityKeys } from '@/firebase/models/firebaseBaseModels';
import { AdminSharedArticle } from '@/features/FeatureAdmin/AdminShared/AdminSharedArticle/AdminSharedArticle';
import { useArticleData } from '@/hooks/adminHooks/useArticleData';
import { SharedIf } from '@/components/shared/util/SharedIf';
import { capitalizeFirstLetter } from '@/utils/stringUtils';

export interface FeatureAdminSharedArticlesItemProps {
  entity: EntityKeys;
  order?: number;
  articleData: ReturnType<typeof useArticleData>;
}

export function FeatureAdminSharedArticlesItem({ entity, articleData }: FeatureAdminSharedArticlesItemProps) {
  const { article, isArticleLoading, handleSavePayload, currentPayload, order } = articleData;

  return (
    <SharedIf If={!isArticleLoading}>
      <AdminSharedArticle
        dragAndDrop={true}
        className={'u-mb--5'}
        key={article?.entity}
        article={article}
        previousPayload={currentPayload ?? undefined}
        order={order}
        isMainArticle={true}
        onSubmitArticle={handleSavePayload}
        label={
          <span>
            <strong>{capitalizeFirstLetter(entity)}</strong> Article Settings
          </span>
        }
        size={'small'}
      />
    </SharedIf>
  );
}
