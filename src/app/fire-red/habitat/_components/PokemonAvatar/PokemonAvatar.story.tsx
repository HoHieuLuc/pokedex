import { createMeta } from '@/app/fire-red/_storybook';
import PokemonAvatar from './PokemonAvatar';
import { Text } from '@/app/fire-red/_components';

export default {
  title: 'Fire Red / PokemonAvatar',
  ...createMeta(),
};

const defaultProps = {
  position: 1,
  active: false,
  sprites:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/4.png',
  index: 4,
  name: 'Charmander',
};

export const Default = () => {
  return (
    <PokemonAvatar.Wrapper pageLength={1} h={450}>
      <PokemonAvatar {...defaultProps} />
    </PokemonAvatar.Wrapper>
  );
};

export const Active = () => {
  return (
    <PokemonAvatar.Wrapper pageLength={1} h={450}>
      <PokemonAvatar {...defaultProps} active />
    </PokemonAvatar.Wrapper>
  );
};

export const Positions = () => {
  return (
    <div style={{ margin: 10 }}>
      <Text variant='white' fz={30}>
        Page length: 1
      </Text>
      <PokemonAvatar.Wrapper pageLength={1} h={450}>
        <PokemonAvatar {...defaultProps} position={1} />
      </PokemonAvatar.Wrapper>

      <Text variant='white' fz={30}>
        Page length: 2
      </Text>
      <PokemonAvatar.Wrapper pageLength={2} h={450}>
        <PokemonAvatar {...defaultProps} position={1} />
        <PokemonAvatar {...defaultProps} position={2} />
      </PokemonAvatar.Wrapper>

      <Text variant='white' fz={30}>
        Page length: 3
      </Text>
      <PokemonAvatar.Wrapper pageLength={3} h={600}>
        <PokemonAvatar {...defaultProps} position={1} />
        <PokemonAvatar {...defaultProps} position={2} />
        <PokemonAvatar {...defaultProps} position={3} />
      </PokemonAvatar.Wrapper>

      <Text variant='white' fz={30}>
        Page length: 4
      </Text>
      <PokemonAvatar.Wrapper pageLength={4} h={600}>
        <PokemonAvatar {...defaultProps} position={1} />
        <PokemonAvatar {...defaultProps} position={2} />
        <PokemonAvatar {...defaultProps} position={3} />
        <PokemonAvatar {...defaultProps} position={4} />
      </PokemonAvatar.Wrapper>
    </div>
  );
};
