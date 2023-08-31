import { Article } from '@/models/articleModels';
import { AdminSharedForm } from '@/features/FeatureAdmin/AdminShared/AdminSharedForm';

export interface FeatureAdminPeopleViewProps {
  readonly article?: Article;
  readonly initialLoading?: boolean;
  readonly isSubmitLoading?: boolean;
  readonly onArticleSubmit?: () => void;
  readonly onSubmit?: () => void;
}

export function FeatureAdminPeopleView({ article, initialLoading, isSubmitLoading, onSubmit, onArticleSubmit }: FeatureAdminPeopleViewProps) {
  return (
    <AdminSharedForm
      title={'People'}
      article={article}
      initialLoading={initialLoading}
      isSubmitLoading={isSubmitLoading}
      isMainArticle={false}
      onArticleSubmit={onArticleSubmit}
      onSubmit={onSubmit}
    />
  );
}
