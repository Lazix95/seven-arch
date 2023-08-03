import { Box, Grid, Typography } from '@mui/material';
import { SharedDrawerMobileListItem } from './SharedDrawerMobileListItem';
import { SharedDrawerItem } from './SharedDrawer';

interface SharedDrawerMobileListProps {
  readonly items: SharedDrawerItem[];
  readonly onChange: (event: boolean) => void;
  readonly title: string;
  readonly showSubList?: boolean;
}

export function SharedDrawerMobileList({ items, onChange, showSubList, title }: SharedDrawerMobileListProps) {
  const handlers = {
    onClick: () => onChange(false),
    onKeyDown: () => onChange(false),
  };

  return (
    <Box sx={{ height: '100%', width: 250 }} role="presentation" {...handlers}>
      <Grid container spacing={2} sx={{ height: '100%' }}>
        <Grid item xs={12}>
          <Typography sx={{ pl: '19px' }} variant={'h6'}>
            {title}
          </Typography>
          <SharedDrawerMobileListItem showSubList={showSubList} items={items ?? []} />
        </Grid>
      </Grid>
    </Box>
  );
}
