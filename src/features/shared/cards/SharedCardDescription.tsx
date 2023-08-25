import { Typography } from '@mui/material';
import { SharedButton } from '../SharedButton';
import { SharedGridContainer } from '../SharedDrawer/SharedGridContainer';
import { SharedTextField } from '../form/SharedTextField';
import { SharedGridItem } from '../grid/SharedGridItem';
import { useState } from 'react';

export interface SharedCardDescriptionProps {
  readonly text: string;
}

export function SharedCardDescription({ text }: SharedCardDescriptionProps) {
  return (
    <SharedGridContainer centerX={false} centerY={false} sx={{ backgroundColor: '#333', height: '100%', width: '100%', margin: 0, padding: '24px' }}>
      <SharedGridContainer spacing={0} sx={{ margin: 'auto auto auto auto' }}>
        <SharedGridItem mb={2} xs={12}>
          <Typography fontWeight={500} color="white">
            {text}
          </Typography>
        </SharedGridItem>
      </SharedGridContainer>
    </SharedGridContainer>
  );
}
