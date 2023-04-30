import React from 'react';

import Pagination from '@/components/Pagination';
import ContactTable from '@/features/contacts/components/ContactTable';
import { useContacts } from '@/features/contacts/hooks/useContacts';

type ContactsProps = React.HTMLAttributes<HTMLElement>;

const Contacts: React.FC<ContactsProps> = () => {
  const { contacts, loading, pagination, setQuery } = useContacts();

  return (
    <div className="">
      <ContactTable loading={loading} contacts={contacts} />

      <Pagination
        pagination={pagination}
        className="mb-4"
        onChange={(page) => setQuery({ page })}
      />
    </div>
  );
};

export default Contacts;
