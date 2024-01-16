import { render as testingLibraryRender } from '@testing-library/react';
import Providers from '@/app/providers';

export function render(ui: React.ReactNode) {
  return testingLibraryRender(<>{ui}</>, {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <Providers>{children}</Providers>
    ),
  });
}
