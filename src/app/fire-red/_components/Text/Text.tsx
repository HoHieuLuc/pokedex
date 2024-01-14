import { Text as MText, TextProps } from '@mantine/core';
import cx from 'clsx';
import classes from './Text.module.css';

interface Props extends TextProps {
  children: React.ReactNode;
}

const Text = ({ children, ...props }: Props) => {
  return (
    <MText {...props} className={cx(classes.root, props.className)}>
      {children}
    </MText>
  );
};
export default Text;
