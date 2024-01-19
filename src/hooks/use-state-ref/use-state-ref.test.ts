import { act, renderHook } from '@/test-utils';
import useStateRef from './use-state-ref';

describe('hooks/use-state-ref', () => {
  const initialValue = 0;

  it('correctly sets initial state', () => {
    const { result } = renderHook(() => useStateRef(initialValue));
    const [state, , ref] = result.current;
    expect(state).toBe(initialValue);
    expect(ref.current).toBe(initialValue);
  });

  it('should set ref on state change', () => {
    const { result } = renderHook(() => useStateRef(initialValue));

    const [, setState] = result.current;
    act(() => setState(10969));

    const [state, , ref] = result.current;

    expect(state).toBe(10969);
    expect(ref.current).toBe(10969);
  });
});
