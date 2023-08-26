import { deleteEntity, getEntities, getEntityById, storeEntity, updateEntityById } from '@/features/firebase/utils/firebaseEntityUtils';
import { Article, ArticleFeature, SubArticle } from '@/models/articleModels';
import { storeImage } from '@/features/firebase/utils/firebaseImageUtils';
import { EntityKeys } from '@/features/firebase/models/firebaseBaseModels';

export async function fetchArticles(): Promise<DataArticles> {
  const articles = await getEntities<Article>('articles');
  return { articles };
}

export async function fetchArticleByEntity(entity: EntityKeys): Promise<Article> {
  const id = `article-${entity}`;
  return await getEntityById<Article>('articles', id);
}

export async function fetchSubArticleByEntity(entity: EntityKeys, subEntity: EntityKeys): Promise<Article> {
  const id = `article-${entity}`;
  return await getEntityById<Article>('articles', id);
}

export async function saveArticleApi(payload: SaveArticlePayload): Promise<Article> {
  const { image, ...dataPayload } = payload;
  const id = `article-${payload.entity}`;
  const firebaseImage = image ? await storeImage({ image, folder: 'articles', name: id }) : undefined;
  return await storeEntity<Article>({ entity: 'articles', payload: { ...dataPayload, image: firebaseImage }, id });
}

export async function updateArticleApi(payload: UpdateArticlePayload): Promise<Article> {
  const { image, ...dataPayload } = payload;
  let firebaseImage = undefined;
  if (image) {
    firebaseImage = await storeImage({ image, folder: 'articles', name: payload.id });
  }
  return await updateEntityById<Article>({ entity: 'articles', payload: { ...dataPayload, ...(image && { image: firebaseImage }) }, id: payload.id });
}

export async function saveSubArticleApi(payload: SaveSubArticlePayload): Promise<SubArticle> {
  const { image, entity, ...dataPayload } = payload;
  const articleId = `article-${entity}`;
  const id = `subArticle-${payload.subEntity}`;
  const firebaseImage = image ? await storeImage({ image, folder: 'articles', name: id }) : undefined;
  const doc = await getEntityById<Article>('articles', articleId);
  const newSubArticle: SubArticle = { ...dataPayload, image: firebaseImage, id };
  const article = await updateEntityById<Article>({ entity: 'articles', payload: { ...doc, subArticles: [...(doc.subArticles || []), newSubArticle] }, id: articleId });
  return article.subArticles!.find((subArticle) => subArticle.id === id)!;
}

export async function updateSubArticleApi(payload: UpdateSubArticlePayload): Promise<SubArticle> {
  const { image, entity, ...dataPayload } = payload;
  const articleId = `article-${entity}`;
  const id = payload.id;
  const firebaseImage = image ? await storeImage({ image, folder: 'articles', name: id }) : undefined;
  const doc = await getEntityById<Article>('articles', articleId);
  const newSubArticle: SubArticle = { ...dataPayload, image: firebaseImage, id };
  const payloadDoc = { ...doc, subArticles: doc.subArticles!.map((subArticle) => (subArticle.id === id ? newSubArticle : subArticle)) };
  const article = await updateEntityById<Article>({ entity: 'articles', payload: payloadDoc, id: articleId });
  return article.subArticles!.find((subArticle) => subArticle.id === id)!;
}

export async function deleteArticleApi(id: string): Promise<void> {
  return await deleteEntity('articles', id);
}

export interface DataArticles {
  readonly articles: Article[];
}

export interface SaveArticlePayload {
  readonly title?: string;
  readonly image?: File | null;
  readonly content: string;
  readonly feature: ArticleFeature | null;
  readonly size: 'small' | 'large';
  readonly link: string;
  readonly state: boolean;
  readonly entity: EntityKeys;
}

export interface UpdateArticlePayload extends SaveArticlePayload {
  readonly id: string;
}

export interface SaveSubArticlePayload {
  readonly content: string;
  readonly image?: File | null;
  readonly state: boolean;
  readonly link: string;
  readonly entity: EntityKeys;
  readonly subEntity: EntityKeys;
}

export interface UpdateSubArticlePayload extends SaveSubArticlePayload {
  readonly id: string;
}
