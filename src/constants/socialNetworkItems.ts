import { FacebookIcon, InstagramIcon, LinkedInIcon, PinterestIcon, TwitterIcon, YouTubeIcon } from '@/features/shared/icons/materialUiIcons';
import { SocialNetwork, SocialNetworkSlug } from '@/models/socialNetworks';

export const socialNetworksMap: Record<SocialNetworkSlug, SocialNetwork> = {
  pinterest: { id: 1, name: 'Pinterest', Icon: PinterestIcon, slug: 'pinterest' },
  instagram: { id: 2, name: 'Instagram', Icon: InstagramIcon, slug: 'instagram' },
  linkedIn: { id: 3, name: 'LinkedIn', Icon: LinkedInIcon, slug: 'linkedIn' },
  twitter: { id: 4, name: 'Twitter', Icon: TwitterIcon, slug: 'twitter' },
  facebook: { id: 5, name: 'Facebook', Icon: FacebookIcon, slug: 'facebook' },
  youtube: { id: 6, name: 'Youtube', Icon: YouTubeIcon, slug: 'youtube' },
};
