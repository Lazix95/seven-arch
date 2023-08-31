import { FeatureAdminInsightsView } from './FeatureAdminInsightsView';
import { createGetStaticProps } from '@/utils/ssgUtils';
import { useContainerData } from '@/hooks/useContainerData';
import { useArticleData } from '@/hooks/adminHooks/useArticleData';

export const getStaticProps = createGetStaticProps([]);

export interface FeatureAdminInsightsContainerProps {}

export interface FeatureAdminInsightsContainerState {
  isSubmitLoading?: boolean;
  isPageLoading?: boolean;
}

export function FeatureAdminInsightsContainer({}: FeatureAdminInsightsContainerProps) {
  const { state, updateState } = useContainerData<FeatureAdminInsightsContainerState>({});
  const { article, isArticleLoading, handleSubmitArticle, handleSavePayload } = useArticleData({ entity: 'insights', link: '/insights' });

  function handleFormSubmit() {
    try {
      updateState({ isSubmitLoading: true });
      handleSubmitArticle();
    } finally {
      updateState({ isSubmitLoading: false });
    }
  }

  return (
    <FeatureAdminInsightsView
      article={article}
      isSubmitLoading={state.isSubmitLoading}
      onArticleSubmit={handleSavePayload}
      onSubmit={handleFormSubmit}
      initialLoading={state.isPageLoading || isArticleLoading}
    />
  );
}
