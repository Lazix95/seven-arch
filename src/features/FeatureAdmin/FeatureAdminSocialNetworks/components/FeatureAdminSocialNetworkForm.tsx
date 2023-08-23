import { SharedOutlinedContainer } from '@/features/shared/grid/SharedOutlinedContainer';
import { SharedTextField } from '@/features/shared/form/SharedTextField';
import { DocumentSocialNetworkWithIcon } from '@/models/socialNetworks';
import { SharedAutoComplete } from '@/features/shared/form/SharedAutoComplete';
import { socialNetworksMap } from '@/constants/socialNetworkItems';

export interface FeatureAdminSocialNetworkFormProps {
  socialNetwork: DocumentSocialNetworkWithIcon;
  linkValue: string | undefined;
  onLinkChange: (socialNetwork: DocumentSocialNetworkWithIcon, link: string) => void;
}

export function FeatureAdminSocialNetworkForm({ socialNetwork, linkValue, onLinkChange }: FeatureAdminSocialNetworkFormProps) {
  return (
    <SharedOutlinedContainer
      label={
        <div className={'u-center--x'}>
          {socialNetwork.Icon && <socialNetwork.Icon className={'u-mr--3'} />} {socialNetwork.name}
        </div>
      }
    >
      <SharedTextField style={{ marginTop: '20px' }} fullWidth label={'Link'} value={linkValue ?? ''} onChange={(event) => onLinkChange(socialNetwork, event.target.value)} />
    </SharedOutlinedContainer>
  );
}
