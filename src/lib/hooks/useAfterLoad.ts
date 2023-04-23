import { useEffect, useRef, useState } from 'react';

export const useAfterLoad = (callback: CallableFunction, deps = []) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const checkReadyState = () => {
      if (document.readyState === 'complete') {
        setIsLoaded(true);
      }
    };

    const handleLoad = () => {
      setIsLoaded(true);
    };

    // Check if document is already loaded
    checkReadyState();

    // Add event listener for page load
    window.addEventListener('load', handleLoad);

    // Check ready state on every render until loaded
    const readyStateInterval = setInterval(checkReadyState, 100);

    // Cleanup
    return () => {
      window.removeEventListener('load', handleLoad);
      clearInterval(readyStateInterval);
    };
  }, []);

  useEffect(() => {
    if (isLoaded) {
      callbackRef.current();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, ...deps]);

  return isLoaded;
};
