import { parseNumber } from '@/utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';

const QUERY_KEYS = {
  selections: ['selections'],
};

export interface UseSelectedIndexProps {
  key: string;
  defaultValue?: number;
}

export interface Selections {
  [key: string]: number;
}

/**
 * Get/set initial selected index state. That initial selected index will be memoized.
 */
const useSelectedIndex = ({ key, defaultValue = 0 }: UseSelectedIndexProps) => {
  const queryClient = useQueryClient();
  const { data } = useQuery<Selections>({
    queryKey: QUERY_KEYS.selections,
  });

  const initialIndex = useMemo(() => {
    const selection = queryClient.getQueryData<Selections>(QUERY_KEYS.selections);
    return parseNumber(selection?.[key], defaultValue);
  }, [key, !!data]);

  const setSelectedIndex = (updater: number | ((prev: number) => number)) => {
    if (!data) {
      return;
    }
    queryClient.setQueryData<Selections>(QUERY_KEYS.selections, (prev) => ({
      ...prev,
      [key]: typeof updater === 'number' ? updater : updater(prev?.[key] || defaultValue),
    }));
  };

  return { initialIndex, setSelectedIndex };
};

export default useSelectedIndex;
