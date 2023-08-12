import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Fragment } from 'react';
import { SharedDrawerItem } from './SharedDrawer';
import { SharedIf } from '../SharedIf';
import Link from 'next/link';

interface SharedDrawerItemListProps {
  readonly showSubList?: boolean;
  readonly items: SharedDrawerItem[];
  readonly dense?: boolean;
  readonly subItem?: boolean;
}

export function SharedDrawerMobileListItem({ items, dense, showSubList }: SharedDrawerItemListProps) {
  return (
    <List sx={{ pt: 0 }}>
      {items.map(({ label, Icon, subItems, toItem }, index) => (
        <Fragment key={`${label} - fragment`}>
          <ListItem key={label} disablePadding>
            <ListItemButton dense={dense}>
              {Icon && (
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
              )}
              <ListItemText>
                <Link style={{ textDecoration: 'none', color: 'inherit' }} href={toItem}>
                  {label}
                </Link>
              </ListItemText>
            </ListItemButton>
          </ListItem>

          <SharedIf RIf={showSubList}>
            {subItems?.map((subItem) => (
              <ListItem style={{ paddingLeft: 15 }} key={subItem.label} disablePadding>
                <ListItemButton dense>
                  {subItem.Icon && (
                    <ListItemIcon>
                      <subItem.Icon />
                    </ListItemIcon>
                  )}
                  <ListItemText>
                    <Link style={{ textDecoration: 'none', color: 'inherit' }} href={subItem.to}>
                      {subItem.label}
                    </Link>
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
            <SharedIf RIf={index < items.length - 1}>
              <Divider />
            </SharedIf>
          </SharedIf>
        </Fragment>
      ))}
    </List>
  );
}
