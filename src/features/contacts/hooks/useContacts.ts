import { getSession } from 'next-auth/react';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

import { type PageParams, type PaginatedResult } from '@/@types';
import { ContactActions, ContactsSelector } from '@/features/contacts/store';
import { useAfterLoad } from '@/lib/hooks/useAfterLoad';
import { useQuery } from '@/lib/hooks/useQuery';
import { useRequest } from '@/lib/hooks/useRequest';
import { useAppDispatch, useAppSelector } from '@/lib/providers/StoreProvider';
import { type Contact, type ContactInput, type ContactWithGroups } from '@/server/models';

export const useContacts = () => {
  const request = useRequest();
  const { query, setQuery, ready } = useQuery<PageParams>();
  const [loading, setLoading] = useState(true);

  const { contacts, pagination } = useAppSelector(ContactsSelector);
  const dispatch = useAppDispatch();

  const listContacts = useCallback(async () => {
    setLoading(true);
    try {
      const { data: paginatedContacts } = await request<PaginatedResult<ContactWithGroups>>({
        url: 'contacts/list',
        method: 'GET',
        params: query,
      });

      dispatch(ContactActions.setPaginatedContacts(paginatedContacts));
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const createContact = useCallback(
    async (payload: ContactInput) => {
      const session = await getSession();

      const { data: newContact } = await request<Contact>({
        url: 'contacts/create',
        method: 'POST',
        data: {
          ...payload,
          user_id: session?.user?.id,
        },
      });

      dispatch(ContactActions.add(newContact));
      return newContact;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [listContacts]
  );

  const updateContact = useCallback(async (id: string, payload: ContactInput) => {
    const session = await getSession();

    const { data: updatedContact } = await request<Contact>({
      url: 'contacts/update',
      method: 'PATCH',

      data: {
        ...payload,
        id,
        user_id: session?.user?.id,
      },
    });

    dispatch(ContactActions.update(updatedContact));
    return updatedContact;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dropContact = useCallback(async (contactToDelete: Contact) => {
    await request({
      url: 'contacts/delete',
      method: 'DELETE',
      params: { id: contactToDelete.id },
    });

    dispatch(ContactActions.delete(contactToDelete));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useAfterLoad(async () => {
    if (ready) {
      await listContacts();
    }
  }, [query, ready]);

  return {
    loading,
    query,
    setQuery,
    contacts,
    pagination,
    listContacts,
    updateContact,
    dropContact,
    createContact,
  };
};
