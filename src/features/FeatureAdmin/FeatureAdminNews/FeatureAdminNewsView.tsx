import { Article, MainArticleSubmitPayload } from '@/models/articleModels';
import { AdminSharedForm } from '@/features/FeatureAdmin/AdminShared/AdminSharedForm';

export interface FeatureAdminNewsViewProps {
  article?: Article;
  initialLoading?: boolean;
  isSubmitLoading?: boolean;
  onArticleSubmit?: (payload: MainArticleSubmitPayload) => void;
  onSubmit?: () => void;
}

export function FeatureAdminNewsView({ article, initialLoading, isSubmitLoading, onSubmit, onArticleSubmit }: FeatureAdminNewsViewProps) {
  return (
    <AdminSharedForm
      title={'News'}
      article={article}
      initialLoading={initialLoading}
      isSubmitLoading={isSubmitLoading}
      isMainArticle={true}
      onArticleSubmit={onArticleSubmit}
      onSubmit={onSubmit}
    />
  );
}
