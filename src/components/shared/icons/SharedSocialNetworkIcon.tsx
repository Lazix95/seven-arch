import { SocialNetworkSlug } from '@/models/socialNetworks';
import { socialNetworksMap } from '@/constants/socialNetworkItems';
import { DivProps } from '@/models/generalModels';

export interface SharedSocialNetworkIconProps extends DivProps {
  readonly slug: SocialNetworkSlug;
}

export function SharedSocialNetworkIcon({ slug, ...rest }: SharedSocialNetworkIconProps) {
  const Icon = socialNetworksMap[slug].Icon;
  return <Icon {...rest} />;
}
