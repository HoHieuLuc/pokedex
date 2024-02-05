import { createMeta } from '@/app/fire-red/_storybook';
import PokemonCard from './PokemonCard';

export default {
  title: 'Fire Red/PokemonCard',
  ...createMeta(),
};

export const Default = () => (
  <PokemonCard
    index={6}
    name='Charizard'
    genus='flame pokemon'
    height={1}
    weight={1}
    sprite='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/6.png'
    flavorText='charizard'
  />
);
