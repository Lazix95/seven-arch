import { Article } from '@/models/articleModels';
import { MainArticleSubmitPayload } from '@/features/FeatureAdmin/AdminShared/AdminSharedArticle';
import { AdminSharedForm } from '@/features/FeatureAdmin/AdminShared/AdminSharedForm';

export interface FeatureAdminInsightsViewProps {
  readonly article?: Article;
  readonly initialLoading?: boolean;
  readonly isSubmitLoading?: boolean;
  readonly onArticleSubmit?: (payload: MainArticleSubmitPayload) => void;
  readonly onSubmit?: () => void;
}

export function FeatureAdminInsightsView({ article, initialLoading, isSubmitLoading, onSubmit, onArticleSubmit }: FeatureAdminInsightsViewProps) {
  return (
    <AdminSharedForm
      title={'Insights'}
      article={article}
      initialLoading={initialLoading}
      isSubmitLoading={isSubmitLoading}
      isMainArticle={true}
      onArticleSubmit={onArticleSubmit}
      onSubmit={onSubmit}
    />
  );
}
