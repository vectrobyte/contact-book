import { type NextPage } from 'next';
import Head from 'next/head';

import Contacts from '@/features/contacts/Contacts';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Contact Book</title>
        <meta
          name="description"
          content="A seamless application for managing and organizing your contacts"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <Contacts />
    </>
  );
};

export default Home;
