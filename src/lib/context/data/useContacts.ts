import { useCallback, useState } from 'react';

import { type Contact, type ContactFormData } from '@/@types';
import { uuid } from '@/lib/helpers';

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: 1,
      full_name: 'Dilip Bhattarai',
      phone: '9827352725',
      email: 'contact@vectrobyte.com',
    },
    {
      id: 2,
      full_name: 'Rabin Bhattarai',
      phone: '9842632004',
    },
  ]);

  const updateContacts = useCallback((updatedContacts: Contact[]) => {
    setContacts(updatedContacts);
  }, []);

  const createContact = useCallback(
    async (contactData: ContactFormData) => {
      const newContact: Contact = {
        id: uuid(),
        ...contactData,
      };

      updateContacts([...contacts, newContact]);
    },
    [contacts, updateContacts]
  );

  const updateContact = useCallback(
    async (updatedContact: Contact) => {
      updateContacts(
        contacts.map((contact) => (contact.id === updatedContact.id ? updatedContact : contact))
      );
    },
    [contacts, updateContacts]
  );

  const dropContact = useCallback(
    async (contactToDelete: Contact) => {
      updateContacts(contacts.filter((contact) => contactToDelete.id !== contact.id));
    },
    [contacts, updateContacts]
  );
  return { contacts, updateContact, dropContact, createContact };
}
