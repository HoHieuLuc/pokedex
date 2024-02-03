import { PokemonHabitat } from '@/pokemon';
import { PokemonHabitatPage } from '../_components';
import { habitats } from './habitats';

interface Props {
  params: {
    habitat: PokemonHabitat;
  };
}

const Page = ({ params }: Props) => {
  return (
    <>
      <PokemonHabitatPage habitat={params.habitat} />
    </>
  );
};

export default Page;

export function generateStaticParams() {
  return Object.keys(habitats).map((habitat) => ({
    habitat,
  }));
}

export const dynamicParams = false;
