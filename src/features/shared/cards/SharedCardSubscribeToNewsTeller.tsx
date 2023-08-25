import { Typography } from '@mui/material';
import { SharedButton } from '../SharedButton';
import { SharedGridContainer } from '../SharedDrawer/SharedGridContainer';
import { SharedTextField } from '../form/SharedTextField';
import { SharedGridItem } from '../grid/SharedGridItem';
import { useState } from 'react';

export interface SharedCardSubscribeToNewstellerProps {
  readonly text: string;
  readonly btnText: string;
  readonly onSubscribe?: (email: string) => void;
}

export function SharedCardSubscribeToNewsTeller({ text, btnText, onSubscribe }: SharedCardSubscribeToNewstellerProps) {
  const [email, setEmail] = useState('');

  function handleSubscribeClick() {
    onSubscribe?.(email);
  }

  return (
    <SharedGridContainer centerX={false} centerY={false} sx={{ backgroundColor: '#333', height: '100%', width: '100%', margin: 0, padding: '24px' }}>
      <SharedGridContainer spacing={0} sx={{ margin: 'auto auto auto auto' }}>
        <SharedGridItem mb={2} xs={12}>
          <Typography fontWeight={500} color="white">
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
