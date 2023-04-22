import { useRouter } from 'next/router';
import { useCallback } from 'react';

export const useQuery = <T extends Record<string, any>>(): [T, (params: T) => void] => {
  const router = useRouter();
  const query = router.query as T;

  const setQuery = useCallback(
    (params: T) => {
      console.log('Is anybody calling me?');

      router.push({
        pathname: router.pathname,
        query: { ...query, ...params },
      });
    },
    [query, router]
  );

  return [query, setQuery];
};
