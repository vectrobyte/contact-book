import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

import { type AppType } from 'next/app';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';

import { api } from '@/utils/api';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        theme="light"
      />

      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
