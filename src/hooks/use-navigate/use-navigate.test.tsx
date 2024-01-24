import { act, renderHook } from '@/test-utils';
import useNavigate from './use-navigate';
import mockRouter from 'next-router-mock';

describe('hooks/use-navigate', () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl('/1');
  });

  it('should navigate and store the previous url in session storage', () => {
    const { result } = renderHook(() => useNavigate({ defaultValue: '/' }));

    act(() => {
      result.current.navigate('/2');
    });

    expect(result.current.previousUrl).toBe('/1');
  });

  it('should go back to the previous url in session storage', () => {
    const { result } = renderHook(() => useNavigate({ defaultValue: '/' }));

    act(() => {
      result.current.push('/1/2');
    });

    act(() => {
      result.current.navigate('/1/2/3');
      result.current.back();
    });

    expect(result.current.previousUrl).toBe('/1/2');
  });
});
