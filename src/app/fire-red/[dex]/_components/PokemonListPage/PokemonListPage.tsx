'use client';

import { useRouter } from 'next/navigation';
import { FireRedDex, fireRedHook } from '@/app/fire-red';
import { useGameHotkeys } from '@/hooks';
import { PokemonList } from '@/app/fire-red/pokemon/_components';

interface Props {
  dex: FireRedDex;
}

const PokemonListPage = ({ dex }: Props) => {
  const router = useRouter();
  const { data, isLoading } = fireRedHook.useDex(dex);

  useGameHotkeys({
    B: () => router.push('/fire-red'),
  });

  if (isLoading || !data) {
    return <></>;
  }

  return <PokemonList data={data} dex={dex} selectedIndexKey={`fire-red-${dex}`} />;
};
export default PokemonListPage;
