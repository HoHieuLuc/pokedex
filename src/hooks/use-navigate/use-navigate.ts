import { useSessionStorage } from '@mantine/hooks';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface Props {
  defaultValue: string;
}

interface NavigateOptions {
  scroll?: boolean;
  query?: Record<string, string | number | undefined>;
}

const useNavigate = ({ defaultValue }: Props = { defaultValue: '/' }) => {
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();

  const [previousUrl, setPreviousUrl] = useSessionStorage({
    key: 'previousUrl',
    defaultValue,
  });

  /**
   * Navigate and store the previous url in session storage.
   */
  const navigate = (href: string, options?: NavigateOptions) => {
    const previousUrl = [path.toLowerCase(), searchParams.toString()].filter(Boolean).join('?');
    setPreviousUrl(previousUrl);
    router.push(href, options);
  };

  /**
   * Go back to the previous url in session storage.
   */
  const back = () => {
    router.push(previousUrl);
  };

  const push = (href: string, options?: NavigateOptions) => {
    if (options?.query) {
      const _searchParams = new URLSearchParams(searchParams);
      Object.entries(options.query).forEach(([key, value]) => {
        if (value === undefined) {
          _searchParams.delete(key);
        } else {
          _searchParams.set(key, value.toString());
        }
      });

      return router.push(`${href}?${_searchParams.toString()}`, options);
    }
    router.push(href, options);
  };

  const setSearchParams = (params: NavigateOptions['query']) => {
    push(path, {
      query: params,
    });
  };

  return { previousUrl, path, searchParams, navigate, back, push, setSearchParams };
};

export default useNavigate;
