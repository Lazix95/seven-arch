import Drawer from '@mui/material/Drawer';
import { useMediaQuery, useTheme } from '@mui/material';
import { SharedDrawerDesktopList } from './SharedDrawerDeskropList';
import { SharedDrawerMobileList } from './SharedDrawerMobileList';
import { SharedIf } from '../SharedIf';
import styled from './SharedDriver.module.scss';
import { SharedButton } from '../SharedButton';
import { SharedCardSocialNetworks } from '../cards/SharedCardSocialNetworks';
import { SocialNetwork } from '@/models/generalModels';

interface SharedDrawerProps {
  readonly title: string;
  readonly value: boolean;
  readonly showSubList?: boolean;
  readonly items?: SharedDrawerItem[];
  readonly onChange: (state: boolean) => void;
  readonly onMenuItemClick: (item: SharedDrawerItem | SharedDrawerSubItem) => void;
  readonly onSocialNetworkClick: (socialNetwork: SocialNetwork) => void;
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

export function SharedDrawer({ value, items, title, showSubList = true, onChange, onMenuItemClick, onSocialNetworkClick }: SharedDrawerProps) {
  const theme = useTheme();
  const isDesktopView = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Drawer keepMounted={true} className={styled.sharedDrawer} anchor={'right'} open={value} onClose={() => onChange(false)}>
      <SharedIf RIf={isDesktopView}>
        <SharedDrawerDesktopList title={title} items={items || []} showSubList={showSubList} onChange={onChange} onItemClick={onMenuItemClick} />
      </SharedIf>

      <SharedIf RIf={!isDesktopView}>
        <SharedDrawerMobileList title={title} showSubList={showSubList} onChange={onChange} items={items || []} />
      </SharedIf>

      <SharedCardSocialNetworks containerProps={{ style: { marginLeft: '65px', marginBottom: '20px', marginTop: '50px' } }} onClick={onSocialNetworkClick} />
    </Drawer>
  );
}
