import { useMediaQuery, useTheme } from '@mui/material';

export function useDevices() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return { isDesktop, isMobile };
}
