import React from 'react';

import TopNav from '@/layouts/app-layout/components/TopNav';

type AppLayoutProps = React.HTMLAttributes<HTMLElement> & {
  navContent?: React.ReactNode;
};

const AppLayout: React.FC<AppLayoutProps> = ({ className = '', navContent, children }) => {
  return (
    <div className={`${className} relative min-h-screen`}>
      <TopNav>{navContent}</TopNav>

      <main className="px-4 py-4 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
};

export default AppLayout;
