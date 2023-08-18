import { SharedDrawerItem } from '@/features/shared/SharedDrawer/SharedDrawer';
import InboxIcon from '@mui/icons-material/MoveToInbox';

export const mainDrawerItems: SharedDrawerItem[] = [
  {
    label: 'Projects',
    Icon: InboxIcon,
    to: '/projects',
    subItems: [
      { label: 'All', Icon: InboxIcon, to: '/projects' },
      // list here all categories of projects (Make CRUD for categories)
    ],
  },
  {
    label: 'Expertise',
    Icon: InboxIcon,
    to: '/expertise',
    subItems: [
      { label: 'Arhitecture', Icon: InboxIcon, to: '/expertise/architecture' },
      { label: 'Climate and Sustainable Design', Icon: InboxIcon, to: '/expertise/climate-and-sustainable-design' },
      { label: 'Engenering', Icon: InboxIcon, to: '/expertise/engenering' },
      { label: 'Industrial Design', Icon: InboxIcon, to: '/expertise/industrial-design' },
      { label: 'Interiors', Icon: InboxIcon, to: '/expertise/interiors' },
      { label: 'Technology and Research', Icon: InboxIcon, to: '/expertise/technology-and-research' },
      { label: 'Urban and Landscape Design', Icon: InboxIcon, to: '/expertise/urban-and-landscape-design' },
      { label: 'Workplace Consultancy', Icon: InboxIcon, to: '/expertise/workplace-consultancy' },
    ],
  },
  {
    label: 'Studio',
    Icon: InboxIcon,
    to: '/studio',
    subItems: [
      { label: 'About', Icon: InboxIcon, to: '/studio/about' },
      { label: 'Corporate Social Responsibility', Icon: InboxIcon, to: '/studio/corporate-social-responsibility' },
    ],
  },
  {
    label: 'People',
    Icon: InboxIcon,
    to: '/people',
    subItems: [
      { label: 'All', Icon: InboxIcon, to: '/people' },
      { label: 'Teams', Icon: InboxIcon, to: '/people/teams' },
      { label: 'Equity, Diversity and Inclusion', Icon: InboxIcon, to: '/people/equity-diversity-and-inclusion' },
    ],
  },
  {
    label: 'News',
    Icon: InboxIcon,
    to: '/news',
    subItems: [
      { label: 'All', Icon: InboxIcon, to: '/news' },
      { label: 'Learning for Children', Icon: InboxIcon, to: '/news/learning-for-children' },
    ],
  },
  {
    label: 'Insights',
    Icon: InboxIcon,
    to: '/insights',
    subItems: [
      { label: '+Plus Journal', Icon: InboxIcon, to: '/insights/plus-journal' },
      { label: 'Publications', Icon: InboxIcon, to: '/insights/publications' },
      { label: 'Videos', Icon: InboxIcon, to: '/insights/videos' },
    ],
  },
  {
    label: 'Carrers',
    Icon: InboxIcon,
    to: '/carrers',
    subItems: [
      { label: 'Vacancies', Icon: InboxIcon, to: '/careers/vacancies' },
      { label: 'Life at Seven Arch', Icon: InboxIcon, to: '/careers/life-at-seven-arch' },
      { label: 'Early Careers', Icon: InboxIcon, to: '/carrers/early-careers' },
      { label: 'Benefits', Icon: InboxIcon, to: '/carrers/benefits' },
    ],
  },
  {
    label: 'Contact',
    Icon: InboxIcon,
    to: '/contact',
    subItems: [],
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
