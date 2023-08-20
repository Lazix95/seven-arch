import { ReactComponent } from './generalModels';

export type SocialNetworkSlug = 'pinterest' | 'instagram' | 'linkedIn' | 'twitter' | 'facebook' | 'youtube';

export interface SocialNetwork {
  id: number;
  name: string;
  link?: string;
  Icon: ReactComponent;
  slug: SocialNetworkSlug;
}

export interface DocumentSocialNetwork {
  id: number;
  link?: string;
  order?: number;
  name: string;
  slug: SocialNetworkSlug;
  state: boolean;
}

export interface DocumentSocialNetworkWithIcon extends DocumentSocialNetwork {
  Icon?: ReactComponent;
}
