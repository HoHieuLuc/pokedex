import { Pokedex } from '@/pokemon';

export type FireRedDex = Extract<Pokedex, 'kanto' | 'national'>;
