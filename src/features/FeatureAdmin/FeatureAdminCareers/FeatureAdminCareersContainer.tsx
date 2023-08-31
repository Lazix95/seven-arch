import { FeatureAdminCareersView } from './FeatureAdminCareersView';
import { createGetStaticProps } from '@/utils/ssgUtils';
import { useContainerData } from '@/hooks/useContainerData';
import { useArticleData } from '@/hooks/adminHooks/useArticleData';

export const getStaticProps = createGetStaticProps([]);

export interface FeatureAdminCareersContainerProps {}

export interface FeatureAdminCareersContainerState {
  isSubmitLoading?: boolean;
  isPageLoading?: boolean;
}

export function FeatureAdminCareersContainer({}: FeatureAdminCareersContainerProps) {
  const { state, updateState } = useContainerData<FeatureAdminCareersContainerState>({});
  const { article, isArticleLoading, handleSubmitArticle, handleSavePayload } = useArticleData({ entity: 'careers', link: '/careers' });

  async function handleFormSubmit() {
    try {
      updateState({ isSubmitLoading: true });
      await handleSubmitArticle();
    } finally {
      updateState({ isSubmitLoading: false });
    }
  }

  return (
    <FeatureAdminCareersView
      article={article}
      isSubmitLoading={state.isSubmitLoading}
      onArticleSubmit={handleSavePayload}
      onSubmit={handleFormSubmit}
      initialLoading={state.isPageLoading || isArticleLoading}
    />
  );
}
