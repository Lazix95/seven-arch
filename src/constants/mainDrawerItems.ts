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
    label: 'Basic Info',
    Icon: InboxIcon,
    to: '/admin',
  },
  {
    label: 'Home',
    Icon: InboxIcon,
    to: 'admin/home',
  },
  {
    label: 'Projects',
    Icon: InboxIcon,
    to: 'admin/projects',
  },
  {
    label: 'Expertise',
    Icon: InboxIcon,
    to: 'admin/expertise',
  },
  {
    label: 'Studio',
    Icon: InboxIcon,
    to: 'admin/studio',
  },
  {
    label: 'People',
    Icon: InboxIcon,
    to: 'admin/people',
  },
  {
    label: 'News',
    Icon: InboxIcon,
    to: 'admin/news',
  },
  {
    label: 'Insights',
    Icon: InboxIcon,
    to: 'admin/insights',
  },
  {
    label: 'Careers',
    Icon: InboxIcon,
    to: 'admin/careers',
  },
  {
    label: 'Contact',
    Icon: InboxIcon,
    to: 'admin/contact',
  },
];
