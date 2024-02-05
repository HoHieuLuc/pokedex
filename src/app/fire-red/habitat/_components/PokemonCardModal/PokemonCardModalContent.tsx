import { PokemonArea, PokemonCard } from '@/app/fire-red/pokemon/_components';
import { fireRedHook } from '@/app/fire-red';
import classes from './PokemonCardModalContent.module.css';
import { useSearchParams } from 'next/navigation';

interface Props {
  pokemon: string;
}

const PokemonCardModalContent = ({ pokemon }: Props) => {
  const { data, isLoading } = fireRedHook.useByName(pokemon);
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');

  if (isLoading || !data) {
    return <div className={classes.root}></div>;
  }

  const sprite =
    data.sprites.versions['generation-iii']?.['firered-leafgreen']?.frontDefault ||
    data.sprites.versions['generation-iii']?.['emerald']?.frontDefault ||
    data.sprites.frontDefault;

  const icon =
    data.sprites.versions['generation-vii']?.['icons']?.frontDefault ||
    data.sprites.versions['generation-viii']?.['icons']?.frontDefault ||
    data.sprites.frontDefault;

  return (
    <div className={classes.root}>
      {tab === 'area' ? (
        <PokemonArea
          {...data}
          index={data.pokedexNumbers['national']}
          sprite={sprite}
          icon={icon}
        />
      ) : (
        <PokemonCard
          {...data}
          index={data.pokedexNumbers['national']}
          flavorText={data.flavorTexts['firered']}
          sprite={sprite}
        />
      )}
    </div>
  );
};

export default PokemonCardModalContent;
