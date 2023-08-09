import React from 'react';
import { ReactNode } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { Container } from '@mui/material';
import { SharedDefaultFooter } from '../../SharedDefaultFooter';
import { SharedIf } from '../../SharedIf';
import { getNamedChild } from '@/utils/SharedReactUtils';
import { useUserContext } from '@/features/firebase/context/userContext';
import { SharedButton } from '../../SharedButton';

interface SharedMainLayoutProps {
  readonly children: ReactNode;
  readonly drawerValue?: boolean;
  readonly title: string;
  readonly onDrawerChange?: (state: boolean) => void;
  readonly onSignOut?: () => void;
  readonly Footer?: () => JSX.Element;
  readonly UpperNavList?: (() => JSX.Element) | undefined;
  readonly LowerNavList?: (() => JSX.Element) | undefined;
  readonly Drawer?: (() => JSX.Element) | undefined;
}

export function SharedMainLayout({ children, title, Footer = SharedDefaultFooter, UpperNavList, LowerNavList, drawerValue, onDrawerChange, onSignOut }: SharedMainLayoutProps) {
  const Drawer = getNamedChild(children, 'drawer');
  const user = useUserContext();
  const showUpper = UpperNavList !== undefined;
  const showLower = LowerNavList !== undefined;
  const showDrawer = Drawer !== undefined;

  function handleDrawerChange() {
    onDrawerChange?.(!drawerValue);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position={'sticky'} elevation={2} sx={{ mb: '24px', borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
        <Toolbar sx={{ flexWrap: 'wrap', borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            {title}
          </Typography>

          <SharedIf RIf={showUpper}>
            <nav>{showUpper && <UpperNavList />}</nav>
          </SharedIf>

          <SharedIf RIf={!!user}>
            <SharedButton btnType={'Icon'} aria-label={'Logout'} edge="end" onClick={onSignOut} sx={{ mr: 2 }}>
              <LogoutIcon />
            </SharedButton>
          </SharedIf>

          <SharedIf RIf={showDrawer}>
            <SharedButton btnType={'Icon'} aria-label="open drawer" edge="end" onClick={handleDrawerChange}>
              <MenuIcon />
            </SharedButton>
            {showDrawer && Drawer}
          </SharedIf>
        </Toolbar>

        <SharedIf RIf={showLower}>
          <Toolbar component="nav" variant="dense" sx={{ justifyContent: 'space-between', overflowX: 'auto' }}>
            <nav>{showLower && <LowerNavList />}</nav>
          </Toolbar>
        </SharedIf>
      </AppBar>

      {/* Main view */}
      <Container maxWidth={'sm'} sx={{ flexGrow: 1 }}>
        <main style={{ paddingLeft: 0, paddingRight: 0 }}>{children}</main>
      </Container>

      {/* Footer */}
      <footer style={{ marginTop: '24px' }}>
        <Footer />
      </footer>
    </div>
  );
}
