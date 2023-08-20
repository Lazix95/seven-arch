import { createTheme } from '@mui/material/styles';
import { dakrComponents, baseComponents } from './componentStyling';

export type ThemeType = 'light' | 'transparentDark';

export const sharedThemeTransparentDark = createTheme({
  components: dakrComponents,
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
    },
  },
});
