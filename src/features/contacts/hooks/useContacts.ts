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
import request from '@/services/request.service';

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<PaginationMeta>(DEFAULT_PAGINATION_META);

  const listContacts = useCallback(async (params: PageParams = {}) => {
    setLoading(true);
    try {
      const { data: paginatedContacts } = await request<PaginatedResult<Contact>>({
        url: 'contacts/list',
        method: 'GET',
        params,
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
  }, []);

  const updateContacts = useCallback((updatedContacts: Contact[]) => {
    setContacts(updatedContacts);
  }, []);

  const createContact = useCallback(
    async (payload: ContactFormData) => {
      const { data: newContact } = await request<Contact>({
        url: 'contacts/create',
        method: 'POST',
        data: payload,
      });

      updateContacts([...contacts, newContact]);
    },
    [contacts, updateContacts]
  );

  const updateContact = useCallback(
    async (payload: Contact) => {
      const { data: updatedContact } = await request<Contact>({
        url: 'contacts/update',
        method: 'PATCH',
        data: payload,
      });

      updateContacts(
        contacts.map((contact) => (contact.id === updatedContact.id ? updatedContact : contact))
      );
    },
    [contacts, updateContacts]
  );

  const dropContact = useCallback(
    async (contactToDelete: Contact) => {
      await request({
        url: 'contacts/delete',
        method: 'DELETE',
        params: { id: contactToDelete.id },
      });

      updateContacts(contacts.filter((contact) => contactToDelete.id !== contact.id));
    },
    [contacts, updateContacts]
  );

  useEffect(() => {
    if (!loading) {
      listContacts();
    }
  }, []);

  return { loading, contacts, pagination, updateContact, dropContact, createContact };
}
