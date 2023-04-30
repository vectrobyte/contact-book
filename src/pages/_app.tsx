import '@/styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';

import { type AppType } from 'next/app';
import Head from 'next/head';
import { type Session } from 'next-auth';
import React from 'react';

import { Providers } from '@/lib/providers/Providers';
import { api } from '@/utils/api';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <Providers session={session}>
      <Head>
        <title>Contact Book</title>
        <meta
          name="description"
          content="A seamless application for managing and organizing your contacts"
        />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <Component {...pageProps} />
    </Providers>
  );
};

export default api.withTRPC(MyApp);
