'use client';

import {
  QueryClient,
  QueryFunction,
  QueryKey,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

interface Props {
  queryKey: QueryKey;
  queryFn?: QueryFunction;
  fallback?: React.ReactNode;
  error?: React.ReactNode;
  children?: React.ReactNode;
}

const defaultQueryFn = (queryKey: QueryKey, queryClient: QueryClient) => {
  return () => {
    const data = queryClient.getQueryData(queryKey);
    if (data === undefined) {
      return {};
    }
    return data;
  };
};

const ReactQuerySuspense = ({ queryKey, queryFn, fallback, error, children }: Props) => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey,
    queryFn: queryFn || defaultQueryFn(queryKey, queryClient),
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
