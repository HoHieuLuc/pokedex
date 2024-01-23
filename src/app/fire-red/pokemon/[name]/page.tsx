import { PokemonPage } from '../_components';

interface Props {
  params: {
    name: string;
  };
}

const Page = ({ params }: Props) => {
  return (
    <>
      <PokemonPage name={params.name} />
    </>
  );
};

export default Page;
