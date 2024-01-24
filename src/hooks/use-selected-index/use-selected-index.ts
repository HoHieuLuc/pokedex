import { parseNumber } from '@/utils';
import { useQueryClient } from '@tanstack/react-query';
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
  const initialIndex = useMemo(() => {
    const selection = queryClient.getQueryData<Selections>(QUERY_KEYS.selections);
    return parseNumber(selection?.[key], defaultValue);
  }, [key]);

  const setSelectedIndex = (updater: number | ((prev: number) => number)) => {
    queryClient.setQueryData<Selections>(QUERY_KEYS.selections, (prev) => ({
      ...prev,
      [key]: typeof updater === 'number' ? updater : updater(prev?.[key] || defaultValue),
    }));
  };

  return { initialIndex, setSelectedIndex, key };
};

export default useSelectedIndex;
