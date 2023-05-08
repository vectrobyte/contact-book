import { getSession } from 'next-auth/react';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

import { GroupActions, GroupsSelector } from '@/features/groups/store/groups.slice';
import { useRequest } from '@/lib/hooks/useRequest';
import { useAppDispatch, useAppSelector } from '@/lib/providers/StoreProvider';
import { type Group, type GroupInput, type GroupWithCount } from '@/server/models';

export const useGroups = () => {
  const request = useRequest();

  const [loading, setLoading] = useState(false);
  const { groups } = useAppSelector(GroupsSelector);
  const dispatch = useAppDispatch();

  const listGroups = useCallback(async () => {
    setLoading(true);
    try {
      const { data: groups } = await request<GroupWithCount[]>({
        url: 'groups/list',
        method: 'GET',
      });

      dispatch(GroupActions.setList(groups));
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createGroup = useCallback(
    async (payload: GroupInput) => {
      const session = await getSession();

      const { data: newGroup } = await request<GroupWithCount>({
        url: 'groups/create',
        method: 'POST',
        data: {
          ...payload,
          user_id: session?.user?.id,
        },
      });

      dispatch(GroupActions.add(newGroup));
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
        id,
        user_id: session?.user?.id,
      },
    });

    dispatch(GroupActions.update(updatedGroup));
    return updatedGroup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dropGroup = useCallback(async (groupToDelete: Group) => {
    await request({
      url: 'groups/delete',
      method: 'DELETE',
      params: { id: groupToDelete.id },
    });

    dispatch(GroupActions.delete(groupToDelete));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    loading,
    groups,
    listGroups,
    updateGroup,
    dropGroup,
    createGroup,
  };
};
