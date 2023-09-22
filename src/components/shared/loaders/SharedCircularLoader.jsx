import { CircularProgress, Grid } from '@mui/material';

export function SharedCircularLoader() {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flex: 'auto', flexDirection: 'column', justifyContent: 'center' }}>
      <Grid alignSelf={'center'} item>
        <CircularProgress />
      </Grid>
    </div>
  );
}
