import { useState, PointerEvent } from 'react';
import { SharedDrawerDesktopListItem } from './SharedDrawerDesktopListItem';
import { Box, Grid, Typography } from '@mui/material';
import { SharedDrawerItem, SharedDrawerSubItem } from './SharedDrawer';
import { SharedIf } from '../util/SharedIf';
import { SharedButton } from '../form/SharedButton';
import { CloseIcon } from '@/features/shared/icons/materialUiIcons';

interface SharedDrawerDesktopListProps {
  readonly items: SharedDrawerItem[];
  readonly showSubList: boolean;
  readonly title: string;
  readonly currentItem?: SharedDrawerItem;
  readonly onChange?: (event: boolean) => void;
  readonly onItemClick?: (item: SharedDrawerItem | SharedDrawerSubItem) => void;
}

export function SharedDrawerDesktopList({ items, showSubList, currentItem, title, onChange, onItemClick }: SharedDrawerDesktopListProps) {
  const [hoveredItem, setHoveredItem] = useState<SharedDrawerItem>(currentItem ?? items[0]);

  function handleCloseDrawer() {
    onChange?.(false);
  }

  function handleHoverOnDrawerItem(item: SharedDrawerItem | SharedDrawerSubItem) {
    if (item.type === 'MainItem') setHoveredItem(item);
  }

  function handleMenuClick(e: PointerEvent, item: SharedDrawerItem | SharedDrawerSubItem) {
    if (e.nativeEvent.pointerType === 'touch' && item.type === 'MainItem') {
      if (!hoveredItem || hoveredItem.id !== item.id) {
        setHoveredItem(item);
        return;
      }
    }
    onItemClick?.(item);
    onChange?.(false);
  }

  return (
    <Box className={'u-flex--auto-height'} sx={{ width: showSubList ? 600 : 250, paddingTop: '80px' }} role="presentation">
      <SharedButton className={'closeBtn'} btnType={'Icon'} onClick={handleCloseDrawer}>
        <CloseIcon />
      </SharedButton>
      <Grid container spacing={2} sx={{ height: '100%' }}>
        <Grid style={{ paddingLeft: '70px' }} item xs={showSubList ? 6 : 12}>
          <Typography variant={'h6'} style={{ marginLeft: '18px', marginTop: '12px' }}>
            {title}
          </Typography>
          <SharedDrawerDesktopListItem mainItems={true} selectedItemId={hoveredItem.id} items={items ?? []} onHover={handleHoverOnDrawerItem} onClick={handleMenuClick} />
        </Grid>

        <SharedIf RIf={showSubList}>
          <Grid style={{ paddingLeft: 0 }} item xs={6}>
            <Typography variant={'h6'} style={{ marginLeft: '18px', marginTop: '12px' }}>
              {hoveredItem.label}
            </Typography>
            <SharedDrawerDesktopListItem dense items={hoveredItem.subItems || []} onClick={handleMenuClick} />
          </Grid>
        </SharedIf>
      </Grid>
    </Box>
  );
}
