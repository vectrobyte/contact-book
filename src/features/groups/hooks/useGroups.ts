import { getSession } from 'next-auth/react';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

import { type PageParams, type PaginatedResult, type PaginationMeta } from '@/@types';
import { DEFAULT_PAGINATION_META } from '@/lib/configs';
import { useAfterLoad } from '@/lib/hooks/useAfterLoad';
import { useQuery } from '@/lib/hooks/useQuery';
import { useRequest } from '@/lib/hooks/useRequest';
import { type Group, type GroupInput } from '@/server/models';

export const useGroups = () => {
  const request = useRequest();
  const { query, setQuery, ready } = useQuery<PageParams>();

  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationMeta>(DEFAULT_PAGINATION_META);

  const listGroups = useCallback(async () => {
    setLoading(true);
    try {
      const { data: paginatedGroups } = await request<PaginatedResult<Group>>({
        url: 'groups/list',
        method: 'GET',
        params: query,
      });

      if (paginatedGroups) {
        setGroups(paginatedGroups.data);
        setPagination(paginatedGroups.meta);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const createGroup = useCallback(
    async (payload: GroupInput) => {
      const session = await getSession();

      const { data: newGroup } = await request<Group>({
        url: 'groups/create',
        method: 'POST',
        data: {
          ...payload,
          user_id: session?.user?.id,
        },
      });

      void listGroups();

      return newGroup;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [listGroups]
  );

  const updateGroup = useCallback(async (id: string, payload: GroupInput) => {
    const session = await getSession();

    const { data: updatedGroup } = await request<Group>({
      url: 'groups/update',
      method: 'PATCH',

      data: {
        ...payload,
        id: payload,
        user_id: session?.user?.id,
      },
    });

    setGroups((prevState) =>
      prevState.map((group) => (group.id === updatedGroup.id ? updatedGroup : group))
    );

    return updatedGroup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dropGroup = useCallback(async (groupToDelete: Group) => {
    await request({
      url: 'groups/delete',
      method: 'DELETE',
      params: { id: groupToDelete.id },
    });

    setGroups((prevState) => prevState.filter((group) => groupToDelete.id !== group.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useAfterLoad(async () => {
    if (ready) {
      await listGroups();
    }
  }, [query, ready]);

  return {
    loading,
    query,
    setQuery,
    groups,
    pagination,
    listGroups,
    updateGroup,
    dropGroup,
    createGroup,
  };
};
