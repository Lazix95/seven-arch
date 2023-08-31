import { FeatureAdminPeopleView } from './FeatureAdminPeopleView';
import { createGetStaticProps } from '@/utils/ssgUtils';
import { useContainerData } from '@/hooks/useContainerData';
import { useArticleData } from '@/hooks/adminHooks/useArticleData';

export const getStaticProps = createGetStaticProps([]);

export interface FeatureAdminPeopleContainerProps {}

export interface FeatureAdminPeopleContainerState {
  isSubmitLoading?: boolean;
  isPageLoading?: boolean;
}

export function FeatureAdminPeopleContainer({}: FeatureAdminPeopleContainerProps) {
  const { state, updateState } = useContainerData<FeatureAdminPeopleContainerState>({});
  const { article, isArticleLoading, handleSubmitArticle, handleSavePayload } = useArticleData({ entity: 'people', link: '/people' });

  async function handleFormSubmit() {
    try {
      updateState({ isSubmitLoading: true });
      await handleSubmitArticle();
    } finally {
      updateState({ isSubmitLoading: false });
    }
  }

  return <FeatureAdminPeopleView />;
}
