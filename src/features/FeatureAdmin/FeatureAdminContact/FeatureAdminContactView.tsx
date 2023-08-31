import { Article } from '@/models/articleModels';
import { MainArticleSubmitPayload } from '@/features/FeatureAdmin/AdminShared/AdminSharedArticle';
import { AdminSharedForm } from '@/features/FeatureAdmin/AdminShared/AdminSharedForm';

export interface FeatureAdminContactViewProps {
  readonly article?: Article;
  readonly initialLoading?: boolean;
  readonly isSubmitLoading?: boolean;
  readonly onArticleSubmit?: (payload: MainArticleSubmitPayload) => void;
  readonly onSubmit?: () => void;
}

export function FeatureAdminContactView({ article, initialLoading, isSubmitLoading, onSubmit, onArticleSubmit }: FeatureAdminContactViewProps) {
  return (
    <AdminSharedForm
      title={'Contact'}
      article={article}
      initialLoading={initialLoading}
      isSubmitLoading={isSubmitLoading}
      isMainArticle={true}
      onArticleSubmit={onArticleSubmit}
      onSubmit={onSubmit}
    />
  );
}
