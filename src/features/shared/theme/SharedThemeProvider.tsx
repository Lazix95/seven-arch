import { sharedThemeDefaultDark, sharedThemeDefaultLight, sharedThemeDarkTransparent } from '@/themes/sharedThemeDefault';
import { CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import { ReactNode } from 'react';
import { useRouter } from 'next/router';

export function SharedThemeProvider({ mode, children }: { mode?: 'light' | 'dark'; children: ReactNode }) {
  const router = useRouter();
  const isHomePage = router.pathname === '/';

  const theme = isHomePage ? sharedThemeDarkTransparent : sharedThemeDefaultLight;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
