import Head from 'next/head';
import React from 'react';

import ContactTable from '@/features/contacts/components/ContactTable';
import { useGroup } from '@/features/groups/hooks/useGroup';
import WithAuth from '@/lib/hoc/WithAuth';
import { useQuery } from '@/lib/hooks/useQuery';

type GroupProps = React.HTMLAttributes<HTMLElement>;

const GroupPage: React.FC<GroupProps> = () => {
  const { query } = useQuery<{ id: string }>();
  const { group, contacts, loading } = useGroup(query.id);

  return (
    <div>
      <Head>
        <title>{group.label ? group.label : 'Group'} - Contact Book</title>
      </Head>

      <p className="p-3 text-xs font-bold uppercase text-gray-500">
        {group.label} {Boolean(contacts.length) && `(${contacts.length})`}
      </p>

      <ContactTable loading={loading} contacts={contacts} />
    </div>
  );
};

export default WithAuth(GroupPage);
