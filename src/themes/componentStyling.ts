import { ThemeOptions } from '@mui/material';

export const components: ThemeOptions['components'] = {
  MuiListItemIcon: {
    defaultProps: { sx: { minWidth: '30px' } },
  },
};
