import clsx from 'clsx';
import { SharedGridSwitch } from '@/features/shared/form/SharedGridSwitch';
import { DocumentSocialNetworkWithIcon } from '@/models/socialNetworks';

export interface FeatureSocialNetworkItemProps {
  socialNetwork: DocumentSocialNetworkWithIcon;
  onChange: (socialNetwork: DocumentSocialNetworkWithIcon, state: boolean) => void;
  value: boolean;
}

export function FeatureAdminSocialNetworkToggleItem({ socialNetwork, value, onChange }: FeatureSocialNetworkItemProps) {
  return (
    <SharedGridSwitch value={value} onChange={(state) => onChange(socialNetwork, state)}>
      <div style={{ marginLeft: '30%' }} className={clsx(['u-center--x', 'u-test-align-start'])}>
        {!!socialNetwork.Icon && <socialNetwork.Icon className={'u-mr--3'} />}
        <span>{socialNetwork.name}</span>
      </div>
    </SharedGridSwitch>
  );
}
