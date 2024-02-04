import { useGameHotkeys, useNavigate, useStateRef } from '@/hooks';
import { Pokemon, PokemonHabitat } from '@/pokemon';
import { habitats } from '../../[habitat]/habitats';
import { fireRedHook } from '@/app/fire-red';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Embla } from '@mantine/carousel';
import { parseNumber, throttle, toDictionary } from '@/utils';
import usePokemonModal from './use-pokemon-modal';

interface UsePokemonPickerProps {
  habitat: PokemonHabitat;
}

const THROTTLE_DELAY = 100;

const usePokemonHabitatPicker = ({ habitat }: UsePokemonPickerProps) => {
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
  }, [data, habitat]);

  const [pokemonModalOpened, pokemonModal] = usePokemonModal();

  // open pokemon modal if pokemon is in search params
  useEffect(() => {
    const pokemonSlug = navigate.searchParams.get('pokemon');
    if (!pokemons || !pokemonSlug) {
      return;
    }

    // get all pokemons from the current slide
    const availablePokemons = currentHabitats[page].map((id) => pokemons[id]);
    const pokemonIndex = availablePokemons.findIndex((item) => item.slug === pokemonSlug);
    // pokemon exists in the current slide
    if (pokemonIndex !== -1) {
      const pokemon = availablePokemons[pokemonIndex];
      setActiveIndex(pokemonIndex);
      pokemonModal.open(pokemon);
    }
  }, [pokemons]);

  const handleAButton = () => {
    if (!pokemons) {
      return;
    }

    const pokemon = pokemons[currentHabitats[page][activeIndex]];
    pokemonModal.open(pokemon);
  };

  const handleBButton = () => {
    if (pokemonModalOpened) {
      navigate.setSearchParams({
        pokemon: undefined,
      });
      pokemonModal.close();
    } else {
      navigate.push('/fire-red');
    }
  };

  const handleArrowLeft = useCallback(
    throttle(() => {
      if (pokemonModalOpened) {
        return;
      }

      const _page = pageRef.current;
      const _activeIndex = activeIndexRef.current;
      // first page and first pokemon is selected => go back
      if (_page === 0 && _activeIndex === 0) {
        return navigate.push('/fire-red');
      }
      // first pokemon is selected => scroll to previous page
      if (_activeIndex === 0) {
        embla?.scrollPrev();
      } else {
        // select previous pokemon
        setActiveIndex(_activeIndex - 1);
      }
    }, THROTTLE_DELAY),
    [embla, pokemonModalOpened],
  );

  const handleArrowRight = useCallback(
    throttle(() => {
      if (pokemonModalOpened) {
        return;
      }

      const _page = pageRef.current;
      const _activeIndex = activeIndexRef.current;
      // last page and last pokemon is selected => go back
      if (
        _page === currentHabitats.length - 1 &&
        _activeIndex === currentHabitats[_page].length - 1
      ) {
        return navigate.push('/fire-red');
      }
      // last pokemon is selected => scroll to next page
      if (_activeIndex === currentHabitats[_page].length - 1) {
        embla?.scrollNext();
      } else {
        // select next pokemon
        setActiveIndex(_activeIndex + 1);
      }
    }, THROTTLE_DELAY),
    [embla, pokemonModalOpened],
  );

  useGameHotkeys({
    ArrowLeft: handleArrowLeft,
    ArrowRight: handleArrowRight,
    A: handleAButton,
    B: handleBButton,
  });

  /** Set page and update search params */
  const setPage = (value: number) => {
    _setPage(value);
    navigate.setSearchParams({
      page: value + 1,
      pokemon: undefined,
    });
  };

  const onSlideChange = (index: number) => {
    const _page = pageRef.current;
    // increase page and select first pokemon
    if (index > _page) {
      setPage(_page + 1);
      setActiveIndex(0);
    }
    // decrease page and select last pokemon
    if (index < _page) {
      setPage(_page - 1);
      setActiveIndex(currentHabitats[index].length - 1);
    }
  };

  const onItemClick = (pokemon: Pokemon, index: number) => {
    setActiveIndex(index);
    pokemonModal.open(pokemon);
  };

  return {
    setEmbla,
    onSlideChange,
    onItemClick,
    page,
    initialPage,
    activeIndex,
    pokemons,
    pokemonModal,
    pokemonModalOpened,
    currentHabitats,
  };
};

export default usePokemonHabitatPicker;
