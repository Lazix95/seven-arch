import { List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { SharedDrawerItem, SharedDrawerSubItem } from './SharedDrawer';
import { SharedIf } from '../util/SharedIf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import { PointerEvent } from 'react';

interface SharedDrawerItemListProps {
  readonly items: SharedDrawerItem[] | SharedDrawerSubItem[];
  readonly dense?: boolean;
  readonly mainItems?: boolean;
  readonly selectedItemId?: number;
  readonly onHover?: (item: SharedDrawerItem | SharedDrawerSubItem) => void;
  readonly onClick?: (e: PointerEvent, item: SharedDrawerItem | SharedDrawerSubItem) => void;
}

export function SharedDrawerDesktopListItem({ items, dense, mainItems, selectedItemId, onHover, onClick }: SharedDrawerItemListProps) {
  return (
    <List>
      {items.map((item) => (
        <ListItem key={item.label} disablePadding>
          <div style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
            <ListItemButton
              className={clsx({ desktopMenuItem: mainItems, desktopMenuSubItem: !mainItems })}
              selected={selectedItemId === item.id}
              dense={dense}
              onClick={(e) => onClick?.(e as unknown as PointerEvent, item)}
              onMouseEnter={() => onHover?.(item)}
            >
              <ListItemText>
                <SharedIf RIf={item.type === 'MainItem'}>
                  <Typography fontWeight={'bold'} variant={'h5'}>
                    {item.label}
                  </Typography>
                </SharedIf>

                <SharedIf RIf={item.type === 'SubItem'}>
                  <FontAwesomeIcon icon={faReply} flip="horizontal" size="lg" />
                  <Typography ml={1} component={'span'}>
                    {item.label}
                  </Typography>
                </SharedIf>
              </ListItemText>
            </ListItemButton>
          </div>
        </ListItem>
      ))}
    </List>
  );
}
