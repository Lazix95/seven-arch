import { EntityKeys } from '@/features/firebase/models/firebaseBaseModels';

export interface Article {
  readonly id: string;
  readonly title: string;
  readonly imageUrl: string;
  readonly content: string;
  readonly feature: ArticleFeature;
  readonly subArticles: SubArticle[];
  readonly size: 'small' | 'large';
  readonly link: string;
  readonly state: boolean;
}

export interface SubArticle {
  readonly id: string;
  readonly imageUrl: string;
  readonly content: string;
  readonly link: string;
}

export interface ArticleFeatureDescription {
  readonly type: 'description';
  readonly content: string;
}

export interface ArticleFeatureNewsTeller {
  readonly type: 'newsTeller';
  readonly content: string;
  readonly entity: EntityKeys;
}

export type ArticleFeature = null | ArticleFeatureDescription | ArticleFeatureNewsTeller;
export type ArticleFeatureType = Exclude<ArticleFeature, null>['type'];
