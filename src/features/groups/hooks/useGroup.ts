import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

import { useGroups } from '@/features/groups/hooks/useGroups';
import { useAfterLoad } from '@/lib/hooks/useAfterLoad';
import { useRequest } from '@/lib/hooks/useRequest';
import { type Group } from '@/server/models';

export const useGroup = (groupId: string) => {
  const request = useRequest();
  const { groups, loading: groupsLoading } = useGroups();
  const [loading, setLoading] = useState(true);
  const [group, setGroup] = useState<Group>(null);

  const loadGroupWithContacts = useCallback(async () => {
    setLoading(true);
    try {
      const foundGroup = groups.find(({ id }) => id === groupId);

      if (foundGroup && foundGroup.id) {
        setGroup(foundGroup);
      }

      const { data: groupWithContacts } = await request<Group>({
        url: `groups/get`,
        method: 'GET',
        params: {
          id: groupId,
        },
      });

      setGroup(groupWithContacts);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupId, groups]);

  useAfterLoad(async () => {
    await loadGroupWithContacts();
  }, [groupId]);

  return {
    group,
    loading: loading || groupsLoading,
  };
};
