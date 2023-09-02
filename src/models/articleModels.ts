import { EntityKeys } from '@/features/firebase/models/firebaseBaseModels';
import { FirebaseImage } from '@/features/firebase/utils/firebaseImageUtils';

export interface Article {
  readonly id: string;
  readonly title?: string;
  readonly image?: FirebaseImage;
  readonly content: string;
  readonly feature: ArticleFeature;
  readonly subArticles?: SubArticle[];
  readonly size: 'small' | 'large';
  readonly link: string;
  readonly state: boolean;
  readonly entity: EntityKeys;
  readonly order?: number;
}

export interface SubArticle {
  readonly id: string;
  readonly content: string;
  readonly state: boolean;
  readonly image?: FirebaseImage;
  readonly link: string;
}

export interface ArticleFeatureDescription {
  readonly type: 'description';
  readonly content: string;
  readonly align: FeatureTextAlign;
}

export interface ArticleFeatureNewsTeller {
  readonly type: 'newsTeller';
  readonly content: string;
  readonly align: FeatureTextAlign;
}

export type ArticleFeature = null | ArticleFeatureDescription | ArticleFeatureNewsTeller;
export type ArticleFeatureType = Exclude<ArticleFeature, null>['type'];

export type SubArticleSubmitPayload = Omit<SubArticleEditPayload, 'imagePreviewUrl' | 'oldFirebaseImage'>;

export interface MainArticleSubmitPayload {
  type: 'main';
  title?: string;
  feature: ArticleFeature | null;
  content: string;
  subArticles?: SubArticleSubmitPayload[];
  image?: File | null | undefined;
  state: boolean;
  size: 'small' | 'large';
  order?: number;
}

export interface SubArticleEditPayload {
  id: string;
  content: string;
  image?: File | FirebaseImage | null | undefined;
  imagePreviewUrl?: string | null;
  oldFirebaseImage?: FirebaseImage | null;
  state: boolean;
  link: string;
}

export type FeatureTextAlign = 'left' | 'center' | 'right' | 'justify';
