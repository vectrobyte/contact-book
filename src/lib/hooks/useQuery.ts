import { useRouter } from 'next/router';
import { useCallback } from 'react';

import { clearEmptyProperties } from '@/lib/helpers';

export const useQuery = <T extends Record<string, any>>(): [T, (params: T) => void] => {
  const router = useRouter();
  const query = router.query as T;

  const setQuery = useCallback(
    (params: T) => {
      router.push({
        pathname: router.pathname,
        query: clearEmptyProperties({ ...query, ...params }),
      });
    },
    [query, router]
  );

  return [query, setQuery];
};
