import { PokemonHabitat } from '@/pokemon';
import { PokemonHabitatPage } from '../_components';

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
