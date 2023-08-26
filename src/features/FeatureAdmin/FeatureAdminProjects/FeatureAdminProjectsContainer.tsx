import { FeatureAdminProjectsView } from './FeatureAdminProjectsView';
import { createGetStaticProps } from '@/utils/ssgUtils';
import { fetchBasicInfo } from '@/features/firebase/api/basicDataApi';
import { fetchSocialNetworks } from '@/features/firebase/api/socialNetworksDataApi';
import { useContainerData } from '@/hooks/useContainerData';
import { useArticleData } from '@/hooks/adminHooks/useArticleData';

export const getStaticProps = createGetStaticProps([fetchBasicInfo, fetchSocialNetworks]);

export interface FeatureAdminProjectsContainerProps {}

export interface FeatureAdminProjectsContainerState {
  isSubmitLoading?: boolean;
  isPageLoading?: boolean;
}

export function FeatureAdminProjectsContainer({}: FeatureAdminProjectsContainerProps) {
  const { state } = useContainerData<FeatureAdminProjectsContainerState>({});
  const { article, isArticleSubmitLoading, isArticleLoading, handleSubmitArticle } = useArticleData({ entity: 'projects', link: '/projects' });

  return (
    <FeatureAdminProjectsView
      article={article}
      isSubmitLoading={isArticleSubmitLoading || state.isSubmitLoading}
      onArticleSubmit={handleSubmitArticle}
      initialLoading={state.isPageLoading || isArticleLoading}
    />
  );
}
