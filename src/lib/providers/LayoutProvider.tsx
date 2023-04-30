import { useSession } from 'next-auth/react';
import React from 'react';

import AppLayout from '@/layouts/app-layout/AppLayout';

type LayoutProviderProps = React.HTMLAttributes<HTMLElement>;

const LayoutProvider: React.FC<LayoutProviderProps> = ({ children }) => {
  const session = useSession();

  return (
    <AppLayout isAuthenticated={session && session.status === 'authenticated'}>
      {children}
    </AppLayout>
  );
};

export default LayoutProvider;
