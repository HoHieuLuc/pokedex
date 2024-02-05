import { Metadata } from 'next';
import { PokemonPage } from '../_components';
import classes from './page.module.css';
import { capitalize } from '@/utils';
import fs from 'fs-extra';
import path from 'path';
import { Pokemon } from '@/pokemon';
import { POKEDEX_RANGES } from '@/config';
import { Suspense } from 'react';

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
  // TODO: refactor this
  const pokemons = (await fs.readJSON(
    path.join(process.cwd(), '/public/data/pokemon.json'),
  )) as Array<Pokemon>;

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
