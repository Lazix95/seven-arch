import { deleteEntity, getEntities, storeEntity } from '@/features/firebase/utils/firebaseEntityUtils';
import { Article } from '@/models/articleModels';

export async function fetchAllArticles(): Promise<DataArticles> {
  const articles = await getEntities<Article>('articles');
  return { articles };
}

export async function saveArticle(article: Article): Promise<Article> {
  const { imageUrl, ...dataPayload } = article;
  const articleDoc = await storeEntity({ entity: 'articles', payload: dataPayload });
  return { ...articleDoc, imageUrl };
}

export async function deleteArticle(id: string): Promise<void> {
  return await deleteEntity('articles', id);
}

export interface DataArticles {
  readonly articles: Article[];
}
