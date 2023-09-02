import { EntityKeys } from '@/features/firebase/models/firebaseBaseModels';
import { AdminSharedArticle } from '@/features/FeatureAdmin/AdminShared/AdminSharedArticle';
import { useArticleData } from '@/hooks/adminHooks/useArticleData';
import { SharedIf } from '@/features/shared/SharedIf';
import { capitalizeFirstLetter } from '@/utils/stringUtils';

export interface FeatureAdminSharedArticlesItemProps {
  entity: EntityKeys;
  order?: number;
  onMove?: (entity: string, order: number) => void;
}

export function FeatureAdminSharedArticlesItem({ entity, onMove }: FeatureAdminSharedArticlesItemProps) {
  const { article, isArticleLoading, handleSubmitArticle } = useArticleData({
    entity,
    link: `/${entity}`,
    options: { initialLoading: true },
  });

  return (
    <SharedIf If={!isArticleLoading}>
      <AdminSharedArticle
        className={'u-mb--5'}
        key={article?.entity}
        article={article}
        isMainArticle={true}
        onSubmitArticle={handleSubmitArticle}
        onOrderChange={(order) => onMove?.(entity, order)}
        label={`${capitalizeFirstLetter(entity)} Article Settings - ${article?.order ?? 0}`}
        size={'small'}
      />
    </SharedIf>
  );
}
