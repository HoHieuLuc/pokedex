import { createMeta } from '@/app/fire-red/_storybook';
import PokemonEncountersMap from './PokemonEncountersMap';

export default {
  title: 'Fire Red/Pokemon Encounters Map',
  ...createMeta(),
};

export const Default = () => {
  return <PokemonEncountersMap />;
};
