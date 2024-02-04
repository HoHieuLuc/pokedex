import { PokemonCard } from '@/app/fire-red/pokemon/_components';
import { fireRedHook } from '@/app/fire-red';
import classes from './PokemonCardModalContent.module.css';

interface Props {
  pokemon: string;
}

const PokemonCardModalContent = ({ pokemon }: Props) => {
  const { data } = fireRedHook.useByName(pokemon);

  return (
    <div className={classes.root}>
      {data && (
        <PokemonCard
          {...data}
          index={data.pokedexNumbers['national']}
          flavorText={data.flavorTexts['firered']}
          sprite={
            data.sprites.versions['generation-iii']?.['firered-leafgreen']?.frontDefault ||
            data.sprites.versions['generation-iii']?.['emerald']?.frontDefault ||
            data.sprites.frontDefault
          }
        />
      )}
    </div>
  );
};

export default PokemonCardModalContent;
