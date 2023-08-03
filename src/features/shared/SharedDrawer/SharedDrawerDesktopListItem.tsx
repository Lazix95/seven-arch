import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { SharedDrawerItem } from './SharedDrawer';

interface SharedDrawerItemListProps {
  items: SharedDrawerItem[];
  onHover?: (index: number) => void;
  readonly selectedIndex?: number | null;
  dense?: boolean;
}

export function SharedDrawerDesktopListItem({ items, selectedIndex, onHover, dense }: SharedDrawerItemListProps) {
  return (
    <List>
      {items.map(({ label, Icon }, index) => (
        <ListItem key={label} disablePadding>
          <ListItemButton selected={selectedIndex === index} dense={dense} onMouseEnter={() => onHover?.(index)}>
            {Icon && (
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
            )}
            <ListItemText primary={label} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
