import { getSession } from 'next-auth/react';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

import { type PageParams, type PaginatedResult, type PaginationMeta } from '@/@types';
import { DEFAULT_PAGINATION_META } from '@/lib/configs';
import { useRequest } from '@/lib/hooks/useRequest';
import { type Contact, type ContactInput, type ContactWithGroups } from '@/server/models';

export const useContacts = (query: PageParams) => {
  const request = useRequest();
  const [contacts, setContacts] = useState<ContactWithGroups[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<PaginationMeta>(DEFAULT_PAGINATION_META);

  const listContacts = useCallback(async () => {
    setLoading(true);
    try {
      const { data: paginatedContacts } = await request<PaginatedResult<ContactWithGroups>>({
        url: 'contacts/list',
        method: 'GET',
        params: query,
      });

      if (paginatedContacts) {
        setContacts(paginatedContacts.data);
        setPagination(paginatedContacts.meta);
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

  const createContact = useCallback(
    async (payload: ContactInput) => {
      const session = await getSession();

      const { data: newContact } = await request<ContactWithGroups>({
        url: 'contacts/create',
        method: 'POST',
        data: {
          ...payload,
          user_id: session?.user?.id,
        },
      });

      setContacts((prevState) => [newContact, ...prevState]);
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

    setContacts((prevState) =>
      prevState.map((contact) =>
        contact.id === updatedContact.id ? { ...contact, ...updateContact } : contact
      )
    );
    return updatedContact;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dropContact = useCallback(async (contactToDelete: Contact) => {
    await request({
      url: 'contacts/delete',
      method: 'DELETE',
      params: { id: contactToDelete.id },
    });

    setContacts((prevState) => prevState.filter((contact) => contactToDelete.id !== contact.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    loading,
    contacts,
    pagination,
    listContacts,
    updateContact,
    dropContact,
    createContact,
  };
};
