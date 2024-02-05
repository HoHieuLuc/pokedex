import { PokemonHabitat } from '@/pokemon';
import { PokemonHabitatPage } from '../_components';
import { habitats } from './habitats';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { capitalize } from '@/utils';

interface Props {
  params: {
    habitat: PokemonHabitat;
  };
}

const Page = ({ params }: Props) => {
  return (
    <Suspense>
      <PokemonHabitatPage key={params.habitat} habitat={params.habitat} />
    </Suspense>
  );
};

export default Page;

export function generateStaticParams() {
  return Object.keys(habitats).map((habitat) => ({
    habitat,
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  return {
    title: `Pokedex | Fire Red - ${capitalize(params.habitat)} Pokemon`,
  };
}

export const dynamicParams = false;
