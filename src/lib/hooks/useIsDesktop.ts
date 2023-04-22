import { useEffect, useState } from 'react';

const DESKTOP_BREAKPOINT = 1024;

export const useIsDesktop = (defaultValue?: boolean) => {
  const [isDesktop, setIsDesktop] = useState<boolean | undefined>(defaultValue);

  useEffect(() => {
    const handleResize = () => {
      const shouldBeDesktop = window.innerWidth >= DESKTOP_BREAKPOINT;
      setIsDesktop(shouldBeDesktop);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isDesktop;
};
