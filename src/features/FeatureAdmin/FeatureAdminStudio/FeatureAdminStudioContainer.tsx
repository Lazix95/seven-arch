import { FeatureAdminStudioView } from './FeatureAdminStudioView';
import { createGetStaticProps } from '@/utils/ssgUtils';
import { useContainerData } from '@/hooks/useContainerData';
import { useArticleData } from '@/hooks/adminHooks/useArticleData';

export const getStaticProps = createGetStaticProps([]);

export interface FeatureAdminStudioContainerProps {}

export interface FeatureAdminStudioContainerState {
  isSubmitLoading?: boolean;
  isPageLoading?: boolean;
}

export function FeatureAdminStudioContainer({}: FeatureAdminStudioContainerProps) {
  const { state, updateState } = useContainerData<FeatureAdminStudioContainerState>({});
  const { article, isArticleLoading, handleSubmitArticle, handleSavePayload } = useArticleData({ entity: 'studio', link: '/studio' });

  async function handleFormSubmit() {
    try {
      updateState({ isSubmitLoading: true });
      await handleSubmitArticle();
    } finally {
      updateState({ isSubmitLoading: false });
    }
  }

  return <FeatureAdminStudioView />;
}
