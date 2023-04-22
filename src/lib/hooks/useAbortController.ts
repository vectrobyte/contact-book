import { useEffect, useRef } from 'react';

export const useAbortController = () => {
  const abortControllerRef = useRef<AbortController>();

  useEffect(() => {
    const abortController = new AbortController();
    abortControllerRef.current = abortController;
    return () => {
      abortController.abort();
    };
  }, []);

  const abort = (controller?: AbortController) => {
    if (controller && controller !== abortControllerRef.current) {
      controller.abort();
    } else {
      abortControllerRef?.current?.abort();
    }
  };

  return { signal: abortControllerRef.current?.signal, abort };
};
