import { Meta } from '@storybook/react';
import { Layout } from '../_components';

export const createMeta = (meta: Omit<Meta, 'title'> = {}): Meta => ({
  ...meta,
  decorators: [
    (Story) => {
      return (
        <Layout>
          <Story />
        </Layout>
      );
    },
  ],
});
