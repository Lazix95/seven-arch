import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { SharedDrawerItem } from './SharedDrawer';
import Link from 'next/link';

interface SharedDrawerItemListProps {
  readonly items: SharedDrawerItem[];
  readonly onHover?: (index: number) => void;
  readonly selectedIndex?: number | null;
  readonly dense?: boolean;
}

export function SharedDrawerDesktopListItem({ items, selectedIndex, onHover, dense }: SharedDrawerItemListProps) {
  return (
    <List>
      {items.map(({ label, Icon, to }, index) => (
        <ListItem key={label} disablePadding>
          <Link style={{ textDecoration: 'none', color: 'inherit', width: '100%' }} href={to}>
            <ListItemButton selected={selectedIndex === index} dense={dense} onMouseEnter={() => onHover?.(index)}>
              {Icon && (
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
              )}
              <ListItemText>{label}</ListItemText>
            </ListItemButton>
          </Link>
        </ListItem>
      ))}
    </List>
  );
}
