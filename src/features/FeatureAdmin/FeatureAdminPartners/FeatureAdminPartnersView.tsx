import { AdminSharedForm } from '@/features/FeatureAdmin/AdminShared/AdminSharedForm';

import { MainArticleSubmitPayload } from '@/models/articleModels';

export interface FeatureAdminPartnersViewProps {
  readonly article?: any;
  readonly initialLoading?: boolean;
  readonly isSubmitLoading?: boolean;
  readonly onArticleSubmit?: (payload: MainArticleSubmitPayload) => void;
  readonly onSubmit?: () => void;
}

export function FeatureAdminPartnersView({ article, initialLoading, isSubmitLoading, onSubmit, onArticleSubmit }: FeatureAdminPartnersViewProps) {
  return (
    <AdminSharedForm
      title={'Partners'}
      article={article}
      initialLoading={initialLoading}
      isSubmitLoading={isSubmitLoading}
      isMainArticle={true}
      onArticleSubmit={onArticleSubmit}
      onSubmit={onSubmit}
    />
  );
}
