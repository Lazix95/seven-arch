import { createTheme } from '@mui/material/styles';

// Create a theme instance.
export const sharedThemeDefaultDark = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff',
      dark: '#000000',
    },
    secondary: {
      main: '#0933F5',
      dark: '#ff0000',
    },
  },
});

export const sharedThemeDefaultLight = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#d5df26',
    },
  },
});
