import { createTheme } from '@mui/material/styles';
import { dakrComponents, baseComponents } from './componentStyling';

export type ThemeType = 'light' | 'transparentDark';

export const sharedThemeTransparentDark = createTheme({
  components: dakrComponents,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1200,
      xl: 1920,
    },
  },
  palette: {
    text: {
      secondary: '#ffffff',
    },
    mode: 'light',
    background: {
      default: '#1a1a1a',
    },
    primary: {
      main: '#d5df26', //'#d5df265f',
    },
    // secondary: {
    //   main: '#0933F5',
    // },
  },
});

export const sharedThemeDefaultLight = createTheme({
  components: baseComponents,
  palette: {
    mode: 'light',
    primary: {
      main: '#d5df26',
      contrastText: '#212121',
    },
    secondary: {
      main: '#00BCD4',
      contrastText: '#212121',
    },
  },
});
