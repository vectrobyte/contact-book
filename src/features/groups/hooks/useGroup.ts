import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

import { useAfterLoad } from '@/lib/hooks/useAfterLoad';
import { useRequest } from '@/lib/hooks/useRequest';
import { type ContactWithGroups, type GroupWithContacts } from '@/server/models';

export const useGroup = (groupId: string) => {
  const request = useRequest();
  const [loading, setLoading] = useState(true);
  const [group, setGroup] = useState<Partial<GroupWithContacts>>({});
  const [contacts, setContacts] = useState<ContactWithGroups[]>([]);

  const loadGroupWithContacts = useCallback(async () => {
    setLoading(true);
    try {
      const {
        data: { contacts: groupContacts, ...groupObj },
      } = await request<GroupWithContacts>({
        url: `groups/get`,
        method: 'GET',
        params: {
          id: groupId,
        },
      });

      setGroup(groupObj);
      setContacts(groupContacts as ContactWithGroups[]);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupId]);

  useAfterLoad(async () => {
    await loadGroupWithContacts();
  }, [groupId]);

  return {
    group,
    contacts,
    loading,
  };
};
