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
  const { state, updateState } = useContainerData<FeatureAdminExpertiseContainerState>({});
  const { article, isArticleLoading, handleSubmitArticle, handleSavePayload } = useArticleData({ entity: 'expertise', link: '/expertise' });

  async function handleFormSubmit() {
    try {
      updateState({ isSubmitLoading: true });
      await handleSubmitArticle();
    } finally {
      updateState({ isSubmitLoading: false });
    }
  }

  return (
    <FeatureAdminExpertiseView
      article={article}
      isSubmitLoading={state.isSubmitLoading}
      onArticleSubmit={handleSavePayload}
      onSubmit={handleFormSubmit}
      initialLoading={state.isPageLoading || isArticleLoading}
    />
  );
}
