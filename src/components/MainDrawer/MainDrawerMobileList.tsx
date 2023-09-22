import { Box, Grid, Typography } from '@mui/material';
import { MainDrawerMobileListItem } from './MainDrawerMobileListItem';
import { MainDrawerItem } from './MainDrawer';

interface MainDrawerMobileListProps {
  readonly items: MainDrawerItem[];
  readonly onChange: (event: boolean) => void;
  readonly title: string;
  readonly showSubList?: boolean;
}

export function MainDrawerMobileList({ items, onChange, showSubList, title }: MainDrawerMobileListProps) {
  const handlers = {
    onClick: () => onChange(false),
    onKeyDown: () => onChange(false),
  };

  return (
    <Box sx={{ width: 250 }} role="presentation" {...handlers}>
      <Grid container spacing={2} sx={{ height: '100%' }}>
        <Grid item xs={12}>
          <Typography sx={{ pl: '15px' }} variant={'h6'}>
            {title}
          </Typography>
          <MainDrawerMobileListItem showSubList={showSubList} items={items ?? []} />
        </Grid>
      </Grid>
    </Box>
  );
}
