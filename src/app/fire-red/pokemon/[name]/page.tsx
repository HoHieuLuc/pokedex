import { Metadata } from 'next';
import { PokemonPage } from '../_components';
import classes from './page.module.css';
import { capitalize } from '@/utils';
import { POKEDEX_RANGES } from '@/config';
import { Suspense } from 'react';
import { file } from '@/server';

interface Props {
  params: {
    name: string;
  };
}

const Page = ({ params }: Props) => {
  return (
    <div className={classes.root}>
      <Suspense>
        <PokemonPage name={params.name} />
      </Suspense>
    </div>
  );
};

export async function generateStaticParams() {
  const pokemons = await file.readPokemons();

  return pokemons
    .filter((pokemon) => {
      return pokemon.species.pokedexNumbers['national'] <= POKEDEX_RANGES.fireRedNational.max;
    })
    .map(({ slug }) => ({ name: slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  return {
    title: `Pokedex | Fire Red - ${capitalize(params.name)}`,
  };
}

export default Page;
