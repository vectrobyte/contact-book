import { useState } from 'react';

import { type Contact } from '@/@types';

export function useGetContacts() {
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

  return { contacts, setContacts };
}
