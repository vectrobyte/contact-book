import { mapContact } from '@/server/helpers/contact.helper';
import { type Contact, type ContactWithGroups, type GroupWithContacts } from '@/server/models';

export function mapGroup<C = Contact>({ group_contacts, ...group }: GroupWithContacts<C>) {
  return {
    ...group,
    contacts: group_contacts.map(({ contact }) => mapContact(contact as ContactWithGroups)),
  };
}
