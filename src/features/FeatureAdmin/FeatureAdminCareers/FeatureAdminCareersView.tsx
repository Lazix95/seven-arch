import { Article, MainArticleSubmitPayload } from '@/models/articleModels';
import { AdminSharedForm } from '@/features/FeatureAdmin/AdminShared/AdminSharedForm';

export interface FeatureAdminCareersViewProps {
  readonly article?: Article;
  readonly initialLoading?: boolean;
  readonly isSubmitLoading?: boolean;
  readonly onArticleSubmit?: (payload: MainArticleSubmitPayload) => void;
  readonly onSubmit?: () => void;
}

export function FeatureAdminCareersView({ article, isSubmitLoading, initialLoading, onSubmit, onArticleSubmit }: FeatureAdminCareersViewProps) {
  return (
    <AdminSharedForm
      title={'Careers'}
      article={article}
      initialLoading={initialLoading}
      isSubmitLoading={isSubmitLoading}
      isMainArticle={true}
      onArticleSubmit={onArticleSubmit}
      onSubmit={onSubmit}
    />
  );
}
