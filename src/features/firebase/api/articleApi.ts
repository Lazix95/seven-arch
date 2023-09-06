import { deleteEntity, getEntities, getEntityById, storeEntity, updateEntityById } from '@/features/firebase/utils/firebaseEntityUtils';
import { Article, ArticleFeature, SubArticle } from '@/models/articleModels';
import { FirebaseImage, storeImage } from '@/features/firebase/utils/firebaseImageUtils';
import { EntityKeys } from '@/features/firebase/models/firebaseBaseModels';

export async function fetchArticles(): Promise<DataArticles> {
  const articles = await getEntities<Article>('articles');
  return { articles };
}

export async function fetchArticleByEntity(entity: EntityKeys): Promise<Article> {
  const id = `article-${entity}`;
  return await getEntityById<Article>('articles', id);
}

export async function saveArticleApi(payload: SaveArticlePayload): Promise<Article> {
  const { image, subArticles, ...dataPayload } = payload;
  const id = `article-${payload.entity}`;
  const firebaseImage = image ? await storeImage({ image, folder: 'articles', name: id }) : undefined;
  return await storeEntity<Article>({ entity: 'articles', payload: { ...dataPayload, ...(firebaseImage && { image: firebaseImage }) }, id });
}

export async function updateArticleApi(payload: UpdateArticlePayload): Promise<Article> {
  const { image, subArticles, ...dataPayload } = payload;
  let firebaseImage = undefined;

  let subArticlesWithImages: SubArticle[] = [];

  if (subArticles) {
    subArticlesWithImages = (await Promise.all(
      subArticles.map(async (subArticle) => {
        if (subArticle.image && subArticle.image instanceof File) {
          const image = (await storeImage({ image: subArticle.image, folder: 'articles', name: subArticle.id })) ?? undefined;
          return { ...subArticle, image };
        }
        return { ...subArticle, image: subArticle.image ?? null };
      }),
    )) as SubArticle[];
  }

  if (image) {
    firebaseImage = await storeImage({ image, folder: 'articles', name: payload.id });
  }
  return await updateEntityById<Article>({
    entity: 'articles',
    payload: { ...dataPayload, ...(image && { image: firebaseImage }), subArticles: subArticlesWithImages },
    id: payload.id,
  });
}

export interface DataArticles {
  readonly articles: Article[];
}

export interface SaveArticlePayload {
  readonly title?: string;
  readonly image?: File | null;
  readonly content: string;
  readonly feature: ArticleFeature | null;
  readonly subArticles?: SaveSubArticlePayload[];
  readonly size: 'small' | 'large';
  readonly link: string;
  readonly state: boolean;
  readonly entity: EntityKeys;
}

export interface UpdateArticlePayload extends SaveArticlePayload {
  readonly id: string;
}

export interface SaveSubArticlePayload {
  readonly id: string;
  readonly content: string;
  readonly image?: File | FirebaseImage | null | undefined;
  readonly state: boolean;
  readonly link: string;
}
