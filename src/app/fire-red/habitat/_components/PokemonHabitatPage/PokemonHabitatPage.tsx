'use client';

import { PokemonHabitat } from '@/pokemon';
import { Carousel } from '@mantine/carousel';
import PokemonAvatar from '../PokemonAvatar/PokemonAvatar';
import { PokemonSprites } from '@/types';
import classes from './PokemonHabitatPage.module.css';
import PokemonCardModal from '../PokemonCardModal/PokemonCardModal';
import usePokemonHabitatPicker from './use-pokemon-habitat-picker';

interface Props {
  habitat: PokemonHabitat;
}

const getSpriteUrl = (sprites: PokemonSprites) => {
  return (
    sprites.versions['generation-iii']?.['firered-leafgreen']?.frontDefault ||
    sprites.versions['generation-iii']?.['emerald']?.frontDefault ||
    sprites.frontDefault
  );
};

const PokemonHabitatPage = ({ habitat }: Props) => {
  const {
    activeIndex,
    page,
    initialPage,
    pokemonModal,
    pokemonModalOpened,
    pokemons,
    currentHabitats,
    onItemClick,
    onSlideChange,
    setEmbla,
  } = usePokemonHabitatPicker({ habitat });

  if (!pokemons) {
    return <></>;
  }

  const slides = currentHabitats.map((ids, index) => (
    <Carousel.Slide key={index}>
      <PokemonAvatar.Wrapper pageLength={ids.length}>
        {ids.map((id, _index) => (
          <PokemonAvatar
            key={id}
            position={_index + 1}
            sprites={getSpriteUrl(pokemons[id].sprites)}
            index={pokemons[id].species.pokedexNumbers['national']}
            name={pokemons[id].species.name}
            active={activeIndex === _index && page === index}
            onClick={() => onItemClick(pokemons[id], _index)}
          />
        ))}
      </PokemonAvatar.Wrapper>
    </Carousel.Slide>
  ));

  return (
    <>
      <Carousel
        withKeyboardEvents={false}
        getEmblaApi={setEmbla}
        onSlideChange={onSlideChange}
        initialSlide={initialPage - 1}
        classNames={{
          controls: classes.controls,
          control: classes.control,
        }}
      >
        {slides}
      </Carousel>
      <PokemonCardModal opened={pokemonModalOpened} onClose={pokemonModal.close} />
    </>
  );
};

export default PokemonHabitatPage;
