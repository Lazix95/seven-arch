import { ThemeOptions, Typography } from '@mui/material';

export const baseComponents: ThemeOptions['components'] = {
  MuiListItemIcon: {
    defaultProps: { sx: { minWidth: '30px' } },
  },
};

export const dakrComponents: ThemeOptions['components'] = {
  ...baseComponents,
};
