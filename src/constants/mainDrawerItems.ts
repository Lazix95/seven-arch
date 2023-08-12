import { SharedDrawerItem } from '@/features/shared/SharedDrawer/SharedDrawer';
import InboxIcon from '@mui/icons-material/MoveToInbox';

export const mainDrawerItems: SharedDrawerItem[] = [
  {
    label: 'Test',
    Icon: InboxIcon,
    to: '#',
    subItems: [
      { label: 'Test a', Icon: InboxIcon, to: '#' },
      { label: 'Test b', Icon: InboxIcon, to: '#' },
      { label: 'Test c', Icon: InboxIcon, to: '#' },
    ],
  },
  {
    label: 'Test 2',
    Icon: InboxIcon,
    to: '#',
    subItems: [
      { label: 'Test 2 a', Icon: InboxIcon, to: '#' },
      { label: 'Test 2 b', Icon: InboxIcon, to: '#' },
      { label: 'Test 2 c', Icon: InboxIcon, to: '#' },
    ],
  },
];

export const adminDrawerItems: SharedDrawerItem[] = [
  {
    label: 'Test',
    Icon: InboxIcon,
    to: '#',
  },
  {
    label: 'Test 2',
    Icon: InboxIcon,
    to: '#',
  },
];
