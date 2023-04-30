import { type GroupWithContacts } from '@/server/models';

export function mapGroup({ group_contacts, ...group }: GroupWithContacts) {
  return {
    ...group,
    contacts: group_contacts.map(({ contact }) => contact),
  };
}
