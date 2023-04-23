import { useCallback, useEffect, useState } from 'react';
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
  const [query, setQuery, ready] = useQuery<PageParams>();

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
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [query]);

  const createContact = useCallback(
    async (payload: ContactFormData) => {
      const { data: newContact } = await request<Contact>({
        url: 'contacts/create',
        method: 'POST',
        data: payload,
      });

      listContacts();

      return newContact;
    },
    [listContacts]
  );

  const updateContact = useCallback(async (payload: Contact) => {
    const { data: updatedContact } = await request<Contact>({
      url: 'contacts/update',
      method: 'PATCH',
      data: payload,
    });

    setContacts((prevState) =>
      prevState.map((contact) => (contact.id === updatedContact.id ? updatedContact : contact))
    );

    return updatedContact;
  }, []);

  const dropContact = useCallback(async (contactToDelete: Contact) => {
    await request({
      url: 'contacts/delete',
      method: 'DELETE',
      params: { id: contactToDelete.id },
    });

    setContacts((prevState) => prevState.filter((contact) => contactToDelete.id !== contact.id));
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
