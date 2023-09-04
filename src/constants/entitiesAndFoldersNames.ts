import { SocialNetworkSlug } from '@/models/socialNetworks';

export const socialNetworkDocuments: Record<`socialNetwork_${SocialNetworkSlug}`, `socialNetwork_${SocialNetworkSlug}`> = {
  socialNetwork_pinterest: 'socialNetwork_pinterest',
  socialNetwork_instagram: 'socialNetwork_instagram',
  socialNetwork_linkedIn: 'socialNetwork_linkedIn',
  socialNetwork_twitter: 'socialNetwork_twitter',
  socialNetwork_facebook: 'socialNetwork_facebook',
  socialNetwork_youtube: 'socialNetwork_youtube',
} as const;

export const folders = {
  general: 'general',
  caruselImages: 'sliderImages',
  socialNetwoeks: 'socialNetworks',
  news: 'news',
  articles: 'articles',
} as const;

export const documents = {
  others: 'others',
  basicInfo: 'basicInfo',
  news: 'news',
  images: 'images',
  ...socialNetworkDocuments,
} as const;

export const entities = {
  users: 'users',
  news: 'news',
  projects: 'projects',
  partners: 'partners',
  articles: 'articles',
  expertise: 'expertise',
  careers: 'careers',
  contact: 'contact',
  insights: 'insights',
  people: 'people',
  studio: 'studio',
} as const;
