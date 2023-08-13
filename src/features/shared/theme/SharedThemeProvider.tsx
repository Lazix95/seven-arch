import { sharedThemeDefaultLight, sharedThemeTransparent } from '@/themes/sharedThemeDefault';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ReactNode } from 'react';
import { useLocalRouter } from '@/hooks/useLocalRouter';

export function SharedThemeProvider({ mode, children }: { mode?: 'light' | 'dark'; children: ReactNode }) {
  const { isHomePage } = useLocalRouter();

  const theme = isHomePage ? sharedThemeTransparent : sharedThemeDefaultLight;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
