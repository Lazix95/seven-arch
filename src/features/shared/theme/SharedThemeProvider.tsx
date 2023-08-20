import { ThemeType, sharedThemeDefaultLight, sharedThemeTransparentDark } from '@/themes/sharedThemeDefault';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ReactNode, useMemo } from 'react';

export interface SharedThemeProviderProps {
  themeType?: ThemeType;
  children: ReactNode;
}

export function SharedThemeProvider({ themeType, children }: SharedThemeProviderProps) {
  const theme = useMemo(() => {
    if (themeType === 'transparentDark') return sharedThemeTransparentDark;
    return sharedThemeDefaultLight;
  }, [themeType]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
