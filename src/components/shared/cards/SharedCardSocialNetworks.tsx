import { DivProps } from '@/models/generalModels';
import { DocumentSocialNetwork } from '@/models/socialNetworks';
import { SharedButton, SharedButtonIconProps } from '../form/SharedButton';
import { SharedSocialNetworkIcon } from '@/components/shared/icons/SharedSocialNetworkIcon';
import { sortArray } from '@/utils/arrayUtils';
import { useMemo } from 'react';

export interface SharedCardSocialNetworksProps {
  btnsProps?: Omit<SharedButtonIconProps, 'btnType'>;
  containerProps?: DivProps;
  socialNetworks?: DocumentSocialNetwork[];
  onClick?: (socialNetwork: DocumentSocialNetwork) => void;
}

export function SharedCardSocialNetworks({ socialNetworks = [], containerProps, btnsProps, onClick }: SharedCardSocialNetworksProps) {
  return (
    <div {...containerProps}>
      {socialNetworks.map((social) => (
        <SharedButton style={{ marginRight: '5px' }} btnType={'Icon'} key={social.id} {...btnsProps} onClick={() => onClick?.(social)}>
          <SharedSocialNetworkIcon slug={social.slug} />
        </SharedButton>
      ))}
    </div>
  );
}
