import { SharedOutlinedContainer } from '@/features/shared/grid/SharedOutlinedContainer';
import { SharedTextField } from '@/features/shared/form/SharedTextField';
import { DocumentSocialNetworkWithIcon } from '@/models/socialNetworks';
import { SharedAutoComplete } from '@/features/shared/form/SharedAutoComplete';
import { socialNetworksMap } from '@/constants/socialNetworkItems';

export interface FeatureAdminSocialNetworkFormProps {
  socialNetwork: DocumentSocialNetworkWithIcon;
  linkValue: string | undefined;
  orderValue: number | undefined;
  onLinkChange: (socialNetwork: DocumentSocialNetworkWithIcon, link: string) => void;
  onOrderChange: (socialNetwork: DocumentSocialNetworkWithIcon, order: number | undefined) => void;
}

export function FeatureAdminSocialNetworkForm({ socialNetwork, linkValue, orderValue, onLinkChange, onOrderChange }: FeatureAdminSocialNetworkFormProps) {
  const options = Object.values(socialNetworksMap).map((item) => ({ label: String(item.order), value: item.order }));

  return (
    <SharedOutlinedContainer
      label={
        <div className={'u-center--x'}>
          {socialNetwork.Icon && <socialNetwork.Icon className={'u-mr--3'} />} {socialNetwork.name}
        </div>
      }
    >
      <SharedTextField style={{ marginTop: '20px' }} fullWidth label={'Link'} value={linkValue ?? ''} onChange={(event) => onLinkChange(socialNetwork, event.target.value)} />
      {/*<SharedTextField fullWidth label={'Order'} value={orderValue ?? ''} onChange={(event) => onOrderChange(socialNetwork, event.target.value)} />*/}
      <SharedAutoComplete options={options} label={'Order'} value={Number(socialNetwork.order)} onChange={(e) => onOrderChange(socialNetwork, Number(e?.value))} />
    </SharedOutlinedContainer>
  );
}
