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
}

export interface ArticleFeatureNewsTeller {
  readonly type: 'newsTeller';
  readonly content: string;
}

export type ArticleFeature = null | ArticleFeatureDescription | ArticleFeatureNewsTeller;
export type ArticleFeatureType = Exclude<ArticleFeature, null>['type'];
