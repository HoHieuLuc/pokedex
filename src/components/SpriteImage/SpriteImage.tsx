import { BASE_SPRITES_URL } from '@/config';
import { Image, ImageProps } from '@mantine/core';

const getSrc = (src: string) => {
  if (src.startsWith('https')) {
    return src;
  }

  return `${BASE_SPRITES_URL}/${src}`;
};

interface Props extends ImageProps {
  src: string;
}

const SpriteImage = ({ src, ...props }: Props) => {
  return <Image {...props} src={getSrc(src)} />;
};

export default SpriteImage;
