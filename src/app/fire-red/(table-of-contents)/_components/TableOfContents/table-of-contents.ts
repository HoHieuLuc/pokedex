import { POKEDEX, POKEMON } from '@/config';

export interface TableOfContent {
  type: 'heading' | 'content';
  title: string;
  href: string;
}

const habitats = [
  'Glassland',
  'Forest',
  `Water's-edge`,
  'Sea',
  'Cave',
  'Mountain',
  'Rough-terrain',
  'Urban',
  'Rare',
].map<TableOfContent>((habitat) => ({
  type: 'content',
  title: `${habitat} ${POKEMON}`,
  href: '',
}));

const searchModes = ['A TO Z', 'TYPE', 'LIGHTEST', 'SMALLEST'].map<TableOfContent>((mode) => ({
  type: 'content',
  title: `${mode} MODE`,
  href: `search?sort=${mode.toLowerCase().split(' ').join('-')}`,
}));

const tableOfContents: TableOfContent[] = [
  {
    type: 'heading',
    title: `${POKEMON} LIST`,
    href: '',
  },
  {
    type: 'content',
    title: 'NUMERICAL MODE: KANTO',
    href: 'kanto',
  },
  {
    type: 'content',
    title: 'NUMERICAL MODE: NATIONAL',
    href: 'national',
  },
  {
    type: 'heading',
    title: `${POKEMON} HABITATS`,
    href: '',
  },
  ...habitats,
  {
    type: 'heading',
    title: `SEARCH`,
    href: '',
  },
  ...searchModes,
  {
    type: 'heading',
    title: 'OTHERS',
    href: '',
  },
  {
    type: 'content',
    title: `CLOSE ${POKEDEX}`,
    href: '../',
  },
];

export default tableOfContents;
