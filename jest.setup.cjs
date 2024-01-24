require('@testing-library/jest-dom');
require('fake-indexeddb/auto');

// https://github.com/scottrippey/next-router-mock/issues/67#issuecomment-1564906960
const mockRouter = require('next-router-mock');

const useRouter = mockRouter.useRouter;

const MockNextNavigation = {
  ...mockRouter,
  notFound: jest.fn(),
  redirect: jest.fn().mockImplementation((url) => {
    mockRouter.memoryRouter.setCurrentUrl(url);
  }),
  usePathname: () => {
    const router = useRouter();
    return router.asPath;
  },
  useSearchParams: () => {
    const router = useRouter();
    const path = router.query;
    return new URLSearchParams(path);
  },
};

jest.mock('next/navigation', () => MockNextNavigation);

const { getComputedStyle } = window;
window.getComputedStyle = (elt) => getComputedStyle(elt);

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserver;
