'use client';

import fireRedHook from '@/app/fire-red/fire-red.hook';
import PokemonCard from '../PokemonCard/PokemonCard';
import { useHotkeys } from '@mantine/hooks';
import { useNavigate } from '@/hooks';

interface Props {
  name: string;
}

const PokemonPage = ({ name }: Props) => {
  const navigate = useNavigate({ defaultValue: '/fire-red' });
  const { data, isLoading, next, previous } = fireRedHook.useByName(name);

  const handleArrows = (direction: 'next' | 'previous') => {
    if (isLoading) {
      return;
    }

    if (direction === 'next' && next) {
      navigate.push(`/fire-red/pokemon/${next.name}`);
    } else if (direction === 'previous' && previous) {
      navigate.push(`/fire-red/pokemon/${previous.name}`);
    }
  };

  useHotkeys([
    ['X', navigate.back],
    ['ArrowUp', () => handleArrows('previous')],
    ['ArrowDown', () => handleArrows('next')],
  ]);

  if (isLoading || !data) {
    return <></>;
  }

  return (
    <>
      <PokemonCard
        {...data}
        index={data.pokedexNumbers['national']}
        flavorText={data.flavorTexts['firered']}
        sprite={data.sprites.versions['generation-iii']?.['firered-leafgreen'].frontDefault || ''}
      />
    </>
  );
};
export default PokemonPage;
