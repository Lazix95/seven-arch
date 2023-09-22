import { useState, PointerEvent } from 'react';
import { MainDrawerDesktopListItem } from './MainDrawerDesktopListItem';
import { Box, Grid, Typography } from '@mui/material';
import { MainDrawerItem, MainDrawerSubItem } from './MainDrawer';
import { SharedIf } from '../shared/util/SharedIf';
import { SharedButton } from '../shared/form/SharedButton';
import { CloseIcon } from '@/components/shared/icons/SharedMaterialUiIcons';

interface MainDrawerDesktopListProps {
  readonly items: MainDrawerItem[];
  readonly showSubList: boolean;
  readonly title: string;
  readonly currentItem?: MainDrawerItem;
  readonly onChange?: (event: boolean) => void;
  readonly onItemClick?: (item: MainDrawerItem | MainDrawerSubItem) => void;
}

export function MainDrawerDesktopList({ items, showSubList, currentItem, title, onChange, onItemClick }: MainDrawerDesktopListProps) {
  const [hoveredItem, setHoveredItem] = useState<MainDrawerItem>(currentItem ?? items[0]);

  function handleCloseDrawer() {
    onChange?.(false);
  }

  function handleHoverOnDrawerItem(item: MainDrawerItem | MainDrawerSubItem) {
    if (item.type === 'MainItem') setHoveredItem(item);
  }

  function handleMenuClick(e: PointerEvent, item: MainDrawerItem | MainDrawerSubItem) {
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
          <MainDrawerDesktopListItem
            mainItems={true}
            selectedItemId={hoveredItem.id}
            items={items ?? []}
            onHover={handleHoverOnDrawerItem}
            onClick={handleMenuClick}
          />
        </Grid>

        <SharedIf RIf={showSubList}>
          <Grid style={{ paddingLeft: 0 }} item xs={6}>
            <Typography variant={'h6'} style={{ marginLeft: '18px', marginTop: '12px' }}>
              {hoveredItem.label}
            </Typography>
            <MainDrawerDesktopListItem dense items={hoveredItem.subItems || []} onClick={handleMenuClick} />
          </Grid>
        </SharedIf>
      </Grid>
    </Box>
  );
}
