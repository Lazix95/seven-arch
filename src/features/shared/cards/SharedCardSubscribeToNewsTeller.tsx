import { Typography } from '@mui/material';
import { SharedButton } from '../SharedButton';
import { SharedGridContainer, SharedGridContainerProps } from '../SharedDrawer/SharedGridContainer';
import { SharedTextField } from '../form/SharedTextField';
import { SharedGridItem } from '../grid/SharedGridItem';
import { useMemo, useState } from 'react';
import { FeatureTextAlign } from '@/models/articleModels';

export interface SharedCardSubscribeToNewstellerProps {
  readonly text: string;
  readonly btnText: string;
  readonly onSubscribe?: (email: string) => void;
  readonly align?: FeatureTextAlign;
  readonly containerProps?: Omit<SharedGridContainerProps, 'children'>;
}

export function SharedCardSubscribeToNewsTeller({ text, btnText, onSubscribe, containerProps, align }: SharedCardSubscribeToNewstellerProps) {
  const [email, setEmail] = useState('');
  const styles = useMemo(() => ({ backgroundColor: '#333', height: '100%', width: '100%', margin: 0, padding: '24px' }), []);

  function handleSubscribeClick() {
    onSubscribe?.(email);
  }

  return (
    <SharedGridContainer centerX={false} centerY={false} sx={styles} {...containerProps}>
      <SharedGridContainer spacing={0} sx={{ margin: 'auto auto auto auto' }}>
        <SharedGridItem mb={2} xs={12}>
          <Typography fontWeight={500} color="white" align={align}>
            {text}
          </Typography>
        </SharedGridItem>

        <SharedGridItem xs={12}>
          <SharedTextField label={'Email'} onChange={(e) => setEmail(e.target.value)} />
        </SharedGridItem>

        <SharedGridItem xs={12}>
          <SharedButton onClick={handleSubscribeClick} fullWidth>
            {btnText}
          </SharedButton>
        </SharedGridItem>
      </SharedGridContainer>
    </SharedGridContainer>
  );
}
