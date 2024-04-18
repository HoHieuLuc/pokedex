import classes from './PokemonEncountersMap.module.css';

const row = 15;
const col = 22;

const emptyTiles = Array.from({ length: col * row });

const getIndex = (x: number, y: number) => {
  return y * col + x;
};

interface CreateRouteIndicesProps {
  index: number;
  from: number;
  to: number;
  orientation: 'horizontal' | 'vertical';
}

const createRouteIndices = ({ index, from, to, orientation }: CreateRouteIndicesProps) => {
  const indices: Tile['indices'] = {};
  for (let i = from; i <= to; i++) {
    indices[orientation === 'horizontal' ? getIndex(i, index) : getIndex(index, i)] = {
      type: 'route',
    };
  }
  return indices;
};

interface Tile {
  name: string;
  label: string;
  areas?: { [key: string]: number };
  indices: {
    [index: number]: {
      type: 'route' | 'city' | 'route-indoor' | 'city-indoor';
      areas?: { [key: string]: number };
    };
  };
}

const palletTown: Tile = {
  indices: {
    [getIndex(4, 11)]: {
      type: 'city',
    },
  },
  name: 'pallet-town',
  label: 'Pallet Town',
};

const route1: Tile = {
  indices: {
    [getIndex(4, 10)]: {
      type: 'route',
    },
    [getIndex(4, 9)]: {
      type: 'route',
    },
  },
  name: 'kanto-route-1',
  label: 'Route 1',
  areas: {
    'kanto-route-1-area': 1,
  },
};

const viridianCity: Tile = {
  indices: {
    [getIndex(4, 8)]: {
      type: 'city',
    },
  },
  name: 'viridian-city',
  label: 'Viridian City',
};

const route2: Tile = {
  indices: {
    [getIndex(4, 7)]: {
      type: 'route',
    },
    [getIndex(4, 6)]: {
      type: 'route-indoor',
      areas: {
        'viridian-forest-area': 1,
      },
    },
    [getIndex(4, 5)]: {
      type: 'route-indoor',
      areas: {
        'digletts-cave-area': 1,
      },
    },
  },
  name: 'kanto-route-2',
  label: 'Route 2',
  areas: {
    'kanto-route-2-north-towards-pewter-city': 1,
    'kanto-route-2-south-towards-viridian-city': 1,
  },
};

const pewterCity: Tile = {
  indices: {
    [getIndex(4, 4)]: {
      type: 'city',
    },
  },
  name: 'pewter-city',
  label: 'Pewter City',
};

const route22: Tile = {
  indices: {
    ...createRouteIndices({
      index: 8,
      from: 2,
      to: 3,
      orientation: 'horizontal',
    }),
  },
  name: 'kanto-route-22',
  label: 'Route 22',
  areas: {
    'kanto-route-22-area': 1,
  },
};

const route23: Tile = {
  indices: {
    ...createRouteIndices({
      index: 2,
      from: 5,
      to: 7,
      orientation: 'vertical',
    }),
    [getIndex(2, 4)]: {
      type: 'route-indoor',
    },
  },
  name: 'kanto-route-23',
  label: 'Route 23',
  areas: {
    'kanto-route-23-area': 1,
  },
};

// https://pokeapi.co/api/v2/region/1/
// https://pokeapi.co/api/v2/location-area?limit=99999

const maps = [palletTown, route1, viridianCity, route2, pewterCity, route22, route23];

const tiles = emptyTiles.map((_, index) => {
  const tile = maps.find((map) => map.indices[index]);
  const x = index % col;
  const y = Math.floor(index / col);
  const title = `${x}, ${y}, ${index}`;
  const type = tile?.indices[index]?.type;

  if (tile) {
    return <div key={index} className={classes.tile} data-type={type} title={title}></div>;
  }

  return <div key={index} className={classes.tile} title={title}></div>;
});

/*
20x17
draw map based on town map (easier)
draw map from array
{
  type: route | city | route-indoor | city-indoor
  indices: [1, 2, 3, 4, ...]
  name: string
  ...other
}
Location {
  id:    number;
  name:  string;
  label: string;
  areas: { [key: string]: number };
}

https://pokeapi.co/api/v2/pokemon/pidgey/encounters
locationArea.name = 'kanto-route-1-area'
if (route1.areas[locationArea.name]) => data-active='true'

example:
const route1 = {
  type: 'route',
  indices: [12, 13], // 2 tiles
  name: 'kanto-route-1',
  areas: { key: 1 }
}

const map = [route1, ....]


*/

const PokemonEncountersMap = () => {
  return <div className={classes.root}>{tiles}</div>;
};

export default PokemonEncountersMap;
