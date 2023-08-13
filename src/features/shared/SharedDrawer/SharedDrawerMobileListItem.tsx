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
      {items.map(({ label, Icon, subItems, to }, index) => (
        <Fragment key={`${label} - fragment`}>
          <ListItem key={label} disablePadding>
            <Link style={{ textDecoration: 'none', color: 'inherit', width: '100%' }} href={to}>
              <ListItemButton dense={dense}>
                {Icon && (
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                )}
                <ListItemText>{label}</ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>

          <SharedIf RIf={showSubList}>
            {subItems?.map((subItem) => (
              <ListItem style={{ paddingLeft: 15 }} key={subItem.label} disablePadding>
                <Link style={{ textDecoration: 'none', color: 'inherit' }} href={subItem.to}>
                  <ListItemButton dense>
                    {subItem.Icon && (
                      <ListItemIcon>
                        <subItem.Icon />
                      </ListItemIcon>
                    )}
                    <ListItemText>{subItem.label}</ListItemText>
                  </ListItemButton>
                </Link>
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
