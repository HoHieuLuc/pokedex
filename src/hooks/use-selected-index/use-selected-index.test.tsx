import { act, renderHook } from '@/test-utils';
import useSelectedIndex, { Selections, UseSelectedIndexProps } from './use-selected-index';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('hooks/use-selected-index', () => {
  const defaultProps: UseSelectedIndexProps = {
    key: 'key',
    defaultValue: 10969,
  };

  const wrapper = (queryClient = new QueryClient()) => {
    const Wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    return Wrapper;
  };

  it('should return default value when data is empty', () => {
    const { result } = renderHook(() => useSelectedIndex(defaultProps), {
      wrapper: wrapper(),
    });

    expect(result.current[0]).toBe(defaultProps.defaultValue);
  });

  it('should return initital value from query', () => {
    const queryClient = new QueryClient();

    queryClient.setQueryData<Selections>(['selections'], {
      key: 123,
    });

    const { result } = renderHook(() => useSelectedIndex(defaultProps), {
      wrapper: wrapper(queryClient),
    });

    expect(result.current[0]).toBe(123);
  });

  it('should memoize initial value', () => {
    const { result } = renderHook(() => useSelectedIndex(defaultProps), {
      wrapper: wrapper(),
    });

    act(() => result.current[1](0));

    expect(result.current[0]).toBe(defaultProps.defaultValue);
  });
});
