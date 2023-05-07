import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
import { ToastContainer } from 'react-toastify';

import LayoutProvider from '@/lib/providers/LayoutProvider';
import StoreProvider from '@/lib/providers/StoreProvider';

import { ModalStoreProvider } from './ModalProvider';

type ProvidersProps = React.HTMLAttributes<HTMLElement> & {
  session: Session;
};

export const Providers: React.FC<ProvidersProps> = ({ session, children }) => {
  return (
    <SessionProvider session={session}>
      <StoreProvider>
        <ModalStoreProvider>
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            closeOnClick
            pauseOnFocusLoss
            pauseOnHover
            theme="light"
            toastClassName="whitespace-pre-wrap w-[350px] sm:w-[450px] items-start"
          />
          <LayoutProvider>{children}</LayoutProvider>
        </ModalStoreProvider>
      </StoreProvider>
    </SessionProvider>
  );
};
