import { DivProps } from '@/models/generalModels';
import { SocialNetwork } from '@/models/socialNetworks';
import { SharedButton, SharedButtonIconProps } from '../SharedButton';

export interface SharedCardSocialNetworksProps {
  btnsProps?: Omit<SharedButtonIconProps, 'btnType'>;
  containerProps?: DivProps;
  socialNetworks?: SocialNetwork[];
  onClick?: (socialNetwork: SocialNetwork) => void;
}

export function SharedCardSocialNetworks({ socialNetworks = [], containerProps, btnsProps, onClick }: SharedCardSocialNetworksProps) {
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
