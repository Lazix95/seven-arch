import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Fragment } from 'react';
import { MainDrawerItem } from './MainDrawer';
import { SharedIf } from '../shared/util/SharedIf';
import Link from 'next/link';

interface MainDrawerItemListProps {
  readonly showSubList?: boolean;
  readonly items: MainDrawerItem[];
  readonly dense?: boolean;
  readonly subItem?: boolean;
}

export function MainDrawerMobileListItem({ items, dense, showSubList }: MainDrawerItemListProps) {
  return (
    <List sx={{ pt: 0 }}>
      {items.map(({ label, subItems, to }, index) => (
        <Fragment key={`${label} - fragment`}>
          <ListItem key={label} disablePadding>
            <Link style={{ textDecoration: 'none', color: 'inherit', width: '100%' }} href={to}>
              <ListItemButton dense={dense}>
                <ListItemText>{label}</ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>

          <SharedIf RIf={showSubList}>
            {subItems?.map((subItem) => (
              <ListItem style={{ paddingLeft: 15 }} key={subItem.label} disablePadding>
                <Link style={{ textDecoration: 'none', color: 'inherit' }} href={subItem.to}>
                  <ListItemButton dense>
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
