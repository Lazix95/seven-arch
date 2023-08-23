// Plesae generate me a Material Ui Switch component that will be used in a Grid, 6 for a label and 6 for the switch.

import { FormControl, FormLabel, Switch } from '@mui/material';
import { SharedGridContainer } from '../SharedDrawer/SharedGridContainer';
import { SharedGridItem } from '../grid/SharedGridItem';
import { SharedIf } from '../SharedIf';
import { ChangeEvent, ReactNode } from 'react';

export interface FeatureSocialNetworksViewProps {
  readonly label?: string;
  readonly value?: boolean;
  readonly children?: ReactNode;
  readonly className?: string;
  readonly onChange?: (state: boolean) => void;
}

export function SharedGridSwitch({ label, value, children, onChange, ...rest }: FeatureSocialNetworksViewProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>, newValue: boolean) {
    onChange?.(newValue);
  }

  return (
    <SharedGridItem xs={12} {...rest}>
      <FormControl fullWidth>
        <SharedGridContainer margin={0} centerX={false} centerY={true} spacing={0}>
          <SharedGridItem xs={6}>
            <FormLabel component="legend">
              <SharedIf RIf={!!children} Fallback={() => <span>{label}</span>}>
                {children}
              </SharedIf>
            </FormLabel>
          </SharedGridItem>

          <SharedGridItem xs={6}>
            <Switch value={true} checked={value} onChange={handleChange} color="primary" />
          </SharedGridItem>
        </SharedGridContainer>
      </FormControl>
    </SharedGridItem>
  );
}
