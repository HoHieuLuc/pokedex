import { Suspense } from 'react';
import PokemonSearchPage from './_components/PokemonSearchPage/PokemonSearchPage';

const Page = () => {
  return (
    <Suspense>
      <PokemonSearchPage />
    </Suspense>
  );
};

export const metadata = {
  title: 'Pokedex | Fire Red - Search',
};

export default Page;
