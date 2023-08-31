import { FeatureAdminPartnersView } from '@/features/FeatureAdmin/FeatureAdminPartners/FeatureAdminPartnersView';
import { useContainerData } from '@/hooks/useContainerData';
import { useArticleData } from '@/hooks/adminHooks/useArticleData';
import { createGetStaticProps } from '@/utils/ssgUtils';

export const getStaticProps = createGetStaticProps([]);

export interface FeatureAdminPartnersContainerProps {}

export interface FeatureAdminPartnersViewState {
  readonly isSubmitLoading?: boolean;
  readonly initialLoading?: boolean;
}

export function FeatureAdminPartnersContainer({}: FeatureAdminPartnersContainerProps) {
  const { state, updateState } = useContainerData<FeatureAdminPartnersViewState>({});
  const { article, isArticleLoading, handleSubmitArticle, handleSavePayload } = useArticleData({ entity: 'partners', link: '/partners' });

  async function handleSubmitForm() {
    try {
      updateState({ isSubmitLoading: true });
      await handleSubmitArticle();
    } finally {
      updateState({ isSubmitLoading: false });
    }
  }

  return (
    <FeatureAdminPartnersView
      article={article}
      isSubmitLoading={state.isSubmitLoading}
      onArticleSubmit={handleSavePayload}
      onSubmit={handleSubmitForm}
      initialLoading={state.initialLoading || isArticleLoading}
    />
  );
}
