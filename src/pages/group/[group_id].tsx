import Head from 'next/head';
import React from 'react';

import { type PageParams } from '@/@types';
import Pagination from '@/components/Pagination';
import ContactTable from '@/features/contacts/components/ContactTable';
import { useContacts } from '@/features/contacts/hooks/useContacts';
import { useGetGroup } from '@/features/groups/hooks/useGetGroup';
import WithAuth from '@/lib/hoc/WithAuth';
import { useAfterLoad } from '@/lib/hooks/useAfterLoad';
import { useQuery } from '@/lib/hooks/useQuery';

type GroupProps = React.HTMLAttributes<HTMLElement>;

const GroupPage: React.FC<GroupProps> = () => {
  const { query, setQuery } = useQuery<PageParams>();
  const { group, loading } = useGetGroup(query.group_id);
  const { contacts, pagination, listContacts } = useContacts(query);

  useAfterLoad(async () => {
    await listContacts();
  }, [query]);

  return (
    <div>
      <Head>
        <title>{group.label ? group.label : 'Group'} - Contact Book</title>
      </Head>

      <p className="p-3 text-xs font-bold uppercase text-gray-500">
        {Boolean(group && group.id) && (
          <span>
            {group.label} {Boolean(pagination.total) && `(${pagination.total})`}
          </span>
        )}
      </p>

      <ContactTable loading={loading} contacts={contacts} />

      <Pagination
        pagination={pagination}
        className="mb-4"
        onChange={(page) => setQuery({ page })}
      />
    </div>
  );
};

export default WithAuth(GroupPage);
