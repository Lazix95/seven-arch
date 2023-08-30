import React from 'react';
import { ReactNode } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { Breakpoint, Container, useTheme } from '@mui/material';
import { SharedIf } from '../../SharedIf';
import { getNamedChild } from '@/utils/SharedReactUtils';
import { useUserContext } from '@/context/userContext';
import { SharedButton } from '../../SharedButton';
import { useLocalRouter } from '@/hooks/useLocalRouter';
import classes from './SharedMainLayout.module.scss';
import { ReactComponent } from '@/models/generalModels';

interface SharedMainLayoutProps {
  readonly children: ReactNode;
  readonly drawerValue?: boolean;
  readonly isTransparentAppBar?: boolean;
  readonly title: string;
  readonly maxMainWidth?: Breakpoint;
  readonly isPublishLoading?: boolean;
  readonly onDrawerChange?: (state: boolean) => void;
  readonly onSignOut?: () => void;
  readonly UpperNavList?: ReactComponent | undefined;
  readonly LowerNavList?: ReactComponent | undefined;
  readonly onPublishClick?: () => void;
  readonly onLogoClick?: () => void;
  readonly Drawer?: ReactComponent | undefined;
}

export function SharedMainLayout({
  children,
  title,
  drawerValue,
  maxMainWidth = 'sm',
  isPublishLoading,
  isTransparentAppBar,
  UpperNavList,
  LowerNavList,
  onDrawerChange,
  onSignOut,
  onPublishClick,
  onLogoClick,
}: SharedMainLayoutProps) {
  const Drawer = getNamedChild(children, 'drawer');
  const Footer = getNamedChild(children, 'footer');
  const defaultChildren = getNamedChild(children);
  const user = useUserContext();
  const { isAdminPage } = useLocalRouter();
  const { palette } = useTheme();
  const showUpper = UpperNavList !== undefined;
  const showLower = LowerNavList !== undefined;
  const showDrawer = Drawer !== undefined;

  function handleDrawerChange() {
    onDrawerChange?.(!drawerValue);
  }

  return (
    <div className={classes.sharedMainLayout}>
      <AppBar
        position={'sticky'}
        elevation={2}
        sx={{ mb: '24px', borderBottom: (theme) => `1px solid ${theme.palette.divider}`, backgroundColor: `${palette.primary.main}${isTransparentAppBar ? '5e' : ''}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap', borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
          <Typography onClick={onLogoClick} variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }} style={{ cursor: 'pointer' }}>
            {title}
          </Typography>

          <SharedIf RIf={showUpper}>
            <nav>{showUpper && <UpperNavList />}</nav>
          </SharedIf>

          <SharedIf RIf={isAdminPage && !!user}>
            <SharedButton btnType={'LoadingButton'} color={'secondary'} loading={isPublishLoading} onClick={onPublishClick} sx={{ mr: 2 }}>
              Publish
            </SharedButton>

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

      <Container component={'main'} className={classes.mainContainer} maxWidth={maxMainWidth}>
        {defaultChildren}
      </Container>

      <footer className={classes['sharedMainLayout__footer']}>{Footer && Footer}</footer>
    </div>
  );
}
