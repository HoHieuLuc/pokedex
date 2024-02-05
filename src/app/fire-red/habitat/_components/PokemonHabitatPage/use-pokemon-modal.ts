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

  /**
   * Close the modal and clear search params.
   */
  const close = () => {
    navigate.setSearchParams({
      pokemon: undefined,
      tab: undefined,
    });
    _close();
  };

  return [opened, { open, close }] as const;
};

export default usePokemonModal;
