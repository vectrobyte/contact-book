import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

import { useAfterLoad } from '@/lib/hooks/useAfterLoad';
import { useRequest } from '@/lib/hooks/useRequest';
import { type GroupWithContacts } from '@/server/models';

export const useGetGroup = (groupId: string) => {
  const request = useRequest();
  const [loading, setLoading] = useState(true);
  const [group, setGroup] = useState<Partial<GroupWithContacts>>({});

  const getGroup = useCallback(async () => {
    setLoading(true);
    try {
      const { data: groupObj } = await request<GroupWithContacts>({
        url: `groups/get`,
        method: 'GET',
        params: {
          id: groupId,
        },
      });

      setGroup(groupObj);
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
    await getGroup();
  }, [groupId]);

  return {
    group,
    loading,
  };
};
