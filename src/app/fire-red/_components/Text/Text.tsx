import { Text as MText, TextProps } from '@mantine/core';
import classes from './Text.module.css';

interface Props extends TextProps {
  children: React.ReactNode;
}

const Text = ({ children, ...props }: Props) => {
  return (
    <MText {...props} className={classes.root}>
      {children}
    </MText>
  );
};
export default Text;
