import { type NextPage } from 'next';
import Head from 'next/head';
import React from 'react';

import Contacts from '@/features/contacts/Contacts';
import WithAuth from '@/lib/hoc/WithAuth';

const ContactsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Contacts - Contact Book</title>
      </Head>
      <Contacts />
    </>
  );
};

export default WithAuth(ContactsPage);
