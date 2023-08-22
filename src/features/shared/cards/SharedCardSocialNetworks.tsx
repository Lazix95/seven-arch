import { DivProps, ReactComponent } from '@/models/generalModels';
import { DocumentSocialNetworkWithIcon, SocialNetwork, SocialNetworkSlug } from '@/models/socialNetworks';
import { SharedButton, SharedButtonIconProps } from '../SharedButton';
import { socialNetworksMap } from '@/constants/socialNetworkItems';
import { ReactNode } from 'react';

export interface SharedCardSocialNetworksProps {
  btnsProps?: Omit<SharedButtonIconProps, 'btnType'>;
  containerProps?: DivProps;
  socialNetworks?: DocumentSocialNetworkWithIcon[];
  onClick?: (socialNetwork: DocumentSocialNetworkWithIcon) => void;
}

function Icon({slug}: {slug:  SocialNetworkSlug}): ReactNode {
  return socialNetworksMap[slug].Icon as unknown as ReactNode;
}

export function SharedCardSocialNetworks({ socialNetworks = [], containerProps, btnsProps, onClick }: SharedCardSocialNetworksProps) {

  const socialNetworksIcons= socialNetworks.map((social) => ({
    ...social,
    Icon: socialNetworksMap[social.slug].Icon,
  })).sort((a,b) => {
    const x = a.order && a.state ? Number(a.order) : 0
    const y = b.order && b.state ? Number(b.order) : 0
    return x-y;
  });

  console.log(socialNetworksIcons)

  return (
    <div {...containerProps}>
      {socialNetworksIcons.map((social) => (
        <SharedButton style={{ marginRight: '5px' }} btnType={'Icon'} key={social.id} {...btnsProps} onClick={() => onClick?.(social)}>
          {social.Icon && <social.Icon />}
        </SharedButton>
      ))}
    </div>
  );
}
