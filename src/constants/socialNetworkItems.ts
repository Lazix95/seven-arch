import { FacebookIcon, InstagramIcon, LinkedInIcon, PinterestIcon, TwitterIcon, YouTubeIcon } from '@/features/shared/icons/materialUiIcons';
import { SocialNetwork } from '@/models/generalModels';

export const socialNetworkItems: SocialNetwork[] = [
  {
    id: 1,
    name: 'Pinterest',
    Icon: PinterestIcon,
  },

  {
    id: 2,
    name: 'Instagram',
    Icon: InstagramIcon,
  },

  {
    id: 3,
    name: 'LinkedIn',
    Icon: LinkedInIcon,
  },

  {
    id: 4,
    name: 'Twitter',
    Icon: TwitterIcon,
  },

  {
    id: 5,
    name: 'Facebook',
    Icon: FacebookIcon,
  },

  {
    id: 6,
    name: 'Youtube',
    Icon: YouTubeIcon,
  },
];
