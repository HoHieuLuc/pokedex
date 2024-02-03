'use client';

import fireRedHook from '@/app/fire-red/fire-red.hook';
import { PokemonHabitat } from '@/pokemon';
import { useCallback, useMemo, useState } from 'react';
import { habitats } from '../../[habitat]/habitats';
import { parseNumber, throttle, toDictionary } from '@/utils';
import { Carousel, CarouselSlide, Embla } from '@mantine/carousel';
import PokemonAvatar from '../PokemonAvatar/PokemonAvatar';
import { BASE_SPRITES_URL } from '@/config';
import { PokemonSprites } from '@/types';
import { useGameHotkeys, useNavigate, useStateRef } from '@/hooks';
import classes from './PokemonHabitatPage.module.css';

interface Props {
  habitat: PokemonHabitat;
}

const getSpriteUrl = (sprites: PokemonSprites) => {
  const url =
    sprites.versions['generation-iii']?.['firered-leafgreen']?.frontDefault ||
    sprites.versions['generation-iii']?.['emerald']?.frontDefault ||
    sprites.frontDefault;

  return `${BASE_SPRITES_URL}/${url}`;
};

const THROTTLE_DELAY = 100;

const PokemonHabitatPage = ({ habitat }: Props) => {
  const currentHabitats = habitats[habitat];

  const navigate = useNavigate({ defaultValue: '/fire-red' });

  const initialPage = useMemo(() => {
    const _page = parseNumber(navigate.searchParams.get('page'));
    if (_page < 1) {
      return 1;
    }
    if (_page >= currentHabitats.length) {
      return currentHabitats.length;
    }
    return _page;
  }, []);

  const [page, _setPage, pageRef] = useStateRef(initialPage - 1);
  const [activeIndex, setActiveIndex, activeIndexRef] = useStateRef(0);

  const { data } = fireRedHook.useDex('national');
  const [embla, setEmbla] = useState<Embla | null>(null);

  const pokemons = useMemo(() => {
    if (!data) {
      return null;
    }
    return toDictionary({
      data: data.filter((pokemon) => pokemon.species.habitat === habitat),
      key: (item) => item.species.pokedexNumbers['national'].toString(),
      value: (item) => item,
    });
  }, [data]);

  const handleArrowLeft = useCallback(
    throttle(() => {
      const _page = pageRef.current;
      const _activeIndex = activeIndexRef.current;
      if (_page === 0 && _activeIndex === 0) {
        navigate.push('/fire-red');
        return;
      }
      if (_activeIndex === 0) {
        embla?.scrollPrev();
      } else {
        setActiveIndex(_activeIndex - 1);
      }
    }, THROTTLE_DELAY),
    [embla],
  );

  const handleArrowRight = useCallback(
    throttle(() => {
      const _page = pageRef.current;
      const _activeIndex = activeIndexRef.current;
      if (
        _page === currentHabitats.length - 1 &&
        _activeIndex === currentHabitats[_page].length - 1
      ) {
        navigate.push('/fire-red');
        return;
      }
      if (_activeIndex === currentHabitats[_page].length - 1) {
        embla?.scrollNext();
      } else {
        setActiveIndex(_activeIndex + 1);
      }
    }, THROTTLE_DELAY),
    [embla],
  );

  const setPage = (value: number) => {
    _setPage(value);
    navigate.push(`${navigate.path}?page=${value + 1}`);
  };

  const onSlideChange = (index: number) => {
    const _page = pageRef.current;
    if (index > _page) {
      setPage(_page + 1);
      setActiveIndex(0);
    }
    if (index < _page) {
      setPage(_page - 1);
      setActiveIndex(currentHabitats[index].length - 1);
    }
  };

  useGameHotkeys({
    ArrowLeft: handleArrowLeft,
    ArrowRight: handleArrowRight,
    B: () => navigate.push('/fire-red'),
  });

  if (!pokemons) {
    return <></>;
  }

  const slides = currentHabitats.map((ids, index) => (
    <CarouselSlide key={index}>
      <PokemonAvatar.Wrapper pageLength={ids.length}>
        {ids.map((id, _index) => (
          <PokemonAvatar
            key={id}
            position={_index + 1}
            sprites={getSpriteUrl(pokemons[id].sprites)}
            index={pokemons[id].species.pokedexNumbers['national']}
            name={pokemons[id].species.name}
            active={activeIndex === _index && page === index}
          />
        ))}
      </PokemonAvatar.Wrapper>
    </CarouselSlide>
  ));

  return (
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
  );
};

export default PokemonHabitatPage;
