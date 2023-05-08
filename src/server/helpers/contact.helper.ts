import { type ContactWithGroups, type Group } from '@/server/models';

export function mapContact<G = Group>(contact: ContactWithGroups<G>) {
  if (!contact.group_contacts) {
    return contact;
  }

  return {
    ...contact,
    groups: contact.group_contacts.map(({ group }) => group),
  };
}
