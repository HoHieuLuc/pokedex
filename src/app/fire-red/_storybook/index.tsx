import { Meta } from '@storybook/react';
import { Layout } from '../_components';
import './index.css';

export const createMeta = (meta: Omit<Meta, 'title'> = {}): Meta => ({
  ...meta,
  decorators: [
    (Story) => {
      return (
        <Layout h='unset'>
          <Story />
        </Layout>
      );
    },
  ],
});
