import { PokemonHabitat } from '@/pokemon';
import { PokemonHabitatPage } from '../_components';
import { habitats } from './habitats';
import { Suspense } from 'react';

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

export const dynamicParams = false;
