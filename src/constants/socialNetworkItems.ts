import { FacebookIcon, InstagramIcon, LinkedInIcon, PinterestIcon, TwitterIcon, YouTubeIcon } from '@/features/shared/icons/materialUiIcons';
import { SocialNetwork, SocialNetworkSlug } from '@/models/socialNetworks';

export const socialNetworksMap: Record<SocialNetworkSlug, SocialNetwork> = {
  pinterest: { id: 1, name: 'Pinterest', Icon: PinterestIcon, slug: 'pinterest', order: 1 },
  instagram: { id: 2, name: 'Instagram', Icon: InstagramIcon, slug: 'instagram', order: 2 },
  linkedIn: { id: 3, name: 'LinkedIn', Icon: LinkedInIcon, slug: 'linkedIn', order: 3 },
  twitter: { id: 4, name: 'Twitter', Icon: TwitterIcon, slug: 'twitter', order: 4 },
  facebook: { id: 5, name: 'Facebook', Icon: FacebookIcon, slug: 'facebook', order: 5 },
  youtube: { id: 6, name: 'Youtube', Icon: YouTubeIcon, slug: 'youtube', order: 6 },
};
