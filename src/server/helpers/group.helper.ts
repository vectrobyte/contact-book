import { mapContact } from '@/server/helpers/contact.helper';
import {
  type Contact,
  type ContactWithGroups,
  type GroupWithContacts,
  type GroupWithCount,
} from '@/server/models';

export function mapGroup<C = Contact>(group: GroupWithContacts<C> & GroupWithCount) {
  if (!group.group_contacts) {
    return group;
  }

  return {
    ...group,
    contacts: group.group_contacts.map(({ contact }) => mapContact(contact as ContactWithGroups)),
  };
}
