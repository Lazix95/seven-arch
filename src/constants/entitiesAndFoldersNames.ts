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
} as const;

export const documents = {
  others: 'others',
  basicInfo: 'basicInfo',
  ...socialNetworkDocuments,
} as const;

export const entities = {
  users: 'users',
  projects: 'projects',
  partners: 'partners',
} as const;
