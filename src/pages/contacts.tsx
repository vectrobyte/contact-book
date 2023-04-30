import { type NextPage } from 'next';
import Head from 'next/head';
import React from 'react';

import Pagination from '@/components/Pagination';
import ContactTable from '@/features/contacts/components/ContactTable';
import { useContacts } from '@/features/contacts/hooks/useContacts';
import WithAuth from '@/lib/hoc/WithAuth';

const ContactsPage: NextPage = () => {
  const { contacts, loading, pagination, setQuery } = useContacts();

  return (
    <>
      <Head>
        <title>Contacts - Contact Book</title>
      </Head>

      <p className="p-3 text-xs font-bold uppercase text-gray-500">Contacts</p>

      <ContactTable loading={loading} contacts={contacts} />

      <Pagination
        pagination={pagination}
        className="mb-4"
        onChange={(page) => setQuery({ page })}
      />
    </>
  );
};

export default WithAuth(ContactsPage);
