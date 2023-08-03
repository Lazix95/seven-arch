import { ReactElement } from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export function SharedCopyright(props: Record<string, unknown>): ReactElement {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
