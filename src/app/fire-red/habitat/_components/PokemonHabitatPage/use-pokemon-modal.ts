import { useNavigate } from '@/hooks';
import { Pokemon } from '@/pokemon';
import { useDisclosure } from '@mantine/hooks';

const usePokemonModal = () => {
  const [opened, { open: _open, close: _close }] = useDisclosure();
  const navigate = useNavigate({ defaultValue: '/fire-red' });

  const open = (pokemon: Pokemon) => {
    navigate.setSearchParams({
      pokemon: pokemon.slug,
    });
    _open();
  };

  const close = () => {
    navigate.setSearchParams({
      pokemon: undefined,
    });
    _close();
  };

  return [opened, { open, close }] as const;
};

export default usePokemonModal;
