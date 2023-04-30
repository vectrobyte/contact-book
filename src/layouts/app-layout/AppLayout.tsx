import React, { useEffect, useState } from 'react';

import AfterAuth from '@/layouts/app-layout/components/AfterAuth';
import TopNav from '@/layouts/app-layout/components/TopNav';
import { useIsDesktop } from '@/lib/hooks/useIsDesktop';

type AppLayoutProps = React.HTMLAttributes<HTMLElement> & {
  isAuthenticated: boolean;
};

const AppLayout: React.FC<AppLayoutProps> = ({
  className = '',
  isAuthenticated = true,
  children,
}) => {
  const isDesktop = useIsDesktop(true);
  const [isSidenavOpen, setIsSidenavOpen] = useState(isDesktop);

  useEffect(() => {
    setIsSidenavOpen(!!isDesktop);
  }, [isDesktop]);

  return (
    <nav className={`${className} relative min-h-screen`}>
      <TopNav
        withSearch={isAuthenticated}
        onToggleSidenav={() => {
          setIsSidenavOpen(!isSidenavOpen);
        }}
      />

      {isAuthenticated && (
        <AfterAuth isSidenavOpen={isSidenavOpen} setIsSidenavOpen={setIsSidenavOpen} />
      )}

      <main
        className={`px-4 py-4 transition-all sm:px-6 lg:px-8 ${
          isSidenavOpen
            ? `ease-in ${isAuthenticated ? 'lg:ml-72 lg:w-[calc(100%-18rem)]' : ''}`
            : 'ml-0 w-full ease-out'
        }`}
      >
        {children}
      </main>
    </nav>
  );
};

export default AppLayout;
