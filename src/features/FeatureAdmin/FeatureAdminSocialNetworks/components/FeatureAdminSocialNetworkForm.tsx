import { SharedOutlinedContainer } from '@/components/shared/grid/SharedOutlinedContainer';
import { SharedTextField } from '@/components/shared/form/SharedTextField';
import { DocumentSocialNetwork } from '@/models/socialNetworks';
import { SharedSocialNetworkIcon } from '@/components/shared/icons/SharedSocialNetworkIcon';

export interface FeatureAdminSocialNetworkFormProps {
  socialNetwork: DocumentSocialNetwork;
  linkValue: string | undefined;
  onLinkChange: (socialNetwork: DocumentSocialNetwork, link: string) => void;
}

export function FeatureAdminSocialNetworkForm({ socialNetwork, linkValue, onLinkChange }: FeatureAdminSocialNetworkFormProps) {
  return (
    <SharedOutlinedContainer
      label={
        <div className={'u-center--x'}>
          <SharedSocialNetworkIcon slug={socialNetwork.slug} className={'u-mr--3'} />
          {socialNetwork.name}
        </div>
      }
    >
      <SharedTextField style={{ marginTop: '20px' }} fullWidth label={'Link'} value={linkValue ?? ''} onChange={(event) => onLinkChange(socialNetwork, event.target.value)} />
    </SharedOutlinedContainer>
  );
}
