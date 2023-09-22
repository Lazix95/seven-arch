import React from 'react';
import { ReactNode } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { LogoutIcon, MenuIcon } from '@/components/shared/icons/SharedMaterialUiIcons';
import { Breakpoint, Container, useTheme } from '@mui/material';
import { SharedIf } from '../../shared/util/SharedIf';
import { getNamedChild } from '@/utils/SharedReactUtils';
import { useUserContext } from '@/context/userContext';
import { SharedButton } from '../../shared/form/SharedButton';
import { useLocalRouter } from '@/hooks/useLocalRouter';
import classes from './MainLayout.module.scss';
import { ReactComponent } from '@/models/generalModels';
import { HideOnScroll } from '@/components/shared/util/HideOnScroll';

interface MainLayoutProps {
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

export function MainLayout(props: MainLayoutProps) {
  const { children, title, drawerValue, isPublishLoading, isTransparentAppBar, UpperNavList, LowerNavList, maxMainWidth = 'sm' } = props;
  const { onDrawerChange, onSignOut, onPublishClick, onLogoClick } = props;
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
      <HideOnScroll>
        <AppBar
          position={'sticky'}
          elevation={2}
          sx={{
            mb: '24px',
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            backgroundColor: `${palette.primary.main}${isTransparentAppBar ? '5e' : ''}`,
          }}
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
      </HideOnScroll>

      <Container component={'main'} className={classes.mainContainer} maxWidth={maxMainWidth}>
        {defaultChildren}
      </Container>

      <footer className={classes['sharedMainLayout__footer']}>{Footer && Footer}</footer>
    </div>
  );
}
