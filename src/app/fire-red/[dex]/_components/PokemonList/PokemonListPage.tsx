'use client';

import { useRouter } from 'next/navigation';
import PokemonList from './PokemonList';
import { FireRedDex, fireRedHook } from '@/app/fire-red';
import { useGameHotkeys } from '@/hooks';

interface Props {
  dex: FireRedDex;
}

const PokemonListPage = ({ dex }: Props) => {
  const router = useRouter();
  const { data, isLoading } = fireRedHook.useDex(dex);

  useGameHotkeys({
    B: () => router.push('.'),
  });

  if (isLoading || !data) {
    return <></>;
  }

  return <PokemonList data={data} dex={dex} />;
};
export default PokemonListPage;
