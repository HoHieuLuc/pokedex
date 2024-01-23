import { ResourceData } from './resource-response.type';

export interface PokemonResponse {
  abilities: Ability[];
  baseExperience: number;
  forms: ResourceData[];
  gameIndices: GameIndex[];
  height: number;
  // heldItems: any[];
  id: number;
  isDefault: boolean;
  locationAreaEncounters: string;
  moves: Move[];
  name: string;
  order: number;
  // pastAbilities: any[];
  // pastTypes: any[];
  species: Species;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
  weight: number;
}

interface Ability {
  ability: ResourceData;
  isHidden: boolean;
  slot: number;
}

interface Species {
  name: string;
}

interface GameIndex {
  gameIndex: number;
  version: ResourceData;
}

interface Move {
  move: ResourceData;
  versionGroupDetails: VersionGroupDetail[];
}

interface VersionGroupDetail {
  levelLearnedAt: number;
  moveLearnMethod: MoveLearnMethod;
  versionGroup: VersionGroup;
}

interface MoveLearnMethod {
  name: MoveLearnMethodName;
}

type MoveLearnMethodName = 'machine' | 'level-up' | 'tutor';

interface VersionGroup {
  name: VersionGroupName;
}

type VersionGroupName =
  | 'diamond-pearl'
  | 'platinum'
  | 'heartgold-soulsilver'
  | 'black-white'
  | 'black-2-white-2'
  | 'x-y'
  | 'omega-ruby-alpha-sapphire'
  | 'sun-moon'
  | 'ultra-sun-ultra-moon'
  | 'sword-shield'
  | 'brilliant-diamond-and-shining-pearl'
  | 'scarlet-violet'
  | 'ruby-sapphire'
  | 'emerald'
  | 'firered-leafgreen'
  | 'colosseum'
  | 'xd';

interface Sprites {
  backDefault: string;
  backFemale?: string;
  backShiny: string;
  backShinyFemale?: string;
  frontDefault: string;
  frontFemale?: string;
  frontShiny: string;
  frontShinyFemale?: string;
  other: SpritesOther;
  versions: SpritesVersions;
}

interface SpritesOther {
  dreamWorld: SpritesDreamWorld;
  home: SpritesHome;
  'official-artwork': SpritesOfficialArtwork;
  showdown: SpritesShowdown;
}

interface SpritesDreamWorld {
  frontDefault: string;
  frontFemale?: string;
}

interface SpritesHome {
  frontDefault: string;
  frontFemale?: string;
  frontShiny: string;
  frontShinyFemale?: string;
}

interface SpritesOfficialArtwork {
  frontDefault: string;
  frontShiny: string;
}

type SpritesShowdown = Omit<Sprites, 'other' | 'versions'>;

interface SpritesVersions {
  'generation-i'?: SpritesGenerationI;
  'generation-ii'?: SpritesGenerationII;
  'generation-iii'?: SpritesGenerationIII;
  'generation-iv'?: SpritesGenerationIV;
  'generation-v'?: SpritesGenerationV;
  'generation-vi'?: SpritesGenerationVI;
  'generation-vii'?: SpritesGenerationVII;
  'generation-viii'?: SpritesGenerationVIII;
}

interface SpritesGenerationI {
  'red-blue': SpritesRedBlue;
  yellow: SpritesRedBlue;
}

interface SpritesRedBlue {
  backDefault?: string;
  backGray?: string;
  backTransparent?: string;
  frontDefault?: string;
  frontGray?: string;
  frontTransparent?: string;
}

interface SpritesGenerationII {
  crystal: SpritesCrystal;
  gold: SpritesGold;
  silver: SpritesGold;
}

interface SpritesCrystal {
  backDefault?: string;
  backShiny?: string;
  backShinyTransparent?: string;
  backTransparent?: string;
  frontDefault?: string;
  frontShiny?: string;
  frontShinyTransparent?: string;
  frontTransparent?: string;
}

interface SpritesGold {
  backDefault?: string;
  backShiny?: string;
  frontDefault?: string;
  frontShiny?: string;
  frontTransparent?: string;
}

interface SpritesGenerationIII {
  emerald: SpritesOfficialArtwork;
  'firered-leafgreen': SpritesFireredLeafgreen;
  'ruby-sapphire': SpritesRubySapphire;
}

interface SpritesFireredLeafgreen {
  backDefault?: string;
  backShiny?: string;
  frontDefault?: string;
  frontShiny?: string;
}

interface SpritesRubySapphire {
  backDefault: string;
  backShiny: string;
  frontDefault: string;
  frontShiny: string;
}

interface SpritesGenerationIV {
  'diamond-pearl': SpritesDiamondPearl;
  'heartgold-soulsilver': SpritesDiamondPearl;
  platinum: SpritesDiamondPearl;
}

interface SpritesDiamondPearl {
  backDefault: string;
  backFemale?: string;
  backShiny: string;
  backShinyFemale?: string;
  frontDefault: string;
  frontFemale?: string;
  frontShiny: string;
  frontShinyFemale?: string;
}

interface SpritesGenerationV {
  'black-white': SpritesBlackWhite;
}

interface SpritesBlackWhite {
  animated: SpritesShowdown;
  backDefault: string;
  backFemale?: string;
  backShiny: string;
  backShinyFemale?: string;
  frontDefault: string;
  frontFemale?: string;
  frontShiny: string;
  frontShinyFemale?: string;
}

interface SpritesGenerationVI {
  [key: string]: SpritesHome;
}

interface SpritesGenerationVII {
  icons: SpritesIcons;
  'ultra-sun-ultra-moon': SpritesHome;
}

interface SpritesIcons {
  frontDefault: string;
  frontFemale?: string;
}

interface SpritesGenerationVIII {
  icons: SpritesIcons;
}

interface Stat {
  baseStat: number;
  effort: number;
  stat: ResourceData;
}

interface Type {
  slot: number;
  type: ResourceData;
}
