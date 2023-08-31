import { FeatureAdminProjectsView } from './FeatureAdminProjectsView';
import { createGetStaticProps } from '@/utils/ssgUtils';
import { useContainerData } from '@/hooks/useContainerData';
import { useArticleData } from '@/hooks/adminHooks/useArticleData';

export const getStaticProps = createGetStaticProps([]);

export interface FeatureAdminProjectsContainerProps {}

export interface FeatureAdminProjectsContainerState {
  isSubmitLoading?: boolean;
  isPageLoading?: boolean;
}

export function FeatureAdminProjectsContainer({}: FeatureAdminProjectsContainerProps) {
  const { state, updateState } = useContainerData<FeatureAdminProjectsContainerState>({});
  const { article, isArticleLoading, handleSubmitArticle, handleSavePayload } = useArticleData({ entity: 'projects', link: '/projects' });

  async function handleFormSubmit() {
    try {
      updateState({ isSubmitLoading: true });
      await handleSubmitArticle();
    } finally {
      updateState({ isSubmitLoading: false });
    }
  }

  return (
    <FeatureAdminProjectsView
      article={article}
      isSubmitLoading={state.isSubmitLoading}
      onArticleSubmit={handleSavePayload}
      onSubmit={handleFormSubmit}
      initialLoading={state.isPageLoading || isArticleLoading}
    />
  );
}
