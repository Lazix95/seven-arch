import { createTheme, ThemeOptions } from '@mui/material/styles';

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

export const sharedThemeDarkTransparent = createTheme({
  palette: {
    text: {
      secondary: '#ffffff',
    },
    mode: 'light',
    background: {
      default: '#1a1a1a',
    },
    primary: {
      main: '#d5df265f',
    },
    // secondary: {
    //   main: '#0933F5',
    // },
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
