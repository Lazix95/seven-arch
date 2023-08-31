import { FeatureAdminContactView } from './FeatureAdminContactView';
import { createGetStaticProps } from '@/utils/ssgUtils';
import { useContainerData } from '@/hooks/useContainerData';
import { useArticleData } from '@/hooks/adminHooks/useArticleData';

export const getStaticProps = createGetStaticProps([]);

export interface FeatureAdminContactContainerProps {}

export interface FeatureAdminContactContainerState {
  isSubmitLoading?: boolean;
  isPageLoading?: boolean;
}

export function FeatureAdminContactContainer({}: FeatureAdminContactContainerProps) {
  const { state, updateState } = useContainerData<FeatureAdminContactContainerState>({});
  const { article, isArticleLoading, handleSubmitArticle, handleSavePayload } = useArticleData({ entity: 'contact', link: '/contact' });

  async function handleFormSubmit() {
    try {
      updateState({ isSubmitLoading: true });
      await handleSubmitArticle();
    } finally {
      updateState({ isSubmitLoading: false });
    }
  }

  return (
    <FeatureAdminContactView
      article={article}
      isSubmitLoading={state.isSubmitLoading}
      onArticleSubmit={handleSavePayload}
      onSubmit={handleFormSubmit}
      initialLoading={state.isPageLoading || isArticleLoading}
    />
  );
}
