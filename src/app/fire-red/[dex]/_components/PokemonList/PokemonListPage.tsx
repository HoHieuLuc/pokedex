'use client';

import { useHotkeys } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import PokemonList from './PokemonList';
import { FireRedDex, fireRedHook } from '@/app/fire-red';

interface Props {
  dex: FireRedDex;
}

const PokemonListPage = ({ dex }: Props) => {
  const router = useRouter();
  const { data, isLoading } = fireRedHook.useDex(dex);

  useHotkeys([['X', () => router.push('.')]]);

  if (isLoading || !data) {
    return <></>;
  }

  return <PokemonList data={data} dex={dex} />;
};
export default PokemonListPage;
