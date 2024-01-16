import { Text as MText, TextProps, createPolymorphicComponent } from '@mantine/core';
import cx from 'clsx';
import classes from './Text.module.css';
import { forwardRef } from 'react';

interface Props extends TextProps {
  children: React.ReactNode;
}

const Text = createPolymorphicComponent<'p', Props>(
  forwardRef<HTMLParagraphElement, Props>(function _Text({ children, ...props }, ref) {
    return (
      <MText {...props} ref={ref} className={cx(classes.root, props.className)}>
        {children}
      </MText>
    );
  }),
);

export default Text;
