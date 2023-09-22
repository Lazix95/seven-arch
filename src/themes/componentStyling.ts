import { ThemeOptions, Typography } from '@mui/material';

export const baseComponents: ThemeOptions['components'] = {
  MuiListItemIcon: {
    defaultProps: { sx: { minWidth: '30px' } },
  },
  MuiFormHelperText: {
    defaultProps: { sx: { mt: 0, mb: '5px' } },
  },
};

export const dakrComponents: ThemeOptions['components'] = {
  ...baseComponents,
};
