import { Typography } from '@mui/material';
import { SharedButton } from '../SharedButton';
import { SharedGridContainer } from '../SharedDrawer/SharedGridContainer';
import { SharedGridInput } from '../form/SharedGridInput';
import { SharedTextField } from '../form/SharedTextField';
import { SharedGridItem } from '../grid/SharedGridItem';

export interface SharedCardSubscribeToNewstellerProps {}

export function SharedCardSubscribeToNewsteller({}: SharedCardSubscribeToNewstellerProps) {
  return (
    <SharedGridContainer centerX={false} centerY={false} sx={{ backgroundColor: '#333', height: '100%', width: '100%', margin: 0, padding: '24px' }}>
      <SharedGridContainer spacing={0} sx={{ margin: 'auto auto auto auto' }}>
        <SharedGridItem mb={2} xs={12}>
          <Typography fontWeight={500} color="white">
            Stay up to date with the latest Seven Arch projects and news.
          </Typography>
        </SharedGridItem>

        <SharedGridItem xs={12}>
          <SharedTextField />
        </SharedGridItem>

        <SharedGridItem xs={12}>
          <SharedButton fullWidth>Subscribe</SharedButton>
        </SharedGridItem>
      </SharedGridContainer>
    </SharedGridContainer>
  );
}
