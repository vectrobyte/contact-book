import { getSession } from 'next-auth/react';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

import {
  type Contact,
  type ContactFormData,
  type PageParams,
  type PaginatedResult,
  type PaginationMeta,
} from '@/@types';
import { DEFAULT_PAGINATION_META } from '@/lib/configs';
import { useAfterLoad } from '@/lib/hooks/useAfterLoad';
import { useQuery } from '@/lib/hooks/useQuery';
import { useRequest } from '@/lib/hooks/useRequest';

export const useContacts = () => {
  const request = useRequest();
  const { query, setQuery, ready } = useQuery<PageParams>();

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationMeta>(DEFAULT_PAGINATION_META);

  const listContacts = useCallback(async () => {
    setLoading(true);
    try {
      const { data: paginatedContacts } = await request<PaginatedResult<Contact>>({
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
    async (payload: ContactFormData) => {
      const session = await getSession();

      const { data: newContact } = await request<Contact>({
        url: 'contacts/create',
        method: 'POST',
        data: {
          ...payload,
          user_id: session?.user?.id,
        },
      });

      void listContacts();

      return newContact;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [listContacts]
  );

  const updateContact = useCallback(async (payload: Contact) => {
    const session = await getSession();

    const { data: updatedContact } = await request<Contact>({
      url: 'contacts/update',
      method: 'PATCH',

      data: {
        ...payload,
        user_id: session?.user?.id,
      },
    });

    setContacts((prevState) =>
      prevState.map((contact) => (contact.id === updatedContact.id ? updatedContact : contact))
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
