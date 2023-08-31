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
  const { state, updateState } = useContainerData<FeatureAdminNewsContainerState>({});
  const { article, isArticleLoading, handleSubmitArticle } = useArticleData({ entity: 'news', link: '/news' });

  async function handleSubmitForm() {
    try {
      updateState({ submitLoading: true });
      await handleSubmitArticle();
    } finally {
      updateState({ submitLoading: false });
    }
  }

  return (
    <FeatureAdminNewsView
      article={article}
      initialLoading={state.pageLoading || isArticleLoading}
      isSubmitLoading={state.submitLoading}
      onArticleSubmit={handleSubmitArticle}
      onSubmit={handleSubmitForm}
    />
  );
}
