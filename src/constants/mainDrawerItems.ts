import { SharedDrawerItem } from '@/features/shared/SharedDrawer/SharedDrawer';

export const mainDrawerItems: SharedDrawerItem[] = [
  {
    id: 100,
    type: 'MainItem',
    label: 'Projects',
    to: '/projects',
    subItems: [
      { id: 102, type: 'SubItem', label: 'All', to: '/projects' },
      // list here all categories of projects (Make CRUD for categories)
    ],
  },
  {
    id: 200,
    type: 'MainItem',
    label: 'Expertise',
    to: '/expertise',
    subItems: [
      { id: 201, type: 'SubItem', label: 'Arhitecture', to: '/expertise/architecture' },
      { id: 202, type: 'SubItem', label: 'Climate and Sustainable Design', to: '/expertise/climate-and-sustainable-design' },
      { id: 203, type: 'SubItem', label: 'Engenering', to: '/expertise/engenering' },
      { id: 204, type: 'SubItem', label: 'Industrial Design', to: '/expertise/industrial-design' },
      { id: 205, type: 'SubItem', label: 'Interiors', to: '/expertise/interiors' },
      { id: 206, type: 'SubItem', label: 'Technology and Research', to: '/expertise/technology-and-research' },
      { id: 207, type: 'SubItem', label: 'Urban and Landscape Design', to: '/expertise/urban-and-landscape-design' },
      { id: 208, type: 'SubItem', label: 'Workplace Consultancy', to: '/expertise/workplace-consultancy' },
    ],
  },
  {
    id: 300,
    type: 'MainItem',
    label: 'Studio',
    to: '/studio',
    subItems: [
      { id: 301, type: 'SubItem', label: 'About', to: '/studio/about' },
      { id: 302, type: 'SubItem', label: 'Corporate Social Responsibility', to: '/studio/corporate-social-responsibility' },
    ],
  },
  {
    id: 400,
    type: 'MainItem',
    label: 'People',
    to: '/people',
    subItems: [
      { id: 401, type: 'SubItem', label: 'All', to: '/people' },
      { id: 402, type: 'SubItem', label: 'Teams', to: '/people/teams' },
      { id: 403, type: 'SubItem', label: 'Equity, Diversity and Inclusion', to: '/people/equity-diversity-and-inclusion' },
    ],
  },
  {
    id: 500,
    type: 'MainItem',
    label: 'News',
    to: '/news',
    subItems: [
      { id: 501, type: 'SubItem', label: 'All', to: '/news' },
      { id: 502, type: 'SubItem', label: 'Learning for Children', to: '/news/learning-for-children' },
    ],
  },
  {
    id: 600,
    type: 'MainItem',
    label: 'Insights',
    to: '/insights',
    subItems: [
      { id: 601, type: 'SubItem', label: '+Plus Journal', to: '/insights/plus-journal' },
      { id: 602, type: 'SubItem', label: 'Publications', to: '/insights/publications' },
      { id: 603, type: 'SubItem', label: 'Videos', to: '/insights/videos' },
    ],
  },
  {
    id: 700,
    type: 'MainItem',
    label: 'Carrers',
    to: '/carrers',
    subItems: [
      { id: 701, type: 'SubItem', label: 'Vacancies', to: '/careers/vacancies' },
      { id: 702, type: 'SubItem', label: 'Life at Seven Arch', to: '/careers/life-at-seven-arch' },
      { id: 703, type: 'SubItem', label: 'Early Careers', to: '/carrers/early-careers' },
      { id: 704, type: 'SubItem', label: 'Benefits', to: '/carrers/benefits' },
    ],
  },
  {
    id: 800,
    type: 'MainItem',
    label: 'Contact',
    to: '/contact',
    subItems: [],
  },
];

export const adminDrawerItems: SharedDrawerItem[] = [
  {
    id: 1000,
    type: 'MainItem',
    label: 'Basic Info',
    to: '/admin',
    subItems: [{ id: 701, type: 'SubItem', label: 'Social Networks', to: '/admin/social-networks' }],
  },
  {
    id: 2000,
    type: 'MainItem',
    label: 'Home',
    to: '/admin/home',
  },
  {
    id: 3000,
    type: 'MainItem',
    label: 'Projects',
    to: '/admin/projects',
  },
  {
    id: 4000,
    type: 'MainItem',
    label: 'Expertise',
    to: '/admin/expertise',
  },
  {
    id: 5000,
    type: 'MainItem',
    label: 'Studio',
    to: '/admin/studio',
  },
  {
    id: 6000,
    type: 'MainItem',
    label: 'People',
    to: '/admin/people',
  },
  {
    id: 7000,
    type: 'MainItem',
    label: 'News',
    to: '/admin/news',
  },
  {
    id: 8000,
    type: 'MainItem',
    label: 'Insights',
    to: '/admin/insights',
  },
  {
    id: 9000,
    type: 'MainItem',
    label: 'Careers',
    to: '/admin/careers',
  },
  {
    id: 10000,
    type: 'MainItem',
    label: 'Contact',
    to: '/admin/contact',
  },
];
