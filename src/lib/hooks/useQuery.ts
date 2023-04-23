import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';

export const useQuery = <T extends Record<string, any>>(): [T, (params: T) => void, boolean] => {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const query = useMemo(() => router.query as T, [router.query]);

  const setQuery = useCallback(
    (params: T) => {
      router.push({
        pathname: router.pathname,
        query: { ...query, ...params },
      });
    },
    [query, router]
  );

  useEffect(() => {
    if (router.isReady) {
      setReady(true);
    }
  }, [router]);

  return [query, setQuery, ready];
};
