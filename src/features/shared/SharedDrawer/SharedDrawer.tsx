import Drawer from '@mui/material/Drawer';
import { useMediaQuery, useTheme } from '@mui/material';
import { SharedDrawerDesktopList } from './SharedDrawerDeskropList';
import { SharedDrawerMobileList } from './SharedDrawerMobileList';
import { SharedIf } from '../util/SharedIf';
import styled from './SharedDriver.module.scss';
import { SharedCardSocialNetworks } from '../cards/SharedCardSocialNetworks';
import { DocumentSocialNetwork } from '@/models/socialNetworks';

interface SharedDrawerProps {
  readonly title: string;
  readonly value: boolean;
  readonly showSubList?: boolean;
  readonly items?: SharedDrawerItem[];
  readonly currentDrawerItem?: SharedDrawerItem;
  readonly socialNetworks?: DocumentSocialNetwork[];
  readonly onChange: (state: boolean) => void;
  readonly onMenuItemClick: (item: SharedDrawerItem | SharedDrawerSubItem) => void;
  readonly onSocialNetworkClick: (socialNetwork: DocumentSocialNetwork) => void;
}

interface SharedDrawerBaseItem {
  readonly id: number;
  readonly label: string;
  readonly to: string;
}

export interface SharedDrawerItem extends SharedDrawerBaseItem {
  readonly type: 'MainItem';
  readonly subItems?: SharedDrawerSubItem[];
}

export interface SharedDrawerSubItem extends SharedDrawerBaseItem {
  readonly type: 'SubItem';
  readonly label: string;
}

export function SharedDrawer({ value, items, title, currentDrawerItem, socialNetworks, showSubList = true, onChange, onMenuItemClick, onSocialNetworkClick }: SharedDrawerProps) {
  const theme = useTheme();
  const isDesktopView = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Drawer className={styled.sharedDrawer} anchor={'right'} open={value} onClose={() => onChange(false)}>
      <SharedIf RIf={isDesktopView}>
        <SharedDrawerDesktopList title={title} items={items || []} showSubList={showSubList} currentItem={currentDrawerItem} onChange={onChange} onItemClick={onMenuItemClick} />
      </SharedIf>

      <SharedIf RIf={!isDesktopView}>
        <SharedDrawerMobileList title={title} showSubList={showSubList} onChange={onChange} items={items || []} />
      </SharedIf>

      <SharedCardSocialNetworks
        socialNetworks={socialNetworks}
        containerProps={{ style: { marginLeft: '65px', marginBottom: '20px', marginTop: '50px' } }}
        onClick={onSocialNetworkClick}
      />
    </Drawer>
  );
}
