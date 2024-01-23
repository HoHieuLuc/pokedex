import { ResourceData } from './resource-response.type';

export interface PokemonSpeciesResponse {
  baseHappiness: number;
  captureRate: number;
  color: ResourceData;
  eggGroups: ResourceData[];
  evolvesFromSpecies: ResourceData;
  flavorTextEntries: FlavorTextEntry[];
  formsSwitchable: boolean;
  genderRate: number;
  genera: Genera[];
  habitat: ResourceData;
  hasGenderDifferences: boolean;
  hatchCounter: number;
  id: number;
  isBaby: boolean;
  isLegendary: boolean;
  isMythical: boolean;
  name: string;
  names: Name[];
  order: number;
  palParkEncounters: PalParkEncounter[];
  pokedexNumbers: PokedexNumber[];
  shape: ResourceData;
  varieties: Variety[];
}

interface FlavorTextEntry {
  flavorText: string;
  language: ResourceData;
  version: ResourceData;
}

interface Genera {
  genus: string;
  language: ResourceData;
}

interface Name {
  language: ResourceData;
  name: string;
}

interface PalParkEncounter {
  area: ResourceData;
  baseScore: number;
  rate: number;
}

interface PokedexNumber {
  entryNumber: number;
  pokedex: ResourceData;
}

interface Variety {
  isDefault: boolean;
  pokemon: ResourceData;
}
