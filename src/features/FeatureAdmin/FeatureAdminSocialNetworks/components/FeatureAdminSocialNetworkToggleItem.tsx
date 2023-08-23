import clsx from 'clsx';
import { SharedGridSwitch } from '@/features/shared/form/SharedGridSwitch';
import { DocumentSocialNetworkWithIcon } from '@/models/socialNetworks';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { SharedSocialNetworkIcon } from '@/features/shared/icons/SharedSocialNetworkIcon';

export interface FeatureSocialNetworkItemProps {
  socialNetwork: DocumentSocialNetworkWithIcon;
  onChange: (socialNetwork: DocumentSocialNetworkWithIcon, state: boolean) => void;
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
