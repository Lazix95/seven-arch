import clsx from 'clsx';
import { SharedGridSwitch } from '@/features/shared/form/SharedGridSwitch';
import { DocumentSocialNetwork } from '@/models/socialNetworks';
import { SharedSocialNetworkIcon } from '@/features/shared/icons/SharedSocialNetworkIcon';
import { DragIndicatorIcon } from '@/features/shared/icons/materialUiIcons';

export interface FeatureSocialNetworkItemProps {
  socialNetwork: DocumentSocialNetwork;
  onChange: (socialNetwork: DocumentSocialNetwork, state: boolean) => void;
  className?: string;
  value: boolean;
}

export function FeatureAdminSocialNetworkToggleItem({ socialNetwork, value, className, onChange }: FeatureSocialNetworkItemProps) {
  return (
    <div className={className}>
      <SharedGridSwitch value={value} onChange={(state) => onChange(socialNetwork, state)}>
        <div style={{ marginLeft: '30%' }} className={clsx(['u-center--x', 'u-test-align-start'])}>
          <DragIndicatorIcon className={'u-mr--3 dndHandle'} />
          <SharedSocialNetworkIcon slug={socialNetwork.slug} className={'u-mr--3'} />
          <span>{socialNetwork.name}</span>
        </div>
      </SharedGridSwitch>
    </div>
  );
}
