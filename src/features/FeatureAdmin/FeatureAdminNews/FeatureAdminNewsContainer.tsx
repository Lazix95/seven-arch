import { FeatureAdminNewsView } from './FeatureAdminNewsView';
import { createGetStaticProps } from '@/utils/ssgUtils';
import { fetchBasicInfo } from '@/features/firebase/api/basicDataApi';
import { fetchSocialNetworks } from '@/features/firebase/api/socialNetworksDataApi';
import { useContainerData } from '@/hooks/useContainerData';
import { useArticleData } from '@/hooks/adminHooks/useArticleData';

export const getStaticProps = createGetStaticProps([fetchBasicInfo, fetchSocialNetworks]);

export interface FeatureAdminNewsContainerProps {}

export interface FeatureAdminNewsContainerState {
  submitLoading?: boolean;
  pageLoading?: boolean;
}

export function FeatureAdminNewsContainer({}: FeatureAdminNewsContainerProps) {
  const { state } = useContainerData<FeatureAdminNewsContainerState>({});
  const { handleSubmitArticle, isArticleSubmitLoading, article } = useArticleData({ entity: 'news', link: '/news' });

  return (
    <FeatureAdminNewsView
      article={article}
      initialLoading={state.pageLoading}
      isSubmitLoading={isArticleSubmitLoading || state.submitLoading}
      handleArticleSubmit={handleSubmitArticle}
    />
  );
}
