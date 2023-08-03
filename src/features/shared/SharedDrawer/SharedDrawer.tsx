import Drawer from '@mui/material/Drawer';
import { SvgIcon, useMediaQuery, useTheme } from '@mui/material';
import { SharedDrawerDesktopList } from './SharedDrawerDeskropList';
import { SharedDrawerMobileList } from './SharedDrawerMobileList';
import { SharedIf } from '../SharedIf';

interface SharedDrawerProps {
  readonly onChange: (state: boolean) => void;
  readonly title: string;
  readonly value: boolean;
  readonly showSubList?: boolean;
  readonly items?: SharedDrawerItem[];
}

// items array example
// const items = [
//     {
//       label: 'Test',
//       Icon: InboxIcon,
//       subItems: [
//         { label: 'Test a', Icon: InboxIcon },
//         { label: 'Test b', Icon: InboxIcon },
//         { label: 'Test c', Icon: InboxIcon },
//       ],
//     },
//     {
//       label: 'Test 2',
//       Icon: InboxIcon,
//       subItems: [
//         { label: 'Test 2 a', Icon: InboxIcon },
//         { label: 'Test 2 b', Icon: InboxIcon },
//         { label: 'Test 2 c', Icon: InboxIcon },
//       ],
//   },
// ]

export interface SharedDrawerItem {
  label: string;
  Icon?: typeof SvgIcon;
  subItems?: SharedDrawerSubItem[];
}

interface SharedDrawerSubItem {
  label: string;
  Icon?: typeof SvgIcon;
}

export function SharedDrawer({ onChange, value, items, title, showSubList = true }: SharedDrawerProps) {
  const theme = useTheme();
  const isDesktopView = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Drawer anchor={'right'} open={value} onClose={() => onChange(false)}>
      <SharedIf RIf={isDesktopView}>
        <SharedDrawerDesktopList title={title} onChange={onChange} items={items || []} showSubList={showSubList} />
      </SharedIf>

      <SharedIf RIf={!isDesktopView}>
        <SharedDrawerMobileList title={title} showSubList={showSubList} onChange={onChange} items={items || []} />
      </SharedIf>
    </Drawer>
  );
}
