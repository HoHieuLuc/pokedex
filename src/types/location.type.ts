import { ResourceData } from './resource-response.type';

export interface Location {
  id: number;
  name: string;
  names: Name[];
  areas: ResourceData[];
  gameIndices: GameIndex[];
  region: ResourceData;
}

interface GameIndex {
  gameIndex: number;
  generation: ResourceData;
}

interface Name {
  language: ResourceData;
  name: string;
}
