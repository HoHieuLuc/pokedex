interface Props {
  id: number;
  type: 'legacy' | 'latest';
}

const playPokemonCry = async ({ id, type }: Props) => {
  const audio = new Audio(
    `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/${type}/${id}.ogg`,
  );
  try {
    await audio.play();
  } catch {
    // ignore
  }
};

export default playPokemonCry;
