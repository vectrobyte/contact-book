import { type NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import React from 'react';

import Contacts from '@/features/contacts/Contacts';
import AppLayout from '@/layouts/app-layout/AppLayout';
import { useIsDesktop } from '@/lib/hooks/useIsDesktop';

const HomePage: React.FC<NextPage> = () => {
  const isDesktop = useIsDesktop();

  const { status } = useSession();

  return (
    <>
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

      <AppLayout>
        {status === 'loading' ? (
          <div className="flex-center flex-col gap-5 px-16 py-32 sm:gap-10 md:px-32 lg:p-64">
            <Image
              src="/logo.svg"
              alt=""
              height={isDesktop ? 150 : 100}
              width={isDesktop ? 150 : 100}
              className="mt-[130px] flex-shrink-0 animate-pulse opacity-10 grayscale"
            />
          </div>
        ) : status === 'authenticated' ? (
          <Contacts />
        ) : (
          <div className="flex-center flex-col gap-5 px-16 py-32 sm:gap-10 md:px-32 lg:p-64">
            <h1 className="text-center text-lg font-light text-gray-600 sm:text-2xl">
              Sign in to access the contact book
            </h1>
          </div>
        )}
      </AppLayout>
    </>
  );
};

export default HomePage;
