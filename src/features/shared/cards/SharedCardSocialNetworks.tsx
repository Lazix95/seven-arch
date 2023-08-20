import { socialNetworkItems } from '@/constants/socialNetworkItems';
import { DivProps, SocialNetwork } from '@/models/generalModels';
import { SharedButton, SharedButtonIconProps } from '../SharedButton';

export interface SharedCardSocialNetworksProps {
  btnsProps?: Omit<SharedButtonIconProps, 'btnType'>;
  containerProps?: DivProps;
  socialNetworks?: SocialNetwork[];
  onClick?: (socialNetwork: SocialNetwork) => void;
}

export function SharedCardSocialNetworks({ socialNetworks = socialNetworkItems, containerProps, btnsProps, onClick }: SharedCardSocialNetworksProps) {
  return (
    <div {...containerProps}>
      {socialNetworks.map((social) => (
        <SharedButton style={{ marginRight: '5px' }} btnType={'Icon'} key={social.id} {...btnsProps} onClick={() => onClick?.(social)}>
          <social.Icon />
        </SharedButton>
      ))}
    </div>
  );
}
