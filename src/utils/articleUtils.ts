import { Article } from '@/models/articleModels';

export function filterActiveArticles(articles: Article[]) {
  return articles.reduce((acc, article) => {
    if (article.state) {
      const subArticles = article.subArticles ? article.subArticles.filter((subArticle) => subArticle.state) : undefined;
      acc.push({ ...article, subArticles });
    }
    return acc;
  }, [] as Article[]);
}
