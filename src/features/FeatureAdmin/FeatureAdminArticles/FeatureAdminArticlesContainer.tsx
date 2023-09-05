import { useArticleData } from '@/hooks/adminHooks/useArticleData';
import { FeatureAdminArticlesView } from '@/features/FeatureAdmin/FeatureAdminArticles/FeatureAdminArticlesView';
import { useMemo } from 'react';
import { createGetStaticProps } from '@/utils/ssgUtils';

export const getStaticProps = createGetStaticProps([]);

export interface FeatureAdminArticlesContainerProps {}

export function FeatureAdminArticlesContainer({}: FeatureAdminArticlesContainerProps) {
  const careerArticle = useArticleData({ entity: 'careers', link: '/careers' });
  const contactArticle = useArticleData({ entity: 'contact', link: '/contact' });
  const expertiseArticle = useArticleData({ entity: 'expertise', link: '/expertise' });
  const insightsArticle = useArticleData({ entity: 'insights', link: '/insights' });
  const newsArticle = useArticleData({ entity: 'news', link: '/news' });
  const partnersArticle = useArticleData({ entity: 'partners', link: '/partners' });
  const peopleArticle = useArticleData({ entity: 'people', link: '/people' });
  const projectsArticle = useArticleData({ entity: 'projects', link: '/projects' });
  const studioArticle = useArticleData({ entity: 'studio', link: '/studio' });

  const articles = useMemo(() => {
    return [careerArticle, contactArticle, expertiseArticle, insightsArticle, newsArticle, partnersArticle, peopleArticle, projectsArticle, studioArticle];
  }, [careerArticle, contactArticle, expertiseArticle, insightsArticle, newsArticle, partnersArticle, peopleArticle, projectsArticle, studioArticle]);

  const isPageLoading = useMemo(() => articles.some(({ isArticleLoading }) => isArticleLoading), [articles]);
  const isSubmitLoading = useMemo(() => articles.some(({ isArticleSubmitLoading }) => isArticleSubmitLoading), [articles]);

  async function handleSaveAll() {
    for (const article of articles) {
      await article.handleSubmitArticle();
    }
  }

  return <FeatureAdminArticlesView articles={articles} isPageLoading={isPageLoading} onSubmit={handleSaveAll} isSubmitLoading={isSubmitLoading} />;
}
