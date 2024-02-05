import { Metadata } from 'next';
import { PokemonListPage } from './_components';
import { capitalize } from '@/utils';

interface Props {
  params: {
    dex: 'kanto' | 'national';
  };
}

const Page = ({ params }: Props) => {
  return <PokemonListPage dex={params.dex} />;
};

export default Page;

export function generateStaticParams() {
  return [
    {
      dex: 'kanto',
    },
    {
      dex: 'national',
    },
  ];
}

export function generateMetadata({ params }: Props): Metadata {
  return {
    title: `Pokedex | Fire Red - ${capitalize(params.dex)} dex`,
  };
}

export const dynamicParams = false;
