'use client';

import { QueryKey, useQuery } from '@tanstack/react-query';

interface Props {
  queryKey: QueryKey;
  fallback?: React.ReactNode;
  error?: React.ReactNode;
  children?: React.ReactNode;
}

const ReactQuerySuspense = ({ queryKey, fallback, error, children }: Props) => {
  const { data, isLoading, isError } = useQuery({
    queryKey,
  });

  if (isError) {
    return error;
  }

  if (isLoading || !data) {
    return fallback;
  }

  return children;
};

export default ReactQuerySuspense;
