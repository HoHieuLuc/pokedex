import { useSessionStorage } from '@mantine/hooks';
import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface Props {
  defaultValue: string;
}

const useNavigate = ({ defaultValue }: Props) => {
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
    router.push(href, options);
  };

  return { previousUrl, navigate, back, push, path, searchParams };
};

export default useNavigate;
