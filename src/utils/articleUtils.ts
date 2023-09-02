import { Article, SubArticle } from '@/models/articleModels';
import { MainArticleSubmitPayload, SubArticleEditPayload, SubArticleSubmitPayload } from '@/features/FeatureAdmin/AdminShared/AdminSharedArticle';
import { sortArray } from '@/utils/arrayUtils';

export function filterActiveArticles(articles: Article[]) {
  const activeArticles = (articles || []).reduce((acc, article) => {
    if (article.state) {
      const subArticles = article.subArticles ? article.subArticles.filter((subArticle) => subArticle.state) : undefined;
      acc.push({ ...article, subArticles });
    }
    return acc;
  }, [] as Article[]);

  return sortArray(activeArticles, 'order');
}

export function subArticleToSubArticlePayload(subArticles: SubArticle[]): SubArticleEditPayload[] {
  return subArticles.reduce((acc, subArticle) => {
    acc.push({
      id: subArticle.id,
      content: subArticle.content,
      state: subArticle.state,
      link: subArticle.link,
      image: null,
      imagePreviewUrl: subArticle.image?.url,
      oldFirebaseImage: subArticle.image ? { ...subArticle.image } : null,
    });
    return acc;
  }, [] as SubArticleEditPayload[]);
}
