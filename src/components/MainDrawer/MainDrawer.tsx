import Drawer from '@mui/material/Drawer';
import { useMediaQuery, useTheme } from '@mui/material';
import { MainDrawerDesktopList } from './MainDrawerDeskropList';
import { MainDrawerMobileList } from './MainDrawerMobileList';
import { SharedIf } from '../shared/util/SharedIf';
import styled from './MainDriver.module.scss';
import { SharedCardSocialNetworks } from '../shared/cards/SharedCardSocialNetworks';
import { DocumentSocialNetwork } from '@/models/socialNetworks';

interface MainDrawerProps {
  readonly title: string;
  readonly value: boolean;
  readonly showSubList?: boolean;
  readonly items?: MainDrawerItem[];
  readonly currentDrawerItem?: MainDrawerItem;
  readonly socialNetworks?: DocumentSocialNetwork[];
  readonly onChange: (state: boolean) => void;
  readonly onMenuItemClick: (item: MainDrawerItem | MainDrawerSubItem) => void;
  readonly onSocialNetworkClick: (socialNetwork: DocumentSocialNetwork) => void;
}

interface MainDrawerBaseItem {
  readonly id: number;
  readonly label: string;
  readonly to: string;
}

export interface MainDrawerItem extends MainDrawerBaseItem {
  readonly type: 'MainItem';
  readonly subItems?: MainDrawerSubItem[];
}

export interface MainDrawerSubItem extends MainDrawerBaseItem {
  readonly type: 'SubItem';
  readonly label: string;
}

export function MainDrawer({ value, items, title, currentDrawerItem, socialNetworks, showSubList = true, onChange, onMenuItemClick, onSocialNetworkClick }: MainDrawerProps) {
  const theme = useTheme();
  const isDesktopView = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Drawer className={styled.MainDrawer} anchor={'right'} open={value} onClose={() => onChange(false)}>
      <SharedIf RIf={isDesktopView}>
        <MainDrawerDesktopList title={title} items={items || []} showSubList={showSubList} currentItem={currentDrawerItem} onChange={onChange} onItemClick={onMenuItemClick} />
      </SharedIf>

      <SharedIf RIf={!isDesktopView}>
        <MainDrawerMobileList title={title} showSubList={showSubList} onChange={onChange} items={items || []} />
      </SharedIf>

      <SharedCardSocialNetworks
        socialNetworks={socialNetworks}
        containerProps={{ style: { marginLeft: '65px', marginBottom: '20px', marginTop: '50px' } }}
        onClick={onSocialNetworkClick}
      />
    </Drawer>
  );
}
