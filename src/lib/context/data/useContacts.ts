import { useCallback, useState } from 'react';

import { type Contact, type CreateContactPayload } from '@/@types';
import { uuid } from '@/lib/helpers';

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: 1,
      full_name: 'Dilip Bhattarai',
      phone: '9827352725',
    },
    {
      id: 1,
      full_name: 'Rabin Bhattarai',
      phone: '9842632004',
    },
  ]);

  const updateContacts = useCallback((updatedContacts: Contact[]) => {
    setContacts(updatedContacts);
  }, []);

  const createContact = useCallback(
    (contactData: CreateContactPayload) => {
      const newContact: Contact = {
        id: uuid(),
        ...contactData,
      };

      updateContacts([...contacts, newContact]);
    },
    [contacts, updateContacts]
  );

  const updateContact = useCallback(
    (updatedContact: Contact) => {
      updateContacts(
        contacts.map((contact) => (contact.id === updatedContact.id ? updatedContact : contact))
      );
    },
    [contacts, updateContacts]
  );

  const dropContact = useCallback(
    (contactToDelete: Contact) => {
      updateContacts(contacts.filter((contact) => contactToDelete.id !== contact.id));
    },
    [contacts, updateContacts]
  );
  return { contacts, updateContact, dropContact, createContact };
}
