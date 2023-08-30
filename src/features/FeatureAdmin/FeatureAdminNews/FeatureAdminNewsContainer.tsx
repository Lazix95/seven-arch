import { FeatureAdminNewsView } from './FeatureAdminNewsView';
import { createGetStaticProps } from '@/utils/ssgUtils';
import { useContainerData } from '@/hooks/useContainerData';
import { useArticleData } from '@/hooks/adminHooks/useArticleData';

export const getStaticProps = createGetStaticProps([]);

export interface FeatureAdminNewsContainerProps {}

export interface FeatureAdminNewsContainerState {
  submitLoading?: boolean;
  pageLoading?: boolean;
}

export function FeatureAdminNewsContainer({}: FeatureAdminNewsContainerProps) {
  const { state } = useContainerData<FeatureAdminNewsContainerState>({});
  const { handleSubmitArticle, isArticleSubmitLoading, article } = useArticleData({ entity: 'news', link: '/news' });

  return (
    <FeatureAdminNewsView
      article={article}
      initialLoading={state.pageLoading}
      isSubmitLoading={isArticleSubmitLoading || state.submitLoading}
      handleArticleSubmit={handleSubmitArticle}
    />
  );
}
