'use client';

import { ModalContent, ModalRoot, ModalRootProps } from '@mantine/core';
import classes from './PokemonCardModal.module.css';
import PokemonCardModalContent from './PokemonCardModalContent';
import { useSearchParams } from 'next/navigation';

interface Props extends ModalRootProps {}

const PokemonCardModal = ({ ...props }: Props) => {
  const searchParams = useSearchParams();
  const pokemon = searchParams.get('pokemon');

  return (
    <ModalRoot
      {...props}
      withinPortal={false}
      fullScreen
      classNames={{
        content: classes.content,
      }}
    >
      <ModalContent>
        <div className={classes['content-inner']}>
          {pokemon && <PokemonCardModalContent pokemon={pokemon} />}
        </div>
      </ModalContent>
    </ModalRoot>
  );
};

export default PokemonCardModal;
