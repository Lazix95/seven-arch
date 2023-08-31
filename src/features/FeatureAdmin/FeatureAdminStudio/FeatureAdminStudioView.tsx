import { MainArticleSubmitPayload } from '@/features/FeatureAdmin/AdminShared/AdminSharedArticle';
import { Article } from '@/models/articleModels';
import { AdminSharedForm } from '@/features/FeatureAdmin/AdminShared/AdminSharedForm';

export interface FeatureAdminStudioViewProps {
  readonly article?: Article;
  readonly initialLoading?: boolean;
  readonly isSubmitLoading?: boolean;
  readonly onArticleSubmit?: (payload: MainArticleSubmitPayload) => void;
  readonly onSubmit?: () => void;
}

export function FeatureAdminStudioView({ article, initialLoading, isSubmitLoading, onSubmit, onArticleSubmit }: FeatureAdminStudioViewProps) {
  return (
    <AdminSharedForm
      title={'Studio'}
      article={article}
      initialLoading={initialLoading}
      isSubmitLoading={isSubmitLoading}
      isMainArticle={true}
      onArticleSubmit={onArticleSubmit}
      onSubmit={onSubmit}
    />
  );
}
