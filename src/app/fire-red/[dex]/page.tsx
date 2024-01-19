import { PokemonListPage } from './_components';

interface Props {
  params: {
    dex: 'kanto' | 'national';
  };
}

const Page = ({ params }: Props) => {
  return (
    <div>
      <PokemonListPage dex={params.dex} />
    </div>
  );
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

export const dynamicParams = false;
