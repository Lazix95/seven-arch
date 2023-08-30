import { FeatureAdminExpertiseView } from './FeatureAdminExpertiseView';
import { createGetStaticProps } from '@/utils/ssgUtils';
import { useContainerData } from '@/hooks/useContainerData';
import { useArticleData } from '@/hooks/adminHooks/useArticleData';

export const getStaticProps = createGetStaticProps([]);

export interface FeatureAdminExpertiseContainerProps {}

export interface FeatureAdminExpertiseContainerState {
  isSubmitLoading?: boolean;
  isPageLoading?: boolean;
}

export function FeatureAdminExpertiseContainer({}: FeatureAdminExpertiseContainerProps) {
  const { state } = useContainerData<FeatureAdminExpertiseContainerState>({});
  const { article, isArticleSubmitLoading, isArticleLoading, handleSubmitArticle } = useArticleData({ entity: 'expertise', link: '/expertise' });

  return (
    <FeatureAdminExpertiseView
      article={article}
      isSubmitLoading={isArticleSubmitLoading || state.isSubmitLoading}
      onArticleSubmit={handleSubmitArticle}
      initialLoading={state.isPageLoading || isArticleLoading}
    />
  );
}
